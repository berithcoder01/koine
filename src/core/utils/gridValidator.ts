// ──────────────────────────────────────────────────────────────────────────────
// Parâmetros de validação
// ──────────────────────────────────────────────────────────────────────────────
// NUM_SAMPLES: pontos amostrados da área de tinta da letra (template)
// MIN_OUTLINE: mínimo de pixels de tinta para rejeitar fallback de fonte
// MIN_BBOX_FRACTION: diagonal mínima do template em relação ao canvas
// MIN_STUDENT_FRACTION: diagonal mínima do traço do aluno em relação ao template
// COVERAGE_RADIUS: raio de busca (px) para cada ponto do template vs. traço
// ──────────────────────────────────────────────────────────────────────────────
const NUM_SAMPLES = 400;
const MIN_OUTLINE = 50;
const MIN_BBOX_FRACTION = 0.30;
const MIN_STUDENT_FRACTION = 0.35;
const OUTLINE_CACHE = new Map<string, { x: number; y: number }[]>();
let fontsReady = false;

function isInk(data: Uint8ClampedArray, x: number, y: number, size: number): boolean {
  if (x < 0 || x >= size || y < 0 || y >= size) return false;
  const idx = (y * size + x) * 4;
  return data[idx + 3] > 128 && data[idx] < 160;
}

/**
 * Amostra pixels de TINTA da letra (área preenchida, não só bordas).
 * Isso garante que o traço do aluno, ao passar pelo centro visual da letra,
 * encontre pontos do template próximos — ao contrário da detecção de bordas
 * que coloca pontos na periferia do glifo.
 */
function getTemplate(letter: string, canvasSize: number): { x: number; y: number }[] {
  const key = `${letter}_${canvasSize}`;
  const cached = OUTLINE_CACHE.get(key);
  if (cached) return cached;

  const canvas = document.createElement('canvas');
  canvas.width = canvasSize;
  canvas.height = canvasSize;
  const ctx = canvas.getContext('2d')!;

  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, canvasSize, canvasSize);
  ctx.fillStyle = '#000000';
  ctx.font = `bold ${canvasSize * 0.75}px Gentium Plus, SBL Greek, serif`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(letter, canvasSize / 2, canvasSize / 2);

  const data = ctx.getImageData(0, 0, canvasSize, canvasSize).data;

  // Coleta TODOS os pixels de tinta (área preenchida, não apenas bordas)
  const inkPoints: { x: number; y: number }[] = [];
  for (let y = 0; y < canvasSize; y++) {
    for (let x = 0; x < canvasSize; x++) {
      if (isInk(data, x, y, canvasSize)) {
        inkPoints.push({ x, y });
      }
    }
  }

  if (inkPoints.length < MIN_OUTLINE) return [];

  // Amostragem uniforme sobre todos os pixels de tinta
  const step = inkPoints.length / NUM_SAMPLES;
  const sampled: { x: number; y: number }[] = [];
  for (let i = 0; i < NUM_SAMPLES; i++) {
    sampled.push(inkPoints[Math.floor(i * step)]);
  }

  OUTLINE_CACHE.set(key, sampled);
  return sampled;
}

function getBBox(pts: { x: number; y: number }[]) {
  let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
  for (const p of pts) {
    if (p.x < minX) minX = p.x;
    if (p.x > maxX) maxX = p.x;
    if (p.y < minY) minY = p.y;
    if (p.y > maxY) maxY = p.y;
  }
  return { minX, maxX, minY, maxY, w: maxX - minX, h: maxY - minY };
}

function countCovered(
  template: { x: number; y: number }[],
  student: { x: number; y: number }[],
  radius: number,
): number {
  let covered = 0;
  const radiusSq = radius * radius;
  for (const t of template) {
    for (const s of student) {
      const dx = t.x - s.x;
      const dy = t.y - s.y;
      if (dx * dx + dy * dy <= radiusSq) {
        covered++;
        break;
      }
    }
  }
  return covered;
}

async function ensureFonts(): Promise<void> {
  if (fontsReady) return;
  try {
    await document.fonts.ready;
    fontsReady = true;
    OUTLINE_CACHE.clear();
  } catch {
    fontsReady = true;
  }
}

function adjustScore(rawScore: number): number {
  // rawScore 0–100 representa % de pixels de tinta cobertos pelo traço.
  // Para ser aprovado, o aluno deve cobrir pelo menos 65% do template de tinta.
  // Desenhar apenas metade do caractere (cobertura ~50-55%) deve reprovar (nota < 70).
  if (rawScore < 30) return rawScore;
  if (rawScore < 65) return Math.round(30 + ((rawScore - 30) / 35) * 39);     // 30→69 (reprovado)
  if (rawScore < 85) return Math.round(70 + ((rawScore - 65) / 20) * 20);     // 65→90
  return Math.round(90 + ((rawScore - 85) / 15) * 10);                        // 85→100
}

export async function gridValidate(
  strokes: { x: number; y: number }[][],
  letter: string,
  canvasSize: number,
): Promise<number> {
  if (strokes.length === 0) return 0;

  const totalPoints = strokes.reduce((sum, s) => sum + s.length, 0);
  if (totalPoints < 12) return Math.round((totalPoints / 12) * 15);

  await ensureFonts();

  const template = getTemplate(letter, canvasSize);
  if (template.length < MIN_OUTLINE) return 0;

  const templateBBox = getBBox(template);
  const diag = Math.hypot(templateBBox.w, templateBBox.h);
  if (diag < canvasSize * MIN_BBOX_FRACTION) return 0;

  const student = strokes.flat();
  const studentBBox = getBBox(student);
  const studentDiag = Math.hypot(studentBBox.w, studentBBox.h);

  if (studentDiag < diag * MIN_STUDENT_FRACTION) {
    console.log(
      `[KOINE] REJECTED small stroke: studentDiag=${Math.round(studentDiag)} ` +
      `templateDiag=${Math.round(diag)} ratio=${Math.round(studentDiag / diag * 100)}%`
    );
    return 0;
  }

  const radius = Math.max(16, Math.round(canvasSize * 0.065));
  const covered = countCovered(template, student, radius);
  const rawScore = Math.round((covered / template.length) * 100);
  const score = adjustScore(rawScore);

  console.log(
    `[KOINE] letter=${letter} canvas=${canvasSize} ` +
    `inkPts=${template.length} diag=${Math.round(diag)} ` +
    `covered=${covered}/${template.length} rawScore=${rawScore} score=${score} ` +
    `radius=${radius} studentPts=${student.length} ` +
    `studentDiag=${Math.round(studentDiag)} ratio=${Math.round(studentDiag / diag * 100)}%`
  );

  return score;
}

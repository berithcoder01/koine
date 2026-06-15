/**
 * Gera pontos de referência para uma letra grega renderizando o glyph
 * em um canvas oculto e extraindo os pixels escuros.
 *
 * Retorna number[][] (pares [x, y]) ordenados por ângulo do centróide,
 * prontos para uso com validateCanvasStroke().
 */

const glyphCache = new Map<string, number[][]>();

export function generateLetterTemplate(
  letter: string,
  canvasSize: number,
): number[][] {
  const key = `${letter}_${canvasSize}`;
  const cached = glyphCache.get(key);
  if (cached) return cached;

  const size = canvasSize;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  if (!ctx) return [];

  // Fundo branco
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, size, size);

  // Desenha o glyph em preto
  ctx.fillStyle = '#000000';
  ctx.font = `bold ${size * 0.65}px SBL Greek, Gentium Plus, serif`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(letter, size / 2, size / 2);

  // Extrai pixels escuros
  const imageData = ctx.getImageData(0, 0, size, size);
  const data = imageData.data;
  const darkPixels: [number, number][] = [];
  const step = 2; // amostra a cada 2px para performance

  for (let y = 0; y < size; y += step) {
    for (let x = 0; x < size; x += step) {
      const idx = (y * size + x) * 4;
      const r = data[idx];
      const g = data[idx + 1];
      const b = data[idx + 2];
      const a = data[idx + 3];
      // Pixels escuros com alpha alto (glyph renderizado)
      if (a > 128 && r < 128 && g < 128 && b < 128) {
        darkPixels.push([x, y]);
      }
    }
  }

  if (darkPixels.length === 0) {
    return [];
  }

  // Calcula centróide
  let cx = 0;
  let cy = 0;
  for (const [px, py] of darkPixels) {
    cx += px;
    cy += py;
  }
  cx /= darkPixels.length;
  cy /= darkPixels.length;

  // Ordena por ângulo do centróide (rastreia o contorno)
  const sorted = darkPixels
    .map(([x, y]) => ({
      x,
      y,
      angle: Math.atan2(y - cy, x - cx),
    }))
    .sort((a, b) => a.angle - b.angle)
    .map(({ x, y }) => [x, y]);

  // Subamostra para no máximo 100 pontos
  const maxPoints = 100;
  const sampled: number[][] = [];
  const interval = Math.max(1, Math.floor(sorted.length / maxPoints));
  for (let i = 0; i < sorted.length && sampled.length < maxPoints; i += interval) {
    sampled.push(sorted[i]);
  }

  glyphCache.set(key, sampled);
  return sampled;
}

/**
 * Converte array de Point[] ({x, y}) para number[][] ([x, y]).
 */
export function pointsToNumberArray(strokes: { x: number; y: number }[][]): number[][] {
  return strokes.flat().map(p => [p.x, p.y]);
}

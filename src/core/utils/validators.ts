// src/utils/validators.ts

import { APP_CONFIG } from '@/core/constants/config';

/**
 * Valida a precisão do traço do Canvas comparando pontos do aluno
 * com o template de referência. Retorna score de 0-100.
 */
export function validateCanvasStroke(
  studentPoints: number[][],
  templatePoints: number[][],
  canvasSize: number,
): number {
  if (studentPoints.length === 0 || templatePoints.length === 0) return 0;

  // Normaliza ambos os conjuntos para [0,1] usando as dimensões do canvas
  // (NÃO a bounding box individual — isso preserva a relação posicional)
  const normalizeToCanvas = (points: number[][]): number[][] => {
    return points.map((p) => [p[0] / canvasSize, p[1] / canvasSize]);
  };

  const normStudent = normalizeToCanvas(studentPoints);
  const normTemplate = normalizeToCanvas(templatePoints);

  // Reamostrar para mesmo número de pontos
  const N = 50;
  const resample = (pts: number[][], n: number): number[][] => {
    const result: number[][] = [];
    for (let i = 0; i < n; i++) {
      const idx = Math.round((i / (n - 1)) * (pts.length - 1));
      result.push(pts[Math.max(0, Math.min(idx, pts.length - 1))]);
    }
    return result;
  };

  const s = resample(normStudent, N);
  const t = resample(normTemplate, N);

  // ── Precisão: distância média ao ponto mais próximo ──
  let totalStudentToTemplate = 0;
  for (let i = 0; i < N; i++) {
    let minDist = Infinity;
    for (let j = 0; j < N; j++) {
      const dx = s[i][0] - t[j][0];
      const dy = s[i][1] - t[j][1];
      const d = dx * dx + dy * dy;
      if (d < minDist) minDist = d;
    }
    totalStudentToTemplate += Math.sqrt(minDist);
  }
  const avgAccuracy = totalStudentToTemplate / N;

  // ── Cobertura: quantos pontos do template foram "cobertos" ──
  // Inflar pontos do aluno para simular largura do traço visual (lineWidth=6)
  const INFLATED_OFFSETS = [[0, 0], [0.015, 0], [-0.015, 0], [0, 0.015], [0, -0.015]];
  const inflatedStudent: number[][] = [];
  for (const pt of s) {
    for (const off of INFLATED_OFFSETS) {
      inflatedStudent.push([pt[0] + off[0], pt[1] + off[1]]);
    }
  }

  const COVERAGE_THRESHOLD = 0.18; // 18% do espaço normalizado (aumentado de 12%)
  let coveredCount = 0;
  for (let j = 0; j < N; j++) {
    let minDist = Infinity;
    for (let i = 0; i < inflatedStudent.length; i++) {
      const dx = inflatedStudent[i][0] - t[j][0];
      const dy = inflatedStudent[i][1] - t[j][1];
      const d = Math.sqrt(dx * dx + dy * dy);
      if (d < minDist) minDist = d;
    }
    if (minDist < COVERAGE_THRESHOLD) coveredCount++;
  }
  const coverageRatio = coveredCount / N;

  // ── Score final: média ponderada de precisão + cobertura ──
  const accuracyScore = Math.max(0, (1 - avgAccuracy / 1.41) * 100);
  const score = Math.round(accuracyScore * 0.5 + coverageRatio * 100 * 0.5);

  return Math.max(0, Math.min(100, score));
}

/**
 * Verifica se um score de Canvas está aprovado.
 */
export function isCanvasApproved(score: number): boolean {
  return score >= APP_CONFIG.CANVAS_PASS_SCORE;
}

/**
 * Valida email simples.
 */
export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/**
 * Valida senha: mínimo 8 caracteres, 1 maiúscula, 1 número.
 */
export function isValidPassword(password: string): boolean {
  return (
    password.length >= 8 &&
    /[A-Z]/.test(password) &&
    /[0-9]/.test(password)
  );
}

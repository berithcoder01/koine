// src/utils/validators.ts

import { APP_CONFIG } from '@/constants/config';

/**
 * Valida a precisão do traço do Canvas comparando pontos do aluno
 * com o template de referência. Retorna score de 0-100.
 */
export function validateCanvasStroke(
  studentPoints: number[][],
  templatePoints: number[][]
): number {
  if (studentPoints.length === 0 || templatePoints.length === 0) return 0;

  // Normaliza ambos os conjuntos para [0,1]
  const normalize = (points: number[][]): number[][] => {
    const xs = points.map((p) => p[0]);
    const ys = points.map((p) => p[1]);
    const minX = Math.min(...xs);
    const maxX = Math.max(...xs);
    const minY = Math.min(...ys);
    const maxY = Math.max(...ys);
    const rangeX = maxX - minX || 1;
    const rangeY = maxY - minY || 1;
    return points.map((p) => [(p[0] - minX) / rangeX, (p[1] - minY) / rangeY]);
  };

  const normStudent = normalize(studentPoints);
  const normTemplate = normalize(templatePoints);

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

  // Calcula distância média euclidiana
  let totalDist = 0;
  for (let i = 0; i < N; i++) {
    const dx = s[i][0] - t[i][0];
    const dy = s[i][1] - t[i][1];
    totalDist += Math.sqrt(dx * dx + dy * dy);
  }
  const avgDist = totalDist / N;

  // Converte distância em score (distância máxima ≈ 1.41 = diagonal do quadrado unitário)
  const score = Math.max(0, Math.round((1 - avgDist / 1.41) * 100));
  return score;
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
 * Valida senha: mínimo 6 caracteres.
 */
export function isValidPassword(password: string): boolean {
  return password.length >= 6;
}

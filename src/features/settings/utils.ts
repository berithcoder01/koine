import { format, isToday } from 'date-fns';

/**
 * Verifica se a data fornecida é hoje.
 * @param dateString Data em formato YYYY-MM-DD.
 */
export const isTodayDate = (dateString: string): boolean => {
  return isToday(new Date(dateString));
};

/**
 * Formata minutos para string legível.
 * @example formatMinutes(5) => "5 min"
 */
export const formatMinutes = (minutes: number): string => {
  return `${minutes} min`;
};

/**
 * Calcula o progresso percentual entre dois valores.
 * @returns Percentual arredondado (0-100).
 */
export const calculateProgressPercent = (
  current: number,
  total: number
): number => {
  if (total <= 0) return 0;
  return Math.min(100, Math.round((current / total) * 100));
};
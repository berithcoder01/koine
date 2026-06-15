import { useState, useCallback } from 'react';
import { dbQueries } from '@/features/database/queries';
import type { StrongEntry } from '@/core/types/greek.types';

export const useStrong = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getEntry = useCallback(async (strongsId: string): Promise<StrongEntry | null> => {
    setLoading(true);
    setError(null);
    try {
      return await dbQueries.getStrongById(strongsId);
    } catch (e) {
      setError('Erro ao buscar definição');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const search = useCallback(async (query: string): Promise<StrongEntry[]> => {
    setLoading(true);
    setError(null);
    try {
      return await dbQueries.searchStrong(query);
    } catch (e) {
      setError('Erro na busca');
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  return { getEntry, search, loading, error };
};

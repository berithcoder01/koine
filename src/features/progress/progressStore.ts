// src/store/progressStore.ts
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

interface LessonProgress {
  lessonId: string;
  score: number;
  completedAt: string;
}

export interface ProgressState {
  completedLessons: Record<string, LessonProgress>;
  completedUnits: string[];
  completedHistoryUnits: string[];
  completedVocabUnits: string[];
  completedCanvasLetters: string[];
  completedApostilaLessons: string[];
  currentCycle: number;
  currentUnit: number;
  currentLesson: number;
  markLessonComplete: (lessonId: string, score: number) => void;
  markUnitComplete: (unitId: string) => void;
  markHistoryUnitComplete: (unitId: string) => void;
  markVocabUnitComplete: (unitId: string) => void;
  markCanvasLetterComplete: (letterId: string) => void;
  markApostilaLessonComplete: (lessonId: string) => void;
  setCurrentPosition: (cycle: number, unit: number, lesson: number) => void;
}

const loadState = (): Partial<ProgressState> => {
  try {
    const saved = localStorage.getItem('koine-progress');
    if (!saved) return {};
    const parsed = JSON.parse(saved);
    return parsed && typeof parsed === 'object' ? parsed : {};
  } catch { return {}; }
};

const saveState = (state: ProgressState) => {
  try {
    localStorage.setItem('koine-progress', JSON.stringify({
      completedLessons: state.completedLessons,
      completedUnits: state.completedUnits,
      completedHistoryUnits: state.completedHistoryUnits,
      completedVocabUnits: state.completedVocabUnits,
      completedCanvasLetters: state.completedCanvasLetters,
      completedApostilaLessons: state.completedApostilaLessons,
      currentCycle: state.currentCycle,
      currentUnit: state.currentUnit,
      currentLesson: state.currentLesson,
    }));
  } catch {}
};

const saved = loadState();

export const useProgressStore = create<ProgressState>()(
  immer((set) => ({
    completedLessons: saved.completedLessons ?? {},
    completedUnits: saved.completedUnits ?? [],
    completedHistoryUnits: saved.completedHistoryUnits ?? [],
    completedVocabUnits: saved.completedVocabUnits ?? [],
    completedCanvasLetters: saved.completedCanvasLetters ?? [],
    completedApostilaLessons: saved.completedApostilaLessons ?? [],
    currentCycle: saved.currentCycle ?? 1,
    currentUnit: saved.currentUnit ?? 1,
    currentLesson: saved.currentLesson ?? 1,

    markLessonComplete: (lessonId, score) =>
      set((state) => {
        state.completedLessons[lessonId] = {
          lessonId,
          score,
          completedAt: new Date().toISOString(),
        };
        saveState(state);
      }),

    markUnitComplete: (unitId) =>
      set((state) => {
        if (!state.completedUnits.includes(unitId)) {
          state.completedUnits.push(unitId);
          saveState(state);
        }
      }),

      markHistoryUnitComplete: (unitId) =>
      set((state) => {
        if (!state.completedHistoryUnits.includes(unitId)) {
          state.completedHistoryUnits.push(unitId);
          saveState(state);
        }
      }),

    markVocabUnitComplete: (unitId) =>
      set((state) => {
        if (!state.completedVocabUnits.includes(unitId)) {
          state.completedVocabUnits.push(unitId);
          saveState(state);
        }
      }),

    markCanvasLetterComplete: (letterId) =>
      set((state) => {
        if (!state.completedCanvasLetters.includes(letterId)) {
          state.completedCanvasLetters.push(letterId);
          saveState(state);
        }
      }),

    markApostilaLessonComplete: (lessonId) =>
      set((state) => {
        if (!state.completedApostilaLessons.includes(lessonId)) {
          state.completedApostilaLessons.push(lessonId);
          saveState(state);
        }
      }),

    setCurrentPosition: (cycle, unit, lesson) =>
      set((state) => {
        state.currentCycle = cycle;
        state.currentUnit = unit;
        state.currentLesson = lesson;
        saveState(state);
      }),
  }))
);

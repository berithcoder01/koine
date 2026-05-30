// src/store/progressStore.ts
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

interface LessonProgress {
  lessonId: string;
  score: number;
  completedAt: string;
}

interface ProgressState {
  completedLessons: Record<string, LessonProgress>;
  completedUnits: string[];
  currentCycle: number;
  currentUnit: number;
  currentLesson: number;
  markLessonComplete: (lessonId: string, score: number) => void;
  markUnitComplete: (unitId: string) => void;
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

    setCurrentPosition: (cycle, unit, lesson) =>
      set((state) => {
        state.currentCycle = cycle;
        state.currentUnit = unit;
        state.currentLesson = lesson;
        saveState(state);
      }),
  }))
);

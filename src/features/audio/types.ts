export interface Cue {
  id: string;
  marker: string;
  text?: string;
  startTime: number;
  endTime: number;
}

export interface CueGroup {
  id: string;
  unitId?: string;
  unitType?: string;
  lessonPhase: 'exposure' | 'exercise';
  cueIds: string[];
  canSkip?: boolean;
}

export interface ModuleCues {
  version: string;
  moduleId: string;
  moduleTitle?: string;
  audioFile: string;
  duration: number;
  generatedAt?: string;
  narrationFile?: string;
  cues: Cue[];
  groups: CueGroup[];
}

export type AudioEngineState = 'idle' | 'loading' | 'playing' | 'paused' | 'error';

export interface AudioEngineCallbacks {
  onCueStart?: (cue: Cue) => void;
  onCueEnd?: (cue: Cue) => void;
  onGroupEnd?: (group: CueGroup) => void;
  onError?: (error: string) => void;
  onStateChange?: (state: AudioEngineState) => void;
}

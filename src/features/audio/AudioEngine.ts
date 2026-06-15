import type { Cue, CueGroup, ModuleCues, AudioEngineState, AudioEngineCallbacks } from './types';

const BASE_URL = '';  // Servido pelo Vite/Capacitor como static

export class AudioEngine {
  private static instance: AudioEngine;

  private audio: HTMLAudioElement | null = null;
  private moduleCues: ModuleCues | null = null;
  private callbacks: AudioEngineCallbacks = {};

  private _state: AudioEngineState = 'idle';
  private currentCueIndex: number = -1;
  private currentGroupIndex: number = -1;
  private rafId: number | null = null;
  private _enabled: boolean = true;

  static getInstance(): AudioEngine {
    if (!AudioEngine.instance) {
      AudioEngine.instance = new AudioEngine();
    }
    return AudioEngine.instance;
  }

  private setState(state: AudioEngineState) {
    this._state = state;
    this.callbacks.onStateChange?.(state);
  }

  get state(): AudioEngineState {
    return this._state;
  }

  get enabled(): boolean {
    return this._enabled;
  }

  setEnabled(val: boolean) {
    this._enabled = val;
    if (!val) this.stop();
  }

  setCallbacks(cbs: Partial<AudioEngineCallbacks>) {
    Object.assign(this.callbacks, cbs);
  }

  /** Carrega o módulo: cues.json + preload do MP3 */
  async loadModule(moduleId: string): Promise<void> {
    this.stop();
    this.setState('loading');

    try {
      const res = await fetch(`${BASE_URL}/audio/${moduleId}/${moduleId}.cues.json`);
      if (!res.ok) throw new Error(`cues.json not found (${res.status})`);

      this.moduleCues = await res.json();

      // Preload do áudio (não toca ainda)
      if (this._enabled) {
        this.audio = new Audio();
        this.audio.preload = 'auto';
        this.audio!.src = `${BASE_URL}${this.moduleCues!.audioFile}`;
        await new Promise<void>((resolve, reject) => {
          if (!this.audio) return;
          this.audio.oncanplaythrough = () => resolve();
          this.audio.onerror = () => reject(new Error('Failed to load audio'));
          // Timeout de 10s para não travar
          const timeout = setTimeout(() => resolve(), 10000);
          this.audio.oncanplaythrough = () => { clearTimeout(timeout); resolve(); };
        });
      }

      this.setState('idle');
    } catch (e) {
      console.warn(`[AudioEngine] Failed to load module ${moduleId}:`, e);
      this.moduleCues = null;
      this.audio = null;
      this.setState('idle');
      this.callbacks.onError?.(`Audio not available for ${moduleId}`);
    }
  }

  /** Toca um cue específico pelo ID */
  async playCue(cueId: string): Promise<void> {
    if (!this._enabled || !this.audio || !this.moduleCues) return;

    const cue = this.moduleCues.cues.find(c => c.id === cueId);
    if (!cue) {
      this.callbacks.onError?.(`Cue "${cueId}" not found`);
      return;
    }

    const idx = this.moduleCues.cues.indexOf(cue);
    this.currentCueIndex = idx;
    this.playFrom(cue);
  }

  /** Toca a sequência completa de um grupo */
  async playGroup(groupId: string): Promise<void> {
    if (!this._enabled || !this.audio || !this.moduleCues) return;

    const groupIdx = this.moduleCues.groups.findIndex(g => g.id === groupId);
    if (groupIdx === -1) {
      this.callbacks.onError?.(`Group "${groupId}" not found`);
      return;
    }

    this.currentGroupIndex = groupIdx;
    const group = this.moduleCues.groups[groupIdx];

    // Toca o primeiro cue do grupo
    if (group.cueIds.length > 0) {
      await this.playCue(group.cueIds[0]);
    }
  }

  /** Pausa */
  pause(): void {
    if (!this.audio || this._state !== 'playing') return;
    this.audio.pause();
    this.setState('paused');
    this.stopMonitor();
  }

  /** Retoma */
  resume(): void {
    if (!this.audio || this._state !== 'paused') return;
    this.audio.play().catch(() => {});
    this.setState('playing');
    this.startMonitor();
  }

  /** Para tudo e reseta */
  stop(): void {
    this.stopMonitor();
    if (this.audio) {
      this.audio.pause();
      this.audio.currentTime = 0;
    }
    this.currentCueIndex = -1;
    this.currentGroupIndex = -1;
    this.setState('idle');
  }

  /** Descarrega o módulo da memória */
  unload(): void {
    this.stop();
    this.audio = null;
    this.moduleCues = null;
  }

  /** Avança para o próximo cue no grupo atual, ou encerra o grupo */
  next(): void {
    if (!this.moduleCues || this.currentGroupIndex === -1) return;

    const group = this.moduleCues.groups[this.currentGroupIndex];
    const currentCueId = this.moduleCues.cues[this.currentCueIndex]?.id;
    const posInGroup = group.cueIds.indexOf(currentCueId ?? '');

    if (posInGroup === -1 || posInGroup >= group.cueIds.length - 1) {
      // Fim do grupo
      this.stop();
      this.callbacks.onGroupEnd?.(group);
    } else {
      // Próximo cue do grupo
      const nextCueId = group.cueIds[posInGroup + 1];
      this.playCue(nextCueId);
    }
  }

  /** Pula o grupo atual */
  skipGroup(): void {
    if (!this.moduleCues || this.currentGroupIndex === -1) return;
    const group = this.moduleCues.groups[this.currentGroupIndex];
    this.stop();
    this.callbacks.onGroupEnd?.(group);
  }

  // ─── PRIVATE ───────────────────────────────────────────

  private playFrom(cue: Cue): void {
    if (!this.audio) return;

    this.audio.currentTime = cue.startTime;
    this.audio.play().catch(() => {});
    this.setState('playing');
    this.callbacks.onCueStart?.(cue);
    this.startMonitor();
  }

  private startMonitor(): void {
    this.stopMonitor();
    this.tick();
  }

  private stopMonitor(): void {
    if (this.rafId !== null) {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }
  }

  private tick = (): void => {
    if (!this.audio || !this.moduleCues) return;

    const now = this.audio.currentTime;
    const cue = this.moduleCues.cues[this.currentCueIndex];

    if (cue && now >= cue.endTime) {
      // Cue terminou
      this.audio.pause();
      this.setState('idle');
      this.stopMonitor();
      this.callbacks.onCueEnd?.(cue);
      return;
    }

    this.rafId = requestAnimationFrame(this.tick);
  };

  /** Busca um grupo pelo unitId */
  getGroupByUnitId(unitId: string): CueGroup | undefined {
    return this.moduleCues?.groups.find(g => g.unitId === unitId);
  }

  /** Busca um grupo pelo lessonPhase */
  getGroupsByPhase(phase: 'exposure' | 'exercise'): CueGroup[] {
    return this.moduleCues?.groups.filter(g => g.lessonPhase === phase) ?? [];
  }
}

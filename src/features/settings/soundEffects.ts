// /src/features/settings/soundEffects.ts

const SOUND_EFFECTS: Record<string, () => void> = {
  click: () => generateTone(800, 50),
  success: () => generateChord([523.25, 659.25, 783.99], 200, [1, 1.2, 0.8]), // C5 major
  error: () => generateChord([493.88, 587.33, 739.99], 200, [1, 1.2, 0.8]),    // B4 minor
  levelUp: () => generateArpeggio([261.63, 329.63, 415.30, 523.25], 120, 4),
};

/** Gera um tom simples */
export function generateTone(freq: number, duration: number = 50) {
  if (!('AudioContext' in window)) return;
  
  const ctx = new AudioContext();
  const osc = ctx.createOscillator();
  osc.type = 'sine';
  osc.frequency.value = freq;

  const gain = ctx.createGain();
  gain.gain.value = 0.1;
  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start();
  osc.stop(ctx.currentTime + duration / 1000);
}

/** Gera um acorde */
export function generateChord(frequencies: number[], duration: number, volumes: number[] = []) {
  if (!('AudioContext' in window)) return;
  
  const ctx = new AudioContext();
  const now = ctx.currentTime;

  frequencies.forEach((freq, i) => {
    const osc = ctx.createOscillator();
    osc.frequency.value = freq;
    
    const gain = ctx.createGain();
    gain.gain.value = volumes[i] ? 0.1 * volumes[i] : 0.1;
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    osc.start(now);
    osc.stop(now + duration / 1000);
  });
}

/** Gera um arpejo ascendente/descendente */
export function generateArpeggio(notes: number[], durationPerNote: number, repetitions: number) {
  if (!('AudioContext' in window)) return;
  
  const ctx = new AudioContext();
  const now = ctx.currentTime;

  for (let rep = 0; rep < repetitions; rep++) {
    notes.forEach((note, i) => {
      const osc = ctx.createOscillator();
      osc.frequency.value = note;
      
      const gain = ctx.createGain();
      gain.gain.value = 0.1;
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.start(now + rep * notes.length * durationPerNote / 1000 + i * durationPerNote / 1000);
      osc.stop(now + rep * notes.length * durationPerNote / 1000 + (i + 1) * durationPerNote / 1000);
    });
  }
}

export function createSoundEffectPlayer(_volume: number, enabled: boolean) {
  return function play(name: 'click' | 'success' | 'error' | 'levelUp') {
    if (!enabled) return;
    
    if (SOUND_EFFECTS[name]) {
      SOUND_EFFECTS[name]();
    }
  };
}
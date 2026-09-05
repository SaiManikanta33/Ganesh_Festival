// Web Audio & Background Audio Manager for SVS Youth Tirupati
// Plays local background song BGSong.mp3 from public folder

let audioCtx = null;
let bgAudio = null;
let isPlayingAarti = false;

// Local background song URL
const AUDIO_TRACK_URL = '/BGSong.mp3';

function getAudioContext() {
  if (!audioCtx) {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (AudioContext) {
      audioCtx = new AudioContext();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

// 1. Play Authentic Temple Bell (Ghanti Chime)
export function playTempleBell() {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const freqs = [523.25, 1046.50, 1567.98, 2093.00, 3135.96];
    const gains = [0.4, 0.3, 0.2, 0.1, 0.05];

    freqs.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);

      gainNode.gain.setValueAtTime(gains[idx], now);
      gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 3.5);

      osc.connect(gainNode);
      gainNode.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 3.5);
    });
  } catch (err) {
    console.warn("Audio play error:", err);
  }
}

// 2. Play Conch (Sankh Naad) Sound
export function playConchSound() {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const gainNode = ctx.createGain();
    const filter = ctx.createBiquadFilter();

    osc.type = 'sawtooth';
    osc2.type = 'sine';

    osc.frequency.setValueAtTime(140, now);
    osc.frequency.linearRampToValueAtTime(260, now + 1.2);
    osc.frequency.setValueAtTime(260, now + 2.5);
    osc.frequency.linearRampToValueAtTime(200, now + 3.8);

    osc2.frequency.setValueAtTime(142, now);
    osc2.frequency.linearRampToValueAtTime(262, now + 1.2);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(400, now);
    filter.frequency.linearRampToValueAtTime(800, now + 1.5);
    filter.frequency.linearRampToValueAtTime(300, now + 3.8);

    gainNode.gain.setValueAtTime(0.001, now);
    gainNode.gain.linearRampToValueAtTime(0.3, now + 0.8);
    gainNode.gain.setValueAtTime(0.3, now + 2.8);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 3.9);

    osc.connect(filter);
    osc2.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(ctx.destination);

    osc.start(now);
    osc2.start(now);
    osc.stop(now + 4.0);
    osc2.stop(now + 4.0);
  } catch (err) {
    console.warn("Conch audio error:", err);
  }
}

// 3. Flower Scatter Sparkle Sound
export function playFlowerSparkle() {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const notes = [523.25, 659.25, 783.99, 1046.50, 1318.51];
    
    notes.forEach((note, index) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const startTime = now + index * 0.08;

      osc.type = 'sine';
      osc.frequency.setValueAtTime(note, startTime);

      gain.gain.setValueAtTime(0.15, startTime);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.6);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(startTime);
      osc.stop(startTime + 0.6);
    });
  } catch (err) {
    console.warn("Sparkle audio error:", err);
  }
}

// 4. Play local background song BGSong.mp3
export function toggleDevotionalAarti(onStateChange) {
  try {
    if (isPlayingAarti && bgAudio) {
      bgAudio.pause();
      isPlayingAarti = false;
      if (onStateChange) onStateChange(false);
      return false;
    }

    if (!bgAudio) {
      bgAudio = new Audio(AUDIO_TRACK_URL);
      bgAudio.loop = true;
      bgAudio.volume = 0.7;
    }

    const promise = bgAudio.play();
    if (promise !== undefined) {
      promise.then(() => {
        isPlayingAarti = true;
        if (onStateChange) onStateChange(true);
      }).catch((err) => {
        console.warn("Audio playback error:", err);
        playTempleBell();
        isPlayingAarti = false;
        if (onStateChange) onStateChange(false);
      });
    }

    return true;
  } catch (err) {
    console.warn("Aarti toggle error:", err);
    return false;
  }
}

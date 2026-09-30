import React, { useMemo } from 'react';

export const FloatingBackgroundDecorations: React.FC = () => {
  // Generate stable cute floating particles
  const particles = useMemo(() => [
    { icon: '🌸', top: '8%', left: '8%', delay: '0s', size: 'text-xl' },
    { icon: '✨', top: '15%', right: '12%', delay: '1s', size: 'text-lg' },
    { icon: '💖', top: '28%', left: '10%', delay: '2s', size: 'text-base' },
    { icon: '⭐', top: '38%', right: '8%', delay: '1.5s', size: 'text-lg' },
    { icon: '🌷', top: '52%', left: '6%', delay: '0.5s', size: 'text-xl' },
    { icon: '♡', top: '65%', right: '12%', delay: '2.5s', size: 'text-2xl text-pink-300 font-bold' },
    { icon: '✨', top: '78%', left: '12%', delay: '1.8s', size: 'text-base' },
    { icon: '🎀', top: '88%', right: '9%', delay: '0.8s', size: 'text-lg' },
  ], []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Soft pastel ambient background spots */}
      <div className="absolute -top-16 -left-16 w-64 h-64 bg-pink-100/60 rounded-full blur-3xl" />
      <div className="absolute top-1/3 -right-20 w-72 h-72 bg-amber-100/50 rounded-full blur-3xl" />
      <div className="absolute -bottom-20 left-1/4 w-80 h-80 bg-rose-100/60 rounded-full blur-3xl" />

      {/* Floating cute symbols */}
      {particles.map((p, idx) => (
        <span
          key={idx}
          className={`absolute select-none ${p.size} animate-float-gentle opacity-40`}
          style={{
            top: p.top,
            left: p.left,
            right: p.right,
            animationDelay: p.delay,
          }}
        >
          {p.icon}
        </span>
      ))}
    </div>
  );
};

// Kawaii Sound FX generator using Web Audio API (so sound always works on phone without external files!)
class KawaiiSoundPlayer {
  private ctx: AudioContext | null = null;

  private initCtx() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Cute pop chime when tapping buttons
  playPop() {
    try {
      this.initCtx();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(659.25, this.ctx.currentTime); // E5
      osc.frequency.exponentialRampToValueAtTime(1046.5, this.ctx.currentTime + 0.12); // C6

      gain.gain.setValueAtTime(0.18, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.14);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.15);
    } catch {
      // Audio autoplay policy fallback
    }
  }

  // Romantic sparkle chord
  playSparkle() {
    try {
      this.initCtx();
      if (!this.ctx) return;
      const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
      notes.forEach((freq, idx) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const start = this.ctx.currentTime + idx * 0.06;

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, start);

        gain.gain.setValueAtTime(0.12, start);
        gain.gain.exponentialRampToValueAtTime(0.0001, start + 0.35);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(start);
        osc.stop(start + 0.4);
      });
    } catch {
      // Audio fallback
    }
  }
}

export const soundFx = new KawaiiSoundPlayer();

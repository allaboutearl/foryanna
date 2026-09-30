import React, { useState } from 'react';
import { Sparkles, Heart } from 'lucide-react';
import confetti from 'canvas-confetti';
import { UsagiCharacter } from './UsagiCharacter.tsx';
import { soundFx } from './Decorations.tsx';
import { SurpriseConfig } from '../types.ts';

interface WelcomePage1Props {
  config: SurpriseConfig;
  onStart: () => void;
  triggerConfetti: () => void;
}

export const WelcomePage1: React.FC<WelcomePage1Props> = ({
  config,
  onStart,
  triggerConfetti,
}) => {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [usagiPose, setUsagiPose] = useState<'holding-heart' | 'cheering'>('holding-heart');

  // Handle START ♡ button press with cute reaction & smooth pink transition
  const handleStartPress = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setUsagiPose('cheering');
    soundFx.playPop();
    soundFx.playSparkle();

    // Heart and sparkle confetti burst
    confetti({
      particleCount: 45,
      spread: 75,
      origin: { y: 0.65, x: 0.5 },
      colors: ['#FFB5C5', '#FFD1DC', '#FFE4E1', '#FFF0F5', '#FF80AB', '#FFE082'],
    });

    // Soft transition into Page 2
    setTimeout(() => {
      onStart();
    }, 650);
  };

  return (
    <section className="flex-1 flex flex-col items-center justify-between px-5 py-4 text-center relative select-none overflow-hidden animate-in fade-in duration-500">
      
      {/* ================= 1. DREAMY SOFT PINK PASTEL ATMOSPHERE ================= */}
      {/* Central warm ambient aura */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-tr from-pink-300/30 via-rose-200/25 to-amber-100/30 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 right-0 w-64 h-64 bg-pink-200/25 rounded-full blur-2xl pointer-events-none -z-10" />

      {/* ================= 2. SOFT DRIFTING CLOUDS ================= */}
      <div className="absolute top-3 left-4 pointer-events-none animate-cloud-drift opacity-80 z-0">
        <span className="text-2xl select-none filter drop-shadow-xs">☁️</span>
      </div>
      <div
        className="absolute top-8 right-6 pointer-events-none animate-cloud-drift opacity-75 z-0"
        style={{ animationDelay: '-4.5s' }}
      >
        <div className="flex items-center gap-1">
          <span className="text-xl select-none filter drop-shadow-xs">☁️</span>
          <span className="text-xs text-amber-300 animate-pulse">✨</span>
        </div>
      </div>

      {/* ================= 3. FLOATING HEARTS SLOWLY FLOATING UPWARD ================= */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        {/* Floating Heart 1 */}
        <div
          className="absolute bottom-16 left-6 text-pink-300 text-sm animate-heart-float-up opacity-80"
          style={{ animationDuration: '6.5s', animationDelay: '0.2s' }}
        >
          💖
        </div>
        {/* Floating Heart 2 */}
        <div
          className="absolute bottom-28 right-8 text-rose-300 text-xs animate-heart-float-up opacity-75"
          style={{ animationDuration: '7.8s', animationDelay: '2.5s' }}
        >
          💕
        </div>
        {/* Floating Heart 3 */}
        <div
          className="absolute bottom-20 left-1/3 text-pink-400 text-sm animate-heart-float-up opacity-85"
          style={{ animationDuration: '8.2s', animationDelay: '4.8s' }}
        >
          ♡
        </div>
        {/* Floating Heart 4 */}
        <div
          className="absolute bottom-36 right-1/4 text-pink-300 text-xs animate-heart-float-up opacity-70"
          style={{ animationDuration: '7.2s', animationDelay: '1.2s' }}
        >
          🌸
        </div>
      </div>

      {/* ================= 4. STARS & SPARKLES APPEARING & DISAPPEARING ================= */}
      <div className="absolute top-12 left-8 text-amber-300 text-sm animate-sparkle pointer-events-none z-0">
        ✦
      </div>
      <div
        className="absolute top-20 right-12 text-pink-400 text-xs animate-particle-twinkle pointer-events-none z-0"
        style={{ animationDelay: '1.2s' }}
      >
        ✨
      </div>
      <div
        className="absolute top-1/2 left-3 text-purple-300 text-xs animate-particle-twinkle pointer-events-none z-0"
        style={{ animationDelay: '2.1s' }}
      >
        ✦
      </div>
      <div
        className="absolute top-2/3 right-4 text-amber-300 text-xs animate-sparkle pointer-events-none z-0"
        style={{ animationDelay: '1.8s' }}
      >
        ⭐
      </div>

      {/* ================= 5. CUTE DECORATIVE ELEMENTS AROUND EDGES ================= */}
      {/* Top Left Edge: Cute Bow & Blossom */}
      <div className="absolute top-1 left-2 pointer-events-none flex items-center gap-1 z-10 opacity-85">
        <span className="text-sm select-none">🎀</span>
        <span className="text-xs animate-flower-sway select-none">🌸</span>
      </div>

      {/* Top Right Edge: Flower & Star */}
      <div className="absolute top-1 right-2 pointer-events-none flex items-center gap-1 z-10 opacity-85">
        <span className="text-xs animate-flower-sway select-none" style={{ animationDelay: '0.8s' }}>🌷</span>
        <span className="text-sm select-none">🎀</span>
      </div>

      {/* Bottom Left Corner: Strawberry & Flower Cluster */}
      <div className="absolute bottom-4 left-3 pointer-events-none flex items-center gap-0.5 z-10 opacity-80">
        <span className="text-xs select-none">🍓</span>
        <span className="text-xs animate-flower-sway select-none" style={{ animationDelay: '1.5s' }}>🌸</span>
      </div>

      {/* Bottom Right Corner: Heart & Blossom */}
      <div className="absolute bottom-4 right-3 pointer-events-none flex items-center gap-0.5 z-10 opacity-80">
        <span className="text-xs animate-flower-sway select-none" style={{ animationDelay: '0.5s' }}>🌼</span>
        <span className="text-xs select-none">💖</span>
      </div>

      {/* ================= 6. TOP DECORATIVE BANNER & TITLE ================= */}
      <div className="space-y-2 max-w-xs mx-auto z-10 mt-1">
        {/* Ribbon badge - exact text preserved */}
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/95 border border-pink-200/90 text-xs font-cute text-pink-600 shadow-xs animate-in fade-in slide-in-from-top-1 duration-500">
          <span>🎀</span>
          <span className="font-bold tracking-wide">A Gift From My Heart</span>
          <span>🎀</span>
        </div>

        {/* Title with cute typography flourishes - exact text preserved */}
        <div className="relative px-2">
          <div className="absolute -top-2 left-1 text-pink-300 text-sm animate-pulse">✦</div>
          <div className="absolute -top-1 right-2 text-rose-300 text-sm animate-pulse" style={{ animationDelay: '0.6s' }}>✨</div>

          <h1 className="text-2xl sm:text-3xl font-cute font-black text-gray-800 tracking-tight leading-snug drop-shadow-xs capitalize animate-in fade-in duration-700">
            {config.welcomeTitle}
          </h1>

          {config.welcomeSubtitle ? (
            <p className="text-xs font-hand text-pink-600 font-semibold mt-1">
              {config.welcomeSubtitle}
            </p>
          ) : (
            <div className="flex items-center justify-center gap-2 mt-1 text-pink-400 text-xs">
              <span>—</span>
              <span>♡</span>
              <span>—</span>
            </div>
          )}
        </div>
      </div>

      {/* ================= 7. CENTRAL ROMANTIC GREETING CARD SHOWCASE ================= */}
      <div className="my-auto py-2 w-full max-w-xs relative z-10">
        {/* Cute Washi Tape at Top */}
        <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 z-20 w-24 h-5 bg-pink-200/80 backdrop-blur-xs rounded-sm border border-white/70 shadow-xs rotate-[-1.5deg]" />

        {/* Stationery Card Container with soft pastel gradient & border */}
        <div className="relative bg-gradient-to-b from-white/95 via-pink-50/70 to-rose-50/85 rounded-3xl p-5 border-2 border-pink-200/90 shadow-lg shadow-pink-100/60 overflow-hidden group">
          
          {/* Scrapbook corner stickers */}
          <div className="absolute top-2.5 left-3 text-lg select-none group-hover:scale-110 transition-transform">🍓</div>
          <div className="absolute top-2.5 right-3 text-lg select-none group-hover:scale-110 transition-transform">🌸</div>
          <div className="absolute bottom-3 left-3 text-base select-none group-hover:scale-110 transition-transform">🌷</div>
          <div className="absolute bottom-3 right-3 text-base select-none group-hover:scale-110 transition-transform">✨</div>

          {/* Soft Glowing Pedestal Behind Usagi */}
          <div className="relative flex flex-col items-center justify-center py-2">
            <div className="absolute w-44 h-44 rounded-full bg-gradient-to-tr from-pink-200/40 via-amber-100/35 to-rose-200/40 blur-xl pointer-events-none" />

            {/* Usagi Character with cute idle gentle floating animation & interaction */}
            <div
              className={`relative z-10 cursor-pointer transition-all duration-300 ${
                isTransitioning ? 'scale-110 -translate-y-2' : 'animate-float-gentle'
              }`}
            >
              <UsagiCharacter
                pose={usagiPose}
                size="xl"
                onClick={() => {
                  soundFx.playSparkle();
                  triggerConfetti();
                }}
              />
            </div>

            {/* Grounding Soft Shadow/Glow with pulse */}
            <div className="w-28 h-4 bg-pink-300/25 rounded-full blur-xs -mt-2 mx-auto animate-pulse" />
          </div>
        </div>
      </div>

      {/* ================= 8. BOTTOM START ♡ BUTTON WITH SUBTLE BOUNCE & GLOW ================= */}
      <div className="w-full max-w-xs pb-3 pt-1 z-10">
        <div className="relative group">
          {/* Outer Pulsing Glow Aura */}
          <div className="absolute -inset-1 bg-gradient-to-r from-pink-400 via-rose-300 to-pink-500 rounded-3xl blur-md opacity-45 group-hover:opacity-75 transition duration-500 animate-pulse" />

          {/* Existing START ♡ Button */}
          <button
            onClick={handleStartPress}
            disabled={isTransitioning}
            className="relative w-full h-15 rounded-3xl bg-gradient-to-r from-pink-400 via-rose-400 to-pink-500 text-white font-cute font-extrabold text-lg shadow-lg shadow-pink-300/60 active:scale-95 transition-all flex items-center justify-center gap-2 border-2 border-white/70 cursor-pointer animate-button-glow"
          >
            <span className="tracking-wide">{config.startButtonText}</span>
            <Sparkles className="w-5 h-5 animate-spin" style={{ animationDuration: '6s' }} />
          </button>
        </div>
      </div>

      {/* ================= 9. SOFT PINK PAGE TRANSITION OVERLAY ================= */}
      {isTransitioning && (
        <div className="absolute inset-0 bg-pink-100/60 backdrop-blur-xs z-50 pointer-events-none animate-in fade-in duration-500 flex items-center justify-center">
          <div className="flex items-center gap-1.5 text-rose-400 animate-bounce">
            <Heart className="w-5 h-5 fill-rose-400" />
            <span className="font-cute font-bold text-xs text-pink-600">Starting our story... ♡</span>
            <Sparkles className="w-4 h-4 text-amber-300" />
          </div>
        </div>
      )}

    </section>
  );
};

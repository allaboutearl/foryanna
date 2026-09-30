import React, { useState, useEffect } from 'react';
import { Heart, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundFx } from './Decorations.tsx';

interface GiftRibbonOverlayProps {
  onOpened: () => void;
}

export const GiftRibbonOverlay: React.FC<GiftRibbonOverlayProps> = ({ onOpened }) => {
  // Stages: 'petals' -> 'hearts' -> 'wrapped' -> 'untying' -> 'done'
  const [stage, setStage] = useState<'petals' | 'hearts' | 'wrapped' | 'untying' | 'done'>('petals');

  useEffect(() => {
    // 1. Petals floating (0 -> 900ms)
    const t1 = setTimeout(() => {
      setStage('hearts');
      soundFx.playSparkle();
    }, 900);

    // 2. Hearts gathering and forming ribbon (900ms -> 2000ms)
    const t2 = setTimeout(() => {
      setStage('wrapped');
      soundFx.playPop();
    }, 2000);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  const handleOpenGift = () => {
    setStage('untying');
    soundFx.playSparkle();

    // Trigger sweet confetti burst from center
    try {
      confetti({
        particleCount: 50,
        spread: 70,
        origin: { y: 0.5, x: 0.5 },
        colors: ['#FB7185', '#F472B6', '#FDA4AF', '#FFF176', '#FECDD3'],
      });
    } catch {
      // ignore
    }

    // After untying animation finishes, complete opening
    setTimeout(() => {
      setStage('done');
      onOpened();
    }, 950);
  };

  if (stage === 'done') return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center overflow-hidden transition-opacity duration-700 ${
        stage === 'untying' ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Soft Gift Box Wrapping Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#FFF0F4] via-[#FFE3EC] to-[#FFD6E4]" />

      {/* Floating Petals transforming into Hearts (Stages 1 & 2) */}
      {(stage === 'petals' || stage === 'hearts') && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {Array.from({ length: 18 }).map((_, i) => {
            const left = (i * 19 + 7) % 94;
            const top = (i * 23 + 11) % 90;
            return (
              <div
                key={i}
                className="absolute transition-all duration-1000 transform"
                style={{
                  left: `${left}%`,
                  top: `${top}%`,
                  animation: `float-gentle ${3 + (i % 3)}s ease-in-out infinite`,
                }}
              >
                {stage === 'petals' ? (
                  // Rose petal
                  <svg width="22" height="22" viewBox="0 0 30 30" className="opacity-80">
                    <path
                      d="M15 0 C22 8 28 15 25 22 C22 29 15 30 11 25 C7 20 8 10 15 0 Z"
                      fill={['#FDA4AF', '#F472B6', '#FB7185'][i % 3]}
                    />
                  </svg>
                ) : (
                  // Glowing heart
                  <div className="text-xl animate-pulse text-pink-500 filter drop-shadow-md">
                    💖
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Center Gift Box Presentation Frame */}
      <div className="relative w-full max-w-[420px] h-[90vh] mx-auto flex flex-col items-center justify-center">
        
        {/* Soft Decorative Gift Tag at top */}
        <div
          className={`absolute top-12 z-30 transition-all duration-700 ${
            stage === 'wrapped' ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
          }`}
        >
          <div className="bg-white/95 px-4 py-1.5 rounded-full shadow-md border border-pink-200 flex items-center gap-1.5 text-xs font-cute text-pink-600 font-bold">
            <span>🎁</span>
            <span>A Surprise For You</span>
            <span>🎁</span>
          </div>
        </div>

        {/* ================= RIBBON BANDS ================= */}
        {/* 1. Vertical Ribbon Band */}
        <div
          className={`absolute top-0 bottom-0 w-14 sm:w-16 bg-gradient-to-r from-pink-400 via-rose-400 to-pink-500 shadow-xl z-20 flex items-center justify-center border-x-2 border-pink-300/80 transition-all duration-700 ease-in-out ${
            stage === 'wrapped'
              ? 'scale-y-100 opacity-100'
              : stage === 'untying'
              ? 'scale-y-0 -translate-y-full opacity-0'
              : 'scale-y-0 opacity-0'
          }`}
        >
          {/* Subtle satin sheen down vertical ribbon */}
          <div className="w-1.5 h-full bg-white/40 blur-[1px]" />
        </div>

        {/* 2. Horizontal Ribbon Band */}
        <div
          className={`absolute left-0 right-0 h-14 sm:h-16 bg-gradient-to-b from-pink-400 via-rose-400 to-pink-500 shadow-xl z-20 flex items-center justify-center border-y-2 border-pink-300/80 transition-all duration-700 ease-in-out ${
            stage === 'wrapped'
              ? 'scale-x-100 opacity-100'
              : stage === 'untying'
              ? 'scale-x-0 -translate-x-full opacity-0'
              : 'scale-x-0 opacity-0'
          }`}
        >
          {/* Subtle satin sheen across horizontal ribbon */}
          <div className="h-1.5 w-full bg-white/40 blur-[1px]" />
        </div>

        {/* ================= CENTER TIED BOW ================= */}
        <div
          className={`relative z-30 flex flex-col items-center justify-center transition-all duration-700 transform ${
            stage === 'wrapped'
              ? 'scale-100 opacity-100 animate-float-gentle'
              : stage === 'untying'
              ? 'scale-150 opacity-0 rotate-12'
              : 'scale-50 opacity-0'
          }`}
        >
          {/* SVG Beautiful Satin Gift Bow */}
          <div className="relative w-44 h-44 drop-shadow-2xl">
            <svg viewBox="0 0 200 200" className="w-full h-full">
              <defs>
                <linearGradient id="ribbonGrad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#FB7185" />
                  <stop offset="50%" stopColor="#F43F5E" />
                  <stop offset="100%" stopColor="#E11D48" />
                </linearGradient>
                <linearGradient id="ribbonHighlight" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#FDA4AF" />
                  <stop offset="100%" stopColor="#FB7185" />
                </linearGradient>
              </defs>

              {/* Hanging Ribbon Tails */}
              <path
                d="M85 110 C70 145 50 175 40 190 C60 185 75 180 85 185 C95 165 98 135 100 115 Z"
                fill="url(#ribbonGrad)"
                stroke="#BE123C"
                strokeWidth="2"
              />
              <path
                d="M115 110 C130 145 150 175 160 190 C140 185 125 180 115 185 C105 165 102 135 100 115 Z"
                fill="url(#ribbonGrad)"
                stroke="#BE123C"
                strokeWidth="2"
              />

              {/* Left Bow Loop */}
              <path
                d="M100 100 C70 50 15 55 25 90 C35 125 80 110 100 100 Z"
                fill="url(#ribbonHighlight)"
                stroke="#E11D48"
                strokeWidth="3"
              />
              {/* Left Bow Inner Hole */}
              <ellipse cx="50" cy="85" rx="16" ry="12" fill="#E11D48" opacity="0.3" transform="rotate(-15 50 85)" />

              {/* Right Bow Loop */}
              <path
                d="M100 100 C130 50 185 55 175 90 C165 125 120 110 100 100 Z"
                fill="url(#ribbonHighlight)"
                stroke="#E11D48"
                strokeWidth="3"
              />
              {/* Right Bow Inner Hole */}
              <ellipse cx="150" cy="85" rx="16" ry="12" fill="#E11D48" opacity="0.3" transform="rotate(15 150 85)" />

              {/* Center Knot (Heart-shaped center) */}
              <circle cx="100" cy="100" r="22" fill="url(#ribbonGrad)" stroke="#9F1239" strokeWidth="3.5" />
              <path
                d="M100 108 C100 108 90 99 90 92 C90 87 94 85 97 88 L100 91 L103 88 C106 85 110 87 110 92 C110 99 100 108 100 108 Z"
                fill="white"
                opacity="0.9"
              />
            </svg>

            {/* Sparkles around Bow */}
            <span className="absolute top-2 left-2 text-xl animate-bounce text-yellow-300">✨</span>
            <span className="absolute bottom-6 right-2 text-lg animate-pulse text-pink-300">💖</span>
          </div>

          {/* ================= "Open this ♡" BUTTON ================= */}
          <div
            className={`mt-4 transition-all duration-500 transform ${
              stage === 'wrapped'
                ? 'opacity-100 translate-y-0 scale-100'
                : 'opacity-0 translate-y-4 scale-95 pointer-events-none'
            }`}
          >
            <button
              onClick={handleOpenGift}
              className="px-8 py-3.5 rounded-full bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 text-white font-cute font-extrabold text-base shadow-xl shadow-pink-400/80 active:scale-90 hover:scale-105 transition-all flex items-center gap-2 cursor-pointer ring-4 ring-white/80 animate-bounce"
            >
              <span>Open this ♡</span>
              <Heart className="w-4 h-4 fill-white text-white" />
            </button>
            <p className="text-[11px] font-cute text-pink-600/90 text-center mt-2 font-semibold">
              Tap to untie the ribbon
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

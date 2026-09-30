import React, { useState, useEffect } from 'react';
import { Heart, Sparkles, ArrowRight } from 'lucide-react';
import { UsagiCharacter } from './UsagiCharacter.tsx';
import { soundFx } from './Decorations.tsx';

interface FlowerGivingSceneProps {
  onContinue: () => void;
}

interface Petal {
  id: number;
  x: number;
  size: number;
  duration: number;
  delay: number;
  rotate: number;
  color: string;
}

export const FlowerGivingScene: React.FC<FlowerGivingSceneProps> = ({ onContinue }) => {
  const [phase, setPhase] = useState<'walking' | 'presenting' | 'petals' | 'ready' | 'transitioning'>('walking');
  const [petals, setPetals] = useState<Petal[]>([]);

  useEffect(() => {
    // Generate gentle floating petals
    const newPetals: Petal[] = Array.from({ length: 24 }, (_, i) => ({
      id: i,
      x: Math.random() * 92 + 4,
      size: Math.random() * 12 + 10,
      duration: Math.random() * 4 + 4.5,
      delay: Math.random() * 2,
      rotate: Math.random() * 360,
      color: ['#FDA4AF', '#F472B6', '#FB7185', '#FECDD3', '#FBCFE8'][i % 5],
    }));
    setPetals(newPetals);

    // Timeline of flower scene
    const t1 = setTimeout(() => {
      setPhase('presenting');
      soundFx.playSparkle();
    }, 1100);

    const t2 = setTimeout(() => {
      setPhase('petals');
    }, 2200);

    const t3 = setTimeout(() => {
      setPhase('ready');
      soundFx.playPop();
    }, 3400);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  const handleContinueClick = () => {
    setPhase('transitioning');
    soundFx.playSparkle();
    setTimeout(() => {
      onContinue();
    }, 700);
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-between p-6 overflow-hidden transition-all duration-700 ${
        phase === 'transitioning'
          ? 'bg-gradient-to-b from-[#FFF0F4] via-[#FFE3EC] to-[#FFD6E4] opacity-90'
          : 'bg-gradient-to-b from-[#FFF5F7] via-[#FFE8ED] to-[#FFDDE6]'
      }`}
    >
      {/* Ambient Floating Hearts & Sparkles in Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Soft background glow circles */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-80 h-80 bg-rose-200/50 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/3 left-1/4 w-60 h-60 bg-pink-300/40 rounded-full blur-2xl" />

        {/* Floating Petals cascading gently */}
        {petals.map((p) => (
          <div
            key={p.id}
            className="absolute pointer-events-none opacity-80"
            style={{
              left: `${p.x}%`,
              top: '-30px',
              animation: `petal-fall ${p.duration}s linear infinite`,
              animationDelay: `${p.delay}s`,
            }}
          >
            <svg
              width={p.size}
              height={p.size}
              viewBox="0 0 30 30"
              style={{ transform: `rotate(${p.rotate}deg)` }}
            >
              <path
                d="M15 0 C22 8 28 15 25 22 C22 29 15 30 11 25 C7 20 8 10 15 0 Z"
                fill={p.color}
                opacity="0.88"
              />
            </svg>
          </div>
        ))}
      </div>

      {/* Top Banner & Header */}
      <div className="relative z-10 pt-8 text-center space-y-2 max-w-sm">
        <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white/90 border border-pink-200 shadow-sm text-xs font-cute text-pink-600 animate-in fade-in slide-in-from-top-4 duration-500">
          <span>🌸</span>
          <span className="font-bold tracking-wide">For My Favorite Person</span>
          <span>🌸</span>
        </div>

        {/* First Line: "These are for you ♡" */}
        <div
          className={`transition-all duration-700 transform ${
            phase !== 'walking'
              ? 'opacity-100 translate-y-0 scale-100'
              : 'opacity-0 -translate-y-4 scale-95'
          }`}
        >
          <h2 className="text-2xl sm:text-3xl font-cute font-extrabold text-pink-600 drop-shadow-xs">
            These are for you ♡
          </h2>
        </div>

        {/* Second Line: "Happy Girlfriend Day ♡" */}
        <div
          className={`transition-all duration-700 delay-200 transform ${
            phase === 'petals' || phase === 'ready' || phase === 'transitioning'
              ? 'opacity-100 translate-y-0 scale-100'
              : 'opacity-0 translate-y-3 scale-95'
          }`}
        >
          <div className="inline-block relative">
            <span className="text-xl sm:text-2xl font-cute font-black text-rose-700 tracking-wide drop-shadow-sm">
              Happy Girlfriend Day ♡
            </span>
            <div className="absolute -top-3 -right-5 text-sm animate-bounce text-pink-500">✨</div>
            <div className="absolute -bottom-1 -left-4 text-xs animate-pulse text-rose-400">🌷</div>
          </div>
          <p className="text-xs font-hand text-pink-500/90 mt-1 font-semibold">
            Fresh blooms wrapped with all my love for you
          </p>
        </div>
      </div>

      {/* Center Character Scene: Usagi Walking Forward & Presenting Bouquet */}
      <div className="relative z-20 my-auto flex flex-col items-center justify-center">
        {/* Soft Glowing Platform beneath Usagi */}
        <div className="absolute w-56 h-20 bg-rose-200/60 rounded-full blur-md bottom-2 -z-10" />

        <div
          className={`transition-all duration-1000 transform ${
            phase === 'walking'
              ? 'translate-y-16 scale-90 opacity-90'
              : phase === 'transitioning'
              ? 'scale-110 -translate-y-2'
              : 'translate-y-0 scale-100 opacity-100'
          }`}
        >
          <UsagiCharacter
            pose="giving-flowers"
            size="xl"
            className="filter drop-shadow-xl"
            bubbleText={phase === 'ready' ? 'With all my heart! ♡' : undefined}
          />
        </div>

        {/* Romantic floating hearts around the bouquet */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none w-72 h-72">
          <div className="absolute top-4 left-6 text-xl animate-sparkle text-pink-500" style={{ animationDelay: '0.2s' }}>💖</div>
          <div className="absolute top-10 right-6 text-lg animate-sparkle text-rose-400" style={{ animationDelay: '0.8s' }}>🌸</div>
          <div className="absolute bottom-16 left-4 text-base animate-sparkle text-amber-400" style={{ animationDelay: '1.2s' }}>✨</div>
          <div className="absolute bottom-12 right-6 text-xl animate-sparkle text-pink-400" style={{ animationDelay: '0.5s' }}>🌷</div>
          <div className="absolute top-1/3 right-2 text-sm animate-sparkle text-pink-300" style={{ animationDelay: '1.5s' }}>✦</div>
        </div>
      </div>

      {/* Bottom Action Area: "Continue →" Button */}
      <div className="relative z-20 w-full max-w-xs pb-6 pt-2 text-center space-y-2">
        <div
          className={`transition-all duration-700 transform ${
            phase === 'ready' || phase === 'transitioning'
              ? 'opacity-100 translate-y-0 scale-100'
              : 'opacity-0 translate-y-6 pointer-events-none'
          }`}
        >
          <button
            onClick={handleContinueClick}
            className="w-full h-14 rounded-full bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 text-white font-cute font-black text-base shadow-xl shadow-pink-300/80 active:scale-95 hover:shadow-pink-400/90 transition-all flex items-center justify-center gap-2.5 cursor-pointer ring-4 ring-pink-200/70 animate-pulse"
          >
            <span>Continue</span>
            <ArrowRight className="w-5 h-5" />
          </button>
          <p className="text-[11px] font-cute text-pink-400">
            A special sky is waiting for you ♡
          </p>
        </div>
      </div>
    </div>
  );
};

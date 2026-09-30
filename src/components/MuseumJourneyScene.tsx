import React, { useState, useEffect } from 'react';
import { Heart, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundFx } from './Decorations.tsx';
import { CuteVehicle } from './CuteVehicle.tsx';
import { UsagiCharacter } from './UsagiCharacter.tsx';

interface MuseumJourneySceneProps {
  onEnterMuseum: () => void;
}

type ScenePhase =
  | 'driving'
  | 'arrive'
  | 'get-off'
  | 'usagi-walk'
  | 'doors-open'
  | 'camera-enter';

export const MuseumJourneyScene: React.FC<MuseumJourneySceneProps> = ({ onEnterMuseum }) => {
  const [phase, setPhase] = useState<ScenePhase>('driving');
  const [roadOffset, setRoadOffset] = useState<number>(0);
  const [speech, setSpeech] = useState<string>('Off to somewhere special! 🚗💨');

  // Animation timeline
  useEffect(() => {
    soundFx.playSparkle();

    // 1. Mid-drive speech (1.6s)
    const tSpeech = setTimeout(() => {
      setSpeech('Look! The Memory Museum is right ahead! 🏛️✨');
      soundFx.playPop();
    }, 1600);

    // 2. Arrive at Museum & car stops (3.2s)
    const tArrive = setTimeout(() => {
      setPhase('arrive');
      soundFx.playPop();
      setSpeech('We arrived! 🏛️');
    }, 3200);

    // 3. Usagi steps out of the car door onto the curbside (4.2s)
    const tGetOff = setTimeout(() => {
      setPhase('get-off');
      soundFx.playPop();
    }, 4200);

    // 4. Usagi visibly walks up the marble steps toward the entrance (5.4s)
    const tWalk = setTimeout(() => {
      setPhase('usagi-walk');
      soundFx.playSparkle();
    }, 5400);

    // 5. Museum doors open with warm light, hearts & sparkles (6.6s)
    const tDoors = setTimeout(() => {
      setPhase('doors-open');
      soundFx.playSparkle();
      try {
        confetti({
          particleCount: 50,
          spread: 80,
          origin: { y: 0.45, x: 0.5 },
          colors: ['#FFB5C5', '#FFD1DC', '#FFE4E1', '#FFF0F5', '#FF69B4', '#FFE082'],
        });
      } catch {
        // ignore
      }
    }, 6600);

    // 6. Camera moves forward through the entrance (7.6s)
    const tZoom = setTimeout(() => {
      setPhase('camera-enter');
    }, 7600);

    // 7. Complete transition into Page 3 (8.4s)
    const tFinish = setTimeout(() => {
      onEnterMuseum();
    }, 8400);

    return () => {
      clearTimeout(tSpeech);
      clearTimeout(tArrive);
      clearTimeout(tGetOff);
      clearTimeout(tWalk);
      clearTimeout(tDoors);
      clearTimeout(tZoom);
      clearTimeout(tFinish);
    };
  }, [onEnterMuseum]);

  // Road scenery scroll while driving
  useEffect(() => {
    if (phase !== 'driving') return;
    let animId: number;
    const animate = () => {
      setRoadOffset((prev) => (prev + 3) % 800);
      animId = requestAnimationFrame(animate);
    };
    animId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animId);
  }, [phase]);

  const isDriving = phase === 'driving';
  const isAtMuseum = phase !== 'driving';
  const isUsagiOutside = phase === 'get-off' || phase === 'usagi-walk' || phase === 'doors-open' || phase === 'camera-enter';
  const isDoorsOpen = phase === 'doors-open' || phase === 'camera-enter';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#FFF0F4] select-none animate-in fade-in duration-300">
      
      {/* Skip Button in top corner */}
      <button
        onClick={() => {
          soundFx.playSparkle();
          onEnterMuseum();
        }}
        className="absolute top-4 right-4 z-50 px-3 py-1.5 rounded-full bg-white/90 hover:bg-white text-pink-600 font-cute text-xs font-bold border border-pink-200 shadow-sm flex items-center gap-1 active:scale-95 transition-all cursor-pointer"
      >
        <span>Skip to Museum</span>
        <span>→</span>
      </button>

      {/* Main Traveling Stage (Matching mobile max 430px) */}
      <div
        className={`relative w-full max-w-[430px] h-full flex flex-col justify-between overflow-hidden bg-gradient-to-b from-[#FFF2F6] via-[#FFE5EE] to-[#FFDCE7] transition-all duration-700 ${
          phase === 'camera-enter' ? 'scale-150 opacity-0' : 'scale-100 opacity-100'
        }`}
      >
        
        {/* ================= SKY & SCENERY LAYER (55% Height) ================= */}
        <div className="relative w-full h-[55%] overflow-hidden flex flex-col justify-between">
          
          {/* Smiling Sun in Sky */}
          <div className="absolute top-5 left-6 flex items-center gap-1 z-10 animate-pulse">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-amber-200 to-yellow-300 shadow-md shadow-amber-200/50 flex items-center justify-center border-2 border-white">
              <span className="text-xs select-none">☀️</span>
            </div>
          </div>

          {/* Floating Clouds, Stars, Sparkles, and Drifting Blossom Petals */}
          <div
            className="absolute inset-x-0 top-3 flex items-center pointer-events-none"
            style={{
              transform: `translateX(-${(roadOffset * 0.25) % 360}px)`,
            }}
          >
            <div className="flex gap-20 whitespace-nowrap min-w-[1200px] opacity-75">
              {['☁️', '🌸', '✨', '☁️', '💖', '⭐', '☁️', '🌸', '🌷', '✨', '☁️', '💕'].map((item, idx) => (
                <span key={idx} className="text-xl drop-shadow-xs">
                  {item}
                </span>
              ))}
            </div>
          </div>

          {/* Drifting Trees & Flower Bushes on the Hills */}
          <div
            className="absolute bottom-6 inset-x-0 flex items-center pointer-events-none"
            style={{
              transform: isDriving ? `translateX(-${(roadOffset * 0.8) % 400}px)` : 'translateX(0)',
              transition: isDriving ? 'none' : 'transform 1s ease-out',
            }}
          >
            <div className="flex gap-28 whitespace-nowrap min-w-[1200px] opacity-65">
              {['🌳', '🌸', '🌲', '🌺', '🌳', '🌸', '🌲', '🌷'].map((item, idx) => (
                <span key={idx} className="text-2xl drop-shadow-xs">
                  {item}
                </span>
              ))}
            </div>
          </div>

          {/* Distant Pastel Rolling Hills */}
          <div className="absolute bottom-0 inset-x-0 h-24 pointer-events-none">
            <svg viewBox="0 0 430 100" preserveAspectRatio="none" className="w-full h-full opacity-60">
              <path
                d="M 0 100 L 0 45 Q 110 20 220 50 Q 330 80 430 35 L 430 100 Z"
                fill="#FFD2E0"
              />
              <path
                d="M 0 100 L 0 65 Q 140 40 280 70 Q 360 85 430 60 L 430 100 Z"
                fill="#FFBCCF"
              />
            </svg>
          </div>

          {/* ================= FINAL DESTINATION: THE MEMORY MUSEUM ================= */}
          <div
            className={`absolute bottom-0 left-1/2 -translate-x-1/2 flex flex-col items-center transition-all duration-1000 ease-out z-20 ${
              isAtMuseum
                ? 'opacity-100 translate-y-0 scale-100'
                : 'opacity-0 translate-y-16 scale-75 pointer-events-none'
            }`}
          >
            {/* Museum Classical Triangular Pediment with Cute Chiikawa Usagi Ears */}
            <div className="relative flex flex-col items-center">
              {/* Cute Bunny Ear Architectural Accents */}
              <div className="absolute -top-3.5 flex justify-center gap-12 pointer-events-none z-10">
                <div className="w-4 h-6 bg-pink-200 border-2 border-pink-300 rounded-t-full rotate-[-12deg]" />
                <div className="w-4 h-6 bg-pink-200 border-2 border-pink-300 rounded-t-full rotate-[12deg]" />
              </div>

              {/* Pediment Triangle */}
              <div className="w-0 h-0 border-x-[140px] border-x-transparent border-b-[50px] border-b-rose-200 drop-shadow-sm relative flex items-center justify-center">
                {/* Golden Heart Crest */}
                <div className="absolute top-[22px] -translate-x-1/2 left-1/2 w-6 h-6 rounded-full bg-amber-100 border border-amber-300 flex items-center justify-center shadow-xs">
                  <Heart className="w-3.5 h-3.5 fill-rose-400 text-rose-500" />
                </div>
              </div>

              {/* Glowing Sign: "Our Memories" */}
              <div className="w-[280px] bg-gradient-to-r from-pink-400 via-rose-400 to-pink-500 py-1 px-3 rounded-lg shadow-sm border border-white flex items-center justify-center gap-1.5 -mt-0.5 z-20">
                <Sparkles className="w-3 h-3 text-amber-200 animate-spin" style={{ animationDuration: '4s' }} />
                <span className="text-white font-cute font-extrabold text-xs tracking-wider">
                  OUR MEMORIES
                </span>
                <Sparkles className="w-3 h-3 text-amber-200 animate-spin" style={{ animationDuration: '4s' }} />
              </div>
            </div>

            {/* Museum Facade, Neoclassical Pillars, and Grand Entrance Doors */}
            <div className="relative w-[264px] h-[98px] bg-gradient-to-b from-[#FFF5F8] to-[#FFE8F0] border-x-2 border-b-2 border-pink-200 shadow-md rounded-b-lg flex items-center justify-between px-3 pt-1">
              
              {/* Left Pillars with flower garland */}
              <div className="flex gap-1.5 h-full relative">
                <div className="w-3.5 h-full bg-gradient-to-r from-white via-pink-100 to-pink-200 rounded-t-xs border-x border-pink-200" />
                <div className="w-3.5 h-full bg-gradient-to-r from-white via-pink-100 to-pink-200 rounded-t-xs border-x border-pink-200" />
                <span className="absolute -top-1 left-0 text-[10px]">🌸</span>
              </div>

              {/* Grand Arched Entrance */}
              <div className="relative w-24 h-full flex flex-col items-center justify-end">
                <div className="relative w-full h-[88px] bg-pink-900/10 rounded-t-full border-2 border-pink-300 overflow-hidden shadow-inner flex items-center justify-center">
                  
                  {/* Warm Pink/Golden Glowing Light pouring out when doors open */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-b from-amber-100 via-pink-100 to-white transition-opacity duration-700 ${
                      isDoorsOpen ? 'opacity-100' : 'opacity-0'
                    }`}
                  >
                    <div className="w-full h-full bg-white/70 animate-pulse flex items-center justify-center">
                      <span className="text-xl animate-spin" style={{ animationDuration: '5s' }}>✨</span>
                    </div>
                  </div>

                  {/* Floating Hearts & Sparkles emanating outward */}
                  {isDoorsOpen && (
                    <div className="absolute inset-0 pointer-events-none flex flex-col items-center justify-center z-30">
                      <span className="text-base text-rose-400 animate-ping">💖</span>
                      <div className="flex gap-3 text-xs -mt-1">
                        <span className="text-amber-400 animate-pulse">✨</span>
                        <span className="text-pink-400 animate-bounce">🌸</span>
                      </div>
                    </div>
                  )}

                  {/* Left Museum Door */}
                  <div
                    className={`absolute top-0 bottom-0 left-0 w-1/2 bg-gradient-to-r from-rose-400 to-pink-400 border-r border-pink-600 transition-transform duration-700 origin-left flex items-center justify-end pr-0.5 z-10 ${
                      isDoorsOpen ? '-rotate-y-90 opacity-25' : 'rotate-y-0'
                    }`}
                  >
                    <div className="w-2 h-2 rounded-full bg-amber-200 border border-amber-400 shadow-xs" />
                  </div>

                  {/* Right Museum Door */}
                  <div
                    className={`absolute top-0 bottom-0 right-0 w-1/2 bg-gradient-to-l from-rose-400 to-pink-400 border-l border-pink-600 transition-transform duration-700 origin-right flex items-center justify-start pl-0.5 z-10 ${
                      isDoorsOpen ? 'rotate-y-90 opacity-25' : 'rotate-y-0'
                    }`}
                  >
                    <div className="w-2 h-2 rounded-full bg-amber-200 border border-amber-400 shadow-xs" />
                  </div>
                </div>
              </div>

              {/* Right Pillars with flower garland */}
              <div className="flex gap-1.5 h-full relative">
                <div className="w-3.5 h-full bg-gradient-to-r from-white via-pink-100 to-pink-200 rounded-t-xs border-x border-pink-200" />
                <div className="w-3.5 h-full bg-gradient-to-r from-white via-pink-100 to-pink-200 rounded-t-xs border-x border-pink-200" />
                <span className="absolute -top-1 right-0 text-[10px]">🌸</span>
              </div>
            </div>

            {/* Museum Steps & Usagi Walking up */}
            <div className="w-[300px] flex flex-col items-center relative">
              
              {/* USAGI VISIBLE AFTER GETTING OFF THE VEHICLE */}
              {isUsagiOutside && (
                <div
                  className="absolute -top-13 z-30 flex flex-col items-center transition-all duration-1000 ease-out"
                  style={{
                    left: phase === 'get-off' ? '18%' : '50%',
                    transform: 'translateX(-50%)',
                  }}
                >
                  {/* Usagi Speech Bubble */}
                  <div className="mb-0.5 bg-white/95 px-2.5 py-0.5 rounded-full shadow-xs border border-pink-200 text-[10px] font-cute text-pink-600 font-bold whitespace-nowrap animate-bounce">
                    <span>
                      {isDoorsOpen
                        ? 'Welcome inside! 💖✨'
                        : phase === 'usagi-walk'
                        ? 'We made it! 🏛️✨'
                        : "I'm out! Look! 🌸"}
                    </span>
                  </div>

                  {/* Fully Visible Usagi Character */}
                  <UsagiCharacter
                    pose={phase === 'get-off' ? 'waving' : 'cheering'}
                    size="sm"
                    className="drop-shadow-sm"
                  />
                </div>
              )}

              {/* Pink Marble Steps */}
              <div className="w-[270px] h-2.5 bg-pink-100 border-x border-b border-pink-200" />
              <div className="w-[286px] h-2.5 bg-pink-200 border-x border-b border-pink-300" />
              <div className="w-[300px] h-2.5 bg-pink-300 border-x border-b border-pink-400 shadow-sm" />
            </div>
          </div>
        </div>

        {/* ================= ROAD & VEHICLE LAYER (45% Height) ================= */}
        <div className="relative w-full h-[45%] flex flex-col justify-between bg-gradient-to-b from-[#E2B7C6] via-[#D598AE] to-[#C47D9B] shadow-inner overflow-hidden">
          
          {/* Top Verge with Blooming Flowers */}
          <div className="w-full h-5 bg-gradient-to-r from-emerald-200 via-green-200 to-emerald-200 border-y border-pink-300 flex items-center justify-around px-2 z-10">
            {['🌸', '🌱', '🌼', '🌱', '🌷', '🌱', '🌸', '🌱', '🌼'].map((fl, i) => (
              <span key={i} className="text-[10px] select-none">{fl}</span>
            ))}
          </div>

          {/* Traveling Center Road Dashes */}
          <div className="w-full h-3 flex items-center overflow-hidden">
            <div
              className="flex gap-5 whitespace-nowrap min-w-[800px]"
              style={{
                transform: isDriving ? `translateX(-${(roadOffset * 2.2) % 100}px)` : 'translateX(0)',
              }}
            >
              {Array.from({ length: 20 }).map((_, idx) => (
                <div key={idx} className="w-8 h-1 bg-white/90 rounded-full shadow-xs" />
              ))}
            </div>
          </div>

          {/* Bottom Curbside */}
          <div className="w-full h-5 bg-gradient-to-r from-pink-300 via-rose-300 to-pink-300 border-t border-pink-400/50" />

          {/* ================= BIG CUTE PINK ROOFED CAR ================= */}
          <div
            className={`absolute bottom-4 transition-all duration-1000 ease-in-out z-20 ${
              isAtMuseum
                ? 'left-4 sm:left-6'
                : 'left-1/2 -translate-x-1/2'
            }`}
          >
            {/* Usagi Speech Bubble while driving inside car */}
            {!isUsagiOutside && (
              <div className="mb-1 bg-white/95 px-3 py-0.5 rounded-full shadow-sm border border-pink-200 text-[11px] font-cute text-pink-600 font-bold flex items-center gap-1 mx-auto w-fit animate-bounce">
                <span>{speech}</span>
              </div>
            )}

            {/* Cute Vehicle - Generous, Prominent, and Big */}
            <div className="flex flex-col items-center">
              <CuteVehicle
                isDriving={isDriving}
                size="lg"
                className="w-48 h-28 sm:w-56 sm:h-32 drop-shadow-xl"
              />
            </div>
          </div>
        </div>

        {/* Radiant Warm Pink Entrance Flash as camera enters */}
        {isDoorsOpen && (
          <div
            className={`absolute inset-0 bg-gradient-to-b from-[#FFF5F8] via-[#FFE8F0] to-[#FFD8E5] z-40 pointer-events-none transition-opacity duration-700 flex flex-col items-center justify-center ${
              phase === 'camera-enter' ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div className="text-center space-y-2 animate-in zoom-in-75 duration-500">
              <span className="text-4xl animate-bounce">🏛️✨</span>
              <p className="font-cute font-black text-pink-600 text-lg">
                Entering Our Memory Museum... ♡
              </p>
              <div className="flex justify-center gap-1 text-xs text-rose-400">
                <span>💖</span>
                <span>✨</span>
                <span>📸</span>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

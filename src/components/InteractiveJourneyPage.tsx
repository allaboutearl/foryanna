import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { Heart, Sparkles, ChevronRight, Flower2, Star, Car } from 'lucide-react';
import { UsagiCharacter } from './UsagiCharacter.tsx';
import { soundFx } from './Decorations.tsx';
import { CuteVehicle } from './CuteVehicle.tsx';
import { MuseumJourneyScene } from './MuseumJourneyScene.tsx';

interface InteractiveJourneyPageProps {
  sceneText: string;
  vaultMessage?: string;
  buttonText?: string;
  onTransitionToPage3: () => void;
}

interface Particle {
  id: number;
  x: number;
  y: number;
  emoji: string;
}

// Serpentine path connecting bottom-left (Start) to top-right (Vault)
// Using 0 0 1000 1000 viewBox for sub-pixel getPointAtLength precision
const PATH_D = 'M 160 820 C 140 680 260 620 340 580 C 440 530 730 530 710 420 C 690 310 320 320 350 230 C 370 160 620 180 740 140';

// Fractions along the total path length where milestones lie
const STEP_FRACTIONS = [0, 0.25, 0.50, 0.75, 1.0];

const SPEECH_MESSAGES = [
  'Tap along the path! ♡',
  'A sweet flower bloomed! 🌸',
  'Look at the shiny star! ⭐',
  'Almost there! 💖',
  'A cute car is waiting! 🚗✨',
];

export const InteractiveJourneyPage: React.FC<InteractiveJourneyPageProps> = ({
  sceneText,
  vaultMessage = 'I saved some little moments of us here ♡',
  buttonText = 'See Our Memories →',
  onTransitionToPage3,
}) => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);
  const [hasOpenedVault, setHasOpenedVault] = useState<boolean>(false);
  const [walkToCar, setWalkToCar] = useState<boolean>(false);
  const [insideCar, setInsideCar] = useState<boolean>(false);
  const [isDrivingAway, setIsDrivingAway] = useState<boolean>(false);
  const [showJourneyScene, setShowJourneyScene] = useState<boolean>(false);

  // SVG Path Reference to sample points along the curved line
  const pathRef = useRef<SVGPathElement | null>(null);
  const currentFractionRef = useRef<number>(0);
  const animFrameRef = useRef<number | null>(null);

  // Computed milestone coordinates (percentage 0-100) along the path
  const [milestonePositions, setMilestonePositions] = useState<Array<{ x: number; y: number }>>([
    { x: 16, y: 82 },
    { x: 34, y: 58 },
    { x: 71, y: 42 },
    { x: 35, y: 23 },
    { x: 74, y: 14 },
  ]);

  // Usagi's live animated position strictly on the path
  const [usagiState, setUsagiState] = useState<{
    x: number;
    y: number;
    facing: 'left' | 'right';
    isMoving: boolean;
    hopOffset: number;
  }>({
    x: 16,
    y: 82,
    facing: 'right',
    isMoving: false,
    hopOffset: 0,
  });

  // Calculate exact milestone positions along the line once SVG path is mounted
  useEffect(() => {
    if (!pathRef.current) return;
    const path = pathRef.current;
    const totalLength = path.getTotalLength();

    const positions = STEP_FRACTIONS.map((frac) => {
      const pt = path.getPointAtLength(frac * totalLength);
      return {
        x: (pt.x / 1000) * 100,
        y: (pt.y / 1000) * 100,
      };
    });
    setMilestonePositions(positions);

    // Initial Usagi position at step 0
    const startPt = path.getPointAtLength(0);
    setUsagiState({
      x: (startPt.x / 1000) * 100,
      y: (startPt.y / 1000) * 100,
      facing: 'right',
      isMoving: false,
      hopOffset: 0,
    });

    return () => {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, []);

  // Spawn floating particle at click coordinate
  const spawnParticle = (x: number, y: number, emoji: string) => {
    const newParticle: Particle = {
      id: Date.now() + Math.random(),
      x,
      y,
      emoji,
    };
    setParticles((prev) => [...prev.slice(-12), newParticle]);
    setTimeout(() => {
      setParticles((prev) => prev.filter((p) => p.id !== newParticle.id));
    }, 1200);
  };

  // Move Usagi strictly along the line from current position to target milestone
  const advanceStep = (targetStep?: number, clickX?: number, clickY?: number) => {
    if (isTransitioning) return;

    soundFx.playPop();

    if (clickX !== undefined && clickY !== undefined) {
      const emojis = ['🌸', '✨', '💖', '⭐', '🐾', '🌷'];
      const chosen = emojis[Math.floor(Math.random() * emojis.length)];
      spawnParticle(clickX, clickY, chosen);
    }

    const nextStep = targetStep !== undefined ? targetStep : Math.min(currentStep + 1, 4);
    setCurrentStep(nextStep);

    const path = pathRef.current;
    if (!path) return;
    const totalLength = path.getTotalLength();

    const startFrac = currentFractionRef.current;
    const endFrac = STEP_FRACTIONS[nextStep];

    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current);
    }

    // Distance-based duration (e.g. 500ms for short, up to 1300ms across whole path)
    const dist = Math.abs(endFrac - startFrac);
    const duration = Math.max(500, Math.min(1300, dist * 1700));
    const startTime = performance.now();

    const stepAnim = (now: number) => {
      const elapsed = now - startTime;
      const rawProgress = Math.min(elapsed / duration, 1);

      // Smooth easeInOutCubic curve
      const ease =
        rawProgress < 0.5
          ? 4 * rawProgress * rawProgress * rawProgress
          : 1 - Math.pow(-2 * rawProgress + 2, 3) / 2;

      // Current fraction along the line
      const currentFrac = startFrac + (endFrac - startFrac) * ease;
      currentFractionRef.current = currentFrac;

      const currentDist = currentFrac * totalLength;
      // SAMPLE DIRECTLY FROM PATH: GUARANTEES USAGI FOLLOWS THE LINE WITH NO SHORTCUTS!
      const pt = path.getPointAtLength(currentDist);

      // Look slightly ahead to determine facing direction
      const delta = endFrac >= startFrac ? 5 : -5;
      const lookDist = Math.max(0, Math.min(totalLength, currentDist + delta));
      const lookPt = path.getPointAtLength(lookDist);
      const isMovingRight = endFrac >= startFrac ? lookPt.x >= pt.x : lookPt.x <= pt.x;

      // Cute hopping vertical bounce while walking
      const hopOffset = rawProgress < 1 ? Math.abs(Math.sin(rawProgress * Math.PI * 6)) * -8 : 0;

      setUsagiState({
        x: (pt.x / 1000) * 100,
        y: (pt.y / 1000) * 100,
        facing: isMovingRight ? 'right' : 'left',
        isMoving: rawProgress < 1,
        hopOffset,
      });

      if (rawProgress < 1) {
        animFrameRef.current = requestAnimationFrame(stepAnim);
      } else {
        // Finished moving
        setUsagiState((prev) => ({ ...prev, isMoving: false, hopOffset: 0 }));

        if (nextStep === 4 && !hasOpenedVault) {
          setHasOpenedVault(true);
          setTimeout(() => {
            soundFx.playSparkle();
            confetti({
              particleCount: 45,
              spread: 60,
              origin: { y: 0.6 },
              colors: ['#FFB7D5', '#FFE082', '#FF80AB', '#B388FF', '#FFD180'],
            });
          }, 350);
        }
      }
    };

    animFrameRef.current = requestAnimationFrame(stepAnim);
  };

  // Map tap handler
  const handleMapClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (currentStep < 4) {
      advanceStep(undefined, x, y);
    } else {
      spawnParticle(x, y, '💖');
    }
  };

  // AFTER THE MINI-GAME SEQUENCE:
  // 1. Usagi reaches the end of the pathway
  // 2. A cute vehicle is waiting for Usagi
  // 3. Usagi walks toward the vehicle (fully visible walking animation)
  // 4. Usagi gets inside
  // 5. The vehicle starts moving
  // 6. Usagi drives away along the pathway -> launches Vehicle Journey
  const handleStartTransition = () => {
    if (walkToCar || insideCar || isDrivingAway) return;
    soundFx.playPop();

    // Step 3: Usagi walks toward vehicle (clearly visible hop & walk)
    setWalkToCar(true);

    // Step 4: Usagi gets inside the roofed car (850ms)
    setTimeout(() => {
      setInsideCar(true);
      soundFx.playSparkle();
    }, 850);

    // Step 5 & 6: Vehicle starts moving and drives away along pathway (1350ms)
    setTimeout(() => {
      setIsDrivingAway(true);
      confetti({
        particleCount: 35,
        spread: 65,
        origin: { y: 0.6 },
        colors: ['#FFB7D5', '#FFE082', '#FF80AB', '#B388FF', '#FFD180'],
      });
    }, 1350);

    // Launch Vehicle Journey (2100ms)
    setTimeout(() => {
      setShowJourneyScene(true);
    }, 2100);
  };

  return (
    <div className="flex-1 flex flex-col justify-between px-5 py-3 select-none relative animate-in fade-in duration-300">
      {/* Header with highlighted guide text */}
      <div className="text-center space-y-2 mb-2 px-1">
        <div className="relative inline-block max-w-full">
          {/* Glowing aura highlight */}
          <div className="absolute -inset-1 bg-gradient-to-r from-pink-300/40 via-rose-200/50 to-pink-300/40 rounded-full blur-xs animate-pulse" />

          {/* Highlighted Banner for 'Tap along the path to guide Usagi ♡' */}
          <div className="relative inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/95 border-2 border-pink-300 shadow-sm shadow-pink-100/60">
            <span className="text-sm select-none animate-bounce">🌸</span>
            <h2 className="text-sm sm:text-base font-cute font-extrabold text-pink-700 tracking-tight leading-tight">
              {sceneText}
            </h2>
            <span className="text-sm select-none animate-bounce" style={{ animationDelay: '0.4s' }}>✨</span>
          </div>
        </div>

        {/* 4-Step Progress Dots */}
        <div className="flex items-center justify-center gap-2 pt-0.5">
          {[0, 1, 2, 3, 4].map((stepIdx) => (
            <div
              key={stepIdx}
              onClick={(e) => {
                e.stopPropagation();
                advanceStep(stepIdx);
              }}
              className={`transition-all duration-300 rounded-full flex items-center justify-center cursor-pointer ${
                currentStep >= stepIdx
                  ? 'w-6 h-6 bg-pink-400 text-white shadow-xs scale-105 text-xs'
                  : 'w-5 h-5 bg-pink-100 text-pink-300 text-[10px]'
              }`}
            >
              {stepIdx === 4 ? '💖' : currentStep >= stepIdx ? '🐾' : '•'}
            </div>
          ))}
        </div>
      </div>

      {/* Main Interactive Stage / Journey Canvas */}
      <div
        onClick={handleMapClick}
        className="relative w-full h-[370px] sm:h-[400px] rounded-3xl bg-gradient-to-b from-[#FFF5F7] via-[#FFF9EE] to-[#FFEFEF] border-2 border-pink-200/90 shadow-md overflow-hidden cursor-pointer"
      >
        {/* Whimsical background decorations */}
        <div className="absolute inset-0 pointer-events-none opacity-40">
          <div className="absolute top-4 left-6 text-pink-200 text-3xl font-cute">✿</div>
          <div className="absolute top-28 right-8 text-amber-200 text-2xl">✦</div>
          <div className="absolute bottom-20 left-10 text-pink-200 text-2xl font-cute">❀</div>
          <div className="absolute bottom-8 right-24 text-rose-200 text-xl font-cute">♡</div>
        </div>

        {/* Winding Trail SVG Road */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          viewBox="0 0 1000 1000"
          preserveAspectRatio="none"
        >
          {/* Broad soft pastel path foundation */}
          <path
            d={PATH_D}
            fill="none"
            stroke="#FCE7F3"
            strokeWidth="50"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.8"
          />
          {/* Stepping stones inner road */}
          <path
            d={PATH_D}
            fill="none"
            stroke="#FEF3C7"
            strokeWidth="32"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.9"
          />
          {/* Dotted path runner line that Usagi follows */}
          <path
            ref={pathRef}
            d={PATH_D}
            fill="none"
            stroke="#F472B6"
            strokeWidth="5"
            strokeDasharray="14 14"
            strokeLinecap="round"
          />
        </svg>

        {/* Milestone 1: Cherry Blossom 🌸 */}
        <div
          onClick={(e) => {
            e.stopPropagation();
            advanceStep(1, e.clientX, e.clientY);
          }}
          style={{ left: `${milestonePositions[1].x}%`, top: `${milestonePositions[1].y}%` }}
          className={`absolute -translate-x-1/2 -translate-y-1/2 transition-transform duration-300 z-10 ${
            currentStep >= 1 ? 'scale-115 text-pink-500' : 'text-pink-300 hover:scale-110'
          }`}
        >
          <div className="relative group">
            <div className={`p-2.5 rounded-full bg-white/95 shadow-md border border-pink-200 ${currentStep === 1 ? 'animate-bounce' : ''}`}>
              <Flower2 className="w-5 h-5 fill-pink-300 text-pink-500 animate-spin" style={{ animationDuration: '8s' }} />
            </div>
            {currentStep < 1 && (
              <span className="absolute -bottom-4 left-1/2 -translate-x-1/2 text-[9px] font-cute text-pink-500 whitespace-nowrap bg-white/90 px-1.5 py-0.5 rounded-full border border-pink-100 shadow-xs">
                Tap!
              </span>
            )}
          </div>
        </div>

        {/* Milestone 2: Golden Lucky Star ⭐ */}
        <div
          onClick={(e) => {
            e.stopPropagation();
            advanceStep(2, e.clientX, e.clientY);
          }}
          style={{ left: `${milestonePositions[2].x}%`, top: `${milestonePositions[2].y}%` }}
          className={`absolute -translate-x-1/2 -translate-y-1/2 transition-transform duration-300 z-10 ${
            currentStep >= 2 ? 'scale-115 text-amber-500' : 'text-amber-300 hover:scale-110'
          }`}
        >
          <div className="relative group">
            <div className={`p-2.5 rounded-full bg-white/95 shadow-md border border-amber-200 ${currentStep === 2 ? 'animate-bounce' : ''}`}>
              <Star className="w-5 h-5 fill-amber-300 text-amber-500 animate-pulse" />
            </div>
            {currentStep < 2 && (
              <span className="absolute -bottom-4 left-1/2 -translate-x-1/2 text-[9px] font-cute text-amber-600 whitespace-nowrap bg-white/90 px-1.5 py-0.5 rounded-full border border-amber-100 shadow-xs">
                Tap!
              </span>
            )}
          </div>
        </div>

        {/* Milestone 3: Love Sparkle Gem 💖 */}
        <div
          onClick={(e) => {
            e.stopPropagation();
            advanceStep(3, e.clientX, e.clientY);
          }}
          style={{ left: `${milestonePositions[3].x}%`, top: `${milestonePositions[3].y}%` }}
          className={`absolute -translate-x-1/2 -translate-y-1/2 transition-transform duration-300 z-10 ${
            currentStep >= 3 ? 'scale-115 text-rose-500' : 'text-rose-300 hover:scale-110'
          }`}
        >
          <div className="relative group">
            <div className={`p-2.5 rounded-full bg-white/95 shadow-md border border-rose-200 ${currentStep === 3 ? 'animate-bounce' : ''}`}>
              <Heart className="w-5 h-5 fill-rose-400 text-rose-500 animate-pulse" />
            </div>
            {currentStep < 3 && (
              <span className="absolute -bottom-4 left-1/2 -translate-x-1/2 text-[9px] font-cute text-rose-500 whitespace-nowrap bg-white/90 px-1.5 py-0.5 rounded-full border border-rose-100 shadow-xs">
                Tap!
              </span>
            )}
          </div>
        </div>

        {/* Milestone 4: THE MEMORY VAULT / PHOTO FRAME */}
        <div
          onClick={(e) => {
            e.stopPropagation();
            advanceStep(4, e.clientX, e.clientY);
          }}
          style={{ left: `${milestonePositions[4].x}%`, top: `${milestonePositions[4].y}%` }}
          className={`absolute -translate-x-1/2 -translate-y-1/2 z-20 transition-all duration-500 ${
            currentStep === 4 ? 'scale-110' : 'hover:scale-105'
          }`}
        >
          <div className="relative flex flex-col items-center">
            {/* Glowing aura */}
            <div className="absolute inset-0 bg-pink-400/30 rounded-full blur-xl animate-pulse" />

            {/* Glowing Vehicle Icon for Our Memories */}
            <div
              className={`relative p-3.5 rounded-3xl bg-gradient-to-br from-pink-400 via-rose-300 to-amber-300 shadow-xl border-2 border-white flex items-center justify-center transition-transform ${
                hasOpenedVault ? 'rotate-3 scale-110' : 'animate-bounce'
              }`}
            >
              <div className="w-10 h-10 rounded-2xl bg-white/95 flex items-center justify-center shadow-inner">
                {hasOpenedVault ? (
                  <span className="text-xl animate-bounce">
                    🚗
                  </span>
                ) : (
                  <Car className="w-6 h-6 text-pink-500 animate-pulse" />
                )}
              </div>
            </div>

            {/* Label below milestone */}
            <span className="mt-1 text-[10px] font-cute font-bold text-pink-600 bg-white/90 px-2 py-0.5 rounded-full border border-pink-200 shadow-xs whitespace-nowrap">
              {hasOpenedVault ? 'Vehicle Ready! 🚗' : 'Our Memories 🚗'}
            </span>
          </div>
        </div>

        {/* Cute vehicle waiting at the end of the pathway */}
        {currentStep === 4 && (
          <div
            onClick={(e) => {
              e.stopPropagation();
              handleStartTransition();
            }}
            style={{
              left: `${milestonePositions[4].x + 7}%`,
              top: `${milestonePositions[4].y - 2}%`,
              transition: isDrivingAway
                ? 'transform 1.1s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s ease 0.8s'
                : undefined,
              transform: isDrivingAway
                ? 'translate(280px, -20px) scale(0.95)'
                : 'translate(-50%, -50%)',
              opacity: isDrivingAway ? 0.15 : 1,
            }}
            className={`absolute z-35 cursor-pointer select-none ${
              isDrivingAway ? '' : 'animate-bounce'
            }`}
          >
            <div className="flex flex-col items-center">
              <span className="bg-white/95 px-2.5 py-0.5 rounded-full border border-pink-200 text-[10px] font-cute text-pink-600 font-bold shadow-xs whitespace-nowrap mb-0.5 animate-pulse">
                {isDrivingAway ? "Vroom vroom! 🚗💨" : insideCar ? "I'm inside! 💖" : "Hop in! 🚗✨"}
              </span>
              <CuteVehicle
                size="sm"
                isDriving={isDrivingAway}
                className="w-32 h-18 sm:w-36 sm:h-20 drop-shadow-md"
              />
            </div>
          </div>
        )}

        {/* TRAVELING USAGI - CLEARLY VISIBLE BEFORE HOPPING IN */}
        {!insideCar && (
          <div
            style={{
              left: `${walkToCar ? milestonePositions[4].x + 4 : usagiState.x}%`,
              top: `${walkToCar ? milestonePositions[4].y - 1 : usagiState.y}%`,
              transform: `translate(-50%, -50%) translateY(${usagiState.hopOffset}px)`,
              transition: walkToCar ? 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)' : 'none',
            }}
            className="absolute z-30 pointer-events-none"
          >
            <div className="relative flex flex-col items-center">
              {/* Usagi Speech Bubble (Centered and never flipped) */}
              <div className="mb-1 bg-white/95 px-2.5 py-1 rounded-2xl shadow-sm border border-pink-200 text-[11px] font-cute text-pink-600 whitespace-nowrap animate-bounce">
                {walkToCar ? "Going to the car! 🐾🚗" : SPEECH_MESSAGES[currentStep]}
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-0 border-x-3 border-x-transparent border-t-4 border-t-white" />
              </div>

              {/* Usagi Character oriented in travel direction */}
              <div
                style={{
                  transform: `scaleX(${usagiState.facing === 'left' ? -1 : 1})`,
                  transition: 'transform 0.2s ease',
                }}
              >
                <UsagiCharacter
                  pose={walkToCar ? 'waving' : currentStep === 4 ? 'cheering' : usagiState.isMoving ? 'waving' : 'standing'}
                  size="sm"
                  className="drop-shadow-sm"
                />
              </div>
            </div>
          </div>
        )}

        {/* Dynamic Interactive Particles */}
        {particles.map((p) => (
          <div
            key={p.id}
            style={{
              left: p.x,
              top: p.y,
              animation: 'heart-float 1.2s ease-out forwards',
            }}
            className="absolute pointer-events-none text-xl select-none z-40"
          >
            {p.emoji}
          </div>
        ))}

        {/* Helper Hint */}
        {currentStep < 4 && (
          <div className="absolute bottom-2 inset-x-0 text-center pointer-events-none">
            <span className="text-[11px] font-cute text-pink-500 bg-white/80 backdrop-blur-xs px-3 py-1 rounded-full border border-pink-200 shadow-xs animate-pulse">
              🐾 Tap anywhere to help Usagi follow the path!
            </span>
          </div>
        )}
      </div>

      {/* REVEALED CONTENT WHEN VAULT OPENS (Step 4) */}
      <div className="min-h-[120px] flex flex-col justify-end mt-3">
        {hasOpenedVault ? (
          <div className="space-y-3 animate-in fade-in slide-in-from-bottom-3 duration-500 text-center">
            {/* Message Card */}
            <div className="bg-white/95 border-2 border-pink-200 rounded-2xl p-3 shadow-md">
              <p className="text-base sm:text-lg font-hand font-semibold text-gray-800 leading-snug">
                {vaultMessage}
              </p>
            </div>

            {/* Hop In & Drive to the Museum Button */}
            <button
              onClick={handleStartTransition}
              disabled={walkToCar || insideCar || isDrivingAway}
              className="w-full h-14 rounded-3xl bg-gradient-to-r from-pink-400 via-rose-400 to-pink-500 text-white font-cute font-extrabold text-base shadow-lg shadow-pink-300/80 active:scale-95 hover:shadow-xl transition-all flex items-center justify-center gap-2 cursor-pointer border-2 border-white/60 animate-pulse"
            >
              <span>{isDrivingAway ? 'Driving to the Museum... 🚗💨' : 'Hop In & Drive to the Museum! 🚗💨'}</span>
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        ) : (
          /* Step-by-Step progress guide button */
          <div className="space-y-2">
            <button
              onClick={() => advanceStep()}
              className="w-full h-13 rounded-3xl bg-white/90 border-2 border-pink-300 text-pink-600 font-cute font-bold text-sm shadow-sm hover:bg-pink-50 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Take Next Step 🐾</span>
              <Sparkles className="w-4 h-4 text-pink-400 animate-spin" style={{ animationDuration: '4s' }} />
            </button>
            <p className="text-[11px] font-cute text-pink-400 text-center">
              Guide Usagi along the winding trail to unlock our memories ♡
            </p>
          </div>
        )}
      </div>

      {/* FINAL DESTINATION — VEHICLE JOURNEY & MEMORY MUSEUM */}
      {showJourneyScene && (
        <MuseumJourneyScene
          onEnterMuseum={() => {
            setShowJourneyScene(false);
            onTransitionToPage3();
          }}
        />
      )}
    </div>
  );
};

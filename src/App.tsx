/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect, useCallback } from 'react';
import confetti from 'canvas-confetti';
import { Heart, Sparkles, ChevronRight, ChevronLeft, RotateCcw, SlidersHorizontal } from 'lucide-react';
import { UsagiCharacter } from './components/UsagiCharacter.tsx';
import { FloatingBackgroundDecorations, soundFx } from './components/Decorations.tsx';
import { PhotoCard } from './components/PhotoCard.tsx';
import { MusicPlayer, MusicPlayerHandle } from './components/MusicPlayer.tsx';
import { EditModal } from './components/EditModal.tsx';
import { TypewriterLetter } from './components/TypewriterLetter.tsx';
import { InteractiveJourneyPage } from './components/InteractiveJourneyPage.tsx';
import { WelcomePage1 } from './components/WelcomePage1.tsx';
import { MemoryMuseumPage } from './components/MemoryMuseumPage.tsx';
import { FlowerGivingScene } from './components/FlowerGivingScene.tsx';
import { GiftRibbonOverlay } from './components/GiftRibbonOverlay.tsx';
import { DEFAULT_CONFIG } from './config.ts';
import { SurpriseConfig } from './types.ts';

const STORAGE_KEY = 'gf_day_usagi_surprise_v9';

export default function App() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [config, setConfig] = useState<SurpriseConfig>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY) || localStorage.getItem('gf_day_usagi_surprise_v8');
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          ...DEFAULT_CONFIG,
          ...parsed,
          musicUrl: DEFAULT_CONFIG.musicUrl,
          herName: parsed.herName || DEFAULT_CONFIG.herName,
          welcomeTitle: (parsed.welcomeTitle && !parsed.welcomeTitle.toLowerCase().includes('darl') && !parsed.welcomeTitle.toLowerCase().includes('girlfriend day')) ? parsed.welcomeTitle : DEFAULT_CONFIG.welcomeTitle,
        };
      }
    } catch {
      // fallback
    }
    return DEFAULT_CONFIG;
  });

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [showFlowerScene, setShowFlowerScene] = useState(false);
  const [showGiftOverlay, setShowGiftOverlay] = useState(false);
  const [isLetterFinished, setIsLetterFinished] = useState(false);
  const [floatingHearts, setFloatingHearts] = useState<{ id: number; x: number; y: number }[]>([]);
  const musicPlayerRef = useRef<MusicPlayerHandle | null>(null);

  // Reset letter finish state if not on page 4
  useEffect(() => {
    if (currentPage !== 4) {
      setIsLetterFinished(false);
    }
  }, [currentPage]);

  // Save config changes to localStorage
  const handleSaveConfig = (newConfig: SurpriseConfig) => {
    setConfig(newConfig);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newConfig));
    } catch {
      // ignore
    }
  };

  // Trigger heart burst / confetti
  const triggerConfetti = () => {
    soundFx.playSparkle();

    // Pastel romantic confetti burst
    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.7 },
      colors: ['#FFB7D5', '#FFAAA6', '#FFD3B6', '#D5AAFF', '#FFDFBA', '#FFFFBA'],
      shapes: ['circle'],
      scalar: 1.1,
    });
  };

  const handleLetterComplete = useCallback(() => {
    setIsLetterFinished(true);
    soundFx.playSparkle();
    triggerConfetti();
  }, []);

  // Add a cute floating heart on tap anywhere on final page
  const handleScreenTap = (e: React.MouseEvent<HTMLDivElement>) => {
    if (currentPage === 4) {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const id = Date.now() + Math.random();
      setFloatingHearts((prev) => [...prev.slice(-8), { id, x, y }]);
      setTimeout(() => {
        setFloatingHearts((prev) => prev.filter((h) => h.id !== id));
      }, 1400);
    }
  };

  // Start button handler (Page 1 -> Page 2 + start music)
  const handleStart = async () => {
    soundFx.playPop();
    setHasStarted(true);
    if (musicPlayerRef.current) {
      await musicPlayerRef.current.play();
    }
    triggerConfetti();
    setCurrentPage(2);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNext = (targetPage: number) => {
    soundFx.playPop();
    setCurrentPage(targetPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePrev = () => {
    soundFx.playPop();
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleRestart = () => {
    soundFx.playSparkle();
    setShowFlowerScene(false);
    setShowGiftOverlay(false);
    setIsLetterFinished(false);
    setCurrentPage(1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div
      onClick={handleScreenTap}
      className="min-h-[100dvh] w-full flex items-center justify-center bg-[#FFF8F0] relative overflow-x-hidden"
    >
      {/* Pastel background glow & floating particles */}
      <FloatingBackgroundDecorations />

      {/* Music Player in top corner */}
      <MusicPlayer ref={musicPlayerRef} src={config.musicUrl} />

      {/* Mobile Frame Container (Max 430px wide, 100% on phones) */}
      <main className="w-full max-w-[430px] min-h-[100dvh] bg-gradient-to-b from-[#FFFDF9] via-[#FFF9FA] to-[#FFF3F6] relative z-10 flex flex-col shadow-2xl sm:border-x sm:border-pink-200/60 pb-10 transition-colors duration-700">
        
        {/* Top Progress Track (Pages 1 to 4) */}
        <header className="pt-6 pb-2 px-6 flex items-center justify-between z-20">
          {currentPage > 1 ? (
            <button
              onClick={handlePrev}
              className="w-8 h-8 rounded-full bg-white/80 border border-pink-200 text-pink-600 flex items-center justify-center shadow-xs active:scale-90 transition-transform cursor-pointer"
              aria-label="Previous page"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
          ) : (
            <div className="w-8" />
          )}

          {/* Heart dots indicator */}
          <div className="flex items-center gap-2">
            {[1, 2, 3, 4].map((step) => (
              <button
                key={step}
                onClick={() => {
                  soundFx.playPop();
                  setCurrentPage(step);
                }}
                className={`transition-all duration-300 flex items-center justify-center cursor-pointer ${
                  currentPage === step
                    ? 'w-7 h-7 bg-pink-500 text-white rounded-full shadow-md scale-110'
                    : currentPage > step
                    ? 'w-6 h-6 bg-pink-200 text-pink-500 rounded-full'
                    : 'w-5 h-5 bg-pink-100 text-pink-300 rounded-full'
                }`}
                aria-label={`Go to step ${step}`}
              >
                <Heart
                  className={`w-3.5 h-3.5 ${
                    currentPage === step
                      ? 'fill-white'
                      : currentPage > step
                      ? 'fill-pink-400'
                      : 'fill-pink-200'
                  }`}
                />
              </button>
            ))}
          </div>

          <div className="text-xs font-cute text-pink-500 font-bold w-8 text-right">
            {currentPage}/4
          </div>
        </header>

        {/* ----------------- PAGE 1: WELCOME (REVAMPED VISUAL DESIGN & ANIMATION) ----------------- */}
        {currentPage === 1 && (
          <WelcomePage1
            config={config}
            onStart={handleStart}
            triggerConfetti={triggerConfetti}
          />
        )}

        {/* ----------------- PAGE 2: INTERACTIVE MEMORY JOURNEY ----------------- */}
        {currentPage === 2 && (
          <InteractiveJourneyPage
            sceneText={config.sceneText || "Tap along the path to guide Usagi ♡"}
            vaultMessage={config.journeyVaultMessage || "I saved some little moments of us here ♡"}
            buttonText={config.journeyButtonText || config.sceneButtonText || "See Our Memories →"}
            onTransitionToPage3={() => {
              setCurrentPage(3);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {/* ----------------- PAGE 3: OUR MEMORY MUSEUM (CURATED EXHIBITS) ----------------- */}
        {currentPage === 3 && (
          <MemoryMuseumPage
            memories={config.memories}
            museumTitle={config.memoriesTitle || 'OUR MEMORIES'}
            onNext={() => {
              soundFx.playPop();
              setShowFlowerScene(true);
            }}
          />
        )}

        {/* ----------------- FLOWER-GIVING FULL-SCREEN ANIMATION SCENE ----------------- */}
        {showFlowerScene && (
          <FlowerGivingScene
            onContinue={() => {
              setShowFlowerScene(false);
              setShowGiftOverlay(true);
              setCurrentPage(4);
              setIsLetterFinished(false);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {/* ----------------- CUTE GIFT RIBBON UNTYING OVERLAY ----------------- */}
        {showGiftOverlay && (
          <GiftRibbonOverlay
            onOpened={() => {
              setShowGiftOverlay(false);
              soundFx.playSparkle();
            }}
          />
        )}

        {/* ----------------- PAGE 4: FINAL MESSAGE & ROMANTIC GIFT SCENE ----------------- */}
        {currentPage === 4 && (
          <section className="flex-1 flex flex-col justify-between px-5 py-4 animate-in fade-in duration-700 relative z-10">
            {/* Soft Ambient Pastel Glows in Background */}
            <div className="absolute top-1/4 -right-8 w-72 h-72 bg-purple-200/35 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-1/3 -left-8 w-72 h-72 bg-pink-300/40 rounded-full blur-3xl pointer-events-none" />

            {/* Small Twinkling Stars & Floating Hearts in Background */}
            <span className="absolute top-10 left-8 text-xs text-amber-300 animate-pulse pointer-events-none select-none">✦</span>
            <span className="absolute top-16 right-10 text-sm text-pink-400 animate-sparkle pointer-events-none select-none">✨</span>
            <span className="absolute top-36 left-8 text-xs text-purple-400 animate-pulse pointer-events-none select-none">✦</span>
            <span className="absolute bottom-28 right-8 text-sm text-amber-300 animate-sparkle pointer-events-none select-none">✨</span>
            <span className="absolute bottom-36 left-6 text-xs text-pink-300 animate-pulse pointer-events-none select-none">🌸</span>
            <span className="absolute top-1/2 -right-2 text-sm text-pink-400 animate-pulse pointer-events-none select-none">💖</span>
            <span className="absolute top-2/3 -left-2 text-sm text-purple-300 animate-pulse pointer-events-none select-none">✨</span>

            {/* Header Title */}
            <div className="text-center mb-2 relative z-10">
              <h2 className="text-2xl font-cute font-extrabold text-pink-700">
                {config.finalTitle}
              </h2>
            </div>

            {/* Usagi Letter Decoration */}
            <div className="flex justify-center -mb-3 relative z-20">
              <UsagiCharacter
                pose="letter"
                size="lg"
                bubbleText="For you, with all my love! ♡"
                onClick={() => {
                  soundFx.playSparkle();
                  triggerConfetti();
                }}
              />
            </div>

            {/* Large Readable Love Letter with Soft Fade-in Animation & Frosted Glass */}
            <div className="relative z-10 bg-white/95 rounded-3xl p-5 sm:p-6 shadow-xl border-2 border-pink-200/90 mb-5 my-auto max-h-[52vh] overflow-y-auto scroll-smooth">
              {/* Corner Cute Ribbon */}
              <div className="absolute top-3 right-3 text-pink-400 text-sm select-none">
                🎀
              </div>

              {/* Exact Unaltered Personal Love Letter with Typewriter Reveal */}
              <TypewriterLetter
                text={config.loveLetter}
                speed={28}
                onComplete={handleLetterComplete}
              />

              {/* Heart burst interactive button */}
              <div className="mt-5 pt-3 border-t border-pink-100 flex items-center justify-between">
                <span className="text-xs font-cute text-pink-400 font-medium">
                  Tap to send love ♡
                </span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    triggerConfetti();
                    soundFx.playSparkle();
                  }}
                  className="bg-pink-100 hover:bg-pink-200 text-pink-600 px-3.5 py-1.5 rounded-full text-xs font-cute font-bold flex items-center gap-1 active:scale-90 transition-transform cursor-pointer shadow-xs border border-pink-200"
                >
                  <Heart className="w-3.5 h-3.5 fill-pink-500 text-pink-500 animate-pulse" />
                  <span>Send Love ♡</span>
                </button>
              </div>
            </div>

            {/* Bottom Actions: "Read From Beginning ♡" ONLY APPEARS AFTER TEXT ANIMATION IS FINISH */}
            {isLetterFinished && (
              <div className="space-y-2 pb-4 pt-1 relative z-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
                <button
                  onClick={handleRestart}
                  className="w-full h-14 rounded-3xl bg-gradient-to-r from-pink-400 via-rose-400 to-pink-500 text-white font-cute font-bold text-base shadow-lg shadow-pink-200 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Read From Beginning ♡</span>
                </button>

                <p className="text-[11px] font-cute text-pink-400 text-center font-medium">
                  Happy Girlfriend Day, my love! Forever and always ♡
                </p>
              </div>
            )}
          </section>
        )}

        {/* Floating Heart Particles (when tapping on screen) */}
        {floatingHearts.map((heart) => (
          <div
            key={heart.id}
            className="absolute pointer-events-none select-none z-50 animate-bounce text-pink-500"
            style={{
              left: heart.x - 12,
              top: heart.y - 12,
              animation: 'heart-float 1.2s ease-out forwards',
            }}
          >
            <span className="text-2xl drop-shadow-md">💖</span>
          </div>
        ))}

        {/* Edit Configuration Modal */}
        <EditModal
          isOpen={isEditOpen}
          onClose={() => setIsEditOpen(false)}
          config={config}
          onSave={handleSaveConfig}
        />
      </main>
    </div>
  );
}

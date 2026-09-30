import React, { useState } from 'react';
import { Sparkles, Heart, ChevronRight, X, ZoomIn, Eye } from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundFx } from './Decorations.tsx';
import { UsagiCharacter } from './UsagiCharacter.tsx';

interface MemoryItem {
  id: string;
  image: string;
  message?: string;
  caption?: string;
  date?: string;
}

interface MemoryMuseumPageProps {
  memories: MemoryItem[];
  museumTitle?: string;
  onNext: () => void;
}

export const MemoryMuseumPage: React.FC<MemoryMuseumPageProps> = ({
  memories,
  museumTitle = 'OUR MEMORIES',
  onNext,
}) => {
  const [selectedExhibitIndex, setSelectedExhibitIndex] = useState<number | null>(null);
  const [activeHighlightId, setActiveHighlightId] = useState<string | null>(null);

  // Roman numerals for classical museum exhibits
  const romanNumerals = ['I', 'II', 'III', 'IV', 'V', 'VI'];

  const handleExhibitTap = (index: number, id: string) => {
    soundFx.playSparkle();
    setActiveHighlightId(id);

    try {
      confetti({
        particleCount: 25,
        spread: 50,
        origin: { y: 0.5, x: 0.5 },
        colors: ['#FFB5C5', '#FFE082', '#FFD1DC', '#FFF0F5'],
      });
    } catch {
      // ignore
    }

    setTimeout(() => {
      setSelectedExhibitIndex(index);
    }, 200);
  };

  const selectedMemory =
    selectedExhibitIndex !== null ? memories[selectedExhibitIndex] : null;

  return (
    <div className="relative flex-1 flex flex-col justify-between select-none animate-in fade-in duration-500 overflow-hidden bg-gradient-to-b from-[#FFF6F9] via-[#FAF0F4] to-[#F5E6EE] -mx-4 sm:-mx-6 -my-4 px-4 sm:px-6 py-4">
      
      {/* ================= 1. MUSEUM ARCHITECTURE & AMBIENT GLOW ================= */}
      {/* Ambient warm ceiling chandeliers / light cast */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-48 bg-gradient-to-b from-amber-100/50 via-pink-100/30 to-transparent blur-2xl pointer-events-none -z-10" />
      <div className="absolute top-1/3 left-0 w-48 h-96 bg-rose-100/25 blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 right-0 w-48 h-96 bg-pink-200/25 blur-3xl pointer-events-none -z-10" />

      {/* Floating subtle museum light particles & sparkles */}
      <span className="absolute top-8 left-8 text-xs text-amber-300 animate-pulse pointer-events-none select-none">✦</span>
      <span className="absolute top-16 right-10 text-sm text-pink-400 animate-sparkle pointer-events-none select-none">✨</span>
      <span className="absolute top-44 left-5 text-xs text-purple-300 animate-particle-twinkle pointer-events-none select-none">✦</span>
      <span className="absolute top-2/3 right-6 text-sm text-amber-300 animate-sparkle pointer-events-none select-none">✨</span>
      <span className="absolute bottom-40 left-6 text-xs text-pink-300 animate-pulse pointer-events-none select-none">🌸</span>

      {/* Classical Museum Side Columns (Left & Right Fluting) */}
      <div className="absolute top-0 bottom-0 left-1.5 w-2 bg-gradient-to-r from-pink-200/50 via-white/80 to-pink-300/40 border-r border-pink-200/40 pointer-events-none z-10 hidden sm:block" />
      <div className="absolute top-0 bottom-0 right-1.5 w-2 bg-gradient-to-l from-pink-200/50 via-white/80 to-pink-300/40 border-l border-pink-200/40 pointer-events-none z-10 hidden sm:block" />

      {/* ================= 2. GRAND ENTRANCE & TASTEFUL MUSEUM SIGN ================= */}
      <header className="relative flex flex-col items-center mb-6 pt-1 z-20">
        
        {/* Classical Triangular Pediment Archway Accent */}
        <div className="relative flex flex-col items-center">
          {/* Bunny Ear Architectural Motifs */}
          <div className="flex justify-center gap-10 -mb-1 pointer-events-none">
            <div className="w-3 h-4 bg-pink-200 border border-pink-300 rounded-t-full rotate-[-10deg]" />
            <div className="w-3 h-4 bg-pink-200 border border-pink-300 rounded-t-full rotate-[10deg]" />
          </div>

          {/* Gilded Plaque: "OUR MEMORIES" */}
          <div className="relative bg-gradient-to-r from-[#D8B490] via-[#F4E3D0] to-[#D8B490] p-0.5 rounded-xl shadow-md border border-[#E6CCA8]">
            <div className="bg-gradient-to-b from-[#FFFDF9] via-[#FAF4ED] to-[#F5ECE0] px-5 py-2 rounded-[10px] flex flex-col items-center border border-amber-200/70">
              
              <div className="flex items-center gap-2">
                <span className="text-amber-400 text-xs">🏛️</span>
                <span className="text-sm font-cute font-black text-[#6E473B] tracking-widest uppercase">
                  {museumTitle || 'OUR MEMORIES'}
                </span>
                <span className="text-amber-400 text-xs">🏛️</span>
              </div>

              <div className="flex items-center gap-1.5 mt-0.5 text-[10px] font-hand font-semibold text-pink-600">
                <span>✦</span>
                <span>The Permanent Gallery of Our Moments</span>
                <span>✦</span>
              </div>
            </div>
          </div>
        </div>

        {/* Curator Usagi Greeting with Speech Bubble */}
        <div className="mt-3 flex items-center justify-center gap-2.5">
          <div className="cursor-pointer active:scale-95 transition-transform" onClick={() => soundFx.playPop()}>
            <UsagiCharacter pose="waving" size="xs" className="drop-shadow-xs" />
          </div>
          <div className="relative bg-white/95 px-3 py-1 rounded-2xl shadow-xs border border-pink-200 text-[11px] font-cute text-pink-700 font-bold">
            <span>Welcome! Tap any frame to inspect closely ♡</span>
            <div className="absolute top-1/2 -left-1.5 -translate-y-1/2 w-0 h-0 border-y-3 border-y-transparent border-r-4 border-r-white" />
          </div>
        </div>
      </header>

      {/* ================= 3. MUSEUM EXHIBIT WALLS WITH PHYSICAL FRAMES ================= */}
      <main className="space-y-8 flex-1 mb-6 relative z-10 max-w-sm mx-auto w-full">
        {memories.map((mem, index) => {
          const isHighlighted = activeHighlightId === mem.id;
          const roman = romanNumerals[index] || `${index + 1}`;
          const exhibitTitle = mem.caption || mem.message || `Cherished Moment ${index + 1}`;

          return (
            <section
              key={mem.id}
              className="relative flex flex-col items-center group cursor-pointer"
              onClick={() => handleExhibitTap(index, mem.id)}
            >
              {/* Overhead Brass Gallery Spotlight */}
              <div className="relative flex flex-col items-center mb-1">
                {/* Brass Fixture Sconce */}
                <div className="w-8 h-2 bg-gradient-to-r from-[#C2976D] via-[#F3E2C9] to-[#C2976D] rounded-t-xs border border-[#A87B50] shadow-xs" />
                <div className="w-14 h-1.5 bg-gradient-to-r from-[#DAB892] via-[#FFF3DE] to-[#DAB892] rounded-full shadow-xs -mt-0.5" />
                
                {/* Conical Light Glow cast onto the painting */}
                <div className="w-48 h-16 bg-gradient-to-b from-amber-100/60 via-amber-50/20 to-transparent blur-md -mb-14 pointer-events-none" />
              </div>

              {/* Physical Museum Frame (Champagne Gold / Rose Wood Molding) */}
              <div
                className={`relative w-full p-3 sm:p-3.5 rounded-2xl bg-gradient-to-br from-[#E2BFA2] via-[#D2A682] to-[#B8855E] border-2 border-[#F6E6D7] shadow-xl transition-all duration-300 ${
                  isHighlighted ? 'scale-[1.03] ring-4 ring-pink-300 shadow-2xl' : 'hover:scale-[1.01]'
                }`}
              >
                {/* Inner Gilded Bevel Trim */}
                <div className="p-1 rounded-xl bg-gradient-to-br from-[#99653B] via-[#E4BA90] to-[#8C5A32] shadow-inner">
                  
                  {/* Ivory Archival Matting (Passe-partout) */}
                  <div className="p-2 sm:p-2.5 rounded-lg bg-[#FAF7F2] border border-[#EBE3D7] shadow-xs flex flex-col items-center">
                    
                    {/* The Unaltered Original Photo (100% Unmodified) */}
                    <div className="relative w-full aspect-[4/3] rounded-md overflow-hidden bg-rose-50/40 border border-stone-200/60 shadow-inner flex items-center justify-center">
                      <img
                        src={mem.image}
                        alt={`Museum Exhibit ${roman}`}
                        className="w-full h-full object-cover select-none pointer-events-none transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />

                      {/* Subtle Glass Sheen Reflection */}
                      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-white/25 pointer-events-none" />

                      {/* Inspect badge indicator in corner */}
                      <div className="absolute bottom-2 right-2 bg-black/60 backdrop-blur-xs text-white px-2 py-0.5 rounded-full text-[10px] font-cute flex items-center gap-1 opacity-80 group-hover:opacity-100 transition-opacity">
                        <Eye className="w-3 h-3 text-pink-300" />
                        <span>Inspect</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Decorative Frame Corner Accents */}
                <div className="absolute top-1.5 left-1.5 text-[8px] text-[#7A4E2B] select-none pointer-events-none">❖</div>
                <div className="absolute top-1.5 right-1.5 text-[8px] text-[#7A4E2B] select-none pointer-events-none">❖</div>
                <div className="absolute bottom-1.5 left-1.5 text-[8px] text-[#7A4E2B] select-none pointer-events-none">❖</div>
                <div className="absolute bottom-1.5 right-1.5 text-[8px] text-[#7A4E2B] select-none pointer-events-none">❖</div>
              </div>

              {/* Museum Brass Display Plaque Mounted Underneath */}
              <div className="mt-2.5 bg-gradient-to-r from-[#DFB892] via-[#F8ECD9] to-[#DFB892] p-0.5 rounded-md shadow-sm border border-[#CFA076] max-w-[280px] w-full text-center">
                <div className="bg-[#FFFDF9] px-3 py-1.5 rounded-[4px] border border-amber-200/60 flex flex-col items-center">
                  
                  {/* Exhibit Roman Badge & Date */}
                  <div className="flex items-center justify-between w-full text-[9px] font-bold uppercase tracking-wider text-[#8A5C38] border-b border-stone-200/60 pb-0.5 mb-1">
                    <span className="flex items-center gap-1">
                      <span className="text-amber-500">✦</span>
                      <span>Exhibit {roman}</span>
                    </span>
                    <span>{mem.date || 'Permanent Archive'}</span>
                  </div>

                  {/* Caption / Title */}
                  <p className="text-xs font-hand font-semibold text-stone-800 line-clamp-2">
                    "{exhibitTitle}"
                  </p>

                  <span className="text-[9px] font-cute text-pink-500 mt-0.5 flex items-center gap-1">
                    <span>Curated with love ♡</span>
                  </span>
                </div>
              </div>
            </section>
          );
        })}
      </main>

      {/* ================= 4. POLISHED WOODEN FLOOR WITH FLOWER URNS ================= */}
      <div className="relative w-full pt-4 pb-2 z-10 flex flex-col items-center">
        
        {/* Gallery Baseboard & Polished Floor Plank */}
        <div className="w-full h-3 bg-gradient-to-r from-[#D7A781] via-[#E8C5A4] to-[#D7A781] rounded-t-sm border-t border-[#F2DCC5] shadow-xs flex items-center justify-between px-6">
          <div className="w-full h-0.5 bg-white/40 rounded-full" />
        </div>

        {/* Decorative Flower Urns on the Sides */}
        <div className="w-full flex items-center justify-between px-2 -mt-4 pointer-events-none">
          <div className="flex items-center gap-1">
            <span className="text-lg animate-flower-sway select-none">🪴</span>
            <span className="text-xs select-none">🌸</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-xs select-none">🌷</span>
            <span className="text-lg animate-flower-sway select-none" style={{ animationDelay: '0.9s' }}>🪴</span>
          </div>
        </div>

        {/* "One More Thing ♡" Button to Flower Scene */}
        <div className="w-full max-w-xs mt-3">
          <button
            onClick={() => {
              soundFx.playPop();
              onNext();
            }}
            className="w-full h-15 rounded-3xl bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 text-white font-cute font-extrabold text-base shadow-xl shadow-pink-300/80 active:scale-95 hover:shadow-pink-400 transition-all flex items-center justify-center gap-2.5 cursor-pointer ring-4 ring-pink-100 animate-button-glow"
          >
            <span>One More Thing ♡</span>
            <Heart className="w-5 h-5 fill-white text-white animate-bounce" />
          </button>
        </div>
      </div>

      {/* ================= 5. INTERACTIVE EXHIBIT INSPECTION MODAL ================= */}
      {selectedExhibitIndex !== null && selectedMemory && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-300"
          onClick={() => setSelectedExhibitIndex(null)}
        >
          <div
            className="relative w-full max-w-sm bg-gradient-to-b from-[#FFFDF9] to-[#FAF3EC] rounded-3xl p-4 sm:p-5 shadow-2xl border-2 border-amber-200/80 flex flex-col items-center animate-in zoom-in-95 duration-300 max-h-[92vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Close Button */}
            <button
              onClick={() => setSelectedExhibitIndex(null)}
              className="absolute top-3.5 right-3.5 w-8 h-8 rounded-full bg-white/90 hover:bg-white text-stone-600 border border-stone-200 shadow-xs flex items-center justify-center active:scale-90 transition-all cursor-pointer z-20"
              aria-label="Close exhibit"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Exhibit Header Banner */}
            <div className="flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-amber-100/80 text-amber-800 text-[10px] font-bold font-cute uppercase tracking-wider mb-3">
              <span>🏛️</span>
              <span>
                Exhibit {romanNumerals[selectedExhibitIndex] || `${selectedExhibitIndex + 1}`} • Museum Gallery
              </span>
            </div>

            {/* Gilded Framed Photo Container (Uncropped, unaltered) */}
            <div className="relative w-full p-2.5 rounded-2xl bg-gradient-to-br from-[#D8B490] via-[#C99C70] to-[#A87950] border border-[#F3E1CF] shadow-lg mb-3">
              <div className="rounded-xl overflow-hidden bg-black/5 flex items-center justify-center border border-amber-100/50">
                <img
                  src={selectedMemory.image}
                  alt={`Exhibit ${selectedExhibitIndex + 1}`}
                  className="w-full max-h-[50vh] object-contain select-none"
                />
              </div>
            </div>

            {/* Museum Exhibition Plaque Detail Card */}
            <div className="w-full bg-white rounded-2xl p-3.5 border border-stone-200/80 shadow-xs text-center space-y-1.5">
              <p className="text-sm font-hand font-bold text-stone-800 leading-snug">
                "{selectedMemory.caption || selectedMemory.message || `Cherished Moment ${selectedExhibitIndex + 1}`}"
              </p>
              
              <div className="flex items-center justify-center gap-2 text-[10px] font-cute text-pink-600 pt-1 border-t border-stone-100">
                <span>✦</span>
                <span>{selectedMemory.date || 'Forever in Our Heart'}</span>
                <span>✦</span>
              </div>
            </div>

            {/* Return to Gallery Button */}
            <button
              onClick={() => setSelectedExhibitIndex(null)}
              className="mt-3.5 w-full py-2.5 rounded-2xl bg-gradient-to-r from-pink-400 to-rose-400 text-white font-cute font-bold text-xs shadow-md active:scale-95 transition-all flex items-center justify-center gap-1 cursor-pointer"
            >
              <span>Back to Museum Gallery</span>
              <span>🏛️</span>
            </button>
          </div>
        </div>
      )}

    </div>
  );
};

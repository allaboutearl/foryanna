import React, { useState } from 'react';
import { Sparkles, Heart } from 'lucide-react';

interface PhotoCardProps {
  src?: string;
  alt?: string;
  caption?: string;
  aspectRatio?: 'square' | 'portrait' | 'landscape';
  className?: string;
  sticker?: string;
  tapeColor?: string;
  date?: string;
}

export const PhotoCard: React.FC<PhotoCardProps> = ({
  src,
  alt = 'Our Memory',
  caption,
  aspectRatio = 'landscape',
  className = '',
  sticker = '💖',
  tapeColor = 'rgba(254, 215, 226, 0.9)',
  date,
}) => {
  const [hasError, setHasError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const aspectClasses = {
    square: 'aspect-square',
    portrait: 'aspect-[3/4]',
    landscape: 'aspect-[4/3]',
  }[aspectRatio];

  const hasPhoto = Boolean(src && !hasError);

  return (
    <div
      className={`relative bg-white rounded-3xl p-3 shadow-md border border-pink-100/80 transition-all duration-300 hover:shadow-lg ${className}`}
    >
      {/* Cute Washi Tape Decor */}
      <div
        className="washi-tape select-none pointer-events-none"
        style={{ backgroundColor: tapeColor }}
      />

      {/* Decorative Corner Sticker */}
      {sticker && (
        <span className="absolute -bottom-2 -right-2 text-2xl select-none z-10 filter drop-shadow animate-sparkle pointer-events-none">
          {sticker}
        </span>
      )}

      {/* Photo Frame Container (Finalized & Locked) */}
      <div
        className={`relative w-full ${aspectClasses} rounded-2xl overflow-hidden bg-rose-50/60 border border-pink-100 flex items-center justify-center select-none`}
      >
        {/* Loading Spinner for image */}
        {hasPhoto && !imageLoaded && (
          <div className="absolute inset-0 bg-pink-50 animate-pulse flex items-center justify-center">
            <span className="text-2xl animate-bounce">🐰</span>
          </div>
        )}

        {hasPhoto ? (
          /* Render Finalized Photo */
          <img
            src={src}
            alt={alt}
            onLoad={() => setImageLoaded(true)}
            onError={() => setHasError(true)}
            className={`w-full h-full object-cover pointer-events-none transition-opacity duration-300 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
          />
        ) : (
          /* Finalized Keepsake Placeholder */
          <div className="flex flex-col items-center justify-center p-5 text-center text-pink-300 w-full h-full space-y-1.5">
            <div className="w-10 h-10 rounded-full bg-pink-100/60 flex items-center justify-center text-pink-400">
              <Heart className="w-5 h-5 fill-pink-300 text-pink-300" />
            </div>
            <p className="text-xs font-cute text-pink-400 font-semibold">
              Our Special Moment ♡
            </p>
          </div>
        )}
      </div>

      {/* Caption & Date Area (if provided) */}
      {(caption || date) && (
        <div className="mt-2.5 px-1 text-center">
          {caption && (
            <p className="text-base font-hand font-medium text-gray-700 leading-snug">
              {caption}
            </p>
          )}
          {date && (
            <p className="text-[11px] font-cute text-pink-400 mt-0.5 font-medium">
              {date}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

import React, { useState, useEffect, useRef } from 'react';
import { soundFx } from './Decorations.tsx';

interface TypewriterLetterProps {
  text: string;
  speed?: number;
  className?: string;
  onComplete?: () => void;
}

export const TypewriterLetter: React.FC<TypewriterLetterProps> = ({
  text,
  speed = 28,
  className = '',
  onComplete,
}) => {
  const [displayedLength, setDisplayedLength] = useState(0);
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const onCompleteRef = useRef(onComplete);
  const hasFinishedRef = useRef(false);
  const bottomAnchorRef = useRef<HTMLDivElement | null>(null);
  const lastScrollTimeRef = useRef(0);

  // Keep latest onComplete ref without causing re-runs
  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  // Screen follows text as it is typed
  useEffect(() => {
    if (!isTypingComplete && bottomAnchorRef.current) {
      const now = Date.now();
      const currentChar = text[displayedLength - 1];
      const isNewline = currentChar === '\n';

      // Throttle smooth scroll so it stays silky smooth and doesn't jitter
      if (now - lastScrollTimeRef.current > 100 || isNewline) {
        lastScrollTimeRef.current = now;
        bottomAnchorRef.current.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'nearest',
        });
      }
    }
  }, [displayedLength, isTypingComplete, text]);

  // Main typing effect with thoughtful, slow, human pacing
  useEffect(() => {
    // If already finished typing this exact text, stay complete and do not restart!
    if (hasFinishedRef.current) {
      setDisplayedLength(text.length);
      setIsTypingComplete(true);
      return;
    }

    setDisplayedLength(0);
    setIsTypingComplete(false);

    let currentIndex = 0;
    let timerId: ReturnType<typeof setTimeout>;

    const typeNextChar = () => {
      currentIndex++;
      setDisplayedLength(currentIndex);

      if (currentIndex >= text.length) {
        hasFinishedRef.current = true;
        setIsTypingComplete(true);
        soundFx.playSparkle();
        onCompleteRef.current?.();

        // Final scroll to make sure the end of the letter and buttons are in view
        setTimeout(() => {
          bottomAnchorRef.current?.scrollIntoView({
            behavior: 'smooth',
            block: 'nearest',
          });
        }, 150);
        return;
      }

      // Add natural gentle pauses for emotional, human cadence
      const char = text[currentIndex - 1];
      let delay = speed;
      if (char === '.' || char === '!' || char === '?') {
        delay = speed * 2.4; // gentle breath at the end of a thought
      } else if (char === ',' || char === ';') {
        delay = speed * 1.6; // slight pause at commas
      } else if (char === '\n') {
        delay = speed * 2.5; // pause between paragraphs
      }

      timerId = setTimeout(typeNextChar, delay);
    };

    timerId = setTimeout(typeNextChar, speed);

    return () => clearTimeout(timerId);
  }, [text, speed]);

  // Allow clicking anywhere to immediately complete the text
  const handleSkipAnimation = () => {
    if (!isTypingComplete) {
      hasFinishedRef.current = true;
      setDisplayedLength(text.length);
      setIsTypingComplete(true);
      soundFx.playPop();
      onCompleteRef.current?.();

      setTimeout(() => {
        bottomAnchorRef.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
        });
      }, 100);
    }
  };

  const visibleText = text.slice(0, displayedLength);

  return (
    <div
      onClick={handleSkipAnimation}
      className={`relative select-none cursor-pointer group ${className}`}
      title={isTypingComplete ? 'Written with love' : 'Tap to show all text immediately'}
    >
      {/* Love Letter Text with typing cursor */}
      <div className="space-y-3 font-hand text-gray-800 text-base sm:text-lg font-semibold leading-relaxed whitespace-pre-line text-left tracking-wide">
        <span>{visibleText}</span>

        {!isTypingComplete && (
          <span className="inline-flex items-center ml-1 text-pink-500 animate-pulse">
            <span className="w-1.5 h-4 bg-pink-400 inline-block align-middle rounded-full animate-bounce" />
            <span className="text-xs ml-0.5 select-none">✍️</span>
          </span>
        )}

        {/* Anchor point that the screen smoothly follows */}
        <div ref={bottomAnchorRef} className="h-2 w-full pointer-events-none" />
      </div>

      {/* Skip indicator prompt */}
      {!isTypingComplete && (
        <div className="mt-3 flex items-center justify-end gap-1 text-[11px] font-cute text-pink-400/90 animate-pulse">
          <span>Writing slowly with love... (tap to reveal all ♡)</span>
        </div>
      )}
    </div>
  );
};

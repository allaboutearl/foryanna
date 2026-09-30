import React, { useEffect, useRef, useState, useImperativeHandle, forwardRef } from 'react';

export interface MusicPlayerHandle {
  play: () => Promise<void>;
  pause: () => void;
  toggle: () => void;
  isPlaying: boolean;
}

interface MusicPlayerProps {
  src?: string;
  onAudioPlay?: () => void;
  startTime?: number; // Cut the first 10 seconds
}

export const MusicPlayer = forwardRef<MusicPlayerHandle, MusicPlayerProps>(({
  src = 'music.mp3',
  onAudioPlay,
  startTime = 10,
}, ref) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // Set start position to cut the first 10 seconds
  const applyStartTime = () => {
    if (audioRef.current && audioRef.current.currentTime < startTime) {
      audioRef.current.currentTime = startTime;
    }
  };

  // Play audio safely starting at 10 seconds
  const startPlaying = async () => {
    if (!audioRef.current) return;
    try {
      applyStartTime();
      audioRef.current.muted = false;
      await audioRef.current.play();
      setIsPlaying(true);
      onAudioPlay?.();
    } catch {
      setIsPlaying(false);
    }
  };

  const pauseAudio = () => {
    if (!audioRef.current) return;
    audioRef.current.pause();
    setIsPlaying(false);
  };

  const togglePlay = () => {
    if (isPlaying) {
      pauseAudio();
    } else {
      startPlaying();
    }
  };

  // When song reaches the end, loop back starting at the 10 second mark
  const handleEnded = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = startTime;
      audioRef.current.play().catch(() => {});
    }
  };

  useImperativeHandle(ref, () => ({
    play: startPlaying,
    pause: pauseAudio,
    toggle: togglePlay,
    isPlaying,
  }));

  // Handle source changes and set start offset
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.load();
    }
  }, [src]);

  return (
    <audio
      key={src}
      ref={audioRef}
      src={src}
      preload="auto"
      onLoadedMetadata={applyStartTime}
      onCanPlay={applyStartTime}
      onEnded={handleEnded}
      onPlay={() => setIsPlaying(true)}
      onPause={() => setIsPlaying(false)}
    />
  );
});

MusicPlayer.displayName = 'MusicPlayer';

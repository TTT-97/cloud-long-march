'use client';

import {
  createContext,
  useContext,
  useRef,
  useState,
  useCallback,
  type ReactNode,
} from 'react';

interface AudioState {
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  activeSlug: string | null;
}

interface AudioContextValue extends AudioState {
  register: (slug: string) => void;
  play: (slug: string) => void;
  pause: () => void;
  seek: (time: number) => void;
  setVolume: (v: number) => void;
}

const AudioContext = createContext<AudioContextValue | null>(null);

export function AudioContextProvider({ children }: { children: ReactNode }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [state, setState] = useState<AudioState>({
    isPlaying: false,
    currentTime: 0,
    duration: 0,
    volume: 0.8,
    activeSlug: null,
  });

  const stateRef = useRef(state);
  stateRef.current = state;

  const getAudio = useCallback(() => {
    if (typeof window === 'undefined') return null;
    if (!audioRef.current) {
      const el = new Audio();
      el.preload = 'metadata';
      el.volume = stateRef.current.volume;

      el.addEventListener('loadedmetadata', () => {
        setState((s) => ({ ...s, duration: el.duration }));
      });
      el.addEventListener('timeupdate', () => {
        setState((s) => ({ ...s, currentTime: el.currentTime }));
      });
      el.addEventListener('ended', () => {
        setState((s) => ({ ...s, isPlaying: false }));
      });
      el.addEventListener('play', () => {
        setState((s) => ({ ...s, isPlaying: true }));
      });
      el.addEventListener('pause', () => {
        setState((s) => ({ ...s, isPlaying: false }));
      });

      audioRef.current = el;
    }
    return audioRef.current;
  }, []);

  const play = useCallback(
    (slug: string) => {
      const audio = getAudio();
      if (!audio) return;

      const src = `/audio/${slug}.mp3`;
      const isSame = slug === stateRef.current.activeSlug;

      // If same product was playing, restart from beginning
      audio.src = src;
      audio.currentTime = 0;
      audio.volume = stateRef.current.volume;
      audio.play().catch(() => {});
      setState((s) => ({
        ...s,
        activeSlug: slug,
        isPlaying: true,
        currentTime: 0,
      }));
    },
    [getAudio]
  );

  const register = useCallback((slug: string) => {
    setState((s) => {
      if (s.activeSlug === slug) return s;
      return { ...s, activeSlug: slug, isPlaying: false, currentTime: 0 };
    });
  }, []);

  const pause = useCallback(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.pause();
      setState((s) => ({ ...s, isPlaying: false }));
    }
  }, []);

  const resume = useCallback(() => {
    const audio = audioRef.current;
    if (audio && stateRef.current.activeSlug) {
      audio.play().catch(() => {});
      setState((s) => ({ ...s, isPlaying: true }));
    }
  }, []);

  const seek = useCallback((time: number) => {
    const audio = audioRef.current;
    if (audio) {
      audio.currentTime = time;
      setState((s) => ({ ...s, currentTime: time }));
    }
  }, []);

  const setVolume = useCallback((v: number) => {
    const audio = audioRef.current;
    if (audio) {
      audio.volume = v;
    }
    setState((s) => ({ ...s, volume: v }));
  }, []);

  return (
    <AudioContext.Provider
      value={{
        ...state,
        register,
        play,
        pause,
        seek,
        setVolume,
      }}
    >
      {children}
    </AudioContext.Provider>
  );
}

export function useAudio(): AudioContextValue {
  const ctx = useContext(AudioContext);
  if (!ctx) {
    throw new Error('useAudio must be used within AudioContextProvider');
  }
  return ctx;
}

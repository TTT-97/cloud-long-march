'use client';

import { useAudio } from './audio-context';
import { motion } from 'motion/react';
import { Play, Pause } from 'lucide-react';
import { getProductBySlug } from '@/data';
import { useLocale } from 'next-intl';

function formatTime(seconds: number): string {
  if (!isFinite(seconds)) return '0:00';
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, '0')}`;
}

export function AudioPlayer() {
  const {
    isPlaying,
    currentTime,
    duration,
    activeSlug,
    play,
    pause,
    seek,
  } = useAudio();

  const locale = useLocale();
  const product = activeSlug ? getProductBySlug(activeSlug) : null;

  if (!activeSlug || !product) {
    return null;
  }

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  const productName =
    locale === 'zh' ? product.chineseName : product.englishName;
  const productSlogan =
    locale === 'zh' ? product.sloganCN : product.sloganEN;

  function handlePlayPause() {
    if (isPlaying) {
      pause();
    } else {
      play(activeSlug!);
    }
  }

  return (
    <motion.div
      className="fixed bottom-0 left-0 right-0 z-50 glass border-t border-gold/10"
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    >
      {/* Top gold gradient line */}
      <div className="pointer-events-none absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />

      <div className="mx-auto flex max-w-5xl items-center gap-4 px-4 py-3 sm:px-6">
        {/* Left: Product info */}
        <div className="hidden min-w-0 sm:block sm:w-44">
          <p className="truncate text-xs font-medium text-cream/90">
            {productName}
          </p>
          <p className="truncate text-[10px] text-cream/40">{productSlogan}</p>
        </div>

        {/* Center: Progress bar + time */}
        <div className="flex flex-1 items-center gap-3">
          <span className="text-[10px] tabular-nums text-cream/50 w-10 text-right">
            {formatTime(currentTime)}
          </span>

          <div className="relative flex-1 h-1 group">
            <div className="absolute inset-0 rounded-full bg-cream/10">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-deep-red to-gold"
                style={{ width: `${progress}%` }}
                transition={{ duration: 0.1 }}
              />
            </div>
            <input
              type="range"
              min={0}
              max={duration || 0}
              value={currentTime}
              onChange={(e) => seek(Number(e.target.value))}
              className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
              aria-label="Seek audio"
            />
            <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-30 rounded-full bg-gold blur-sm transition-opacity" />
          </div>

          <span className="text-[10px] tabular-nums text-cream/50 w-10">
            {formatTime(duration)}
          </span>
        </div>

        {/* Right: Play/Pause + mobile name */}
        <div className="flex items-center gap-2 sm:gap-3">
          <motion.button
            onClick={handlePlayPause}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-cream/10 text-cream transition-colors hover:bg-gold/20 hover:text-gold"
            whileTap={{ scale: 0.9 }}
            aria-label={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? <Pause size={14} /> : <Play size={14} />}
          </motion.button>

          <div className="min-w-0 sm:hidden">
            <p className="truncate text-[10px] text-cream/70 max-w-[80px]">
              {productName}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

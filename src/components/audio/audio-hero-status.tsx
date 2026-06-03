'use client';

import { useAudio } from './audio-context';
import { motion, useReducedMotion } from 'motion/react';
import { Headphones } from 'lucide-react';
import { useLocale } from 'next-intl';

export function AudioHeroStatus({ slug }: { slug: string }) {
  const { isPlaying, activeSlug, play } = useAudio();
  const locale = useLocale();
  const prefersReduced = useReducedMotion();

  const isActive = activeSlug === slug;
  const showPrompt = !isActive || (!isPlaying && activeSlug === slug);

  function handleTap() {
    if (!isActive) {
      play(slug);
    }
  }

  const statusText = isPlaying
    ? locale === 'zh'
      ? '聆听长征故事'
      : 'Listening to the Long March Story'
    : locale === 'zh'
      ? '点击聆听长征故事'
      : 'Tap to Listen';

  return (
    <motion.button
      onClick={handleTap}
      className="glass-light group relative z-20 flex items-center gap-3 rounded-full px-4 py-2 text-xs"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.5 }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      aria-label={statusText}
    >
      {/* Progress ring (only when playing) */}
      {isPlaying && !prefersReduced && (
        <motion.div
          className="absolute inset-0 rounded-full border border-gold/20"
          animate={{ rotate: 360 }}
          transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
        />
      )}

      {/* Headphone / indicator icon */}
      <motion.span
        className="flex h-7 w-7 items-center justify-center rounded-full bg-deep-red/10 text-deep-red"
        animate={isPlaying && !prefersReduced ? { scale: [1, 1.05, 1] } : {}}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <Headphones size={14} />
      </motion.span>

      <span className="tracking-wide text-dark/70">{statusText}</span>

      {/* Playing dot indicator */}
      {isPlaying && (
        <span className="flex items-center gap-1">
          <motion.span
            className="inline-block h-1 w-1 rounded-full bg-deep-red"
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.2, repeat: Infinity, delay: 0 }}
          />
          <motion.span
            className="inline-block h-1 w-1 rounded-full bg-gold"
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 1.2, repeat: Infinity, delay: 0.4 }}
          />
          <motion.span
            className="inline-block h-1 w-1 rounded-full bg-deep-red"
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.2, repeat: Infinity, delay: 0.8 }}
          />
        </span>
      )}
    </motion.button>
  );
}

'use client';

import { motion } from 'motion/react';
import { AudioHeroStatus } from '@/components/audio/audio-hero-status';
import { ScrollDownIndicator } from '@/components/animations/scroll-down-indicator';
import type { ProductData } from '@/data/types';

interface HeroSectionProps {
  data: ProductData;
  locale: 'zh' | 'en';
}

export function HeroSection({ data, locale }: HeroSectionProps) {
  const name = locale === 'zh' ? data.chineseName : data.englishName;
  const slogan = locale === 'zh' ? data.sloganCN : data.sloganEN;

  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <img
          src={`/images/product-bg/${data.slug}.png`}
          alt=""
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-dark/30" />
      </div>

      {/* Audio status indicator */}
      <div className="absolute top-24 z-20">
        <AudioHeroStatus slug={data.slug} />
      </div>

      {/* Product title */}
      <motion.div
        className="relative z-10 text-center"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
      >
        {/* Brand marker */}
        <motion.div
          className="mx-auto mb-6 h-px w-16 bg-gradient-to-r from-transparent via-gold to-transparent"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        />

        {/* Slogan */}
        <motion.p
          className="mb-3 text-xs font-medium tracking-[0.3em] text-gold/70 uppercase"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          {slogan}
        </motion.p>

        {/* Product name */}
        <h1 className="text-4xl font-bold tracking-wide text-deep-red sm:text-5xl md:text-6xl">
          {name}
        </h1>

        {/* Brand attribution */}
        <p className="mt-3 text-sm tracking-[0.15em] text-dark/40">
          云上长征 · Cloud Long March
        </p>

        {/* Gold divider */}
        <motion.div
          className="mx-auto mt-8 h-px w-24 bg-gradient-to-r from-transparent via-deep-red/30 to-transparent"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 0.9 }}
        />
      </motion.div>

      {/* Scroll down */}
      <div className="absolute bottom-10">
        <ScrollDownIndicator />
      </div>
    </section>
  );
}

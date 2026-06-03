'use client';

import { useRef } from 'react';
import { motion } from 'motion/react';
import { useLocale } from 'next-intl';
import { GoldParticles } from '@/components/animations/gold-particles';

export function HeroBrand() {
  const locale = useLocale();
  const mapRef = useRef<HTMLElement | null>(null);

  function scrollToMap() {
    const el = document.getElementById('journey-map');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-[#1a0608] via-[#2a0a0e] to-[#0d0d0d]">
      {/* Mountain line art SVG background */}
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full"
        viewBox="0 0 1200 800"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        {/* Far mountains */}
        <motion.path
          d="M0 500 Q150 300 300 420 Q400 360 500 400 Q650 280 800 350 Q950 250 1050 320 Q1150 280 1200 380 L1200 800 L0 800 Z"
          fill="#8B1E24"
          opacity={0.08}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.08 }}
          transition={{ duration: 2, delay: 0.3 }}
        />
        {/* Mid mountains */}
        <motion.path
          d="M0 580 Q200 400 400 520 Q550 440 650 500 Q780 420 900 480 Q1050 400 1200 500 L1200 800 L0 800 Z"
          fill="#8B1E24"
          opacity={0.12}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.12 }}
          transition={{ duration: 2, delay: 0.5 }}
        />
        {/* Near mountains */}
        <motion.path
          d="M0 650 Q250 520 500 620 Q700 550 850 600 Q1000 530 1200 620 L1200 800 L0 800 Z"
          fill="#2A2A2A"
          opacity={0.15}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.15 }}
          transition={{ duration: 2, delay: 0.7 }}
        />
      </svg>

      {/* Gold particles */}
      <GoldParticles />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center px-6 text-center">
        {/* Brand marker line */}
        <motion.div
          className="mb-8 h-px w-20 bg-gradient-to-r from-transparent via-gold to-transparent"
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        />

        {/* Main brand name */}
        <motion.h1
          className="text-4xl font-bold tracking-[0.15em] text-cream sm:text-5xl md:text-6xl lg:text-7xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          云上长征
        </motion.h1>

        {/* English name */}
        <motion.p
          className="mt-4 text-sm font-light tracking-[0.35em] text-gold/60 uppercase sm:text-base"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          Cloud Long March
        </motion.p>

        {/* Gold divider */}
        <motion.div
          className="mt-8 h-px w-16 bg-gradient-to-r from-transparent via-gold/40 to-transparent"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 1.1, ease: [0.22, 1, 0.36, 1] }}
        />

        {/* Subtitle */}
        <motion.p
          className="mt-6 max-w-lg text-sm leading-relaxed text-cream/50 sm:text-base"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.4 }}
        >
          {locale === 'zh'
            ? '从长征足迹到乡村振兴'
            : 'From the Long March to Rural Revitalization'}
        </motion.p>

        {/* CTA Button */}
        <motion.button
          onClick={scrollToMap}
          className="group mt-12 inline-flex items-center gap-3 rounded-full border border-gold/20 px-6 py-3 text-sm tracking-wider text-gold/70 transition-all hover:border-gold/50 hover:text-gold hover:shadow-[0_0_30px_rgba(212,175,55,0.1)]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2.0, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          <span className="text-xs uppercase">
            {locale === 'zh' ? '探索长征故事' : 'Discover the Story'}
          </span>
          <motion.span
            className="inline-block"
            animate={{ x: [0, 4, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            →
          </motion.span>
        </motion.button>
      </div>

      {/* Bottom fade gradient to next section */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-cream to-transparent" />
    </section>
  );
}

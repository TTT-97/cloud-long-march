'use client';

import { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useRouter } from '@/i18n/routing';
import { useLocale } from 'next-intl';
import type { ProductData } from '@/data/types';

interface StoryPanelProps {
  product: ProductData | null;
  onClose: () => void;
}

export function StoryPanel({ product, onClose }: StoryPanelProps) {
  const router = useRouter();
  const locale = useLocale();
  const isOpen = product !== null;

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!product) return null;

  const name = locale === 'zh' ? product.chineseName : product.englishName;
  const slogan = locale === 'zh' ? product.sloganCN : product.sloganEN;
  const story = locale === 'zh' ? product.storyCN : product.storyEN;
  const values = locale === 'zh' ? product.culturalValuesCN : product.culturalValuesEN;
  const ctaLabel = locale === 'zh' ? '探索完整故事 →' : 'Explore Full Story →';

  function handleExplore() {
    router.push(`/product/${product!.slug}`);
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop overlay */}
          <motion.div
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
          />

          {/* Panel — desktop: right slide-in, mobile: bottom sheet */}
          <motion.aside
            className="fixed z-50 flex flex-col border-gold/20 bg-[#1a0608]/95 backdrop-blur-xl
              md:right-0 md:top-0 md:h-full md:w-[420px] md:border-l
              max-md:bottom-0 max-md:left-0 max-md:right-0 max-md:max-h-[70vh] max-md:rounded-t-2xl max-md:border-t"
            initial={{ x: '100%', y: 0 }}
            animate={{ x: 0, y: 0 }}
            exit={{ x: '100%', y: 0 }}
            transition={{
              duration: 0.5,
              ease: [0.22, 1, 0.36, 1],
            }}
            role="dialog"
            aria-modal="true"
            aria-label={name}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute right-4 top-4 z-10 flex h-8 w-8 items-center justify-center rounded-full border border-gold/20 bg-dark/50 text-gold/60 transition-colors hover:border-gold/40 hover:text-gold"
              aria-label={locale === 'zh' ? '关闭' : 'Close'}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth={1.5}>
                <path d="M1 1l12 12M13 1L1 13" />
              </svg>
            </button>

            {/* Scrollable content */}
            <div className="flex-1 overflow-y-auto px-8 py-12">
              {/* Product image */}
              <motion.div
                className="mb-8 aspect-[4/3] overflow-hidden rounded-lg border border-gold/10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.15 }}
              >
                <img
                  src={product.heroImage}
                  alt={name}
                  className="h-full w-full object-cover"
                />
              </motion.div>

              {/* Product name */}
              <motion.h2
                className="mb-2 text-2xl font-bold tracking-wide text-cream"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.25 }}
              >
                {name}
              </motion.h2>

              {/* Slogan */}
              <motion.p
                className="mb-6 text-sm tracking-[0.2em] text-gold/60 uppercase"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.35 }}
              >
                {slogan}
              </motion.p>

              {/* Gold divider */}
              <motion.div
                className="mb-6 h-px w-16 bg-gradient-to-r from-gold/40 to-transparent"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.5, delay: 0.45 }}
              />

              {/* Story excerpt (first paragraph) */}
              <motion.p
                className="mb-8 text-sm leading-relaxed text-cream/60"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.55 }}
              >
                {story[0]}
              </motion.p>

              {/* Cultural values */}
              {values.length > 0 && (
                <motion.div
                  className="mb-8 space-y-3"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.65 }}
                >
                  <h3 className="text-xs font-medium tracking-wider text-gold/50 uppercase">
                    {locale === 'zh' ? '长征精神' : 'Long March Spirit'}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {values.map((v) => (
                      <div
                        key={v.keyword}
                        className="rounded-full border border-gold/15 px-3 py-1.5 text-xs"
                      >
                        <span className="text-gold/70">{v.keyword}</span>
                        <span className="ml-2 text-cream/40">{v.description}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>

            {/* CTA button — fixed at bottom of panel */}
            <motion.div
              className="border-t border-gold/10 px-8 py-5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.75 }}
            >
              <button
                onClick={handleExplore}
                className="flex w-full items-center justify-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-6 py-3 text-sm tracking-wider text-gold transition-all hover:border-gold/50 hover:bg-gold/15 hover:shadow-[0_0_30px_rgba(212,175,55,0.15)]"
              >
                {ctaLabel}
              </button>
            </motion.div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

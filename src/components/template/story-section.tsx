'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import { FadeInView } from '@/components/animations/fade-in-view';
import { TextReveal } from '@/components/animations/text-reveal';
import type { ProductData } from '@/data/types';

interface StorySectionProps {
  data: ProductData;
  locale: 'zh' | 'en';
}

export function StorySection({ data, locale }: StorySectionProps) {
  const [showEn, setShowEn] = useState(false);

  const paragraphs = locale === 'zh' ? data.storyCN : data.storyEN;
  const enParagraphs = data.storyEN;
  const title = locale === 'zh' ? '长征故事' : 'The Long March Story';

  return (
    <section className="px-6 py-24">
      <div className="mx-auto max-w-4xl">
        {/* Section title */}
        <TextReveal as="h2" className="mb-12 text-center text-3xl font-bold text-deep-red">
          {title}
        </TextReveal>

        {/* Story text — primary language */}
        <div className="mx-auto max-w-2xl">
          {paragraphs.map((paragraph, i) => (
            <FadeInView key={i} delay={i * 0.15} className="mb-6">
              <p className="text-base leading-relaxed text-dark/70 sm:text-lg">
                {paragraph}
              </p>
            </FadeInView>
          ))}
        </div>

        {/* Language toggle for dual reading */}
        {locale === 'zh' && (
          <div className="mt-12 text-center">
            <motion.button
              onClick={() => setShowEn(!showEn)}
              className="text-xs tracking-wider text-gold/60 hover:text-gold transition-colors"
              whileTap={{ scale: 0.95 }}
            >
              {showEn ? '隐藏英文' : 'Read in English'}
            </motion.button>

            {showEn && (
              <motion.div
                className="mt-8 mx-auto max-w-2xl border-t border-gold/10 pt-8"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                transition={{ duration: 0.4 }}
              >
                {enParagraphs.map((paragraph, i) => (
                  <FadeInView key={i} delay={i * 0.1}>
                    <p className="mb-5 text-base leading-relaxed text-dark/50 italic">
                      {paragraph}
                    </p>
                  </FadeInView>
                ))}
              </motion.div>
            )}
          </div>
        )}

        {locale === 'en' && (
          <div className="mt-12 text-center">
            <motion.button
              onClick={() => setShowEn(!showEn)}
              className="text-xs tracking-wider text-gold/60 hover:text-gold transition-colors"
              whileTap={{ scale: 0.95 }}
            >
              {showEn ? 'Hide Chinese' : '阅读中文'}
            </motion.button>

            {showEn && (
              <motion.div
                className="mt-8 mx-auto max-w-2xl border-t border-gold/10 pt-8"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                transition={{ duration: 0.4 }}
              >
                {data.storyCN.map((paragraph, i) => (
                  <FadeInView key={i} delay={i * 0.1}>
                    <p className="mb-5 text-base leading-relaxed text-dark/50">
                      {paragraph}
                    </p>
                  </FadeInView>
                ))}
              </motion.div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

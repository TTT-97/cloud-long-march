'use client';

import { FadeInView } from '@/components/animations/fade-in-view';
import { TextReveal } from '@/components/animations/text-reveal';
import type { ProductData } from '@/data/types';

interface CulturalValueSectionProps {
  data: ProductData;
  locale: 'zh' | 'en';
}

export function CulturalValueSection({ data, locale }: CulturalValueSectionProps) {
  const title = locale === 'zh' ? '长征精神 · 文化价值' : 'Long March Spirit · Cultural Heritage';
  const values = locale === 'zh' ? data.culturalValuesCN : data.culturalValuesEN;

  return (
    <section className="px-6 py-24">
      <div className="mx-auto max-w-4xl">
        <TextReveal as="h2" className="mb-12 text-center text-3xl font-bold text-deep-red">
          {title}
        </TextReveal>

        {/* Value cards */}
        <div className="grid gap-6 sm:grid-cols-3">
          {values.map((value, i) => (
            <FadeInView key={i} delay={i * 0.15}>
              <div className="group relative rounded-lg border border-gold/10 bg-cream p-6 transition-colors hover:border-gold/30">
                {/* Number */}
                <span className="text-[10px] font-medium tracking-wider text-gold/40">
                  {String(i + 1).padStart(2, '0')}
                </span>

                {/* Keyword */}
                <h3 className="mt-3 text-xl font-semibold text-deep-red group-hover:text-deep-red/80">
                  {value.keyword}
                </h3>

                {/* Description */}
                <p className="mt-3 text-sm leading-relaxed text-dark/55">
                  {value.description}
                </p>

                {/* Bottom accent line */}
                <div className="absolute bottom-0 left-4 right-4 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
              </div>
            </FadeInView>
          ))}
        </div>
      </div>
    </section>
  );
}

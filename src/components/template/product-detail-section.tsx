'use client';

import { FadeInView } from '@/components/animations/fade-in-view';
import { TextReveal } from '@/components/animations/text-reveal';
import type { ProductData } from '@/data/types';

interface ProductDetailSectionProps {
  data: ProductData;
  locale: 'zh' | 'en';
}

export function ProductDetailSection({ data, locale }: ProductDetailSectionProps) {
  const paragraphs = locale === 'zh' ? data.productCN : data.productEN;
  const title = locale === 'zh' ? '产品介绍' : 'Product Story';

  return (
    <section className="px-6 py-24">
      <div className="mx-auto max-w-5xl">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
          {/* Product image */}
          <div className="overflow-hidden rounded-lg bg-cream-dark lg:sticky lg:top-24">
            <img
              src={data.heroImage}
              alt={locale === 'zh' ? data.chineseName : data.englishName}
              className="w-full"
            />
          </div>

          {/* Product text */}
          <div>
            <TextReveal as="h2" className="mb-8 text-3xl font-bold text-deep-red">
              {title}
            </TextReveal>

            {paragraphs.map((paragraph, i) => (
              <FadeInView key={i} delay={i * 0.15}>
                <p className="mb-5 text-base leading-relaxed text-dark/65">
                  {paragraph}
                </p>
              </FadeInView>
            ))}

            {/* Region tag */}
            <FadeInView delay={0.6}>
              <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-gold/20 px-4 py-1.5">
                <span className="text-[10px] tracking-wider text-gold/60 uppercase">
                  {locale === 'zh' ? '产地' : 'Origin'}
                </span>
                <span className="text-xs text-dark/50">
                  {locale === 'zh' ? data.location.regionCN : data.location.regionEN}
                </span>
              </div>
            </FadeInView>
          </div>
        </div>
      </div>
    </section>
  );
}

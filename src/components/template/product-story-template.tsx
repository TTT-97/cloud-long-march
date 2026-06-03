'use client';

import { useEffect } from 'react';
import { HeroSection } from './hero-section';
import { StorySection } from './story-section';
import { ProductDetailSection } from './product-detail-section';
import { OriginMapSection } from './origin-map-section';
import { CulturalValueSection } from './cultural-value-section';
import { AudioPlayer } from '@/components/audio/audio-player';
import { useAudio } from '@/components/audio/audio-context';
import type { ProductData } from '@/data/types';

interface ProductStoryTemplateProps {
  data: ProductData;
  locale: 'zh' | 'en';
}

export function ProductStoryTemplate({ data, locale }: ProductStoryTemplateProps) {
  const { register } = useAudio();

  // Register this product so the player bar appears — user clicks to play
  useEffect(() => {
    register(data.slug);
  }, [data.slug, register]);

  return (
    <>
      <div className="pb-24">
        <HeroSection data={data} locale={locale} />
        <StorySection data={data} locale={locale} />
        <ProductDetailSection data={data} locale={locale} />
        <OriginMapSection data={data} locale={locale} />
        <CulturalValueSection data={data} locale={locale} />
      </div>
      <AudioPlayer />
    </>
  );
}

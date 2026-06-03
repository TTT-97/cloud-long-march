'use client';

import dynamic from 'next/dynamic';
import { FadeInView } from '@/components/animations/fade-in-view';
import { TextReveal } from '@/components/animations/text-reveal';
import type { ProductData } from '@/data/types';

const OriginLeafletMap = dynamic(
  () => import('./origin-leaflet-map').then((mod) => mod.OriginLeafletMap),
  { ssr: false, loading: () => <MapSkeleton /> }
);

function MapSkeleton() {
  return (
    <div className="mx-auto aspect-[16/10] max-w-lg animate-pulse rounded-lg bg-dark/5" />
  );
}

interface OriginMapSectionProps {
  data: ProductData;
  locale: 'zh' | 'en';
}

export function OriginMapSection({ data, locale }: OriginMapSectionProps) {
  const title = locale === 'zh' ? '产地溯源' : 'Place of Origin';
  const region = locale === 'zh' ? data.location.regionCN : data.location.regionEN;

  return (
    <section className="relative overflow-hidden px-6 py-24">
      <div className="pointer-events-none absolute left-0 top-0 h-full w-1/3 bg-gradient-to-r from-gold/2 to-transparent" />

      <div className="mx-auto max-w-4xl text-center">
        <TextReveal as="h2" className="mb-12 text-3xl font-bold text-deep-red">
          {title}
        </TextReveal>

        <FadeInView>
          {/* Leaflet map */}
          <div className="mx-auto max-w-lg">
            <OriginLeafletMap
              lat={data.geoCoordinates.lat}
              lng={data.geoCoordinates.lng}
              name={locale === 'zh' ? data.chineseName : data.englishName}
              region={region}
            />
          </div>

          {/* Region label */}
          <p className="mt-6 text-lg font-medium text-dark/70">
            {region}
          </p>
          <p className="mt-1 text-xs text-dark/35">
            {locale === 'zh' ? '四川省' : 'Sichuan Province, China'}
          </p>
        </FadeInView>
      </div>
    </section>
  );
}

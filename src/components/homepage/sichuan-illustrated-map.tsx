'use client';

import { useState, useRef, useMemo } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react';
import { useLocale } from 'next-intl';
import { ROUTE_WAYPOINTS } from '@/data/route-waypoints';
import { getProductBySlug } from '@/data';
import { LongMarchRouteSVG } from '@/components/animations/long-march-route-svg';
import { MapHotspot } from '@/components/animations/map-hotspot';
import { StoryPanel } from '@/components/homepage/story-panel';
import type { ProductData } from '@/data/types';

function getProductForWaypoint(slug?: string): ProductData | undefined {
  if (!slug) return undefined;
  return getProductBySlug(slug);
}

export function SichuanIllustratedMap() {
  const locale = useLocale();
  const prefersReduced = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedProduct, setSelectedProduct] = useState<ProductData | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const mountainY1 = useTransform(scrollYProgress, [0, 1], [0, -40]);
  const mountainY2 = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const mountainY3 = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const riverY = useTransform(scrollYProgress, [0, 1], [0, -20]);

  // Gold floating particles — randomly placed within map area, regenerated per mount
  const goldParticles = useMemo(() => {
    if (prefersReduced) return [];
    return Array.from({ length: 18 }, (_, i) => ({
      id: i,
      cx: 140 + Math.random() * 540,
      cy: 200 + Math.random() * 480,
      r: 0.8 + Math.random() * 1.8,
      delay: Math.random() * 10,
      duration: 9 + Math.random() * 14,
      driftX: (Math.random() - 0.5) * 30,
      driftY: -(25 + Math.random() * 55),
    }));
  }, [prefersReduced]);

  const sectionTitle = locale === 'zh' ? '长征路线图' : 'The Long March Route';
  const sectionSub = locale === 'zh'
    ? '点击地图上的光点，探索长征路上的特产故事'
    : 'Tap the glowing points to explore stories along the route';

  return (
    <>
      <section
        id="journey-map"
        ref={containerRef}
        className="relative overflow-hidden bg-cream pt-20 md:pt-28 pb-0"
      >
        {/* Section header */}
        <div className="mb-10 px-4 text-center md:mb-14">
          <motion.div
            className="mx-auto mb-5 h-px w-16 bg-gradient-to-r from-transparent via-gold/50 to-transparent"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          />
          <motion.h2
            className="text-2xl font-bold tracking-wide text-deep-red md:text-3xl"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {sectionTitle}
          </motion.h2>
          <motion.p
            className="mt-2 text-sm text-dark/40"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {sectionSub}
          </motion.p>
        </div>

        {/* Map container */}
        <div className="relative mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <svg
              viewBox="0 0 800 295"
              className="w-full h-auto"
              role="img"
              aria-label={
                locale === 'zh'
                  ? '四川省长征路线插画地图，包含9个历史与产品节点'
                  : 'Illustrated map of the Long March route through Sichuan with 9 historical and product nodes'
              }
            >
              <defs>
                {/* Gold gradient for ribbon */}
                <linearGradient id="ribbon-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#8B1E24" stopOpacity={0} />
                  <stop offset="20%" stopColor="#8B1E24" stopOpacity={0.15} />
                  <stop offset="50%" stopColor="#D4AF37" stopOpacity={0.2} />
                  <stop offset="80%" stopColor="#8B1E24" stopOpacity={0.15} />
                  <stop offset="100%" stopColor="#8B1E24" stopOpacity={0} />
                </linearGradient>

                {/* Province fill / vignette gradient */}
                <radialGradient id="province-fill" cx="45%" cy="55%" r="50%">
                  <stop offset="0%" stopColor="#1a0608" stopOpacity={0} />
                  <stop offset="70%" stopColor="#1a0608" stopOpacity={0.1} />
                  <stop offset="100%" stopColor="#1a0608" stopOpacity={0.35} />
                </radialGradient>

                {/* Lighthouse beacon vertical beam */}
                <linearGradient id="beacon-beam" x1="0%" y1="100%" x2="0%" y2="0%">
                  <stop offset="0%" stopColor="#D4AF37" stopOpacity={0.25} />
                  <stop offset="40%" stopColor="#D4AF37" stopOpacity={0.08} />
                  <stop offset="100%" stopColor="#D4AF37" stopOpacity={0} />
                </linearGradient>
              </defs>

              {/* ====== Map background image ====== */}
              <image
                href="/images/map-background.png"
                x="0"
                y="0"
                width="800"
                height="295"
                preserveAspectRatio="xMidYMid slice"
              />

              {/* Subtle vignette overlay for depth */}
              <rect x="0" y="0" width="800" height="295" fill="url(#province-fill)" opacity={0.3} />

              {/* Gold floating particles — subtle sparkle over the photo */}
              {!prefersReduced && goldParticles.map((p) => (
                <motion.circle
                  key={p.id}
                  cx={p.cx}
                  cy={p.cy}
                  r={p.r}
                  fill="#D4AF37"
                  animate={{
                    opacity: [0, 0.6, 0, 0.3, 0],
                    cx: [p.cx, p.cx + p.driftX * 0.4, p.cx + p.driftX, p.cx + p.driftX * 0.3, p.cx],
                    cy: [p.cy, p.cy + p.driftY * 0.4, p.cy + p.driftY, p.cy + p.driftY * 0.3, p.cy],
                  }}
                  transition={{
                    duration: p.duration,
                    delay: p.delay,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                />
              ))}

              {/* ====== River curves (abstract) ====== */}
              <motion.g
                opacity={0.07}
                stroke="#D4AF37"
                strokeWidth={1.5}
                fill="none"
                style={{ y: prefersReduced ? 0 : riverY }}
              >
                <path d="M250,59 Q320,105 280,148 Q240,190 350,236 Q420,262 480,282" />
                <path d="M400,52 Q460,98 430,144 Q400,190 500,242 Q560,272 620,288" />
                <path d="M550,66 Q580,115 540,164 Q500,213 580,255 Q630,278 680,295" />
                <path d="M180,82 Q220,131 190,173 Q160,216 260,255 Q340,282 400,295" />
              </motion.g>

              {/* ====== Red ribbon decorative element ====== */}
              <motion.g
                opacity={0.06}
                style={{ y: prefersReduced ? 0 : riverY }}
              >
                <path
                  d="M100,262 Q200,229 280,203 Q340,183 380,164 Q430,144 400,124 Q360,105 300,92 Q240,79 180,85"
                  fill="none"
                  stroke="url(#ribbon-grad)"
                  strokeWidth={12}
                  strokeLinecap="round"
                />
                <path
                  d="M680,255 Q600,226 530,196 Q470,170 420,154 Q370,134 340,114 Q310,95 260,79"
                  fill="none"
                  stroke="url(#ribbon-grad)"
                  strokeWidth={8}
                  strokeLinecap="round"
                />
              </motion.g>

              {/* ====== City labels (geographic reference, non-route cities) ====== */}
              <g className="text-[8px] fill-cream/50" fontFamily="system-ui, sans-serif">
                <text x="380" y="140">成都</text>
                <text x="350" y="80">汶川</text>
                <text x="560" y="30">广元</text>
                <text x="660" y="60">达州</text>
              </g>

              {/* Corner decorative accents */}
              <g opacity={0.12} stroke="#D4AF37" strokeWidth={0.8} fill="none">
                {/* Top-left corner */}
                <path d="M105,48 L105,54 M105,48 L125,48" />
                {/* Top-right corner */}
                <path d="M695,54 L695,48 L675,48" />
                {/* Bottom-left corner */}
                <path d="M95,228 L95,221 L115,221" />
                {/* Bottom-right corner */}
                <path d="M705,221 L705,228 L685,228" />
              </g>

              {/* ====== Long March Route ====== */}
              <LongMarchRouteSVG />

              {/* ====== Route Waypoint Hotspots ====== */}
              {ROUTE_WAYPOINTS.map((wp) => {
                const cx = (wp.x / 100) * 800;
                const cy = (wp.y / 100) * 295;
                const product = getProductForWaypoint(wp.productSlug);
                const isLighthouse = wp.id === 'qionglai';

                return (
                  <MapHotspot
                    key={wp.id}
                    waypoint={wp}
                    product={product}
                    cx={cx}
                    cy={cy}
                    isLighthouse={isLighthouse}
                    onSelect={product ? setSelectedProduct : undefined}
                  />
                );
              })}

              {/* ====== Route endpoint markers (瑞金 start, 甘孜 end) ====== */}
              {/* Start flag */}
              <g opacity={0.4}>
                <text
                  x={(ROUTE_WAYPOINTS[0].x / 100) * 800 + 18}
                  y={(ROUTE_WAYPOINTS[0].y / 100) * 295 + 4}
                  className="text-[8px] fill-dark/30"
                  fontFamily="system-ui, sans-serif"
                >
                  {locale === 'zh' ? '起点' : 'Start'}
                </text>
              </g>
              {/* End flag */}
              <g opacity={0.4}>
                <text
                  x={(ROUTE_WAYPOINTS[ROUTE_WAYPOINTS.length - 1].x / 100) * 800 - 24}
                  y={(ROUTE_WAYPOINTS[ROUTE_WAYPOINTS.length - 1].y / 100) * 295 - 10}
                  className="text-[8px] fill-dark/30"
                  fontFamily="system-ui, sans-serif"
                >
                  {locale === 'zh' ? '终点' : 'End'}
                </text>
              </g>

              {/* ====== Bottom label ====== */}
              <text
                x="400"
                y="285"
                textAnchor="middle"
                className="text-[9px] fill-dark/15"
                fontFamily="system-ui, sans-serif"
              >
                {locale === 'zh'
                  ? '瑞金 → 遵义 → 苍溪 → 剑门关 → 泸州 → 邛崃 → 雅安 → 阿坝 → 甘孜'
                  : 'Ruijin → Zunyi → Cangxi → Jianmen → Luzhou → Qionglai → Ya\'an → Aba → Ganzi'}
              </text>
            </svg>
          </motion.div>
        </div>

        {/* Bottom gradient fade to next section */}
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-gold/3 to-transparent" />
      </section>

      {/* Story Panel */}
      <StoryPanel
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </>
  );
}

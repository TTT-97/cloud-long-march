'use client';

import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react';
import { useRef } from 'react';

export function MountainSilhouette() {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const layers = [
    { speed: 5, opacity: 0.06 },
    { speed: 15, opacity: 0.10 },
    { speed: 30, opacity: 0.18 },
    { speed: 45, opacity: 0.12 },
  ];

  return (
    <div ref={ref} className="pointer-events-none absolute inset-0 overflow-hidden">
      {layers.map((layer, i) => {
        const y = useTransform(scrollYProgress, [0, 1], [0, -layer.speed]);
        return (
          <motion.div
            key={i}
            className="absolute bottom-0 left-0 right-0"
            style={{
              y: prefersReduced ? 0 : y,
              opacity: layer.opacity,
              willChange: 'transform',
            }}
          >
            {/* Abstract mountain peaks as CSS shapes */}
            <svg
              viewBox="0 0 1200 300"
              preserveAspectRatio="none"
              className="w-full h-[300px]"
            >
              <path
                d={`M0,300 L0,${
                  200 - i * 30
                } L80,${180 - i * 25} L160,${220 - i * 20} L240,${130 - i * 35} L320,${190 - i * 15} L400,${100 - i * 40} L480,${170 - i * 20} L560,${140 - i * 30} L640,${200 - i * 10} L720,${110 - i * 35} L800,${160 - i * 25} L880,${180 - i * 15} L960,${120 - i * 30} L1040,${190 - i * 20} L1120,${150 - i * 15} L1200,${170 - i * 10} L1200,300 Z`}
                fill="#2A2A2A"
              />
            </svg>
          </motion.div>
        );
      })}
    </div>
  );
}

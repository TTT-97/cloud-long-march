'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useLocale } from 'next-intl';
import type { RouteWaypoint } from '@/data/route-waypoints';
import type { ProductData } from '@/data/types';

interface MapHotspotProps {
  waypoint: RouteWaypoint;
  product?: ProductData;
  cx: number;
  cy: number;
  isLighthouse?: boolean;
  onSelect?: (product: ProductData) => void;
}

export function MapHotspot({ waypoint, product, cx, cy, isLighthouse, onSelect }: MapHotspotProps) {
  const locale = useLocale();
  const [hovered, setHovered] = useState(false);

  const isHistorical = waypoint.isHistorical;
  const name = locale === 'zh' ? waypoint.nameCN : waypoint.nameEN;

  function handleClick() {
    if (product && onSelect) {
      onSelect(product);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  }

  if (isHistorical) {
    return (
      <g className="pointer-events-none">
        {/* Historical marker — subtle red dot */}
        <circle cx={cx} cy={cy} r={4} fill="#8B1E24" opacity={0.5} />
        <circle cx={cx} cy={cy} r={7} fill="none" stroke="#8B1E24" strokeWidth={0.5} opacity={0.3} />
        <text
          x={cx}
          y={cy - 14}
          textAnchor="middle"
          className="text-[11px] fill-dark/30"
          style={{ fontFamily: 'system-ui, sans-serif' }}
        >
          {name}
        </text>
      </g>
    );
  }

  const isInteractive = !!product && !!onSelect;

  return (
    <g
      className={isInteractive ? 'cursor-pointer' : 'pointer-events-none'}
      role={isInteractive ? 'button' : undefined}
      tabIndex={isInteractive ? 0 : undefined}
      aria-label={isInteractive ? name : undefined}
      onClick={isInteractive ? handleClick : undefined}
      onKeyDown={isInteractive ? handleKeyDown : undefined}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {isLighthouse ? (
        <>
          {/* Qionglai red star marker */}
          <defs>
            <radialGradient id={`star-glow-${waypoint.id}`} cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#8B1E24" stopOpacity={0.5} />
              <stop offset="30%" stopColor="#8B1E24" stopOpacity={0.15} />
              <stop offset="60%" stopColor="#D4AF37" stopOpacity={0.05} />
              <stop offset="100%" stopColor="#D4AF37" stopOpacity={0} />
            </radialGradient>
          </defs>
          <circle cx={cx} cy={cy} r={50} fill={`url(#star-glow-${waypoint.id})`} />

          {/* Breathing red rings */}
          <motion.circle
            cx={cx} cy={cy} r={14}
            fill="none" stroke="#8B1E24" strokeWidth={2}
            animate={{ r: [14, 32, 14], opacity: [0.6, 0, 0.6] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.circle
            cx={cx} cy={cy} r={10}
            fill="none" stroke="#8B1E24" strokeWidth={1.5}
            animate={{ r: [10, 24, 10], opacity: [0.8, 0.1, 0.8] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
          />

          {/* Red five-pointed star */}
          <motion.polygon
            points={`
              ${cx},${cy - 12}
              ${cx + 2.94},${cy - 4.05}
              ${cx + 11.41},${cy - 3.71}
              ${cx + 4.76},${cy + 1.55}
              ${cx + 7.05},${cy + 9.71}
              ${cx},${cy + 5}
              ${cx - 7.05},${cy + 9.71}
              ${cx - 4.76},${cy + 1.55}
              ${cx - 11.41},${cy - 3.71}
              ${cx - 2.94},${cy - 4.05}
            `}
            fill="#8B1E24"
            stroke="#D4AF37"
            strokeWidth={1}
            animate={{ scale: [1, 1.15, 1], opacity: [1, 0.75, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            style={{ transformOrigin: `${cx}px ${cy}px` }}
          />
        </>
      ) : (
        <>
          {/* Standard product node — red-gold glow */}
          <motion.circle
            cx={cx}
            cy={cy}
            r={14}
            fill="none"
            stroke="#D4AF37"
            strokeWidth={1}
            animate={{ r: [14, 28, 14], opacity: [0.2, 0, 0.2] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.circle
            cx={cx}
            cy={cy}
            r={8}
            fill="none"
            stroke="#D4AF37"
            strokeWidth={1.5}
            animate={{ r: [8, 16, 8], opacity: [0.8, 0.3, 0.8] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          />
          <circle cx={cx} cy={cy} r={4.5} fill="#8B1E24" stroke="#F8F5F0" strokeWidth={1.5} />
        </>
      )}

      {/* Node label */}
      <text
        x={cx}
        y={cy + (isLighthouse ? 12 : 0)}
        textAnchor="middle"
        className={`text-[12px] pointer-events-none ${isLighthouse ? 'fill-gold/60' : 'fill-cream/70'}`}
        style={{ fontFamily: 'system-ui, sans-serif' }}
        dy={20}
      >
        {name}
      </text>

      {/* Hover card */}
      <AnimatePresence>
        {hovered && product && (
          <motion.g
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
            transition={{ duration: 0.2 }}
          >
            <rect
              x={cx - 48}
              y={cy + 28}
              width={96}
              height={32}
              rx={6}
              fill="#2A2A2A"
              fillOpacity={0.9}
              stroke="#D4AF37"
              strokeWidth={0.5}
              strokeOpacity={0.4}
            />
            <text
              x={cx}
              y={cy + 42}
              textAnchor="middle"
              className="text-[11px] fill-gold/80"
              style={{ fontFamily: 'system-ui, sans-serif' }}
            >
              {locale === 'zh' ? product.chineseName : product.englishName}
            </text>
            <text
              x={cx}
              y={cy + 54}
              textAnchor="middle"
              className="text-[10px] fill-cream/50"
              style={{ fontFamily: 'system-ui, sans-serif' }}
            >
              {locale === 'zh' ? '点击探索' : 'Click to explore'}
            </text>
          </motion.g>
        )}
      </AnimatePresence>
    </g>
  );
}

'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { ROUTE_WAYPOINTS } from '@/data/route-waypoints';

function buildRoutePath(): string {
  // Convert percentage (0-100) to viewBox 0 0 800 900
  const points = ROUTE_WAYPOINTS.map((wp) => ({
    x: (wp.x / 100) * 800,
    y: (wp.y / 100) * 295,
  }));

  let d = `M ${points[0].x} ${points[0].y}`;
  for (let i = 1; i < points.length; i++) {
    const prev = points[i - 1];
    const curr = points[i];
    // Smooth cubic bezier with horizontal control point bias
    const dx = curr.x - prev.x;
    const dy = curr.y - prev.y;
    const cpx1 = prev.x + dx * 0.45;
    const cpy1 = prev.y + dy * 0.15;
    const cpx2 = curr.x - dx * 0.45;
    const cpy2 = curr.y - dy * 0.15;
    d += ` C ${cpx1} ${cpy1}, ${cpx2} ${cpy2}, ${curr.x} ${curr.y}`;
  }
  return d;
}

export function LongMarchRouteSVG() {
  const prefersReduced = useReducedMotion();
  const pathRef = useRef<SVGPathElement>(null);
  const [pathLength, setPathLength] = useState(3200);
  const routePath = buildRoutePath();

  useEffect(() => {
    if (pathRef.current) {
      const len = pathRef.current.getTotalLength();
      if (len > 0) setPathLength(len);
    }
  }, []);

  if (prefersReduced) {
    return (
      <path
        d={routePath}
        stroke="#D4AF37"
        strokeWidth={5}
        fill="none"
        opacity={0.9}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    );
  }

  return (
    <>
      {/* Ambient wide glow halo */}
      <motion.path
        d={routePath}
        stroke="#D4AF37"
        strokeWidth={30}
        opacity={0}
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ filter: 'blur(18px)' }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: [0, 0.15, 0.08, 0.15] }}
        viewport={{ once: true }}
        transition={{ duration: 3, repeat: Infinity, delay: 7, ease: 'easeInOut' }}
      />

      {/* Medium glow layer */}
      <motion.path
        d={routePath}
        stroke="#D4AF37"
        strokeWidth={16}
        opacity={0}
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ filter: 'blur(8px)' }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: [0, 0.25, 0.12, 0.25] }}
        viewport={{ once: true }}
        transition={{ duration: 3, repeat: Infinity, delay: 8, ease: 'easeInOut' }}
      />

      {/* Primary glow layer */}
      <motion.path
        d={routePath}
        stroke="#D4AF37"
        strokeWidth={12}
        opacity={0}
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ filter: 'blur(5px)' }}
        strokeDasharray={pathLength}
        initial={{ strokeDashoffset: pathLength, opacity: 0 }}
        whileInView={{ strokeDashoffset: 0, opacity: 0.4 }}
        viewport={{ once: true }}
        transition={{ duration: 7, ease: [0.4, 0, 0.2, 1] }}
      />

      {/* Outer contrast shadow — dark backdrop for visibility on photo */}
      <motion.path
        d={routePath}
        stroke="#1a0608"
        strokeWidth={8}
        opacity={0}
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray={pathLength}
        initial={{ strokeDashoffset: pathLength, opacity: 0 }}
        whileInView={{ strokeDashoffset: 0, opacity: 0.6 }}
        viewport={{ once: true }}
        transition={{ duration: 7, ease: [0.4, 0, 0.2, 1] }}
      />

      {/* Solid route line — bright gold-red */}
      <motion.path
        d={routePath}
        stroke="#D4AF37"
        strokeWidth={5}
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray={pathLength}
        initial={{ strokeDashoffset: pathLength }}
        whileInView={{ strokeDashoffset: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 7, ease: [0.4, 0, 0.2, 1] }}
      />

      {/* Inner core — deep red center line */}
      <motion.path
        d={routePath}
        stroke="#8B1E24"
        strokeWidth={2.5}
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray={pathLength}
        initial={{ strokeDashoffset: pathLength, opacity: 0 }}
        whileInView={{ strokeDashoffset: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 7, ease: [0.4, 0, 0.2, 1] }}
      />

      {/* Dashed accent line */}
      <motion.path
        ref={pathRef}
        d={routePath}
        stroke="#F8F5F0"
        strokeWidth={1}
        fill="none"
        strokeLinecap="round"
        strokeDasharray="10 8"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.6 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 6 }}
      />

      {/* Flowing light dash — moving gold flecks along the route */}
      <motion.path
        d={routePath}
        stroke="#D4AF37"
        strokeWidth={3}
        fill="none"
        strokeLinecap="round"
        strokeDasharray={`${pathLength * 0.03} ${pathLength * 0.97}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.8 }}
        transition={{ duration: 0.8, delay: 7.5 }}
      />
      <motion.path
        d={routePath}
        stroke="#F8F5F0"
        strokeWidth={2}
        fill="none"
        strokeLinecap="round"
        strokeDasharray={`${pathLength * 0.018} ${pathLength * 0.982}`}
        initial={{ opacity: 0, strokeDashoffset: 0 }}
        animate={{ opacity: 0.7, strokeDashoffset: [-pathLength, 0] }}
        transition={{
          opacity: { duration: 0.8, delay: 7.5 },
          strokeDashoffset: { duration: 5, repeat: Infinity, ease: 'linear', delay: 7.5 },
        }}
      />

      {/* Post-animation breathing pulse */}
      <motion.path
        d={routePath}
        stroke="#D4AF37"
        strokeWidth={16}
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ filter: 'blur(10px)' }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: [0, 0.25, 0] }}
        viewport={{ once: true }}
        transition={{ duration: 3, repeat: Infinity, delay: 8, ease: 'easeInOut' }}
      />
    </>
  );
}

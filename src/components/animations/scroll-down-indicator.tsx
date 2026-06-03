'use client';

import { motion, useReducedMotion } from 'motion/react';

export function ScrollDownIndicator() {
  const prefersReduced = useReducedMotion();

  return (
    <motion.div
      className="flex flex-col items-center gap-2"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.5 }}
    >
      <span className="text-[10px] tracking-[0.2em] text-dark/25 uppercase">
        Scroll
      </span>
      <motion.div
        className="h-8 w-px bg-gradient-to-b from-gold/50 to-transparent"
        animate={prefersReduced ? {} : { scaleY: [1, 1.5, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
    </motion.div>
  );
}

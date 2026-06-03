'use client';

import { motion, useReducedMotion } from 'motion/react';
import type { ReactNode } from 'react';

interface TextRevealProps {
  children: ReactNode;
  as?: 'h1' | 'h2' | 'h3' | 'p';
  className?: string;
  delay?: number;
}

export function TextReveal({
  children,
  as: Tag = 'h2',
  className,
  delay = 0,
}: TextRevealProps) {
  const prefersReduced = useReducedMotion();

  return (
    <motion.div
      initial={
        prefersReduced
          ? { opacity: 1 }
          : { opacity: 0, clipPath: 'polygon(0 0, 0 0, 0 100%, 0% 100%)' }
      }
      whileInView={{ opacity: 1, clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' }}
      viewport={{ once: true }}
      transition={{
        duration: prefersReduced ? 0 : 0.6,
        delay: prefersReduced ? 0 : delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <Tag className={className}>{children}</Tag>
    </motion.div>
  );
}

'use client';

import { motion, AnimatePresence as MotionAnimatePresence } from 'motion/react';

export function AnimatePresence({ children }: { children: React.ReactNode }) {
  return (
    <MotionAnimatePresence mode="wait">
      <motion.div
        key={Math.random()}
        initial={{ opacity: 0, scale: 0.995 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      >
        {children}
      </motion.div>
    </MotionAnimatePresence>
  );
}

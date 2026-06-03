'use client';

import { useEffect, useRef } from 'react';
import { useReducedMotion } from 'motion/react';

export function AudioVisualizer() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    if (prefersReduced) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const c = canvas;
    const cx = ctx;
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      c.width = c.offsetWidth * dpr;
      c.height = c.offsetHeight * dpr;
      cx.scale(dpr, dpr);
    };
    resize();
    window.addEventListener('resize', resize);

    // Draw 3 flowing waveform lines
    const lines = [
      { amplitude: 20, frequency: 0.008, phase: 0, offset: 0.4 },
      { amplitude: 15, frequency: 0.012, phase: 1.5, offset: 0.5 },
      { amplitude: 25, frequency: 0.006, phase: 3, offset: 0.6 },
    ];

    function animate(time: number) {
      if (document.hidden) {
        rafRef.current = requestAnimationFrame(animate);
        return;
      }

      const w = c.offsetWidth;
      const h = c.offsetHeight;

      cx.clearRect(0, 0, w, h);

      for (const line of lines) {
        cx.beginPath();
        for (let x = 0; x <= w; x += 2) {
          const y =
            h * line.offset +
            Math.sin(x * line.frequency + time * 0.001 + line.phase) *
              line.amplitude;
          if (x === 0) cx.moveTo(x, y);
          else cx.lineTo(x, y);
        }
        cx.strokeStyle = 'rgba(212,175,55,0.08)';
        cx.lineWidth = 1.5;
        cx.stroke();
      }

      rafRef.current = requestAnimationFrame(animate);
    }

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', resize);
    };
  }, [prefersReduced]);

  if (prefersReduced) return null;

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 h-full w-full"
      aria-hidden="true"
    />
  );
}

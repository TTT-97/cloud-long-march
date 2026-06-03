'use client';

import { useEffect, useRef } from 'react';
import { useReducedMotion } from 'motion/react';

interface GoldParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  alpha: number;
}

const COUNT = 120;

export function GoldParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);
  const particlesRef = useRef<GoldParticle[]>([]);
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

    const particles = particlesRef.current;
    const cw = canvas.offsetWidth;
    const ch = canvas.offsetHeight;
    function spawn(): GoldParticle {
      return {
        x: Math.random() * cw,
        y: ch + 10,
        vx: (Math.random() - 0.5) * 0.3,
        vy: -(0.3 + Math.random() * 0.6),
        life: 0,
        maxLife: 240 + Math.random() * 360,
        size: 1 + Math.random() * 3,
        alpha: 0.1 + Math.random() * 0.25,
      };
    }
    while (particles.length < COUNT) particles.push(spawn());

    let lastTime = performance.now();

    function animate(time: number) {
      if (document.hidden) {
        rafRef.current = requestAnimationFrame(animate);
        return;
      }
      const dt = Math.min((time - lastTime) / 16.67, 3);
      lastTime = time;

      const { offsetWidth: w, offsetHeight: h } = canvasRef.current!;
      cx.clearRect(0, 0, w, h);

      for (let i = 0; i < particles.length; i++) {
        let p = particles[i];
        p.x += p.vx * dt;
        p.y += p.vy * dt;
        p.life += dt;

        const lifeRatio = p.life / p.maxLife;
        let alpha = p.alpha;
        if (lifeRatio < 0.1) alpha *= lifeRatio / 0.1;
        else if (lifeRatio > 0.8) alpha *= (1 - lifeRatio) / 0.2;

        cx.beginPath();
        cx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        cx.fillStyle = `rgba(212,175,55,${alpha})`;
        cx.fill();

        if (p.life >= p.maxLife) particles[i] = spawn();
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

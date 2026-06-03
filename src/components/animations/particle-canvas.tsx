'use client';

import { useEffect, useRef, useCallback } from 'react';
import { useReducedMotion } from 'motion/react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  r: number;
  g: number;
  b: number;
  alpha: number;
}

const PARTICLE_COUNT_DESKTOP = 600;
const PARTICLE_COUNT_MOBILE = 200;

// Colors: deep red #8B1E24 to gold #D4AF37
const COLOR_START = { r: 139, g: 30, b: 36 }; // #8B1E24
const COLOR_END = { r: 212, g: 175, b: 55 };   // #D4AF37

function lerpColor(t: number) {
  const r = Math.round(COLOR_START.r + (COLOR_END.r - COLOR_START.r) * t);
  const g = Math.round(COLOR_START.g + (COLOR_END.g - COLOR_START.g) * t);
  const b = Math.round(COLOR_START.b + (COLOR_END.b - COLOR_START.b) * t);
  return { r, g, b };
}

export function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const rafRef = useRef<number>(0);
  const prefersReduced = useReducedMotion();

  const spawnParticle = useCallback(
    (canvas: HTMLCanvasElement, count: number) => {
      const p: Particle = {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.3 - 0.15,
        life: 0,
        maxLife: 180 + Math.random() * 240,
        size: 2 + Math.random() * 6,
        alpha: 0.15 + Math.random() * 0.45,
        ...lerpColor(Math.random()),
      };
      return p;
    },
    []
  );

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

    const isMobile = window.innerWidth < 768;
    const targetCount = isMobile ? PARTICLE_COUNT_MOBILE : PARTICLE_COUNT_DESKTOP;

    // Initialize particles
    const particles = particlesRef.current;
    while (particles.length < targetCount) {
      particles.push(spawnParticle(canvas, targetCount));
    }

    let lastTime = performance.now();

    function animate(time: number) {
      if (document.hidden) {
        rafRef.current = requestAnimationFrame(animate);
        return;
      }

      const dt = Math.min((time - lastTime) / 16.67, 3); // cap delta
      lastTime = time;

      const w = c.offsetWidth;
      const h = c.offsetHeight;

      cx.clearRect(0, 0, w, h);

      for (let i = 0; i < targetCount; i++) {
        let p = particles[i];

        // Update particle
        p.x += p.vx * dt;
        p.y += p.vy * dt;
        p.life += dt;

        // Sine wave motion perpendicular to general direction
        p.x += Math.sin(p.y * 0.02 + time * 0.001) * 0.3 * dt;

        // Wrap around edges
        if (p.x < -20) p.x = w + 20;
        if (p.x > w + 20) p.x = -20;
        if (p.y < -20) p.y = h + 20;
        if (p.y > h + 20) p.y = -20;

        // Lifecycle: fade in, live, fade out, respawn
        const lifeRatio = p.life / p.maxLife;
        let alpha = p.alpha;
        if (lifeRatio < 0.1) alpha *= lifeRatio / 0.1;
        else if (lifeRatio > 0.8) alpha *= (1 - lifeRatio) / 0.2;

        // Draw particle
        cx.beginPath();
        cx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        cx.fillStyle = `rgba(${p.r},${p.g},${p.b},${alpha})`;
        cx.fill();

        // Optional glow for larger particles
        if (p.size > 4) {
          cx.beginPath();
          cx.arc(p.x, p.y, p.size * 1.5, 0, Math.PI * 2);
          cx.fillStyle = `rgba(${p.r},${p.g},${p.b},${alpha * 0.3})`;
          cx.fill();
        }

        // Respawn dead particles
        if (p.life >= p.maxLife) {
          particles[i] = spawnParticle(c, targetCount);
        }
      }

      rafRef.current = requestAnimationFrame(animate);
    }

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', resize);
    };
  }, [prefersReduced, spawnParticle]);

  if (prefersReduced) return null;

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 h-full w-full"
      aria-hidden="true"
    />
  );
}

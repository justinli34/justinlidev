import { useEffect, useRef } from "react";
import styles from "./Animation.module.css";

const NUM_POINTS = 10000;
const HIT_RADIUS = 25;
const IMPULSE_STRENGTH = 5;
const FRICTION = 0.6;
const SPRING_STRENGTH = 0.01;

type Particle = { dx: number; dy: number; vx: number; vy: number };

function calculateBasePosition(i: number, t: number, scale: number) {
  const xBase = i;
  const yBase = i / 235;
  const wavePhase = 4 + Math.sin(yBase * 2 - t) * 3;
  const k = wavePhase * Math.cos(xBase / 29);
  const e = yBase / 8 - 13;
  const d = Math.sqrt(k * k + e * e);
  const q =
    2 * Math.sin(k * 2) + Math.sin(yBase / 25) * k * (5 + 2 * Math.sin(e * 9 - d * 3 + t * 2));
  const angle = d - t;

  return {
    x: (q + 30 * Math.cos(angle) + 200) * scale,
    y: (q * Math.sin(angle) + d * 39 - 220) * scale,
  };
}

function handleMouseInteraction(
  i: number,
  baseX: number,
  baseY: number,
  mousePos: { x: number; y: number } | null,
  particles: Map<number, Particle>,
  radius: number,
  scale: number,
  t: number,
): void {
  if (!mousePos || particles.has(i)) return;

  const dx = baseX - mousePos.x;
  const dy = baseY - mousePos.y;
  const dist = Math.sqrt(dx * dx + dy * dy);

  if (dist < radius && dist > 0) {
    const seed = Math.sin(i * 12.9898 + t * 78.233) * 43758.5453;
    const rand = seed - Math.floor(seed);

    const radialDx = dx / dist;
    const radialDy = dy / dist;
    const tangentSign = (i % 2 === 0 ? 1 : -1) * (1 + Math.sin(i * 0.1) * 0.5);
    const tangentialDx = (-dy / dist) * tangentSign;
    const tangentialDy = (dx / dist) * tangentSign;
    const impulse = IMPULSE_STRENGTH * scale * (0.5 + rand);

    particles.set(i, {
      dx: 0,
      dy: 0,
      vx: (radialDx + tangentialDx) * impulse,
      vy: (radialDy + tangentialDy) * impulse,
    });
  }
}

function updateParticlePhysics(
  particle: Particle,
  particles: Map<number, Particle>,
  i: number,
): Particle | undefined {
  particle.dx += particle.vx;
  particle.dy += particle.vy;

  particle.vx *= FRICTION;
  particle.vy *= FRICTION;

  particle.vx -= particle.dx * SPRING_STRENGTH;
  particle.vy -= particle.dy * SPRING_STRENGTH;

  const speed = Math.sqrt(particle.vx * particle.vx + particle.vy * particle.vy);
  const dist = Math.sqrt(particle.dx * particle.dx + particle.dy * particle.dy);

  if (speed < 0.1 && dist < 0.5) {
    particles.delete(i);
    return undefined;
  }

  return particle;
}

export default function Animation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mousePosRef = useRef<{ x: number; y: number } | null>(null);
  const particlesRef = useRef<Map<number, Particle>>(new Map());

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const styles = getComputedStyle(document.documentElement);
    const bgColor = styles.getPropertyValue("--color-bg").trim();
    const dotsColor = styles.getPropertyValue("--color-animation-dots").trim();

    const dpr = window.devicePixelRatio || 1;
    canvas.width = canvas.clientWidth * dpr;
    canvas.height = canvas.clientHeight * dpr;

    let t = 0;
    let animationId: number;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mousePosRef.current = {
        x: (e.clientX - rect.left) * dpr,
        y: (e.clientY - rect.top) * dpr,
      };
    };

    const handleMouseLeave = () => {
      mousePosRef.current = null;
    };

    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);

    function draw() {
      if (!canvas || !ctx) return;

      const scale = canvas.width / 400;
      const particles = particlesRef.current;
      const mousePos = mousePosRef.current;
      const radius = HIT_RADIUS * scale;

      ctx.fillStyle = bgColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = dotsColor;

      for (let i = 0; i < NUM_POINTS; i++) {
        const base = calculateBasePosition(i, t, scale);
        let x = base.x;
        let y = base.y;

        handleMouseInteraction(i, x, y, mousePos, particles, radius, scale, t);

        let particle = particles.get(i);

        if (particle) {
          particle = updateParticlePhysics(particle, particles, i);
        }
        if (particle) {
          x += particle.dx;
          y += particle.dy;
        }

        ctx.fillRect(x, y, 1, 1);
      }

      t += Math.PI / 480;
      animationId = requestAnimationFrame(draw);
    }

    animationId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animationId);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return <canvas ref={canvasRef} className={styles.canvas} />;
}

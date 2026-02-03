import { useEffect, useRef } from 'react';

// Configurable dispersion effect parameters
const HIT_RADIUS = 25; // Pixels - how close cursor must be to knock a dot loose
const HIT_CHANCE = 1; // Probability (0-1) that a dot in range gets displaced
const IMPULSE_STRENGTH = 5; // Initial velocity when hit (pixels per frame)
const FRICTION = 0.6; // Velocity decay per frame (0-1, higher = less friction)
const SPRING_STRENGTH = 0.008; // Pull back toward origin (0-1, higher = snappier return)
const TANGENTIAL_RATIO = 0.8; // Swirl vs radial direction of impulse

export default function SerpentAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const mousePosRef = useRef<{ x: number; y: number } | null>(null)
  const particlesRef = useRef<Map<number, { dx: number; dy: number; vx: number; vy: number }>>(new Map())

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return

    const ctx = canvas.getContext('2d');
    const styles = getComputedStyle(document.documentElement);
    const bgColor = styles.getPropertyValue('--color-bg').trim();
    const dotsColor = styles.getPropertyValue('--color-serpent-dots').trim();

    const updateCanvasSize = () => {
      const rect = container.getBoundingClientRect();
      const size = Math.min(rect.width, rect.height);
      const dpr = window.devicePixelRatio || 1;
      
      // Set the canvas internal resolution to match device pixels
      canvas.width = size * dpr;
      canvas.height = size * dpr;
      
      // Keep the display size the same via CSS
      canvas.style.width = `${size}px`;
      canvas.style.height = `${size}px`;
    };

    updateCanvasSize();
    const resizeObserver = new ResizeObserver(updateCanvasSize);
    resizeObserver.observe(container);

    const NUM_POINTS = 10000;
    let t = 0;
    let animationId: number;

    // Mouse tracking for dispersion effect
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      mousePosRef.current = {
        x: (e.clientX - rect.left) * dpr,
        y: (e.clientY - rect.top) * dpr,
      };
    };

    const handleMouseLeave = () => {
      mousePosRef.current = null;
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    function draw() {
      if (!canvas) return
      if (!ctx) return

      const scale = canvas.width / 400;

      ctx.fillStyle = bgColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = dotsColor;

      for (let i = 0; i < NUM_POINTS; i++) {
        const xBase = i;
        const yBase = i / 235;

        const wavePhase = 4 + Math.sin(yBase * 2 - t) * 3;
        const k = wavePhase * Math.cos(xBase / 29);
        const e = yBase / 8 - 13;
        
        const d = Math.sqrt(k * k + e * e);

        const term1 = 2 * Math.sin(k * 2);
        const term2 = 0.2 / (k || 0.00001);
        const term3 = Math.sin(yBase / 25) * k * (5 + 2 * Math.sin(e * 9 - d * 3 + t * 2));
        const q = term1 + term2 + term3;

        const angle = d - t;

        let sx = (q + 30 * Math.cos(angle) + 200) * scale;
        let sy = (q * Math.sin(angle) + d * 39 - 220) * scale;

        const particles = particlesRef.current;
        const mousePos = mousePosRef.current;
        const radius = HIT_RADIUS * scale;

        // Check if cursor is near this dot and potentially knock it loose
        if (mousePos && !particles.has(i)) {
          const dx = sx - mousePos.x;
          const dy = sy - mousePos.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < radius && dist > 0) {
            // Random chance to get displaced
            const seed = Math.sin(i * 12.9898 + t * 78.233) * 43758.5453;
            const rand = seed - Math.floor(seed);
            
            if (rand < HIT_CHANCE) {
              // Calculate impulse direction (radial + tangential for chaos)
              const radialDx = (dx / dist);
              const radialDy = (dy / dist);
              
              // Tangent direction with per-dot variation
              const tangentSign = (i % 2 === 0 ? 1 : -1) * (1 + Math.sin(i * 0.1) * 0.5);
              const tangentialDx = (-dy / dist) * TANGENTIAL_RATIO * tangentSign;
              const tangentialDy = (dx / dist) * TANGENTIAL_RATIO * tangentSign;
              
              // Set initial velocity (not displacement)
              const impulse = IMPULSE_STRENGTH * scale * (0.5 + rand);
              particles.set(i, {
                dx: 0, // Start at original position
                dy: 0,
                vx: (radialDx + tangentialDx) * impulse,
                vy: (radialDy + tangentialDy) * impulse,
              });
            }
          }
        }

        // Apply physics to displaced particles
        if (particles.has(i)) {
          const p = particles.get(i)!;
          
          // Apply velocity to displacement
          p.dx += p.vx;
          p.dy += p.vy;
          
          // Apply friction to velocity
          p.vx *= FRICTION;
          p.vy *= FRICTION;
          
          // Apply spring force pulling back to origin
          p.vx -= p.dx * SPRING_STRENGTH;
          p.vy -= p.dy * SPRING_STRENGTH;
          
          // Apply displacement to position
          sx += p.dx;
          sy += p.dy;
          
          // Remove if nearly stopped and back at origin
          const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
          const dist = Math.sqrt(p.dx * p.dx + p.dy * p.dy);
          if (speed < 0.1 && dist < 0.5) {
            particles.delete(i);
          }
        }

        ctx.fillRect(sx, sy, 1, 1);
      }

      t += Math.PI / 480;
      animationId = requestAnimationFrame(draw);
    }

    animationId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animationId);
      resizeObserver.disconnect();
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div ref={containerRef} className="serpent-container">
      <canvas ref={canvasRef} />
    </div>
  );
}
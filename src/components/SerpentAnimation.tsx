import { useEffect, useRef } from 'react';

export default function SerpentAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

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

        const sx = (q + 30 * Math.cos(angle) + 200) * scale;
        const sy = (q * Math.sin(angle) + d * 39 - 220) * scale;

        ctx.fillRect(sx, sy, 1, 1);
      }

      t += Math.PI / 480;
      animationId = requestAnimationFrame(draw);
    }

    animationId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animationId);
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <div ref={containerRef} className="serpent-container">
      <canvas ref={canvasRef} />
    </div>
  );
}
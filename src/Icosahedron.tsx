import { useEffect, useRef, useState } from 'react';

interface Point3D {
  x: number;
  y: number;
  z: number;
}

interface Point2D {
  x: number;
  y: number;
}

// Golden ratio for icosahedron vertices
const PHI = (1 + Math.sqrt(5)) / 2;

// Icosahedron vertices (normalized)
const createVertices = (scale: number): Point3D[] => {
  const vertices: Point3D[] = [
    { x: 0, y: 1, z: PHI },
    { x: 0, y: -1, z: PHI },
    { x: 0, y: 1, z: -PHI },
    { x: 0, y: -1, z: -PHI },
    { x: 1, y: PHI, z: 0 },
    { x: -1, y: PHI, z: 0 },
    { x: 1, y: -PHI, z: 0 },
    { x: -1, y: -PHI, z: 0 },
    { x: PHI, y: 0, z: 1 },
    { x: -PHI, y: 0, z: 1 },
    { x: PHI, y: 0, z: -1 },
    { x: -PHI, y: 0, z: -1 },
  ];

  // Normalize and scale
  const length = Math.sqrt(1 + PHI * PHI);
  return vertices.map((v) => ({
    x: (v.x / length) * scale,
    y: (v.y / length) * scale,
    z: (v.z / length) * scale,
  }));
};

// Edges of icosahedron (pairs of vertex indices)
const EDGES: [number, number][] = [
  [0, 1], [0, 4], [0, 5], [0, 8], [0, 9],
  [1, 6], [1, 7], [1, 8], [1, 9],
  [2, 3], [2, 4], [2, 5], [2, 10], [2, 11],
  [3, 6], [3, 7], [3, 10], [3, 11],
  [4, 5], [4, 8], [4, 10],
  [5, 9], [5, 11],
  [6, 7], [6, 8], [6, 10],
  [7, 9], [7, 11],
  [8, 10], [9, 11],
];

// Rotate point around X axis
const rotateX = (point: Point3D, angle: number): Point3D => {
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  return {
    x: point.x,
    y: point.y * cos - point.z * sin,
    z: point.y * sin + point.z * cos,
  };
};

// Rotate point around Y axis
const rotateY = (point: Point3D, angle: number): Point3D => {
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  return {
    x: point.x * cos + point.z * sin,
    y: point.y,
    z: -point.x * sin + point.z * cos,
  };
};

// Project 3D point to 2D
const project = (point: Point3D, width: number, height: number, fov: number): Point2D => {
  const z = point.z + fov;
  const scale = fov / z;
  return {
    x: point.x * scale + width / 2,
    y: point.y * scale + height / 2,
  };
};

export default function Icosahedron() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [position, setPosition] = useState({ x: 50, y: 50 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const rotationRef = useRef({ x: 0, y: 0 });
  const animationRef = useRef<number>(0);

  const SIZE = 200;
  const SCALE = 70;
  const FOV = 300;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const vertices = createVertices(SCALE);

    const render = () => {
      ctx.clearRect(0, 0, SIZE, SIZE);

      // Auto-rotate when not dragging
      if (!isDragging) {
        rotationRef.current.x += 0.004;
        rotationRef.current.y += 0.006;
      }

      // Transform vertices
      const transformedVertices = vertices.map((v) => {
        let point = rotateX(v, rotationRef.current.x);
        point = rotateY(point, rotationRef.current.y);
        return point;
      });

      // Project to 2D
      const projectedVertices = transformedVertices.map((v) =>
        project(v, SIZE, SIZE, FOV)
      );

      // Calculate edge depths for sorting (average z of both vertices)
      const edgesWithDepth = EDGES.map((edge) => ({
        edge,
        depth: (transformedVertices[edge[0]].z + transformedVertices[edge[1]].z) / 2,
      }));

      // Sort edges by depth (back to front)
      edgesWithDepth.sort((a, b) => a.depth - b.depth);

      // Draw edges
      edgesWithDepth.forEach(({ edge, depth }) => {
        const [i, j] = edge;
        const p1 = projectedVertices[i];
        const p2 = projectedVertices[j];

        // Opacity based on depth
        const normalizedDepth = (depth + SCALE) / (2 * SCALE);
        const opacity = 0.3 + normalizedDepth * 0.7;

        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.strokeStyle = `rgba(150, 150, 150, ${opacity})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();
      });

      animationRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationRef.current);
    };
  }, [isDragging]);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragOffset({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    setIsDragging(true);
    setDragOffset({
      x: touch.clientX - position.x,
      y: touch.clientY - position.y,
    });
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      setPosition({
        x: e.clientX - dragOffset.x,
        y: e.clientY - dragOffset.y,
      });
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isDragging) return;
      const touch = e.touches[0];
      setPosition({
        x: touch.clientX - dragOffset.x,
        y: touch.clientY - dragOffset.y,
      });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('touchmove', handleTouchMove);
      window.addEventListener('touchend', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleMouseUp);
    };
  }, [isDragging, dragOffset]);

  return (
    <canvas
      ref={canvasRef}
      width={SIZE}
      height={SIZE}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
      style={{
        position: 'fixed',
        left: position.x,
        top: position.y,
        cursor: isDragging ? 'grabbing' : 'grab',
        zIndex: 1000,
        pointerEvents: 'auto',
      }}
    />
  );
}

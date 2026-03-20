import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  color: string;
  size: number;
}

export default function ParticleTrails() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let particles: Particle[] = [];
    let mouseX = 0;
    let mouseY = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resize();
    window.addEventListener('resize', resize);

    const colors = ['#8b5cf6', '#ec4899', '#3b82f6', '#f59e0b'];

    const createParticle = (x: number, y: number) => {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 2 + 1;
      
      particles.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 0,
        maxLife: Math.random() * 60 + 30,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: Math.random() * 3 + 1,
      });
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      for (let i = 0; i < 3; i++) {
        createParticle(mouseX, mouseY);
      }
    };

    // Auto-generate particles
    setInterval(() => {
      if (particles.length < 100) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        createParticle(x, y);
      }
    }, 100);

    window.addEventListener('mousemove', handleMouseMove);

    const animate = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles = particles.filter(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.05; // Gravity
        p.life++;

        const alpha = 1 - p.life / p.maxLife;
        
        if (alpha > 0) {
          // Draw particle
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = p.color + Math.floor(alpha * 255).toString(16).padStart(2, '0');
          ctx.fill();

          // Draw trail
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p.x - p.vx * 3, p.y - p.vy * 3);
          ctx.strokeStyle = p.color + Math.floor(alpha * 0.5 * 255).toString(16).padStart(2, '0');
          ctx.lineWidth = p.size * 0.5;
          ctx.stroke();

          return true;
        }
        return false;
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-5"
      style={{ mixBlendMode: 'screen' }}
    />
  );
}

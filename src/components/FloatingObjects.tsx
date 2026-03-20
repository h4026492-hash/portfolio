import { useEffect, useState } from 'react';

export default function FloatingObjects() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {/* Floating geometric shapes */}
      <div
        className="absolute w-64 h-64 top-20 left-10 floating-object"
        style={{
          transform: `translate(${mousePos.x}px, ${mousePos.y}px) rotateX(${mousePos.y}deg) rotateY(${mousePos.x}deg)`,
          transition: 'transform 0.3s ease-out',
        }}
      >
        <div className="w-full h-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-3xl backdrop-blur-sm rotating-slow"></div>
      </div>

      <div
        className="absolute w-48 h-48 top-1/2 right-20 floating-object"
        style={{
          transform: `translate(${-mousePos.x}px, ${-mousePos.y}px) rotateX(${-mousePos.y}deg) rotateY(${-mousePos.x}deg)`,
          transition: 'transform 0.3s ease-out',
        }}
      >
        <div className="w-full h-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full backdrop-blur-sm rotating-medium"></div>
      </div>

      <div
        className="absolute w-56 h-56 bottom-32 left-1/3 floating-object"
        style={{
          transform: `translate(${mousePos.x * 0.5}px, ${mousePos.y * 0.5}px) rotateX(${mousePos.y * 0.5}deg) rotateY(${mousePos.x * 0.5}deg)`,
          transition: 'transform 0.3s ease-out',
        }}
      >
        <div className="w-full h-full bg-gradient-to-br from-pink-500/20 to-orange-500/20 backdrop-blur-sm rotating-fast"
          style={{
            clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
          }}
        ></div>
      </div>

      {/* Animated rings */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 animate-spin-slow">
        <div className="absolute inset-0 border-4 border-purple-500/30 rounded-full"></div>
        <div className="absolute inset-8 border-4 border-pink-500/30 rounded-full animate-spin-reverse"></div>
        <div className="absolute inset-16 border-4 border-blue-500/30 rounded-full"></div>
      </div>
    </div>
  );
}

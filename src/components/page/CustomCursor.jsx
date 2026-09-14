import React, { useEffect, useRef } from 'react';

const SplashCursor = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const onResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', onResize);

    const particles = [];
    // Soft elegant Cream, Warm Champagne & Muted Gold palette
    const colors = [
      { r: 242, g: 234, b: 217 },
      { r: 232, g: 213, b: 181 },
      { r: 212, g: 185, b: 105 },
      { r: 226, g: 201, b: 155 }
    ];

    class Particle {
      constructor(x, y, vx, vy, size, color) {
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.size = size;
        this.color = color;
        this.life = 1;
        this.decay = Math.random() * 0.025 + 0.02; // Faster subtle fade
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.vx *= 0.93;
        this.vy *= 0.93;
        this.life -= this.decay;
      }

      draw(c) {
        if (this.life <= 0) return;
        c.save();
        c.beginPath();
        // Smaller particle radius
        const currentRadius = Math.max(0.6, this.size * this.life);
        c.arc(this.x, this.y, currentRadius, 0, Math.PI * 2);
        
        // Muted subtle opacity (no harsh brightness)
        c.fillStyle = `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${this.life * 0.45})`;
        
        // Very soft subtle glow
        c.shadowColor = `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, 0.25)`;
        c.shadowBlur = 4;
        
        c.fill();
        c.restore();
      }
    }

    let prevX = null;
    let prevY = null;

    // Subtle smaller splashes
    const addSplash = (x, y, count = 4, power = 1.5) => {
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = (Math.random() * power + 0.5);
        const vx = Math.cos(angle) * speed;
        const vy = Math.sin(angle) * speed;
        // Size reduced to 1.5px - 3.8px
        const size = Math.random() * 2.3 + 1.5;
        const color = colors[Math.floor(Math.random() * colors.length)];
        particles.push(new Particle(x, y, vx, vy, size, color));
      }
    };

    const handlePointerMove = (e) => {
      const clientX = e.clientX;
      const clientY = e.clientY;

      if (prevX === null || prevY === null) {
        prevX = clientX;
        prevY = clientY;
        addSplash(clientX, clientY, 3, 1.2);
        return;
      }

      const dx = clientX - prevX;
      const dy = clientY - prevY;
      const dist = Math.hypot(dx, dy);

      if (dist > 3) {
        const steps = Math.min(Math.floor(dist / 5), 8);
        for (let i = 0; i <= steps; i++) {
          const t = i / (steps || 1);
          const px = prevX + dx * t;
          const py = prevY + dy * t;
          addSplash(px, py, 2, 1.2);
        }
      }

      prevX = clientX;
      prevY = clientY;
    };

    const handlePointerDown = (e) => {
      // Gentle burst on click
      addSplash(e.clientX, e.clientY, 16, 3.2);
    };

    window.addEventListener('mousemove', handlePointerMove, { passive: true });
    window.addEventListener('pointerdown', handlePointerDown, { passive: true });

    let animId;
    const loop = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.update();
        p.draw(ctx);
        if (p.life <= 0) {
          particles.splice(i, 1);
        }
      }

      animId = requestAnimationFrame(loop);
    };

    loop();

    return () => {
      window.removeEventListener('resize', onResize);
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('pointerdown', handlePointerDown);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 999999,
      }}
    />
  );
};

export default SplashCursor;

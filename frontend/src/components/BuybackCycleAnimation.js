import React, { useEffect, useRef } from 'react';

/**
 * BuybackCycleAnimation - Комбинация циклического потока и восходящих частиц
 * Отражает логику perpetual buyback & burn механизма
 */
function BuybackCycleAnimation() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particles = [];
    let orbitParticles = [];

    // Setup canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Orbital particle (for circular flow)
    class OrbitalParticle {
      constructor() {
        this.centerX = canvas.width / 2;
        this.centerY = canvas.height / 2;
        this.radius = Math.random() * 250 + 150; // Radius of orbit
        this.angle = Math.random() * Math.PI * 2;
        this.speed = (Math.random() * 0.0005 + 0.0003) * (Math.random() > 0.5 ? 1 : -1);
        this.size = Math.random() * 2.2 + 1.6; // Немного увеличен: 1.6-3.8px
        this.opacity = Math.random() * 0.18 + 0.1; // Немного увеличена: 0.1-0.28
      }

      update() {
        this.angle += this.speed;
        this.x = this.centerX + Math.cos(this.angle) * this.radius;
        this.y = this.centerY + Math.sin(this.angle) * this.radius;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(16, 185, 129, ${this.opacity})`; // Emerald-500
        ctx.fill();
      }
    }

    // Rising particle (for burn/ascend effect)
    class RisingParticle {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * canvas.width;
        this.y = canvas.height + 20;
        this.targetY = -20;
        this.speed = Math.random() * 0.4 + 0.3;
        this.size = Math.random() * 2.7 + 1.1; // Немного увеличен: 1.1-3.8px
        this.opacity = Math.random() * 0.28 + 0.14; // Немного увеличена: 0.14-0.42
        this.fadeStart = canvas.height * 0.3; // Start fading at 30% from bottom
        this.wobble = Math.random() * 2 - 1; // Slight horizontal movement
        this.wobbleSpeed = Math.random() * 0.02 + 0.01;
        this.wobbleOffset = Math.random() * Math.PI * 2;
      }

      update() {
        this.y -= this.speed;
        this.x += Math.sin(this.wobbleOffset) * this.wobble;
        this.wobbleOffset += this.wobbleSpeed;

        // Fade out as it rises
        if (this.y < this.fadeStart) {
          const fadeProgress = (this.fadeStart - this.y) / this.fadeStart;
          this.opacity = Math.max(0, this.opacity * (1 - fadeProgress * 0.5));
        }

        // Reset when particle goes off screen
        if (this.y < this.targetY) {
          this.reset();
        }
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        
        // Gradient effect for particle
        const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size);
        gradient.addColorStop(0, `rgba(16, 185, 129, ${this.opacity})`);
        gradient.addColorStop(1, `rgba(16, 185, 129, 0)`);
        
        ctx.fillStyle = gradient;
        ctx.fill();
      }
    }

    // Initialize particles
    const initParticles = () => {
      // Create orbital particles (circular flow) - немного больше
      for (let i = 0; i < 37; i++) {
        orbitParticles.push(new OrbitalParticle());
      }

      // Create rising particles (burn effect) - немного больше
      for (let i = 0; i < 20; i++) {
        const particle = new RisingParticle();
        particle.y = Math.random() * canvas.height; // Distribute initially
        particles.push(particle);
      }
    };

    // Draw connecting lines between nearby orbital particles
    const drawConnections = () => {
      const maxDistance = 145; // Немного увеличена дистанция
      
      for (let i = 0; i < orbitParticles.length; i++) {
        for (let j = i + 1; j < orbitParticles.length; j++) {
          const dx = orbitParticles[i].x - orbitParticles[j].x;
          const dy = orbitParticles[i].y - orbitParticles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < maxDistance) {
            const opacity = (1 - distance / maxDistance) * 0.12; // Немного увеличена видимость
            ctx.beginPath();
            ctx.strokeStyle = `rgba(16, 185, 129, ${opacity})`;
            ctx.lineWidth = 0.75; // Немного увеличена толщина
            ctx.moveTo(orbitParticles[i].x, orbitParticles[i].y);
            ctx.lineTo(orbitParticles[j].x, orbitParticles[j].y);
            ctx.stroke();
          }
        }
      }
    };

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw and update orbital particles
      orbitParticles.forEach(particle => {
        particle.update();
        particle.draw();
      });

      // Draw connections
      drawConnections();

      // Draw and update rising particles
      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    initParticles();
    animate();

    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ 
        zIndex: 1,
        mixBlendMode: 'normal'
      }}
    />
  );
}

export default BuybackCycleAnimation;

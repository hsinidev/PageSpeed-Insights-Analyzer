import React, { useRef, useEffect } from 'react';

const Starfield: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = canvas.offsetWidth;
    let height = canvas.offsetHeight;
    canvas.width = width;
    canvas.height = height;

    // --- Star Properties ---
    const stars: { x: number; y: number; z: number }[] = [];
    const numStars = 800;
    const starSpeed = 1;

    // --- Nebula Properties ---
    type Cloud = {
      x: number;
      y: number;
      radius: number;
      color: string;
      vx: number;
      vy: number;
    };
    const clouds: Cloud[] = [];
    const numClouds = 5;
    const nebulaColors = [
        'rgba(80, 0, 120, 0.2)', // Deep Purple
        'rgba(0, 50, 150, 0.2)', // Dark Blue
        'rgba(130, 0, 80, 0.15)', // Magenta
        'rgba(0, 100, 100, 0.1)' // Teal
    ];

    const initialize = () => {
        width = canvas.offsetWidth;
        height = canvas.offsetHeight;
        canvas.width = width;
        canvas.height = height;

        stars.length = 0;
        for (let i = 0; i < numStars; i++) {
            stars.push({
                x: Math.random() * width - width / 2,
                y: Math.random() * height - height / 2,
                z: Math.random() * width,
            });
        }
        
        clouds.length = 0;
        for (let i = 0; i < numClouds; i++) {
            clouds.push({
                x: Math.random() * width,
                y: Math.random() * height,
                radius: Math.random() * Math.min(width, height) * 0.4 + Math.min(width, height) * 0.2,
                color: nebulaColors[Math.floor(Math.random() * nebulaColors.length)],
                vx: (Math.random() - 0.5) * 0.1,
                vy: (Math.random() - 0.5) * 0.1,
            });
        }
    };


    let animationFrameId: number;

    const draw = () => {
      ctx.fillStyle = 'black';
      ctx.fillRect(0, 0, width, height);
      
      // --- Draw Nebula ---
      ctx.globalCompositeOperation = 'lighter';
      clouds.forEach(cloud => {
        // Move cloud
        cloud.x += cloud.vx;
        cloud.y += cloud.vy;

        // Boundary check
        if (cloud.x - cloud.radius > width) cloud.x = -cloud.radius;
        if (cloud.x + cloud.radius < 0) cloud.x = width + cloud.radius;
        if (cloud.y - cloud.radius > height) cloud.y = -cloud.radius;
        if (cloud.y + cloud.radius < 0) cloud.y = height + cloud.radius;
        
        const gradient = ctx.createRadialGradient(cloud.x, cloud.y, 0, cloud.x, cloud.y, cloud.radius);
        gradient.addColorStop(0, cloud.color);
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(cloud.x, cloud.y, cloud.radius, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.globalCompositeOperation = 'source-over';


      // --- Draw Stars ---
      ctx.save();
      ctx.translate(width / 2, height / 2);

      for (let i = 0; i < stars.length; i++) {
        const star = stars[i];
        star.z -= starSpeed;

        if (star.z <= 0) {
          star.x = Math.random() * width - width / 2;
          star.y = Math.random() * height - height / 2;
          star.z = width;
        }

        const k = 128.0 / star.z;
        const px = star.x * k;
        const py = star.y * k;

        if (px >= -width/2 && px < width/2 && py >= -height/2 && py < height/2) {
          const size = (1 - star.z / width) * 4;
          const shade = parseInt(((1 - star.z / width) * 255).toString());
          ctx.fillStyle = `rgb(${shade},${shade},${shade})`;
          ctx.beginPath();
          ctx.arc(px, py, size / 2, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      ctx.restore();
      animationFrameId = requestAnimationFrame(draw);
    };
    
    const handleResize = () => {
      initialize();
    };
    
    window.addEventListener('resize', handleResize);
    initialize();
    draw();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return <canvas ref={canvasRef} style={{ position: 'absolute', top: 0, left: 0, zIndex: 0, width: '100%', height: '100%' }} />;
};

export default Starfield;
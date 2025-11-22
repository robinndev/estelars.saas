// ConstellationScene.tsx
"use client";

import { useRef, useEffect } from "react";

interface ConstellationSceneProps {
  color: string;
  message?: string; // se você quiser usar a mensagem depois
}

interface Star {
  x: number;
  y: number;
  size: number;
  vx: number;
  vy: number;
}

export const ConstellationScene = ({ color }: ConstellationSceneProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<Star[]>([]);
  const animationRef = useRef<number | null>(null);

  // Quantidade de estrelas dinâmica para mobile
  const NUM_STARS =
    typeof window !== "undefined" && window.innerWidth < 768 ? 40 : 100;
  const MAX_DISTANCE = 20;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = canvas.offsetWidth;
    let height = canvas.offsetHeight;
    canvas.width = width;
    canvas.height = height;

    // Criação das estrelas
    const stars: Star[] = [];
    for (let i = 0; i < NUM_STARS; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 1.5 + 0.5,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
      });
    }
    starsRef.current = stars;

    const draw = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);

      // Desenha linhas entre estrelas próximas
      for (let i = 0; i < stars.length; i++) {
        for (let j = i + 1; j < stars.length; j++) {
          const dx = stars[i].x - stars[j].x;
          const dy = stars[i].y - stars[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < MAX_DISTANCE) {
            ctx.strokeStyle = color + "80";
            ctx.lineWidth = 0.3;
            ctx.beginPath();
            ctx.moveTo(stars[i].x, stars[i].y);
            ctx.lineTo(stars[j].x, stars[j].y);
            ctx.stroke();
          }
        }
      }

      // Desenha estrelas com brilho
      stars.forEach((star) => {
        ctx.fillStyle = "#FFFFFF";
        ctx.shadowColor = color;
        ctx.shadowBlur = 5;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();

        // Atualiza posição
        star.x += star.vx;
        star.y += star.vy;

        // Rebote nas bordas
        if (star.x < 0 || star.x > width) star.vx *= -1;
        if (star.y < 0 || star.y > height) star.vy *= -1;
      });

      animationRef.current = requestAnimationFrame(draw);
    };

    draw();

    // Atualiza canvas no resize
    const handleResize = () => {
      width = canvas.offsetWidth;
      height = canvas.offsetHeight;
      canvas.width = width;
      canvas.height = height;
    };
    window.addEventListener("resize", handleResize);

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      window.removeEventListener("resize", handleResize);
    };
  }, [color, NUM_STARS]);

  return (
    <div className="relative w-full h-full rounded-2xl overflow-hidden mt-2 mb-6">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
    </div>
  );
};

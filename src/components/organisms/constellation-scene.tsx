// ConstellationScene.tsx
"use client";

import { useRef, useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";

interface ConstellationSceneProps {
  color: string;
  message: string;
}

export const ConstellationScene = ({
  color,
  message,
}: ConstellationSceneProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [points, setPoints] = useState<[number, number, number][]>([]); // [x, y, size]
  const NUM_POINTS = 100;
  const MAX_DISTANCE = 20;
  const CONNECTION_PROBABILITY = 0.3;

  // 1. Geração dos Pontos
  useEffect(() => {
    const newPoints: [number, number, number][] = [];
    for (let i = 0; i < NUM_POINTS; i++) {
      const x = Math.random() * 100;
      const y = Math.random() * 100;
      const size = Math.random() * 1.5 + 0.5;
      newPoints.push([x, y, size]);
    }
    setPoints(newPoints);
  }, []);

  // 2. Determinação das Conexões (Memoized)
  const connections = useMemo(() => {
    const lines: {
      start: [number, number];
      end: [number, number];
      length: number;
    }[] = [];

    const getDist = (x1: number, y1: number, x2: number, y2: number) =>
      Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));

    for (let i = 0; i < points.length; i++) {
      for (let j = i + 1; j < points.length; j++) {
        const [x1, y1] = points[i];
        const [x2, y2] = points[j];
        const dist = getDist(x1, y1, x2, y2);

        if (dist < MAX_DISTANCE && Math.random() < CONNECTION_PROBABILITY) {
          lines.push({
            start: [x1, y1],
            end: [x2, y2],
            length: dist,
          });
        }
      }
    }
    return lines;
  }, [points]);

  // Função utilitária para cálculo de comprimento da linha (usada na animação)
  const getLineLength = (x1: number, y1: number, x2: number, y2: number) => {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full rounded-2xl overflow-hidden mt-2 mb-6"
    >
      {/* Linhas (Conexões) */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        {connections.map((line, index) => {
          const length = getLineLength(
            line.start[0],
            line.start[1],
            line.end[0],
            line.end[1]
          );
          const totalDelay = 0.5 + index * 0.03;

          return (
            <motion.line
              key={index}
              x1={line.start[0]}
              y1={line.start[1]}
              x2={line.end[0]}
              y2={line.end[1]}
              stroke={color + "C0"}
              strokeWidth="0.2"
              strokeLinecap="round"
              initial={{
                strokeDasharray: length,
                strokeDashoffset: length,
              }}
              animate={{
                strokeDashoffset: 0,
              }}
              transition={{
                duration: 0.8,
                delay: totalDelay,
                ease: "easeInOut",
              }}
            />
          );
        })}
      </svg>

      {/* Pontos (Estrelas) */}
      {points.map(([x, y, size], index) => (
        <motion.div
          key={index}
          className="absolute rounded-full"
          style={{
            left: `${x}%`,
            top: `${y}%`,
            width: `${size}px`,
            height: `${size}px`,
            background: "white",
            boxShadow: `0 0 5px ${color}`,
            zIndex: 10,
          }}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{
            opacity: [0, 1, 0.7, 1],
            scale: [0.5, 1, 1.1, 1],
            boxShadow: [
              `0 0 5px ${color}`,
              `0 0 15px ${color}`,
              `0 0 5px ${color}`,
            ],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: index * 0.05,
          }}
        />
      ))}
    </div>
  );
};

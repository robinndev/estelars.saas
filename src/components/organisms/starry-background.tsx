// StarryBackground.tsx
"use client";

import { motion } from "framer-motion";

interface StarryBackgroundProps {
  color: string;
}

export const StarryBackground = ({ color }: StarryBackgroundProps) => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {/* Animação de Brilho Central */}
    <motion.div
      animate={{
        scale: [1, 1.05, 1],
        rotate: [0, 5, 0],
        opacity: [0.3, 0.6, 0.3],
      }}
      transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      className="absolute inset-0 w-full h-full rounded-full blur-3xl"
      style={{
        background: `linear-gradient(45deg, ${color}30, #000000, ${color}30)`,
      }}
    />
    {/* Estrelas Individuais */}
    {[...Array(50)].map((_, i) => (
      <motion.div
        key={i}
        initial={{
          x: Math.random() * 800 - 400,
          y: Math.random() * 800 - 400,
          opacity: 0,
        }}
        animate={{
          x: Math.random() * 800 - 400,
          y: Math.random() * 800 - 400,
          opacity: [0, Math.random() * 0.8 + 0.2, 0],
        }}
        transition={{
          duration: Math.random() * 10 + 5,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute w-1 h-1 rounded-full shadow-lg"
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          background: i % 5 === 0 ? color : "white",
          boxShadow: `0 0 5px ${color}`,
        }}
      />
    ))}
  </div>
);

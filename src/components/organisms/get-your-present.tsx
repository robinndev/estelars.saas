"use client";

import { motion, AnimatePresence } from "framer-motion";
import { AnimatedListCard } from "../molecules/animated-list-card";
import { useState } from "react";

interface IGetYourPresentProps {
  color?: string;
  handleClick?: () => void;
}

export function GetYourPresent({ color, handleClick }: IGetYourPresentProps) {
  const specialColor = color || "#FF4081";

  const hexToRgba = (hex: string, alpha: number) => {
    let r = 0,
      g = 0,
      b = 0;
    if (hex.length === 7) {
      r = parseInt(hex.slice(1, 3), 16);
      g = parseInt(hex.slice(3, 5), 16);
      b = parseInt(hex.slice(5, 7), 16);
    }
    return `rgba(${r},${g},${b},${alpha})`;
  };

  const glowColor = hexToRgba(specialColor, 0.5);

  const [index, setIndex] = useState(0);
  const [clicked, setClicked] = useState(false);

  const handleButtonClick = () => {
    setClicked(true);
    if (handleClick) handleClick();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: "easeOut" }}
      className="flex flex-col items-center justify-center w-full h-screen px-6 text-center bg-white"
    >
      <AnimatedListCard setIndex={setIndex} />

      {index >= 2 && (
        <AnimatePresence>
          {!clicked && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20, transition: { duration: 0.5 } }}
              transition={{ duration: 0.8 }}
              className="mt-8 relative"
            >
              {/* Glow animado atrás do botão */}
              <motion.div
                animate={{
                  opacity: [0.6, 1, 0.6],
                  scale: [1, 1.15, 1],
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute inset-0 rounded-full blur-3xl"
                style={{ backgroundColor: glowColor }}
              />

              <motion.button
                onClick={handleButtonClick}
                whileTap={{ scale: 0.95 }}
                style={{
                  backgroundColor: specialColor,
                  boxShadow: `0 0 15px ${specialColor}, 0 0 40px ${glowColor}`,
                  scale: 1.05,
                }}
                className="relative cursor-pointer px-10 py-3 rounded-full font-bold text-white text-lg shadow-lg transition-all duration-300"
              >
                Ver presente
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </motion.div>
  );
}

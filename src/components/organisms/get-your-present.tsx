"use client";

import { motion } from "framer-motion";
import { AnimatedListCard } from "../molecules/animated-list-card";
import { useState } from "react";

interface IGetYourPresentProps {
  color?: string;
  handleClick?: () => void;
}

export function GetYourPresent({ color, handleClick }: IGetYourPresentProps) {
  const specialColor = color || "#FF4081";
  const [index, setIndex] = useState(0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: "easeOut" }}
      className="flex flex-col items-center justify-center w-full h-screen px-6 text-center bg-white"
    >
      <AnimatedListCard setIndex={setIndex}></AnimatedListCard>
      {index >= 3 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mt-8 relative"
        >
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
            className="absolute inset-0 rounded-full blur-2xl"
            style={{
              backgroundColor: specialColor,
            }}
          />
          <motion.button
            onClick={handleClick}
            whileHover={{
              scale: 1.05,
              boxShadow: `0 0 20px ${specialColor}, 0 0 40px ${specialColor}80`,
            }}
            whileTap={{ scale: 0.95 }}
            style={{ backgroundColor: specialColor }}
            className="relative px-10 py-3 rounded-full font-bold text-white text-lg shadow-lg transition-all duration-300"
          >
            Ver presente
          </motion.button>
        </motion.div>
      )}
    </motion.div>
  );
}

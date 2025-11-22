// TimelineCard.tsx
"use client";

import { useCallback } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import Image from "next/image";
import type { Story } from "@/src/@types/timeline";
import { ConstellationScene } from "../organisms/constellation-scene";

interface TimelineCardProps {
  currentStory: Story;
  color: string;
  cardRef: React.RefObject<HTMLDivElement | null>;
  isExiting: boolean;
}

const TILT_RANGE = 8;

export const TimelineCard = ({
  currentStory,
  color,
  cardRef,
  isExiting,
}: TimelineCardProps) => {
  // --- Tilt 3D Logic ---
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useTransform(mouseY, [-0.5, 0.5], [TILT_RANGE, -TILT_RANGE]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-TILT_RANGE, TILT_RANGE]);
  const springRotateX = useSpring(rotateX, { stiffness: 200, damping: 20 });
  const springRotateY = useSpring(rotateY, { stiffness: 200, damping: 20 });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      mouseX.set(x);
      mouseY.set(y);
    },
    [mouseX, mouseY, cardRef]
  );

  const handleMouseLeave = useCallback(() => {
    mouseX.set(0);
    mouseY.set(0);
  }, [mouseX, mouseY]);

  return (
    <AnimatePresence mode="wait">
      {!isExiting && (
        <motion.div
          key={currentStory.id}
          ref={cardRef}
          initial={{
            opacity: 0,
            scale: 0.9,
            y: 50,
            rotateX: 0,
            rotateY: 0,
          }}
          animate={{ opacity: 1, scale: 1, y: 0, rotateX: 0, rotateY: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: -50, rotateX: 0, rotateY: 0 }}
          transition={{ duration: 0.8, ease: [0.17, 0.67, 0.83, 0.9] }}
          style={{
            rotateX: springRotateX,
            rotateY: springRotateY,
            transformStyle: "preserve-3d",
            perspective: "1000px",
          }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="relative flex flex-col items-center h-[550px] w-full p-6 text-center
              bg-gradient-to-b from-[#1e1e1e99] to-[#12121299] backdrop-blur-sm rounded-3xl
              shadow-2xl shadow-black/70 overflow-hidden border border-[#55555520]"
        >
          {/* Ícone */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5, z: 20 }}
            animate={{ opacity: 1, scale: 1, z: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="mb-4 p-3 rounded-full"
            style={{ background: color, boxShadow: `0 0 25px ${color}B0` }}
          >
            <currentStory.icon size={36} className="text-white" />
          </motion.div>

          {/* Título e Descrição */}
          <div className="relative z-20 px-4 w-full text-center">
            <h2 className="mb-3 text-4xl font-extrabold tracking-tight text-white drop-shadow-lg">
              {currentStory.title}
            </h2>
            <p className="text-gray-200 text-lg leading-relaxed max-w-xs mx-auto">
              {currentStory.description.split("**").map((part, i) =>
                i % 2 === 1 ? (
                  <motion.b
                    key={i}
                    style={{ color: color, z: 10 }}
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: 1,
                      ease: "easeInOut",
                    }}
                  >
                    {part}
                  </motion.b>
                ) : (
                  part
                )
              )}
            </p>
          </div>

          {/* Mídia/Cena Customizada (Renderização Condicional) */}
          <div
            className="relative w-full max-w-sm flex items-center justify-center flex-grow"
            style={{ transformStyle: "preserve-3d" }}
          >
            {currentStory.type === "constellation" &&
              currentStory.constellationMessage && (
                <ConstellationScene
                  color={color}
                  message={currentStory.constellationMessage}
                />
              )}

            {["milestone", "fun"].includes(currentStory.type) &&
              currentStory.imageSrc && (
                <motion.div
                  initial={{ opacity: 0, y: 20, z: -50 }}
                  animate={{ opacity: 1, y: 0, z: 0 }}
                  transition={{ duration: 0.8 }}
                  className="w-full h-[300px] rounded-xl overflow-hidden shadow-lg shadow-black/50"
                >
                  <Image
                    src={currentStory.imageSrc}
                    alt={currentStory.title}
                    layout="fill"
                    objectFit="cover"
                    className="transition-transform duration-500 hover:scale-105"
                  />
                </motion.div>
              )}

            {["time", "future"].includes(currentStory.type) && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1.5 }}
                transition={{
                  duration: 1.5,
                  type: "spring",
                  stiffness: 50,
                }}
                className="absolute w-60 h-60 rounded-full blur-3xl opacity-40"
                style={{ background: color }}
              />
            )}
          </div>

          {/* Borda pulsante */}
          <motion.div
            className="absolute inset-0 rounded-3xl pointer-events-none"
            style={{
              border: `2px solid ${color}00`,
              boxShadow: `0 0 30px ${color}00`,
            }}
            animate={{
              borderColor: [`${color}20`, `${color}80`, `${color}20`],
              boxShadow: [
                `0 0 10px ${color}00`,
                `0 0 40px ${color}60`,
                `0 0 10px ${color}00`,
              ],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

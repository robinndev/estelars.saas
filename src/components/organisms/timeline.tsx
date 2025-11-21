"use client";

import { useRef, useState, useEffect, useMemo, useCallback } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { Confetti, type ConfettiRef } from "@/components/ui/confetti";
import Image from "next/image";
import { Timer, Star, Rocket, Sparkles } from "lucide-react";
import { AudioPlayer } from "../molecules/audio-player";

interface TimelineProps {
  startDate: string;
  color: string;
  setStage: (stage: number) => void;
  musicLink?: string;
}

interface Story {
  id: number;
  type: "time" | "milestone" | "future" | "fun" | "moon";
  title: string;
  description: string;
  icon?: any;
  imageSrc?: string;
  confetti?: boolean;
  moonPhase?: string;
}

const StarryBackground = ({ color }: { color: string }) => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
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

export const Timeline = ({
  startDate,
  color,
  setStage,
  musicLink,
}: TimelineProps) => {
  const confettiRef = useRef<ConfettiRef>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [isExiting, setIsExiting] = useState(false);
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);

  // --- Tilt 3D ---
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const TILT_RANGE = 8;
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
    [mouseX, mouseY]
  );

  const handleMouseLeave = useCallback(() => {
    mouseX.set(0);
    mouseY.set(0);
  }, [mouseX, mouseY]);

  // --- Stories ---
  const startTime = useMemo(() => new Date(startDate).getTime(), [startDate]);
  const hoursTogether = useMemo(
    () => Math.floor((new Date().getTime() - startTime) / (1000 * 60 * 60)),
    [startTime]
  );

  const stories: Story[] = useMemo(
    () => [
      {
        id: 1,
        type: "time",
        title: `Contando as Horas Juntos 💖`,
        description: `Vocês já compartilham **${hoursTogether} horas**! Isso dá cerca de ${Math.floor(
          hoursTogether / 24
        )} dias de muito amor e cumplicidade.`,
        icon: Timer,
        confetti: true,
      },
      // {
      //   id: 3,
      //   type: "milestone",
      //   title: "Primeira Viagem Inesquecível 🚗",
      //   description:
      //     "Aquele fim de semana que marcou o início das nossas aventuras juntos, cheio de risadas e descobertas.",
      //   icon: Rocket,
      //   imageSrc: "/trip-memory.jpg",
      // },
      {
        id: 2,
        type: "future",
        title: "O que vem por aí... ✨",
        description:
          "Novas datas, novas memórias e um futuro brilhante esperando por nós. Próxima grande meta: [Inserir Próxima Meta].",
        icon: Star,
      },
    ],
    [hoursTogether]
  );

  const advanceStory = useCallback(() => {
    setCurrentStoryIndex((prevIndex) => {
      const storiesLength = stories.length;

      if (prevIndex === storiesLength - 1) {
        setIsExiting(true);
        setTimeout(() => setStage(2), 800); // aguarda animação do exit
        return prevIndex;
      }

      const next = prevIndex + 1;
      if (stories[next]?.confetti) {
        confettiRef.current?.fire({
          origin: { y: 0.7 },
          colors: [color, "#FAD02E", "#FFFFFF", "#FF5C9D"],
        });
      }
      return next;
    });
  }, [stories, color, setStage]);

  useEffect(() => {
    const timer = setTimeout(advanceStory, 6000);
    return () => clearTimeout(timer);
  }, [currentStoryIndex, advanceStory]);

  const currentStory = stories[currentStoryIndex];

  const moonStyles = useMemo(
    () => ({
      boxShadow: `0 0 50px ${color}A0, 0 0 100px ${color}60`,
      filter: "drop-shadow(0 0 8px rgba(255,255,255,1))",
      animation: "pulse 2s infinite alternate",
    }),
    [color]
  );

  return (
    <div className="relative flex h-screen w-full flex-col items-center justify-start overflow-hidden bg-[#0a0a0a] p-4 text-white">
      <StarryBackground color={color} />
      <Confetti
        ref={confettiRef}
        className="absolute top-0 left-0 z-20 h-full w-full pointer-events-none"
      />

      <div className="w-full max-w-lg mt-10 relative z-30">
        {/* Barra de progresso */}
        <div className="flex w-full gap-2 mb-8 px-2">
          {stories.map((_, idx) => (
            <div
              key={idx}
              className="h-1.5 flex-1 rounded-full bg-[#333333] overflow-hidden cursor-pointer transition-colors hover:bg-[#555555]"
              onClick={() => setCurrentStoryIndex(idx)}
            >
              {idx === currentStoryIndex && (
                <motion.div
                  className="h-1.5 rounded-full"
                  style={{ background: color }}
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 6, ease: "linear" }}
                />
              )}
              {idx < currentStoryIndex && (
                <div
                  className="h-1.5 rounded-full"
                  style={{ background: color + "AA" }}
                />
              )}
            </div>
          ))}
        </div>

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

              {/* Mídia */}
              <div
                className="relative w-full max-w-sm flex items-center justify-center mb-6"
                style={{ transformStyle: "preserve-3d" }}
              >
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

              {/* Texto */}
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
      </div>

      {/* <div className="w-full">
        <AudioPlayer musicLink={musicLink} />
      </div> */}
      <div className="mt-8 text-sm text-gray-400 relative z-30">
        <Sparkles
          size={16}
          className="inline-block mr-1 text-yellow-300 animate-pulse"
        />
        Feito com toda a magia do nosso amor
      </div>
    </div>
  );
};

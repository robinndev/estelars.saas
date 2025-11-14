"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Heart, Music2, Pause, Play } from "lucide-react";

interface PreviewProps {
  selectedLayout: string;
}

interface TimeLeft {
  years: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

// TimeCard clean
const TimeCard = ({
  label,
  value,
  isSeconds,
}: {
  label: string;
  value: number;
  isSeconds: boolean;
}) => (
  <motion.div
    className="flex flex-col items-center p-2 rounded-lg bg-white shadow min-w-[60px]"
    layout
    transition={{ type: "spring", stiffness: 300, damping: 25 }}
  >
    <AnimatePresence mode="wait">
      <motion.span
        key={value}
        initial={{ y: -15, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 15, opacity: 0 }}
        transition={{ duration: isSeconds ? 0.15 : 0.3 }}
        className={`text-3xl md:text-4xl font-black tracking-tighter ${
          isSeconds ? "text-rose-500" : "text-black"
        }`}
      >
        {String(value).padStart(2, "0")}
      </motion.span>
    </AnimatePresence>
    <span className="text-xs font-medium text-gray-600 mt-1 uppercase tracking-wider">
      {label}
    </span>
  </motion.div>
);

export default function Preview({ selectedLayout }: PreviewProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    years: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [progress, setProgress] = useState(30);
  const [isPlaying, setIsPlaying] = useState(true);

  const labels = ["anos", "dias", "horas", "minutos", "segundos"];
  const values = Object.values(timeLeft);

  // Contador regressivo
  useEffect(() => {
    const targetDate = new Date("2026-01-01T00:00:00");
    const interval = setInterval(() => {
      const now = new Date();
      const diff = Math.max(0, targetDate.getTime() - now.getTime());
      setTimeLeft({
        years: Math.floor(diff / (1000 * 60 * 60 * 24 * 365)),
        days: Math.floor((diff / (1000 * 60 * 60 * 24)) % 365),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Progresso da música
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setProgress((prev) => (prev >= 100 ? 0 : prev + 1));
    }, 1000);
    return () => clearInterval(interval);
  }, [isPlaying]);

  return (
    <div className="flex flex-col h-full items-center justify-center bg-white">
      <motion.div
        key={selectedLayout}
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="relative flex items-center justify-center"
      >
        {/* PHONE FRAME */}
        <div className="relative w-[370px] h-[700px] rounded-[36px] p-3 border border-gray-300 shadow-2xl bg-white">
          {/* NOTCH */}
          <div className="absolute top-2 left-1/2 -translate-x-1/2 w-[120px] h-[24px] bg-gray-200 rounded-b-3xl flex items-center justify-center z-10">
            <div className="w-10 h-1 bg-gray-400 rounded-full" />
          </div>

          {/* SCREEN */}
          <div className="w-full h-full bg-white rounded-[28px] overflow-y-auto flex flex-col shadow-inner shadow-gray-200 scrollbar-thin scrollbar-thumb-rose-500 scrollbar-track-gray-100">
            {/* TOP IMAGE */}
            <div className="relative w-full h-1/2 flex-shrink-0">
              <Image
                src="/robin-rebeca.png"
                alt="Hero"
                fill
                className="object-cover rounded-t-[28px]"
              />
              {/* Gradiente branco embaixo da imagem */}
              <div className="absolute bottom-0 w-full h-40 bg-gradient-to-t from-white to-transparent rounded-t-[28px]" />
            </div>

            {/* INFO CASAL */}
            <div className="flex flex-col items-center mt-[-40px] px-4 text-center z-10">
              <div className="p-3 bg-black/5 rounded-full mb-3 shadow-lg">
                <Heart className="w-8 h-8 text-rose-500" />
              </div>
              <h1 className="text-3xl font-extrabold text-black tracking-tight">
                Ana <span className="text-rose-500">&</span> Bruno
              </h1>
              <p className="text-gray-700 mt-2 text-md font-light">
                Contagem regressiva para a nossa próxima aventura!
              </p>
            </div>

            {/* CONTADOR */}
            <div className="text-center mt-6 px-4">
              <motion.p
                className="text-sm font-semibold tracking-widest text-rose-500 uppercase"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                Aniversário de namoro em
              </motion.p>
              <motion.h1
                className="text-4xl font-thin text-black mt-1"
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3, type: "spring", stiffness: 100 }}
              >
                12.06.2026
              </motion.h1>

              <div className="flex justify-center gap-2 mt-2">
                {labels.slice(1).map((label, idx) => (
                  <TimeCard
                    key={label}
                    label={label}
                    value={values[idx + 1]}
                    isSeconds={label === "segundos"}
                  />
                ))}
              </div>
            </div>

            {/* PLAYER */}
            <div className="mt-4 w-full max-w-sm px-6 mb-4 flex-shrink-0">
              <motion.div
                className="w-full flex flex-col items-center relative overflow-hidden p-3 bg-black/5 rounded-xl shadow-inner shadow-gray-200"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.8 }}
              >
                <div className="w-full flex justify-between items-center mb-2">
                  <Music2 className="w-4 h-4 text-gray-700" />
                  <p className="text-sm font-medium text-black truncate mx-2">
                    <span className="text-rose-500">Tema:</span> Nosso Favorito
                  </p>
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="p-1 rounded-full text-rose-500 hover:text-rose-400 transition-colors"
                  >
                    {isPlaying ? (
                      <Pause className="w-5 h-5" fill="currentColor" />
                    ) : (
                      <Play className="w-5 h-5" fill="currentColor" />
                    )}
                  </button>
                </div>

                {/* Barra de progresso */}
                <div className="w-full h-1 bg-gray-300 rounded-full">
                  <motion.div
                    className="h-full bg-rose-500 rounded-full"
                    style={{ width: `${progress}%` }}
                    layout
                    transition={{ duration: 0.5 }}
                  />
                </div>

                {/* Tempos do player */}
                <div className="w-full flex justify-between items-center mt-1">
                  <div className="text-xs text-gray-700 font-light">
                    0:{String(Math.floor(progress / 1.66)).padStart(2, "0")}
                  </div>
                  <div className="text-xs text-gray-700 font-light">0:60</div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

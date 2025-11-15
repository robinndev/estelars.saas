"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Heart } from "lucide-react";
import { AudioPlayer } from "./audio-player";
import { Count } from "./count";

interface PreviewProps {
  coupleName: string;
  message: string;
  color: string;
  startDate: string;
  startHour: string;
  image: File[] | null;
  musicLink: string;
  selectedPlan: "normal" | "premium";
  selectedColor: string;
}

export default function Preview({
  coupleName,
  message,
  color,
  startDate,
  startHour,
  image,
  musicLink,
  selectedPlan,
  selectedColor,
}: PreviewProps) {
  const [progress, setProgress] = useState(30);
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  const [datePart, setDatePart] = useState("");

  useEffect(() => {
    const datePart = startDate
      ? startDate.split("T")[0]
      : new Date().toISOString().split("T")[0];
    setDatePart(datePart);
  }, [startDate, startHour]);

  const parsedDate = useMemo(() => {
    const [hours = "00", minutes = "00"] = startHour
      ? startHour.split(":")
      : [];
    return new Date(
      `${datePart}T${hours.padStart(2, "0")}:${minutes.padStart(2, "0")}:00`
    );
  }, [datePart, startHour]);

  // Progress do audio
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setProgress((prev) => (prev >= 100 ? 0 : prev + 1));
    }, 1000);
    return () => clearInterval(interval);
  }, [isPlaying]);

  // Carousel de imagens
  useEffect(() => {
    if (!image || image.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % image.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [image]);

  return (
    <div className="flex items-center justify-center w-full min-h-screen bg-gradient-to-b from-black via-[#0a0a0f] to-[#0d0018] p-8">
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="relative flex items-center justify-center"
      >
        {/* PHONE FRAME */}
        <div className="relative w-[370px] h-[700px] rounded-[36px] p-3 bg-white/10 backdrop-blur-xl border border-white/20 shadow-[0_0_40px_rgba(140,80,255,0.3)]">
          {/* NOTCH */}
          <div className="absolute top-2 left-1/2 -translate-x-1/2 w-[120px] h-[22px] bg-white/20 rounded-b-3xl flex items-center justify-center z-10 backdrop-blur">
            <div className="w-10 h-1 bg-white/40 rounded-full" />
          </div>

          {/* SCREEN */}
          <div className="w-full h-full bg-black/30 backdrop-blur-xl rounded-[28px] overflow-y-auto flex flex-col border border-white/10">
            {/* HERO */}
            <div className="relative w-full h-1/2 flex-shrink-0">
              <AnimatePresence mode="wait">
                {image && image.length > 0 ? (
                  image.length > 1 ? (
                    <motion.div
                      key={currentIndex}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 1.5 }}
                      className="absolute inset-0"
                    >
                      <Image
                        src={URL.createObjectURL(image[currentIndex])}
                        alt={`Hero ${currentIndex}`}
                        fill
                        className="object-cover rounded-t-[28px]"
                      />
                    </motion.div>
                  ) : (
                    // Se só tem 1 imagem, renderiza direto sem animação
                    <div className="absolute inset-0">
                      <Image
                        src={URL.createObjectURL(image[0])}
                        alt="Hero"
                        fill
                        className="object-cover rounded-t-[28px]"
                      />
                    </div>
                  )
                ) : (
                  <div className="w-full h-full bg-gray-800 rounded-t-[28px]" />
                )}
              </AnimatePresence>

              <div className="absolute bottom-0 w-full h-40 bg-gradient-to-t from-[#28272A] to-transparent" />
            </div>

            {/* CASAL */}
            <div className="flex flex-col items-center mt-[-38px] px-4 text-center">
              <div className="p-3 bg-white/10 backdrop-blur rounded-full border border-white/10 shadow-md mb-3">
                <Heart className="w-7 h-7 text-violet-400" />
              </div>

              <h1 className="text-3xl font-bold text-white tracking-tight">
                {coupleName || "Ana & Bruno"}
              </h1>

              <p className="text-gray-300 text-sm font-light mt-2">
                {message || "Sua mensagem especial aparecerá aqui..."}
              </p>

              <p className="text-gray-400 mt-5 text-sm font-normal">
                Estamos juntos há:
              </p>
            </div>

            {/* CONTADOR */}
            <Count startDate={parsedDate} value={0} />

            {/* PLAYER */}
            {selectedPlan === "premium" && musicLink && (
              <AudioPlayer
                isPlaying={isPlaying}
                setIsPlaying={setIsPlaying}
                progress={progress}
                musicLink={musicLink}
              />
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

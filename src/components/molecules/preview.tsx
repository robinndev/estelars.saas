"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Heart, ImageIcon } from "lucide-react";
import { AudioPlayer } from "./audio-player";
import { Count } from "./count";
import { useTranslations } from "next-intl";

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
}: PreviewProps) {
  const t = useTranslations("Preview");

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

  // Audio progress
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setProgress((prev) => (prev >= 100 ? 0 : prev + 1));
    }, 1000);
    return () => clearInterval(interval);
  }, [isPlaying]);

  // Image carousel
  useEffect(() => {
    if (!image || image.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % image.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [image]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6 }}
      className="relative flex items-center justify-center"
    >
      {/* FUNDO GLOW */}
      <div
        className="absolute inset-0 blur-[120px]"
        style={{ background: `${color}40` }}
      />

      {/* CORPO EXTERNO DO IPHONE */}
      <div
        className="
      relative  w-[380px] lg:w-[400px] h-[760px]
      rounded-[48px]
      
      bg-gradient-to-br from-[#1a1a1a] to-[#2b2b2b]
      border-[3px] border-[#3d3d3d]
      shadow-[0_20px_80px_rgba(0,0,0,0.55)]
    "
      >
        {/* BOTÃO LATERAL DIREITO */}
        <div className="absolute right-[-6px] top-[110px] w-[4px] h-[80px] rounded-full bg-[#3e3e3e] shadow-md" />
        <div className="absolute right-[-6px] top-[220px] w-[4px] h-[48px] rounded-full bg-[#3e3e3e] shadow-md" />

        {/* ILHA DINÂMICA */}
        <div className="absolute top-5 left-1/2 -translate-x-1/2 w-[150px] h-[38px] rounded-full bg-black/90 shadow-xl backdrop-blur-xl border border-black/40 z-20 flex items-center justify-center">
          <div className="w-2 h-2 rounded-full bg-gray-700"></div>
        </div>

        {/* TELA */}
        <div
          className="
        absolute inset-[14px]
        bg-black
        rounded-[40px]
        overflow-hidden
        border border-black/40
        shadow-inner shadow-black/60
        flex flex-col
      "
        >
          {/* === SUA TELA permanece aqui === */}
          {/** COPIE A PARTIR DAQUI SEU CÓDIGO DA SCREEN **/}

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
                      className="object-cover"
                    />
                  </motion.div>
                ) : (
                  <div className="absolute inset-0">
                    <Image
                      src={URL.createObjectURL(image[0])}
                      alt="Hero"
                      fill
                      className="object-cover"
                    />
                  </div>
                )
              ) : (
                <div className="w-full h-full bg-gray-900 flex items-center justify-center text-gray-500 text-center gap-2 text-sm">
                  <ImageIcon />
                  {t("no_image")}
                </div>
              )}
            </AnimatePresence>

            <div className="absolute bottom-0 w-full h-40 bg-gradient-to-t from-black to-transparent" />
          </div>

          {/* COUPLE INFO */}
          <div className="flex flex-col items-center mt-[-38px] px-4 text-center">
            <div
              className="p-3 bg-gray-900/70 backdrop-blur rounded-full border border-gray-700 shadow-md mb-3"
              style={{
                boxShadow: `0 0 20px ${color}50, 0 0 40px ${color}40, 0 0 60px ${color}30`,
              }}
            >
              <Heart className="w-7 h-7" style={{ color }} />
            </div>

            <h1 className="text-3xl font-bold text-white tracking-tight">
              {coupleName || t("fallback_couple_name")}
            </h1>

            <p className="text-gray-300 text-sm font-light mt-2">
              {message || t("fallback_message")}
            </p>

            <p className="text-gray-400 mt-5 text-sm font-normal">
              {t("together_prefix")}:
            </p>
          </div>

          {/* COUNTER */}
          <Count startDate={parsedDate} value={0} color={color} />

          {/* AUDIO PLAYER */}
          {selectedPlan === "premium" && musicLink && (
            <AudioPlayer musicLink={musicLink} color={color} />
          )}
        </div>
      </div>
    </motion.div>
  );
}

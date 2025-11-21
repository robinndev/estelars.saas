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
    <div className="flex items-center justify-center w-full min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 p-8">
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="relative flex items-center justify-center"
      >
        <div
          className="relative w-[370px] h-[700px] rounded-[36px] p-3 bg-white/50 backdrop-blur-xl border border-gray-200 shadow-xl"
          style={{
            boxShadow: `0 0 199px ${color}30, 0 10px 30px rgba(0,0,0,0.1)`,
          }}
        >
          {/* NOTCH */}
          <div className="absolute top-2 left-1/2 -translate-x-1/2 w-[120px] h-[22px] bg-gray-200/50 rounded-b-3xl flex items-center justify-center z-10 backdrop-blur-sm border border-gray-300">
            <div className="w-10 h-1 bg-gray-400 rounded-full" />
          </div>

          {/* SCREEN */}
          <div className="w-full h-full bg-black rounded-[28px] overflow-y-auto flex flex-col border border-gray-700 shadow-inner shadow-gray-900/50">
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
                  <div className="w-full h-full bg-gray-900 rounded-t-[28px] flex items-center justify-center text-gray-500 text-center gap-2 text-sm">
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

            {/* AUDIO */}
            {selectedPlan === "premium" && musicLink && (
              <AudioPlayer musicLink={musicLink} color={color} />
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

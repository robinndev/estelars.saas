"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Heart } from "lucide-react";
import { Count } from "../molecules/count";
import { AudioPlayer } from "../molecules/audio-player";

interface CoupleViewProps {
  coupleName: string;
  message: string;
  color: string;
  startDate: string;
  startHour: string;
  image: (File | string)[] | null;
  musicLink?: string;
  selectedPlan: "normal" | "premium";
}

export const CoupleView = ({
  coupleName,
  message,
  color,
  startDate,
  startHour,
  image,
  musicLink = "",
  selectedPlan,
}: CoupleViewProps) => {
  const [progress, setProgress] = useState(0);
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

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setProgress((prev) => (prev >= 100 ? 0 : prev + 1));
    }, 1000);
    return () => clearInterval(interval);
  }, [isPlaying]);

  const [resolvedSrcs, setResolvedSrcs] = useState<string[] | null>(null);

  useEffect(() => {
    if (!image || image.length === 0) return setResolvedSrcs(null);

    const created: string[] = [];
    const final = image.map((img) => {
      if (typeof img === "string") return img;
      const url = URL.createObjectURL(img);
      created.push(url);
      return url;
    });

    setResolvedSrcs(final);

    return () => {
      created.forEach((u) => URL.revokeObjectURL(u));
    };
  }, [image]);

  useEffect(() => {
    if (!resolvedSrcs || resolvedSrcs.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((i) => (i + 1) % resolvedSrcs.length);
    }, 4200);
    return () => clearInterval(interval);
  }, [resolvedSrcs]);

  useEffect(() => setCurrentIndex(0), [resolvedSrcs]);

  return (
    <div className="w-full min-h-screen relative bg-black flex flex-col">
      {/* HERO */}
      <div className="relative w-full h-[55vh] overflow-hidden">
        {/* SLIDES */}
        <AnimatePresence mode="wait">
          {resolvedSrcs && resolvedSrcs.length > 0 ? (
            resolvedSrcs.length > 1 ? (
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.2 }}
                className="absolute inset-0"
              >
                {/* overlay com a cor personalizada durante o fade */}
                <div
                  className="absolute inset-0"
                  style={{
                    background: `linear-gradient(to bottom, ${color}20, ${color}40)`,
                    mixBlendMode: "overlay",
                  }}
                />

                <Image
                  src={resolvedSrcs[currentIndex]}
                  alt={`Hero ${currentIndex}`}
                  fill
                  className="object-cover object-center"
                  sizes="100vw"
                />
              </motion.div>
            ) : (
              <div className="absolute inset-0">
                <Image
                  src={resolvedSrcs[0]}
                  alt="Hero"
                  fill
                  className="object-cover object-center"
                  sizes="100vw"
                />
              </div>
            )
          ) : (
            <div className="w-full h-full bg-gray-800" />
          )}
        </AnimatePresence>

        {/* === OVERLAYS FIXOS — NÃO SOMEM NA TROCA === */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/20 to-black/50 pointer-events-none" />

        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-black pointer-events-none" />
      </div>

      {/* CONTEÚDO */}
      <div className="relative z-10 flex flex-col items-center w-full h-full px-4 text-center text-white -mt-8 pb-20">
        <div
          className="p-4 rounded-full mb-4"
          style={{
            background: color + "30",
            boxShadow: `0 0 20px ${color}50, 0 0 40px ${color}40, 0 0 60px ${color}30`,
          }}
        >
          <Heart className="w-8 h-8" style={{ color }} />
        </div>

        <h1 className="text-3xl font-bold tracking-tight">
          {coupleName || "Nome do casal"}
        </h1>

        <p className="text-gray-300 text-sm w-82 font-light mt-2">
          {message || "Sua mensagem especial aparecerá aqui..."}
        </p>

        <p className="text-gray-400 mt-8 -mb-2 text-sm font-normal">
          Estamos juntos há:
        </p>

        <div className="mt-2">
          <Count startDate={parsedDate} value={0} color={color} />
        </div>

        {selectedPlan === "premium" && musicLink && (
          <div className="w-full flex items-center justify-center mt-10">
            <AudioPlayer
              isPlaying={isPlaying}
              setIsPlaying={setIsPlaying}
              progress={progress}
              musicLink={musicLink}
              color={color}
            />
          </div>
        )}
      </div>
    </div>
  );
};

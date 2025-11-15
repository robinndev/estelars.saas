"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Heart, Music2, Pause, Play } from "lucide-react";
import { TimeCard } from "./time-card";
import type { PreviewProps, TimeTogether } from "@/src/@types/preview";
import { AudioPlayer } from "./audio-player";
import { Count } from "./count";

export default function Preview({ selectedLayout }: PreviewProps) {
  const [progress, setProgress] = useState(30);
  const [isPlaying, setIsPlaying] = useState(true);

  const startDate = new Date("2024-06-12T00:00:00");

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setProgress((prev) => (prev >= 100 ? 0 : prev + 1));
    }, 1000);
    return () => clearInterval(interval);
  }, [isPlaying]);

  return (
    <div className="flex items-center justify-center w-full min-h-screen bg-gradient-to-b from-black via-[#0a0a0f] to-[#0d0018] p-8">
      <motion.div
        key={selectedLayout}
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
              <Image
                src="/couple-sun.png"
                alt="Hero"
                fill
                className="object-cover rounded-t-[28px]"
              />
              <div className="absolute bottom-0 w-full h-40 bg-linear-to-t from-[#28272A] to-transparent" />
            </div>

            {/* CASAL */}
            <div className="flex flex-col items-center mt-[-38px] px-4 text-center">
              <div className="p-3 bg-white/10 backdrop-blur rounded-full border border-white/10 shadow-md mb-3">
                <Heart className="w-7 h-7 text-violet-400" />
              </div>

              <h1 className="text-3xl font-bold text-white tracking-tight">
                Ana <span className="text-violet-400">&</span> Bruno
              </h1>

              <p className="text-gray-300 text-sm font-light mt-2">
                Eu te amo mais a cada dia que passa. Você é meu tudo.
              </p>

              <p className="text-gray-400 mt-5 text-sm font-normal">
                Estamos juntos há:
              </p>
            </div>

            {/* CONTADOR */}
            <Count startDate={startDate} value={0} />

            {/* PLAYER */}
            <AudioPlayer
              isPlaying={isPlaying}
              setIsPlaying={setIsPlaying}
              progress={progress}
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
}

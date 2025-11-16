"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Play, Pause } from "lucide-react";

interface AudioPlayerProps {
  isPlaying: boolean;
  setIsPlaying: (playing: boolean) => void;
  progress: number;
  musicLink?: string;
  color?: string;
}

export const AudioPlayer = ({
  isPlaying,
  setIsPlaying,
  progress,
  musicLink,
  color = "#1DB954", // cor padrão spotify
}: AudioPlayerProps) => {
  return (
    <div className="w-full max-w-md px-4 mt-6">
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-[#121212]/90 backdrop-blur-xl rounded-xl p-4 flex flex-col gap-4"
      >
        {/* Linha Spotify */}
        <div className="flex items-center gap-4">
          {/* Mini capa */}
          <div className="relative w-14 h-14 rounded-md overflow-hidden shadow-lg">
            <Image src="/moon.png" alt="cover" fill className="object-cover" />
          </div>

          {/* Infos */}
          <div className="flex flex-col flex-1">
            <span className="text-white text-left font-medium text-sm truncate">
              Nossa Música
            </span>
            <span className="text-gray-400 text-left text-xs truncate">
              Tema especial do casal
            </span>
          </div>

          {/* Play/Pause */}
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-white"
          >
            {isPlaying ? (
              <Pause className="w-5 h-5 text-black" />
            ) : (
              <Play className="w-5 h-5 text-black translate-x-[1px]" />
            )}
          </button>
        </div>

        {/* Barra de progresso */}
        <div className="w-full">
          <div className="relative h-1 bg-white/20 rounded-full overflow-hidden">
            <motion.div
              className="absolute left-0 top-0 h-full rounded-full"
              style={{
                width: `${progress}%`,
                backgroundColor: color,
              }}
              transition={{ duration: 0.3 }}
            />
          </div>

          {/* tempo */}
          <div className="flex justify-between text-[10px] text-gray-400 mt-1">
            <span>
              0:{String(Math.floor(progress / 1.66)).padStart(2, "0")}
            </span>
            <span>1:00</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

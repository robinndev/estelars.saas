"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import YouTube from "react-youtube";
import { Play, Pause } from "lucide-react";

interface AudioPlayerProps {
  musicLink?: string; // link do YouTube
  color?: string;
}

export const AudioPlayer = ({
  musicLink,
  color = "#1DB954",
}: AudioPlayerProps) => {
  const playerRef = useRef<any>(null);
  const [videoId, setVideoId] = useState<string | null>(null);
  const [title, setTitle] = useState("Nossa Música");
  const [artist, setArtist] = useState("Tema especial do casal");
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  // Extrai videoId do link do YouTube
  useEffect(() => {
    if (!musicLink) return;
    try {
      const url = new URL(musicLink);
      const v = url.searchParams.get("v");
      if (v) setVideoId(v);
    } catch (err) {
      console.error("Invalid YouTube URL:", err);
    }
  }, [musicLink]);

  // Quando o videoId mudar, reseta estado
  useEffect(() => {
    setProgress(0);
    setIsPlaying(false);
    // Pode buscar título real da música via API, aqui fixo
    setTitle("Nossa Música");
    setArtist("Tema especial do casal");
  }, [videoId]);

  // Play/pause
  const togglePlay = () => {
    if (!playerRef.current) return;
    if (isPlaying) {
      playerRef.current.pauseVideo();
      setIsPlaying(false);
    } else {
      playerRef.current.playVideo();
      setIsPlaying(true);
    }
  };

  // Atualiza progress a cada 500ms
  useEffect(() => {
    if (!playerRef.current) return;
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        const current = playerRef.current.getCurrentTime();
        const duration = playerRef.current.getDuration();
        setProgress(duration ? (current / duration) * 100 : 0);
      }, 500);
    }
    return () => clearInterval(interval);
  }, [isPlaying, videoId]);

  const opts = {
    height: "0",
    width: "0",
    playerVars: {
      autoplay: 1, // começa tocando automaticamente
      controls: 0,
      disablekb: 1,
      modestbranding: 1,
      rel: 0,
    },
  };

  return (
    <div className="w-full max-w-md px-4 mt-6">
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-[#121212]/90 backdrop-blur-xl rounded-xl p-4 flex flex-col gap-4"
      >
        <div className="flex items-center gap-4">
          <div className="relative w-14 h-14 rounded-md overflow-hidden shadow-lg">
            {videoId ? (
              <Image
                src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
                alt={title}
                fill
                className="object-cover"
              />
            ) : (
              <Image
                src="/moon.png"
                alt="cover"
                fill
                className="object-cover"
              />
            )}
          </div>

          <div className="flex flex-col flex-1">
            <span className="text-white text-left font-medium text-sm truncate">
              {title}
            </span>
            <span className="text-gray-400 text-left text-xs truncate">
              {artist}
            </span>
          </div>

          <button
            onClick={togglePlay}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-white"
          >
            {isPlaying ? (
              <Pause className="w-5 h-5 text-black" />
            ) : (
              <Play className="w-5 h-5 text-black translate-x-[1px]" />
            )}
          </button>
        </div>

        <div className="w-full">
          <div className="relative h-1 bg-white/20 rounded-full overflow-hidden">
            <motion.div
              className="absolute left-0 top-0 h-full rounded-full"
              style={{ width: `${progress}%`, backgroundColor: color }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        {videoId && (
          <div className="w-0 h-0 overflow-hidden opacity-0 pointer-events-none">
            <YouTube
              videoId={videoId}
              opts={opts}
              onReady={(e) => {
                playerRef.current = e.target; // **aqui é o player real**
                playerRef.current.playVideo(); // já começa tocando
                setIsPlaying(true);
              }}
            />
          </div>
        )}
      </motion.div>
    </div>
  );
};

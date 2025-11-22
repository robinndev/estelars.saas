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

  const isMobile =
    typeof window !== "undefined" &&
    /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  const getYouTubeVideoId = (link: string) => {
    try {
      const url = new URL(link);

      const v = url.searchParams.get("v");
      if (v) return v;

      if (url.hostname.includes("youtu.be")) return url.pathname.slice(1);

      if (url.pathname.startsWith("/live/")) {
        return url.pathname.split("/live/")[1];
      }

      return null;
    } catch {
      return null;
    }
  };

  useEffect(() => {
    if (!musicLink) return;
    const id = getYouTubeVideoId(musicLink);
    if (id) setVideoId(id);
  }, [musicLink]);

  useEffect(() => {
    setProgress(0);
    setIsPlaying(false);
    setTitle("Nossa Música");
    setArtist("Tema especial do casal");
  }, [videoId]);

  const togglePlay = () => {
    if (!playerRef.current) {
      // Mobile workaround: abre YouTube no app/Browser
      if (isMobile && musicLink) {
        window.open(musicLink, "_blank");
      }
      return;
    }
    if (isPlaying) {
      playerRef.current.pauseVideo();
      setIsPlaying(false);
    } else {
      playerRef.current.playVideo();
      setIsPlaying(true);
    }
  };

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
    height: isMobile ? "200" : "0",
    width: isMobile ? "320" : "0",
    playerVars: {
      autoplay: 0,
      controls: isMobile ? 1 : 0, // MOBILE precisa de controles
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
            className="w-10 h-10 cursor-pointer flex items-center justify-center rounded-full bg-white"
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
          <div className={isMobile ? "w-full h-48" : "w-0 h-0"}>
            <YouTube
              videoId={videoId}
              opts={opts}
              onReady={(e) => (playerRef.current = e.target)}
            />
          </div>
        )}
      </motion.div>
    </div>
  );
};

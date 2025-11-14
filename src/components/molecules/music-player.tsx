"use client";

import { useEffect, useRef, useState } from "react";
import YouTube from "react-youtube";
import { motion, useAnimation } from "framer-motion";

export const MusicPlayer = ({
  videoId,
  title = "Sleeping in my car",
  artist = "Roxette",
}: {
  videoId: string;
  title?: string;
  artist?: string;
}) => {
  const playerRef = useRef<any>(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  const opts = {
    height: "1",
    width: "1",
    playerVars: {
      autoplay: 0,
      controls: 0,
      disablekb: 1,
      modestbranding: 1,
      rel: 0,
    },
  };

  const getPlayer = () => playerRef.current?.target;

  const togglePlay = () => {
    const player = getPlayer();
    if (!player) return;

    if (playing) {
      player.pauseVideo();
      setPlaying(false);
    } else {
      player.playVideo();
      setPlaying(true);
    }
  };

  // Simula barra de progresso
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (playing) {
      interval = setInterval(() => {
        setProgress((prev) => (prev >= 100 ? 0 : prev + 0.5));
      }, 500);
    }
    return () => clearInterval(interval);
  }, [playing]);

  // Animação do disco
  const rotation = useAnimation();
  useEffect(() => {
    if (playing) {
      rotation.start({
        rotate: 360,
        transition: { repeat: Infinity, duration: 10, ease: "linear" },
      });
    } else {
      rotation.stop();
    }
  }, [playing, rotation]);

  return (
    <div className="w-full max-w-sm relative p-6 flex flex-col items-center gap-4 rounded-3xl shadow-xl border border-white/20 bg-gradient-to-br from-purple-500/30 to-pink-500/20 backdrop-blur-xl overflow-hidden">
      {/* Glow animado atrás */}
      <motion.div
        className="absolute -inset-4 bg-gradient-to-r from-pink-400 to-purple-600 rounded-3xl blur-3xl opacity-50"
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />

      {/* Disco girando */}
      <motion.div
        animate={rotation}
        className="w-48 h-48 rounded-full overflow-hidden shadow-2xl z-10 cursor-pointer"
        onClick={togglePlay}
      >
        <img
          src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
          alt={title}
          className="w-full h-full object-cover rounded-full"
        />
      </motion.div>

      {/* Barra de progresso */}
      <div className="w-full h-1 bg-white/20 rounded-full mt-2 z-10 relative">
        <motion.div
          className="h-1 bg-rose-400 rounded-full absolute left-0 top-0"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Tocando agora pulsante */}
      <motion.span
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.5, repeat: Infinity }}
        className="text-sm text-white font-semibold uppercase tracking-wider z-10"
      >
        Tocando agora
      </motion.span>

      {/* Nome da música */}
      <div className="text-center z-10">
        <h2 className="text-lg font-bold text-white">{title}</h2>
        <p className="text-sm text-gray-200 mt-1">{artist}</p>
      </div>

      {/* Invisible YouTube */}
      <div className="w-0 h-0 overflow-hidden opacity-0 pointer-events-none">
        <YouTube
          videoId={videoId}
          opts={opts}
          onReady={(e) => {
            playerRef.current = e;
          }}
        />
      </div>
    </div>
  );
};

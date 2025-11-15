import { motion } from "framer-motion";
import { Heart, Music2, Pause, Play } from "lucide-react";

interface AudioPlayerProps {
  isPlaying: boolean;
  setIsPlaying: (playing: boolean) => void;
  progress: number;
}

export const AudioPlayer = ({
  isPlaying,
  setIsPlaying,
  progress,
}: AudioPlayerProps) => {
  return (
    <div className="mt-6 w-full max-w-sm px-6 mb-6">
      <motion.div
        className="w-full flex flex-col items-center p-3 bg-white/10 backdrop-blur-xl rounded-xl border border-white/10 shadow-lg"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.5 }}
      >
        <div className="w-full flex justify-between items-center mb-2">
          <Music2 className="w-4 h-4 text-gray-300" />
          <p className="text-sm font-medium text-gray-200 truncate mx-2">
            <span className="text-violet-400">Tema:</span> Nossa Música
          </p>
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="p-1 rounded-full text-violet-400 hover:text-violet-300 transition"
          >
            {isPlaying ? (
              <Pause className="w-5 h-5" fill="currentColor" />
            ) : (
              <Play className="w-5 h-5" fill="currentColor" />
            )}
          </button>
        </div>

        <div className="w-full h-1 bg-white/20 rounded-full">
          <motion.div
            className="h-full bg-violet-500 rounded-full shadow-[0_0_10px_rgba(150,100,255,0.8)]"
            style={{ width: `${progress}%` }}
            layout
            transition={{ duration: 0.4 }}
          />
        </div>

        <div className="w-full flex justify-between items-center mt-1 text-xs text-gray-400">
          <span>0:{String(Math.floor(progress / 1.66)).padStart(2, "0")}</span>
          <span>0:60</span>
        </div>
      </motion.div>
    </div>
  );
};

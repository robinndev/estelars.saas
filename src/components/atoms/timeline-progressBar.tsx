// TimelineProgressBar.tsx
"use client";

import type { Story } from "@/src/@types/timeline";
import { motion } from "framer-motion";

interface TimelineProgressBarProps {
  stories: Story[];
  currentStoryIndex: number;
  color: string;
  delayTime: number;
  setCurrentStoryIndex: (index: number) => void;
}

export const TimelineProgressBar = ({
  stories,
  currentStoryIndex,
  color,
  delayTime,
  setCurrentStoryIndex,
}: TimelineProgressBarProps) => {
  return (
    <div className="flex w-full gap-2 mb-8 px-2">
      {stories.map((_, idx) => (
        <div
          key={idx}
          className="h-1.5 flex-1 rounded-full bg-[#333333] overflow-hidden cursor-pointer transition-colors hover:bg-[#555555]"
          onClick={() => setCurrentStoryIndex(idx)}
        >
          {idx === currentStoryIndex && (
            <motion.div
              className="h-1.5 rounded-full"
              style={{ background: color }}
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: delayTime / 1000, ease: "linear" }}
            />
          )}
          {idx < currentStoryIndex && (
            <div
              className="h-1.5 rounded-full"
              style={{ background: color + "AA" }}
            />
          )}
        </div>
      ))}
    </div>
  );
};

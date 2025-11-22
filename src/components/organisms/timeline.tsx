// Timeline.tsx (O componente principal)
"use client";

import { useRef, useState, useEffect, useMemo, useCallback } from "react";
import { Timer, Star, Sparkles, Heart } from "lucide-react";
import { Confetti, type ConfettiRef } from "@/components/ui/confetti";
import type { Story, TimelineProps } from "@/src/@types/timeline";
import { StarryBackground } from "./starry-background";
import { TimelineProgressBar } from "../atoms/timeline-progressBar";
import { TimelineCard } from "../molecules/timeline-card";
// import { AudioPlayer } from "../molecules/audio-player"; // Descomente se for usar

export const Timeline = ({
  startDate,
  color,
  setStage,
  musicLink,
}: TimelineProps) => {
  const confettiRef = useRef<ConfettiRef>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [isExiting, setIsExiting] = useState(false);
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);

  // --- Stories Data ---
  const startTime = useMemo(() => new Date(startDate).getTime(), [startDate]);
  const hoursTogether = useMemo(
    () => Math.floor((new Date().getTime() - startTime) / (1000 * 60 * 60)),
    [startTime]
  );

  const stories: Story[] = useMemo(
    () => [
      {
        id: 0,
        type: "constellation",
        title: "Onde Tudo Começou 🌌",
        description: "O dia que nosso amor começou a brilhar.",
        icon: Heart,
        constellationMessage:
          "Assim estava o céu quando nos conhecemos, tudo mudou.",
      },
      {
        id: 1,
        type: "time",
        title: `Contando as Horas Juntos 💖`,
        description: `Vocês já compartilham **${hoursTogether} horas**! Isso dá cerca de ${Math.floor(
          hoursTogether / 24
        )} dias de muito amor e cumplicidade.`,
        icon: Timer,
        confetti: true,
      },
      {
        id: 2,
        type: "future",
        title: "O que vem por aí... ✨",
        description:
          "Novas datas, novas memórias e um futuro brilhante esperando por nós.",
        icon: Star,
      },
    ],
    [hoursTogether]
  );

  // --- Story Progression Logic ---
  const advanceStory = useCallback(() => {
    setCurrentStoryIndex((prevIndex) => {
      const storiesLength = stories.length;

      if (prevIndex === storiesLength - 1) {
        setIsExiting(true);
        setTimeout(() => setStage(2), 800);
        return prevIndex;
      }

      const next = prevIndex + 1;
      if (stories[next]?.confetti) {
        confettiRef.current?.fire({
          origin: { y: 0.7 },
          colors: [color, "#FAD02E", "#FFFFFF", "#FF5C9D"],
        });
      }
      return next;
    });
  }, [stories, color, setStage]);

  // Timer para avanço automático
  const delayTime = currentStoryIndex === 0 ? 8000 : 6000;

  useEffect(() => {
    const timer = setTimeout(advanceStory, delayTime);
    return () => clearTimeout(timer);
  }, [currentStoryIndex, advanceStory, delayTime]);

  const currentStory = stories[currentStoryIndex];

  return (
    <div className="relative flex h-screen w-full flex-col items-center justify-start overflow-hidden bg-[#0a0a0a] p-4 text-white">
      <StarryBackground color={color} />
      <Confetti
        ref={confettiRef}
        className="absolute top-0 left-0 z-20 h-full w-full pointer-events-none"
      />

      <div className="w-full max-w-lg mt-10 relative z-30">
        <TimelineProgressBar
          stories={stories}
          currentStoryIndex={currentStoryIndex}
          color={color}
          delayTime={delayTime}
          setCurrentStoryIndex={setCurrentStoryIndex}
        />

        <TimelineCard
          currentStory={currentStory}
          color={color}
          cardRef={cardRef}
          isExiting={isExiting}
        />
      </div>

      {/* <div className="w-full">
        <AudioPlayer musicLink={musicLink} />
      </div> */}
      <div className="mt-8 text-sm text-gray-400 relative z-30">
        <Sparkles
          size={16}
          className="inline-block mr-1 text-yellow-300 animate-pulse"
        />
        Feito com toda a magia do nosso amor
      </div>
    </div>
  );
};

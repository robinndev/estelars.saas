// types.ts

import { type ConfettiRef } from "@/components/ui/confetti"; // Se vier de um path diferente

export interface TimelineProps {
  startDate: string;
  color: string;
  setStage: (stage: number) => void;
  musicLink?: string;
}

export interface Story {
  id: number;
  type: "time" | "milestone" | "future" | "fun" | "moon" | "constellation";
  title: string;
  description: string;
  icon: any; // Lucide icon component
  imageSrc?: string;
  confetti?: boolean;
  moonPhase?: string;
  constellationMessage?: string;
}

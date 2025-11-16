"use client";

import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { GetYourPresent } from "@/src/components/organisms/get-your-present";
import { useState } from "react";
import { Timeline } from "@/src/components/organisms/timeline";
import { CoupleView } from "@/src/components/organisms/couple-view";

export default function CoupleProfile() {
  const { id } = useParams();

  const mockCoupleData = {
    coupleName: "Ana & Bruno",
    message:
      "Desde que você chegou, tudo ficou mais suave — as noites menos silenciosas, os dias mais leves, as coisas ganharam brilho!",
    color: "#e1d1d1",
    startDate: "2024-03-10",
    startHour: "12:00",
    image: ["/robin-rebeca.png", "/couple-sun.png"],
  };

  const [stage, setStage] = useState(2);

  enum GiftStage {
    GetYourGift = 0,
    Timeline = 1,
    Finish = 2,
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97, filter: "blur(20px)" }}
      animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
      transition={{ duration: 0.9, ease: "easeOut" }}
      className="min-h-screen w-full bg-black flex"
    >
      {(stage === GiftStage.GetYourGift && (
        <GetYourPresent
          color={mockCoupleData.color}
          handleClick={() => setStage(GiftStage.Timeline)}
        />
      )) ||
        (stage === GiftStage.Timeline && (
          <Timeline
            setStage={setStage}
            color={mockCoupleData.color}
            startDate={mockCoupleData.startDate}
          />
        )) ||
        (stage === GiftStage.Finish && (
          <CoupleView
            coupleName={mockCoupleData.coupleName}
            message={mockCoupleData.message}
            color={mockCoupleData.color}
            startDate={mockCoupleData.startDate}
            startHour={mockCoupleData.startHour}
            image={mockCoupleData.image as File[] | null} // se forem File[], adapte se precisar
            musicLink="das" // ou algum link de música se tiver
            selectedPlan="premium" // ou "normal"
          />
        ))}
    </motion.div>
  );
}

"use client";

import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { GetYourPresent } from "@/src/components/organisms/get-your-present";
import { useEffect, useState } from "react";
import { Timeline } from "@/src/components/organisms/timeline";
import { CoupleView } from "@/src/components/organisms/couple-view";
import { ISiteData } from "@/src/@types/site";

export default function CoupleProfile() {
  const [coupleData, setCoupleData] = useState<ISiteData | null>(null);
  const { id } = useParams();

  console.log("Couple ID from URL:", coupleData);

  const fetchCoupleData = async (coupleId: string) => {
    const res = await fetch(`/api/get-site/${coupleId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      console.error("Failed to fetch couple data");
      return;
    }

    const data = await res.json();
    setCoupleData(data.site);
  };

  useEffect(() => {
    if (id) {
      const coupleId = Array.isArray(id) ? id[0] : id;
      fetchCoupleData(coupleId);
    }
  }, [id]);

  const mockCoupleData = {
    coupleName: "Ana & Bruno",
    message:
      "Desde que você chegou, tudo ficou mais suave — as noites menos silenciosas, os dias mais leves, as coisas ganharam brilho!",
    color: "#e1d1d1",
    startDate: "2024-03-10",
    startHour: "12:00",
    image: ["/robin-rebeca.png", "/couple-sun.png"],
  };

  const [stage, setStage] = useState(0);

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
      {stage === GiftStage.Finish && !coupleData ? (
        <div className="w-full h-screen bg-black" />
      ) : null}

      {(stage === GiftStage.GetYourGift && (
        <GetYourPresent
          color={mockCoupleData.color}
          handleClick={() => setStage(GiftStage.Timeline)}
        />
      )) ||
        (stage === GiftStage.Timeline && (
          <Timeline
            setStage={setStage}
            color={coupleData?.color || "#e1d1d1"}
            startDate={coupleData?.start_date || "0000-00-00"}
          />
        )) ||
        (stage === GiftStage.Finish &&
          coupleData && ( // só renderiza real quando pronto
            <CoupleView
              coupleName={coupleData?.couple_name || "Casal"}
              message={coupleData?.message || "Mensagem do casal"}
              color={coupleData?.color || "#e1d1d1"}
              startDate={coupleData?.start_date || "0000-00-00"}
              startHour={coupleData?.start_hour || "00:00"}
              image={coupleData?.photos} // cast via unknown because mock data is string[] (paths)
              musicLink={"das"} // ou algum link de música se tiver
              selectedPlan={coupleData?.plan}
            />
          ))}
    </motion.div>
  );
}

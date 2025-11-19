"use client";

import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { GetYourPresent } from "@/src/components/organisms/get-your-present";
import { useEffect, useState } from "react";
import { Timeline } from "@/src/components/organisms/timeline";
import { CoupleView } from "@/src/components/organisms/couple-view";
import { ISiteData } from "@/src/@types/site";
import NotFound from "@/src/components/organisms/not-found";
import { Metadata } from "next";

export default function CoupleProfile() {
  const [coupleData, setCoupleData] = useState<ISiteData | null>(null);
  const [errors, setErrors] = useState<string | null>(null);
  const { id } = useParams();

  const fetchCoupleData = async (coupleId: string) => {
    try {
      const res = await fetch(`/api/get-site/${coupleId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        setErrors("Error fetching couple data");
        return;
      }

      const data = await res.json();
      setCoupleData(data.site);
    } catch (error) {
      setErrors("Error fetching couple data");
    }
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

  const [stage, setStage] = useState(2);

  enum GiftStage {
    GetYourGift = 0,
    Timeline = 1,
    Finish = 2,
  }

  if (errors) {
    return <NotFound />;
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
        (stage === GiftStage.Finish && coupleData && (
          <CoupleView
            coupleName={coupleData?.couple_name || "Casal"}
            message={coupleData?.message || "Mensagem do casal"}
            color={coupleData?.color || "#e1d1d1"}
            startDate={coupleData?.start_date || "0000-00-00"}
            startHour={coupleData?.start_hour || "00:00"}
            image={coupleData?.photos?.map((photo) => photo.url) || null}
            musicLink={coupleData?.music || ""}
            selectedPlan={coupleData?.plan}
          />
        ))}
    </motion.div>
  );
}

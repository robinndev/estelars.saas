"use client";

import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { GetYourPresent } from "@/src/components/organisms/get-your-present";
import { useEffect, useState } from "react";
import { Timeline } from "@/src/components/organisms/timeline";
import { CoupleView } from "@/src/components/organisms/couple-view";
import { ISiteData } from "@/src/@types/site";
import NotFound from "@/src/components/organisms/not-found";
import { useTranslations } from "next-intl";

export default function CoupleProfile() {
  const t = useTranslations("CoupleProfile");

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
        setErrors(t("error_fetching"));
        return;
      }

      const data = await res.json();
      setCoupleData(data.site);
    } catch (error) {
      setErrors(t("error_fetching"));
    }
  };

  useEffect(() => {
    if (id) {
      const coupleId = Array.isArray(id) ? id[0] : id;
      fetchCoupleData(coupleId);
    }
  }, [id]);

  const mockCoupleData = {
    coupleName: t("mock.couple_name"),
    message: t("mock.message"),
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
          color={coupleData?.color ?? "#FF4081"}
          handleClick={() => setStage(GiftStage.Timeline)}
        />
      )) ||
        (stage === GiftStage.Timeline && (
          <Timeline
            setStage={setStage}
            color={coupleData?.color || "#e1d1d1"}
            musicLink={coupleData?.music || ""}
            startDate={coupleData?.start_date || t("fallbacks.date")}
          />
        )) ||
        (stage === GiftStage.Finish && coupleData && (
          <CoupleView
            coupleName={coupleData?.couple_name || t("fallbacks.couple_name")}
            message={coupleData?.message || t("fallbacks.message")}
            color={coupleData?.color || "#e1d1d1"}
            startDate={coupleData?.start_date || t("fallbacks.date")}
            startHour={coupleData?.start_hour || t("fallbacks.hour")}
            image={coupleData?.photos?.map((photo) => photo.url) || null}
            musicLink={coupleData?.music || ""}
            selectedPlan={coupleData?.plan}
          />
        ))}
    </motion.div>
  );
}

"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Heart } from "lucide-react";
import { Count } from "../molecules/count";
import { AudioPlayer } from "../molecules/audio-player";
import { useTranslations } from "next-intl";

interface CoupleViewProps {
  coupleName: string;
  message: string;
  color: string;
  startDate: string;
  startHour: string;
  image: (File | string)[] | null;
  musicLink?: string;
  selectedPlan: "normal" | "premium";
}

export const CoupleView = ({
  coupleName,
  message,
  color,
  startDate,
  startHour,
  image,
  musicLink = "",
  selectedPlan,
}: CoupleViewProps) => {
  const t = useTranslations("CoupleView");

  const [currentIndex, setCurrentIndex] = useState(0);
  const [datePart, setDatePart] = useState("");
  const [resolvedSrcs, setResolvedSrcs] = useState<string[] | null>(null);

  /** DATE HANDLING */
  useEffect(() => {
    const datePart = startDate
      ? startDate.split("T")[0]
      : new Date().toISOString().split("T")[0];

    setDatePart(datePart);
  }, [startDate, startHour]);

  const parsedDate = useMemo(() => {
    const [hours = "00", minutes = "00"] = startHour
      ? startHour.split(":")
      : [];

    return new Date(
      `${datePart}T${hours.padStart(2, "0")}:${minutes.padStart(2, "0")}:00`
    );
  }, [datePart, startHour]);

  /** IMAGE RESOLUTION */
  useEffect(() => {
    if (!image || image.length === 0) {
      setResolvedSrcs(null);
      return;
    }

    const final = image.map((img) => {
      if (typeof img === "string") return img;

      if (img instanceof File) return URL.createObjectURL(img);

      const maybePhoto = img as { url?: string };
      if (maybePhoto.url) return maybePhoto.url;

      console.error(t("errors.invalid_image"), img);
      return "";
    });

    setResolvedSrcs(final.filter(Boolean));
  }, [image, t]);

  /** SLIDESHOW */
  useEffect(() => {
    if (!resolvedSrcs || resolvedSrcs.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((i) => (i + 1) % resolvedSrcs.length);
    }, 4200);

    return () => clearInterval(interval);
  }, [resolvedSrcs]);

  useEffect(() => setCurrentIndex(0), [resolvedSrcs]);

  console.log(musicLink);
  return (
    <div className="w-full min-h-screen relative bg-black flex flex-col lg:flex-row">
      {/* IMAGEM (MAIOR DESTAQUE NO DESKTOP) */}
      <div className="relative w-full h-[55vh] lg:h-screen lg:w-3/5 overflow-hidden">
        <AnimatePresence mode="wait">
          {resolvedSrcs && resolvedSrcs.length > 0 ? (
            resolvedSrcs.length > 1 ? (
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.2 }}
                className="absolute inset-0"
              >
                <div
                  className="absolute inset-0"
                  style={{
                    background: `linear-gradient(to bottom, ${color}20, ${color}40)`,
                    mixBlendMode: "overlay",
                  }}
                />

                <Image
                  src={resolvedSrcs[currentIndex]}
                  alt={`Hero ${currentIndex}`}
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 1024px) 100vw, 60vw" // Otimização de tamanhos
                />
              </motion.div>
            ) : (
              <div className="absolute inset-0">
                <Image
                  src={resolvedSrcs[0]}
                  alt="Hero"
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 1024px) 100vw, 60vw"
                />
              </div>
            )
          ) : (
            <div className="w-full h-full bg-gray-800" />
          )}
        </AnimatePresence>

        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/20 to-black/50 pointer-events-none lg:bg-none" />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-black pointer-events-none lg:hidden" />

        <div className="hidden lg:block absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-black pointer-events-none" />
      </div>

      <div className="relative z-10 flex flex-col items-center w-full h-full px-4 text-center text-white -mt-8 pb-20 lg:w-2/5 lg:py-20 lg:mt-0 lg:justify-center">
        <div className="lg:max-w-md lg:mx-auto">
          <div className="w-full flex items-center justify-center">
            <div
              className="p-4 rounded-full mb-4 w-16 h-16"
              style={{
                background: color + "30",
                boxShadow: `0 0 20px ${color}50, 0 0 40px ${color}40, 0 0 60px ${color}30`,
              }}
            >
              <Heart className="w-8 h-8" style={{ color }} />
            </div>
          </div>

          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
            {coupleName || t("fallbacks.couple_name")}
          </h1>

          <p className="text-gray-300 text-base w-full font-light mt-4 lg:text-lg">
            {message || t("fallbacks.message")}
          </p>

          <p className="text-gray-400 mt-12 -mb-2 text-sm font-normal">
            {t("fallbacks.together_for")}
          </p>

          <div className="mt-2">
            <Count startDate={parsedDate} value={0} color={color} />
          </div>

          {selectedPlan === "premium" && musicLink && (
            <div className="w-full flex items-center justify-center mt-12">
              <AudioPlayer musicLink={musicLink} color={color} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

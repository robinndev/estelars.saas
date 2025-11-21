"use client";

import Preview from "@/src/components/molecules/preview";
import CreateForm from "@/src/components/organisms/create-form";
import { motion } from "framer-motion";
import { useState } from "react";
import { useTranslations } from "next-intl";

interface Props {
  params: { id?: string };
}

export default function CreatePage({ params }: Props) {
  const t = useTranslations("CreatePage");

  const [selectedColor, setSelectedColor] = useState("black");
  const [selectedPlan, setSelectedPlan] = useState<"normal" | "premium">(
    "normal"
  );

  const [coupleName, setCoupleName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [message, setMessage] = useState("");
  const [color, setColor] = useState("#a684ff");
  const [startDate, setStartDate] = useState("");
  const [startHour, setStartHour] = useState("");
  const [image, setImage] = useState<File[] | null>(null);
  const [musicLink, setMusicLink] = useState("");

  const themes = [
    {
      id: "black",
      label: t("theme_black"),
      bg: "bg-black",
      text: "text-white",
    },
    {
      id: "white",
      label: t("theme_white"),
      bg: "bg-white",
      text: "text-black",
    },
    {
      id: "blue",
      label: t("theme_blue"),
      bg: "bg-blue-700",
      text: "text-white",
    },
  ];

  const handleImage = (files: File[]) => {
    setImage(files);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97, filter: "blur(20px)" }}
      animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
      transition={{ duration: 0.9, ease: "easeOut" }}
      className="min-h-screen w-full flex-col-reverse bg-gradient-to-br from-gray-50 via-white to-gray-100 flex flex-col lg:flex-row"
    >
      {/* Preview - MOBILE abaixo do form / DESKTOP à esquerda */}
      <div className="w-full flex lg:w-3/4 h-auto lg:h-screen flex justify-center items-center">
        <Preview
          coupleName={coupleName}
          message={message}
          color={color}
          startDate={startDate}
          startHour={startHour}
          image={image}
          musicLink={musicLink}
          selectedPlan={selectedPlan}
          selectedColor={selectedColor}
        />
      </div>

      {/* Form - MOBILE em cima / DESKTOP à direita */}
      <div className="order-1 lg:order-2 w-full lg:w-1/2 h-auto lg:h-screen overflow-y-auto">
        <CreateForm
          themes={themes}
          selectedColor={selectedColor}
          setSelectedColor={setSelectedColor}
          coupleName={coupleName}
          setCoupleName={setCoupleName}
          userEmail={userEmail}
          setUserEmail={setUserEmail}
          message={message}
          setMessage={setMessage}
          color={color}
          setColor={setColor}
          startDate={startDate}
          setStartDate={setStartDate}
          startHour={startHour}
          setStartHour={setStartHour}
          handleImage={handleImage}
          musicLink={musicLink}
          setMusicLink={setMusicLink}
          selectedPlan={selectedPlan}
          setSelectedPlan={setSelectedPlan}
          image={image}
        />
      </div>
    </motion.div>
  );
}

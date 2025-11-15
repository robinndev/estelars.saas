"use client";

import Preview from "@/src/components/molecules/preview";
import CreateForm from "@/src/components/organisms/create-form";
import { motion } from "framer-motion";
import { useState } from "react";

export default function CreatePage() {
  const [selectedColor, setSelectedColor] = useState("black");
  const [selectedPlan, setSelectedPlan] = useState<"normal" | "premium">(
    "normal"
  );

  const [coupleName, setCoupleName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [message, setMessage] = useState("");
  const [color, setColor] = useState("#8b0000");
  const [startDate, setStartDate] = useState("");
  const [startHour, setStartHour] = useState("");
  const [image, setImage] = useState<File[] | null>(null);
  const [musicLink, setMusicLink] = useState("");

  const themes = [
    { id: "black", label: "Black", bg: "bg-black", text: "text-white" },
    { id: "white", label: "White", bg: "bg-white", text: "text-black" },
    { id: "blue", label: "Blue", bg: "bg-blue-700", text: "text-white" },
  ];

  const handleImage = (files: File[]) => {
    console.log(files);
    setImage(files);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97, filter: "blur(20px)" }}
      animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
      transition={{ duration: 0.9, ease: "easeOut" }}
      className="min-h-screen w-full bg-black flex"
    >
      <div className="w-1/2 h-screen flex justify-center items-center bg-black text-white">
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
    </motion.div>
  );
}

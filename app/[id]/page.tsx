"use client";

import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { GetYourPresent } from "@/src/components/organisms/get-your-present";

export default function CoupleProfile() {
  const { id } = useParams();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97, filter: "blur(20px)" }}
      animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
      transition={{ duration: 0.9, ease: "easeOut" }}
      className="min-h-screen w-full bg-black flex"
    >
      <GetYourPresent />
    </motion.div>
  );
}

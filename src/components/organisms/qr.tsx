"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

export const QrSection = () => {
  const router = useRouter();
  const t = useTranslations("QR");

  return (
    <section className="relative w-full py-28 bg-white overflow-hidden">
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-pink-100/30 blur-2xl rounded-full"></div>

      <div className="container mx-auto px-6 lg:px-20 relative z-10 flex flex-col md:flex-row items-center justify-center gap-16">
        {/* QR IMAGE */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10"
        >
          <div className="bg-white border border-rose-100 shadow-lg rounded-3xl p-6 hover:shadow-rose-100/60 transition-all duration-300 hover:scale-105">
            <Image
              src="/qrcode.png"
              alt="QR Code"
              width={260}
              height={260}
              className="rounded-xl"
            />
          </div>
        </motion.div>

        {/* TEXT + BUTTON */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-md text-center md:text-left z-10"
        >
          <h2 className="text-4xl font-extrabold mb-4 leading-tight text-gray-900">
            {t("title")}{" "}
            <span className="text-rose-600">{t("phrase_emphasized")}</span>{" "}
            <br /> {t("finish_title")}
          </h2>

          <p className="text-gray-600 mb-8 text-lg leading-relaxed">
            {t("description")}{" "}
            <span className="font-semibold text-gray-900">
              {t("description_emphasized")}
            </span>{" "}
            {t("description_continued")} {t("really_fast")} 💝
          </p>

          <Button
            onClick={() => router.push("/create")}
            size="lg"
            className="bg-rose-600 cursor-pointer hover:bg-rose-700 text-white text-lg px-8 py-6 rounded-full font-semibold shadow-lg hover:shadow-rose-200 transition-all"
          >
            {t("button")}
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { steps } from "@/src/mocks/steps";
import { useTranslations } from "next-intl";

export default function HowToMake() {
  const t = useTranslations("How");

  return (
    <section className="relative w-full min-h-screen py-28 overflow-hidden bg-white">
      <div className="container mx-auto px-6 lg:px-20 relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl md:text-6xl font-extrabold mb-4 text-center text-gray-900 tracking-tight"
        >
          {t("title")}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-gray-600 text-lg text-center mb-20 max-w-2xl mx-auto leading-relaxed"
        >
          {t("subtitle")}
        </motion.p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {steps.map((step, i) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2, duration: 0.6, ease: "easeOut" }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="relative bg-white border border-gray-200 rounded-3xl overflow-hidden shadow-[0_5px_25px_rgba(0,0,0,0.08)] hover:shadow-[0_10px_35px_rgba(0,0,0,0.12)] transition-all duration-500 group"
            >
              {/* Imagem */}
              <div className="relative w-full h-64 overflow-hidden">
                <Image
                  src={step.image}
                  alt={step.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white via-white/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500"></div>
              </div>

              <div className="p-8 text-center">
                <h3 className="text-gray-900 font-semibold text-xl mb-3 tracking-tight">
                  {step.id}. {t(`step_${step.id}.title`)}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {t(`step_${step.id}.description`)}
                </p>
              </div>

              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-700 bg-gradient-to-t from-rose-200/30 via-transparent to-transparent blur-2xl"></div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

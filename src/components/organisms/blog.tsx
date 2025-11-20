"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Heart, BookOpen, ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";

const calloutVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.8,
      type: "spring",
      stiffness: 100,
      delay: 0.3,
    },
  },
} as const;

export const BlogCallout = () => {
  const t = useTranslations("BlogCallout");

  return (
    <section className="relative w-full py-28 bg-white overflow-hidden">
      <div className="container mx-auto px-6 lg:px-20 relative z-10">
        <motion.div
          variants={calloutVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          className="max-w-4xl mx-auto p-10 md:p-16 bg-linear-to-br from-rose-500 to-red-600 rounded-3xl shadow-2xl shadow-rose-500/40"
        >
          <div className="text-center text-white">
            <BookOpen className="w-16 h-16 mx-auto mb-4 stroke-[1.5]" />

            <motion.h2
              initial={{ y: 20 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="text-5xl md:text-6xl font-black mb-4 tracking-tighter"
            >
              {t("title")}
            </motion.h2>

            <motion.p
              initial={{ y: 20 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="text-xl font-light mb-8 max-w-2xl mx-auto"
            >
              {
                t(
                  "subtitle"
                ) /* Deixe-nos ser seu guia. Transforme o seu relacionamento em um filme inesquecível com nossas dicas e roteiros exclusivos. */
              }
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              <Link
                href="/blog"
                className="inline-flex items-center justify-center bg-white text-rose-600 font-extrabold text-lg px-8 py-4 rounded-full shadow-lg hover:shadow-xl hover:bg-rose-50 transition-all duration-300 transform hover:scale-[1.02]"
              >
                <Heart className="w-5 h-5 mr-3 fill-rose-600" />
                {t("button")}
                <ArrowRight className="w-5 h-5 ml-3" />
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

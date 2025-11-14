"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export const QrSection = () => {
  return (
    <section className="relative w-full py-28 bg-white overflow-hidden">
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-pink-100/30 blur-2xl rounded-full"></div>

      <div className="container mx-auto px-6 lg:px-20 relative z-10 flex flex-col md:flex-row items-center justify-center gap-16">
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

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-md text-center md:text-left z-10"
        >
          <h2 className="text-4xl font-extrabold mb-4 leading-tight text-gray-900">
            Vamos fazer um presente{" "}
            <span className="text-rose-600">surpresa</span> <br /> para o seu
            amor?
          </h2>
          <p className="text-gray-600 mb-8 text-lg leading-relaxed">
            Demora menos de{" "}
            <span className="font-semibold text-gray-900">5 minutos</span>. É
            sério! 💝
          </p>
          <Button
            size="lg"
            className="bg-rose-600 hover:bg-rose-700 text-white text-lg px-8 py-6 rounded-full font-semibold shadow-lg hover:shadow-rose-200 transition-all"
          >
            Supreender meu amor
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

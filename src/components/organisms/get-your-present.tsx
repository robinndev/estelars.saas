"use client";

import { motion } from "framer-motion";

export function GetYourPresent() {
  const specialColor = "#FF4081"; // cor do "especial", você pode trocar

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: "easeOut" }}
      className="flex flex-col items-center justify-center w-full min-h-screen px-6 text-center bg-black"
    >
      {/* Título estilo Netflix */}
      <h1 className="text-5xl md:text-6xl font-extrabold text-white leading-tight mb-6">
        Esse presente foi criado{" "}
        <span style={{ color: specialColor }}>especialmente</span> para você
      </h1>

      {/* Descrição romântica */}
      <p className="text-lg md:text-xl text-gray-300 max-w-xl mb-10">
        Um momento único para celebrar a conexão e o amor que vocês
        compartilham. Cada detalhe foi pensado para fazer vocês sorrirem juntos.
      </p>

      {/* Botão chamativo */}
      <motion.button
        whileHover={{
          scale: 1.05,
          boxShadow: `0 0 20px ${specialColor}, 0 0 40px ${specialColor}80`,
        }}
        whileTap={{ scale: 0.95 }}
        style={{ backgroundColor: specialColor }}
        className="px-8 py-3 rounded-full font-bold text-white text-lg shadow-lg transition-all duration-300"
      >
        Quero ver meu presente
      </motion.button>
    </motion.div>
  );
}

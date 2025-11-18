"use client";

import { QRCodeSVG } from "qrcode.react";
import { motion } from "framer-motion";
import { generateDesktopMemory } from "@/utils/generate-desktop";

interface DesktopMemoryProps {
  photoUrl: string;
  coupleName: string;
  message: string;
  profileLink: string;
  themeColor: string;
}

export const DesktopMemoryComponent = ({
  photoUrl,
  coupleName,
  message,
  profileLink,
  themeColor,
}: DesktopMemoryProps) => {
  const handleDownload = async () => {
    await generateDesktopMemory({
      photoUrl,
      coupleName,
      message,
      profileLink,
      themeColor,
    });
  };

  return (
    <div className="flex flex-col items-center w-full">
      {/* CARD — prévia */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative bg-black text-white rounded-3xl overflow-hidden shadow-2xl"
        style={{
          width: "960px",
          height: "540px",
          maxWidth: "100%",
        }}
      >
        {/* IMAGEM - lado direito */}
        <div className="absolute right-0 top-0 h-full w-[100%]">
          <img
            src={photoUrl}
            className="w-full h-full object-cover"
            alt="memory"
          />

          {/* Overlay degradê dentro da imagem */}
          <div className="absolute inset-0 bg-gradient-to-l from-black/90 via-black/60 to-transparent" />
        </div>

        {/* CONTEÚDO - lado esquerdo */}
        <div className="relative h-full w-[45%] flex flex-col justify-center pl-14 space-y-5 pointer-events-none">
          {/* Título */}
          <motion.div
            initial={{ opacity: 0, x: -25 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >
            <h1 className="text-6xl font-black leading-[1.05] tracking-tight drop-shadow-xl">
              Nossa
            </h1>
            <h1
              className="text-6xl font-black leading-[1.05] tracking-tight drop-shadow-xl"
              style={{ color: themeColor }}
            >
              Memória
            </h1>
          </motion.div>

          {/* Nome do casal */}
          <motion.p
            initial={{ opacity: 0, x: -18 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15, duration: 0.6 }}
            className="text-2xl font-semibold text-gray-200 drop-shadow"
          >
            {coupleName}
          </motion.p>

          {/* Mensagem (legenda) */}
          <motion.p
            initial={{ opacity: 0, x: -18 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.25, duration: 0.6 }}
            className="text-base leading-relaxed text-gray-400 max-w-sm drop-shadow"
          >
            {message || "Sem descrição adicionada ainda."}
          </motion.p>

          {/* QR code com moldura suave */}
          <motion.div
            initial={{ opacity: 0, x: -18 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.35, duration: 0.6 }}
            className="p-3 rounded-2xl bg-white/10 backdrop-blur-xl shadow-xl inline-block mt-4"
            style={{
              border: `1px solid ${themeColor}40`,
            }}
          >
            <QRCodeSVG value={profileLink} size={110} bgColor="transparent" />
          </motion.div>
        </div>
      </motion.div>

      <button
        onClick={handleDownload}
        style={{
          border: `2px solid ${themeColor}`,
          backgroundColor: themeColor + "22", // leve transparência
        }}
        className="mt-4 px-4 py-3 text-white rounded-xl shadow-lg hover:opacity-90 transition"
      >
        Baixar Versão Desktop
      </button>
    </div>
  );
};

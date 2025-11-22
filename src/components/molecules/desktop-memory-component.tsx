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
    <div className="flex flex-col items-center w-full ">
      {/* CARD — prévia responsiva e com altura mínima para mobile */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        // Contêiner principal
        className="relative w-full max-w-[1200px] overflow-hidden"
      >
        {/*
          APENAS em telas maiores (sm: - tablet/desktop), forçamos a proporção 16:9.
          Em telas menores, usamos um min-h para garantir que o conteúdo seja visível.
        */}
        <div className="min-h-[550px] sm:pt-[56.25%]"></div>

        {/* Conteúdo que é posicionado de forma absoluta para cobrir o contêiner 
            (que agora tem min-h em mobile e proporção 16:9 em desktop) */}
        <div className="absolute inset-0 bg-black text-white rounded-xl md:rounded-3xl shadow-2xl">
          {/* IMAGEM - lado direito */}
          <div className="absolute right-0 top-0 h-full w-full">
            <img
              src={photoUrl}
              className="w-full h-full object-cover"
              alt="memory"
            />

            {/* Overlay degradê: De preto no canto esquerdo para transparente no canto direito */}
            <div className="absolute inset-0 bg-gradient-to-l from-black/90 via-black/60 to-transparent" />
          </div>

          {/* CONTEÚDO - lado esquerdo */}
          <div className="relative h-full w-full sm:w-[55%] md:w-[45%] flex flex-col justify-center px-6 md:pl-14 py-8 space-y-3 md:space-y-5 pointer-events-none">
            {/* Título */}
            <motion.div
              initial={{ opacity: 0, x: -25 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
            >
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black leading-[1.05] tracking-tight drop-shadow-xl">
                Nossa
              </h1>
              <h1
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black leading-[1.05] tracking-tight drop-shadow-xl"
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
              className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-200 drop-shadow"
            >
              {coupleName}
            </motion.p>

            {/* Mensagem (legenda) */}
            <motion.p
              initial={{ opacity: 0, x: -18 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.25, duration: 0.6 }}
              className="text-sm md:text-base leading-snug md:leading-relaxed text-gray-400 max-w-[80%] sm:max-w-sm drop-shadow"
            >
              {message || "Sem descrição adicionada ainda."}
            </motion.p>

            {/* QR code com moldura suave */}
            <motion.div
              initial={{ opacity: 0, x: -18 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.35, duration: 0.6 }}
              className="p-2 md:p-3 rounded-lg md:rounded-2xl bg-white/10 backdrop-blur-xl shadow-xl inline-block mt-4"
              style={{
                border: `1px solid ${themeColor}40`,
              }}
            >
              {/* O tamanho do QR code é ajustado para telas menores */}
              <QRCodeSVG
                value={profileLink}
                size={80} // Tamanho padrão para mobile
                className="md:size-[110px]" // Ajusta para 110px em telas maiores que 'md'
                bgColor="transparent"
              />
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Botão de download */}
      <button
        onClick={handleDownload}
        style={{
          border: `2px solid ${themeColor}`,
          backgroundColor: themeColor + "22", // leve transparência
        }}
        className="mt-6 md:mt-8 px-6 py-3 text-lg text-white rounded-xl shadow-lg hover:opacity-90 transition"
      >
        Baixar Versão Desktop
      </button>
    </div>
  );
};

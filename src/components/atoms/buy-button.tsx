"use client";

import { motion } from "framer-motion";

export function BuyButton({
  onClick,
  disabled = false,
}: {
  onClick?: () => void;
  disabled?: boolean;
}) {
  return (
    <motion.button
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      whileTap={disabled ? {} : { scale: 0.96 }}
      whileHover={disabled ? {} : { scale: 1.04 }}
      className={`
        w-full py-4 mt-10
        rounded-2xl
        font-semibold text-lg
        tracking-wide
        transition-all duration-300
        backdrop-blur-lg

        ${
          disabled
            ? `
          text-white/40
          cursor-not-allowed
          bg-gradient-to-r from-[#444] via-[#555] to-[#666]
          shadow-none
        `
            : `
          text-white
          bg-gradient-to-r from-[#7b2ff7] via-[#9d4edd] to-[#c77dff]
          shadow-[0_0_25px_-2px_rgba(155,60,255,0.9)]
          hover:shadow-[0_0_45px_2px_rgba(180,80,255,1)]
        `
        }
      `}
    >
      Criar nosso site
      <p className="text-sm font-light">Preencha os dados faltantes</p>
    </motion.button>
  );
}

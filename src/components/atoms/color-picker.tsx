"use client";

import { useRef } from "react";
import { motion } from "framer-motion";

export function ColorPicker({
  value,
  onChange,
}: {
  value: string;
  onChange: any;
}) {
  const colorRef = useRef<HTMLInputElement | null>(null);

  // dispara o color picker nativo
  const openNativePicker = () => {
    if (!colorRef.current) return;
    try {
      colorRef.current.click();
    } catch (e) {
      // fallback silencioso
      console.warn("Não foi possível abrir o color picker nativo:", e);
    }
  };

  return (
    <div className="space-y-2 relative">
      <label className="block font-medium text-gray-200 tracking-wide">
        Cor principal
      </label>

      <motion.div
        onClick={openNativePicker}
        className="
          relative
          flex items-center gap-4 p-4 rounded-2xl
          bg-black/40 border border-white/10 backdrop-blur-xl
          shadow-[0_0_20px_-2px_rgba(120,50,255,0.25)]
          hover:border-purple-500/40 transition-all
          cursor-pointer
        "
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {/* Bolinha apenas visual */}
        <motion.div
          className="
            w-14 h-14 rounded-xl border border-white/20 shadow-inner
          "
          style={{ backgroundColor: value }}
          whileHover={{ scale: 1.08 }}
        />

        {/* Campo HEX estiloso — PARA DE PROPAGAR clique/focus */}
        <input
          type="text"
          value={value}
          onChange={onChange}
          maxLength={7}
          onClick={(e) => e.stopPropagation()}
          onFocus={(e) => e.stopPropagation()}
          className="
            w-28 p-2 rounded-lg font-mono text-sm
            bg-black/60 text-purple-200 
            border border-white/10
            focus:border-purple-500/50 outline-none
          "
        />

        {/* INPUT COLOR INVISÍVEL (usado para abrir o nativo via ref) */}
        <input
          ref={colorRef}
          type="color"
          value={value}
          onChange={onChange}
          // mantém no fluxo visual como absoluto e invisível — NÃO usar display:none
          className="absolute left-0 top-0 w-full h-full opacity-0 pointer-events-none"
          aria-label="seletor de cores"
        />
      </motion.div>
    </div>
  );
}

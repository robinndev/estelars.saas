"use client";

import { useRef } from "react";
import { motion } from "framer-motion";

export function ColorPicker({
  value,
  onChange,
  onBlur,
}: {
  value: string;
  // Ajuste o tipo de onChange se precisar de tipagem mais estrita,
  // mas 'any' é mantido se você estiver aceitando eventos nativos ou strings.
  onChange: any;
  onBlur?: () => void;
}) {
  const colorRef = useRef<HTMLInputElement | null>(null);

  const openNativePicker = () => {
    if (!colorRef.current) return;
    try {
      colorRef.current.click();
    } catch (e) {
      console.warn("Não foi possível abrir o color picker nativo:", e);
    }
  };

  return (
    <div className="space-y-2 relative">
      <label className="block font-medium text-gray-700 tracking-wide">
        Cor principal
      </label>

      <motion.div
        onClick={openNativePicker}
        className="
          relative
          flex items-center gap-4 p-4 rounded-xl /* Arredondamento grande (Apple) */
          
          /* Fundo e Borda Clean (Apple) */
          bg-white border border-gray-300 /* Fundo branco e borda neutra */
          
          /* Sombra Sutil (Apple) */
          shadow-md
          
          /* Efeito Hover (Netflix/Acento) */
          hover:border-red-500 hover:shadow-lg hover:shadow-red-100 transition-all /* Vermelho no hover */
          cursor-pointer
        "
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {/* Amostra de Cor */}
        <motion.div
          className="
            w-14 h-14 rounded-lg /* Arredondamento menor para a amostra */
            border-2 border-white /* Borda branca para contraste com a cor */
            shadow-inner 
            transition duration-200 ease-in-out
          "
          style={{ backgroundColor: value }}
          whileHover={{ scale: 1.08 }}
        />

        {/* Campo de Texto para o Código Hexadecimal */}
        <input
          onBlur={onBlur}
          type="text"
          value={value}
          onChange={onChange}
          maxLength={7}
          onClick={(e) => e.stopPropagation()}
          onFocus={(e) => e.stopPropagation()}
          className="
            w-28 p-2 rounded-lg font-mono text-base
            /* Estilo de Input Clean */
            bg-gray-100 text-gray-800 /* Fundo cinza claro, texto escuro */
            border border-gray-300
            
            /* Foco (Netflix Acento) */
            focus:border-red-500 focus:ring-1 focus:ring-red-200 outline-none
          "
        />

        {/* Input type="color" oculto (funcionalidade nativa) */}
        <input
          ref={colorRef}
          type="color"
          value={value}
          onChange={onChange}
          className="absolute left-0 top-0 w-full h-full opacity-0 pointer-events-none"
          aria-label="seletor de cores"
        />
      </motion.div>
    </div>
  );
}

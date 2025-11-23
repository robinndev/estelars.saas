"use client";

import { useRef } from "react";
import { motion } from "framer-motion";

export function ColorPicker({
  value,
  onChange,
  onBlur,
}: {
  value: string;
  onChange: any;
  onBlur?: () => void;
}) {
  const colorRef = useRef<HTMLInputElement | null>(null);

  return (
    <div className="space-y-2 relative">
      <label className="block font-medium text-gray-700 tracking-wide">
        Cor principal
      </label>

      <motion.div
        className="
          relative
          flex items-center  gap-4 p-4 rounded-lg
          bg-white border border-gray-300
          cursor-pointer
        "
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <motion.div
          className="
            w-14 h-14 rounded-lg border-2 border-white shadow-inner
            transition duration-200 ease-in-out
          "
          style={{ backgroundColor: value }}
          whileHover={{ scale: 1.08 }}
        />

        <input
          type="text"
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          maxLength={7}
          onClick={(e) => e.stopPropagation()}
          onFocus={(e) => e.stopPropagation()}
          className="
            w-28 p-2 rounded-lg font-mono text-base
            bg-gray-100 text-gray-800 border border-gray-300
            focus:border-red-500 focus:ring-1 focus:ring-red-200 outline-none
          "
        />

        <input
          ref={colorRef}
          type="color"
          value={value}
          onChange={onChange}
          className="absolute left-0 top-0 w-full h-full opacity-0"
          aria-label="seletor de cores"
        />
      </motion.div>
    </div>
  );
}

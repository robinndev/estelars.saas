"use client";

import { motion } from "framer-motion";

interface ThemeSelectorProps {
  selectedColor: string;
  setSelectedColor: (v: any) => void;
  themes: any[];
}

export function ThemeSelector({
  selectedColor,
  setSelectedColor,
  themes,
}: ThemeSelectorProps) {
  return (
    <div className="text-gray-100">
      <h1 className="text-xl font-semibold mb-5 text-gray-200 tracking-wide">
        Tema do Fundo
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {themes.map((t) => {
          const active = selectedColor === t.id;

          return (
            <motion.label
              key={t.id}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className={`
                relative cursor-pointer p-5 rounded-2xl  
                transition-all flex flex-col items-center gap-4
                shadow-lg backdrop-blur-xl

                ${
                  active
                    ? "border-indigo-400 bg-white/5 shadow-[0_0_25px_-2px_rgba(99,102,241,0.6)]"
                    : "border-white/10 bg-white/5 hover:border-white/20"
                }
              `}
            >
              {active && (
                <motion.div
                  layoutId="activeThemeGlow"
                  className="absolute inset-0 rounded-2xl bg-indigo-400/10 pointer-events-none"
                />
              )}

              {/* Preview */}
              <div
                className={`
                  w-24 h-44 rounded-2xl border border-white/10 overflow-hidden 
                  flex items-center justify-center ${t.bg} ${t.text}
                `}
              >
                <div className="flex flex-col items-center opacity-60">
                  <div className="w-12 h-2 rounded-md bg-gray-300/30 mb-3" />
                  <div className="w-16 h-2 rounded-md bg-gray-300/30 mb-1" />
                  <div className="w-10 h-2 rounded-md bg-gray-300/30" />
                </div>
              </div>

              {/* Radio */}
              <input
                type="radio"
                name="theme"
                checked={active}
                onChange={() => setSelectedColor(t.id)}
                className="hidden"
              />

              {/* Indicador */}
              <div
                className={`w-4 h-4 rounded-full border-2 transition
                ${
                  active
                    ? "border-indigo-400 bg-indigo-400"
                    : "border-white/30 bg-transparent"
                }`}
              />

              {/* Texto */}
              <span className="text-center text-gray-200 text-sm font-medium">
                {t.label}
              </span>
            </motion.label>
          );
        })}
      </div>
    </div>
  );
}

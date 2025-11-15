"use client";

import { motion } from "framer-motion";
import { Crown, Music } from "lucide-react";

interface PlanSelectorProps {
  selectedPlan: "normal" | "premium";
  setSelectedPlan: (v: "normal" | "premium") => void;
}

export function PlanSelector({
  selectedPlan,
  setSelectedPlan,
}: PlanSelectorProps) {
  const plans = [
    {
      id: "normal",
      title: "Plano Normal",
      description: "Recursos essenciais, sem música.",
      price: 19,
      icon: Music,
      colorTop: "from-zinc-800/70 to-zinc-900/0",
      iconBg: "bg-zinc-800 text-zinc-200",
    },
    {
      id: "premium",
      title: "Premium",
      description: "Música + extras exclusivos.",
      price: 29,
      icon: Crown,
      colorTop: "from-purple-700/60 to-purple-900/0",
      iconBg:
        "bg-gradient-to-br from-purple-700 via-purple-600 to-fuchsia-600 text-white",
    },
  ];

  return (
    <div className="mt-16 text-white">
      <h2 className="text-xl font-semibold mb-6 tracking-tight">
        Escolha o plano
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {plans.map((p) => {
          const active = selectedPlan === p.id;
          const Icon = p.icon;

          return (
            <motion.label
              key={p.id}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className={`
                relative cursor-pointer p-6 rounded-3xl transition-all
                overflow-hidden backdrop-blur-xl border
                bg-black/40
                ${
                  active
                    ? "border-purple-500/70 shadow-[0_0_35px_-6px_rgba(180,70,255,0.45)]"
                    : "border-white/10 hover:border-purple-400/40"
                }
              `}
              onClick={() => setSelectedPlan(p.id as "normal" | "premium")}
            >
              {/* Glow animado do selecionado */}
              {active && (
                <motion.div
                  layoutId="planGlow2"
                  className="
                    absolute inset-0 rounded-3xl opacity-[0.24] blur-3xl 
                    bg-gradient-to-br
                    from-purple-700 via-purple-500 to-fuchsia-500
                  "
                  transition={{
                    type: "spring",
                    stiffness: 140,
                    damping: 18,
                  }}
                />
              )}

              {/* Faixa de destaque topo */}
              <div
                className={`
                  absolute top-0 left-0 w-full h-24 
                  bg-gradient-to-b ${p.colorTop} rounded-t-3xl opacity-60
                `}
              />

              {/* Conteúdo */}
              <div className="relative flex flex-col gap-4">
                {/* Ícone */}
                <div
                  className={`
                    w-14 h-14 rounded-2xl flex items-center justify-center
                    shadow-inner shadow-black/40 border border-white/10 
                    ${p.iconBg}
                  `}
                >
                  <Icon size={28} strokeWidth={2.2} />
                </div>

                <div>
                  <h3 className="text-lg font-semibold tracking-tight">
                    {p.title}
                  </h3>
                  <p className="text-sm opacity-70 leading-snug">
                    {p.description}
                  </p>
                  <p className="mt-2 text-purple-300 font-semibold text-sm">
                    R$ {p.price},00
                  </p>
                </div>
              </div>

              <input
                type="radio"
                checked={active}
                className="hidden"
                onChange={() => setSelectedPlan(p.id as "normal" | "premium")}
              />
            </motion.label>
          );
        })}
      </div>
    </div>
  );
}

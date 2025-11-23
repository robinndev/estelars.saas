"use client";

import { motion } from "framer-motion";
import { Crown, Music } from "lucide-react";
import { useTranslations } from "next-intl";

interface PlanSelectorProps {
  selectedPlan: "normal" | "premium";
  setSelectedPlan: (v: "normal" | "premium") => void;
}

export function PlanSelector({
  selectedPlan,
  setSelectedPlan,
}: PlanSelectorProps) {
  const t = useTranslations("PlanSelector");

  const plans = [
    {
      id: "normal",
      title: t("normal_title"),
      description: t("normal_description"),
      price: 18.9,
      icon: Music,
      topColor: "from-gray-300/60 to-gray-50/0",
      iconBg: "bg-gray-200 text-gray-700",
    },
    {
      id: "premium",
      title: t("premium_title"),
      description: t("premium_description"),
      price: 29.9,
      icon: Crown,
      topColor: "from-purple-500/60 to-white/0",
      iconBg: "bg-purple-600 text-white",
    },
  ];

  return (
    <div className="text-gray-900">
      <h2 className="text-xl font-semibold mb-6 tracking-tight">
        {t("title")}
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
                relative cursor-pointer p-6 rounded-2xl transition-all 
                overflow-hidden border bg-white shadow-lg
                ${
                  active
                    ? "border-purple-500 shadow-[0_0_30px_-4px_rgba(161,46,255,0.4)]"
                    : "border-gray-300 hover:border-purple-400"
                }
              `}
              onClick={() => setSelectedPlan(p.id as "normal" | "premium")}
            >
              {p.id === "premium" && (
                <div
                  className="
                    absolute top-3 right-3 z-20
                    px-3 py-1 rounded-full text-xs font-medium
                    bg-gradient-to-r from-purple-600 to-pink-500 
                    text-white shadow-md tracking-wide
                  "
                >
                  {t("recommended")}
                </div>
              )}

              {active && (
                <motion.div
                  layoutId="planGlow2"
                  className="absolute inset-0 rounded-2xl opacity-[0.25] blur-3xl bg-purple-500"
                  transition={{ type: "spring", stiffness: 140, damping: 18 }}
                />
              )}

              {active && (
                <div
                  className={`
                    absolute top-0 left-0 w-full h-24 
                    bg-linear-to-b ${p.topColor} rounded-t-2xl opacity-80
                  `}
                />
              )}

              <div className="relative flex flex-col gap-4">
                <div
                  className={`
                    w-14 h-14 rounded-xl flex items-center justify-center
                    shadow-md border border-white/50 
                    ${p.iconBg}
                  `}
                >
                  <Icon size={28} strokeWidth={2.2} />
                </div>

                <div>
                  <h3 className="text-lg font-semibold tracking-tight">
                    {p.title}
                  </h3>

                  <p className="text-sm opacity-70 leading-snug text-gray-700">
                    {p.description}
                  </p>

                  <p className="mt-2 text-purple-600 font-semibold text-sm">
                    R$ {p.price}0
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

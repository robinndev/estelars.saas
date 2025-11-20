"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import type { PricePlan } from "@/src/@types/price";

export const Price = () => {
  const router = useRouter();
  const t = useTranslations("Price");

  const handleNavigateWithPlanSelected = (params: string) => {
    localStorage.setItem("plan_redirect", params);
    router.push("/create");
  };

  const plans = [
    {
      key: "normal",
      highlight: false,
    },
    {
      key: "premium",
      highlight: true,
    },
  ];

  return (
    <section className="relative w-full py-28 bg-white overflow-hidden">
      <div className="container mx-auto px-6 lg:px-20 relative z-10">
        {/* Título */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl md:text-6xl font-extrabold mb-4 text-center text-gray-900 tracking-tight"
        >
          {t("title")} 💝
        </motion.h2>

        {/* Subtítulo */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-gray-600 text-lg text-center mb-20 max-w-2xl mx-auto leading-relaxed"
        >
          {t("subtitle")}
        </motion.p>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-4xl mx-auto">
          {plans.map((plan, i) => {
            const data = t.raw(plan.key) as PricePlan;
            const features = Object.values(data.features);

            return (
              <motion.div
                key={plan.key}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.2, duration: 0.6 }}
                whileHover={{ scale: 1.04, y: -5 }}
                className={`relative rounded-3xl overflow-hidden transition-all duration-500 group border backdrop-blur-md ${
                  plan.highlight
                    ? "border-transparent bg-linear-to-b from-rose-100 via-white to-white shadow-[0_10px_40px_rgba(244,114,182,0.2)]"
                    : "border-gray-200 bg-white shadow-[0_5px_25px_rgba(0,0,0,0.05)]"
                }`}
              >
                <div className="p-10 text-left">
                  {/* Nome */}
                  <h3
                    className={`font-semibold text-2xl mb-3 tracking-tight ${
                      plan.highlight ? "text-gray-900" : "text-gray-800"
                    }`}
                  >
                    {data.title}
                  </h3>

                  {/* Preço */}
                  <div className="mb-6">
                    <span className="text-4xl font-extrabold text-gray-900">
                      {data.price}
                    </span>
                  </div>

                  {/* Features */}
                  <ul className="space-y-3 mb-10">
                    {features.map((feature, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 + index * 0.1 }}
                        className="text-gray-600 text-base"
                      >
                        {feature}
                      </motion.li>
                    ))}
                  </ul>

                  {/* Botão */}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => handleNavigateWithPlanSelected(plan.key)}
                    className={`w-full cursor-pointer py-4 rounded-2xl font-medium text-lg transition-all duration-300 ${
                      plan.highlight
                        ? "bg-linear-to-r from-rose-500 to-pink-400 text-white hover:shadow-lg hover:from-rose-400 hover:to-pink-300"
                        : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                    }`}
                  >
                    {data.button}
                  </motion.button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

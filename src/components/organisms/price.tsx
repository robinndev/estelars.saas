"use client";

import { motion } from "framer-motion";

export const Price = () => {
  const plans = [
    {
      id: 1,
      name: "Básico",
      price: "R$19",
      period: "/ano",
      features: [
        "3 fotos",
        "1 ano de acesso",
        "Sem música",
        "Contador de relacionamento",
      ],
      highlight: false,
    },
    {
      id: 2,
      name: "Premium",
      price: "R$29",
      period: "/ano",
      features: [
        "8 fotos",
        "Acesso ilimitado",
        "Com música",
        "Contador de relacionamento",
        "Efeitos ao abrir o site",
      ],
      highlight: true,
    },
  ];

  return (
    <section className="relative w-full py-28 bg-white overflow-hidden">
      {/* Iluminação suave */}

      <div className="container mx-auto px-6 lg:px-20 relative z-10">
        {/* Título */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl md:text-6xl font-extrabold mb-4 text-center text-gray-900 tracking-tight"
        >
          Planos & Preços 💝
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-gray-600 text-lg text-center mb-20 max-w-2xl mx-auto leading-relaxed"
        >
          Escolha o plano perfeito para eternizar a história de vocês com amor e
          delicadeza.
        </motion.p>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-4xl mx-auto">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2, duration: 0.6 }}
              whileHover={{ scale: 1.04, y: -5 }}
              className={`relative rounded-3xl overflow-hidden transition-all duration-500 group border backdrop-blur-md ${
                plan.highlight
                  ? "border-transparent bg-gradient-to-b from-rose-100 via-white to-white shadow-[0_10px_40px_rgba(244,114,182,0.2)]"
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
                  {plan.name}
                </h3>

                {/* Preço */}
                <div className="mb-6">
                  <span className="text-4xl font-extrabold text-gray-900">
                    {plan.price}
                  </span>
                  <span className="text-gray-500 font-medium text-lg ml-1">
                    {plan.period}
                  </span>
                </div>

                {/* Benefícios */}
                <ul className="space-y-3 mb-10">
                  {plan.features.map((feature, index) => (
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
                  className={`w-full py-4 rounded-2xl font-medium text-lg transition-all duration-300 ${
                    plan.highlight
                      ? "bg-gradient-to-r from-rose-500 to-pink-400 text-white hover:shadow-lg hover:from-rose-400 hover:to-pink-300"
                      : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                  }`}
                >
                  {plan.highlight ? "Escolher Premium 💕" : "Escolher Básico"}
                </motion.button>
              </div>

              {/* Glow suave no Premium */}
              {plan.highlight && (
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-t from-rose-300/30 via-transparent to-transparent blur-3xl transition-all duration-700"></div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

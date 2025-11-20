"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { faqs } from "@/src/mocks/faq";
import { motion } from "framer-motion";

export const Faq = () => {
  return (
    <section className="relative w-full py-28 bg-gradient-to-b from-white via-rose-50 to-white overflow-hidden">
      {/* Background suave */}
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-pink-100/30 blur-2xl rounded-full"></div>

      <div className="container mx-auto px-6 lg:px-20 relative z-10">
        {/* Título */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl md:text-6xl font-extrabold mb-4 text-center text-gray-900 tracking-tight"
        >
          Perguntas Frequentes 💬
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-gray-600 text-lg text-center mb-16 max-w-2xl mx-auto leading-relaxed"
        >
          Tire suas dúvidas antes de criar o presente perfeito 💝
        </motion.p>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                className="border  border-rose-100 bg-white rounded-2xl shadow-sm hover:shadow-md transition-all"
              >
                <AccordionTrigger className="text-left cursor-pointer text-gray-800 font-medium text-lg px-6 py-4 hover:text-rose-600">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 px-6 pb-5 leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

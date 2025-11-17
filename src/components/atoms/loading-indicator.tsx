"use client";

import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

export function LoadingIndicator() {
  return (
    <motion.div
      className="flex items-center justify-center gap-2"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="text-blue-500"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
      >
        <Loader2 color="purple" />
      </motion.div>
      <motion.span
        className="font-medium text-gray-700"
        animate={{ y: [0, -3, 0] }}
        transition={{ repeat: Infinity, duration: 0.6 }}
      >
        Processando...
      </motion.span>
    </motion.div>
  );
}

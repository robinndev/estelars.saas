"use client";

import { motion } from "framer-motion";

export const ScrollIndicator = () => {
  return (
    <motion.div
      className="flex flex-col items-center gap-3 pt-6"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
    >
      <motion.span
        className="text-sm text-gray-400 tracking-wide"
        animate={{ opacity: [0.3, 1, 0.3] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
      >
        Desça para baixar seu presente
      </motion.span>

      {/* Mouse */}
      <motion.div
        className="w-6 h-10 border-2 border-gray-400 rounded-full flex items-start justify-center py-1 relative"
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 2.5, repeat: Infinity }}
      >
        {/* Scroll wheel */}
        <motion.div
          className="w-1 h-1 bg-gray-400 rounded-full"
          animate={{
            y: [0, 6, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 1.4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </motion.div>
    </motion.div>
  );
};

import { motion, AnimatePresence } from "framer-motion";

export const TimeCard = ({
  label,
  value,
  isSeconds,
}: {
  label: string;
  value: number;
  isSeconds?: boolean;
}) => (
  <motion.div
    className="flex flex-col items-center min-w-[45px]"
    layout
    transition={{ type: "spring", stiffness: 250, damping: 22 }}
  >
    <AnimatePresence mode="wait">
      <motion.span
        key={value}
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 10, opacity: 0 }}
        transition={{ duration: isSeconds ? 0.15 : 0.22 }}
        className={`text-2xl md:text-[1.65rem] font-extrabold tracking-tight ${
          isSeconds ? "text-violet-400" : "text-white"
        }`}
      >
        {String(value).padStart(2, "0")}
      </motion.span>
    </AnimatePresence>

    <span className="text-[9px] font-semibold text-gray-300 mt-[2px] uppercase tracking-wider">
      {label}
    </span>
  </motion.div>
);

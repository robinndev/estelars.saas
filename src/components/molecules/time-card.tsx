import { motion } from "framer-motion";

export const TimeCard = ({
  label,
  value,
  isSeconds,
  color,
}: {
  label: string;
  value: number;
  isSeconds?: boolean;
  color: string;
}) => (
  <motion.div
    className="flex flex-col items-center min-w-[45px]"
    layout
    transition={{ type: "spring", stiffness: 250, damping: 22 }}
  >
    <motion.span
      key={value} // chave para animar mudança de valor
      initial={{ y: -10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 10, opacity: 0 }}
      transition={{ duration: isSeconds ? 0.15 : 0.22 }}
      className="text-2xl md:text-[1.65rem] font-extrabold tracking-tight"
      style={isSeconds ? { color } : undefined} // só aplica cor se for segundos
    >
      {String(value).padStart(2, "0")}
    </motion.span>

    <span className="text-[9px] font-semibold text-gray-300 mt-[2px] uppercase tracking-wider">
      {label}
    </span>
  </motion.div>
);

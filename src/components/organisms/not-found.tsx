import { motion, Variants } from "framer-motion";
import { HeartOff, Home } from "lucide-react";

// Variantes do container
const containerVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.7,
      ease: "easeInOut",
      when: "beforeChildren",
      staggerChildren: 0.2, // agora funciona corretamente com Variants
    },
  },
};

// Variantes de itens internos
const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 100 },
  },
};

export default function NotFound() {
  return (
    <div className="relative w-full min-h-screen flex items-center justify-center p-4 md:p-8 overflow-hidden bg-gray-100">
      {/* Gradientes de fundo */}
      <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-red-50/70 to-gray-100 blur-3xl opacity-70"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-t from-pink-100/70 to-gray-100 blur-3xl opacity-50"></div>

      <motion.div
        className="relative z-10 text-center max-w-xl p-10 bg-white rounded-3xl shadow-2xl shadow-pink-200/50 border border-gray-200"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.p
          variants={itemVariants}
          className="text-9xl md:text-[150px] font-extrabold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-pink-500 mb-4 leading-none"
        >
          404
        </motion.p>

        <motion.div variants={itemVariants} className="mb-6 text-red-500">
          <HeartOff className="w-12 h-12 mx-auto stroke-2" />
        </motion.div>

        <motion.h1
          variants={itemVariants}
          className="text-4xl font-black text-gray-900 mb-3"
        >
          Página Não Encontrada
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="text-lg font-light text-gray-600 mb-10 max-w-sm mx-auto"
        >
          Ops! Parece que o amor não encontrou o caminho para esta página. O
          link pode estar quebrado ou a memória foi deletada.
        </motion.p>

        <motion.div variants={itemVariants}>
          <a
            href="/"
            className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-red-600 to-pink-600 text-white font-extrabold rounded-full text-lg shadow-xl shadow-red-300/50 hover:from-red-700 hover:to-pink-700 transition duration-300 transform hover:scale-[1.03]"
          >
            <Home className="w-5 h-5 mr-3" />
            Voltar ao Início
          </a>
        </motion.div>
      </motion.div>
    </div>
  );
}

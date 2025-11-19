"use client";

import { motion } from "framer-motion";
import {
  Sparkles,
  Heart,
  Anchor,
  Infinity,
  Eye,
  MessageSquare,
  Clock,
  LucideIcon,
} from "lucide-react";
import { useRouter } from "next/navigation";

import { Variants } from "framer-motion";

const pageVariants: Variants = {
  hidden: { opacity: 0, scale: 0.98 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 1,
      ease: "easeOut",
      when: "beforeChildren",
      staggerChildren: 0.2,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 20 },
  },
};

interface DetailedTopicProps {
  icon: LucideIcon;
  title: string;
  content: string;
  quote: string;
  color: string;
}

const DetailedTopic = ({
  icon: Icon,
  title,
  content,
  quote,
  color,
}: DetailedTopicProps) => (
  <motion.div variants={itemVariants} className="mb-12">
    <h3
      className={`text-3xl md:text-4xl font-extrabold mb-4 flex items-center text-gray-900 border-b border-${color}-100 pb-2`}
    >
      <Icon className={`w-7 h-7 mr-3 text-${color}-500`} /> {title}
    </h3>
    <p className="text-xl text-gray-700 leading-relaxed mb-4">{content}</p>
    <blockquote
      className={`border-l-4 border-${color}-400 pl-4 py-2 italic text-gray-500`}
    >
      {quote}
    </blockquote>
  </motion.div>
);

export default function RelationshipDeepDive() {
  const router = useRouter();

  return (
    <motion.section
      className="relative w-full min-h-screen pt-20 pb-28 bg-white overflow-hidden"
      variants={pageVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Gradiente de Fundo Estilo "Foco Limpo" */}
      <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-pink-50/50 to-white opacity-80 blur-3xl"></div>

      <div className="container mx-auto px-6 lg:px-20 relative z-10 max-w-5xl">
        {/* --- HERO SECTION --- */}
        <motion.header
          variants={itemVariants}
          className="text-center mb-24 border-b border-pink-100 pb-12"
        >
          <p className="text-xl font-medium uppercase tracking-widest text-pink-500 mb-4">
            A Teoria da Conexão Infinita
          </p>
          <h1 className="text-7xl md:text-9xl font-black tracking-tighter mb-4 leading-none">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-600 via-red-500 to-purple-600">
              O EL O.
            </span>
          </h1>
          <h2 className="text-4xl font-light text-gray-800 italic max-w-3xl mx-auto">
            A Refacção de Si Mesmo em Nome de Um Amor Maior.
          </h2>
        </motion.header>

        {/* --- Seção 1: O Relacionamento Como Espelho --- */}
        <motion.div
          variants={itemVariants}
          className="mb-20 p-10 bg-white border border-pink-200 rounded-3xl shadow-3xl shadow-pink-200/50 hover:shadow-pink-300/60 transition-all duration-500"
        >
          <h3 className="text-4xl font-extrabold mb-5 flex items-center text-gray-900">
            <Eye className="w-8 h-8 mr-4 text-pink-500" /> O Grande Espelho
          </h3>
          <p className="text-2xl text-gray-700 leading-snug mb-6">
            O seu parceiro é o seu **laboratório mais brutal e honesto**. Ele
            não reflete apenas o amor, mas as suas sombras mais profundas. **O
            relacionamento não é a causa dos seus problemas; é a manifestação
            visível da sua vida interna não resolvida.** Se você quer
            transformar o relacionamento, precisa primeiro revolucionar quem
            você é.
          </p>
          <blockquote className="border-l-4 border-rose-400 pl-6 py-3 text-lg italic text-gray-500 font-medium">
            "Não buscamos um amor perfeito. Buscamos um amor que nos force a
            refazer nosso próprio mapa interno."
          </blockquote>
        </motion.div>

        {/* --- Seção 2: Os 5 Pilares Profundos --- */}
        <div className="mb-20">
          <h2 className="text-5xl font-black mb-10 text-center text-gray-900 tracking-tight">
            A Arquitetura da Permanência
          </h2>

          <DetailedTopic
            icon={MessageSquare}
            title="A Verdade da Comunicação (O Risco Máximo)"
            content="Comunicação não é falar; é garantir que a intenção por trás da palavra seja recebida. A maioria dos casais apenas debate estratégias de defesa. Para ser foda, você precisa trocar o desejo de estar certo pelo desejo de ser compreendido, mesmo que isso te deixe exposto."
            quote="“A ausência de conflito não é paz. É anestesia. Onde não há atrito, não há crescimento.”"
            color="blue"
          />

          <DetailedTopic
            icon={Heart}
            title="A Vulnerabilidade Radical (A Entrega Total)"
            content="É o ato de abrir mão do controle. A verdadeira intimidade só existe no espaço onde as armaduras caíram. Repensar a vida é entender que a força não está em se proteger, mas em desarmar-se diante de quem você escolheu para o seu campo de batalha e refúgio."
            quote="“Quem tem medo de se machucar já está vivendo machucado pela metade.”"
            color="pink"
          />

          <DetailedTopic
            icon={Sparkles}
            title="O Propósito e a Individualidade (A Dualidade Fértil)"
            content="Vocês olham na mesma direção, mas caminham em sapatos próprios. O Amor não é sobre se fundir em uma só pessoa, mas sobre ser o motor que impulsiona a jornada individual do outro. O relacionamento é o time, e o propósito de cada um é o seu papel no jogo."
            quote="“Você não é a minha outra metade. Você é o universo inteiro ao meu lado.”"
            color="purple"
          />

          <DetailedTopic
            icon={Clock}
            title="O Combate à Rotina (A Morte Lenta)"
            content="A rotina é o inimigo, não o tempo. A rotina é a ausência de intenção. Você precisa de rituais, não de hábitos vazios. O amor não é automático; é uma série de re-escolhas conscientes. Crie micro-aventuras, mude o ângulo, invista no 'novo' do parceiro que você já conhece."
            quote="“O tédio não é a falta de coisas para fazer, mas a falta de significado no que se faz.”"
            color="orange"
          />

          <DetailedTopic
            icon={Infinity}
            title="O Legado do Investimento (A Linguagem Silenciosa)"
            content="O tempo não é gasto, é investido. Relacionamento é a somatória de milhares de 'eus' do passado, 'nós' do presente e 'futuros potenciais'. O que você está construindo hoje é a fundação da sua memória de amanhã. O que você está sacrificando para honrar essa construção?"
            quote="“O Amor é o único investimento onde a perda do controle resulta no maior ganho.”"
            color="red"
          />
        </div>

        {/* --- Conclusão: Bloco de Ação --- */}
        <motion.div
          variants={itemVariants}
          className="p-12 text-center bg-gray-900 rounded-[2rem] shadow-3xl border-4 border-pink-500/50"
        >
          <h3 className="text-5xl font-extrabold mb-4 tracking-tight text-white">
            O Próximo Ato da Sua Vida.
          </h3>
          <p className="text-gray-300 text-xl italic mb-8 max-w-3xl mx-auto">
            Você pode escolher continuar vivendo o rascunho, ou tomar a caneta e
            reescrever o roteiro, começando por como você se relaciona consigo
            mesmo.
          </p>
          <motion.a
            whileHover={{
              scale: 1.05,
              boxShadow: "0 10px 30px rgba(236, 72, 153, 0.6)",
            }}
            whileTap={{ scale: 0.95 }}
            onClick={() => router.push("/create")}
            className="inline-flex items-center justify-center bg-gradient-to-r from-pink-500 to-red-600 text-white font-black text-xl px-10 py-4 rounded-full shadow-lg tracking-wider uppercase transition-all duration-300"
          >
            <Anchor className="w-5 h-5 mr-3" /> Defina Sua Âncora Agora
          </motion.a>
        </motion.div>
      </div>
    </motion.section>
  );
}

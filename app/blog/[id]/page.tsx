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
      {/* Background linear */}
      <div className="absolute top-0 left-0 w-full h-96 bg-linear-to-b from-pink-50/50 to-white opacity-80 blur-3xl"></div>

      <div className="container mx-auto px-6 lg:px-20 relative z-10 max-w-5xl">
        {/* --- HERO SECTION --- */}
        <motion.header
          variants={itemVariants}
          className="text-center mb-24 border-b border-pink-100 pb-12"
        >
          <p className="text-xl font-medium uppercase tracking-widest text-pink-500 mb-4">
            The Theory of Infinite Connection
          </p>
          <h1 className="text-7xl md:text-9xl font-black tracking-tighter mb-4 leading-none">
            <span className="bg-clip-text text-transparent bg-linear-to-r from-pink-600 via-red-500 to-purple-600">
              T H E L I N K.
            </span>
          </h1>
          <h2 className="text-4xl font-light text-gray-800 italic max-w-3xl mx-auto">
            The Reconstruction of Self in the Name of a Greater Love.
          </h2>
        </motion.header>

        {/* --- Section 1 --- */}
        <motion.div
          variants={itemVariants}
          className="mb-20 p-10 bg-white border border-pink-200 rounded-3xl shadow-3xl shadow-pink-200/50 hover:shadow-pink-300/60 transition-all duration-500"
        >
          <h3 className="text-4xl font-extrabold mb-5 flex items-center text-gray-900">
            <Eye className="w-8 h-8 mr-4 text-pink-500" /> The Great Mirror
          </h3>
          <p className="text-2xl text-gray-700 leading-snug mb-6">
            Your partner is your **most brutal and honest laboratory**. They
            don’t reflect only love, but your deepest shadows. **The
            relationship isn’t the cause of your problems; it is the visible
            manifestation of your unresolved inner life.** If you want to
            transform the relationship, you must first revolutionize who you
            are.
          </p>
          <blockquote className="border-l-4 border-rose-400 pl-6 py-3 text-lg italic text-gray-500 font-medium">
            "We don’t seek a perfect love. We seek a love that forces us to
            rebuild our internal map."
          </blockquote>
        </motion.div>

        {/* --- Section 2: Deep Pillars --- */}
        <div className="mb-20">
          <h2 className="text-5xl font-black mb-10 text-center text-gray-900 tracking-tight">
            The Architecture of Permanence
          </h2>

          <DetailedTopic
            icon={MessageSquare}
            title="The Truth of Communication (Maximum Risk)"
            content="Communication is not speaking; it’s ensuring the intention behind your words is truly received. Most couples only debate defense strategies. To be great, you must trade the desire to be right for the desire to be understood — even when it leaves you exposed."
            quote="“The absence of conflict isn't peace. It's anesthesia. Where there is no friction, there is no growth.”"
            color="blue"
          />

          <DetailedTopic
            icon={Heart}
            title="Radical Vulnerability (Total Surrender)"
            content="It is the act of letting go of control. True intimacy only exists where armor has fallen. Rethinking life is understanding that strength lies not in protecting yourself, but in disarming before the person you've chosen as both battlefield and refuge."
            quote="“Those who fear being hurt are already living half-hurt.”"
            color="pink"
          />

          <DetailedTopic
            icon={Sparkles}
            title="Purpose & Individuality (A Fertile Duality)"
            content="You look in the same direction, but walk in your own shoes. Love is not about merging into one, but being the engine that propels each other’s personal journey. The relationship is the team, and each person’s purpose is their role in the game."
            quote="“You are not my other half. You are the entire universe beside me.”"
            color="purple"
          />

          <DetailedTopic
            icon={Clock}
            title="The Fight Against Routine (Slow Death)"
            content="Routine is the enemy — not time. Routine is the absence of intention. You need rituals, not empty habits. Love isn’t automatic; it’s a series of conscious re-choices. Create micro-adventures, change the angle, invest in the ‘new’ inside the person you already know."
            quote="“Boredom is not the lack of things to do, but the lack of meaning in what we do.”"
            color="orange"
          />

          <DetailedTopic
            icon={Infinity}
            title="The Legacy of Investment (The Silent Language)"
            content="Time is not spent — it is invested. A relationship is the sum of thousands of past ‘me’s, present ‘us’, and future potentials. What you build today becomes the foundation of tomorrow’s memory. What are you sacrificing to honor this construction?"
            quote="“Love is the only investment where losing control yields the greatest gain.”"
            color="red"
          />
        </div>

        {/* --- Conclusion --- */}
        <motion.div
          variants={itemVariants}
          className="p-12 text-center bg-gray-900 rounded-[2rem] shadow-3xl border-4 border-pink-500/50"
        >
          <h3 className="text-5xl font-extrabold mb-4 tracking-tight text-white">
            The Next Act of Your Life.
          </h3>
          <p className="text-gray-300 text-xl italic mb-8 max-w-3xl mx-auto">
            You can choose to keep living the draft — or pick up the pen and
            rewrite the script, starting with how you relate to yourself.
          </p>
          <motion.a
            whileHover={{
              scale: 1.05,
              boxShadow: "0 10px 30px rgba(236, 72, 153, 0.6)",
            }}
            whileTap={{ scale: 0.95 }}
            onClick={() => router.push("/create")}
            className="inline-flex items-center cursor-pointer justify-center bg-linear-to-r from-pink-500 to-red-600 text-white font-black text-xl px-10 py-4 rounded-full shadow-lg tracking-wider uppercase transition-all duration-300"
          >
            <Anchor className="w-5 h-5 mr-3" /> Set Your Anchor Now
          </motion.a>
        </motion.div>
      </div>
    </motion.section>
  );
}

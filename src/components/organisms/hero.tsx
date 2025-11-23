"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { sendGAEvent } from "@next/third-parties/google";
import { Heart, Play } from "lucide-react";

// Laptop Content
const LaptopContent = () => (
  <div className="relative w-full h-full p-3 md:p-4">
    <div className="relative w-full h-full rounded-lg overflow-hidden">
      <Image
        src="/mockups/laptop-preview.jpg"
        alt="Preview da Memória no Laptop"
        fill
        className="object-cover object-center"
        quality={80}
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />

      <div className="absolute bottom-4 left-4 right-4 text-white">
        <p className="text-[10px] font-light opacity-70">
          2 anos, 4 meses, 23 dias, 10 horas e 58 minutos
        </p>
        <h4 className="text-sm font-semibold mt-1 opacity-90">
          I have loved you for...
        </h4>
        <button className="mt-2 bg-white/10 backdrop-blur-md border border-white/10 text-white text-[10px] font-medium px-3 py-1 rounded-md hover:bg-white/20 transition-all">
          Ver a memória
        </button>
      </div>
    </div>
  </div>
);

export const Hero = () => {
  const router = useRouter();
  const totalMemories = "45.000";

  const handleNavigate = () => {
    router.push("/create");
    sendGAEvent("event", "create_memory_button_click", {
      location: "hero_section",
    });
  };

  return (
    <section className="relative w-full min-h-screen bg-[#050505] text-white flex flex-col overflow-hidden">
      {/* BG smooth */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0c0c0c] via-[#050505] to-black" />

      {/* Vision Pro Glow */}
      <div className="absolute right-1/2 top-[30%] w-[600px] h-[600px] rounded-full bg-[#8a6bff]/10 blur-[180px]" />
      <div className="absolute left-[10%] top-[10%] w-[300px] h-[400px] bg-[#5fd4ff]/10 blur-[140px]" />

      {/* Banner */}
      <div
        className="w-full py-2 text-center text-sm 
  bg-gradient-to-r from-[#EF0040] via-[#FF2A6F] to-[#FF6A8C]
  text-white font-semibold tracking-wide
  shadow-lg shadow-[#ef0040]/20
  border-b border-white/10
  backdrop-blur-md
  z-50
"
      >
        🔥 Black Friday: 20% OFF em todos os planos!
      </div>

      {/* Header */}
      <header className="w-full flex items-center justify-between px-6 md:px-12 lg:px-20 pt-4 z-40 max-w-[1400px] mx-auto">
        <div className="flex items-center gap-3">
          {/* <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#3fa9ff] to-[#9b5cff]" /> */}
          <Image
            src="/logo.png"
            alt="Estelars Logo"
            width={38}
            height={38}
            className="rounded-full"
          />
          <span className="text-lg font-semibold">Estelars</span>
        </div>
        <a className="text-white/60 hover:text-white transition-colors text-xs font-medium">
          Galeria de Memórias
        </a>
      </header>

      {/* MAIN */}
      <div className="flex flex-1 flex-col lg:flex-row items-center justify-center max-w-6xl mx-auto w-full px-6 lg:px-12 relative z-30 gap-10 lg:gap-20 pb-14">
        {/* LEFT TEXT */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="flex-1 text-center lg:text-left max-w-xl mt-10 lg:mt-0"
        >
          <h1 className="text-[2.5rem] md:text-[3.2rem] font-bold leading-tight tracking-tight">
            Dê algo
            <span className="inline-block mx-2 relative -top-1">
              <Heart className="w-7 h-7 fill-[#ff4bb2] text-[#ff4bb2]" />
            </span>
            que faz o coração
            <br />
            <span className="bg-gradient-to-r from-[#67d6ff] to-[#9b5cff] bg-clip-text text-transparent">
              bater mais forte.
            </span>
          </h1>

          <p className="text-gray-300 mt-5 text-[15px] leading-relaxed max-w-md mx-auto lg:mx-0">
            Memórias únicas criadas em minutos — simples, emocionantes e
            perfeitas para surpreender quem você ama.
          </p>

          {/* CTA */}
          <div className="mt-8 flex flex-col items-center lg:items-start gap-3">
            <div className="flex gap-3 md:flex-row flex-col">
              <button
                onClick={handleNavigate}
                className="bg-gradient-to-r cursor-pointer flex  items-center gap-3 from-[#3fa9ff] to-[#9b5cff] px-8 py-3 rounded-xl font-semibold text-base hover:scale-[1.03] transition-all shadow-lg"
              >
                <Play size={12} />
                Crie sua memória
              </button>

              <button
                onClick={() => router.push("/blog")}
                className="px-8 py-3 cursor-pointer rounded-xl border border-white/15 bg-white/5 backdrop-blur-md text-white text-base hover:bg-white/10 transition-all"
              >
                Conheça nosso blog
              </button>
            </div>

            <span className="text-xs text-white/60 mt-1">
              20% de desconto! - Black Friday!
            </span>
          </div>

          {/* Avatares */}
          <div className="mt-6 flex flex-col items-center lg:items-start">
            <div className="mt-6 flex flex-col items-center lg:items-start">
              <div className="flex justify-center lg:justify-start">
                {[1, 2, 3, 4, 5, 6].map((i, idx) => (
                  <div
                    key={i}
                    className={`
          relative w-[38px] h-[38px] rounded-full overflow-hidden border-2 border-black
          ${idx !== 0 ? "-ml-3" : ""}
        `}
                  >
                    <Image
                      src={`/avatar${i}.png`}
                      alt={`Avatar ${i}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>

            <p className="text-gray-300 mt-2 text-xs text-center lg:text-left">
              <span className="font-semibold text-white mr-1">
                {totalMemories}
              </span>
              memórias eternizadas
            </p>
          </div>
        </motion.div>

        {/* RIGHT — MOCKUPS */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="relative w-full lg:w-1/2 flex justify-center h-[500px] lg:h-[600px] mt-8 lg:mt-0"
        >
          {/* Laptop — Mobile (Modelo A) */}
          <div className="absolute top-[58%] left-1/2 -translate-x-1/2 w-[230px] h-[150px] blur-[2px] opacity-70 md:hidden">
            <div className="relative w-full h-full bg-[#111]/70 backdrop-blur-xl rounded-xl border border-white/5 scale-90">
              <div className="absolute inset-[10px] bg-black rounded-md overflow-hidden">
                <LaptopContent />
              </div>
            </div>
          </div>

          {/* Laptop Desktop */}
          <div className="absolute right-0 bottom-16 hidden lg:block w-[440px] h-[300px] opacity-85 translate-x-[80px] rotate-[-4deg]">
            <div className="relative w-full h-full bg-[#111]/80 backdrop-blur-xl rounded-xl border border-white/5">
              <div className="absolute inset-[18px] bg-black rounded-md overflow-hidden shadow-inner">
                <LaptopContent />
              </div>
            </div>
          </div>

          {/* Phone */}
          <div className="relative w-[250px] h-[520px] md:w-[300px] md:h-[620px] z-20 drop-shadow-[0_30px_50px_rgba(0,0,0,0.7)]">
            <div className="relative w-full h-full bg-black rounded-[45px] shadow-xl p-[10px] border border-gray-700/40">
              <div className="absolute top-0 left-0 w-full h-full rounded-[45px] border border-gray-600/20 pointer-events-none">
                <div className="absolute top-[10px] left-1/2 -translate-x-1/2 w-[110px] h-[22px] bg-black rounded-b-xl" />
              </div>

              {/* FIX AQUI → garantir min-h antes do fill */}
              <div className="w-full h-full overflow-hidden rounded-[35px] relative min-h-[400px]">
                <Image
                  src="/mobile.png"
                  alt="Conteúdo do Celular"
                  fill
                  sizes="(max-width: 768px) 250px, 300px"
                  priority
                  className="object-cover pointer-events-none select-none"
                />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

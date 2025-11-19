"use client";

import { useState } from "react";
import { couples } from "@/src/mocks/couples";
import { FaInstagram, FaReddit, FaTiktok } from "react-icons/fa";
import { CoupleCard } from "../couple-card";
import { useRouter } from "next/navigation";
import { sendGAEvent } from "@next/third-parties/google";

export const Hero = ({
  setBgImage,
}: {
  setBgImage?: (img: string) => void;
}) => {
  const [hoveredCouple, setHoveredCouple] = useState<any>(null);

  const router = useRouter();

  const handleNavigate = () => {
    router.push("/create");
    sendGAEvent("event", "buttonClicked", { value: "create" });
  };

  return (
    <div className="relative w-full min-h-screen flex flex-col justify-center px-6 md:px-12 lg:px-16 pt-4">
      {/* LAYOUT */}
      <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-center">
        {/* LEFT COLUMN */}
        <div className="flex-1 w-full">
          <div className="mb-6 text-center lg:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 drop-shadow-lg tracking-tight">
              Estelars
            </h1>

            <p className="text-base md:text-lg max-w-xl text-gray-200 mb-8 leading-relaxed mx-auto lg:mx-0">
              Transforme o amor de vocês em algo visível e eterno. Crie um
              contador personalizado que celebra cada momento juntos — do
              primeiro encontro até hoje.
            </p>

            <div className="flex justify-center lg:justify-start gap-4">
              <button
                onClick={() => handleNavigate()}
                className="bg-red-600 cursor-pointer hover:bg-red-700 text-white px-6 md:px-8 py-3 rounded-md font-semibold transition-all"
              >
                ▶ Quero criar minha história
              </button>
              <button
                onClick={() => router.push("/blog")}
                className="bg-white/20 hover:bg-white/30 text-white px-6 md:px-8 py-3 rounded-md font-semibold transition-all"
              >
                Conheça nosso blog
              </button>
            </div>
          </div>

          {/* Featured Couples */}
          <h2 className="text-3xl font-bold mt-8 text-gray-200 tracking-wide mb-4 text-center lg:text-left">
            Casais Destaque ✨
          </h2>

          <div className="flex gap-4 md:gap-6 overflow-x-auto scrollbar-none pb-4">
            {couples.map((couple) => (
              <CoupleCard
                key={couple.title}
                title={couple.title}
                image={couple.image}
                bg={couple.bg}
                setBgImage={setBgImage || (() => {})}
                onMouseEnter={() => setHoveredCouple(couple)}
                onMouseLeave={() => setHoveredCouple(null)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* SOCIAL SECTION */}
      <div className="mt-12 w-full flex flex-col sm:flex-row justify-between items-center text-gray-300 gap-6 sm:gap-0">
        {/* ICONS */}
        <div className="flex gap-6">
          <FaTiktok size={32} className="hover:text-white transition-colors" />
          <FaInstagram
            size={32}
            className="hover:text-pink-400 transition-colors"
          />
          <FaReddit
            size={32}
            className="hover:text-orange-400 transition-colors"
          />
        </div>

        {/* COUNTER */}
        <div className="text-center sm:text-right">
          <p className="text-xs md:text-sm uppercase tracking-widest text-gray-400">
            Mais de
          </p>
          <p className="text-xl md:text-2xl font-bold text-white">
            1.312 histórias de amor criadas 💫
          </p>
        </div>
      </div>
    </div>
  );
};

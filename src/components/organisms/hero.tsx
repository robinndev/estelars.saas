"use client";
import { couples } from "@/src/mocks/couples";
import { FaInstagram, FaReddit, FaTiktok } from "react-icons/fa";
import { CoupleCard } from "../couple-card";

export const Hero = ({ setBgImage }: { setBgImage: (img: string) => void }) => {
  return (
    <div className="relative w-screen h-screen flex flex-col justify-center px-16">
      <div className="mb-12">
        <h1 className="text-6xl font-extrabold mb-4 drop-shadow-lg tracking-tight">
          Estelars
        </h1>
        <p className="text-lg max-w-xl text-gray-200 mb-8 leading-relaxed">
          Transforme o amor de vocês em algo visível e eterno. Crie um contador
          personalizado que celebra cada momento juntos — do primeiro encontro
          até hoje.
        </p>

        <div className="flex gap-4">
          <button className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-md font-semibold transition-all">
            ▶ Quero criar minha história
          </button>
          <button className="bg-white/20 hover:bg-white/30 text-white px-8 py-3 rounded-md font-semibold transition-all">
            Mais informações
          </button>
        </div>
      </div>

      <div className="flex gap-6 overflow-x-auto scrollbar-none pb-4">
        {couples.map((couple) => (
          <CoupleCard
            key={couple.title}
            title={couple.title}
            image={couple.image}
            bg={couple.bg}
            setBgImage={setBgImage}
          />
        ))}
      </div>

      <div className="mt-10 w-full flex justify-between items-center text-gray-300">
        <div className="flex gap-6">
          <FaTiktok size={36} className="hover:text-white transition-colors" />
          <FaInstagram
            size={36}
            className="hover:text-pink-400 transition-colors"
          />
          <FaReddit
            size={36}
            className="hover:text-orange-400 transition-colors"
          />
        </div>

        <div className="text-right">
          <p className="text-sm uppercase tracking-widest text-gray-400">
            Mais de
          </p>
          <p className="text-2xl font-bold text-white">
            12.000 histórias de amor criadas 💫
          </p>
        </div>
      </div>
    </div>
  );
};

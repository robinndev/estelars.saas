"use client";

import { Faq } from "@/src/components/organisms/faq";
import { Footer } from "@/src/components/organisms/footer";
import { Hero } from "@/src/components/organisms/hero";
import HowToMake from "@/src/components/organisms/how-make";
import { Price } from "@/src/components/organisms/price";
import { QrSection } from "@/src/components/organisms/qr";
import { useState } from "react";

export default function Home() {
  const [bgImage, setBgImage] = useState("/hero.png");

  return (
    <div className="relative min-h-screen text-white">
      <div className="fixed inset-0 -z-10">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat blur-md scale-105 transition-all duration-700 ease-in-out"
          style={{ backgroundImage: `url(${bgImage})` }}
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/60 to-transparent" />
        <div className="absolute inset-0 bg-linear-to-r from-black/80 via-black/60 to-transparent" />
      </div>

      <main className="relative z-10">
        <Hero setBgImage={setBgImage} />
        <HowToMake />
        <Price />
        <Faq />
        <QrSection />
        <Footer />
      </main>
    </div>
  );
}

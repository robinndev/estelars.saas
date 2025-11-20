"use client";

import { useState, useEffect } from "react";
import { ChevronUp, ChevronDown } from "lucide-react";
import Image from "next/image";
import { LANGUAGES } from "@/src/mocks/languages";
import type { Language } from "@/src/@types/language";

export function LanguageSwitcher() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState(LANGUAGES[0]);

  // 👉 Carrega idioma salvo no cookie ao iniciar
  useEffect(() => {
    const cookie = document.cookie
      .split("; ")
      .find((c) => c.startsWith("NEXT_LOCALE="));

    if (cookie) {
      const locale = cookie.split("=")[1];
      const found = LANGUAGES.find((l) => l.code === locale);
      if (found) setSelectedLang(found);
    }
  }, []);

  const toggleOpen = () => setIsOpen(!isOpen);

  const handleSelectLanguage = (lang: Language) => {
    console.log(`Idioma selecionado: ${lang.name} (${lang.code})`);

    // 👉 salva o cookie
    document.cookie = `NEXT_LOCALE=${lang.code}; path=/; max-age=31536000`;

    setSelectedLang(lang);
    setIsOpen(false);

    // 👉 recarrega para aplicar tradução
    window.location.reload();
  };

  const availableLanguages = LANGUAGES.filter(
    (lang) => lang.code !== selectedLang.code
  );

  const optionSize = "w-10 h-10";
  const mainSize = "w-14 h-14";

  const FlagCircle = ({ lang, size }: { lang: Language; size: string }) => (
    <div
      className={`${size} rounded-full overflow-hidden flex items-center justify-center relative shadow-md bg-gray-100`}
      title={lang.name}
    >
      <Image
        src={lang.imagePath}
        alt={`Bandeira do ${lang.name}`}
        fill
        sizes={size}
        className="object-cover"
        priority={lang.code === selectedLang.code}
      />
    </div>
  );

  return (
    <div className="fixed bottom-8 right-8 z-50 flex flex-col items-center">
      <div
        className={`
          flex flex-col-reverse items-center space-y-3 space-y-reverse
          transition-all duration-300 ease-out
          ${
            isOpen
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10 pointer-events-none"
          }
        `}
      >
        {availableLanguages.map((lang, index) => (
          <button
            key={lang.code}
            onClick={() => handleSelectLanguage(lang)}
            className={`
              ${optionSize} rounded-full transition-transform duration-200 cursor-pointer
              transform hover:scale-110 focus:outline-none
              delay-${(availableLanguages.length - index) * 50}
            `}
            title={`Mudar para ${lang.name}`}
          >
            <FlagCircle lang={lang} size={optionSize} />
          </button>
        ))}
      </div>

      <button
        onClick={toggleOpen}
        className={`
          mt-3 ${mainSize} rounded-full shadow-2xl relative
          transform transition-transform duration-200 hover:scale-105
          focus:outline-none focus:ring-4 focus:ring-blue-500/50
          cursor-pointer
        `}
        aria-expanded={isOpen}
        aria-label={`Mudar idioma, idioma atual: ${selectedLang.name}`}
      >
        <FlagCircle lang={selectedLang} size={mainSize} />

        <div className="absolute top-0 right-0 p-1 rounded-full bg-black/30 text-white/90 z-10">
          {isOpen ? <ChevronDown size={14} /> : <ChevronUp size={14} />}
        </div>
      </button>
    </div>
  );
}

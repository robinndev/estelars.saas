"use client";

import { useState } from "react";
// Importe os ícones se estiver usando 'lucide-react'
import { ChevronUp, ChevronDown } from "lucide-react";
// Importe o componente Image do Next.js (recomendado)
import Image from "next/image";

// Definição dos tipos para os idiomas
interface Language {
  code: string;
  imagePath: string; // Caminho para a imagem da bandeira (ex: /public/portuguese.png)
  name: string;
}

// Lista de idiomas disponíveis
// ⚠️ ATENÇÃO: Verifique se os caminhos das suas imagens estão corretos.
// Assumimos que elas estão na pasta 'public'.
const LANGUAGES: Language[] = [
  { code: "pt-BR", imagePath: "/portuguese.png", name: "Português" },
  { code: "en-US", imagePath: "/english.png", name: "English" },
  // Adicione mais idiomas e seus caminhos de imagem aqui
  { code: "es-ES", imagePath: "/spanish.png", name: "Español" },
  { code: "fr-FR", imagePath: "/french.png", name: "Français" },
];

export function LanguageSwitcher() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState(LANGUAGES[0]);

  const toggleOpen = () => setIsOpen(!isOpen);

  const handleSelectLanguage = (lang: Language) => {
    // ⚠️ TODO: Implemente a lógica real de mudança de idioma aqui.
    console.log(`Idioma selecionado: ${lang.name} (${lang.code})`);

    setSelectedLang(lang);
    setIsOpen(false);
  };

  const availableLanguages = LANGUAGES.filter(
    (lang) => lang.code !== selectedLang.code
  );

  // Tamanhos dos botões
  const optionSize = "w-10 h-10";
  const mainSize = "w-14 h-14";

  /**
   * Componente auxiliar para renderizar a imagem da bandeira dentro de um círculo.
   */
  const FlagCircle = ({ lang, size }: { lang: Language; size: string }) => (
    <div
      // overflow-hidden garante que a imagem seja cortada no formato arredondado
      className={`${size} rounded-full overflow-hidden flex items-center justify-center relative shadow-md bg-gray-100`}
      title={lang.name}
    >
      <Image
        src={lang.imagePath}
        alt={`Bandeira do ${lang.name}`}
        // 'fill' e 'object-cover' fazem a imagem preencher o div e ser cortada
        fill
        sizes={size}
        className="object-cover"
        priority={lang.code === selectedLang.code}
      />
    </div>
  );

  return (
    // 'fixed bottom-8 right-8' para a posição no canto inferior direito.
    // 'items-center' garante que as bolinhas menores fiquem centralizadas horizontalmente com a bolinha principal.
    <div className="fixed bottom-8 right-8 z-50 flex flex-col items-center">
      {/* Opções de Idioma (As "bolinhas subindo") */}
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
              // Adiciona um pequeno atraso para o efeito de "bolinhas subindo"
              delay-${(availableLanguages.length - index) * 50}
            `}
            title={`Mudar para ${lang.name}`}
          >
            <FlagCircle lang={lang} size={optionSize} />
          </button>
        ))}
      </div>

      {/* Botão Principal */}
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

        {/* Ícone de seta para indicar o estado (aberto/fechado) */}
        <div className="absolute top-0 right-0 p-1 rounded-full bg-black/30 text-white/90 z-10">
          {isOpen ? <ChevronDown size={14} /> : <ChevronUp size={14} />}
        </div>
      </button>
    </div>
  );
}

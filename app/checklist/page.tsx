"use client";

import { motion } from "framer-motion";
import { Check, Heart, Loader2, Anchor } from "lucide-react";
import React, { useState, useEffect, useMemo, useCallback, FC } from "react";

const STORAGE_KEY = "coupleChecklistStatus";

// Tipos -----------------------------------------------------------------------

export type CheckedItems = Record<string, boolean>;

interface ScoreCardProps {
  completedCount: number;
  totalItems: number;
  renderFooterMessage: () => string;
}

type ToggleItemFn = (index: number) => void;

// Dados -----------------------------------------------------------------------

const CHECKLIST_ITEMS: string[] = [
  "Trocar cartas de amor",
  "Jantar à luz de velas",
  "Sair com looks combinando",
  "Fazer uma tattoo juntos",
  "Chorar por ter brigado",
  "Fazer trilha juntos",
  "Dormir de conchinha",
  "Ter um animal de estimação",
  "Viajar para outro estado",
  "Viajar para outro país",
  "Piquenique juntos",
  "Jogar videogame juntos",
  "Maratona de filmes",
  "Maratona de série",
  "Guerra de travesseiro",
  "Cozinhar juntos",
  "Participar de um karaokê",
  "Dia na praia",
  "Acampar juntos",
  "Assistir ao pôr do sol",
  "Cultivar uma plantinha",
  "Viajar de trem",
  "Parque de diversões",
  "Massagem",
  "Rir até chorar",
  "Fazer amor no carro",
  "Fazer amor na piscina",
  "Comer sushi",
  "Guerra de cócegas",
  "Declaração na madrugada",
  "Ir no circo",
  "Presentear com flores",
  "Mergulhar no mar",
  "Ir ao boliche",
  "Ir a um show",
  "Comemorar aniversário de namoro",
  "Ir em um restaurante chique",
  "Ir no dogão da esquina",
  "Ir a um evento esportivo",
  "Ficar bêbados juntos",
  "Café da manhã na cama",
  "Tomar banho juntos",
  "Dançar juntos",
  "Tomar banho de chuva",
  "Passar uma noite em um hotel de luxo",
  "Fazer um álbum de fotos de casal",
  "Hospedar em um chalé nas montanhas",
  "Fazer um churrasco juntos",
  "Viajar de avião",
  "Visita ao zoológico",
  "Visita a um museu",
  "Ir a uma peça de teatro",
  "Tomar sorvete juntos",
  "Ter um dia de spa caseiro",
  "Já lemos um livro juntos",
  "Beijamos por mais de 1 hora",
  "Mandamos nudes",
  "Encontro romântico surpresa",
  "Fazer um passeio de balão",
  "Dormir em uma rede juntos",
  "Andar de pedalinho em um lago",
  "Vídeo juntos no Tiktok",
  "Passar um dia inteiro na cama",
  "Passar um dia sem celular juntos",
  "Viajar de carro sem destino definido",
  "Criar uma tradição de casal",
  "Contar histórias assustadoras à noite",
  "Passar o Natal juntos",
  "Andar de bicicleta juntos",
  "Pintar ou desenhar juntos",
  "Fazer maquiagem no(a) outro(a)",
  "Fazer uma playlist do casal",
  "Contamos estrelas juntos",
  "Presente surpresa",
  "Criamos nossa página de relacionamento Estelars",
];

// Utils -----------------------------------------------------------------------

const loadFromLocalStorage = (): CheckedItems => {
  if (typeof window === "undefined") return {};
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? (JSON.parse(stored) as CheckedItems) : {};
  } catch {
    return {};
  }
};

const saveToLocalStorage = (items: CheckedItems): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch {}
};

// Componentes -----------------------------------------------------------------

const ScoreCardContent: FC<ScoreCardProps> = ({
  completedCount,
  totalItems,
  renderFooterMessage,
}) => (
  <div className="p-8 bg-white rounded-3xl shadow-2xl border-t-8 border-red-500">
    <h3 className="text-4xl font-black mb-4 text-gray-900 flex items-center">
      <Heart className="w-8 h-8 mr-3 text-red-500 fill-red-500" /> Pontuação
    </h3>

    <div className="text-7xl font-extrabold mb-2">
      <span className="bg-clip-text text-transparent bg-linear-to-r from-pink-500 to-red-600">
        {completedCount}
      </span>
      <span className="text-gray-400 text-5xl">/{totalItems}</span>
    </div>

    <div className="w-full bg-gray-200 rounded-full h-3.5 mb-6">
      <motion.div
        className="h-3.5 rounded-full bg-linear-to-r from-pink-400 to-red-500"
        initial={{ width: 0 }}
        animate={{ width: `${(completedCount / totalItems) * 100}%` }}
        transition={{ duration: 1.0 }}
      />
    </div>

    <p className="text-xl italic text-gray-700 leading-relaxed">
      {renderFooterMessage()}
    </p>

    <div className="mt-6 pt-4 border-t border-gray-100">
      <p className="text-sm font-medium text-gray-500">
        O progresso é salvo automaticamente no seu navegador.
      </p>
    </div>
  </div>
);

// Página ----------------------------------------------------------------------

export default function ChecklistPage() {
  const [checkedItems, setCheckedItems] = useState<CheckedItems>({});
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    setCheckedItems(loadFromLocalStorage());
    setIsLoading(false);
  }, []);

  const totalItems = CHECKLIST_ITEMS.length;

  const completedCount = useMemo(
    () => Object.values(checkedItems).filter(Boolean).length,
    [checkedItems]
  );

  const toggleItem: ToggleItemFn = useCallback(
    (index) => {
      if (isLoading) return;

      setCheckedItems((prev) => {
        const key = String(index);
        const updated: CheckedItems = {
          ...prev,
          [key]: !prev[key],
        };

        saveToLocalStorage(updated);
        return updated;
      });
    },
    [isLoading]
  );

  const renderFooterMessage = (): string => {
    if (completedCount === totalItems)
      return "🎉 Missão Cumprida! Vocês são um casal lendário.";
    if (completedCount >= totalItems * 0.75) return "🔥 Quase lá! Reta final!";
    if (completedCount >= totalItems * 0.5) return "✨ Meio caminho andado!";
    return "🫢 Bora viver mais momentos juntos!";
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <Loader2 className="w-12 h-12 text-pink-500 animate-spin mb-4" />
        <p className="text-xl text-gray-700">
          Carregando a jornada do casal...
        </p>
      </div>
    );
  }

  const DESKTOP_SCORE_CARD_WIDTH = "350px";
  const DESKTOP_CONTAINER_PADDING = "80px";

  return (
    <motion.section
      className="relative w-full min-h-screen pt-16 pb-32 bg-gray-50 overflow-hidden"
      initial="hidden"
      animate="visible"
    >
      <div className="absolute top-0 left-0 w-full h-96 bg-linear-to-b from-rose-100/50 to-gray-50 blur-3xl opacity-60" />

      <div className="container mx-auto px-4 lg:px-20 relative z-10 max-w-7xl">
        <motion.header className="text-center mb-16">
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-4 leading-none">
            <span className="bg-clip-text text-transparent bg-linear-to-r from-pink-600 via-red-500 to-purple-600">
              A Lista Épica.
            </span>
          </h1>
          <h2 className="text-2xl font-light text-gray-800 italic max-w-3xl mx-auto">
            75 Desafios para Refazer o Roteiro do Seu Amor.
          </h2>
        </motion.header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-3xl font-extrabold text-gray-900 mb-6 border-b border-pink-200 pb-2 flex items-center">
              <Anchor className="w-6 h-6 mr-3 text-red-500" /> Desafios para
              Viver
            </h3>

            {CHECKLIST_ITEMS.map((item, index) => {
              const key = String(index);
              const isChecked = !!checkedItems[key];

              return (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.01, x: 5 }}
                  className={`flex items-center p-4 rounded-xl cursor-pointer transition-all duration-200 ${
                    isChecked
                      ? "bg-pink-50 border border-pink-300 shadow-md"
                      : "bg-white border border-gray-200 hover:bg-gray-100"
                  }`}
                  onClick={() => toggleItem(index)}
                >
                  <div
                    className={`w-8 h-8 flex items-center justify-center rounded-full border-2 mr-4 transition-all duration-300 ${
                      isChecked
                        ? "bg-pink-500 border-pink-500"
                        : "border-gray-400 bg-white"
                    }`}
                  >
                    {isChecked && <Check className="w-5 h-5 text-white" />}
                  </div>

                  <p
                    className={`flex-1 text-lg font-medium ${
                      isChecked
                        ? "text-gray-900 line-through opacity-70 italic"
                        : "text-gray-800"
                    }`}
                  >
                    {item}
                  </p>
                </motion.div>
              );
            })}
          </div>

          <div className="hidden lg:block lg:col-span-1 h-fit">
            <div style={{ height: "390px" }} />
          </div>
        </div>
      </div>

      <div
        className="hidden lg:block fixed top-20 z-20"
        style={{
          width: DESKTOP_SCORE_CARD_WIDTH,
          right: DESKTOP_CONTAINER_PADDING,
        }}
      >
        <ScoreCardContent
          completedCount={completedCount}
          totalItems={totalItems}
          renderFooterMessage={renderFooterMessage}
        />
      </div>

      <div className="lg:hidden fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-pink-200 shadow-2xl z-20">
        <div className="flex items-center justify-between">
          <p className="text-xl font-medium text-gray-700">Pontuação Atual:</p>
          <div className="text-3xl font-extrabold">
            <span className="bg-clip-text text-transparent bg-linear-to-r from-pink-500 to-red-600">
              {completedCount}
            </span>
            <span className="text-gray-400 text-2xl">/{totalItems}</span>
          </div>
        </div>
      </div>
    </motion.section>
  );
}

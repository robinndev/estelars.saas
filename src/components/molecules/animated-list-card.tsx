"use client";

import { AnimatedList } from "@/components/ui/animated-list";
import { cn } from "@/lib/utils";

interface Item {
  name: string;
  description: string;
  icon: string;
  color: string;
  time: string;
}

let notifications = [
  {
    name: "Lembrei de você! 🥰💌", // Mais curto
    description: "Não resisti, precisava te enviar um carinho.",
    time: "1m ago",
    icon: "💖",
    color: "#FF69B4", // Rosa Choque (Coração)
  },
  {
    name: "Beijo virtual! 😘💞", // Mais curto
    description: "Sinta meu abraço mesmo de longe.",
    time: "2m ago",
    icon: "💋",
    color: "#FF1493", // Rosa Forte (Beijo)
  },
  {
    name: "Coração sorrindo! 🫶❤️", // Mais curto
    description: "Só passando para te lembrar o quanto te amo.",
    time: "3m ago",
    icon: "✨", // Brilho
    color: "#FFD700", // Dourado (Brilho)
  },
  {
    name: "Presentinho! 🎁💖", // Mais curto
    description: "Porque você merece todo o amor do mundo.",
    time: "4m ago",
    icon: "🎀", // Laço
    color: "#FFC0CB", // Rosa Bebê (Laço)
  },
  {
    name: "Saudades! 😢💌", // Mais curto
    description: "Queria te abraçar agora mesmo.",
    time: "5m ago",
    icon: "🫂",
    color: "#8A2BE2", // Azul Violeta (Abraço)
  },
  {
    name: "Meu sonho acordado 🧸", // Mais curto
    description: "Obrigada(o) por tornar meus dias especiais.",
    time: "6m ago",
    icon: "🧸", // Ursinho
    color: "#FFA07A", // Salmão Claro (Ursinho)
  },
  {
    name: "Coração acelerado! 💓🥰", // Mais curto
    description: "Cada pensamento seu me deixa feliz.",
    time: "7m ago",
    icon: "🌷", // Tulipa
    color: "#FF6347", // Tomate (Tulipa)
  },
  {
    name: "Doçura do mundo 🍬💖", // Mais curto
    description: "Você é meu doce favorito.",
    time: "8m ago",
    icon: "😇", // Anjinho
    color: "#00CED1", // Azul Turquesa (Anjinho)
  },
  {
    name: "Raio de sol! ☀️❤️", // Mais curto
    description: "Ilumina meu mundo mesmo nos dias nublados.",
    time: "10m ago",
    icon: "☀️",
    color: "#FFA500", // Laranja (Sol)
  },
];

// notifications = Array.from({ length: 10 }, () => notifications).flat();

const Notification = ({ name, description, icon, color, time }: Item) => {
  return (
    <figure
      className={cn(
        "relative mx-auto min-h-fit w-full max-w-[400px] cursor-pointer overflow-hidden rounded-2xl p-4",
        "transition-all duration-200 ease-in-out hover:scale-[103%]",
        "bg-white shadow-[0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]"
      )}
    >
      <div className="flex flex-row items-center gap-3">
        <div
          className="flex h-10 w-10 items-center justify-center rounded-2xl"
          style={{
            backgroundColor: color,
          }}
        >
          <span className="text-lg">{icon}</span>
        </div>
        <div className="flex flex-col overflow-hidden items-start">
          <figcaption className="flex flex-row items-center text-lg font-medium whitespace-pre text-black">
            <span className="text-sm sm:text-lg">{name}</span>
            <span className="mx-1">·</span>
            <span className="text-xs text-gray-500">{time}</span>
          </figcaption>
          <p className="text-sm font-normal text-gray-700">{description}</p>
        </div>
      </div>
    </figure>
  );
};

export function AnimatedListCard({
  className,
  setIndex,
}: {
  className?: string;
  setIndex: (index: number) => void;
}) {
  return (
    <div
      className={cn(
        "relative flex h-[500px] w-full flex-col overflow-hidden p-2",
        className
      )}
    >
      <AnimatedList setIndexOut={setIndex}>
        {notifications.map((item, idx) => (
          <Notification {...item} key={idx} />
        ))}
      </AnimatedList>

      {/* Gradient no final para suavizar saída da lista */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-white/90 to-transparent"></div>
    </div>
  );
}

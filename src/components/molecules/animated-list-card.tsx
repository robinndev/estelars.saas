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
    name: "Você recebeu um presente! 🎁💖",
    description: "Alguém pensou em você hoje",
    time: "1m ago",
    icon: "💝",
    color: "#FF4081",
  },
  {
    name: "Sim, é sério! ✨💫",
    description: "Não é brincadeira, é especial",
    time: "2m ago",
    icon: "🌟",
    color: "#FFD700",
  },
  {
    name: "Vi uma estrela e lembrei de você 🌠",
    description: "Seu brilho veio à minha mente",
    time: "3m ago",
    icon: "🌌",
    color: "#6A5ACD",
  },
  {
    name: "Borboletas no meu coração 🦋💌",
    description: "Sempre que penso em você",
    time: "4m ago",
    icon: "💖",
    color: "#FF6B6B",
  },
  {
    name: "Arco-íris depois da chuva 🌈💞",
    description: "Lembrando que coisas lindas existem",
    time: "5m ago",
    icon: "🌈",
    color: "#00C9A7",
  },
  {
    name: "Meu mundo sorriu hoje 😍✨",
    description: "Porque você passou pela minha mente",
    time: "6m ago",
    icon: "😇",
    color: "#FF3D71",
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
      <button>dasa</button>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-white/90 to-transparent"></div>
    </div>
  );
}

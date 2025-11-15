import type { TimeTogether } from "@/src/@types/preview";
import { useEffect, useState } from "react";
import { TimeCard } from "./time-card";

interface ICount {
  startDate: Date;
  value?: number; // valor inicial opcional
  color?: any;
}

export const Count = ({ startDate, color }: ICount) => {
  const [timeTogether, setTimeTogether] = useState<TimeTogether>({
    years: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  console.log(startDate);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!startDate || isNaN(startDate.getTime())) return;

      const now = new Date();
      const diff = now.getTime() - startDate.getTime(); // diferença em ms
      if (diff < 0) return; // evita negativo

      setTimeTogether({
        years: Math.floor(diff / (1000 * 60 * 60 * 24 * 365)),
        days: Math.floor((diff / (1000 * 60 * 60 * 24)) % 365),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [startDate]);

  const labels = ["anos", "dias", "horas", "minutos", "segundos"];
  const values = Object.values(timeTogether);

  return (
    <div className="text-center -mt-1 px-4">
      <div className="flex justify-center gap-2 mt-3">
        {labels.map((label, idx) => (
          <TimeCard
            color={color}
            key={label}
            label={label}
            value={values[idx]}
            isSeconds={label === "segundos"}
          />
        ))}
      </div>
    </div>
  );
};

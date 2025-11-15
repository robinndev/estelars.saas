import type { TimeTogether } from "@/src/@types/preview";
import { useEffect, useState } from "react";
import { TimeCard } from "./time-card";

interface ICount {
  startDate: Date;
  value: number;
}

export const Count = ({ startDate, value }: ICount) => {
  const [timeTogether, setTimeTogether] = useState<TimeTogether>({
    years: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const labels = ["anos", "dias", "horas", "minutos", "segundos"];
  const values = Object.values(timeTogether);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const diff = Math.max(0, now.getTime() - startDate.getTime());

      setTimeTogether({
        years: Math.floor(diff / (1000 * 60 * 60 * 24 * 365)),
        days: Math.floor((diff / (1000 * 60 * 60 * 24)) % 365),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="text-center -mt-1 px-4">
      <div className="flex justify-center gap-2 mt-3">
        {labels.map((label, idx) => (
          <TimeCard
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

"use client";

import { useState } from "react";
import { Clock, Minus, Plus } from "lucide-react";
import { motion } from "framer-motion";

import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

export function DarkTimePicker({
  value,
  onChange,
}: {
  value: string;
  onChange: (val: string) => void;
}) {
  const [internal, setInternal] = useState(value || "12:00");

  const update = (newVal: string) => {
    setInternal(newVal);
    onChange(newVal);
  };

  const add = (type: "h" | "m", amt: number) => {
    const [h, m] = internal.split(":").map(Number);

    let hh = h;
    let mm = m;

    if (type === "h") hh = (h + amt + 24) % 24;
    else mm = (m + amt + 60) % 60;

    const newVal = `${String(hh).padStart(2, "0")}:${String(mm).padStart(
      2,
      "0"
    )}`;
    update(newVal);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="
            w-full justify-start text-left font-normal rounded-xl
            bg-black/40 border-white/15 text-gray-200 
            hover:bg-black/30 hover:border-indigo-400
            backdrop-blur-md transition
            h-12
          "
        >
          <Clock className="mr-2 h-4 w-4 text-indigo-300" />
          {value ? (
            value
          ) : (
            <span className="text-gray-400">Selecionar hora</span>
          )}
        </Button>
      </PopoverTrigger>

      <PopoverContent
        side="bottom"
        className="
          p-6 w-64 rounded-2xl
          bg-black/70 border-white/10 backdrop-blur-2xl
          shadow-[0_0_25px_rgba(0,0,0,0.5)]
          text-white select-none
        "
      >
        <div className="flex flex-col items-center gap-5">
          {/* Relógio visual */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="
              w-28 h-28 rounded-full border-2 border-indigo-400/30 
              flex items-center justify-center relative
              shadow-[0_0_10px_rgba(99,102,241,0.5)]
            "
          >
            <Clock className="h-10 w-10 text-indigo-300/70" />
          </motion.div>

          {/* Controles */}
          <div className="flex items-center gap-6">
            {/* Horas */}
            <div className="flex flex-col items-center gap-2">
              <button
                onClick={() => add("h", 1)}
                className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 transition"
              >
                <Plus className="h-4 w-4 text-indigo-300" />
              </button>

              <div className="text-3xl font-semibold tracking-widest text-indigo-200">
                {internal.split(":")[0]}
              </div>

              <button
                onClick={() => add("h", -1)}
                className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 transition"
              >
                <Minus className="h-4 w-4 text-indigo-300" />
              </button>

              <span className="text-xs text-gray-400 mt-1">Horas</span>
            </div>

            {/* Divider */}
            <div className="text-3xl font-bold text-indigo-300">:</div>

            {/* Minutos */}
            <div className="flex flex-col items-center gap-2">
              <button
                onClick={() => add("m", 1)}
                className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 transition"
              >
                <Plus className="h-4 w-4 text-indigo-300" />
              </button>

              <div className="text-3xl font-semibold tracking-widest text-indigo-200">
                {internal.split(":")[1]}
              </div>

              <button
                onClick={() => add("m", -1)}
                className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 transition"
              >
                <Minus className="h-4 w-4 text-indigo-300" />
              </button>

              <span className="text-xs text-gray-400 mt-1">Minutos</span>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}

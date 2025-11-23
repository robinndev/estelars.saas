"use client";

import React, { useState, useEffect, useRef } from "react";
import { Clock, Minus, Plus } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

const formatNumber = (num: number) => String(num).padStart(2, "0");

interface TimePickerProps {
  value: string;
  onChange: (val: string) => void;
  onBlur?: () => void;
}

export function TimePicker({ value, onChange, onBlur }: TimePickerProps) {
  const t = useTranslations("TimePicker");

  const [internal, setInternal] = useState(value || "12:00");
  const [open, setOpen] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setInternal(value || "12:00");
  }, [value]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(event.target as Node)
      ) {
        if (open) {
          setOpen(false);
          if (onBlur) onBlur();
        }
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open, onBlur]);

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

    const newVal = `${formatNumber(hh)}:${formatNumber(mm)}`;
    update(newVal);
  };

  const handleTriggerClick = () => {
    const willOpen = !open;
    setOpen(willOpen);
    if (!willOpen && onBlur) onBlur();
  };

  const [hours, minutes] = internal.split(":");

  return (
    <div ref={popoverRef} className="relative z-50">
      {/* Trigger */}
      <button
        onClick={handleTriggerClick}
        aria-label={t("open_timepicker")}
        className="
          w-full h-12 px-4 flex items-center justify-start text-left cursor-pointer font-normal rounded-lg
          bg-white border border-gray-300 text-gray-900 
          hover:bg-gray-50 hover:border-violet-500
          focus:border-violet-600 focus:ring-2 focus:ring-violet-200
          transition-all outline-none
        "
      >
        <Clock className="mr-2 h-4 w-4 text-violet-500" />

        {value ? (
          value
        ) : (
          <span className="text-gray-500">{t("placeholder")}</span>
        )}
      </button>

      {open && (
        <div
          className="
            absolute mt-2 p-6 w-64 rounded-lg left-1/2 -translate-x-1/2
            bg-white border border-gray-200 
            text-gray-900 select-none
          "
        >
          <div className="flex flex-col items-center gap-5">
            {/* Clock visual */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="
                w-28 h-28 rounded-full border-2 border-violet-500/30
                flex items-center justify-center relative
                shadow-[0_0_10px_rgba(166,132,255,0.4)]
                bg-gray-50
              "
            >
              <Clock className="h-10 w-10 text-violet-500/70" />
            </motion.div>

            {/* Controls */}
            <div className="flex items-center gap-6">
              {/* Hours */}
              <div className="flex flex-col items-center gap-2">
                <button
                  onClick={() => add("h", 1)}
                  className="p-1.5 rounded-lg bg-gray-100 hover:bg-violet-100 transition focus:ring-2 focus:ring-violet-200"
                >
                  <Plus className="h-4 w-4 text-violet-500" />
                </button>

                <div className="text-3xl font-semibold tracking-widest text-violet-600">
                  {hours}
                </div>

                <button
                  onClick={() => add("h", -1)}
                  className="p-1.5 rounded-lg bg-gray-100 hover:bg-violet-100 transition focus:ring-2 focus:ring-violet-200"
                >
                  <Minus className="h-4 w-4 text-violet-500" />
                </button>

                <span className="text-xs text-gray-500 mt-1">{t("hours")}</span>
              </div>

              <div className="text-3xl font-bold text-violet-500">:</div>

              {/* Minutes */}
              <div className="flex flex-col items-center gap-2">
                <button
                  onClick={() => add("m", 1)}
                  className="p-1.5 rounded-lg bg-gray-100 hover:bg-violet-100 transition focus:ring-2 focus:ring-violet-200"
                >
                  <Plus className="h-4 w-4 text-violet-500" />
                </button>

                <div className="text-3xl font-semibold tracking-widest text-violet-600">
                  {minutes}
                </div>

                <button
                  onClick={() => add("m", -1)}
                  className="p-1.5 rounded-lg bg-gray-100 hover:bg-violet-100 transition focus:ring-2 focus:ring-violet-200"
                >
                  <Minus className="h-4 w-4 text-violet-500" />
                </button>

                <span className="text-xs text-gray-500 mt-1">
                  {t("minutes")}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

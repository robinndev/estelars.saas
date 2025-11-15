"use client";

import { useState } from "react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";

export function DarkDatePicker({
  value,
  onChange,
  onBlur,
}: {
  value: Date | undefined | string;
  onChange: (date: string) => void;
  onBlur?: () => void;
}) {
  const [open, setOpen] = useState(false);

  const handleOpenChange = (isOpen: boolean) => {
    // Se fechou sem selecionar nada, dispara onBlur
    if (!isOpen && onBlur) {
      onBlur();
    }
    setOpen(isOpen);
  };

  return (
    <Popover open={open} onOpenChange={handleOpenChange}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="
            w-full h-12 px-4
            justify-start text-left font-normal
            rounded-xl text-base
            bg-black/40 border border-white/20 text-gray-200
            hover:bg-black/30 hover:border-indigo-400
            transition-all
          "
        >
          <CalendarIcon className="mr-2 h-5 w-5 text-indigo-300" />
          {value ? (
            format(
              typeof value === "string" ? new Date(value) : value,
              "dd/MM/yyyy"
            )
          ) : (
            <span className="text-gray-400">Selecionar data</span>
          )}
        </Button>
      </PopoverTrigger>

      <PopoverContent
        align="start"
        className="
          p-2 rounded-xl bg-black/80 border border-white/20 
          backdrop-blur-xl text-white
        "
      >
        <Calendar
          mode="single"
          selected={typeof value === "string" ? new Date(value) : value}
          onSelect={(date) => {
            if (!date) return;
            onChange(date.toISOString());
            setOpen(false); // fecha popover ao escolher
          }}
          className="rounded-xl"
        />
      </PopoverContent>
    </Popover>
  );
}

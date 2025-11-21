"use client";

import { useState } from "react";
import { format } from "date-fns";
import { useTranslations } from "next-intl";

import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";

const now = new Date();
const currentYear = now.getFullYear();

export function DatePicker({
  value,
  onChange,
  onBlur,
}: {
  value: Date | undefined | string;
  onChange: (date: string) => void;
  onBlur?: () => void;
}) {
  const [open, setOpen] = useState(false);

  const t = useTranslations("DatePicker");

  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen && onBlur) onBlur();
    setOpen(isOpen);
  };

  return (
    <Popover open={open} onOpenChange={handleOpenChange}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          aria-label={t("open_calendar")}
          className="
            w-full h-12 px-4
            justify-start text-left font-normal
            rounded-xl text-base
            bg-white border border-gray-300 text-gray-900 
            shadow-sm
            hover:bg-gray-50 hover:border-[#a684ff]
            focus:border-[#a684ff] focus:ring-2 focus:ring-[#a684ff]
            transition-all
          "
        >
          <CalendarIcon className="mr-2 h-5 w-5 text-[#a684ff]" />

          {value ? (
            format(
              typeof value === "string" ? new Date(value) : value,
              "dd/MM/yyyy"
            )
          ) : (
            <span className="text-gray-500">{t("placeholder")}</span>
          )}
        </Button>
      </PopoverTrigger>

      <PopoverContent
        align="start"
        className="
          p-2 rounded-xl
          bg-white border border-gray-200 shadow-xl 
          text-gray-900 
          w-auto
        "
      >
        <Calendar
          aria-label={t("calendar_label")}
          mode="single"
          selected={typeof value === "string" ? new Date(value) : value}
          onSelect={(date) => {
            if (!date) return;
            onChange(date.toISOString());
            setOpen(false);
          }}
          className="rounded-xl"
          captionLayout="dropdown"
          fromYear={currentYear - 100}
          toYear={currentYear + 10}
        />
      </PopoverContent>
    </Popover>
  );
}

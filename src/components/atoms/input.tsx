"use client";

import { InputCn } from "@/components/ui/input";

interface InputProps {
  label: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  onBlur?: () => void;
  disabled?: boolean;
}

export function Input({
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  onBlur,
  disabled = false,
}: InputProps) {
  return (
    <div className="space-y-1">
      <label className="block text-sm font-medium text-gray-700 tracking-wide">
        {label}
      </label>

      <InputCn
        disabled={disabled}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        onBlur={onBlur}
        className="
          w-full px-4 py-3
          h-12
          outline-none
          transition duration-200 ease-in-out
        "
      />
    </div>
  );
}

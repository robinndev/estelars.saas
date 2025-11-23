"use client";

import { TextareaCn } from "@/components/ui/textarea";

interface TextAreaProps {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  onBlur?: () => void;
}

export function TextArea({
  label,
  value,
  onChange,
  placeholder,
  onBlur,
}: TextAreaProps) {
  return (
    <div className="space-y-1">
      <label className="block text-sm font-medium text-gray-700 tracking-wide">
        {label}
      </label>

      <TextareaCn
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        className="
          w-full px-4 py-3
          h-24
          outline-none
          transition duration-200 ease-in-out
          resize-none
        "
      />
    </div>
  );
}

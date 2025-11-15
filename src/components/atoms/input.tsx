"use client";

interface InputProps {
  label: string;
  type?: string;
  value: string;
  onChange: (e: any) => void;
  placeholder?: string;
  onBlur?: () => void;
}

export function Input({
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  onBlur,
}: InputProps) {
  return (
    <div className="space-y-1">
      <label className="block text-gray-200 font-medium tracking-wide">
        {label}
      </label>

      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        onBlur={onBlur}
        className="
          w-full p-3 rounded-xl outline-none transition
          bg-white/5 backdrop-blur-xl
          border border-white/10
          text-gray-100 placeholder-gray-400
        
          focus:border-indigo-400
          focus:shadow-[0_0_15px_rgba(99,102,241,0.45)]
        "
      />
    </div>
  );
}

"use client";

interface TextAreaProps {
  label: string;
  value: string;
  onChange: (e: any) => void;
  placeholder?: string;
}

export function TextArea({
  label,
  value,
  onChange,
  placeholder,
}: TextAreaProps) {
  return (
    <div className="space-y-1">
      <label className="block text-gray-200 font-medium tracking-wide">
        {label}
      </label>

      <textarea
        placeholder={placeholder}
        rows={4}
        value={value}
        onChange={onChange}
        className="
          w-full p-3 rounded-xl outline-none transition
          bg-white/5 backdrop-blur-xl
          border border-white/10
          text-gray-100 placeholder-gray-400

          focus:border-indigo-400
          focus:shadow-[0_0_15px_rgba(99,102,241,0.45)]
          resize-none
        "
      />
    </div>
  );
}

"use client";

interface InputProps {
  label: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
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
      <label className="block text-sm font-medium text-gray-700 tracking-wide">
        {label}
      </label>

      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        onBlur={onBlur}
        className="
          w-full px-4 py-3 /* Padding para um look substancial */
          rounded-xl /* Arredondamento Apple (Maior) */
          outline-none
          transition duration-200 ease-in-out
          bg-white 
          border border-gray-300
          text-gray-900 text-base placeholder-gray-500
          shadow-sm
          hover:border-gray-400
          focus:border-red-600 /* Borda Vermelha Forte */
          focus:ring-2 focus:ring-red-200 /* Anel Vermelho Suave */
          focus:shadow-lg focus:shadow-red-100 /* Sombra Vermelha de Destaque */
        "
      />
    </div>
  );
}

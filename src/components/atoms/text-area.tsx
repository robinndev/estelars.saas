"use client";

interface TextAreaProps {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void; // Tipo correto para onChange em TextArea
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

      <textarea
        placeholder={placeholder}
        rows={4}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        className="
          w-full px-4 py-3 /* Padding consistente */
          rounded-xl /* Arredondamento Apple (Maior) */
          outline-none
          transition duration-200 ease-in-out
          resize-none /* Manter o redimensionamento desabilitado */
          bg-white 
          border border-gray-300
          text-gray-900 text-base placeholder-gray-500
          shadow-sm
          hover:border-gray-400
          focus:border-purple-600 /* Borda Vermelha Forte */
          focus:ring-2 focus:ring-purple-200 /* Anel Vermelho Suave */
          focus:shadow-lg focus:shadow-purple-100 /* Sombra Vermelha de Destaque */
        "
      />
    </div>
  );
}

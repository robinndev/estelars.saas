"use client";

export function FileInput({ onChange }: any) {
  return (
    <div>
      <label className="block mb-1 font-medium text-red-900">
        Anexar imagem
      </label>
      <input
        type="file"
        accept="image/*"
        onChange={onChange}
        className="w-full p-3 rounded-lg bg-white border border-red-900/30"
      />
    </div>
  );
}

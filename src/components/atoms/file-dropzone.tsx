"use client";

import { useState } from "react";
import { UploadCloud } from "lucide-react";
import { motion } from "framer-motion";

import {
  Dropzone,
  DropzoneContent,
  DropzoneEmptyState,
} from "../ui/shadcn-io/dropzone";

interface FileDropzoneProps {
  onChange: (files: File[]) => void;
}

export function FileDropzone({ onChange }: FileDropzoneProps) {
  const [previews, setPreviews] = useState<string[]>([]);

  const handleDrop = (files: File[]) => {
    onChange(files);

    const urls = files.map((f) => URL.createObjectURL(f));
    setPreviews(urls);
  };

  return (
    <div className="space-y-6">
      {/* DROPZONE */}
      <Dropzone
        accept={{ "image/*": [] }}
        maxFiles={10}
        maxSize={10 * 1024 * 1024}
        onDrop={handleDrop}
        onError={console.error}
        className="
          border border-white/10 rounded-2xl
          bg-gradient-to-br from-black/80 to-black/90
          backdrop-blur-xl
          transition
          hover:from-black hover:to-black hover:border-indigo-400
          shadow-[0_0_20px_rgba(0,0,0,0.4)]
          hover:shadow-[0_0_30px_rgba(0,0,0,0.55)]
          p-10 cursor-pointer
          flex items-center justify-center
        "
      >
        {/* Estado inicial */}
        {previews.length === 0 && (
          <DropzoneEmptyState className="text-center space-y-3 select-none">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
            >
              <UploadCloud className="text-indigo-300" />
            </motion.div>

            <p className="text-gray-200 font-semibold text-lg">
              Arraste arquivos aqui
            </p>

            <p className="text-gray-400 text-sm">
              ou <span className="text-indigo-300 font-medium">clique</span>{" "}
              para selecionar
            </p>

            <p className="text-gray-500 -mt-2 text-xs">
              Formatos aceitos: JPG, PNG, WEBP
            </p>
          </DropzoneEmptyState>
        )}

        {/* Área clicável real */}
        <DropzoneContent />
      </Dropzone>

      {/* PREVIEW */}
      {previews.length > 0 && (
        <motion.div layout className="grid grid-cols-2 sm:grid-cols-3 gap-5">
          {previews.map((src, i) => (
            <motion.div
              key={i}
              layout
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              className="
                rounded-xl overflow-hidden
                border border-white/20
                bg-black/80 backdrop-blur-lg
                shadow-lg hover:shadow-xl
                transition
              "
            >
              <img
                src={src}
                alt={`preview-${i}`}
                className="w-full h-40 object-cover"
              />
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import { UploadCloud, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import {
  Dropzone,
  DropzoneContent,
  DropzoneEmptyState,
} from "../ui/shadcn-io/dropzone";

interface FileDropzoneProps {
  onChange: (files: File[]) => void;
  selectedPlan: "normal" | "premium";
}

export function FileDropzone({ onChange, selectedPlan }: FileDropzoneProps) {
  const LIMIT = selectedPlan === "premium" ? 8 : 3;

  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);

  const isFull = files.length >= LIMIT;

  const updatePreviews = (f: File[]) => {
    const urls = f.map((file) => URL.createObjectURL(file));
    setPreviews(urls);
  };

  const handleDrop = (incomingFiles: File[]) => {
    if (isFull) return;

    const combined = [...files, ...incomingFiles];
    const limited = combined.slice(0, LIMIT);

    setFiles(limited);
    updatePreviews(limited);
    onChange(limited);
  };

  const removeFile = (index: number) => {
    const updated = files.filter((_, i) => i !== index);

    setFiles(updated);
    updatePreviews(updated);
    onChange(updated);
  };

  useEffect(() => {
    setFiles([]);
    setPreviews([]);
    onChange([]);
  }, [selectedPlan]);

  return (
    <div className="space-y-6">
      {/* DROPZONE */}
      <div className="relative">
        <Dropzone
          accept={{ "image/*": [] }}
          onDrop={handleDrop}
          disabled={isFull}
          maxFiles={LIMIT}
          maxSize={10 * 1024 * 1024}
          onError={console.error}
          className={`
            border border-white/10 rounded-2xl hover:bg-black
            bg-gradient-to-br from-black/80 to-black/90
            backdrop-blur-xl p-10
            flex flex-col items-center justify-center
            transition
            ${isFull ? "opacity-60" : "hover:border-purple-400 cursor-pointer"}
          `}
        >
          {/* 🔥 AQUI É O PULO DO GATO:
               a EmptyState aparece SEMPRE quando não há preview */}
          {files.length === 0 && (
            <DropzoneEmptyState className="text-center space-y-3 select-none">
              <motion.div
                initial={{ scale: 0.85, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
              >
                <UploadCloud className="text-purple-300" />
              </motion.div>

              <p className="text-gray-200 font-semibold text-lg">
                Arraste fotos aqui
              </p>

              <p className="text-gray-400 text-sm">
                ou <span className="text-purple-300 font-medium">clique</span>{" "}
                para selecionar
              </p>

              <p className="text-gray-500 -mt-2 text-xs">
                Até {LIMIT} fotos ({selectedPlan})
              </p>
            </DropzoneEmptyState>
          )}

          {/* mantém estrutura interna */}
          <DropzoneContent />

          {/* Quando há arquivos, mostra o texto do limite aqui também */}
          {files.length > 0 && !isFull && (
            <p className="text-gray-500 text-xs mt-4">
              Você pode enviar até {LIMIT} fotos
            </p>
          )}
        </Dropzone>

        {/* OVERLAY DO LIMITE */}
        {isFull && (
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm rounded-2xl flex items-center justify-center">
            <p className="text-purple-300 font-medium text-sm">
              Limite de {LIMIT} fotos atingido
            </p>
          </div>
        )}
      </div>

      {/* PREVIEWS */}
      {previews.length > 0 && (
        <motion.div layout className="grid grid-cols-2 sm:grid-cols-3 gap-5">
          <AnimatePresence>
            {previews.map((src, i) => (
              <motion.div
                key={src}
                layout
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.75 }}
                className="
                  group relative rounded-xl overflow-hidden
                  border border-white/10 bg-black/60 backdrop-blur-lg
                  shadow-md hover:shadow-xl transition
                "
              >
                <img
                  src={src}
                  className="w-full h-40 object-cover"
                  alt={`preview-${i}`}
                />

                <button
                  onClick={() => removeFile(i)}
                  className="
                    absolute top-2 right-2 bg-black/60 backdrop-blur-md
                    border border-white/20 p-1.5 rounded-lg
                    text-white opacity-0 group-hover:opacity-100 transition
                  "
                >
                  <X size={16} />
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import { UploadCloud, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";

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
  const t = useTranslations("FileDropzone");

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
            border border-gray-300 rounded-xl
            bg-gray-50 hover:bg-white
            p-10
            flex flex-col items-center justify-center
            transition
            ${
              isFull
                ? "opacity-60 cursor-not-allowed"
                : "hover:border-[#a684ff] cursor-pointer focus-within:ring-2 focus-within:ring-[#a684ff]"
            }
          `}
        >
          {/* Empty state */}
          {files.length === 0 && (
            <DropzoneEmptyState className="text-center space-y-3 select-none">
              <motion.div
                initial={{ scale: 0.85, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
              >
                <UploadCloud className="text-[#a684ff]" />
              </motion.div>

              <p className="text-gray-800 font-semibold text-lg">
                {t("empty_title")}
              </p>

              <p className="text-gray-600 text-sm">
                {t("empty_subtitle_rest")}{" "}
                <span className="text-[#a684ff] font-medium">
                  {t("empty_subtitle_click")}
                </span>{" "}
              </p>

              <p className="text-gray-500 -mt-2 text-xs">
                {t("empty_limit", {
                  limit: LIMIT,
                  plan: selectedPlan,
                })}
              </p>
            </DropzoneEmptyState>
          )}

          <DropzoneContent />

          {files.length > 0 && !isFull && (
            <p className="text-gray-500 text-xs mt-4">
              {t("can_upload_up_to", { limit: LIMIT })}
            </p>
          )}
        </Dropzone>

        {/* Overlay limite */}
        {isFull && (
          <div className="absolute inset-0 bg-white/70 backdrop-blur-sm rounded-xl flex items-center justify-center">
            <p className="text-[#a684ff] font-medium text-sm">
              {t("limit_reached", { limit: LIMIT })}
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
                  border border-gray-300 bg-white 
                  shadow-md hover:shadow-lg transition
                "
              >
                <img
                  src={src}
                  className="w-full h-40 object-cover"
                  alt={t("preview_alt", { index: i + 1 })}
                />

                <button
                  onClick={() => removeFile(i)}
                  className="
                    absolute top-2 right-2 bg-white/70 backdrop-blur-sm
                    border border-gray-300 p-1.5 rounded-lg
                    text-[#a684ff]
                    opacity-0 group-hover:opacity-100 transition
                    hover:bg-[#a684ff] hover:border-[#a684ff]
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

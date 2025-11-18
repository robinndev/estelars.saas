"use client";

import { generateStoryImage } from "@/utils/generate-stories";
import { QRCodeSVG } from "qrcode.react";
import { useRef } from "react";

export const StoriesComponent = ({
  photoUrl,
  coupleName,
  timeTogether,
  profileLink,
  message, // opcional
  themeColor = "#6366f1", // cor padrão (indigo-500)
}: {
  photoUrl: string;
  coupleName: string;
  timeTogether: string;
  profileLink: string;
  message?: string;
  themeColor?: string;
}) => {
  const qrRef = useRef<SVGSVGElement>(null);

  const handleDownload = async () => {
    const svg = qrRef.current;
    if (!svg) return;

    const svgData = new XMLSerializer().serializeToString(svg);
    const svgBlob = new Blob([svgData], { type: "image/svg+xml" });
    const url = URL.createObjectURL(svgBlob);

    await generateStoryImage({
      photoUrl,
      qrCodeUrl: url,
      title: timeTogether,
      subtitle: coupleName,
      message,
      themeColor,
    });

    URL.revokeObjectURL(url);
  };

  return (
    <div className="relative w-full max-w-sm mx-auto">
      {/* Preview estilosa */}
      <div className="relative h-[540px] rounded-xl overflow-hidden shadow-xl">
        <img
          src={photoUrl}
          alt="Story preview"
          className="w-full h-full object-cover"
        />

        {/* Gradient mais forte e maior */}
        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black/95 via-black/50 to-transparent"></div>

        {/* Conteúdo */}
        <div className="absolute bottom-6 left-5 text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]">
          <p className="text-xl font-bold mb-1">{coupleName}</p>
          <p className="text-sm opacity-90">{timeTogether}</p>

          {message && (
            <p className="text-xs mt-2 opacity-80 max-w-[85%]">{message}</p>
          )}
        </div>
      </div>

      {/* Botão com cor customizada */}
      <button
        onClick={handleDownload}
        style={{
          border: `2px solid ${themeColor}`,
          backgroundColor: themeColor + "22", // leve transparência
        }}
        className="mt-4 px-4 py-3 text-white rounded-xl shadow-lg hover:opacity-90 transition"
      >
        Baixar Story do Instagram
      </button>
    </div>
  );
};

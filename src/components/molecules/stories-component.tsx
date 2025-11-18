"use client";

import { generateStoryImage } from "@/utils/generate-stories";
import { QRCodeSVG } from "qrcode.react";
import { useRef } from "react";

export const StoriesComponent = ({
  photoUrl,
  coupleName,
  timeTogether,
  profileLink,
  message,
  themeColor = "#6366f1",
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
    console.log("Generating story image...");
    const svg = qrRef.current;
    if (!svg) return;

    // CONVERTE SVG → PNG (CORREÇÃO)
    const svgString = new XMLSerializer().serializeToString(svg);
    const svgBase64 =
      "data:image/svg+xml;base64," +
      btoa(unescape(encodeURIComponent(svgString)));

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = svgBase64;

    img.onload = async () => {
      const tempCanvas = document.createElement("canvas");
      tempCanvas.width = img.width;
      tempCanvas.height = img.height;
      const ctx = tempCanvas.getContext("2d")!;
      ctx.drawImage(img, 0, 0);

      const pngUrl = tempCanvas.toDataURL("image/png");

      // AGORA FUNCIONA: passa PNG e não um blob que falha
      await generateStoryImage({
        photoUrl,
        qrCodeUrl: pngUrl,
        title: timeTogether,
        subtitle: coupleName,
        message,
        themeColor,
      });
    };
  };

  return (
    <div className="relative w-full max-w-sm mx-auto">
      <div className="relative h-[540px] rounded-xl overflow-hidden shadow-xl">
        <img
          src={photoUrl}
          alt="Story preview"
          className="w-full h-full object-cover"
        />

        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black/95 via-black/50 to-transparent"></div>

        <div className="absolute bottom-6 left-5 text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]">
          <p className="text-xl font-bold mb-1">{coupleName}</p>
          <p className="text-sm opacity-90">{timeTogether}</p>

          {message && (
            <p className="text-xs mt-2 opacity-80 max-w-[85%]">{message}</p>
          )}
        </div>
      </div>

      {/* QR escondido, mas renderizado */}
      <div className="hidden">
        <QRCodeSVG value={profileLink} size={256} ref={qrRef} />
      </div>

      <button
        onClick={handleDownload}
        style={{
          border: `2px solid ${themeColor}`,
          backgroundColor: themeColor + "22",
        }}
        className="mt-4 px-4 py-3 text-white rounded-xl shadow-lg hover:opacity-90 transition"
      >
        Baixar Story do Instagram
      </button>
    </div>
  );
};

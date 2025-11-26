"use client";

import { useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";
import { QRCodeCanvas } from "qrcode.react"; // Canvas para gerar PNG
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Loader2,
  Download,
  Sparkles,
  Heart,
  Link,
  ExternalLink,
} from "lucide-react";

interface Photo {
  id: string;
  url: string;
  file_id: string;
  site_id: string;
}

interface Site {
  id: string;
  couple_name: string;
  slug: string | null;
  start_date: string;
  start_hour: string;
  photos: Photo[];
  message?: string;
  color: string | null;
}

interface SiteResponse {
  message: string;
  site: Site;
}

const INITIAL_SITE_DATA: Site = {
  id: "loading-id",
  couple_name: "Carregando...",
  slug: null,
  start_date: new Date().toISOString(),
  start_hour: "00:00",
  photos: [],
  message: "",
  color: null,
};

export default function Page() {
  const params = useParams();
  const urlId = Array.isArray(params?.id) ? params.id[0] : params.id;

  const [siteData, setSiteData] = useState<Site | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const qrRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const getSiteUrl = (site: Site) => {
    if (site.slug) return `estelars.com/${site.slug}`;
    return `estelars.com/s/${site.id}`;
  };

  async function fetchSiteData(id: string) {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/get-site/${id}`, { method: "GET" });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || `HTTP ${res.status}`);
      }
      const response: SiteResponse = await res.json();
      setSiteData(response.site);
    } catch (err) {
      setError("Não encontrado. O link pode estar expirado ou incorreto.");
      setSiteData(INITIAL_SITE_DATA);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (urlId) fetchSiteData(urlId);
    if (containerRef.current) {
      containerRef.current.style.opacity = "0";
      setTimeout(() => {
        if (containerRef.current) containerRef.current.style.opacity = "1";
      }, 100);
    }
  }, [urlId]);

  const currentData = siteData || INITIAL_SITE_DATA;
  const finalSiteUrl = getSiteUrl(currentData);
  const primaryPhotoUrl = currentData.photos[0]?.url || null;

  // =========================
  // DOWNLOAD QR COMO PNG
  // =========================
  const downloadQRCode = () => {
    if (!qrRef.current) return;
    const canvas = qrRef.current;
    const link = document.createElement("a");
    link.download = `qr-estelars-${currentData.couple_name}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  // =========================
  // LOADING
  // =========================
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-950 flex justify-center items-center">
        <Loader2 className="w-8 h-8 text-purple-400 animate-spin" />
        <p className="ml-3 text-purple-400 font-medium">
          Carregando informações...
        </p>
      </div>
    );
  }

  // =========================
  // ERROR
  // =========================
  if (error) {
    return (
      <div className="min-h-screen bg-gray-950 flex flex-col justify-center items-center p-8 text-center">
        <Sparkles className="w-10 h-10 text-red-500 mb-4" />
        <h1 className="text-2xl font-bold text-white mb-2">Não encontrado</h1>
        <p className="text-gray-400 mb-6">{error}</p>
        <Button
          onClick={() => fetchSiteData(urlId!)}
          className="bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl"
        >
          Tentar novamente
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 relative overflow-hidden flex flex-col justify-center items-center py-16 lg:py-0">
      {/* Grid de QR + Info */}
      <div
        ref={containerRef}
        className="relative z-10 w-full max-w-5xl mx-auto px-6 lg:px-8 transition-opacity duration-1000"
      >
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* QR + Botões */}
          <div className="flex flex-col items-center">
            <Card className="p-6 bg-white/5 border border-white/10 rounded-[2rem] shadow-xl w-full max-w-md">
              {/* QR com overlay e estrela */}
              <div className="relative bg-black/50 p-6 rounded-2xl shadow-lg flex justify-center">
                <div className="relative bg-black/10 p-6 rounded-2xl shadow-lg flex justify-center">
                  <QRCodeCanvas
                    ref={qrRef}
                    value={`https://${finalSiteUrl}`}
                    size={220}
                    bgColor="transparent"
                    fgColor="#000"
                    level="H"
                    includeMargin={false}
                  />
                  {/* Estrela central */}
                  <div className="absolute w-10 h-10 flex justify-center items-center top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                    <span className="text-yellow-400 text-2xl">★</span>
                  </div>
                </div>
                {/* Estrela central */}
                <div className="absolute w-10 h-10 flex justify-center items-center top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                  <span className="text-yellow-400 text-2xl">★</span>
                </div>
              </div>

              {/* Botões */}
              <div className="mt-6 flex flex-col gap-3">
                <Button
                  onClick={downloadQRCode}
                  className="w-full bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl cursor-pointer"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Baixar QR Code
                </Button>

                <a href={`https://${finalSiteUrl}`} target="_blank">
                  <Button className="w-full bg-white/10 hover:bg-white/20 text-white rounded-xl cursor-pointer">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Abrir Página do Casal
                  </Button>
                </a>
              </div>

              <p className="text-xs mt-4 text-gray-400 flex items-center justify-center gap-1 truncate">
                <Link className="w-3 h-3" />
                {finalSiteUrl}
              </p>
            </Card>

            <p className="mt-6 text-sm text-gray-400 flex items-center gap-2">
              Criado com amor pela
              <Heart className="w-4 h-4 text-pink-500 fill-pink-500 animate-pulse" />
              Estelars
            </p>
          </div>

          {/* Info */}
          <div className="text-white space-y-8">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/20 border border-indigo-500/40">
                <Sparkles className="w-5 h-5 text-indigo-400" />
                <span className="text-base font-medium text-indigo-400">
                  QR Code do seu universo
                </span>
              </div>

              <h1 className="mt-6 text-5xl font-extrabold leading-tight text-center lg:text-left">
                Baixe o QR do casal
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400">
                  {currentData.couple_name}
                </span>
              </h1>

              <p className="text-lg text-gray-400 mt-4 max-w-md">
                Use esse QR Code para compartilhar o universo de vocês de forma
                rápida e linda. Ideal para enviar, postar ou colocar em um
                cartão especial. 💜
              </p>
            </div>

            {/* Foto ajustada */}
            {primaryPhotoUrl && (
              <img
                src={primaryPhotoUrl}
                className="w-full max-h-[400px] rounded-2xl object-cover shadow-xl border border-white/10"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

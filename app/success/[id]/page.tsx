"use client";

import { QRCodeSVG } from "qrcode.react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Download,
  ExternalLink,
  Heart,
  Sparkles,
  Loader2,
  Link,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";
import { StoriesComponent } from "@/src/components/molecules/stories-component";
import { calculateTimeTogether } from "@/utils/counting-time-together";
import { ScrollIndicator } from "@/src/components/atoms/scroll-indicator";
import { DesktopMemoryComponent } from "@/src/components/molecules/desktop-memory-component";
import { useTranslations } from "next-intl";

const NEON_PURPLE = "#a855f7";
const NEON_INDIGO = "#6366f1";

// Tipagem
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

const Index = () => {
  const t = useTranslations("SuccessPage");

  const params = useParams();
  const urlId = Array.isArray(params?.id) ? params.id[0] : params.id;

  const [siteData, setSiteData] = useState<Site | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);

  const getSiteUrl = (site: Site) => {
    if (site.slug) return `estelars.com/${site.slug}`;
    return `estelars.com/s/${site.id}`;
  };

  const fetchSiteData = async (id: string) => {
    if (!id) {
      setIsLoading(false);
      setError("ID não informado");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch(`/api/get-site/${id}`, {
        method: "GET",
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || `HTTP ${res.status}`);
      }

      const response: SiteResponse = await res.json();
      setSiteData(response.site);
    } catch (err) {
      setError(t("error_description"));
      setSiteData(INITIAL_SITE_DATA);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (urlId) fetchSiteData(urlId);
    else {
      setError("ID necessário");
      setIsLoading(false);
    }

    if (containerRef.current) {
      containerRef.current.style.opacity = "0";
      setTimeout(() => {
        if (containerRef.current) {
          containerRef.current.style.opacity = "1";
        }
      }, 100);
    }
  }, [urlId]);

  const formatDate = (dateString: string) => {
    const d = new Date(dateString);
    return d.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  const currentData = siteData || INITIAL_SITE_DATA;
  const finalSiteUrl = getSiteUrl(currentData);
  const primaryPhotoUrl = currentData.photos[0]?.url || null;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-950 flex justify-center items-center">
        <Loader2 className="w-8 h-8 text-purple-400 animate-spin" />
        <p className="ml-3 text-purple-400 font-medium">
          {t("loading_fetching")} {currentData.couple_name}...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-950 flex flex-col justify-center items-center p-8 text-center">
        <Sparkles className="w-10 h-10 text-red-500 mb-4" />
        <h1 className="text-2xl font-bold text-white mb-2">
          {t("error_title")}
        </h1>
        <p className="text-gray-400 mb-6">{t("error_description")}</p>
        <Button
          onClick={() => fetchSiteData(urlId!)}
          className="bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl"
        >
          {t("error_button")}
        </Button>
      </div>
    );
  }

  const timeTogether = calculateTimeTogether(
    currentData.start_date,
    currentData.start_hour
  );

  return (
    <div className="min-h-screen bg-gray-950 relative overflow-hidden flex flex-col justify-center items-center py-16 lg:py-0 font-sans">
      <div
        className="absolute inset-0 opacity-100 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      <div
        ref={containerRef}
        className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-8 transition-opacity duration-1000"
      >
        <div className="grid lg:grid-cols-[1.2fr_1fr] gap-12 lg:gap-24 items-center mt-12">
          {/* RIGHT — IMAGE & QR */}
          <div className="flex flex-col items-center justify-center animate-scale-in order-1 lg:order-2">
            <Card className="w-full max-w-sm p-3 bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2rem] shadow-2xl">
              <div className="relative w-full aspect-[6/8] rounded-t-3xl overflow-hidden">
                {primaryPhotoUrl ? (
                  <img
                    src={primaryPhotoUrl}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-indigo-950/50 flex items-center justify-center text-gray-500 text-sm">
                    [Foto não enviada]
                  </div>
                )}
              </div>

              <div className="p-5 space-y-5 bg-white/10 rounded-b-3xl">
                <div className="flex items-center justify-between gap-4">
                  <div className="bg-white p-3 rounded-lg shadow-xl">
                    <QRCodeSVG value={`https://${finalSiteUrl}`} size={70} />
                  </div>

                  <a
                    href={`https://${finalSiteUrl}`}
                    target="_blank"
                    className="flex-1"
                  >
                    <Button className="w-full h-10 text-sm rounded-lg bg-indigo-600 text-white">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      {t("access_link")}
                    </Button>
                  </a>
                </div>

                <p className="text-xs text-gray-400 truncate flex items-center gap-1">
                  <Link className="w-3 h-3" />
                  {finalSiteUrl}
                </p>
              </div>
            </Card>

            <p className="mt-8 text-sm text-gray-400 flex items-center gap-2">
              {t("created_with_love")}
              <Heart className="w-4 h-4 text-pink-500 fill-pink-500 animate-pulse-slow" />
              Estelars
            </p>
          </div>

          {/* LEFT — INFO */}
          <div className="space-y-10 text-white order-2 lg:order-1">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/20 border border-indigo-500/40">
                <Sparkles className="w-5 h-5 text-indigo-400" />
                <span className="text-base font-medium text-indigo-400">
                  {t("status_badge")}
                </span>
              </div>

              <h1 className="text-5xl font-extrabold">
                {t("title_prefix")}
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400 mt-2">
                  {currentData.couple_name}
                </span>
              </h1>

              <p className="text-xl text-gray-400 max-w-lg">{t("subtitle")}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Card className="p-5 bg-white/5 border border-purple-400/20 rounded-xl">
                <p className="text-purple-400 text-xs uppercase tracking-widest mb-2">
                  {t("card_site_id")}
                </p>
                <p className="text-white text-base truncate">
                  {currentData.id}
                </p>
              </Card>

              <Card className="p-5 bg-white/5 border border-purple-400/20 rounded-xl">
                <p className="text-purple-400 text-xs uppercase tracking-widest mb-2">
                  {t("card_event_date")}
                </p>
                <p className="text-white text-base">
                  {formatDate(currentData.start_date)} às{" "}
                  {currentData.start_hour}
                </p>
              </Card>
            </div>

            <ScrollIndicator />
          </div>
        </div>
      </div>

      {/* DOWNLOADS */}
      <div className="relative z-10 w-full px-32 mt-24 pb-24">
        <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <Download className="w-5 h-5 text-indigo-400" />
          {t("downloads_title")}
        </h2>

        <div className="flex gap-6">
          <div className="w-1/3">
            <StoriesComponent
              photoUrl={primaryPhotoUrl || ""}
              coupleName={currentData.couple_name}
              timeTogether={`${timeTogether.years} anos, ${timeTogether.days} dias juntos`}
              profileLink={`https://${finalSiteUrl}`}
              message={currentData.message}
              themeColor={currentData.color || NEON_INDIGO}
            />
          </div>

          <div className="w-2/3 flex justify-center">
            <DesktopMemoryComponent
              photoUrl={primaryPhotoUrl || ""}
              coupleName={currentData.couple_name}
              message={currentData.message || ""}
              profileLink={`https://${finalSiteUrl}`}
              themeColor={currentData.color || NEON_INDIGO}
            />
          </div>
        </div>

        {!primaryPhotoUrl && (
          <p className="text-sm text-yellow-400 mt-2">
            {t("downloads_warning")}
          </p>
        )}
      </div>
    </div>
  );
};

export default Index;

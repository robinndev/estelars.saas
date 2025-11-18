"use client";

import { QRCodeSVG } from "qrcode.react";
import { Button } from "@/components/ui/button"; // Assumindo componente Shadcn/ui
import { Card } from "@/components/ui/card"; // Assumindo componente Shadcn/ui
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

// --- Configurações de Estilo ---
const NEON_PURPLE = "#a855f7"; // purple-500
const NEON_INDIGO = "#6366f1"; // indigo-500

// --- Tipagem de Dados (Refletindo a resposta da API) ---
interface Photo {
  id: string;
  url: string;
  file_id: string;
  site_id: string;
}

interface Site {
  id: string;
  couple_name: string;
  slug: string | null; // pode ser null
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

// Dados iniciais (fallback)
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

// --- Componente Principal ---
const Index = () => {
  const params = useParams();
  // O ID deve ser o parâmetro da URL que o seu `route.ts` espera (params.id)
  const urlId = Array.isArray(params?.id) ? params.id[0] : params.id;

  const [siteData, setSiteData] = useState<Site | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);

  // --- Funções de Lógica ---

  /**
   * Calcula a URL do site (Usando ID, pois slug está null no exemplo).
   */
  const getSiteUrl = (site: Site) => {
    // Opção 1: Usar o slug se ele existir
    if (site.slug) {
      return `estelars.com/${site.slug}`;
    }
    // Opção 2: Usar o ID como fallback
    return `estelars.com/s/${site.id}`;
  };

  /**
   * Busca os dados do site na API real.
   * @param id O ID (slug/id) do site a ser buscado.
   */
  const fetchSiteData = async (id: string) => {
    if (!id) {
      setIsLoading(false);
      setError("ID do site não fornecido na URL.");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Reativando a chamada de API real para sua rota
      const res = await fetch(`/api/get-site/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        // Tenta ler o erro do corpo da resposta, se possível
        const errorBody = await res.json().catch(() => ({}));
        const errorMessage =
          errorBody.error || `Falha ao buscar dados. Status: ${res.status}`;
        throw new Error(errorMessage);
      }

      const response: SiteResponse = await res.json();

      // Definindo o siteData com a estrutura correta de retorno
      setSiteData(response.site);
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : "Erro desconhecido ao carregar dados.";
      console.error("Erro no fetch da API:", errorMessage);
      setError(
        "Não foi possível carregar os dados. Verifique a conexão ou o ID do site."
      );
      setSiteData(INITIAL_SITE_DATA);
    } finally {
      setIsLoading(false);
    }
  };

  // Efeito principal para buscar dados e animação de entrada
  useEffect(() => {
    if (urlId) {
      fetchSiteData(urlId);
    } else {
      // Caso a página seja acessada sem o ID no URL
      setError("ID do site é necessário para buscar os dados.");
      setIsLoading(false);
    }

    // Animação de entrada suave
    if (containerRef.current) {
      containerRef.current.style.opacity = "0";
      setTimeout(() => {
        if (containerRef.current) {
          containerRef.current.style.opacity = "1";
        }
      }, 100);
    }
  }, [urlId]);

  // Função utilitária para formatar a data
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "Carregando...";
    return date.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  // Função para simular download
  const handleDownload = (
    format: "stories" | "wallpaper",
    imageUrl: string
  ) => {
    console.log(`Downloading ${format} from: ${imageUrl}`);
    // Lógica para iniciar o download (pode ser complexa, aqui é apenas um log/alerta)
    alert(`Preparando download da imagem em formato ${format}.`);
  };

  // --- Renderização Condicional ---
  const currentData = siteData || INITIAL_SITE_DATA;
  const finalSiteUrl = getSiteUrl(currentData);
  const primaryPhotoUrl = currentData.photos[0]?.url || null;

  console.log("Site Data:", primaryPhotoUrl);
  console.log("Final Site URL:", currentData);
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-950 flex justify-center items-center">
        <Loader2 className="w-8 h-8 text-purple-400 animate-spin" />
        <p className="ml-3 text-purple-400 font-medium">
          Buscando o universo de {currentData.couple_name}...
        </p>
      </div>
    );
  }

  if (error) {
    const slugToFetch = urlId || INITIAL_SITE_DATA.id;
    return (
      <div className="min-h-screen bg-gray-950 flex flex-col justify-center items-center p-8 text-center">
        <Sparkles className="w-10 h-10 text-red-500 mb-4" />
        <h1 className="text-2xl font-bold text-white mb-2">
          Ops! Erro Galáctico
        </h1>
        <p className="text-gray-400 mb-6">{error}</p>
        <Button
          onClick={() => fetchSiteData(slugToFetch)}
          className="bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl"
        >
          Tentar Recarregar
        </Button>
      </div>
    );
  }

  const timeTogether = calculateTimeTogether(
    currentData?.start_date,
    currentData?.start_hour
  );

  // --- Renderização Principal (Sucesso) ---

  return (
    <div className="min-h-screen bg-gray-950 relative overflow-hidden flex flex-col justify-center items-center py-16 lg:py-0 font-sans">
      {/* 🌌 Background Galáctico/Neon */}
      <div
        className="absolute inset-0 opacity-100 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            background: `
                            radial-gradient(circle at 15% 15%, ${NEON_INDIGO}20 1%, transparent 40%),
                            radial-gradient(circle at 85% 85%, ${NEON_PURPLE}20 1%, transparent 40%)
                        `,
          }}
        />
      </div>

      {/* Conteúdo Principal */}
      <div
        ref={containerRef}
        className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-8 transition-opacity duration-1000"
      >
        <div className="grid lg:grid-cols-[1.2fr_1fr] gap-12 lg:gap-24 items-center mt-12">
          {/* Direita - VISUALIZADOR DE IMAGEM & QR Code */}
          <div
            className="flex flex-col items-center justify-center animate-scale-in order-1 lg:order-2"
            style={{ animationDelay: "0.3s" }}
          >
            {/* Novo Card - Visualizador e QR Code juntos */}
            <Card className="w-full max-w-sm p-3 bg-white/5 backdrop-blur-xl border border-white/10 relative group rounded-[2rem] shadow-2xl shadow-purple-900/70 transition-all duration-500 hover:shadow-purple-700/50">
              {/* Efeito Neon Border Glow */}
              <div
                className="absolute inset-0 rounded-[2rem] pointer-events-none transition-all duration-500 group-hover:opacity-100"
                style={{
                  boxShadow: `0 0 50px 10px ${NEON_PURPLE}40 inset, 0 0 20px ${NEON_PURPLE}80`,
                  opacity: 0,
                }}
              />

              {/* Imagem de Fundo (Visualizador do Site) */}
              <div className="relative w-full aspect-[6/8] rounded-t-3xl overflow-hidden shadow-inner-dark">
                {primaryPhotoUrl ? (
                  // Se houver foto, use-a como capa do site
                  <img
                    src={primaryPhotoUrl}
                    alt={`Capa do site de ${currentData.couple_name}`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03] grayscale hover:grayscale-0"
                  />
                ) : (
                  // Fallback visual se não houver foto
                  <div className="w-full h-full bg-indigo-950/50 flex items-center justify-center text-gray-500 text-sm">
                    [Espaço para a Capa]
                  </div>
                )}
              </div>

              {/* Área do QR Code e Botão */}
              <div className="p-5 space-y-5 bg-white/10 rounded-b-3xl">
                {/* Linha QR Code e Link */}
                <div className="flex items-center justify-between gap-4">
                  {/* QR Code */}
                  <div className="bg-white p-3 rounded-lg shadow-xl ring-2 ring-white/10">
                    <QRCodeSVG
                      value={`https://${finalSiteUrl}`}
                      size={70}
                      level="L"
                      includeMargin={false}
                    />
                  </div>

                  {/* Link Direto */}
                  <a
                    href={`https://${finalSiteUrl}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1"
                  >
                    <Button
                      size="sm"
                      className="w-full h-10 text-sm font-semibold rounded-lg bg-indigo-600 text-white hover:bg-indigo-500 transition-all duration-300 group"
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Acessar o Link
                    </Button>
                  </a>
                </div>

                <div className="text-center">
                  <p className="text-xs text-gray-400 truncate flex items-center justify-center gap-1">
                    <Link className="w-3 h-3" />
                    {finalSiteUrl}
                  </p>
                </div>
              </div>
            </Card>

            {/* Footer */}
            <div
              className="mt-8 animate-fade-in"
              style={{ animationDelay: "0.5s" }}
            >
              <p className="text-sm text-gray-400 flex items-center gap-2">
                Criado com
                <Heart className="w-4 h-4 text-pink-500 fill-pink-500 animate-pulse-slow" />
                pela Estelars
              </p>
            </div>
          </div>

          {/* Esquerda - Info (Ajustado o tamanho do título para 5xl, como no seu segundo exemplo) */}
          <div className="space-y-10 animate-fade-in text-white order-2 lg:order-1 pt-12 lg:pt-0">
            {/* Título Principal */}
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/20 border border-indigo-500/40 shadow-xl shadow-indigo-500/10 transition-transform duration-300 hover:scale-[1.01]">
                <Sparkles className="w-5 h-5 text-indigo-400" />
                <span className="text-base font-medium text-indigo-400">
                  Site Publicado
                </span>
              </div>

              <h1 className="text-5xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
                O Espaço de
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400 mt-2 drop-shadow-xl shadow-purple-500/50">
                  {currentData.couple_name}
                </span>
              </h1>

              <p className="text-xl sm:text-2xl text-gray-400 max-w-lg">
                Seu universo digital exclusivo, agora online e pronto para
                compartilhar.
              </p>
            </div>
            {/* Cards de Info */}
            <div
              className="grid grid-cols-1 sm:grid-cols-2 gap-4"
              style={{ animationDelay: "0.1s" }}
            >
              {/* Cartão Casal */}
              <Card className="p-5 bg-white/5 border border-purple-400/20 shadow-xl shadow-purple-900/10 backdrop-blur-md transition-all duration-300 hover:border-purple-400/50 hover:bg-white/10 rounded-xl">
                <p className="text-purple-400 text-xs uppercase tracking-widest mb-2 font-semibold">
                  ID do Site
                </p>
                <p className="text-white font-extrabold text-base truncate">
                  {currentData.id}
                </p>
              </Card>

              {/* Cartão Início */}
              <Card className="p-5 bg-white/5 border border-purple-400/20 shadow-xl shadow-purple-900/10 backdrop-blur-md transition-all duration-300 hover:border-purple-400/50 hover:bg-white/10 rounded-xl">
                <p className="text-purple-400 text-xs uppercase tracking-widest mb-2 font-semibold">
                  Data do Evento
                </p>
                <p className="text-white font-extrabold text-base">
                  {formatDate(currentData.start_date)} às{" "}
                  {currentData.start_hour}
                </p>
              </Card>
            </div>
            {/* Scroll down indicator */}
            <ScrollIndicator />
          </div>
        </div>
      </div>
      {/* 🔽 Seção de Downloads — aparece ao rolar */}
      <div className="relative z-10 w-full px-32 mt-24  pb-24">
        <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <Download className="w-5 h-5 text-indigo-400" />
          Baixar imagens para divulgação
        </h2>

        <div className="flex gap-6">
          <div className="w-1/3">
            <StoriesComponent
              photoUrl={primaryPhotoUrl || ""}
              coupleName={currentData?.couple_name}
              timeTogether={`${timeTogether.years} anos, ${timeTogether.days} dias juntos`}
              profileLink={`https://${finalSiteUrl}`}
              message={currentData?.message}
              themeColor={currentData?.color || NEON_INDIGO}
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
            Atenção: Upload de foto necessário para habilitar downloads.
          </p>
        )}
      </div>
    </div>
  );
};

export default Index;

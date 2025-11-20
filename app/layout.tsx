import { getSEOTags } from "@/lib/seo";
import "./globals.css";
import { GoogleAnalytics } from "@next/third-parties/google";
import { NextIntlClientProvider } from "next-intl";

export const metadata = getSEOTags({
  appName: "Estelars",
  appDescription:
    "Estelars é onde momentos viram eternidade — uma plataforma para casais criarem seu pequeno universo com memórias, contadores, linha do tempo e experiências únicas.",
  keywords: [
    "Estelars",
    "Estelars app",
    "Estelars social media",
    "Estelars para casais",
    "Estelars moments",
    "Estelars memories",
    "Aplicativo para casais",
    "Rede social para casais",
    "Momentos especiais",
    "Linha do tempo de relacionamento",
    "Contador de namoro",
    "Construir memórias",
    "Compartilhar momentos",
    "Aplicativo romântico",
    "Plataforma de relacionamento",
    "Diário de casal",
    "Roteiros para casais",
    "Desafios de casal",
  ],
  appDomain: "https://estelars.com",
  canonicalUrlRelative: "/",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body className="antialiased bg-black text-white">
        <NextIntlClientProvider>{children}</NextIntlClientProvider>
      </body>
      <GoogleAnalytics gaId="G-FW66KYRCHY" />
    </html>
  );
}

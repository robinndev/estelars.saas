import "./globals.css";
import { GoogleAnalytics } from "@next/third-parties/google";

export const metadata = {
  title: "Estelars",
  description: "Sentimento estelar 💫",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body className="antialiased bg-black text-white">{children}</body>
      <GoogleAnalytics gaId="G-FW66KYRCHY" />
    </html>
  );
}

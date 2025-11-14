import "./globals.css";

export const metadata = {
  title: "Estelars",
  description: "Amor em forma de código 💫",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body className="antialiased bg-black text-white">{children}</body>
    </html>
  );
}

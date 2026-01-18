import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/layout/sidebar/sidebar";
import { Header } from "@/components/layout/header/header";
import { QueryProvider } from "@/providers/react-query-provider";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "900"],
  variable: "--font-poppins",
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  title: "MBCPLAY - Filmes e Séries",
  description: "Sua plataforma de filmes e séries",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning className={poppins.variable}>
      <head>
        <link rel="preconnect" href="https://api.themoviedb.org" />
        <link rel="preconnect" href="https://image.tmdb.org" />
        <link rel="dns-prefetch" href="https://api.themoviedb.org" />
        <link rel="dns-prefetch" href="https://image.tmdb.org" />
      </head>
      <body className="bg-dark text-white antialiased" suppressHydrationWarning>
        <QueryProvider>
          <Sidebar />
          <main className="lg:ml-65 min-h-screen bg-dark">
            <Header />
            {children}
          </main>
        </QueryProvider>
      </body>
    </html>
  );
}

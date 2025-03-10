import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/components/providers/session-provider";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: 'MedBio - Eixo Digital',
  description: '473 pessoas estão acessando essa página nesse momento O formato de Bio que aumenta seus agendamentos! ⏳ Menos de 5 minutos ✅ Fácil e rápida implementação ✅ Compliance com regras de conselhos Com templates de fácil edição para você ou sua clínica atraírem mais pacientes!',
  openGraph: {
    locale: 'pt_BR',
    type: 'article',
    title: 'MedBio - Eixo Digital',
    description: '473 pessoas estão acessando essa página nesse momento O formato de Bio que aumenta seus agendamentos! ⏳ Menos de 5 minutos ✅ Fácil e rápida implementação ✅ Compliance com regras de conselhos Com templates de fácil edição para você ou sua clínica atraírem mais pacientes!',
    url: 'https://eixo.digital/medbio/',
    siteName: 'Eixo Digital',
    images: [
      {
        url: 'http://eixo.digital/wp-content/uploads/2025/01/Component-9.svg',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MedBio - Eixo Digital',
    description: '473 pessoas estão acessando essa página nesse momento O formato de Bio que aumenta seus agendamentos!',
  },
  icons: {
    icon: [
      { url: 'https://eixo.digital/wp-content/uploads/2024/07/xms-icon-144x144.png.pagespeed.ic_.PtP333Ud30.webp', sizes: '32x32' },
      { url: 'https://eixo.digital/wp-content/uploads/2024/07/xms-icon-144x144.png.pagespeed.ic_.PtP333Ud30.webp', sizes: '192x192' },
    ],
    apple: [
      { url: 'https://eixo.digital/wp-content/uploads/2024/07/xms-icon-144x144.png.pagespeed.ic_.PtP333Ud30.webp' },
    ],
  },
  other: {
    'msapplication-TileImage': 'https://eixo.digital/wp-content/uploads/2024/07/xms-icon-144x144.png.pagespeed.ic_.PtP333Ud30.webp',
  },
  viewport: 'width=device-width, initial-scale=1.0, viewport-fit=cover',
};

export default function RootLayout({ children }) {
  return children;
}

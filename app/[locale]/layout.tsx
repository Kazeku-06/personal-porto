import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import CustomCursor from "@/components/CustomCursor";
import SmoothScroll from "@/components/SmoothScroll";
import {NextIntlClientProvider} from 'next-intl';
import {getMessages} from 'next-intl/server';
import {routing} from '@/i18n/routing';
import {notFound} from 'next/navigation';
import SpotifyPlayer from "@/components/SpotifyPlayer";
import {CommandPalette} from "@/components/CommandPalette";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Naufal's Portfolio",
  description: "High-End Minimalist Interactive Portfolio powered by modern fullstack architecture.",
};

export const viewport: Viewport = {
  themeColor: "#000000",
}

export default async function RootLayout({
  children,
  params
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale} className="dark scroll-smooth">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black text-[#FDFCF0]`}>
        <NextIntlClientProvider messages={messages}>
          <div className="noise-overlay" />
          <CommandPalette />
          <SpotifyPlayer />
          <SmoothScroll>
            <CustomCursor />
            {children}
          </SmoothScroll>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

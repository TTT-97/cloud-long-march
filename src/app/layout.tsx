import type { Metadata } from "next";
import { TooltipProvider } from "@/components/ui/tooltip";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL('https://cloudlongmarch.com'),
  title: "云上长征 Cloud Long March",
  description: "川蜀红色特产数字文化展馆 — Digital Heritage Museum of Sichuan's Long March Agricultural Products",
  icons: {
    icon: "/favicon.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/manifest.json",
  other: {
    "theme-color": "#8B1E24",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "default",
    "apple-mobile-web-app-title": "云上长征",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="zh"
      className="h-full antialiased"
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-cream text-dark font-sans">
        <TooltipProvider>{children}</TooltipProvider>
        <Script
          id="sw-register"
          strategy="afterInteractive"
        >
          {`if('serviceWorker' in navigator){navigator.serviceWorker.register('/sw.js')}`}
        </Script>
      </body>
    </html>
  );
}

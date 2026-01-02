import type { Metadata } from "next";

import { Geist, Geist_Mono } from "next/font/google";

import "../index.css";
import Providers from "@/components/providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SearchThing",
  description:
    "A fast search engine with powerful bang commands for quick access to your favorite sites",
  keywords: [
    "searchthing",
    "SearchThing",
    "Search Thing",
    "search",
    "bangs",
    "search engine",
  ],
  metadataBase: new URL("https://searchthing.xyz"),
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "SearchThing",
  },
  openGraph: {
    title: "SearchThing - Simple Search with Bang Commands",
    description:
      "A minimalist search engine with powerful bang commands for quick access to your favorite sites",
    url: "https://searchthing.xyz",
    siteName: "SearchThing",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SearchThing - Simple Search & Bang Commands",
    description:
      "A minimalist search engine with powerful bang commands for quick access to your favorite sites",
  },
  verification: {
    google: "4fe27WCmJ6kGNx9cRxdU3hGVERDikayxGTzpScCeJ7Y",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Providers>
          <div className="grid grid-rows-[auto_1fr] h-svh">
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}

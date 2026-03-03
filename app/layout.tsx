import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { LanguageProvider } from "@/components/language-provider";
import { LenisProvider } from "@/components/lenis-provider";
import { CustomCursor } from "@/components/custom-cursor";
import { Header } from "@/components/header";
import { Preloader } from "@/components/preloader";
import { Footer } from "@/components/footer";
import { NoiseOverlay } from "@/components/noise-overlay";
import { ScrollProgress } from "@/components/scroll-progress";
import { getDictionary } from "@/lib/translations";
import "@/app/globals.css";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
});

const jetBrains = JetBrains_Mono({
  subsets: ["latin", "cyrillic"],
  variable: "--font-jet-brains",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
});

const defaultDict = getDictionary("uk");

export const metadata: Metadata = {
  title: defaultDict.meta.title,
  description: defaultDict.meta.description,
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f4f5f7" },
    { media: "(prefers-color-scheme: dark)", color: "#050810" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="uk" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${jetBrains.variable} ${spaceGrotesk.variable} font-sans antialiased`}
      >
        <ThemeProvider>
          <LanguageProvider>
            <LenisProvider>
              <NoiseOverlay />
              <ScrollProgress />
              <CustomCursor />
              <Preloader />
              <Header />
              <main className="overflow-x-hidden">{children}</main>
              <Footer />
            </LenisProvider>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

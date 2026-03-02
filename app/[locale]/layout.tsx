import { Inter, JetBrains_Mono } from "next/font/google";
import { locales, type Locale } from "@/lib/i18n";
import { getDictionary } from "@/lib/get-dictionary";
import { ThemeProvider } from "@/components/theme-provider";
import { Header } from "@/components/header";
import { Preloader } from "@/components/preloader";
import { Footer } from "@/components/footer";
import "@/app/globals.css";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
});

const jetBrains = JetBrains_Mono({
  subsets: ["latin", "cyrillic"],
  variable: "--font-jet-brains",
});

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);
  return {
    title: dict.meta.title,
    description: dict.meta.description,
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);

  return (
    <html lang={locale} suppressHydrationWarning>
      <body
        className={`${inter.variable} ${jetBrains.variable} font-sans antialiased`}
      >
        <ThemeProvider>
          <Preloader />
          <Header locale={locale as Locale} dict={dict} />
          <main>{children}</main>
          <Footer dict={dict} />
        </ThemeProvider>
      </body>
    </html>
  );
}

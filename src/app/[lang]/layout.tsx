import { ReactNode } from "react";
import { notFound } from "next/navigation";
import { isValidLocale, type Locale } from "@/lib/i18n";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { PageProvider } from "@/context/PageContext";

interface LanguageLayoutProps {
  children: ReactNode;
  params: Promise<{ lang: string }>;
}

export default async function LanguageLayout({
  children,
  params,
}: LanguageLayoutProps) {
  const { lang } = await params;

  // Validate locale format
  if (!isValidLocale(lang)) {
    notFound();
  }

  return (
    <PageProvider>
      <div lang={lang} className="flex flex-col min-h-screen">
        <Header locale={lang as Locale} />
        <div className="flex-grow">{children}</div>
        <Footer locale={lang as Locale} />
      </div>
    </PageProvider>
  );
}

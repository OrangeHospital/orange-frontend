import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { PageProvider } from "@/context/PageContext";

export const metadata: Metadata = {
  title: "Orange Children Hospital",
  description: "Best Pediatric and Neonatal ICU Hospital in Ahmedabad",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col ">
        <PageProvider>
          <div className="flex flex-col min-h-screen">
            <Header />
            <div className="flex-grow">{children}</div>
            <Footer />
          </div>
        </PageProvider>
      </body>
    </html>
  );
}

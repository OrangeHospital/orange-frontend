import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { PageProvider } from "@/context/PageContext";
import { fetchMenuFront } from "@/lib/api";

export const metadata: Metadata = {
  title: "Orange Children Hospital",
  description: "Best Pediatric and Neonatal ICU Hospital in Ahmedabad",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  let menu: Menu[] = [];
  try {
    const res = await fetchMenuFront();
    if (res && res.success && Array.isArray(res.data)) {
      menu = res.data;
    }
  } catch (error) {
    console.error("Failed to fetch menu in RootLayout:", error);
  }

  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col ">
        <PageProvider>
          <div className="flex flex-col min-h-screen">
            <Header menu={menu} />
            <div className="flex-grow">{children}</div>
            <Footer />
          </div>
        </PageProvider>
      </body>
    </html>
  );
}

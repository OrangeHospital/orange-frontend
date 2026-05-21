import { fetchPageSectionsByType, fetchSettings } from "@/lib/api";
import SectionRenderer from "@/components/SectionRenderer";
import type { Metadata } from "next";
import { getSettingValue } from "@/lib/utils";

interface HomeProps {
  params: Promise<{ lang: string }>;
}

// Generate metadata for SEO
export async function generateMetadata({
  params,
}: HomeProps): Promise<Metadata> {
  const { lang } = await params;
  const canonical = `https://orangechildrenhospital.com/${lang}`;
  const settings = await fetchSettings().catch(() => []);

  try {
    const pageData = await fetchPageSectionsByType("Home");

    const title = pageData?.metaTitle || "Orange Hospital";
    const description =
      pageData?.metaDescription ||
      getSettingValue(
        settings,
        "default_page_description",
        "Orange Children Hospital is the premier NICU & PICU center in Ahmedabad.",
      );

    return {
      title,
      description,
      alternates: {
        canonical,
      },
      openGraph: {
        title,
        description,
        url: canonical,
        siteName: "Orange Hospital",
        locale: lang,
        type: "website",
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
      },
    };
  } catch {
    return {
      title: "Orange Children Hospital",
      description: "Best NICU & PICU Center in Ahmedabad",
    };
  }
}

export default async function Home({ params }: HomeProps) {
  const { lang } = await params;
  let pageData;
  let settings: Array<{ key: string; value: string }> = [];

  try {
    pageData = await fetchPageSectionsByType("Home");
    settings = await fetchSettings();
  } catch {
    return (
      <main className="flex min-h-screen items-center justify-center px-6">
        <div className="text-center">
          <h1 className="mb-4 text-2xl font-bold text-gray-900">
            Unable to load page
          </h1>
          <p className="text-gray-600">
            Please check your configuration or API endpoints and try again.
          </p>
        </div>
      </main>
    );
  }

  // Sort sections by sortOrder
  const sortedSections = pageData.sections.sort(
    (a, b) => a.sortOrder - b.sortOrder,
  );

  return (
    <main className="min-h-screen">
      <SectionRenderer
        sections={sortedSections}
        settings={settings}
        lang={lang}
      />
    </main>
  );
}

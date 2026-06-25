import { fetchPageSections, fetchSettings } from "@/lib/api";
import SectionRenderer from "@/components/SectionRenderer";
import type { Metadata } from "next";
import { getSettingValue } from "@/lib/utils";

export const revalidate = 30;

export async function generateMetadata(): Promise<Metadata> {
  const canonical = "https://orangechildrenhospital.com/";
  const settings = await fetchSettings().catch(() => []);

  try {
    const pageData = await fetchPageSections("Home");

    const title = pageData?.metaTitle || "Orange Children Hospital";
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
      alternates: { canonical },
      openGraph: {
        title,
        description,
        url: canonical,
        siteName: "Orange Hospital",
        locale: "en_IN",
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

export default async function Home() {
  let pageData;
  let settings: Setting[] = [];

  try {
    pageData = await fetchPageSections("home");

    settings = await fetchSettings();
  } catch {
    return (
      <main className="flex min-h-screen items-center justify-center px-6">
        <div className="text-center">
          <h1 className="mb-4 text-2xl font-bold text-gray-900">
            Unable to load page
          </h1>
          <p className="text-gray-600">
            Please check your Sanity configuration and try again.
          </p>
        </div>
      </main>
    );
  }

  const sortedSections = pageData.sections.sort(
    (a, b) => a.sortOrder - b.sortOrder,
  );

  return (
    <main className="min-h-screen">
      {pageData?.schemaMarkup && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: pageData.schemaMarkup.replace(/<\/?script[^>]*>/gi, ""),
          }}
        />
      )}
      <SectionRenderer
        sections={sortedSections}
        settings={settings}
        lang="en"
      />
    </main>
  );
}

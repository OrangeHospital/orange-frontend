import { fetchPageBySlug, fetchSettings } from "@/lib/api";
import SectionRenderer from "@/components/SectionRenderer";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getSettingValue } from "@/lib/utils";

// export const dynamic = "force-dynamic";

interface UnifiedPageProps {
  params: Promise<{ slug: string }>;
}

// Generate metadata for SEO
export async function generateMetadata({
  params,
}: UnifiedPageProps): Promise<Metadata> {
  const { slug } = await params;

  const settings = await fetchSettings().catch(() => []);

  try {
    const response = await fetchPageBySlug(slug);
    if (!response || !response.success || !response.data) {
      return {
        title: "Page Not Found",
      };
    }

    const pageData = response.data;
    const title = pageData.metaTitle || pageData.title || "Orange Hospital";
    const description =
      pageData.metaDescription ||
      getSettingValue(
        settings,
        "default_page_description",
        "Orange Children Hospital",
      );

    return {
      title,
      description,
      alternates: {
        canonical: `https://orangechildrenhospital.com/doctors/${slug}`,
      },
      openGraph: {
        title,
        description,
        url: `https://orangechildrenhospital.com/doctors/${slug}`,
        siteName: "Orange Hospital",
        locale: "en",
        type: "website",
      },
    };
  } catch {
    return {
      title: "Orange Children Hospital",
    };
  }
}

export default async function DoctorPage({ params }: UnifiedPageProps) {
  const { slug } = await params;

  let pageData;
  let settings: Array<{ key: string; value: string }> = [];

  try {
    const response = await fetchPageBySlug(slug);
    if (!response || !response.success || !response.data) {
      notFound();
    }
    pageData = response.data;
    settings = await fetchSettings();
  } catch {
    notFound();
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
        lang="en"
      />
    </main>
  );
}

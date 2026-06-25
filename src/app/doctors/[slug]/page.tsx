import { fetchPageBySlug, fetchSettings } from "@/lib/api";
import { sanityClient } from "@/lib/sanity";
import SectionRenderer from "@/components/SectionRenderer";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getSettingValue } from "@/lib/utils";

export const revalidate = 30;

interface UnifiedPageProps {
  params: Promise<{ slug: string }>;
}

// Doctors are CMS pages whose pageType name starts with "Doctor".
const DOCTOR_SLUGS_QUERY = `
  *[_type == "page" && status == "published" && pageType->name match "Doctor*"] {
    "slug": slug.current
  }
`;

export async function generateStaticParams() {
  const slugs: Array<{ slug: string }> = await sanityClient
    .fetch(DOCTOR_SLUGS_QUERY)
    .catch(() => []);
  return slugs.filter((s) => s.slug).map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: UnifiedPageProps): Promise<Metadata> {
  const { slug } = await params;
  const settings = await fetchSettings().catch(() => []);

  try {
    const response = await fetchPageBySlug(slug);
    if (!response?.success || !response.data) {
      return { title: "Page Not Found" };
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
    const canonical = `https://orangechildrenhospital.com/doctors/${slug}`;

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
      twitter: { card: "summary_large_image", title, description },
    };
  } catch {
    return { title: "Orange Children Hospital" };
  }
}

export default async function DoctorPage({ params }: UnifiedPageProps) {
  const { slug } = await params;

  let pageData: PageResponse | undefined;
  let settings: Setting[] = [];

  try {
    const response = await fetchPageBySlug(slug);
    if (!response?.success || !response.data) notFound();
    pageData = response.data;
    settings = await fetchSettings();
  } catch {
    notFound();
  }

  const sortedSections = pageData!.sections.sort(
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

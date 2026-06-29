import { fetchPageSections, fetchSettings } from "@/lib/api";
import SectionRenderer from "@/components/SectionRenderer";
import MapReviewSection from "@/components/sections/MapReviewSection";
import type { Metadata } from "next";
import { getSettingValue, fetchWithTimeout } from "@/lib/utils";

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
  let initialReviews = [];
  let initialSummary = null;

  try {
    pageData = await fetchPageSections("home");
    settings = await fetchSettings();

    // Server-side fetching of Google Map reviews to prevent layout shift (CLS)
    const reviewApiUrl = process.env.MAP_REVIEW_API_URL;
    const reviewApiToken = process.env.MAP_REVIEW_API_TOKEN;
    if (reviewApiUrl && reviewApiToken) {
      try {
        const res = await fetchWithTimeout(reviewApiUrl, {
          headers: {
            Authorization: `Bearer ${reviewApiToken}`,
            "Content-Type": "application/json",
          },
          next: { revalidate: 3600 },
          timeout: 5000,
        });
        if (res.ok) {
          const json = await res.json();
          const payload = json?.data ?? json;
          initialReviews = payload?.reviews || [];
          initialSummary = payload?.summary || null;
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        console.warn(
          "Map Review API fetch failed on home page:",
          err.message || err,
        );
      }
    }
  } catch (error) {
    console.error("Error loading home page components/reviews:", error);
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
      <MapReviewSection
        data={{
          title: "What Our Patients Say",
          description:
            "Real experiences from families who trusted us with their child's care.",
        }}
        initialReviews={initialReviews}
        initialSummary={initialSummary}
      />
    </main>
  );
}

import {
  fetchSuccessStoryBySlug,
  fetchSuccessStories,
  fetchSettings,
} from "@/lib/api";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Calendar, Phone, Mail, MapPin, ChevronRight } from "lucide-react";
import type { Metadata } from "next";
import React from "react";
import RichTextContent from "@/components/sections/RichTextContent";
import Image from "next/image";
import { getSettingValue } from "@/lib/utils";

const getImageUrl = (url?: string) => {
  if (!url) return "";
  if (
    url.startsWith("/") ||
    url.startsWith("http://") ||
    url.startsWith("https://")
  ) {
    return url;
  }
  const fileBase =
    process.env.NEXT_PUBLIC_FILE_BASE_URL || "http://3.111.240.196:7071/share/";
  const base = fileBase.endsWith("/") ? fileBase : `${fileBase}/`;
  return `${base}${url}`;
};

interface SuccessStoryProps {
  params: Promise<{ slug: string }>;
}

export const dynamic = "force-dynamic";

// Generate dynamic metadata for SEO
export async function generateMetadata({
  params,
}: SuccessStoryProps): Promise<Metadata> {
  const { slug } = await params;

  try {
    const response = await fetchSuccessStoryBySlug(slug);
    if (response && response.success && response.data) {
      const story = response.data;
      const title = story.metaTitle || `${story.name} - Success Story`;
      const description =
        story.metaDescription ||
        `Read the inspiring medical recovery and success story of ${story.name} at Orange Children Hospital, Ahmedabad.`;

      return {
        title,
        description,
        alternates: {
          canonical: `https://orangechildrenhospital.com/success-stories/${slug}`,
        },
        openGraph: {
          title,
          description,
          url: `https://orangechildrenhospital.com/success-stories/${slug}`,
          siteName: "Orange Hospital",
          locale: "en",
          type: "article",
        },
      };
    }
  } catch (e) {
    console.error("Error generating metadata for success story:", e);
  }
  return {
    title: "Patient Success Story - Orange Children Hospital",
  };
}

export default async function SuccessStoryDetailPage({
  params,
}: SuccessStoryProps) {
  const { slug } = await params;

  let story: SuccessStory | null = null;
  let otherStories: SuccessStory[] = [];
  let settings: Array<{ key: string; value: string }> = [];

  try {
    // Fetch story, other stories, and settings in parallel
    const [storyRes, storiesRes, settingsRes] = await Promise.all([
      fetchSuccessStoryBySlug(slug),
      fetchSuccessStories().catch(() => ({ success: false, data: [] })),
      fetchSettings().catch(() => []),
    ]);

    if (storyRes && storyRes.success && storyRes.data) {
      story = storyRes.data;
    }

    if (storiesRes && storiesRes.success && Array.isArray(storiesRes.data)) {
      // Filter out the current story and pick the 3 most recent active stories
      otherStories = storiesRes.data
        .filter((s) => s.status === 1 && s.slug !== slug)
        .slice(0, 3);
    }

    settings = settingsRes;
  } catch (error) {
    console.error("Error loading success story detail data:", error);
  }

  if (!story || story.status !== 1) {
    notFound();
  }

  const formatDate = (dateString?: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const stringContent =
    typeof story.content === "object"
      ? JSON.stringify(story.content)
      : story.content || "";

  const phone = getSettingValue(settings, "hospital_phone");
  const email = getSettingValue(settings, "hospital_email");
  const address = getSettingValue(settings, "hospital_address");

  return (
    <main className="min-h-screen bg-white">
      {/* Sleek, Modern Visual Header Section (matching success-stories list page banner style) */}
      <section className="bg-slate-950 text-white py-16 px-6 sm:px-8 relative overflow-hidden">
        {/* Background Image with Dark Premium Vignette */}
        <div className="absolute inset-0 z-0 opacity-75">
          <Image
            src="/nicu_expertise.png"
            alt="Orange Hospital Neonatal & Pediatric Care"
            fill
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/60 via-slate-950/40 to-slate-950/80" />
        </div>

        {/* Subtle decorative elements */}
        <div className="absolute right-0 top-0 w-96 h-96 bg-[#F7A707]/10 rounded-full blur-3xl pointer-events-none z-10" />
        <div className="absolute left-10 bottom-0 w-72 h-72 bg-[#2B6CB0]/15 rounded-full blur-3xl pointer-events-none z-10" />

        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="max-w-4xl text-left">
            {/* Premium Category Badge */}
            <div className="mb-4">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold tracking-wider bg-orange-500/20 text-[#F7A707] border border-orange-500/30 uppercase">
                Critical Care Recovery
              </span>
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl  font-extrabold text-white tracking-tight leading-[1.2] mb-6">
              {story.name}
            </h1>

            {/* Meta Info */}
            <div className="flex items-center gap-3 text-sm">
              <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-slate-300">
                <Calendar className="h-4 w-4 text-[#F7A707]" />
                <span className="font-medium">
                  {formatDate(story.createdAt)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content & Sidebar Layout */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:items-start">
            {/* Left Column: Story Content */}
            <div className="lg:col-span-8 flex flex-col gap-8">
              {/* Featured Image */}
              {story.media?.fileUrl && (
                <div className="rounded-2xl overflow-hidden shadow-md border border-slate-100 max-w-full">
                  <Image
                    src={getImageUrl(story.media.fileUrl)}
                    alt={story.media.altText || story.name}
                    className="w-full h-full object-cover"
                    width={1200}
                    height={800}
                    priority
                  />
                </div>
              )}

              {/* Rich Content Area */}
              <div className="prose prose-slate max-w-none">
                {stringContent ? (
                  <RichTextContent content={stringContent} />
                ) : (
                  <p className="text-slate-500 italic">
                    No story details available.
                  </p>
                )}
              </div>
            </div>

            {/* Right Column: Premium Sidebar */}
            <div className="lg:col-span-4 flex flex-col gap-8 lg:sticky lg:top-24">
              {/* Emergency & Appointment Booking Card */}
              <div className="rounded-2xl border border-slate-200 bg-gradient-to-b from-white to-slate-50 p-6 shadow-sm">
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  Need Expert Child Care?
                </h3>
                <p className="text-xs md:text-sm text-slate-500 mb-6 leading-relaxed">
                  Orange Children Hospital provides state-of-the-art Neonatal
                  and Pediatric Intensive Care. Reach out for expert guidance.
                </p>

                <div className="flex flex-col gap-4 mb-6">
                  {phone && (
                    <a
                      href={`tel:${phone}`}
                      className="group flex items-center gap-3 transition-colors"
                    >
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-orange-50 border border-orange-100 group-hover:bg-[#F7A707] transition-all duration-200">
                        <Phone className="h-4 w-4 text-[#F7A707] group-hover:text-white transition-colors" />
                      </div>
                      <span className="text-sm font-semibold text-slate-800 group-hover:text-[#F7A707] transition-colors">
                        {phone}
                      </span>
                    </a>
                  )}

                  {email && (
                    <a
                      href={`mailto:${email}`}
                      className="group flex items-center gap-3 transition-colors"
                    >
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-orange-50 border border-orange-100 group-hover:bg-[#F7A707] transition-all duration-200">
                        <Mail className="h-4 w-4 text-[#F7A707] group-hover:text-white transition-colors" />
                      </div>
                      <span className="text-sm font-semibold text-slate-800 break-all group-hover:text-[#F7A707] transition-colors">
                        {email}
                      </span>
                    </a>
                  )}

                  {address && (
                    <a
                      href={`https://maps.google.com/?q=${encodeURIComponent(address)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-3 transition-colors"
                    >
                      <div className="flex items-start gap-3">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-orange-50 border border-orange-100 group-hover:bg-[#F7A707] transition-all duration-200">
                          <MapPin className="h-4 w-4 text-[#F7A707] group-hover:text-white transition-colors" />
                        </div>
                        <span className="text-xs md:text-sm text-slate-600 leading-relaxed group-hover:text-[#F7A707] transition-colors">
                          {address}
                        </span>
                      </div>
                    </a>
                  )}
                </div>

                <Link
                  href="/contact"
                  className="flex h-11 w-full items-center justify-center rounded-xl bg-[#F7A707] text-sm font-bold text-white shadow-sm transition-all duration-200 hover:bg-[#e67e0a] hover:-translate-y-0.5 active:translate-y-0"
                >
                  Book An Appointment
                </Link>
              </div>

              {/* Related/Other Success Stories */}
              {otherStories.length > 0 && (
                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                  <h3 className="text-sm font-bold text-slate-900 mb-4 tracking-wider uppercase">
                    Other Success Stories
                  </h3>

                  <div className="flex flex-col gap-5">
                    {otherStories.map((storyItem) => (
                      <Link
                        key={storyItem.id}
                        href={`/success-stories/${storyItem.slug}`}
                        className="flex gap-4 group transition-colors hover:text-[#F7A707]"
                      >
                        <div className="relative h-14 w-18 shrink-0 rounded-lg overflow-hidden bg-slate-50 border border-slate-100">
                          {storyItem.media?.fileUrl ? (
                            <Image
                              src={getImageUrl(storyItem.media.fileUrl)}
                              alt={storyItem.media.altText || storyItem.name}
                              className="object-cover group-hover:scale-105 transition-transform duration-300"
                              fill
                              sizes="72px"
                            />
                          ) : (
                            <div className="h-full w-full bg-orange-50 flex items-center justify-center text-[#F7A707] font-bold text-[10px]">
                              Orange
                            </div>
                          )}
                        </div>
                        <div className="flex flex-col min-w-0">
                          <h4 className="text-xs md:text-sm font-semibold text-slate-800 group-hover:text-[#F7A707] line-clamp-2 leading-snug transition-colors">
                            {storyItem.name}
                          </h4>
                          <span className="text-[10px] text-slate-400 mt-1">
                            {formatDate(storyItem.createdAt)}
                          </span>
                        </div>
                      </Link>
                    ))}
                  </div>

                  <div className="h-px bg-slate-100 my-4" />

                  <Link
                    href="/success-stories"
                    className="inline-flex items-center gap-1 text-xs md:text-sm font-bold text-[#F7A707] hover:text-[#e67e0a] transition-colors"
                  >
                    <span>View All Stories</span>
                    <ChevronRight className="h-4 w-4" />
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

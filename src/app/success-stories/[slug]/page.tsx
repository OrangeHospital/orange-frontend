import { fetchSuccessStoryBySlug } from "@/lib/api";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Calendar, ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import React from "react";
import RichTextContent from "@/components/sections/RichTextContent";
import Image from "next/image";

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

  try {
    const response = await fetchSuccessStoryBySlug(slug);
    if (response && response.success && response.data) {
      story = response.data;
    }
  } catch (error) {
    console.error("Error loading success story detail:", error);
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

  return (
    <main>
      {/* Dynamic Header Section (matching Delwis-Web layout & light warm gradient styling) */}
      <section className="py-16 bg-gradient-to-br from-[#fff7ed] via-white to-[#ffedd4]">
        <div className="container mx-auto px-6 lg:px-12 max-w-7xl">
          <div className="max-w-4xl mx-auto">
            {/* Category / Back Link Badge */}
            <div className="mb-6 flex items-center justify-between">
              <Link
                href="/success-stories"
                className="inline-block bg-gradient-to-br from-[#F7A707] to-[#e67e0a] text-white border-0 px-5 py-2 text-base font-medium hover:from-[#e67e0a] hover:to-[#d66a08] transition-all rounded-lg"
              >
                Success Stories
              </Link>

              <Link
                href="/success-stories"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#4a5565] hover:text-[#F7A707] transition-colors uppercase tracking-wider"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>All Stories</span>
              </Link>
            </div>

            {/* Title */}
            <h1 className="text-4xl lg:text-5xl font-bold text-[#1f2937] mb-8 leading-[1.2] uppercase">
              {story.name}
            </h1>

            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-6 text-base text-[#4a5565] mb-10">
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-[#F7A707]" />
                <span>{formatDate(story.createdAt)}</span>
              </div>
            </div>

            {/* Featured Image */}
            {story.featuredImage && (
              <div className="rounded-2xl overflow-hidden shadow-xl border border-slate-100 max-w-4xl">
                <Image
                  src={story.featuredImage}
                  alt={story.name}
                  className="w-full h-auto object-cover"
                />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Story Content Section (matching Delwis-Web structure) */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 lg:px-12 max-w-7xl">
          <div className="max-w-4xl mx-auto">
            {stringContent ? (
              <RichTextContent content={stringContent} />
            ) : (
              <p className="text-slate-500 italic">
                No story details available.
              </p>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}

"use client";

import { useState } from "react";
import { X } from "lucide-react";

interface Testimonial {
  id: string;
  title: string;
  description: string | null;
  videoUrl: string | null;
  type: string | null;
  status: number;
  metaTitle: string | null;
  metaDescription: string | null;
  ogImage: string | null;
  isIndex: boolean;
  createdAt: string;
  updatedAt: string;
}

interface TestimonialClientProps {
  testimonials: Testimonial[];
}

// Utility to get YouTube Video ID and base embed URL
function getYoutubeEmbedUrl(url: string | null) {
  if (!url) return "";
  let videoId = "";
  if (url.includes("youtu.be/")) {
    videoId = url.split("youtu.be/")[1]?.split("?")[0] || "";
  } else if (url.includes("v=")) {
    videoId = url.split("v=")[1]?.split("&")[0] || "";
  } else if (url.includes("embed/")) {
    videoId = url.split("embed/")[1]?.split("?")[0] || "";
  }
  return videoId ? `https://www.youtube.com/embed/${videoId}` : "";
}

export default function TestimonialClient({
  testimonials,
}: TestimonialClientProps) {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  // Only display active testimonials
  const activeTestimonials = testimonials.filter((t) => t.status === 1);

  return (
    <div className="bg-white min-h-screen py-10 px-6 sm:px-8 lg:px-16">
      {/* Testimonials Pure Grid (Exactly matching the original website screenshot) */}
      <div className="max-w-7xl mx-auto">
        {activeTestimonials.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-12">
            {activeTestimonials.map((t) => {
              const embedUrl = getYoutubeEmbedUrl(t.videoUrl);

              return (
                <div key={t.id} className="flex flex-col text-left">
                  {/* Widescreen Iframe Container with Transparent Click Overlay */}
                  <div className="relative aspect-video w-full bg-slate-900 rounded-none overflow-hidden shadow-none border-0">
                    {embedUrl ? (
                      <>
                        {/* The direct iframe player (interaction disabled so click triggers modal) */}
                        <iframe
                          src={embedUrl}
                          title={t.title}
                          className="w-full h-full border-0 rounded-none pointer-events-none"
                          allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        />
                        {/* Absolute transparent overlay to capture clicks */}
                        <div
                          onClick={() =>
                            setActiveVideo(`${embedUrl}?autoplay=1`)
                          }
                          className="absolute inset-0 z-10 cursor-pointer"
                          title="Click to play in theater modal"
                        />
                      </>
                    ) : (
                      <div className="w-full h-full bg-slate-100 flex items-center justify-center text-slate-400 text-xs">
                        No Video Available
                      </div>
                    )}
                  </div>

                  {/* Title directly underneath the video (Medium-Blue, Sentence-Case, Regular-Weight) */}
                  <h3
                    onClick={() =>
                      embedUrl && setActiveVideo(`${embedUrl}?autoplay=1`)
                    }
                    className="mt-4 text-[15px] font-medium text-[#2B6CB0] hover:text-[#1A365D] hover:underline cursor-pointer leading-snug transition-colors duration-200"
                  >
                    {t.title}
                  </h3>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-20 text-slate-400 text-sm">
            No testimonials available.
          </div>
        )}
      </div>

      {/* Large Lightbox Modal popup overlay */}
      {activeVideo && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm transition-all duration-300">
          <div className="relative w-full max-w-4xl bg-black rounded-3xl overflow-hidden shadow-2xl aspect-video border border-slate-800">
            {/* Close Button */}
            <button
              onClick={() => setActiveVideo(null)}
              className="absolute top-4 right-4 z-50 p-2 rounded-full bg-black/40 text-white hover:bg-black/80 transition-colors duration-200"
              aria-label="Close video player"
            >
              <X className="h-6 w-6" />
            </button>
            <iframe
              src={activeVideo}
              title="Testimonial Player"
              className="w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </div>
  );
}

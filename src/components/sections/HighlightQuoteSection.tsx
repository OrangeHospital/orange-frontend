"use client";

import Image from "next/image";
import { getImageUrl, isValidImageUrl } from "@/lib/utils";
import Reveal from "@/components/site/Reveal";

interface HighlightQuoteSectionProps {
  data: {
    description?: string;
    image?: {
      id?: string;
      fileUrl?: string;
      altText?: string;
    };
  };
}

export default function HighlightQuoteSection({
  data,
}: HighlightQuoteSectionProps) {
  const description = data.description || "";
  const imageUrl =
    data.image?.fileUrl && isValidImageUrl(data.image.fileUrl)
      ? getImageUrl(data.image.fileUrl)
      : "/hero_baby.png";

  return (
    <section className="relative w-full bg-[#050811] overflow-hidden min-h-[450px] md:min-h-[500px] flex flex-col md:flex-row">
      {/* Left side: Elegant Quote Content */}
      <div className="w-full md:w-[45%] flex flex-col justify-center px-8 py-16 md:py-24 md:pl-16 lg:pl-24 xl:pl-32 z-10 bg-[#050811]">
        <Reveal>
          {/* Top elegant quote icon */}
          <span className="text-[#F7A707] text-6xl md:text-7xl font-serif leading-none mb-2 select-none -ml-3 block">
            “
          </span>

          {description && (
            <blockquote className="text-lg sm:text-xl md:text-2xl font-light text-slate-100 leading-relaxed italic pr-4 md:pr-8">
              {description}
            </blockquote>
          )}

          {/* Bottom decorative accent line */}
          <div className="h-0.5 w-12 bg-gradient-to-r from-[#F7A707] to-[#EF641A] mt-6 rounded-full" />
        </Reveal>
      </div>

      {/* Right side: Image with Gradient Fade */}
      <div className="relative w-full md:w-[55%] min-h-[350px] md:min-h-full md:absolute md:right-0 md:top-0 md:bottom-0">
        {imageUrl ? (
          <>
            <Image
              src={imageUrl}
              alt={data.image?.altText || "Highlight Quote"}
              fill
              className="object-cover"
              quality={95}
              priority
            />
            {/* Desktop Gradient Overlay (Left to Right, constrained to left 30% of the image) */}
            <div className="absolute inset-y-0 left-0 w-[30%] bg-gradient-to-r from-[#050811] to-transparent pointer-events-none z-20 hidden md:block" />
            {/* Mobile Gradient Overlay (Bottom to Top, constrained to top 30% of the image) */}
            <div className="absolute inset-x-0 top-0 h-[30%] bg-gradient-to-b from-[#050811] to-transparent pointer-events-none z-20 md:hidden" />
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-slate-900 text-slate-500">
            No Image
          </div>
        )}
      </div>
    </section>
  );
}

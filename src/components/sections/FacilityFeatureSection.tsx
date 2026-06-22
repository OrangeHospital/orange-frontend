"use client";

import Image from "next/image";
import { getImageUrl, isValidImageUrl } from "@/lib/utils";

interface FacilityFeatureSectionProps {
  data: {
    title?: string;
    subtitle?: string;
    description?: string;
    badge?: {
      label: string;
    };
    image?: {
      fileUrl: string;
      altText?: string;
    };
    imagePosition?: "left" | "right";
  };
}

export default function FacilityFeatureSection({
  data,
}: FacilityFeatureSectionProps) {
  const isEven = data.imagePosition !== "left";
  const badgeLabel = data.badge?.label ?? "DEPARTMENTS";
  const title = data.title ?? "";
  const subtitle = data.subtitle ?? "";
  const description = data.description ?? "";
  const imageFileUrl = data.image?.fileUrl;
  const hasValidImage = imageFileUrl && isValidImageUrl(imageFileUrl);
  const imageUrl = hasValidImage
    ? getImageUrl(imageFileUrl)
    : "/nicu_expertise.png";
  const altText = data.image?.altText ?? title;

  return (
    <section
      className={`py-16 md:py-20 overflow-hidden relative ${
        isEven ? "bg-white" : "bg-slate-50/50 border-y border-slate-100/60"
      }`}
    >
      {/* Visual dynamic gradient overlays */}
      <div
        className={`absolute top-1/2 -translate-y-1/2 h-[350px] w-[350px] rounded-full pointer-events-none blur-[100px] opacity-40 ${
          isEven ? "right-10 bg-[#F7A707]/10" : "left-10 bg-teal-500/10"
        }`}
      />

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Content Side */}
          <div
            className={`lg:col-span-6 flex flex-col justify-center ${
              isEven ? "order-1" : "order-1 lg:order-2"
            }`}
          >
            {/* Soft Badge */}
            <span
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-4 w-fit ${
                isEven
                  ? "bg-teal-50 text-teal-700"
                  : "bg-amber-50 text-amber-700"
              }`}
            >
              <span
                className={`w-1.5 h-1.5 rounded-full ${
                  isEven ? "bg-teal-500" : "bg-amber-500"
                }`}
              />
              {badgeLabel}
            </span>

            {/* Title */}
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight mb-3">
              {title}
            </h2>

            {/* Subtitle */}
            {subtitle && (
              <h3 className="text-lg font-semibold text-[#0d9488] mb-5 tracking-wide">
                {subtitle}
              </h3>
            )}

            {/* Description */}
            <p className="text-slate-500 text-base leading-relaxed mb-6 whitespace-pre-line">
              {description}
            </p>

            {/* Premium Dynamic Highlight Accent */}
            <div className="flex items-center gap-3">
              <div
                className={`h-1.5 w-12 rounded-full ${
                  isEven ? "bg-[#F7A707]" : "bg-teal-500"
                }`}
              />
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Orange Healthcare Excellence
              </span>
            </div>
          </div>

          {/* Image Side */}
          <div
            className={`lg:col-span-6 ${
              isEven ? "order-2" : "order-2 lg:order-1"
            }`}
          >
            <div className="relative group">
              {/* Premium offset decorative border frame */}
              <div
                className={`absolute -inset-2 rounded-3xl border opacity-60 group-hover:opacity-100 transition-opacity pointer-events-none ${
                  isEven ? "border-teal-500/20" : "border-amber-500/20"
                }`}
              />

              {/* Main Image Container */}
              <div className="relative h-72 sm:h-96 lg:h-[420px] rounded-2xl md:rounded-3xl overflow-hidden shadow-lg border border-slate-100/80 bg-slate-100 hover:shadow-2xl transition-all duration-300">
                <Image
                  src={imageUrl}
                  alt={altText}
                  fill
                  sizes="(max-w-1024px) 100vw, 50vw"
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

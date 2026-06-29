"use client";

import Image from "next/image";
import Link from "next/link";
import * as LucideIcons from "lucide-react";
import { getImageUrl } from "@/lib/utils";

type LucideIconName = keyof typeof LucideIcons.icons;

interface ImageCardData {
  title: string;
  description?: string;
  icon?: string | { fileUrl: string; altText?: string };
  image?: { fileUrl: string; altText?: string };
  link?: string;
}

interface ImageCardGridSectionProps {
  data: {
    title?: string;
    subtitle?: string;
    primaryCta?: {
      label: string;
      href: string;
      variant?: string;
    };
    ctaLabel?: string;
    ctaLink?: string;
    link?: string;
    cards?: ImageCardData[];
  };
}

export default function ImageCardGridSection({
  data,
}: ImageCardGridSectionProps) {
  const isImageUrl = (str?: string) => {
    if (!str) return false;
    return (
      str.startsWith("http") ||
      str.startsWith("/") ||
      str.includes(".") ||
      str.includes("image")
    );
  };

  const getIcon = (iconName?: string): LucideIcons.LucideIcon | null => {
    if (!iconName || isImageUrl(iconName)) return null;

    const formattedName = iconName
      .toLowerCase()
      .replace(/-./g, (x) => x[1].toUpperCase())
      .replace(/^\w/, (c) => c.toUpperCase()) as LucideIconName;

    return LucideIcons.icons[formattedName] ?? null;
  };

  const hasCta = !!(data.primaryCta?.href || data.ctaLink || data.link);
  const ctaHref = data.primaryCta?.href || data.ctaLink || data.link || "#";
  const ctaLabel =
    data.primaryCta?.label || data.ctaLabel || "Explore all facilities";

  return (
    <section className="relative overflow-hidden py-20 md:py-28  w-full">
      {/* Ambient glow blobs */}
      {/* <div className="absolute top-0 left-[-5%] h-[700px] w-[700px] rounded-full bg-[color:var(--primary)]/[0.04] blur-[160px] pointer-events-none" />
      <div className="absolute bottom-0 right-[-5%] h-[600px] w-[600px] rounded-full bg-orange-300/[0.06] blur-[160px] pointer-events-none" /> */}

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        {/* Section Header */}
        {(data.title || data.subtitle) && (
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-14">
            <div className="max-w-2xl">
              {data.subtitle && (
                <div className="inline-flex items-center gap-2.5 mb-4">
                  <span className="block w-5 h-[2px] bg-[color:var(--primary)] rounded-full" />
                  <p className="text-[color:var(--primary)] text-[11px] font-bold uppercase tracking-[0.35em]">
                    {data.subtitle}
                  </p>
                </div>
              )}
              {data.title && (
                <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-bold text-[color:var(--ink-900)] tracking-tight leading-[1.12]">
                  {data.title}
                </h2>
              )}
            </div>

            {hasCta && (
              <div className="shrink-0">
                <Link
                  href={ctaHref}
                  className="group inline-flex items-center gap-3 px-7 py-3.5 rounded-full border border-[color:var(--ink-900)]/20 bg-white hover:bg-[color:var(--ink-900)] text-[color:var(--ink-900)] hover:text-white transition-all duration-400 font-semibold text-[11px] uppercase tracking-widest select-none shadow-sm"
                >
                  <span>{ctaLabel}</span>
                  <span className="w-5 h-5 rounded-full bg-[color:var(--ink-900)]/10 group-hover:bg-white/20 flex items-center justify-center transition-all duration-300">
                    <LucideIcons.ArrowRight className="w-3 h-3 transition-transform duration-300 group-hover:translate-x-0.5" />
                  </span>
                </Link>
              </div>
            )}
          </div>
        )}

        {/* Cards Grid */}
        {data.cards && data.cards.length > 0 && (
          <div className="grid gap-4 sm:gap-5 sm:grid-cols-2 lg:grid-cols-3 auto-rows-[360px]">
            {data.cards.map((card: ImageCardData, index) => {
              const isLargeCard = index % 3 === 0;

              const rawUrl =
                (typeof card.icon === "object"
                  ? card.icon?.fileUrl
                  : card.icon) ||
                card.image?.fileUrl ||
                "";
              const imageSrc = isImageUrl(rawUrl) ? getImageUrl(rawUrl) : "";

              const CardIcon = getIcon(
                typeof card.icon === "string" ? card.icon : card.image?.altText,
              );

              const cardContent = (
                <div className="relative w-full h-full rounded-2xl overflow-hidden flex flex-col justify-end select-none bg-[#141210] group">
                  {/* Background image or fallback */}
                  {imageSrc ? (
                    <>
                      <Image
                        src={imageSrc}
                        alt={card.title}
                        fill
                        style={{ objectFit: "cover" }}
                        className="transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.05] will-change-transform"
                        quality={95}
                      />
                      {/* Base dark gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-black/5" />
                      {/* Hover-amplified bottom glow */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[color:var(--primary)]/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                      {/* Subtle vignette */}
                      <div className="absolute inset-0 bg-radial-at-center from-transparent to-black/20" />
                    </>
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-[#1E1C19] via-[#141210] to-[#0A0909]" />
                  )}

                  {/* Top shimmer line on hover */}
                  <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-30" />

                  {/* Icon or top-right pill */}
                  {CardIcon ? (
                    <div className="absolute top-4 right-5 z-20 w-10 h-10 rounded-xl bg-white/[0.08] backdrop-blur-md flex items-center justify-center text-white shadow-inner transition-all duration-500 group-hover:bg-white/[0.16]">
                      <CardIcon className="w-4 h-4 stroke-[1.25]" />
                    </div>
                  ) : null}

                  {/* Bottom content */}
                  <div className="relative z-10 p-6 transform transition-transform duration-500 ease-out translate-y-1 group-hover:translate-y-0">
                    {/* Title */}
                    <h3 className="text-lg sm:text-xl font-bold text-white leading-snug tracking-tight max-w-[90%]">
                      {card.title}
                    </h3>

                    {/* Description — fades in on hover */}
                    {card.description && (
                      <p className="mt-2 text-[13px] text-stone-300/75 line-clamp-2 font-normal leading-relaxed transition-all duration-500 opacity-0 max-h-0 group-hover:opacity-100 group-hover:max-h-20">
                        {card.description}
                      </p>
                    )}

                    {/* CTA row */}
                    {card.link && (
                      <div className="mt-4 flex items-center gap-2">
                        <span className="text-[11px] font-bold tracking-[0.18em] text-white/40 group-hover:text-amber-200 uppercase transition-colors duration-500">
                          Discover
                        </span>
                        <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-white/10 group-hover:bg-amber-200/20 transition-colors duration-500">
                          <LucideIcons.ArrowUpRight className="w-3 h-3 text-white/50 group-hover:text-amber-200 transition-all duration-400 group-hover:translate-x-[1px] group-hover:-translate-y-[1px]" />
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              );

              return card.link ? (
                <Link
                  key={index}
                  href={card.link}
                  className={`block rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-black/30 transition-all duration-500 ease-out cursor-pointer ${
                    isLargeCard ? "lg:col-span-2" : "lg:col-span-1"
                  }`}
                >
                  {cardContent}
                </Link>
              ) : (
                <div
                  key={index}
                  className={`block rounded-2xl overflow-hidden transition-all duration-500 ease-out ${
                    isLargeCard ? "lg:col-span-2" : "lg:col-span-1"
                  }`}
                >
                  {cardContent}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}

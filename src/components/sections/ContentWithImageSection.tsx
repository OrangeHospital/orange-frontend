"use client";

import Image from "next/image";
import Link from "next/link";
import { cn, getImageUrl, isValidImageUrl } from "@/lib/utils";

interface ExtendedCTA {
  label: string;
  href: string;
  link?: string;
  variant?: "primary" | "secondary" | "outline" | "ghost";
}

interface ContentWithImageData {
  title?: string;
  subtitle?: string;
  description?: string;
  imagePosition?: "left" | "right";
  image?: {
    fileUrl: string;
    altText?: string;
  };
  content?: string[];
  points?: string[];
  primaryCta?: ExtendedCTA;
  secondaryCta?: ExtendedCTA;
}

interface ContentWithImageSectionProps {
  data: ContentWithImageData;
  lang?: string;
}

export default function ContentWithImageSection({
  data,
}: ContentWithImageSectionProps) {
  const isReversed = data.imagePosition === "right";
  const primaryCta = data.primaryCta;
  const secondaryCta = data.secondaryCta;
  const imageSrc =
    data.image?.fileUrl && isValidImageUrl(data.image.fileUrl)
      ? getImageUrl(data.image.fileUrl)
      : "";

  return (
    <section className="relative py-24 md:py-32 bg-white overflow-hidden w-full">
      {/* ── Ambient blobs ── */}
      <div
        className={cn(
          "absolute top-[-10%] w-[700px] h-[700px] rounded-full blur-[160px] pointer-events-none opacity-50",
          isReversed
            ? "right-[-15%] bg-orange-100"
            : "left-[-15%] bg-orange-100",
        )}
      />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[900px] h-[300px] rounded-full bg-[#FFF7ED] blur-[80px] pointer-events-none opacity-70" />

      {/* ── Dot grid pattern ── */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage:
            "radial-gradient(circle, #7c3700 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div
          className={cn(
            "flex flex-col lg:flex-row items-center gap-16 lg:gap-24",
            isReversed ? "lg:flex-row-reverse" : "",
          )}
        >
          {/* ════════════════ IMAGE SIDE ════════════════ */}
          <div className="w-full lg:w-[48%] cwis-image-side">
            <div className="relative">
              {/* Floating decorative card behind the image */}
              <div
                className={cn(
                  "absolute w-full h-full rounded-[32px] bg-gradient-to-br from-[color:var(--primary)]/15 to-orange-100/40 -z-10 transition-transform duration-700",
                  isReversed
                    ? "-rotate-2 translate-x-4 translate-y-4"
                    : "rotate-2 -translate-x-4 translate-y-4",
                )}
              />

              {/* Accent vertical bar */}
              <div
                className={cn(
                  "absolute top-8 bottom-8 w-1 rounded-full bg-gradient-to-b from-[color:var(--primary)] to-orange-300 z-20",
                  isReversed ? "-left-5" : "-right-5",
                )}
              />

              {/* Main image container */}
              <div className="relative aspect-[4/3] w-full rounded-[28px] overflow-hidden shadow-2xl shadow-orange-900/10 group">
                {imageSrc ? (
                  <>
                    <Image
                      src={imageSrc}
                      alt={
                        data.image?.altText || data.title || "Orange Hospital"
                      }
                      fill
                      style={{ objectFit: "cover" }}
                      className="transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04] will-change-transform"
                      quality={95}
                    />
                    {/* Subtle inner vignette */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                  </>
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-orange-50 to-orange-100 flex items-center justify-center text-orange-300 text-sm font-medium">
                    No Image
                  </div>
                )}

                {/* Hover shimmer overlay */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-gradient-to-tr from-transparent via-white/5 to-transparent" />
              </div>
            </div>
          </div>

          {/* ════════════════ CONTENT SIDE ════════════════ */}
          <div className="w-full lg:w-[52%] cwis-content-side">
            {/* Subtitle pill */}
            {data.subtitle && (
              <div className="inline-flex items-center gap-2 mb-5 cwis-item">
                <span className="w-4 h-[2px] rounded-full bg-[color:var(--primary)]" />
                <span className="text-[color:var(--primary)] font-bold text-[11px] uppercase tracking-[0.3em]">
                  {data.subtitle}
                </span>
              </div>
            )}

            {/* Title */}
            {data.title && (
              <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-bold text-[color:var(--ink-900)] mb-4 tracking-tight leading-[1.13] cwis-item cwis-item-delay-1">
                {data.title}
              </h2>
            )}

            {/* Animated accent bar */}
            <div className="overflow-hidden mb-6 cwis-item cwis-item-delay-2">
              <div className="h-[3px] w-16 rounded-full bg-gradient-to-r from-[color:var(--primary)] to-orange-300 cwis-bar" />
            </div>

            {/* Description */}
            {data.description && (
              <p className="text-[15px] text-slate-500 mb-6 leading-[1.8] cwis-item cwis-item-delay-3">
                {data.description}
              </p>
            )}

            {/* Content paragraphs */}
            {data.content && data.content.length > 0 && (
              <div className="space-y-3.5 mb-6 cwis-item cwis-item-delay-3">
                {data.content
                  .filter(
                    (p: unknown): p is string =>
                      typeof p === "string" && p.trim() !== "",
                  )
                  .map((para: string, i: number) => (
                    <p
                      key={i}
                      className="text-slate-500 leading-[1.8] text-sm md:text-[15px]"
                    >
                      {para}
                    </p>
                  ))}
              </div>
            )}

            {/* Points / Checklist */}
            {data.points && data.points.length > 0 && (
              <ul className="space-y-3 mb-8">
                {data.points.map((point, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3.5 cwis-item"
                    style={{
                      animationDelay: `${0.35 + i * 0.07}s`,
                    }}
                  >
                    {/* Animated check icon */}
                    <span className="relative shrink-0 mt-0.5 w-5 h-5 rounded-full bg-[color:var(--primary)]/10 flex items-center justify-center group/check overflow-hidden">
                      <svg
                        width="10"
                        height="10"
                        viewBox="0 0 10 10"
                        fill="none"
                        className="relative z-10 transition-transform duration-300 group-hover/check:scale-110"
                      >
                        <path
                          d="M2 5.5L4 7.5L8 3"
                          stroke="var(--primary)"
                          strokeWidth="1.6"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                    <span className="text-slate-700 text-sm md:text-[15px] font-medium leading-snug">
                      {point}
                    </span>
                  </li>
                ))}
              </ul>
            )}

            {/* CTA Buttons */}
            {((primaryCta && primaryCta.label?.trim()) ||
              (secondaryCta && secondaryCta.label?.trim())) && (
              <div className="flex flex-wrap items-center gap-3 cwis-item cwis-item-delay-4">
                {primaryCta && primaryCta.label?.trim() && (
                  <Link
                    href={primaryCta.href || primaryCta.link || "#"}
                    className="group inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-[color:var(--primary)] text-white font-semibold text-sm tracking-wide hover:bg-[color:var(--primary)]/90 transition-all duration-300 shadow-lg shadow-[color:var(--primary)]/25 hover:shadow-[color:var(--primary)]/40 hover:-translate-y-[1px] active:translate-y-0"
                  >
                    <span>{primaryCta.label}</span>
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 14 14"
                      fill="none"
                      className="transition-transform duration-300 group-hover:translate-x-0.5"
                    >
                      <path
                        d="M2 7h10M8 3l4 4-4 4"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </Link>
                )}
                {secondaryCta && secondaryCta.label?.trim() && (
                  <Link
                    href={secondaryCta.href || secondaryCta.link || "#"}
                    className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-full border border-slate-200 text-slate-600 font-semibold text-sm tracking-wide hover:border-[color:var(--primary)]/30 hover:text-[color:var(--primary)] bg-white transition-all duration-300 hover:-translate-y-[1px] active:translate-y-0"
                  >
                    {secondaryCta.label}
                  </Link>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── Keyframe animations ── */}
      <style>{`
        /* Image side: slide in from the outer edge */
        .cwis-image-side {
          animation: cwis-slide-in-image 0.8s cubic-bezier(0.16, 1, 0.3, 1) both;
        }
        @keyframes cwis-slide-in-image {
          from { opacity: 0; transform: translateX(-32px); }
          to   { opacity: 1; transform: translateX(0); }
        }

        /* Badge pop-up */
        .cwis-badge {
          animation: cwis-pop 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) 0.5s both;
        }
        @keyframes cwis-pop {
          from { opacity: 0; transform: scale(0.8) translateY(8px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }

        /* Content side: fade + slide up */
        .cwis-content-side {
          animation: cwis-fade-up 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.15s both;
        }
        @keyframes cwis-fade-up {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* Each content item — staggered */
        .cwis-item {
          animation: cwis-fade-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) both;
          animation-delay: 0.2s;
        }
        .cwis-item-delay-1 { animation-delay: 0.25s; }
        .cwis-item-delay-2 { animation-delay: 0.3s; }
        .cwis-item-delay-3 { animation-delay: 0.35s; }
        .cwis-item-delay-4 { animation-delay: 0.45s; }

        /* Accent bar wipe-in */
        .cwis-bar {
          animation: cwis-wipe 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.3s both;
          transform-origin: left;
        }
        @keyframes cwis-wipe {
          from { transform: scaleX(0); }
          to   { transform: scaleX(1); }
        }
      `}</style>
    </section>
  );
}

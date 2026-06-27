"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { getImageUrl } from "@/lib/utils";
import Reveal from "@/components/site/Reveal";

interface StatData {
  value: string;
  label: string;
  subline_1?: string;
  subline?: string;
  subTitle?: string;
  subtitle?: string;
}

interface StatsContentSectionProps {
  data: {
    title?: string;
    subtitle?: string;
    contentTitle?: string;
    tagline?: string;
    description?: string;
    points?: string[];
    image?: {
      fileUrl: string;
      altText?: string;
    };
    badge?: string | { label: string };
    stats?: StatData[];
  };
}

function parseStatValue(valueStr: string) {
  // Strip commas first
  const cleanStr = valueStr.replace(/,/g, "");
  // Find the first sequence of numbers (including optional decimals)
  const match = cleanStr.match(/(\d+(\.\d+)?)/);
  if (!match)
    return {
      prefix: "",
      target: 0,
      suffix: valueStr,
      formatCommas: false,
      isFloat: false,
    };

  const targetNum = parseFloat(match[0]);
  const isFloat = match[0].includes(".");
  const numIndex = cleanStr.indexOf(match[0]);
  const prefix = valueStr.substring(0, numIndex);
  const suffix = valueStr.substring(numIndex + match[0].length);
  const formatCommas = valueStr.includes(",");

  return { prefix, target: targetNum, suffix, formatCommas, isFloat };
}

interface AnimatedCounterProps {
  value: string;
}

function AnimatedCounter({ value }: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [currentVal, setCurrentVal] = useState("0");

  const { prefix, target, suffix, formatCommas, isFloat } =
    parseStatValue(value);

  useEffect(() => {
    if (!isInView) return;

    let startTime: number | null = null;
    const duration = 2000; // 2 seconds

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      // Easing: easeOutQuad
      const easeProgress = progress * (2 - progress);
      const current = easeProgress * target;

      let formattedNum = isFloat
        ? current.toFixed(1)
        : Math.floor(current).toString();
      if (formatCommas && !isFloat) {
        formattedNum = Math.floor(current).toLocaleString("en-US");
      }

      setCurrentVal(formattedNum);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        let finalNum = isFloat ? target.toFixed(1) : target.toString();
        if (formatCommas && !isFloat) {
          finalNum = target.toLocaleString("en-US");
        }
        setCurrentVal(finalNum);
      }
    };

    requestAnimationFrame(animate);
  }, [isInView, target, formatCommas, isFloat]);

  return (
    <span
      ref={ref}
      className="inline-flex items-baseline font-serif select-none text-[color:var(--primary)]"
    >
      {prefix && (
        <span className="text-2xl md:text-3xl font-semibold mr-1 self-center">
          {prefix}
        </span>
      )}
      <span className="text-5xl md:text-[56px] font-bold tracking-tight">
        {currentVal}
      </span>
      {suffix && (
        <span className="text-3xl md:text-4xl font-light ml-0.5 align-baseline inline-block translate-y-[-0.05em]">
          {suffix}
        </span>
      )}
    </span>
  );
}

export default function StatsContentSection({
  data,
}: StatsContentSectionProps) {
  // Parse dynamic dual-color title
  const titleText = data.contentTitle || data.title || "";
  let titlePrefix = titleText;
  let titleHighlight = "";

  if (titleText.includes(" — ")) {
    const parts = titleText.split(" — ");
    titlePrefix = parts[0];
    titleHighlight = parts[1];
  } else if (titleText.includes(" - ")) {
    const parts = titleText.split(" - ");
    titlePrefix = parts[0];
    titleHighlight = parts[1];
  }

  // Resolve eyebrow tagline
  const eyebrowText = data.tagline || data.subtitle || "";

  // Resolve badge text safely
  const badgeText =
    typeof data.badge === "object" && data.badge
      ? data.badge.label
      : typeof data.badge === "string"
        ? data.badge
        : "";

  return (
    <section className="bg-white overflow-hidden w-full">
      {/* Top Stats Cards Banner */}
      {data.stats && data.stats.length > 0 && (
        <div className="bg-gradient-to-b from-[#FFFAF2] to-white py-16 md:py-20 border-b border-slate-100/50">
          <div className="container mx-auto px-6 max-w-7xl">
            <Reveal>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                {data.stats.map((stat: StatData, index: number) => {
                  const subline =
                    stat.subline_1 ||
                    stat.subline ||
                    stat.subTitle ||
                    stat.subtitle ||
                    "";
                  return (
                    <div
                      key={index}
                      className="bg-white rounded-[24px] p-6 sm:p-8 shadow-[0_10px_30px_rgba(0,0,0,0.02)] border border-slate-100/60 flex flex-col items-center justify-center text-center hover:shadow-[0_15px_40px_rgba(0,0,0,0.04)] hover:-translate-y-0.5 transition-all duration-300 min-h-[160px]"
                    >
                      <div className="leading-none mb-3">
                        <AnimatedCounter value={stat.value} />
                      </div>
                      <p className="text-slate-600 text-[15px] sm:text-[16px] font-medium mt-3 font-serif">
                        {stat.label}
                      </p>
                      {subline && (
                        <p className="text-slate-400 text-[11px] sm:text-[12px] mt-1 font-serif">
                          {subline}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            </Reveal>
          </div>
        </div>
      )}

      {/* Main Split Section */}
      {data.description && (
        <div className="py-16 md:py-24 max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-12 lg:gap-16 items-center">
          {/* Left Column: Content */}
          <Reveal>
            <div className="text-left">
              {eyebrowText && (
                <span className="text-[color:var(--primary)] font-semibold text-[13px] uppercase tracking-wider mb-3.5 block">
                  — {eyebrowText}
                </span>
              )}
              <h3 className="text-3xl sm:text-4xl lg:text-[44px] font-bold leading-[1.15] text-[color:var(--ink-900)] tracking-tight mb-5">
                {titlePrefix}
                {titleHighlight && (
                  <span className="text-[color:var(--primary)]">
                    {" "}
                    — {titleHighlight}
                  </span>
                )}
              </h3>
              <p className="text-slate-500 text-[16px] leading-relaxed mb-6 font-normal">
                {data.description}
              </p>
              {data.points && data.points.length > 0 && (
                <ul className="space-y-3.5 mt-6">
                  {data.points.map((pt: string, idx: number) => (
                    <li
                      key={idx}
                      className="flex items-start gap-3.5 text-[15px] text-slate-700"
                    >
                      <span className="w-5 h-5 rounded-full bg-[color:var(--primary)] text-white flex items-center justify-center text-[10px] shrink-0 font-bold mt-0.5 shadow-sm select-none">
                        ✓
                      </span>
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </Reveal>

          {/* Right Column: Image and Badge */}
          {data.image?.fileUrl && (
            <Reveal>
              <div className="relative w-full pl-4 md:pl-6 lg:pl-8">
                {/* Vertical Orange decorative border stripe */}
                <div className="absolute left-0 top-1/4 bottom-1/4 w-1 bg-[color:var(--primary)] rounded-full z-10" />

                <div className="relative aspect-[4/3] w-full rounded-[32px] overflow-hidden bg-slate-50 border border-slate-100/50 shadow-xl">
                  <Image
                    src={getImageUrl(data.image.fileUrl)}
                    alt={data.image.altText || "Expertise Care"}
                    fill
                    className="object-cover"
                    quality={90}
                  />
                </div>

                {/* Floating Certification Badge */}
                {badgeText && (
                  <div className="absolute -bottom-6 left-10 md:left-12 bg-white rounded-2xl shadow-2xl border border-slate-100 p-5 w-[220px] z-20">
                    <p className="text-[10px] uppercase tracking-wider text-[color:var(--primary)] font-bold tracking-widest">
                      Certified
                    </p>
                    <p className="font-display text-[18px] font-bold leading-tight mt-1 text-[color:var(--ink-900)]">
                      {badgeText}
                    </p>
                  </div>
                )}
              </div>
            </Reveal>
          )}
        </div>
      )}
    </section>
  );
}

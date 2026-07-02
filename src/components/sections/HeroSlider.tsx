/* eslint-disable @next/next/no-img-element */
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import * as LucideIcons from "lucide-react";
import {
  ArrowUpRight,
  Heart,
  BadgeCheck,
  Sparkles,
  Phone,
  ShieldCheck,
  Star,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Reveal from "@/components/site/Reveal";
import { getImageUrl, getSettingValue } from "@/lib/utils";

interface SlideCTA {
  label: string;
  href: string;
}

interface SlideImage {
  id?: string;
  fileUrl: string;
  altText?: string;
}

interface SlideData {
  id?: string;
  image?: SlideImage | string;
  subtitle?: string;
  description?: string;
  badge?: string;
  primaryCta?: SlideCTA;
  secondaryCta?: SlideCTA;
  titlePrefix?: string;
  titleHighlight?: string;
}

interface HeroSliderProps {
  data: {
    slides?: SlideData[];
    subtitle?: string;
    description?: string;
    badge?: string;
    primaryCta?: SlideCTA;
    secondaryCta?: SlideCTA;
    titlePrefix?: string;
    titleHighlight?: string;
    image?: SlideImage | string;
    bottomItems?: Array<{
      title: string;
      icon?: string;
    }>;
    savedKidsTag?: {
      show?: boolean;
      label?: string;
      value?: string;
      avatars?: string;
    };
    nicuTag?: {
      show?: boolean;
      label?: string;
      value?: string;
      stars?: number;
    };
  };
  settings?: Array<{ key: string; value: string }>;
  lang?: string;
}

interface ProcessedSlide {
  badge: string;
  titlePrefix: string;
  titleHighlight: string;
  description: string;
  image: string;
  primaryCta: SlideCTA | null;
  secondaryCta: SlideCTA | null;
}

export default function HeroSlider({ data, settings }: HeroSliderProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const phone = getSettingValue(settings, "hospital_phone");
  const phoneHref = phone ? `tel:${phone.replace(/\s+/g, "")}` : "";

  let rawSlides: SlideData[] = data?.slides || [];

  if (
    rawSlides.length === 0 &&
    (data?.titleHighlight || data?.image || data?.titlePrefix)
  ) {
    rawSlides = [
      {
        titlePrefix: data.titlePrefix,
        titleHighlight: data.titleHighlight,
        subtitle: data.subtitle || data.description,
        image: data.image,
        primaryCta: data.primaryCta,
        secondaryCta: data.secondaryCta,
        badge: data.badge,
      },
    ];
  }

  let slides: ProcessedSlide[] = rawSlides.map((slide) => {
    let imageSrc = "";
    if (slide.image) {
      if (typeof slide.image === "object") {
        imageSrc = slide.image.fileUrl ? getImageUrl(slide.image.fileUrl) : "";
      } else {
        imageSrc = getImageUrl(slide.image);
      }
    }

    return {
      badge: slide.badge || "",
      titlePrefix: slide.titlePrefix || "",
      titleHighlight: slide.titleHighlight || "",
      description: slide.description || slide.subtitle || "",
      image: imageSrc,
      primaryCta:
        slide.primaryCta?.label && slide.primaryCta?.href
          ? slide.primaryCta
          : null,
      secondaryCta:
        slide.secondaryCta?.label && slide.secondaryCta?.href
          ? slide.secondaryCta
          : null,
    };
  });

  slides = slides.map((s) => {
    if (
      s.secondaryCta &&
      (s.secondaryCta.href === "#phone" || !s.secondaryCta.href) &&
      phone
    ) {
      return {
        ...s,
        secondaryCta: {
          label: s.secondaryCta.label,
          href: phoneHref,
        },
      };
    }
    return s;
  });

  const getIcon = (iconName?: string): LucideIcon => {
    if (!iconName) return LucideIcons.BadgeCheck;

    const formattedName = iconName
      .toLowerCase()
      .replace(/-./g, (x) => x[1].toUpperCase())
      .replace(/^\w/, (c) => c.toUpperCase());

    const IconComponent =
      (LucideIcons as unknown as Record<string, LucideIcon>)[formattedName] ||
      (LucideIcons.icons as unknown as Record<string, LucideIcon>)?.[
        formattedName
      ];

    return IconComponent || LucideIcons.BadgeCheck;
  };

  useEffect(() => {
    if (slides.length <= 1 || isHovered) return;
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % slides.length);
    }, 6500);
    return () => clearInterval(timer);
  }, [slides.length, isHovered]);

  if (slides.length === 0) {
    return null;
  }

  const s = slides[activeIndex];

  return (
    <section
      data-testid="hero_slider"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative pt-24 md:pt-28 lg:pt-36 pb-12 overflow-hidden bg-[#FBF7F1] w-full"
    >
      <div
        className="absolute inset-0 -z-10 pointer-events-none"
        style={{
          background:
            "radial-gradient(60% 60% at 80% 0%, #FFE7D1 0%, transparent 60%), radial-gradient(50% 50% at 0% 100%, #DCEEFE 0%, transparent 60%), #FBF7F1",
        }}
      />
      <div className="max-w-[1280px] mx-auto px-6 grid lg:grid-cols-[1.05fr_0.95fr] gap-10 items-center">
        {/* text content */}
        <div>
          <Reveal>
            <div className="min-h-[32px]">
              <AnimatePresence mode="wait">
                {s.badge ? (
                  <motion.div
                    key={`badge-${activeIndex}`}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.35 }}
                  >
                    <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[12px] tracking-wider uppercase font-bold bg-white border border-[color:var(--line)] shadow-sm">
                      <span className="w-2 h-2 rounded-full bg-[color:var(--leaf-500)] animate-pulse" />{" "}
                      {s.badge}
                    </span>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </div>
          </Reveal>

          <AnimatePresence mode="wait">
            <motion.h1
              key={activeIndex}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.55 }}
              className=" mt-6 text-[color:var(--ink-900)] text-3xl sm:text-4xl md:text-4xl lg:text-[54px] leading-[1.15]"
            >
              {s.titlePrefix}{" "}
              <span className="relative inline-block mt-1 sm:mt-0">
                <span
                  className="relative z-10 font-bold"
                  style={{
                    background: "linear-gradient(120deg,#F26A1B,#D2540F)",
                    WebkitBackgroundClip: "text",
                    color: "transparent",
                  }}
                >
                  {s.titleHighlight}
                </span>
                {/* <svg
                  viewBox="0 0 320 16"
                  className="absolute -bottom-2 left-0 w-full"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M2 10 C 80 2, 240 18, 318 6"
                    stroke="#F26A1B"
                    strokeWidth="3"
                    fill="none"
                    strokeLinecap="round"
                    opacity="0.55"
                  />
                </svg> */}
              </span>
            </motion.h1>
          </AnimatePresence>

          <Reveal delay={0.15}>
            <p className="mt-6 max-w-xl text-[16px] sm:text-[17px] leading-[1.65] text-[color:var(--muted)]">
              {s.description}
            </p>
          </Reveal>

          <Reveal delay={0.25}>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              {s.primaryCta && (
                <Link
                  href={s.primaryCta.href}
                  className="group inline-flex items-center gap-2 px-7 py-4 rounded-full text-white font-semibold shadow-[0_18px_36px_-12px_rgba(242,106,27,0.7)] hover:shadow-[0_22px_44px_-12px_rgba(242,106,27,0.9)] transition duration-300"
                  style={{
                    background:
                      "linear-gradient(120deg,#FF8C3D,#F26A1B 55%,#C2480C)",
                  }}
                >
                  {s.primaryCta.label}{" "}
                  <ArrowUpRight
                    size={18}
                    className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                  />
                </Link>
              )}
              {s.secondaryCta && (
                <a
                  href={s.secondaryCta.href}
                  className="inline-flex items-center gap-2 px-6 py-4 rounded-full bg-white border border-[color:var(--line)] font-semibold text-[color:var(--ink-900)] hover:border-[color:var(--ink-900)] transition duration-300"
                >
                  <Phone size={16} /> {s.secondaryCta.label}
                </a>
              )}
            </div>
          </Reveal>

          <Reveal delay={0.35}>
            <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 text-[13px] text-[color:var(--muted)]">
              {data.bottomItems && data.bottomItems.length > 0 ? (
                data.bottomItems.map((item, idx) => {
                  const Icon = getIcon(item.icon);
                  return (
                    <span key={idx} className="flex items-center gap-2">
                      <Icon
                        size={16}
                        className="text-[color:var(--leaf-500)]"
                      />{" "}
                      {item.title}
                    </span>
                  );
                })
              ) : (
                <>
                  <span className="flex items-center gap-2">
                    <BadgeCheck
                      size={16}
                      className="text-[color:var(--leaf-500)]"
                    />{" "}
                    NABH-compliant care
                  </span>
                  <span className="flex items-center gap-2">
                    <ShieldCheck
                      size={16}
                      className="text-[color:var(--leaf-500)]"
                    />{" "}
                    Cashless · 30+ insurers
                  </span>
                </>
              )}
            </div>
          </Reveal>

          {/* slide indicators */}
          {slides.length > 1 && (
            <div className="mt-10 flex items-center gap-2">
              {slides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveIndex(idx)}
                  aria-label={`slide ${idx + 1}`}
                  className="h-1.5 rounded-full transition-all duration-300 cursor-pointer"
                  style={{
                    width: idx === activeIndex ? 38 : 14,
                    background: idx === activeIndex ? "#F26A1B" : "#D9CDB9",
                  }}
                />
              ))}
            </div>
          )}
        </div>

        {/* visual stack */}
        <div className="relative h-[520px] hidden lg:block">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ scale: 1.05, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="absolute inset-0 rounded-[40px] overflow-hidden bg-[color:var(--bone)]"
            >
              <Image
                src={s.image}
                alt=""
                fill
                priority
                className="w-full h-full object-cover"
                quality={90}
              />
              <div className="absolute inset-0 bg-black/5 mix-blend-multiply" />
            </motion.div>
          </AnimatePresence>

          {/* saved kids tag */}
          {(!data.savedKidsTag || data.savedKidsTag.show !== false) && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="absolute -left-3 bottom-4 bg-white rounded-2xl p-3 shadow-xl border border-[color:var(--line)] w-[190px] z-20"
            >
              <div className="flex items-center gap-2">
                <span className="w-7 h-7 rounded-full bg-[color:var(--orange-100)] grid place-items-center text-[color:var(--orange-600)] flex-shrink-0">
                  <Heart size={13} />
                </span>
                <div>
                  <p className="text-[9px] uppercase tracking-wider text-[color:var(--muted)]">
                    {data.savedKidsTag?.label || "Saved this year"}
                  </p>
                  <p className="font-display text-[16px] font-bold leading-none mt-0.5">
                    {data.savedKidsTag?.value || "7,500+ kids"}
                  </p>
                </div>
              </div>
              <div className="mt-2.5 flex -space-x-1.5">
                {[1, 2, 3, 4].map((n) => (
                  <img
                    key={n}
                    src={`https://i.pravatar.cc/60?img=${n + 10}`}
                    className="w-6 h-6 rounded-full border-2 border-white object-cover"
                    alt=""
                  />
                ))}
                <span className="w-6 h-6 rounded-full bg-[color:var(--ink-900)] text-white text-[9px] grid place-items-center border-2 border-white font-semibold">
                  {data.savedKidsTag?.avatars || "+9k"}
                </span>
              </div>
            </motion.div>
          )}

          {/* level 3 nicu certification tag */}
          {(!data.nicuTag || data.nicuTag.show !== false) && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.55 }}
              className="absolute -right-3 top-4 bg-[color:var(--ink-900)] text-white rounded-2xl p-3 w-[165px] shadow-xl z-20"
            >
              <div className="flex items-center justify-between">
                <p className="text-[9px] uppercase tracking-wider text-white/60">
                  {data.nicuTag?.label || "Level 3 NICU"}
                </p>
                <Sparkles
                  size={12}
                  className="text-[color:var(--orange-400)]"
                />
              </div>
              <p className="font-display text-[14px] mt-1.5 leading-tight font-semibold">
                {data.nicuTag?.value ||
                  "Highest level of neonatal critical care"}
              </p>
              <div className="mt-2.5 flex items-center gap-0.5 text-[color:var(--orange-300)]">
                {Array.from({
                  length:
                    typeof data.nicuTag?.stars === "number"
                      ? data.nicuTag.stars
                      : 5,
                }).map((_, n) => (
                  <Star key={n} size={10} fill="currentColor" />
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}

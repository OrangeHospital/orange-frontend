"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { getImageUrl } from "@/lib/utils";

interface SlideImage {
  id?: string;
  fileUrl: string;
  altText?: string;
}

interface SlideCTA {
  label: string;
  href: string;
}

interface SlideData {
  id?: string;
  image?: SlideImage | string;
  subtitle?: string;
  primaryCta?: SlideCTA;
  secondaryCta?: SlideCTA;
  titlePrefix?: string;
  titleHighlight?: string;
}

interface HeroSliderProps {
  data: {
    slides?: SlideData[];
    subtitle?: string;
    primaryCta?: SlideCTA;
    secondaryCta?: SlideCTA;
    titlePrefix?: string;
    titleHighlight?: string;
    image?: SlideImage | string;
  };
  lang?: string;
}

interface ProcessedSlide {
  titlePrefix: string;
  titleHighlight: string;
  subtitle: string;
  image: string;
  primaryCta: SlideCTA | null;
  secondaryCta: SlideCTA | null;
}

export default function HeroSlider({ data }: HeroSliderProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  // Get slides from backend CMS data
  let rawSlides: SlideData[] = data?.slides || [];
  if (
    rawSlides.length === 0 &&
    (data?.titleHighlight || data?.image || data?.titlePrefix)
  ) {
    rawSlides = [
      {
        titlePrefix: data.titlePrefix,
        titleHighlight: data.titleHighlight,
        subtitle: data.subtitle,
        image: data.image,
        primaryCta: data.primaryCta,
        secondaryCta: data.secondaryCta,
      },
    ];
  }

  const slides: ProcessedSlide[] = rawSlides.map((slide) => {
    // Resolve image URL
    let imageSrc = "/hero_baby.png";
    if (slide.image) {
      if (typeof slide.image === "object") {
        imageSrc = slide.image.fileUrl
          ? getImageUrl(slide.image.fileUrl)
          : "/hero_baby.png";
      } else {
        imageSrc = getImageUrl(slide.image);
      }
    }

    return {
      titlePrefix: slide.titlePrefix || "",
      titleHighlight: slide.titleHighlight || "",
      subtitle: slide.subtitle || "",
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

  // Auto-play every 5 seconds, unless hovered
  useEffect(() => {
    if (slides.length <= 1 || isHovered) return;
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length, isHovered]);

  if (slides.length === 0) {
    return null;
  }

  return (
    <section
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative w-full h-[75vh] md:h-[80vh] lg:h-[85vh] min-h-[500px] md:min-h-[600px] overflow-hidden bg-slate-900"
    >
      {/* Slides Container with Hardware-Accelerated Cross-fade */}
      <div className="absolute inset-0 w-full h-full">
        {slides.map((slide: ProcessedSlide, index: number) => {
          const isActive = index === activeIndex;
          return (
            <div
              key={index}
              className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
                isActive
                  ? "opacity-100 z-10"
                  : "opacity-0 z-0 pointer-events-none"
              }`}
            >
              {/* Background Image with horizontal gradient for maximum legibility */}
              <div className="absolute inset-0">
                <Image
                  src={slide.image}
                  alt={slide.titleHighlight}
                  fill
                  priority={index === 0}
                  className="object-cover object-center"
                  quality={95}
                />
                {/* Horizontal Gradient Overlay for text contrast */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/45 to-transparent z-10" />
                {/* Subtle bottom vignette to blend sections */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent z-10" />
              </div>

              {/* Content Box */}
              <div className="container relative z-20 mx-auto px-6 lg:px-8 h-full flex items-center max-w-7xl">
                <div className="max-w-md md:max-w-lg lg:max-w-xl text-left">
                  {/* Title */}
                  <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-light leading-[1.3] text-white tracking-wide">
                    {slide.titlePrefix}{" "}
                    <span className="block font-semibold text-white mt-2 text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
                      {slide.titleHighlight}
                    </span>
                  </h1>

                  {/* Subtitle */}
                  {slide.subtitle && (
                    <p className="mt-6 text-sm sm:text-base md:text-lg text-slate-200 font-light leading-relaxed max-w-md sm:max-w-lg">
                      {slide.subtitle}
                    </p>
                  )}

                  {/* Call to Actions */}
                  <div className="mt-10 flex flex-wrap gap-4 items-center">
                    {slide.primaryCta && (
                      <Link
                        href={slide.primaryCta.href}
                        className="inline-block bg-[#F7A707] hover:bg-[#e69e06] text-white px-7 py-3.5 rounded-lg text-sm sm:text-base font-bold shadow-lg shadow-[#F7A707]/20 transition-all duration-300 transform hover:-translate-y-0.5"
                      >
                        {slide.primaryCta.label}
                      </Link>
                    )}
                    {slide.secondaryCta && (
                      <Link
                        href={slide.secondaryCta.href}
                        className="inline-block bg-white/10 hover:bg-white/15 text-white border border-white/20 px-7 py-3.5 rounded-lg text-sm sm:text-base font-bold backdrop-blur-sm transition-all duration-300 transform hover:-translate-y-0.5"
                      >
                        {slide.secondaryCta.label}
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Slider Indicators */}
      {slides.length > 1 && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex gap-2">
          {slides.map((_: ProcessedSlide, index: number) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer hover:bg-[#F7A707]/90 ${
                index === activeIndex ? "w-8 bg-[#F7A707]" : "w-2.5 bg-white/40"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </section>
  );
}

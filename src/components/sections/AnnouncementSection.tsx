"use client";

import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  TouchEvent,
} from "react";
import Image from "next/image";
import Link from "next/link";
import { CheckCircle2, ChevronLeft, ChevronRight } from "lucide-react";
import Reveal from "@/components/site/Reveal";

interface AnnouncementItem {
  badgeText?: string;
  headline?: string;
  shortDescription?: string;
  points?: string[];
  image?: MediaAsset;
  link?: string;
}

interface AnnouncementSectionProps {
  data: PageSection["sectionData"];
}

export default function AnnouncementSection({
  data,
}: AnnouncementSectionProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [cardsVisible, setCardsVisible] = useState(1);
  const carouselRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number | null>(null);

  const items: AnnouncementItem[] = Array.isArray(data?.items)
    ? data.items
    : [];

  // Responsive cards-visible based on viewport (showing 1 card for announcement slider)
  useEffect(() => {
    const update = () => {
      if (window.innerWidth < 1024) setCardsVisible(1);
      else setCardsVisible(1); // Set to 1 for full card carousel focus, but can support more if needed
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const maxIndex = Math.max(0, items.length - cardsVisible);

  const prev = useCallback(
    () => setCurrentIndex((i) => Math.max(0, i - 1)),
    [],
  );

  const next = useCallback(
    () => setCurrentIndex((i) => Math.min(maxIndex, i + 1)),
    [maxIndex],
  );

  // Auto-scroll — pauses on hover
  useEffect(() => {
    if (items.length <= cardsVisible) return;
    const timer = setInterval(() => {
      if (!paused) {
        setCurrentIndex((i) => (i >= maxIndex ? 0 : i + 1));
      }
    }, 5000);
    return () => clearInterval(timer);
  }, [items.length, maxIndex, paused, cardsVisible]);

  if (items.length === 0) return null;

  const GAP = 24;

  const renderCard = (item: AnnouncementItem) => {
    const cardContent = (
      <div className="flex flex-col md:flex-row bg-white rounded-2xl border border-slate-100 shadow-[0_4px_24px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300 overflow-hidden w-full max-w-4xl mx-auto group">
        {/* Left side: Image */}
        {item.image?.fileUrl && (
          <div className="relative md:w-2/5 min-h-[220px] md:min-h-[300px] w-full shrink-0 overflow-hidden">
            <Image
              src={item.image.fileUrl}
              alt={item.image.altText || item.headline || "Announcement Image"}
              fill
              sizes="(max-width: 768px) 100vw, 40vw"
              className="object-cover group-hover:scale-[1.02] transition-transform duration-500"
            />
          </div>
        )}

        {/* Right side: Details */}
        <div className="p-6 md:p-8 flex flex-col justify-center flex-grow text-left">
          {/* Title / Headline */}
          {item.headline && (
            <h3 className="text-xl md:text-2xl font-bold  leading-tight mb-2 group-hover:text-[#F97316] transition-colors duration-200">
              {item.headline}
            </h3>
          )}

          {/* Badge / Subtitle */}
          {item.badgeText && (
            <p className="text-xs md:text-sm font-semibold text-[#7CB342] uppercase tracking-wide mb-4">
              {item.badgeText}
            </p>
          )}

          {/* Short Description */}
          {item.shortDescription && (
            <p className="text-slate-500 text-sm md:text-base leading-relaxed mb-4">
              {item.shortDescription}
            </p>
          )}

          {/* Points list */}
          {item.points && item.points.length > 0 && (
            <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 border-t border-slate-50 pt-4">
              {item.points.map((point, pIdx) => {
                const hasColon = point.includes(":");
                const parts = hasColon ? point.split(":") : [point];
                return (
                  <div
                    key={pIdx}
                    className="flex items-start gap-2 text-slate-600 text-xs md:text-sm"
                  >
                    <CheckCircle2 className="h-4.5 w-4.5 text-[#7CB342] shrink-0 mt-0.5" />
                    <span className="leading-snug">
                      {hasColon ? (
                        <>
                          <strong className="text-slate-800 font-bold">
                            {parts[0]}:
                          </strong>
                          {parts.slice(1).join(":")}
                        </>
                      ) : (
                        point
                      )}
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    );

    if (item.link) {
      return (
        <Link href={item.link} className="block cursor-pointer w-full">
          {cardContent}
        </Link>
      );
    }

    return cardContent;
  };

  return (
    <section className="py-16 sm:py-20  relative overflow-hidden w-full">
      {/* Decorative subtle background bubbles */}
      <div className="absolute right-0 top-0 w-72 h-72 bg-orange-100/30 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute left-0 bottom-0 w-72 h-72 bg-blue-50/30 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="container mx-auto px-4 sm:px-6 max-w-7xl relative z-10">
        {/* Section Header */}
        {(data?.title || data?.subtitle || data?.description) && (
          <Reveal>
            <div className="text-center mb-10 sm:mb-14 max-w-3xl mx-auto">
              {data.subtitle && (
                <span className="text-[#F97316] font-bold text-xs uppercase tracking-[0.18em] mb-3 block">
                  — {data.subtitle}
                </span>
              )}
              {data.title && (
                <h2 className="text-2xl sm:text-3xl lg:text-[44px] font-bold text-slate-900 tracking-tight leading-[1.15] mb-4">
                  {data.title}
                </h2>
              )}
              <div className="w-16 sm:w-20 h-1 bg-[#F97316] mx-auto mb-5 rounded-full" />
              {data.description && (
                <p className="text-slate-500 text-sm sm:text-base leading-relaxed">
                  {data.description}
                </p>
              )}
            </div>
          </Reveal>
        )}

        <div className="max-w-5xl mx-auto">
          {items.length === 1 ? (
            <Reveal>
              <div className="w-full flex justify-center">
                {renderCard(items[0])}
              </div>
            </Reveal>
          ) : (
            <Reveal>
              <div
                className="relative"
                onMouseEnter={() => setPaused(true)}
                onMouseLeave={() => setPaused(false)}
              >
                {/* Carousel track */}
                <div
                  className="overflow-hidden w-full"
                  ref={carouselRef}
                  onTouchStart={(e: TouchEvent) => {
                    touchStartX.current = e.touches[0].clientX;
                    setPaused(true);
                  }}
                  onTouchEnd={(e: TouchEvent) => {
                    if (touchStartX.current === null) return;
                    const delta =
                      touchStartX.current - e.changedTouches[0].clientX;
                    if (delta > 40) next();
                    else if (delta < -40) prev();
                    touchStartX.current = null;
                    setPaused(false);
                  }}
                >
                  <div
                    className="flex transition-transform duration-500 ease-in-out"
                    style={{
                      gap: `${GAP}px`,
                      transform: `translateX(calc(-${currentIndex} * (100% / ${cardsVisible} + ${GAP / cardsVisible}px)))`,
                    }}
                  >
                    {items.map((item, idx) => (
                      <div
                        key={idx}
                        className="w-full flex justify-center shrink-0"
                        style={{
                          flex: `0 0 calc(${100 / cardsVisible}% - ${(GAP * (cardsVisible - 1)) / cardsVisible}px)`,
                        }}
                      >
                        {renderCard(item)}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Slider Nav Buttons */}
                <button
                  onClick={prev}
                  disabled={currentIndex === 0}
                  aria-label="Previous announcement"
                  className="absolute -left-4 md:-left-6 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white border border-slate-200 shadow-md flex items-center justify-center text-slate-600 hover:bg-[#F97316] hover:text-white hover:border-[#F97316] transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed z-10"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={next}
                  disabled={currentIndex >= maxIndex}
                  aria-label="Next announcement"
                  className="absolute -right-4 md:-right-6 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white border border-slate-200 shadow-md flex items-center justify-center text-slate-600 hover:bg-[#F97316] hover:text-white hover:border-[#F97316] transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed z-10"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>

                {/* Dots Position Indicators */}
                <div className="flex justify-center gap-2 mt-6">
                  {Array.from({ length: maxIndex + 1 }).map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentIndex(i)}
                      aria-label={`Go to slide ${i + 1}`}
                      className={`rounded-full transition-all duration-300 ${
                        i === currentIndex
                          ? "w-6 h-2 bg-[#F97316]"
                          : "w-2 h-2 bg-slate-300 hover:bg-slate-400"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </Reveal>
          )}
        </div>
      </div>
    </section>
  );
}

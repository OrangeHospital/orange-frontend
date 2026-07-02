/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useEffect, useState, useRef, useCallback, TouchEvent } from "react";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import Reveal from "@/components/site/Reveal";

interface MapReview {
  id: string;
  reviewerName: string;
  rating: number;
  review: string;
  reviewDate?: string;
  profile_photo_url?: string;
}

interface ReviewSummary {
  averageRating: string;
  totalReviews: number;
}

interface MapReviewSectionProps {
  data: PageSection["sectionData"];
  initialReviews?: MapReview[];
  initialSummary?: ReviewSummary | null;
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`w-4 h-4 ${
            star <= rating
              ? "fill-[#F97316] text-[#F97316]"
              : "fill-slate-200 text-slate-200"
          }`}
        />
      ))}
    </div>
  );
}

function ReviewCard({ review }: { review: MapReview }) {
  const formattedDate = review.reviewDate
    ? new Date(review.reviewDate).toLocaleDateString("en-IN", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : null;

  return (
    <div className="flex flex-col h-full bg-white rounded-2xl border border-slate-100 shadow-[0_4px_24px_rgba(0,0,0,0.05)] p-6 relative overflow-hidden group hover:shadow-[0_8px_32px_rgba(249,115,22,0.10)] hover:-translate-y-1 transition-all duration-300">
      {/* Decorative quote icon */}
      <Quote className="absolute top-4 right-4 w-8 h-8 text-[#F97316]/10 fill-[#F97316]/10" />

      {/* Stars */}
      <div className="mb-3">
        <StarRating rating={review.rating} />
      </div>

      {/* Review text */}
      <p className="text-slate-600 text-sm leading-relaxed flex-grow line-clamp-4 mb-4">
        {review.review || "Great experience!"}
      </p>

      {/* Author row */}
      <div className="flex items-center gap-3 pt-3 border-t border-slate-100">
        <div className="min-w-0 flex-1">
          <p className="font-semibold text-slate-800 text-sm truncate">
            {review.reviewerName}
          </p>
          {formattedDate && (
            <p className="text-xs text-slate-400">{formattedDate}</p>
          )}
        </div>
        {/* Google icon */}
        <svg
          className="flex-shrink-0 w-5 h-5"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            fill="#4285F4"
          />
          <path
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            fill="#34A853"
          />
          <path
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            fill="#FBBC05"
          />
          <path
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            fill="#EA4335"
          />
        </svg>
      </div>
    </div>
  );
}

export default function MapReviewSection({
  data,
  initialReviews,
  initialSummary,
}: MapReviewSectionProps) {
  const [reviews, setReviews] = useState<MapReview[]>(initialReviews || []);
  const [summary, setSummary] = useState<ReviewSummary | null>(
    initialSummary || null,
  );
  const [loading, setLoading] = useState(initialReviews ? false : true);
  const [error, setError] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [cardsVisible, setCardsVisible] = useState(3);
  const carouselRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number | null>(null);

  // Responsive cards-visible based on viewport
  useEffect(() => {
    const update = () => {
      if (window.innerWidth < 640) setCardsVisible(1);
      else if (window.innerWidth < 1024) setCardsVisible(2);
      else setCardsVisible(3);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  useEffect(() => {
    if (data?.showGoogleReviews === false) {
      setLoading(false);
      return;
    }
    if (initialReviews && initialReviews.length > 0) {
      setLoading(false);
      return;
    }
    fetch("/api/map-reviews")
      .then((r) => {
        if (!r.ok) throw new Error("Failed");
        return r.json();
      })
      .then((json) => {
        const list: MapReview[] = Array.isArray(json?.reviews)
          ? json.reviews
          : Array.isArray(json)
            ? json
            : [];
        setReviews(list);
        if (json?.summary) setSummary(json.summary);
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [initialReviews, data?.showGoogleReviews]);

  const maxIndex = Math.max(0, reviews.length - cardsVisible);

  const prev = useCallback(
    () => setCurrentIndex((i) => Math.max(0, i - 1)),
    [],
  );
  const next = useCallback(
    () => setCurrentIndex((i) => Math.min(maxIndex, i + 1)),
    [maxIndex],
  );

  // Reset index when cards-visible changes (e.g. resize)
  useEffect(() => {
    setCurrentIndex((i) => Math.min(i, maxIndex));
  }, [maxIndex]);

  // Auto-scroll — pauses on hover
  useEffect(() => {
    if (reviews.length <= cardsVisible) return;
    const timer = setInterval(() => {
      if (!paused) {
        setCurrentIndex((i) => (i >= maxIndex ? 0 : i + 1));
      }
    }, 4000);
    return () => clearInterval(timer);
  }, [reviews.length, maxIndex, paused, cardsVisible]);

  const displayRating = summary?.averageRating
    ? parseFloat(summary.averageRating).toFixed(1)
    : null;
  const displayTotal = summary?.totalReviews ?? reviews.length;

  // Gap between cards (px)
  const GAP = 24;

  return (
    <section className="py-16 sm:py-20  relative overflow-hidden select-none w-full">
      <div className="container mx-auto px-4 sm:px-6 max-w-7xl relative z-10">
        {/* Header */}
        <Reveal>
          <div className="text-center mb-10 sm:mb-14 max-w-3xl mx-auto">
            {data?.subtitle && (
              <span className="text-[color:var(--primary)] font-bold text-xs uppercase tracking-[0.18em] mb-3 block">
                — {data.subtitle}
              </span>
            )}
            <h2 className="text-2xl sm:text-3xl lg:text-[44px] font-bold text-[color:var(--ink-900)] tracking-tight leading-[1.15] mb-4">
              {data?.title ?? "What Our Patients Say"}
            </h2>
            <div className="w-16 sm:w-20 h-1 bg-[color:var(--primary)] mx-auto mb-5 rounded-full" />
            {data?.description && (
              <p className="text-slate-500 text-sm sm:text-base leading-relaxed">
                {data.description}
              </p>
            )}

            {/* Rating summary */}
            {!loading &&
              (displayRating || reviews.length > 0) &&
              data?.showGoogleReviews !== false && (
                <div className="flex items-center justify-center gap-3 mt-5">
                  <div className="flex items-center gap-1.5 bg-white border border-slate-100 rounded-full px-4 py-2 shadow-sm">
                    <Star className="w-4 h-4 fill-[#F97316] text-[#F97316]" />
                    <span className="font-bold text-slate-800 text-sm">
                      {displayRating ?? "4.8"}
                    </span>
                    <span className="text-slate-400 text-xs">
                      ({displayTotal} reviews)
                    </span>
                  </div>
                </div>
              )}
          </div>
        </Reveal>

        {/* Loading state */}
        {loading && data?.showGoogleReviews !== false && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-48 rounded-2xl bg-slate-100 animate-pulse"
              />
            ))}
          </div>
        )}

        {/* Error state */}
        {error && !loading && (
          <div className="text-center text-slate-400 py-10">
            Unable to load reviews at this time.
          </div>
        )}

        {/* Reviews Carousel */}
        {!loading &&
          !error &&
          reviews.length > 0 &&
          data?.showGoogleReviews !== false && (
            <Reveal>
              <div
                className="relative"
                onMouseEnter={() => setPaused(true)}
                onMouseLeave={() => setPaused(false)}
              >
                {/* Carousel track — touch swipe support */}
                <div
                  className="overflow-hidden"
                  ref={carouselRef}
                  onTouchStart={(e: TouchEvent) => {
                    touchStartX.current = e.touches[0].clientX;
                    setPaused(true);
                  }}
                  onTouchEnd={(e: TouchEvent) => {
                    if (touchStartX.current === null) return;
                    const delta =
                      touchStartX.current - e.changedTouches[0].clientX;
                    if (delta > 40)
                      next(); // swipe left → next
                    else if (delta < -40) prev(); // swipe right → prev
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
                    {reviews.map((review, idx) => (
                      <div
                        key={idx}
                        style={{
                          flex: `0 0 calc(${100 / cardsVisible}% - ${(GAP * (cardsVisible - 1)) / cardsVisible}px)`,
                        }}
                      >
                        <ReviewCard review={review} />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Nav buttons — desktop only */}
                {reviews.length > cardsVisible && (
                  <>
                    <button
                      onClick={prev}
                      disabled={currentIndex === 0}
                      aria-label="Previous reviews"
                      className="hidden sm:flex absolute -left-5 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white border border-slate-200 shadow-md items-center justify-center text-slate-600 hover:bg-[color:var(--primary)] hover:text-white hover:border-[color:var(--primary)] transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed z-10"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={next}
                      disabled={currentIndex >= maxIndex}
                      aria-label="Next reviews"
                      className="hidden sm:flex absolute -right-5 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white border border-slate-200 shadow-md items-center justify-center text-slate-600 hover:bg-[color:var(--primary)] hover:text-white hover:border-[color:var(--primary)] transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed z-10"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </>
                )}

                {/* Dots — always visible for position indicator */}
                {reviews.length > cardsVisible && (
                  <div className="flex justify-center gap-2 mt-6">
                    {Array.from({ length: maxIndex + 1 }).map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setCurrentIndex(i)}
                        aria-label={`Go to slide ${i + 1}`}
                        className={`rounded-full transition-all duration-300 ${
                          i === currentIndex
                            ? "w-6 h-2 bg-[color:var(--primary)]"
                            : "w-2 h-2 bg-slate-300 hover:bg-slate-400"
                        }`}
                      />
                    ))}
                  </div>
                )}
              </div>
            </Reveal>
          )}
      </div>
    </section>
  );
}

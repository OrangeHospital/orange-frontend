"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { fetchSocial } from "@/lib/api";

interface HeroSectionProps {
  data: PageSection["sectionData"];
  lang?: string;
}

export default function HeroSection({ data }: HeroSectionProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [socials, setSocials] = useState<Social[]>([]);

  useEffect(() => {
    async function loadSocials() {
      try {
        const fetchedSocials = await fetchSocial();
        setSocials(fetchedSocials || []);
      } catch {
        setSocials([]);
      }
    }
    loadSocials();
  }, []);

  const getSocials = (key: string): string => {
    return socials.find((item) => item.socialKey === key)?.socialValue || "#";
  };

  // Robust array of slides using real assets from the project
  const slides = [
    {
      titlePrefix: "Ensure the good health of your little angels with",
      titleHighlight: "ORANGE HOSPITAL",
      subtitle: data.subtitle || "Neonatal & Pediatric Intensive Care Unit",
      image: "/hero_baby.png",
      primaryCta: data.primaryCta || {
        label: "Book Appointment",
        href: "/contact",
      },
      secondaryCta: data.secondaryCta || {
        label: "Our Facilities",
        href: "/facilities",
      },
    },
    {
      titlePrefix: "State-of-the-Art level 3 newborn care at",
      titleHighlight: "LEVEL 3 NICU & PICU",
      subtitle:
        "Gujarat's premier 50-bedded critical care facility for infants & children",
      image: "/nicu_expertise.png",
      primaryCta: data.primaryCta || {
        label: "Book Appointment",
        href: "/contact",
      },
      secondaryCta: data.secondaryCta || {
        label: "Our Facilities",
        href: "/facilities",
      },
    },
    {
      titlePrefix: "Equipped with advanced medical infrastructure and",
      titleHighlight: "MODERN INFRASTRUCTURE",
      subtitle:
        "First-of-its-kind isolated pediatric dialysis unit and cooling devices",
      image: "/icu_infrastructure.png",
      primaryCta: data.primaryCta || {
        label: "Book Appointment",
        href: "/contact",
      },
      secondaryCta: data.secondaryCta || {
        label: "Our Facilities",
        href: "/facilities",
      },
    },
  ];

  // Auto-play every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <section className="relative w-full h-[75vh] md:h-[80vh] lg:h-[85vh] min-h-[500px] md:min-h-[600px] overflow-hidden bg-slate-900">
      {/* Slides Container with Hardware-Accelerated Cross-fade */}
      <div className="absolute inset-0 w-full h-full">
        {slides.map((slide, index) => {
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
                  {/* Title (Clean Sans-Serif font, weight regular for prefix and semi-bold for hospital name) */}
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

      {/* Floating social sidebar on the right (matches screenshot exactly) */}
      <div className="absolute right-6 top-1/2 -translate-y-1/2 z-30 hidden md:flex flex-col gap-3">
        {[
          {
            icon: "facebook",
            color: "bg-[#1877F2]",
            url: getSocials("facebook"),
          },
          {
            icon: "instagram",
            color: "bg-gradient-to-tr from-[#FD1D1D] to-[#E1306C]",
            url: getSocials("instagram"),
          },
          {
            icon: "youtube",
            color: "bg-[#FF0000]",
            url: getSocials("youtube"),
          },
          {
            icon: "whatsapp",
            color: "bg-[#25D366]",
            url:
              getSocials("whatsapp") !== "#"
                ? getSocials("whatsapp")
                : "https://wa.me/919724305900",
          },
        ].map((item) => (
          <a
            key={item.icon}
            href={item.url}
            className={`flex h-10 w-10 items-center justify-center rounded-full text-white shadow-md hover:scale-110 transition-transform duration-300 ${item.color}`}
            aria-label={item.icon}
          >
            <span className="sr-only">{item.icon}</span>
            {item.icon === "facebook" && (
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z" />
              </svg>
            )}
            {item.icon === "instagram" && (
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
              </svg>
            )}
            {item.icon === "youtube" && (
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.498 6.163a3.003 3.003 0 00-2.11-2.11C19.518 3.545 12 3.545 12 3.545s-7.517 0-9.388.508a3.003 3.003 0 00-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 002.11 2.11c1.871.508 9.388.508 9.388.508s7.518 0 9.388-.508a3.003 3.003 0 002.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
            )}
            {item.icon === "whatsapp" && (
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.73-1.45L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.858-4.42 9.861-9.86.002-2.635-1.021-5.11-2.881-6.973-1.86-1.863-4.332-2.886-6.97-2.887-5.441 0-9.866 4.422-9.869 9.866-.001 1.776.471 3.512 1.365 5.06l-.994 3.633 3.725-.976-.263-.164z" />
              </svg>
            )}
          </a>
        ))}
      </div>

      {/* Slider Indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex gap-2">
        {slides.map((_, index) => (
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
    </section>
  );
}

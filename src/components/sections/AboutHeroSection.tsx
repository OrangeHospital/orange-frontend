"use client";

import Image from "next/image";
import Link from "next/link";

interface AboutHeroSectionProps {
  data: {
    title?: string;
    subtitle?: string;
  };
}

export default function AboutHeroSection({ data }: AboutHeroSectionProps) {
  const title = data.title || "About Us";

  return (
    <section className="relative w-full h-[35vh] min-h-[220px] md:h-[40vh] overflow-hidden bg-slate-950 flex items-center justify-center">
      {/* Background Image with Dark Premium Vignette */}
      <div className="absolute inset-0 z-0 opacity-40">
        <Image
          src="/icu_infrastructure.png"
          alt="Orange Children Hospital"
          fill
          priority
          className="object-cover object-center filter grayscale contrast-125"
          quality={90}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-900/60 to-slate-950" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto flex flex-col items-center gap-3">
        {/* Breadcrumb Path */}
        <nav className="flex items-center space-x-2 text-xs md:text-sm font-medium tracking-widest text-[#F7A707] uppercase">
          <Link
            href="/"
            className="hover:text-white transition-colors duration-200"
          >
            Home
          </Link>
          <span className="text-slate-500 font-light">/</span>
          <span className="text-slate-300 font-normal">{title}</span>
        </nav>

        {/* Title */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-white leading-tight tracking-wide mt-2">
          {title}
        </h1>

        {/* Dynamic bottom accent bar */}
        <div className="h-0.5 w-12 bg-[#F7A707] mt-4 rounded-full" />
      </div>
    </section>
  );
}

"use client";

import Image from "next/image";
import Link from "next/link";

const isValidImageUrl = (url?: string) => {
  if (!url) return false;
  return (
    url.startsWith("/") ||
    url.startsWith("http://") ||
    url.startsWith("https://") ||
    !url.includes(":")
  );
};

const getImageUrl = (url?: string) => {
  if (!url) return "";
  if (
    url.startsWith("/") ||
    url.startsWith("http://") ||
    url.startsWith("https://")
  ) {
    return url;
  }
  const fileBase =
    process.env.NEXT_PUBLIC_FILE_BASE_URL || "http://3.111.240.196:7071/share/";
  const base = fileBase.endsWith("/") ? fileBase : `${fileBase}/`;
  return `${base}${url}`;
};

interface AboutHeroSectionProps {
  data: {
    title?: string;
    subtitle?: string;
    photo?: {
      fileUrl: string;
      altText?: string;
    };
  };
}

export default function AboutHeroSection({ data }: AboutHeroSectionProps) {
  const title = data.title || "About Us";
  const heroImage =
    data.photo?.fileUrl && isValidImageUrl(data.photo.fileUrl)
      ? getImageUrl(data.photo.fileUrl)
      : "/icu_infrastructure.png";

  return (
    <section className="relative w-full h-[45vh] min-h-[320px] md:h-[50vh] overflow-hidden bg-slate-950 flex items-center justify-center">
      {/* Background Image with Dark Premium Vignette */}
      <div className="absolute inset-0 z-0 opacity-75">
        <Image
          src={heroImage}
          alt={data.photo?.altText || "Orange Children Hospital"}
          fill
          priority
          className="object-cover object-center"
          quality={95}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/60 via-slate-950/40 to-slate-950/80" />
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

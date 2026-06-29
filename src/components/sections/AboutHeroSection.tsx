"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Home, ChevronRight } from "lucide-react";
import { getImageUrl, isValidImageUrl } from "@/lib/utils";

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
    <section className="relative w-full h-[45vh] min-h-[320px] md:h-[45vh] overflow-hidden bg-[#0a0e1a] flex items-center justify-center">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={heroImage}
          alt={data.photo?.altText || "Orange Children Hospital"}
          fill
          priority
          className="object-cover object-center scale-105"
          quality={95}
        />
      </div>

      {/* Multi-layer premium overlay */}
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-[#0a0e1a]/75 via-[#0a0e1a]/50 to-[#0a0e1a]/90" />
      <div className="absolute inset-0 z-10 bg-gradient-to-r from-[#0a0e1a]/60 via-transparent to-transparent" />

      {/* Decorative orange glow blob */}
      <div
        className="absolute z-10 rounded-full pointer-events-none blur-3xl opacity-20"
        style={{
          width: 480,
          height: 480,
          background: "radial-gradient(circle, #F26A1B 0%, transparent 70%)",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      />

      {/* Animated grid pattern */}
      <div
        className="absolute inset-0 z-10 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      {/* Hero Content */}
      <div className="relative z-20 text-center px-6 max-w-4xl mx-auto flex flex-col items-center gap-4">
        {/* Breadcrumb */}
        <motion.nav
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-1.5 text-[11px] font-semibold tracking-[0.18em] uppercase"
        >
          <Link
            href="/"
            className="flex items-center gap-1 text-[#F7A707]/80 hover:text-[#F7A707] transition-colors duration-200"
          >
            <Home size={11} />
            <span>Home</span>
          </Link>
          <ChevronRight size={11} className="text-white/30" />
          <span className="text-white/50">{title}</span>
        </motion.nav>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.18 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.1] tracking-tight"
        >
          {title.split(" ").map((word, i, arr) =>
            i === arr.length - 1 ? (
              <span
                key={i}
                style={{
                  background: "linear-gradient(120deg,#FF8C3D,#F26A1B)",
                  WebkitBackgroundClip: "text",
                  color: "transparent",
                }}
              >
                {" "}
                {word}
              </span>
            ) : (
              <span key={i}>
                {i > 0 ? " " : ""}
                {word}
              </span>
            ),
          )}
        </motion.h1>

        {/* Subtitle */}

        {/* Accent bar */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.38 }}
          className="mt-1 flex items-center gap-2 origin-center"
        >
          <div className="h-px w-8 bg-white/20 rounded-full" />
          <div
            className="h-[3px] w-14 rounded-full"
            style={{ background: "linear-gradient(90deg,#F26A1B,#F7A707)" }}
          />
          <div className="h-px w-8 bg-white/20 rounded-full" />
        </motion.div>
      </div>

      {/* Bottom fade-into-page */}
      <div className="absolute bottom-0 left-0 right-0 z-20 h-16 bg-gradient-to-t from-white/10 to-transparent pointer-events-none" />

      {/* Subtle bottom border glow */}
      <div
        className="absolute bottom-0 left-0 right-0 z-20 h-px pointer-events-none"
        style={{
          background:
            "linear-gradient(90deg, transparent, #F26A1B44, transparent)",
        }}
      />
    </section>
  );
}

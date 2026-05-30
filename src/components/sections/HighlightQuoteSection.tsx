"use client";

interface HighlightQuoteSectionProps {
  data: {
    description?: string;
  };
}

export default function HighlightQuoteSection({
  data,
}: HighlightQuoteSectionProps) {
  const quoteText = data.description || "";

  return (
    <section className="relative py-16 md:py-24 bg-slate-50 overflow-hidden flex items-center justify-center border-y border-slate-100">
      {/* Decorative quote mark in the background */}
      <div className="absolute right-10 bottom-0 text-[180px] md:text-[240px] text-slate-100/60 font-serif leading-none select-none select-none pointer-events-none">
        ”
      </div>

      <div className="container mx-auto px-6 lg:px-8 max-w-4xl text-center relative z-10">
        <div className="flex flex-col items-center">
          {/* Top Elegant Quote Icon */}
          <span className="text-[#F7A707] text-5xl md:text-6xl font-serif leading-none mb-4 select-none">
            “
          </span>

          {/* Quote Content */}
          <blockquote className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-light text-slate-700 leading-relaxed italic px-4 md:px-8">
            {quoteText}
          </blockquote>

          {/* Bottom Elegant Accent */}
          <div className="h-0.5 w-10 bg-slate-200 mt-8 rounded-full" />
        </div>
      </div>
    </section>
  );
}

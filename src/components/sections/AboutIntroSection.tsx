"use client";

import Reveal from "@/components/site/Reveal";

interface AboutIntroSectionProps {
  data: {
    title?: string;
    subtitle?: string;
    points?: string[];
    highlights?: string[];
  };
}

export default function AboutIntroSection({ data }: AboutIntroSectionProps) {
  const title = data.title || "Orange Children Hospital!";
  const subtitle = data.subtitle || "Welcome to";
  const leftParagraphs = data.points || [];
  const rightParagraphs = data.highlights || [];

  return (
    <section className="py-16 md:py-24 bg-transparent">
      <div className="container mx-auto px-6 lg:px-8 max-w-7xl">
        <Reveal>
          {/* Centered Header Section */}
          <div className="text-center mb-16 md:mb-20 flex flex-col items-center">
            <span className="text-xs md:text-sm font-semibold tracking-widest text-slate-400 uppercase mb-2">
              {subtitle}
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light text-[#F7A707] leading-tight tracking-wide">
              {title}
            </h2>
            <div className="h-0.5 w-10 bg-slate-200 mt-6 rounded-full" />
          </div>

          {/* 2-Column Paragraph Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-start">
            {/* Left Column */}
            <div className="flex flex-col gap-6 text-slate-600 font-light leading-relaxed text-sm md:text-base text-justify">
              {leftParagraphs.map((para, idx) => (
                <p key={`left-${idx}`}>
                  {/* Dynamically emphasize key terms if they are in the content */}
                  {para.split("Orange").map((chunk, index, arr) => (
                    <span key={index}>
                      {chunk}
                      {index < arr.length - 1 && (
                        <strong className="font-semibold text-slate-800">
                          Orange
                        </strong>
                      )}
                    </span>
                  ))}
                </p>
              ))}
            </div>

            {/* Right Column */}
            <div className="flex flex-col gap-6 text-slate-600 font-light leading-relaxed text-sm md:text-base text-justify">
              {rightParagraphs.map((para, idx) => (
                <p key={`right-${idx}`}>
                  {/* Dynamically emphasize key terms if they are in the content */}
                  {para
                    .split("we are their number one choice")
                    .map((chunk, index, arr) => (
                      <span key={index}>
                        {chunk}
                        {index < arr.length - 1 && (
                          <strong className="font-medium italic text-[#F7A707]">
                            we are their number one choice
                          </strong>
                        )}
                      </span>
                    ))}
                </p>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

"use client";

import React from "react";
import {
  ClipboardList,
  Stethoscope,
  Milestone,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

interface TimelineItem {
  title: string;
  description?: string;
  position?: "top" | "bottom" | string;
}

interface HorizontalTimelineSectionProps {
  data: {
    title?: string;
    subtitle?: string;
    items?: TimelineItem[];
  };
}

export default function HorizontalTimelineSection({
  data,
}: HorizontalTimelineSectionProps) {
  const title = data.title;
  const subtitle = data.subtitle;
  const items = data.items || [];

  const scrollRef = React.useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  return (
    <section className="relative overflow-hidden py-8 md:py-8 bg-[#FFFCF7]">
      {/* Background Decorative Gradients */}
      <div className="absolute top-[-100px] right-[-100px] h-[350px] w-[350px] rounded-full bg-[#F7A707]/5 blur-3xl" />
      <div className="absolute bottom-[-100px] left-[-100px] h-[350px] w-[350px] rounded-full bg-[#EF641A]/5 blur-3xl" />

      {/* Floating Decorative Medical Plus Signs */}
      <div className="absolute left-8 top-16 text-[#F7A707]/10 text-4xl font-light select-none">
        +
      </div>
      <div className="absolute right-12 bottom-16 text-[#EF641A]/10 text-4xl font-light select-none">
        +
      </div>

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        {/* Section Header */}
        <div className="text-center mb-6 max-w-3xl mx-auto">
          {subtitle && (
            <p className="text-[#EF641A] text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] mb-3">
              {subtitle}
            </p>
          )}
          {title && (
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-800 tracking-tight leading-tight">
              {title}
            </h2>
          )}
          {/* <div className="mx-auto mt-4 h-1.5 w-16 rounded-full bg-gradient-to-r from-[#F7A707] to-[#EF641A]" /> */}
        </div>

        {/* Timeline Container */}
        {items.length > 0 ? (
          <div className="relative">
            {/* Scrollable Horizontal Layout for Desktop & Tablet */}
            <div className="hidden md:block relative group/timeline px-4">
              {/* Left Scroll Button */}
              <button
                onClick={scrollLeft}
                className="absolute left-[-20px] top-1/2 -translate-y-1/2 z-30 flex h-10 w-10 items-center justify-center rounded-full bg-white border border-slate-100 shadow-md text-slate-700 hover:text-[#EF641A] transition-all duration-300 hover:scale-110 active:scale-95"
                aria-label="Scroll left"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              {/* Right Scroll Button */}
              <button
                onClick={scrollRight}
                className="absolute right-[-20px] top-1/2 -translate-y-1/2 z-30 flex h-10 w-10 items-center justify-center rounded-full bg-white border border-slate-100 shadow-md text-slate-700 hover:text-[#EF641A] transition-all duration-300 hover:scale-110 active:scale-95"
                aria-label="Scroll right"
              >
                <ChevronRight className="w-5 h-5" />
              </button>

              {/* Hide Webkit Scrollbars */}
              <style
                dangerouslySetInnerHTML={{
                  __html: `
                .hide-scrollbar::-webkit-scrollbar {
                  display: none;
                }
              `,
                }}
              />

              {/* Scroll Container */}
              <div
                ref={scrollRef}
                className="overflow-x-auto scroll-smooth hide-scrollbar py-6"
                style={{
                  scrollbarWidth: "none",
                  msOverflowStyle: "none",
                }}
              >
                {/* Scroll Content Wrapper */}
                <div
                  className="relative py-6"
                  style={{ width: "max-content", minWidth: "100%" }}
                >
                  {/* Horizontal Timeline Track */}
                  <div className="absolute top-[50%] left-[120px] right-[120px] h-1 bg-slate-100 -translate-y-1/2 rounded-full z-0">
                    {/* Glowing Active Track Effect */}
                    <div className="absolute inset-y-0 left-0 right-0 bg-gradient-to-r from-[#F7A707]/60 via-[#EF641A]/60 to-[#F7A707]/60 rounded-full" />
                  </div>

                  {/* Alternating Layout Content */}
                  <div className="flex gap-8 px-[20px] relative z-10">
                    {items.map((item, index) => {
                      const isTop = item.position === "top";
                      // const stepNumber = String(index + 1).padStart(2, "0");

                      return (
                        <div
                          key={index}
                          className="flex flex-col items-center relative w-[240px] flex-shrink-0"
                        >
                          {/* Top Card Area */}
                          <div className="w-full h-36 flex items-end justify-center pb-5">
                            {isTop && (
                              <div className="w-full max-w-[220px] bg-white rounded-2xl border border-slate-100 p-5 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group relative">
                                {/* Accent Dot */}
                                <span className="absolute top-3 right-3 text-[#F7A707]/30 group-hover:text-[#F7A707] transition-colors duration-300">
                                  <Stethoscope className="w-4 h-4 stroke-[1.5]" />
                                </span>
                                {/* <div className="text-xs font-bold text-[#F7A707] mb-1.5 tracking-wider">
                                  STEP {stepNumber}
                                </div> */}
                                <h3 className="text-sm font-semibold text-slate-800 leading-snug group-hover:text-[#EF641A] transition-colors duration-300">
                                  {item.title}
                                </h3>
                                {item.description && (
                                  <p className="text-xs text-slate-400 font-light mt-2 line-clamp-3">
                                    {item.description}
                                  </p>
                                )}
                                {/* Connector Line pointing down to track */}
                                <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 w-[2px] h-5 bg-dashed border-r-2 border-dashed border-[#F7A707]/30 group-hover:border-[#EF641A] transition-colors duration-300" />
                              </div>
                            )}
                          </div>

                          {/* Timeline Central Node */}
                          <div className="relative my-2 z-20 flex items-center justify-center">
                            <div className="group/node flex items-center justify-center cursor-pointer">
                              {/* Inner glowing pulse ring */}
                              <div className="absolute w-8 h-8 rounded-full bg-gradient-to-tr from-[#F7A707] to-[#EF641A] opacity-20 scale-100 group-hover/node:scale-150 group-hover/node:opacity-30 transition-all duration-500 rounded-full" />

                              {/* Outer node circle */}
                              <div className="relative w-6 h-6 rounded-full border-4 border-white bg-gradient-to-tr from-[#F7A707] to-[#EF641A] shadow-md group-hover/node:shadow-lg group-hover/node:scale-110 transition-all duration-300 flex items-center justify-center">
                                <div className="w-1.5 h-1.5 bg-white rounded-full" />
                              </div>
                            </div>
                          </div>

                          {/* Bottom Card Area */}
                          <div className="w-full h-36 flex items-start justify-center pt-5">
                            {!isTop && (
                              <div className="w-full max-w-[220px] bg-white rounded-2xl border border-slate-100 p-5 shadow-sm hover:shadow-xl hover:translate-y-1 transition-all duration-300 group relative">
                                {/* Accent Dot */}
                                <span className="absolute top-3 right-3 text-[#EF641A]/30 group-hover:text-[#EF641A] transition-colors duration-300">
                                  <ClipboardList className="w-4 h-4 stroke-[1.5]" />
                                </span>
                                {/* <div className="text-xs font-bold text-[#EF641A] mb-1.5 tracking-wider">
                                  STEP {stepNumber}
                                </div> */}
                                <h3 className="text-sm font-semibold text-slate-800 leading-snug group-hover:text-[#F7A707] transition-colors duration-300">
                                  {item.title}
                                </h3>
                                {item.description && (
                                  <p className="text-xs text-slate-400 font-light mt-2 line-clamp-3">
                                    {item.description}
                                  </p>
                                )}
                                {/* Connector Line pointing up to track */}
                                <div className="absolute -top-5 left-1/2 -translate-x-1/2 w-[2px] h-5 bg-dashed border-r-2 border-dashed border-[#EF641A]/30 group-hover:border-[#F7A707] transition-colors duration-300" />
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile Vertical Layout */}
            <div className="block md:hidden py-4">
              <div className="space-y-4">
                {items.map((item, index) => (
                  <div
                    key={index}
                    className="relative pl-8 pb-4 border-l-2 border-[#F7A707]/30"
                  >
                    {/* Timeline Node */}
                    <div className="absolute -left-[7px] top-1 w-3 h-3 rounded-full bg-gradient-to-tr from-[#F7A707] to-[#EF641A]" />

                    {/* Card */}
                    <div className="bg-white rounded-xl border border-slate-100 p-4 shadow-sm">
                      <h3 className="text-sm font-semibold text-slate-800">
                        {item.title}
                      </h3>

                      {item.description && (
                        <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                          {item.description}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-2xl border border-slate-100 shadow-sm max-w-lg mx-auto">
            <Milestone className="w-12 h-12 mx-auto text-slate-300 mb-3" />
            <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest">
              No milestones found
            </h3>
          </div>
        )}
      </div>
    </section>
  );
}

"use client";

import React from "react";
import { ClipboardList, Stethoscope, Milestone } from "lucide-react";

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

  return (
    <section className="relative overflow-hidden py-16 md:py-24 bg-[#FFFCF7]">
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
        <div className="text-center mb-16 max-w-3xl mx-auto">
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
            {/* Desktop Horizontal Layout */}
            <div className="hidden lg:block relative py-12">
              {/* Horizontal Timeline Track */}
              <div className="absolute top-[50%] left-0 right-0 h-1 bg-slate-100 -translate-y-1/2 rounded-full z-0">
                {/* Glowing Active Track Effect */}
                <div className="absolute inset-y-0 left-0 right-0 bg-gradient-to-r from-[#F7A707]/60 via-[#EF641A]/60 to-[#F7A707]/60 rounded-full" />
              </div>

              {/* Flex Grid for Alternating Layout */}
              <div
                className="grid gap-6 relative z-10"
                style={{
                  gridTemplateColumns: `repeat(${items.length}, minmax(0, 1fr))`,
                }}
              >
                {items.map((item, index) => {
                  const isTop = item.position === "top";
                  const stepNumber = String(index + 1).padStart(2, "0");

                  return (
                    <div
                      key={index}
                      className="flex flex-col items-center relative"
                    >
                      {/* Top Card Area */}
                      <div className="w-full h-44 flex items-end justify-center pb-8">
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
                            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-[2px] h-8 bg-dashed border-r-2 border-dashed border-[#F7A707]/30 group-hover:border-[#EF641A] transition-colors duration-300" />
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
                      <div className="w-full h-44 flex items-start justify-center pt-8">
                        {!isTop && (
                          <div className="w-full max-w-[220px] bg-white rounded-2xl border border-slate-100 p-5 shadow-sm hover:shadow-xl hover:translate-y-1 transition-all duration-300 group relative">
                            {/* Accent Dot */}
                            <span className="absolute top-3 right-3 text-[#EF641A]/30 group-hover:text-[#EF641A] transition-colors duration-300">
                              <ClipboardList className="w-4 h-4 stroke-[1.5]" />
                            </span>
                            <div className="text-xs font-bold text-[#EF641A] mb-1.5 tracking-wider">
                              STEP {stepNumber}
                            </div>
                            <h3 className="text-sm font-semibold text-slate-800 leading-snug group-hover:text-[#F7A707] transition-colors duration-300">
                              {item.title}
                            </h3>
                            {item.description && (
                              <p className="text-xs text-slate-400 font-light mt-2 line-clamp-3">
                                {item.description}
                              </p>
                            )}
                            {/* Connector Line pointing up to track */}
                            <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-[2px] h-8 bg-dashed border-r-2 border-dashed border-[#EF641A]/30 group-hover:border-[#F7A707] transition-colors duration-300" />
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Tablet & Medium Horizontal Scrolling Layout */}
            <div className="hidden md:block lg:hidden overflow-x-auto pb-6 scrollbar-thin scrollbar-thumb-slate-200">
              <div className="relative min-w-[900px] py-12">
                {/* Horizontal Timeline Track */}
                <div className="absolute top-[50%] left-0 right-0 h-1 bg-slate-100 -translate-y-1/2 rounded-full z-0">
                  <div className="absolute inset-y-0 left-0 right-0 bg-gradient-to-r from-[#F7A707]/60 via-[#EF641A]/60 to-[#F7A707]/60 rounded-full" />
                </div>

                <div
                  className="grid gap-6 relative z-10"
                  style={{
                    gridTemplateColumns: `repeat(${items.length}, minmax(0, 1fr))`,
                  }}
                >
                  {items.map((item, index) => {
                    const isTop = item.position === "top";
                    const stepNumber = String(index + 1).padStart(2, "0");

                    return (
                      <div
                        key={index}
                        className="flex flex-col items-center relative"
                      >
                        {/* Top Card Area */}
                        <div className="w-full h-40 flex items-end justify-center pb-6">
                          {isTop && (
                            <div className="w-full max-w-[180px] bg-white rounded-2xl border border-slate-100 p-4 shadow-sm hover:shadow-lg transition-all duration-300 group relative">
                              <div className="text-[10px] font-bold text-[#F7A707] mb-1 tracking-wider">
                                STEP {stepNumber}
                              </div>
                              <h3 className="text-xs font-semibold text-slate-800 leading-snug">
                                {item.title}
                              </h3>
                              <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-[2px] h-6 bg-dashed border-r-2 border-dashed border-[#F7A707]/30" />
                            </div>
                          )}
                        </div>

                        {/* Node */}
                        <div className="relative my-1 z-20 flex items-center justify-center">
                          <div className="w-5 h-5 rounded-full border-4 border-white bg-gradient-to-tr from-[#F7A707] to-[#EF641A] shadow-sm" />
                        </div>

                        {/* Bottom Card Area */}
                        <div className="w-full h-40 flex items-start justify-center pt-6">
                          {!isTop && (
                            <div className="w-full max-w-[180px] bg-white rounded-2xl border border-slate-100 p-4 shadow-sm hover:shadow-lg transition-all duration-300 group relative">
                              <div className="text-[10px] font-bold text-[#EF641A] mb-1 tracking-wider">
                                STEP {stepNumber}
                              </div>
                              <h3 className="text-xs font-semibold text-slate-800 leading-snug">
                                {item.title}
                              </h3>
                              <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-[2px] h-6 bg-dashed border-r-2 border-dashed border-[#EF641A]/30" />
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Mobile Vertical Layout */}
            <div className="block md:hidden relative pl-8 py-4">
              {/* Vertical Timeline Line */}
              <div className="absolute top-0 bottom-0 left-[15px] w-1 bg-gradient-to-b from-[#F7A707]/60 via-[#EF641A]/60 to-[#F7A707]/60 rounded-full" />

              <div className="space-y-8">
                {items.map((item, index) => {
                  const stepNumber = String(index + 1).padStart(2, "0");
                  const isEven = index % 2 === 0;

                  return (
                    <div
                      key={index}
                      className="relative flex flex-col items-start"
                    >
                      {/* Vertical Node */}
                      <div className="absolute left-[-29px] top-1.5 z-10 flex items-center justify-center">
                        <div className="w-5 h-5 rounded-full border-4 border-white bg-gradient-to-tr from-[#F7A707] to-[#EF641A] shadow-md" />
                      </div>

                      {/* Card Content */}
                      <div className="w-full bg-white rounded-2xl border border-slate-100 p-5 shadow-sm hover:shadow-md transition-all duration-300 relative">
                        <div className="flex items-center justify-between mb-2">
                          <span
                            className={`text-[10px] font-bold tracking-wider px-2 py-0.5 rounded-full ${
                              isEven
                                ? "text-[#F7A707] bg-[#F7A707]/5"
                                : "text-[#EF641A] bg-[#EF641A]/5"
                            }`}
                          >
                            STEP {stepNumber}
                          </span>
                        </div>
                        <h3 className="text-sm font-semibold text-slate-800 leading-snug mb-1">
                          {item.title}
                        </h3>
                        {item.description && (
                          <p className="text-xs text-slate-500 font-light mt-1.5 leading-relaxed">
                            {item.description}
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })}
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

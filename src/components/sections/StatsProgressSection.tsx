"use client";

import { useEffect, useState } from "react";

interface StatProgress {
  value: string; // e.g. "97"
  label: string; // e.g. "Client Satisfaction"
}

interface StatsProgressSectionProps {
  data: {
    title?: string;
    description?: string;
    stats?: StatProgress[];
  };
}

export default function StatsProgressSection({
  data,
}: StatsProgressSectionProps) {
  const title = data.title || "Your Child Needs Special Treatment";
  const description = data.description || "";
  const stats = data.stats || [];

  // Split description paragraphs if double-newlines are present
  const paragraphs = description ? description.split("\n\n") : [];

  // Micro-animation state for filling the progress bars on load
  const [animate, setAnimate] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setAnimate(true), 200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="py-16 md:py-24 bg-white select-none">
      <div className="container mx-auto px-6 lg:px-8 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Title and Details */}
          <div className="lg:col-span-6 flex flex-col gap-6">
            <div>
              <span className="text-xs md:text-sm font-semibold tracking-widest text-[#F7A707] uppercase mb-2 block">
                Orange Hospital Expertise
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-light text-slate-800 leading-tight tracking-wide border-l-2 border-[#F7A707] pl-4">
                {title}
              </h2>
            </div>

            <div className="flex flex-col gap-5 text-slate-500 font-light leading-relaxed text-sm md:text-base">
              {paragraphs.map((para, idx) => (
                <p key={idx} className="text-justify">
                  {para}
                </p>
              ))}
            </div>
          </div>

          {/* Right Column: Premium Progress Bars */}
          <div className="lg:col-span-6 flex flex-col gap-8 lg:pt-6 w-full">
            <div className="bg-slate-50 border border-slate-100 rounded-2xl p-8 shadow-sm flex flex-col gap-8">
              <h3 className="text-sm font-bold text-slate-800 uppercase tracking-widest border-b border-slate-200/60 pb-4">
                Hospital Performance Metres
              </h3>

              <div className="flex flex-col gap-6">
                {stats.map((stat, idx) => {
                  const targetWidth = `${stat.value}%`;
                  return (
                    <div key={idx} className="flex flex-col gap-2.5">
                      {/* Metric Name & Percentage Labels */}
                      <div className="flex justify-between items-end">
                        <span className="text-xs sm:text-sm font-medium text-slate-700 tracking-wide">
                          {stat.label}
                        </span>
                        <span className="text-xs sm:text-sm font-bold text-[#F7A707]">
                          {stat.value}%
                        </span>
                      </div>

                      {/* Sleek, Modern Progress Bar Track */}
                      <div className="h-2 w-full bg-slate-200/70 rounded-full overflow-hidden">
                        <div
                          style={{
                            width: animate ? targetWidth : "0%",
                          }}
                          className="h-full bg-[#F7A707] rounded-full transition-all duration-1000 ease-out shadow-[0_1px_3px_rgba(247,167,7,0.3)]"
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

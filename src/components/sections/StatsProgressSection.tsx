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

  // Animation trigger on mount
  const [animate, setAnimate] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setAnimate(true), 250);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative overflow-hidden py-16 md:py-20 bg-[#FFFCF7] border-b border-slate-100/50 select-none">
      {/* Decorative gradient glow backgrounds */}
      <div className="absolute top-[-100px] right-[-100px] h-[300px] w-[300px] rounded-full bg-[#F7A707]/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-[-100px] left-[-100px] h-[300px] w-[300px] rounded-full bg-[#EF641A]/5 blur-3xl pointer-events-none" />

      <div className="container mx-auto px-6 lg:px-8 max-w-7xl relative z-10">
        {/* Top Header Block: Centered and Wider Text Layout */}
        <div className="text-center mb-12 flex flex-col items-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-900 leading-tight tracking-tight max-w-5xl mx-auto">
            {title}
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r from-[#F7A707] to-[#EF641A] mt-6 rounded-full" />

          {paragraphs.length > 0 && (
            <div className="mt-8 flex flex-col gap-5 text-slate-600 font-light leading-relaxed text-sm md:text-base lg:text-lg max-w-5xl mx-auto">
              {paragraphs.map((para, idx) => (
                <p key={idx} className="text-center">
                  {para}
                </p>
              ))}
            </div>
          )}
        </div>

        {/* Bottom Block: Raw Circular progress loops, no card wrappers */}
        {stats && stats.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto mt-16 w-full">
            {stats.map((stat, idx) => {
              const valueNum = parseInt(stat.value, 10) || 0;
              const radius = 46;
              const circumference = 2 * Math.PI * radius; // ~289.02
              const strokeDashoffset = animate
                ? circumference - (valueNum / 100) * circumference
                : circumference;

              return (
                <div
                  key={idx}
                  className="group flex flex-col items-center justify-center text-center relative"
                >
                  {/* Circular Progress Ring with hover scale */}
                  <div className="relative w-36 h-36 flex items-center justify-center mb-4 transition-transform duration-500 group-hover:scale-105">
                    <svg className="w-full h-full transform -rotate-90">
                      <defs>
                        <linearGradient
                          id={`grad-${idx}`}
                          x1="0%"
                          y1="0%"
                          x2="100%"
                          y2="100%"
                        >
                          <stop offset="0%" stopColor="#F7A707" />
                          <stop offset="100%" stopColor="#EF641A" />
                        </linearGradient>
                      </defs>
                      {/* Background Track Circle */}
                      <circle
                        cx="72"
                        cy="72"
                        r={radius}
                        className="stroke-slate-100 fill-none"
                        strokeWidth="6"
                      />
                      {/* Animated Progress Circle */}
                      <circle
                        cx="72"
                        cy="72"
                        r={radius}
                        stroke={`url(#grad-${idx})`}
                        className="fill-none transition-all duration-1000 ease-out"
                        strokeWidth="8"
                        strokeDasharray={circumference}
                        strokeDashoffset={strokeDashoffset}
                        strokeLinecap="round"
                      />
                    </svg>
                    {/* Center Percentage Display */}
                    <div className="absolute flex flex-col items-center justify-center">
                      <span className="text-2xl sm:text-3xl font-black text-slate-800 tracking-tight group-hover:text-[#EF641A] transition-colors duration-300">
                        {stat.value}%
                      </span>
                    </div>
                  </div>

                  {/* Label Text */}
                  <span className="text-xs sm:text-sm font-bold text-slate-700 tracking-wide group-hover:text-[#EF641A] transition-colors duration-300 max-w-[150px]">
                    {stat.label}
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}

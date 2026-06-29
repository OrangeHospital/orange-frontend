"use client";

import Reveal from "@/components/site/Reveal";

interface CardItem {
  title: string;
  description?: string;
  icon: string; // Used as the number: "01", "02", "03"
}

interface ReasonsGridSectionProps {
  data: {
    subtitle?: string;
    title?: string;
    description?: string;
    cards?: CardItem[];
  };
}

export default function ReasonsGridSection({ data }: ReasonsGridSectionProps) {
  const subtitle = data.subtitle || "Our Reputation Speaks";
  const title =
    data.title || "3 Good Reasons To Choose Orange Children Hospital";
  const description = data.description || "";
  const cards = data.cards || [];

  return (
    <section className="py-16 md:py-24 bg-transparent">
      <div className="container mx-auto px-6 lg:px-8 max-w-7xl">
        <Reveal>
          {/* Upper Split Header Block */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-start mb-16">
            <div className="lg:col-span-6">
              <span className="text-xs md:text-sm font-semibold tracking-widest text-[#F7A707] uppercase mb-2 block">
                {subtitle}
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-light text-slate-800 leading-tight tracking-wide border-l-2 border-[#F7A707] pl-4">
                {title}
              </h2>
            </div>
            <div className="lg:col-span-6 text-slate-500 font-light leading-relaxed text-sm md:text-base lg:pt-6">
              <p>{description}</p>
            </div>
          </div>

          {/* Lower Cards Grid Block */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {cards.map((card, idx) => (
              <div
                key={idx}
                className="bg-white border border-slate-100 rounded-xl p-8 shadow-sm hover:shadow-md transition-all duration-300 border-l-4 border-l-[#F7A707] flex flex-col gap-5 hover:-translate-y-1 group"
              >
                {/* Card Number */}
                <div className="text-4xl md:text-5xl font-bold text-slate-800 tracking-tight group-hover:text-[#F7A707] transition-colors duration-300">
                  {card.icon}
                </div>

                {/* Card Body */}
                <div className="flex flex-col gap-2">
                  <h3 className="text-base sm:text-lg font-medium text-slate-800 group-hover:text-slate-900 transition-colors duration-300 leading-snug">
                    {card.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 font-light leading-relaxed">
                    {card.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

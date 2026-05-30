"use client";

import Image from "next/image";
import * as LucideIcons from "lucide-react";
import type { LucideIcon } from "lucide-react";

type LucideIconName = keyof typeof LucideIcons.icons;

interface IconCardGridSectionProps {
  data: PageSection["content"];
}

export default function IconCardGridSection({
  data,
}: IconCardGridSectionProps) {
  const getIcon = (iconName?: string): LucideIcon => {
    if (!iconName) return LucideIcons.Heart;

    const formattedName = iconName
      .toLowerCase()
      .replace(/-./g, (x) => x[1].toUpperCase())
      .replace(/^\w/, (c) => c.toUpperCase()) as LucideIconName;

    return LucideIcons.icons[formattedName] ?? LucideIcons.Heart;
  };

  const isFacilitiesVariant = data.variant === "facilities";

  return (
    <section className="relative overflow-hidden py-12 md:py-16 bg-[#FFFCF7]">
      {/* Soft Gradient Glow */}
      <div className="absolute top-[-120px] left-[-120px] h-[320px] w-[320px] rounded-full bg-[#F7A707]/10 blur-3xl" />

      <div className="absolute bottom-[-120px] right-[-120px] h-[320px] w-[320px] rounded-full bg-[#EF641A]/10 blur-3xl" />

      {/* Curved Line Pattern */}
      <svg
        className="absolute top-0 left-0 opacity-[0.07]"
        width="500"
        height="400"
        viewBox="0 0 500 400"
        fill="none"
      >
        <path
          d="M0 100C120 30 240 30 360 100C420 140 500 140 500 140"
          stroke="#F7A707"
          strokeWidth="1.5"
        />

        <path
          d="M0 150C140 80 260 80 380 150C440 190 500 190 500 190"
          stroke="#F7A707"
          strokeWidth="1"
        />

        <path
          d="M0 200C160 130 280 130 400 200C460 240 500 240 500 240"
          stroke="#F7A707"
          strokeWidth="1"
        />
      </svg>

      <svg
        className="absolute bottom-0 right-0 opacity-[0.07]"
        width="500"
        height="400"
        viewBox="0 0 500 400"
        fill="none"
      >
        <path
          d="M500 300C380 370 260 370 140 300C80 260 0 260 0 260"
          stroke="#F7A707"
          strokeWidth="1.5"
        />

        <path
          d="M500 250C360 320 240 320 120 250C60 210 0 210 0 210"
          stroke="#F7A707"
          strokeWidth="1"
        />

        <path
          d="M500 200C340 270 220 270 100 200C40 160 0 160 0 160"
          stroke="#F7A707"
          strokeWidth="1"
        />
      </svg>

      {/* Floating Medical Plus Icons */}
      <div className="absolute left-10 top-24 text-[#F7A707]/10 text-5xl font-light">
        +
      </div>

      <div className="absolute right-16 top-20 text-[#F7A707]/10 text-5xl font-light">
        +
      </div>

      <div className="absolute bottom-20 left-20 text-[#F7A707]/10 text-5xl font-light">
        +
      </div>

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        {/* Section Header */}
        {(data.title || data.subtitle) && (
          <div className="text-center mb-10 max-w-3xl mx-auto">
            {data.subtitle && (
              <p className="text-[#EF641A] text-xs sm:text-sm font-medium uppercase tracking-[0.2em] mb-3">
                {data.subtitle}
              </p>
            )}

            {data.title && (
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-slate-800 tracking-tight leading-tight">
                {data.title}
              </h2>
            )}

            <div className="mx-auto mt-4 h-1 w-20 rounded-full bg-gradient-to-r from-[#F7A707] to-[#EF641A]" />
          </div>
        )}

        {/* Dynamic Card rendering */}
        {data.cards && data.cards.length > 0 && (
          <div className="max-w-6xl mx-auto">
            {isFacilitiesVariant ? (
              /* Facilities Grid */
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {data.cards.map((card, index) => (
                  <div
                    key={index}
                    className="group bg-white rounded-none border-0 shadow-none overflow-hidden flex flex-col h-full"
                  >
                    {/* Facility Image */}
                    <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-50 rounded-none">
                      {card.icon ? (
                        <Image
                          src={card.icon}
                          alt={card.title}
                          fill
                          className="object-cover rounded-none transition-transform duration-500 group-hover:scale-105"
                          quality={90}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-300 text-xs rounded-none">
                          Facility Image
                        </div>
                      )}
                    </div>

                    {/* Facility Title */}
                    <div className="bg-[#1E5CB8] text-white py-3 px-4 text-center font-semibold text-xs sm:text-sm flex-1 flex items-center justify-center rounded-none select-none">
                      {card.title}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              /* Specialty Grid */
              <div className="grid gap-y-10 gap-x-6 grid-cols-2 md:grid-cols-4">
                {data.cards.map((card, index) => {
                  const Icon = getIcon(card.icon);

                  return (
                    <div
                      key={index}
                      className="group p-4 transition-all duration-300 text-center flex flex-col items-center justify-center select-none"
                    >
                      {/* Icon */}
                      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white/80 border border-[#F7A707]/10 shadow-sm text-[#F7A707] transition-all duration-300 group-hover:scale-105 group-hover:shadow-md">
                        <Icon className="h-10 w-10 stroke-[1.25]" />
                      </div>

                      {/* Title */}
                      <h3 className="text-md font-semibold text-slate-800 transition-colors group-hover:text-[#F7A707]">
                        {card.title}
                      </h3>

                      {/* Description */}
                      {card.description && (
                        <p className="text-sm text-slate-500 mt-1.5 font-normal leading-relaxed max-w-[180px]">
                          {card.description}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

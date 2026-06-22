"use client";

import Image from "next/image";
import { getImageUrl, isValidImageUrl } from "@/lib/utils";

interface CardItem {
  title: string;
  description?: string;
  icon: string;
}

interface ValuesSectionProps {
  data: {
    subtitle?: string;
    image?: {
      fileUrl: string;
      altText?: string;
    };
    cards?: CardItem[];
  };
}

export default function ValuesSection({ data }: ValuesSectionProps) {
  const subtitle = data.subtitle || "Our Values";

  const image = data.image || {
    fileUrl: "/nicu_expertise.png",
    altText: "Doctors",
  };

  const cards = data.cards || [];

  return (
    <section className="py-20 bg-gradient-to-b from-white to-[#FFFCF7] overflow-hidden select-none">
      <div className="container mx-auto px-6 max-w-7xl">
        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
            {subtitle}
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-[#F7A707] to-[#EF641A] mx-auto mt-6 rounded-full" />
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <div>
            <div className="relative h-[480px] md:h-[520px] rounded-[32px] overflow-hidden shadow-lg border border-slate-100">
              {image?.fileUrl && isValidImageUrl(image.fileUrl) ? (
                <Image
                  src={getImageUrl(image.fileUrl)}
                  alt={image.altText || ""}
                  fill
                  className="object-cover"
                  quality={90}
                />
              ) : (
                <div className="h-full w-full bg-slate-50 flex items-center justify-center text-slate-400">
                  No Image
                </div>
              )}
            </div>
          </div>

          {/* Stepped Timeline Content */}
          <div className="relative">
            <div className="space-y-12">
              {cards.map((card, index) => {
                return (
                  <div
                    key={index}
                    className="relative w-full flex flex-col items-start"
                  >
                    {/* Heading Row */}
                    <div className="flex items-center gap-4 w-full">
                      {/* Colored bullet dot */}
                      <span className="flex-shrink-0 w-2.5 h-2.5 rounded-full bg-[#F7A707] shadow-sm" />

                      {/* Title */}
                      <h3 className="text-xl sm:text-2xl font-extrabold text-slate-800 tracking-wider uppercase">
                        {card.title}
                      </h3>

                      {/* Horizontal Line extending to the right */}
                      <div className="flex-1 h-[1.5px] bg-gradient-to-r from-[#F7A707] to-transparent" />
                    </div>

                    {/* Description Paragraph */}
                    <div className="pl-6 mt-3 max-w-xl text-left">
                      <p className="text-slate-600 font-light leading-relaxed text-sm sm:text-base">
                        {card.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import Image from "next/image";

interface CardItem {
  title: string;
  description?: string;
  icon: string; // "eye" | "target" | "award"
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
    altText: "Founders",
  };
  const cards = data.cards || [];

  // Simple custom inline SVGs for premium look & maximum safety
  const renderIcon = (type: string) => {
    switch (type) {
      case "eye":
        return (
          <svg
            className="h-6 w-6 text-[#F7A707]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.43 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
        );
      case "target":
        return (
          <svg
            className="h-6 w-6 text-[#F7A707]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m11.314 11.314l.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z"
            />
          </svg>
        );
      case "award":
        return (
          <svg
            className="h-6 w-6 text-[#F7A707]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.504-1.125-1.125-1.125h-6.75a1.125 1.125 0 00-1.125 1.125v3.375m9 0h-9m9 0a3 3 0 003-3V11.25a9 9 0 00-18 0v4.5a3 3 0 003 3m12-9a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <section className="py-16 md:py-24 bg-slate-50/50 border-b border-slate-100">
      <div className="container mx-auto px-6 lg:px-8 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Portrait Founders Photo in Premium Aspect Card */}
          <div className="lg:col-span-5 flex justify-center w-full">
            <div className="group rounded-2xl bg-white border border-slate-200 p-4 shadow-sm flex flex-col w-full max-w-md transition-all duration-300 hover:shadow-md">
              <div className="relative aspect-[4/3] w-full rounded-xl overflow-hidden bg-slate-50 mb-4 flex-shrink-0">
                {image?.fileUrl &&
                (image.fileUrl.startsWith("/") ||
                  image.fileUrl.startsWith("http")) ? (
                  <Image
                    src={image.fileUrl}
                    alt={image.altText || "Founders"}
                    fill
                    className="object-cover object-top transition-transform duration-500 group-hover:scale-102"
                    quality={95}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
                    No Image
                  </div>
                )}
              </div>
              <div className="px-1 pb-1">
                <h3 className="text-base sm:text-lg font-bold text-slate-800 tracking-wide">
                  Our Dedicated Leadership
                </h3>
                <p className="text-xs font-semibold text-[#F7A707] tracking-wider mt-1 uppercase">
                  Orange Children Hospital Doctors
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Values cards (Vision, Mission, Aim) */}
          <div className="lg:col-span-7 flex flex-col gap-8 w-full">
            <div>
              <span className="text-xs md:text-sm font-semibold tracking-widest text-[#F7A707] uppercase mb-3 block">
                {subtitle}
              </span>
              <div className="h-0.5 w-10 bg-slate-200 mt-2 mb-6 rounded-full" />
            </div>

            {/* List of cards */}
            <div className="flex flex-col gap-6">
              {cards.map((card, idx) => (
                <div
                  key={idx}
                  className="bg-white border border-slate-100 rounded-xl p-6 shadow-sm border-l-4 border-l-[#F7A707] flex flex-col sm:flex-row gap-4 sm:items-start group hover:shadow-md transition-all duration-300"
                >
                  {/* Icon Circle Accent */}
                  <div className="flex-shrink-0 h-12 w-12 rounded-xl bg-[#F7A707]/10 flex items-center justify-center group-hover:bg-[#F7A707]/15 transition-colors duration-300">
                    {renderIcon(card.icon)}
                  </div>

                  {/* Card Content */}
                  <div className="flex flex-col gap-1.5">
                    <h4 className="text-sm sm:text-base font-semibold text-slate-800 tracking-wider uppercase">
                      {card.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-500 font-light leading-relaxed">
                      {card.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

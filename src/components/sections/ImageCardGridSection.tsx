import Image from "next/image";
import { getImageUrl } from "@/lib/utils";

interface ImageCardGridSectionProps {
  data: PageSection["content"];
}

export default function ImageCardGridSection({
  data,
}: ImageCardGridSectionProps) {
  return (
    <section className="relative overflow-hidden py-12 md:py-16 bg-[#FFFCF7]">
      {/* Soft Gradient Glows */}
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

        {/* Image Cards Grid */}
        {data.cards && data.cards.length > 0 && (
          <div className="max-w-6xl mx-auto">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {data.cards.map(
                (
                  card: {
                    icon?: string | { fileUrl: string; altText?: string };
                    image?: { fileUrl: string; altText?: string };
                    title: string;
                    description?: string;
                    link?: string;
                  },
                  index: number,
                ) => {
                  // Resolve image src — supports string path, object with fileUrl, or card.image
                  const rawUrl =
                    (typeof card.icon === "object"
                      ? card.icon?.fileUrl
                      : card.icon) ||
                    card.image?.fileUrl ||
                    "";
                  const altText =
                    (typeof card.icon === "object"
                      ? card.icon?.altText
                      : undefined) ||
                    card.image?.altText ||
                    card.title;
                  const imageSrc = getImageUrl(rawUrl);

                  return (
                    <div
                      key={index}
                      className="group bg-white rounded-none border-0 shadow-none overflow-hidden flex flex-col h-full"
                    >
                      {/* Card Image */}
                      <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-50 rounded-none">
                        {imageSrc ? (
                          <Image
                            src={imageSrc}
                            alt={altText}
                            fill
                            className="object-cover rounded-none transition-transform duration-500 group-hover:scale-105"
                            quality={90}
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-300 text-xs rounded-none bg-slate-100">
                            No Image
                          </div>
                        )}
                      </div>

                      {/* Card Title */}
                      <div className="bg-[#1E5CB8] text-white py-3 px-4 text-center font-semibold text-xs sm:text-sm flex-1 flex items-center justify-center rounded-none select-none">
                        {card.title}
                      </div>

                      {/* Optional description */}
                      {card.description && (
                        <p className="text-slate-500 text-xs text-center px-4 py-2 leading-relaxed">
                          {card.description}
                        </p>
                      )}
                    </div>
                  );
                },
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

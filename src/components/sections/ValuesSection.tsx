"use client";

import Image from "next/image";

const isValidImageUrl = (url?: string) => {
  if (!url) return false;

  return (
    url.startsWith("/") ||
    url.startsWith("http://") ||
    url.startsWith("https://") ||
    !url.includes(":")
  );
};

const getImageUrl = (url?: string) => {
  if (!url) return "";

  if (
    url.startsWith("/") ||
    url.startsWith("http://") ||
    url.startsWith("https://")
  ) {
    return url;
  }

  const fileBase =
    process.env.NEXT_PUBLIC_FILE_BASE_URL || "http://3.111.240.196:7071/share/";

  const base = fileBase.endsWith("/") ? fileBase : `${fileBase}/`;

  return `${base}${url}`;
};

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

  const renderIcon = (type: string) => {
    switch (type) {
      case "eye":
        return "👁";
      case "target":
        return "🎯";
      case "award":
        return "🏆";
      default:
        return "✨";
    }
  };

  return (
    <section className="py-20 bg-gradient-to-b from-white to-slate-50 overflow-hidden">
      <div className="container mx-auto px-6 max-w-7xl">
        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="mt-4 text-4xl md:text-5xl font-bold text-slate-900">
            {subtitle}
          </h2>

          <div className="w-24 h-1 bg-[#F7A707] mx-auto mt-6 rounded-full" />
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <div>
            <div className="relative h-[520px] rounded-[24px] overflow-hidden shadow-xl">
              {image?.fileUrl && isValidImageUrl(image.fileUrl) ? (
                <Image
                  src={getImageUrl(image.fileUrl)}
                  alt={image.altText || ""}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="h-full w-full bg-slate-100 flex items-center justify-center">
                  No Image
                </div>
              )}
            </div>
          </div>

          {/* Timeline */}
          <div className="relative">
            <div className="space-y-8">
              {cards.map((card, index) => (
                <div key={index} className="relative flex gap-5">
                  {/* Icon + Line */}
                  <div className="relative flex flex-col items-center">
                    <div className="h-14 w-14 rounded-full bg-[#F7A707]/10 border border-[#F7A707]/20 flex items-center justify-center text-2xl">
                      {renderIcon(card.icon)}
                    </div>

                    {index !== cards.length - 1 && (
                      <div className="w-[2px] h-20 bg-[#F7A707]/20 mt-2" />
                    )}
                  </div>

                  {/* Card */}
                  <div className="flex-1 rounded-2xl border border-slate-200 bg-white p-6 transition-all duration-300 hover:shadow-lg">
                    <h3 className="text-xl font-semibold text-slate-900 mb-2">
                      {card.title}
                    </h3>

                    <p className="text-slate-600 leading-7">
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

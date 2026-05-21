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
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6 max-w-7xl">
        {/* Section Header */}
        {(data.title || data.subtitle) && (
          <div className="text-center mb-16 max-w-3xl mx-auto">
            {data.subtitle && (
              <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-3">
                {data.subtitle}
              </p>
            )}
            {data.title && (
              <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 leading-tight">
                {data.title}
              </h2>
            )}
          </div>
        )}

        {/* Dynamic Card rendering */}
        {data.cards && data.cards.length > 0 && (
          <div className="max-w-6xl mx-auto">
            {isFacilitiesVariant ? (
              /* Facilities Grid: 4 cards with beautiful photos and titles on bottom */
              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                {data.cards.map((card, index) => (
                  <div
                    key={index}
                    className="group bg-white rounded-3xl overflow-hidden shadow-lg shadow-slate-100 border border-gray-100 hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col h-full"
                  >
                    {/* Facility Image */}
                    <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
                      {card.icon ? (
                        <Image
                          src={card.icon}
                          alt={card.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                          quality={85}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-300">
                          Facility Image
                        </div>
                      )}
                    </div>
                    {/* Facility Title */}
                    <div className="bg-primary/95 text-white p-5 text-center font-bold tracking-wide text-base md:text-lg flex-1 flex items-center justify-center transition-colors group-hover:bg-primary-dark">
                      {card.title}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              /* Speciality Grid: Clean cards with medical golden icons in center */
              <div className="grid gap-6 grid-cols-2 sm:grid-cols-2 md:grid-cols-4">
                {data.cards.map((card, index) => {
                  const Icon = getIcon(card.icon);
                  return (
                    <div
                      key={index}
                      className="group bg-gradient-to-br from-slate-50 to-white hover:from-white hover:to-white p-6 md:p-8 rounded-3xl border border-slate-100 hover:border-primary/20 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-center flex flex-col items-center justify-center"
                    >
                      {/* Icon Container with beautiful warm yellow/orange theme */}
                      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-500/10 text-amber-500 transition-all duration-300 group-hover:bg-primary/10 group-hover:text-primary">
                        <Icon className="h-8 w-8 stroke-[1.75]" />
                      </div>
                      {/* Title */}
                      <h3 className="text-sm md:text-base font-extrabold text-slate-800 group-hover:text-primary transition-colors">
                        {card.title}
                      </h3>
                      {card.description && (
                        <p className="text-xs text-gray-500 mt-2 font-light leading-relaxed">
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

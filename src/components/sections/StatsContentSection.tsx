import Image from "next/image";

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

interface StatsContentSectionProps {
  data: PageSection["content"];
}

export default function StatsContentSection({
  data,
}: StatsContentSectionProps) {
  return (
    <section className="py-12 md:py-16 bg-white relative overflow-hidden">
      {/* Subtle clean background circles */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/2 rounded-full filter blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/2 rounded-full filter blur-3xl pointer-events-none" />

      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        {/* Section Header */}
        <div className="text-center mb-8">
          {data.subtitle && (
            <p className="text-[#F7A707] text-xs sm:text-sm font-semibold uppercase tracking-widest mb-1.5">
              {data.subtitle}
            </p>
          )}
          {data.title && (
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-slate-800 tracking-tight leading-tight">
              {data.title}
            </h2>
          )}
        </div>

        {/* Stats Grid - Flat, Ultra-minimalist framed layout */}
        {data.stats && data.stats.length > 0 && (
          <div className="border-y border-slate-100 py-6 md:py-8 my-8 max-w-4xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-y-6 gap-x-4">
              {data.stats.map((stat, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center justify-center text-center md:border-r md:border-slate-100 md:last:border-r-0 px-4"
                >
                  <p className="text-3xl sm:text-4xl font-semibold text-[#F7A707] tracking-tight">
                    {stat.value}
                  </p>
                  <p className="text-slate-500 text-xs sm:text-sm font-medium uppercase tracking-wider mt-1">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Section Description - Clean Minimalist 2-Column Split Layout */}
        {data.description && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center mt-12 md:mt-16 max-w-5xl mx-auto">
            {/* Left Column: Content */}
            <div className="text-left order-2 lg:order-1">
              {data.tagline && (
                <span className="text-[#F7A707] font-semibold text-md sm:text-sm uppercase tracking-wider mb-2 block">
                  {data.tagline}
                </span>
              )}
              {data.contentTitle && (
                <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-3 leading-snug text-slate-800 tracking-tight">
                  {data.contentTitle}
                </h3>
              )}
              <p className="text-slate-500 text-md sm:text-md leading-relaxed mb-6 font-normal">
                {data.description}
              </p>
              {data.points && data.points.length > 0 && (
                <ul className="space-y-3">
                  {data.points.map((pt, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-2.5 text-md sm:text-sm text-slate-500"
                    >
                      <span className="text-[#F7A707] font-bold text-xs sm:text-md mt-0.5 shrink-0">
                        ✓
                      </span>
                      <span className="text-md">{pt}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Right Column: Image */}
            {data.image?.fileUrl && (
              <div className="relative aspect-[4/3] w-full rounded-xl overflow-hidden bg-slate-50 border border-slate-100/50 order-1 lg:order-2">
                <Image
                  src={getImageUrl(data.image.fileUrl)}
                  alt={data.image.altText || "Expertise Care"}
                  fill
                  className="object-cover"
                  quality={90}
                />
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

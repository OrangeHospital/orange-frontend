"use client";

interface MapData {
  address?: string;
  embedUrl?: string;
  latitude?: string;
  longitude?: string;
}

interface MapEmbedSectionProps {
  data: {
    title?: string;
    subtitle?: string;
    map?: MapData;
  };
}

export default function MapEmbedSection({ data }: MapEmbedSectionProps) {
  const mapData = data.map || {};
  const title = data.title || "Our Location";
  const subtitle = data.subtitle;

  const embedUrl = mapData.embedUrl || "";
  const address = mapData.address || "";

  // Helper to resolve standard text addresses to an embeddable Google Maps iframe src
  const getMapSrc = () => {
    if (
      embedUrl &&
      (embedUrl.startsWith("http://") || embedUrl.startsWith("https://"))
    ) {
      return embedUrl;
    }
    const query =
      embedUrl || address || "Orange Children Hospital Chandkheda Ahmedabad";
    return `https://maps.google.com/maps?q=${encodeURIComponent(query)}&t=&z=16&ie=UTF8&iwloc=&output=embed`;
  };

  const mapSrc = getMapSrc();
  const displayAddress =
    address ||
    embedUrl ||
    "301-308 At Sigma Arcade, Above Vijay Sales, Near Tapovan Circle, Chandkheda, Ahmedabad, Gujarat 382424";

  return (
    <section className="py-16 md:py-10 bg-slate-50 relative overflow-hidden select-none">
      {/* Background vector accents */}
      <div className="pointer-events-none absolute -right-20 top-0 h-80 w-80 rounded-full bg-[#F7A707]/5 blur-[100px]" />
      <div className="pointer-events-none absolute -left-20 bottom-0 h-80 w-80 rounded-full bg-orange-400/5 blur-[100px]" />

      <div className="container relative z-10 mx-auto max-w-7xl px-6">
        {/* Section Header */}
        <div className="text-center mb-10 max-w-3xl mx-auto">
          {subtitle && (
            <p className="text-[#F7A707] text-xs sm:text-sm font-semibold uppercase tracking-widest mb-2 block">
              {subtitle}
            </p>
          )}
          {title && (
            <h2 className="text-2xl sm:text-3xl md:text-2xl font-semibold text-slate-800 tracking-tight leading-tight mb-3">
              {title}
            </h2>
          )}
          <div className="h-1 w-12 bg-[#F7A707] mx-auto rounded-full mt-3" />
        </div>

        {/* Map Container and Card Overlay Grid */}
        <div className="relative max-w-7xl mx-auto">
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition-all duration-300 hover:shadow-md">
            {/* Map Iframe */}
            <div className="relative h-[400px] md:h-[500px] w-full rounded-xl overflow-hidden bg-slate-100 border border-slate-100">
              <iframe
                title="Google Maps Location"
                src={mapSrc}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="filter contrast-[1.03] saturate-[1.02]"
              />
            </div>

            {/* Float Card Overlay (Desktop) / Info Row (Mobile) */}
            <div className="mt-4 flex flex-col md:flex-row md:items-center justify-between gap-4 px-2 py-2">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-50 border border-amber-100 mt-0.5">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                    className="h-5 w-5 text-[#F7A707]"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-400 mb-1">
                    Our Address
                  </p>
                  <p className="text-sm font-normal text-slate-600 leading-relaxed max-w-xl">
                    {displayAddress}
                  </p>
                </div>
              </div>

              <div className="flex shrink-0 gap-3">
                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(displayAddress)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-10 items-center justify-center rounded-xl bg-[#F7A707] px-6 text-xs font-medium uppercase tracking-wider text-white shadow-sm transition-all duration-200 hover:bg-[#e09a06]"
                >
                  Get Directions
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

import Image from "next/image";
import { getImageUrl, isValidImageUrl } from "@/lib/utils";

interface LogoImage {
  fileUrl: string;
  altText?: string;
  caption?: string;
  title?: string;
}

interface LogoItem {
  logo?: LogoImage | string;
  title: string;
  subtitle?: string;
  logoType?: string;
}
interface LogoGridSectionData {
  title?: string;
  subtitle?: string;
  badge?: string;
  layout?: string;
  description1?: string;
  description2?: string;
  ctaLabel?: string;
  ctaLink?: string;
  items?: Array<{
    logo?: {
      fileUrl: string;
      altText?: string;
      caption?: string;
      title?: string;
    };
    title: string;
    subtitle?: string;
    logoType?: string;
  }>;
}
interface LogoGridSectionProps {
  data: LogoGridSectionData;
}

export default function LogoGridSection({ data }: LogoGridSectionProps) {
  const getLogoSrc = (logo: LogoItem["logo"]) => {
    if (!logo) return "";
    if (typeof logo === "object") {
      return logo.fileUrl && isValidImageUrl(logo.fileUrl)
        ? getImageUrl(logo.fileUrl)
        : "";
    }
    return isValidImageUrl(logo) ? getImageUrl(logo) : "";
  };

  const getLogoAlt = (logo: LogoItem["logo"], fallback: string) => {
    if (logo && typeof logo === "object") {
      return logo.altText || logo.caption || fallback;
    }
    return fallback;
  };

  const getLogoTitle = (logo: LogoItem["logo"]) => {
    if (logo && typeof logo === "object") {
      return logo.title;
    }
    return undefined;
  };

  if (data.layout === "two-column") {
    return (
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-50/50 to-white py-16 md:py-24 border-y border-slate-100/60 select-none">
        {/* Soft elegant glows to elevate aesthetics */}
        <div className="absolute top-10 left-[-100px] h-[300px] w-[300px] rounded-full pointer-events-none blur-[100px] opacity-40 bg-orange-500/5" />
        <div className="absolute bottom-10 right-[-100px] h-[300px] w-[300px] rounded-full pointer-events-none blur-[100px] opacity-40 bg-[#1E5CB8]/5" />

        <div className="container mx-auto px-6 lg:px-12 max-w-7xl">
          {/* Section Header */}
          <div className="mb-12 flex flex-col items-center justify-center text-center">
            {data.badge && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-widest bg-orange-500/10 text-orange-600 border border-orange-500/20 mb-3 w-fit">
                <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
                {data.badge}
              </span>
            )}
            <h2 className="text-4xl sm:text-4xl font-extrabold text-[#0c2a5c] tracking-tight leading-[1.2] mb-4">
              {data.title}
            </h2>
            <div className="w-16 h-1 rounded-full bg-gradient-to-r from-orange-500 to-[#EF641A]" />
          </div>

          {/* Logo Grid */}
          <div className="w-full">
            {data.items && data.items.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-5">
                {data.items.map((item, index) => {
                  const logoSrc = getLogoSrc(item.logo);

                  return (
                    <div
                      key={index}
                      className="group flex items-center justify-center rounded-xl border border-slate-100 bg-white p-2 sm:p-3 shadow-[0_4px_12px_rgba(0,0,0,0.02)] transition-all duration-300 hover:shadow-[0_12px_24px_rgba(0,0,0,0.06)] hover:-translate-y-0.5 hover:border-orange-500/20 min-h-[70px] sm:min-h-[85px] md:min-h-[95px] aspect-[4/3] w-full"
                    >
                      {logoSrc ? (
                        <Image
                          src={logoSrc}
                          alt={getLogoAlt(item.logo, item.title)}
                          title={getLogoTitle(item.logo)}
                          width={180}
                          height={90}
                          className="max-w-[90%] max-h-[85%] w-auto h-auto object-contain transition-transform duration-300 group-hover:scale-105"
                        />
                      ) : (
                        <span className="text-xs font-semibold text-slate-400 text-center">
                          {item.title}
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </section>
    );
  }
  // Fallback / default layout
  return (
    <section className="bg-gradient-to-br from-[#f9fafb] to-white py-10 md:py-20 lg:py-28">
      <div className="container mx-auto px-6 lg:px-12 max-w-[1400px]">
        {/* Section Header */}
        <div className="mb-8 md:mb-16 lg:mb-20 text-left md:text-center">
          <h2 className="mb-4 text-3xl font-semibold text-[#1f2937] md:mb-6 md:text-4xl lg:text-5xl">
            {data.title}
          </h2>
          {data.subtitle && (
            <p className="mx-auto max-w-3xl text-base text-[#4a5565] md:text-lg lg:text-xl">
              {data.subtitle}
            </p>
          )}
        </div>

        {/* Logo Grid */}
        {data.items && data.items.length > 0 && (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
            {data.items.map((item, index) => {
              const logoSrc = getLogoSrc(item.logo);
              return (
                <div
                  key={index}
                  className="group flex flex-col items-center rounded-2xl border border-[#e2e2e2] bg-white p-8 text-center shadow-sm transition-all hover:shadow-lg"
                >
                  {/* Logo */}
                  <div className="relative mb-6 h-20 w-auto flex items-center justify-center">
                    {logoSrc ? (
                      <Image
                        src={logoSrc}
                        alt={getLogoAlt(item.logo, item.title)}
                        title={getLogoTitle(item.logo)}
                        width={160}
                        height={80}
                        className="object-contain max-h-20"
                      />
                    ) : null}
                  </div>

                  {/* Title */}
                  <h3 className="mb-2 text-xl font-semibold text-[#1f2937] md:text-2xl">
                    {item.title}
                  </h3>

                  {/* Subtitle */}
                  {item.subtitle && (
                    <p className="text-sm text-[#4a5565] md:text-base">
                      {item.subtitle}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}

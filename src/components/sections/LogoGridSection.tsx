import Image from "next/image";
import Reveal from "@/components/site/Reveal";
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

  // Process items list
  const itemsList = (data.items || []).map((item) => ({
    title: item.title,
    logoSrc: getLogoSrc(item.logo),
    alt: getLogoAlt(item.logo, item.title),
  }));

  if (itemsList.length === 0) {
    return null;
  }

  // Duplicate elements to repeat and fill horizontal space dynamically
  // We compute baseCount to ensure the items cover at least the screen width,
  // then duplicate the track exactly once to ensure a 100% seamless loop at -50%.
  const baseCount = Math.ceil(15 / itemsList.length);
  const baseItems = Array(baseCount).fill(itemsList).flat();
  const displayItems = [...baseItems, ...baseItems];

  const baseItemsReversed = Array(baseCount)
    .fill([...itemsList].reverse())
    .flat();
  const displayItemsReversed = [...baseItemsReversed, ...baseItemsReversed];

  // Resolve description
  const descriptionText =
    data.description1 || data.description2 || data.subtitle || "";

  return (
    <section
      data-testid="logo_grid"
      className="py-10 md:py-12 bg-white border-y border-[color:var(--line)] overflow-hidden"
    >
      <style>{`
        @keyframes logo-marquee-ltr {
          0% {
            transform: translate3d(-50%, 0, 0);
          }
          100% {
            transform: translate3d(0%, 0, 0);
          }
        }
        @keyframes logo-marquee-rtl {
          0% {
            transform: translate3d(0%, 0, 0);
          }
          100% {
            transform: translate3d(-50%, 0, 0);
          }
        }
        .logo-animate-ltr {
          animation: logo-marquee-ltr 75s linear infinite;
          will-change: transform;
        }
        .logo-animate-rtl {
          animation: logo-marquee-rtl 75s linear infinite;
          will-change: transform;
        }
        .hover-pause:hover .logo-animate-ltr,
        .hover-pause:hover .logo-animate-rtl {
          animation-play-state: paused;
        }
      `}</style>
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-[0.7fr_1.3fr] lg:grid-cols-[0.6fr_1.4fr] gap-12 items-center">
        {/* Left Column: text content */}
        <Reveal>
          {data.title && (
            <p className="text-[12px] tracking-wider uppercase font-semibold text-[color:var(--orange-600)] mb-1.5">
              {data.title}
            </p>
          )}
          <h2 className="font-semibold text-[color:var(--ink-900)] text-3xl sm:text-4xl leading-[1.2] tracking-tight">
            {data.title}
          </h2>
          {descriptionText && (
            <p className="mt-5 text-[15px] text-[color:var(--muted)] leading-relaxed max-w-sm">
              {descriptionText}
            </p>
          )}
        </Reveal>

        {/* Right Column: horizontal marquee */}
        <div
          className="relative w-full min-w-0 overflow-hidden py-4 hover-pause flex flex-col gap-3"
          style={{
            maskImage:
              "linear-gradient(90deg, transparent, black 12%, black 88%, transparent)",
            WebkitMaskImage:
              "linear-gradient(90deg, transparent, black 12%, black 88%, transparent)",
          }}
        >
          {/* LTR Track (Left to Right) */}
          <div className="flex gap-3 w-max logo-animate-ltr">
            {displayItems.map((item, idx) => (
              <div
                key={`ltr-${idx}`}
                className="shrink-0 inline-flex items-center px-6 py-3.5 rounded-2xl bg-[color:var(--cream)] border border-[color:var(--line)] text-[14px] font-semibold text-[color:var(--ink-700)] select-none min-h-[58px]"
              >
                {item.logoSrc ? (
                  <Image
                    src={item.logoSrc}
                    alt={item.alt}
                    width={140}
                    height={40}
                    loading="eager"
                    className="h-10 w-auto object-contain"
                  />
                ) : (
                  <span>{item.title}</span>
                )}
              </div>
            ))}
          </div>

          {/* RTL Track (Right to Left) */}
          <div className="flex gap-3 w-max logo-animate-rtl">
            {displayItemsReversed.map((item, idx) => (
              <div
                key={`rtl-${idx}`}
                className="shrink-0 inline-flex items-center px-6 py-3.5 rounded-2xl bg-white border border-[color:var(--line)] text-[14px] font-semibold text-[color:var(--ink-700)] select-none min-h-[58px]"
              >
                {item.logoSrc ? (
                  <Image
                    src={item.logoSrc}
                    alt={item.alt}
                    width={140}
                    height={40}
                    loading="eager"
                    className="h-10 w-auto object-contain"
                  />
                ) : (
                  <span>{item.title}</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

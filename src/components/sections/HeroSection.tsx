import { Button } from "../button";
import Image from "next/image";

interface HeroSectionProps {
  data: PageSection["content"];
  lang?: string;
}

export default function HeroSection({ data, lang = "en" }: HeroSectionProps) {
  const media = data.image;

  return (
    <section className="relative w-full min-h-[85vh] flex items-center overflow-hidden bg-slate-950 text-white py-20 lg:py-24">
      {/* Background Image with sophisticated overlay */}
      {media && (
        <div className="absolute inset-0 z-0">
          <Image
            src={media.fileUrl}
            alt={media.altText || data.title || "Orange Hospital Hero"}
            fill
            className="object-cover object-center opacity-90"
            priority
            quality={95}
          />
          {/* Gradients to merge seamlessly and provide excellent text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-slate-950/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
        </div>
      )}

      <div className="container relative z-10 mx-auto px-6 max-w-7xl">
        <div className="max-w-3xl animate-in fade-in slide-in-from-bottom-8 duration-700">
          {/* Badge */}
          {data.badge && (
            <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 border border-white/20 rounded-full bg-white/10 backdrop-blur-sm text-sm font-semibold tracking-wide text-primary">
              <span className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse" />
              {data.badge.label}
            </div>
          )}

          {/* Heading */}
          <h1 className="mb-6 text-4xl font-extrabold leading-[1.15] tracking-tight md:text-6xl lg:text-7xl drop-shadow-md text-white font-sans">
            {data.title}
          </h1>

          {/* Subtitle */}
          {data.subtitle && (
            <p className="mb-10 text-lg text-gray-200 md:text-xl lg:text-2xl leading-relaxed max-w-2xl font-light">
              {data.subtitle}
            </p>
          )}

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4">
            {data.primaryCta && (
              <Button
                href={data.primaryCta.href}
                variant="primary"
                size="lg"
                lang={lang}
                className="min-w-[200px] shadow-lg shadow-primary/30 hover:shadow-primary/50 transition-shadow bg-primary text-white hover:bg-primary-dark rounded-full font-semibold"
              >
                {data.primaryCta.label}
              </Button>
            )}
            {data.secondaryCta && (
              <Button
                href={data.secondaryCta.href}
                size="lg"
                lang={lang}
                className="min-w-[200px] bg-white/10 border border-white/30 text-white hover:bg-white hover:text-slate-900 transition-all rounded-full backdrop-blur-sm font-semibold"
              >
                {data.secondaryCta.label}
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Floating social sidebar on the right */}
      <div className="absolute right-6 top-1/2 -translate-y-1/2 z-20 hidden md:flex flex-col gap-4">
        {[
          { icon: "facebook", color: "bg-[#1877F2]", url: "#" },
          {
            icon: "instagram",
            color: "bg-gradient-to-tr from-[#FD1D1D] to-[#E1306C]",
            url: "#",
          },
          { icon: "youtube", color: "bg-[#FF0000]", url: "#" },
          { icon: "whatsapp", color: "bg-[#25D366]", url: "#" },
        ].map((item) => (
          <a
            key={item.icon}
            href={item.url}
            className={`flex h-10 w-10 items-center justify-center rounded-full text-white shadow-lg transition-transform hover:scale-115 duration-300 ${item.color}`}
          >
            <span className="sr-only">{item.icon}</span>
            {item.icon === "facebook" && (
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z" />
              </svg>
            )}
            {item.icon === "instagram" && (
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
              </svg>
            )}
            {item.icon === "youtube" && (
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.498 6.163a3.003 3.003 0 00-2.11-2.11C19.518 3.545 12 3.545 12 3.545s-7.517 0-9.388.508a3.003 3.003 0 00-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 002.11 2.11c1.871.508 9.388.508 9.388.508s7.518 0 9.388-.508a3.003 3.003 0 002.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
            )}
            {item.icon === "whatsapp" && (
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.73-1.45L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.858-4.42 9.861-9.86.002-2.635-1.021-5.11-2.881-6.973-1.86-1.863-4.332-2.886-6.97-2.887-5.441 0-9.866 4.422-9.869 9.866-.001 1.776.471 3.512 1.365 5.06l-.994 3.633 3.725-.976-.263-.164z" />
              </svg>
            )}
          </a>
        ))}
      </div>

      {/* Slider indicators/arrows */}
      <div className="absolute bottom-8 left-6 md:left-12 flex gap-3 z-10">
        <button className="h-10 w-10 rounded-full border border-white/20 bg-black/30 flex items-center justify-center text-white hover:bg-primary transition-all duration-300">
          ←
        </button>
        <button className="h-10 w-10 rounded-full border border-white/20 bg-black/30 flex items-center justify-center text-white hover:bg-primary transition-all duration-300">
          →
        </button>
      </div>
    </section>
  );
}

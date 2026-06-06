import Image from "next/image";
import { Button } from "../button";
import { cn } from "@/lib/utils";

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

interface ExtendedCTA {
  label: string;
  href: string;
  link?: string;
  variant?: "primary" | "secondary" | "outline" | "ghost";
}

interface ContentWithImageSectionProps {
  data: PageSection["content"];
  lang?: string;
}

export default function ContentWithImageSection({
  data,
  lang = "en",
}: ContentWithImageSectionProps) {
  const isReversed = data.imagePosition === "right";
  const primaryCta = data.primaryCta as ExtendedCTA | undefined;
  const secondaryCta = data.secondaryCta as ExtendedCTA | undefined;

  return (
    <section className="py-20 bg-slate-50 overflow-hidden">
      <div className="container mx-auto px-6 max-w-7xl">
        <div
          className={cn(
            "flex flex-col lg:flex-row items-center gap-12 lg:gap-20",
            isReversed ? "lg:flex-row-reverse" : "",
          )}
        >
          {/* Image Side */}
          <div className="w-full lg:w-1/2">
            <div className="relative overflow-hidden aspect-[4/3] rounded-2xl bg-white border border-slate-100/50 shadow-sm">
              {data.image?.fileUrl && isValidImageUrl(data.image.fileUrl) ? (
                <Image
                  src={getImageUrl(data.image.fileUrl)}
                  alt={
                    data.image.altText ||
                    data.title ||
                    "Orange Hospital Infrastructure"
                  }
                  fill
                  className="object-cover"
                  quality={95}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  No Image
                </div>
              )}
            </div>
          </div>

          {/* Content Side */}
          <div className="w-full lg:w-1/2">
            {data.subtitle && (
              <span className="inline-block text-primary font-bold tracking-wider text-xs uppercase mb-3 px-3.5 py-1.5 bg-primary/10 rounded-full">
                {data.subtitle}
              </span>
            )}
            <h2 className="text-3xl lg:text-5xl font-extrabold text-slate-900 mb-6 leading-tight">
              {data.title}
            </h2>
            <div className="w-20 h-1 bg-primary mb-8 rounded-full" />

            {data.description && (
              <p className="text-lg text-gray-600 mb-8 leading-relaxed font-light">
                {data.description}
              </p>
            )}

            {data.content && data.content.length > 0 && (
              <div className="space-y-4 mb-8">
                {data.content
                  .filter(
                    (p: unknown): p is string =>
                      typeof p === "string" && p.trim() !== "",
                  )
                  .map((para: string, index: number) => (
                    <p
                      key={index}
                      className="text-slate-600 leading-relaxed text-sm md:text-base font-normal"
                    >
                      {para}
                    </p>
                  ))}
              </div>
            )}

            {/* Render checklist points exactly like in screenshot 5 */}
            {data.points && data.points.length > 0 && (
              <ul className="space-y-4 mb-8">
                {data.points.map((point, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary text-xs font-bold mt-0.5">
                      ✓
                    </span>
                    <span className="text-gray-700 text-sm md:text-base font-medium">
                      {point}
                    </span>
                  </li>
                ))}
              </ul>
            )}

            {((primaryCta &&
              primaryCta.label &&
              primaryCta.label.trim() !== "") ||
              (secondaryCta &&
                secondaryCta.label &&
                secondaryCta.label.trim() !== "")) && (
              <div className="flex gap-4">
                {primaryCta &&
                  primaryCta.label &&
                  primaryCta.label.trim() !== "" && (
                    <Button
                      href={primaryCta.href || primaryCta.link || ""}
                      variant="primary"
                      size="md"
                      lang={lang}
                      className="rounded-full"
                    >
                      {primaryCta.label}
                    </Button>
                  )}
                {secondaryCta &&
                  secondaryCta.label &&
                  secondaryCta.label.trim() !== "" && (
                    <Button
                      href={secondaryCta.href || secondaryCta.link || ""}
                      variant="outline"
                      size="md"
                      lang={lang}
                      className="rounded-full border-slate-200 text-slate-700 hover:bg-slate-100"
                    >
                      {secondaryCta.label}
                    </Button>
                  )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

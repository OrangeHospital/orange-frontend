import Image from "next/image";
import { Button } from "../button";
import { cn } from "@/lib/utils";

interface ContentWithImageSectionProps {
  data: PageSection["content"];
  lang?: string;
}

export default function ContentWithImageSection({
  data,
  lang = "en",
}: ContentWithImageSectionProps) {
  const isReversed = data.imagePosition === "right";

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
            <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl aspect-[4/3] border-8 border-white bg-slate-200">
              {data.image ? (
                <Image
                  src={data.image.fileUrl}
                  alt={
                    data.image.altText ||
                    data.title ||
                    "Orange Hospital Infrastructure"
                  }
                  fill
                  className="object-cover transition-transform duration-500 hover:scale-103"
                  quality={90}
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

            {(data.primaryCta || data.secondaryCta) && (
              <div className="flex gap-4">
                {data.primaryCta && (
                  <Button
                    href={data.primaryCta.href}
                    variant="primary"
                    size="md"
                    lang={lang}
                    className="rounded-full"
                  >
                    {data.primaryCta.label}
                  </Button>
                )}
                {data.secondaryCta && (
                  <Button
                    href={data.secondaryCta.href}
                    variant="outline"
                    size="md"
                    lang={lang}
                    className="rounded-full border-slate-200 text-slate-700 hover:bg-slate-100"
                  >
                    {data.secondaryCta.label}
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

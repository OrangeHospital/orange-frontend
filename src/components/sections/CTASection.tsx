import Link from "next/link";

interface CTASectionProps {
  data: PageSection["sectionData"];
}

export default function CTASection({ data }: CTASectionProps) {
  const title =
    data.title ?? "Best Treatment For Your Child Is Just One Call Away";
  const ctaLabel = data.primaryCta?.label ?? "Call Now";
  const ctaHref = data.primaryCta?.href ?? "tel:+919724305900";

  return (
    <section className="py-12 bg-white select-none">
      <div className="container mx-auto px-6 max-w-7xl">
        {/* Boxed Banner Card Container */}
        <div className="bg-white border border-slate-200 rounded-2xl p-8 md:p-12 shadow-sm text-center max-w-5xl mx-auto flex flex-col items-center justify-center">
          {/* Main Title Heading */}
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-800 tracking-tight leading-snug mb-6 max-w-3xl">
            {title}
          </h2>

          {/* Action Button */}
          <Link
            href={ctaHref}
            className="px-6 py-3 font-semibold text-xs sm:text-sm bg-[#F7A707] hover:bg-[#EF641A] text-white rounded-md transition-colors inline-flex items-center gap-2 shadow-sm select-none"
          >
            {ctaLabel}
            <span className="text-sm">➔</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

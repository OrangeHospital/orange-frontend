interface StatsContentSectionProps {
  data: PageSection["content"];
}

export default function StatsContentSection({
  data,
}: StatsContentSectionProps) {
  return (
    <section className="py-16 bg-white relative overflow-hidden">
      {/* Dynamic decorative elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full filter blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/5 rounded-full filter blur-3xl pointer-events-none" />

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12">
          {data.subtitle && (
            <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-2">
              {data.subtitle}
            </p>
          )}
          {data.title && (
            <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 leading-tight">
              {data.title}
            </h2>
          )}
        </div>

        {/* Stats Grid */}
        {data.stats && data.stats.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto mt-10">
            {data.stats.map((stat, index) => (
              <div
                key={index}
                className="bg-white border border-gray-100 rounded-3xl p-8 text-center shadow-lg shadow-slate-100/40 hover:shadow-xl hover:shadow-slate-200/50 hover:-translate-y-1 transition-all duration-300"
              >
                <p className="text-4xl md:text-5xl font-extrabold text-primary mb-3 bg-gradient-to-r from-primary to-orange-500 bg-clip-text text-transparent">
                  {stat.value}
                </p>
                <p className="text-gray-500 text-base md:text-lg font-medium">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Section Description (Expertise Care of Your Child Section in screenshot 2) */}
        {data.description && (
          <div className="mt-20 rounded-[2.5rem] overflow-hidden relative min-h-[400px] flex items-center bg-slate-900 text-white">
            {data.image && (
              <div
                className="absolute inset-0 bg-cover bg-center opacity-40 z-0"
                style={{ backgroundImage: `url(${data.image.fileUrl})` }}
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent z-10" />

            <div className="relative z-20 p-8 md:p-16 max-w-2xl">
              <span className="text-primary font-bold text-xs uppercase tracking-widest mb-3 block">
                We specialize in Neonatal & Pediatric Critical Care
              </span>
              <h3 className="text-3xl md:text-4xl font-extrabold mb-6 leading-tight text-white bg-gradient-to-r from-white to-gray-300 bg-clip-text">
                Expertise Care of Your Child.
              </h3>
              <p className="text-gray-300 text-base md:text-lg leading-relaxed mb-6 font-light">
                {data.description}
              </p>
              {data.points && data.points.length > 0 && (
                <ul className="space-y-3">
                  {data.points.map((pt, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-2.5 text-sm text-gray-300"
                    >
                      <span className="text-primary font-bold text-base mt-0.5">
                        ✓
                      </span>
                      {pt}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

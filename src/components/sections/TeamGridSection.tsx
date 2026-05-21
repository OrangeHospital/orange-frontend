import Image from "next/image";

interface TeamGridSectionProps {
  data: PageSection["content"];
}

export default function TeamGridSection({ data }: TeamGridSectionProps) {
  return (
    <section className="py-20 bg-slate-50 overflow-hidden">
      <div className="container mx-auto px-6 max-w-7xl">
        {/* Section Header */}
        <div className="text-left md:text-center mb-16 max-w-3xl mx-auto">
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
          {data.description && (
            <p className="text-base md:text-lg text-gray-500 font-light leading-relaxed mt-4">
              {data.description}
            </p>
          )}
        </div>

        {/* Doctor Team Cards */}
        {data.members && data.members.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 max-w-4xl mx-auto">
            {data.members.map((member, index) => (
              <div
                key={index}
                className="group rounded-3xl overflow-hidden border border-slate-100 bg-white shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col"
              >
                {/* Doctor Photo */}
                <div className="relative aspect-[4/4] overflow-hidden bg-slate-100">
                  {member.photo?.fileUrl ? (
                    <Image
                      src={member.photo.fileUrl}
                      alt={member.name}
                      fill
                      className="object-cover object-top transition-transform duration-500 group-hover:scale-103"
                      quality={90}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-300">
                      Doctor Photo
                    </div>
                  )}
                  {/* Subtle accent corner overlay */}
                  <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-primary/10 to-transparent" />
                </div>

                {/* Doctor Info */}
                <div className="p-8 text-center">
                  <h3 className="text-2xl font-bold text-slate-800 mb-1 group-hover:text-primary transition-colors">
                    {member.name}
                  </h3>
                  <p className="text-primary font-semibold text-sm mb-4">
                    {member.designation}
                  </p>
                  {member.bio && (
                    <div className="text-xs md:text-sm text-gray-500 font-light leading-relaxed border-t border-slate-100 pt-4">
                      {member.bio}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

import Image from "next/image";

const isValidImageUrl = (url?: string) => {
  if (!url) return false;
  return (
    url.startsWith("/") ||
    url.startsWith("http://") ||
    url.startsWith("https://")
  );
};

interface TeamGridSectionProps {
  data: PageSection["content"];
}

export default function TeamGridSection({ data }: TeamGridSectionProps) {
  const members = data.members ?? [];
  const topRowMembers = members.slice(0, 2);
  const bottomRowMembers = members.slice(2);

  // Split description paragraphs if double-newlines are present
  const paragraphs = data.description ? data.description.split("\n\n") : [];

  return (
    <section className="py-16 md:py-24 bg-slate-50/50 select-none">
      <div className="container mx-auto px-6 max-w-7xl">
        {/* Section Header - Centered */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          {data.subtitle && (
            <p className="text-slate-400 text-xs sm:text-sm font-normal mb-2  tracking-wider">
              {data.subtitle}
            </p>
          )}
          {data.title && (
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-slate-800 tracking-tight leading-tight mb-4">
              {data.title}
            </h2>
          )}
          {paragraphs.length > 0 ? (
            <div className="space-y-3 max-w-4xl mx-auto text-sm sm:text-sm text-slate-800 font-normal leading-relaxed">
              {paragraphs.map((para, idx) => (
                <p key={idx}>{para}</p>
              ))}
            </div>
          ) : (
            data.description && (
              <p className="max-w-2xl mx-auto text-xs sm:text-sm text-slate-400 font-normal leading-relaxed">
                {data.description}
              </p>
            )
          )}
        </div>

        {/* Doctor Team Cards */}
        <div className="space-y-12">
          {/* Top Row: 2 Doctors side-by-side (Centered on Desktop) */}
          {topRowMembers.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-3xl mx-auto justify-center">
              {topRowMembers.map((member, index) => (
                <div
                  key={index}
                  className="group rounded-2xl bg-white border border-slate-200 p-4 shadow-sm flex flex-col h-full"
                >
                  {/* Rounded rectangular photo with aspect-[4/3] */}
                  <div className="relative aspect-[4/3] w-full rounded-xl overflow-hidden bg-slate-50 mb-4 flex-shrink-0">
                    {member.photo?.fileUrl &&
                    isValidImageUrl(member.photo.fileUrl) ? (
                      <Image
                        src={member.photo.fileUrl}
                        alt={member.name}
                        fill
                        className="object-cover object-top transition-transform duration-500 group-hover:scale-103"
                        quality={95}
                        priority
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-300 text-xs">
                        No Photo
                      </div>
                    )}
                  </div>

                  {/* Doctor Details - Left-Aligned */}
                  <div className="flex flex-col justify-between flex-grow px-1 pb-1">
                    <div>
                      <h3 className="text-md sm:text-lg font-bold text-slate-800 tracking-wide">
                        {member.name}
                      </h3>
                      {member.designation && (
                        <p className="text-xs font-semibold text-[#F7A707]  tracking-wider mt-1">
                          {member.designation}
                        </p>
                      )}
                      {member.bio && (
                        <p className="text-xs text-slate-400 font-normal leading-relaxed mt-3 border-t border-slate-50 pt-2.5">
                          {member.bio}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Bottom Row: 4 Doctors side-by-side */}
          {bottomRowMembers.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {bottomRowMembers.map((member, index) => (
                <div
                  key={index}
                  className="group rounded-2xl bg-white border border-slate-200 p-4 shadow-sm flex flex-col h-full"
                >
                  {/* Rounded rectangular photo with aspect-[4/3] */}
                  <div className="relative aspect-[4/3] w-full rounded-xl overflow-hidden bg-slate-50 mb-4 flex-shrink-0">
                    {member.photo?.fileUrl &&
                    isValidImageUrl(member.photo.fileUrl) ? (
                      <Image
                        src={member.photo.fileUrl}
                        alt={member.name}
                        fill
                        className="object-cover object-top transition-transform duration-500 group-hover:scale-103"
                        quality={95}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-300 text-xs">
                        No Photo
                      </div>
                    )}
                  </div>

                  {/* Doctor Details - Left-Aligned */}
                  <div className="flex flex-col justify-between flex-grow px-1 pb-1">
                    <div>
                      <h3 className="text-sm sm:text-md font-bold text-slate-800 tracking-wide">
                        {member.name}
                      </h3>
                      {member.designation && (
                        <p className="text-[10px] sm:text-xs font-semibold text-[#F7A707]  tracking-wider mt-1">
                          {member.designation}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

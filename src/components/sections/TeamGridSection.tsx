import Image from "next/image";
import Link from "next/link";
import { getImageUrl, isValidImageUrl } from "@/lib/utils";

interface TeamGridSectionProps {
  data: PageSection["content"];
}

export default function TeamGridSection({ data }: TeamGridSectionProps) {
  const members = data.members ?? [];
  const topRowMembers = members.slice(0, 2);
  const bottomRowMembers = members.slice(2);

  // Split description paragraphs if double-newlines are present
  const paragraphs = data.description ? data.description.split("\n\n") : [];

  const renderDoctorCard = (
    member: (typeof members)[0],
    isMainRow = false,
    index = 0,
  ) => {
    const photoContainer = (
      <div className="relative aspect-square w-full rounded-none overflow-visible mb-9 bg-slate-50 shadow-[0_4px_20px_rgba(0,0,0,0.02)] cursor-pointer">
        {member.photo?.fileUrl && isValidImageUrl(member.photo.fileUrl) ? (
          <Image
            src={getImageUrl(member.photo.fileUrl)}
            alt={member.name}
            fill
            className="object-cover object-top transition-transform duration-500 group-hover:scale-102"
            quality={95}
            priority={isMainRow}
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center text-slate-300 bg-slate-100/70 select-none">
            {/* Clean minimalist avatar SVG */}
            <svg
              className="w-12 h-12 text-slate-300"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.2"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
              />
            </svg>
          </div>
        )}

        {/* Overlapping white name badge */}
        <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-white px-3 sm:px-5 py-1.5 sm:py-2.5 shadow-[0_8px_20px_rgba(0,0,0,0.05)] border border-slate-100/80 text-center w-max max-w-[95%] min-h-[40px] sm:min-h-[46px] flex items-center justify-center transition-all duration-300 group-hover:shadow-[0_10px_25px_rgba(247,167,7,0.15)] group-hover:border-[#F7A707]/30">
          <span className="font-extrabold text-xs sm:text-[15px] text-[#2B6CB0] tracking-wide transition-colors duration-200 group-hover:text-[#F7A707] whitespace-nowrap text-center leading-tight">
            {member.name}
          </span>
        </div>
      </div>
    );

    return (
      <div
        key={`${member.name}-${index}`}
        className="flex flex-col items-center h-full bg-transparent group w-full"
      >
        {member.link ? (
          <Link
            href={
              member.link.startsWith("/")
                ? member.link
                : `/doctors/${member.link}`
            }
            className="w-full"
          >
            {photoContainer}
          </Link>
        ) : (
          photoContainer
        )}

        {/* Doctor Details (Designation + Socials) */}
        <div className="text-center px-2 flex-grow flex flex-col items-center justify-between w-full">
          {/* Designation */}
          <p className="text-xs sm:text-[13px] font-semibold text-slate-500 leading-relaxed mb-4 max-w-[90%] uppercase tracking-wider">
            {member.designation || ""}
          </p>

          {/* Social Icons matching the user design exactly */}
          {(member.facebook || member.twitter || member.instagram) && (
            <div className="flex items-center gap-4 mt-auto text-slate-400 transition-colors duration-300 group-hover:text-slate-500">
              {member.facebook && (
                <a
                  href={member.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#F7A707] transition-all duration-200 transform hover:scale-110"
                  aria-label="Facebook"
                >
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                  </svg>
                </a>
              )}
              {member.twitter && (
                <a
                  href={member.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#F7A707] transition-all duration-200 transform hover:scale-110"
                  aria-label="Twitter"
                >
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                  </svg>
                </a>
              )}
              {member.instagram && (
                <a
                  href={member.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#F7A707] transition-all duration-200 transform hover:scale-110"
                  aria-label="Instagram"
                >
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204 0.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <section className="py-16 md:py-24 bg-white select-none">
      <div className="container mx-auto px-6 max-w-7xl">
        {/* Section Header - Centered */}
        <div className="text-center mb-20 max-w-3xl mx-auto">
          {data.subtitle && (
            <p className="text-[#F7A707] text-xs sm:text-sm font-bold uppercase tracking-widest mb-3">
              {data.subtitle}
            </p>
          )}
          {data.title && (
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-800 tracking-tight leading-tight mb-4">
              {data.title}
            </h2>
          )}
          {paragraphs.length > 0 ? (
            <div className="space-y-3 max-w-4xl mx-auto text-sm sm:text-base text-slate-500 font-normal leading-relaxed">
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

        {/* Doctor Team Grid */}
        <div className="space-y-16">
          {/* Top Row: 2 Doctors side-by-side (Centered on Desktop) */}
          {topRowMembers.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-16 max-w-3xl mx-auto justify-center">
              {topRowMembers.map((member, idx) =>
                renderDoctorCard(member, true, idx),
              )}
            </div>
          )}

          {/* Bottom Row: 4 Doctors side-by-side */}
          {bottomRowMembers.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-16 max-w-6xl mx-auto">
              {bottomRowMembers.map((member, idx) =>
                renderDoctorCard(member, false, idx),
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

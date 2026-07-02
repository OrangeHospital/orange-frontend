import Image from "next/image";
import Link from "next/link";
import { getImageUrl, isValidImageUrl } from "@/lib/utils";
import Reveal from "@/components/site/Reveal";
import { User } from "lucide-react";

interface TeamGridSectionProps {
  data: PageSection["sectionData"];
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
    const cardContent = (
      <div className="flex flex-col h-full bg-white rounded-[24px] border border-slate-100/80 shadow-[0_8px_30px_rgba(0,0,0,0.03)] overflow-hidden group hover:shadow-[0_15px_40px_rgba(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-300">
        {/* Photo Container */}
        <div className="relative aspect-square w-full bg-slate-50 overflow-hidden">
          {member.photo?.fileUrl && isValidImageUrl(member.photo.fileUrl) ? (
            <Image
              src={getImageUrl(member.photo.fileUrl)}
              alt={member.name}
              fill
              style={{ objectFit: "cover", objectPosition: "top" }}
              className="transition-transform duration-500 group-hover:scale-103"
              quality={95}
              priority={isMainRow}
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center text-slate-300 bg-slate-100/70 select-none">
              <User className="w-12 h-12 stroke-[1.25]" />
            </div>
          )}
        </div>

        {/* Content Details Block */}
        <div className="p-6 flex-grow flex flex-col justify-start text-left bg-white">
          {/* Orange horizontal indicator line */}
          <div className="w-8 h-1 bg-[color:var(--primary)] rounded-full mb-4" />

          {/* Doctor Name */}
          <h3 className="font-display font-bold text-lg sm:text-[20px] text-[color:var(--ink-900)] leading-tight tracking-tight mb-2 group-hover:text-[color:var(--primary)] transition-colors duration-200">
            {member.name}
          </h3>

          {/* Designation */}
          <p className="text-xs sm:text-[13px] text-slate-500 font-normal leading-relaxed">
            {member.designation || ""}
          </p>

          {/* Social Icons if present */}
          {(member.facebook || member.twitter || member.instagram) && (
            <div className="flex items-center gap-3.5 mt-5 pt-4 border-t border-slate-100 text-slate-400 group-hover:text-slate-500 transition-colors duration-300">
              {member.facebook && (
                <a
                  href={member.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[color:var(--primary)] transition-all duration-200 transform hover:scale-110"
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
                  className="hover:text-[color:var(--primary)] transition-all duration-200 transform hover:scale-110"
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
                  className="hover:text-[color:var(--primary)] transition-all duration-200 transform hover:scale-110"
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

    return member.link ? (
      <Link
        key={`${member.name}-${index}`}
        href={
          member.link.startsWith("/") ? member.link : `/doctors/${member.link}`
        }
        className="block h-full rounded-[24px] cursor-pointer"
      >
        {cardContent}
      </Link>
    ) : (
      <div
        key={`${member.name}-${index}`}
        className="block h-full rounded-[24px]"
      >
        {cardContent}
      </div>
    );
  };

  return (
    <section className="py-20  relative overflow-hidden select-none w-full">
      {/* Background Decorative Glows */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-[color:var(--primary)]/5 rounded-full filter blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-[color:var(--primary)]/5 rounded-full filter blur-3xl pointer-events-none" />

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        {/* Section Header - Centered */}
        <Reveal>
          <div className="text-center mb-16 max-w-3xl mx-auto">
            {data.subtitle && (
              <span className="text-[color:var(--primary)] font-semibold text-md tracking-[0.10em] mb-3 block">
                — {data.subtitle}
              </span>
            )}
            {data.title && (
              <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-bold text-[color:var(--ink-900)] tracking-tight leading-[1.15] mb-5">
                {data.title}
              </h2>
            )}
            <div className="w-20 h-1 bg-[color:var(--primary)] mx-auto mb-6 rounded-full" />

            {paragraphs.length > 0 ? (
              <div className="space-y-3 max-w-4xl mx-auto text-sm sm:text-base text-slate-500 font-normal leading-relaxed">
                {paragraphs.map((para, idx) => (
                  <p key={idx}>{para}</p>
                ))}
              </div>
            ) : (
              data.description && (
                <p className="max-w-2xl mx-auto text-sm text-slate-500 font-normal leading-relaxed">
                  {data.description}
                </p>
              )
            )}
          </div>
        </Reveal>

        {/* Doctor Team Grid */}
        <div className="space-y-12">
          {/* Top Row: Leadership Doctors */}
          {topRowMembers.length > 0 && (
            <Reveal>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-3xl mx-auto justify-center">
                {topRowMembers.map((member, idx) =>
                  renderDoctorCard(member, true, idx),
                )}
              </div>
            </Reveal>
          )}

          {/* Bottom Row: Rest of the Team */}
          {bottomRowMembers.length > 0 && (
            <Reveal>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
                {bottomRowMembers.map((member, idx) =>
                  renderDoctorCard(member, false, idx),
                )}
              </div>
            </Reveal>
          )}
        </div>
      </div>
    </section>
  );
}

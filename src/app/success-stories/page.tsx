import { fetchSuccessStories } from "@/lib/api";
import Link from "next/link";
import type { Metadata } from "next";
import Image from "next/image";
import { Calendar, ArrowRight } from "lucide-react";

export const revalidate = 30;

export const metadata: Metadata = {
  title: "Pediatric & Neonatal Success Stories - Orange Children Hospital",
  description:
    "Read inspiring stories of critical neonatal and pediatric survival under our Level 3 NICU and PICU team at Orange Children Hospital, Ahmedabad.",
  alternates: {
    canonical: "https://orangechildrenhospital.com/success-stories",
  },
  openGraph: {
    title: "Pediatric & Neonatal Success Stories - Orange Children Hospital",
    description:
      "Read inspiring stories of critical neonatal and pediatric survival under our Level 3 NICU and PICU team.",
    url: "https://orangechildrenhospital.com/success-stories",
    siteName: "Orange Hospital",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pediatric & Neonatal Success Stories - Orange Children Hospital",
    description:
      "Read inspiring stories of critical neonatal and pediatric survival under our Level 3 NICU and PICU team.",
  },
};

export default async function SuccessStoriesPage() {
  let stories: SuccessStory[] = [];
  let errorMsg = "";

  try {
    const response = await fetchSuccessStories();
    if (response?.success && Array.isArray(response.data)) {
      stories = response.data.filter((s) => s.status === 1);
    }
  } catch {
    errorMsg = "Unable to fetch stories. Please try again later.";
  }

  return (
    <main className="min-h-screen bg-[#F7FAFC]">
      {/* Banner */}
      <section className="bg-slate-950 text-white py-16 px-6 sm:px-8 relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-75">
          <Image
            src="/nicu_expertise.png"
            alt="Orange Hospital Neonatal & Pediatric Care"
            fill
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/60 via-slate-950/40 to-slate-950/80" />
        </div>
        <div className="absolute right-0 top-0 w-96 h-96 bg-[#F7A707]/10 rounded-full blur-3xl pointer-events-none z-10" />
        <div className="absolute left-10 bottom-0 w-72 h-72 bg-[#2B6CB0]/15 rounded-full blur-3xl pointer-events-none z-10" />
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center relative z-10">
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#F7A707] font-semibold mb-3">
            <span>Orange Children Hospital</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#F7A707]" />
            <span>Success Stories</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight max-w-4xl">
            Success Stories
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-300 max-w-4xl leading-relaxed">
            It requires more than just knowledge or medical practice when it
            comes to child health care. Our team of expert doctors approaches
            every child and their health problems with the utmost care, starting
            from the child&apos;s treatment to easing the medical environment so
            that our little patients don&apos;t get nervous and enjoy every
            moment of their journey with us.
          </p>
        </div>
      </section>

      {/* Story Grid */}
      <section className="py-16 px-6 sm:px-8 lg:px-16 max-w-7xl mx-auto">
        {errorMsg ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-slate-100 shadow-sm max-w-md mx-auto">
            <p className="text-slate-600 font-medium mb-3">{errorMsg}</p>
            <Link
              href="/"
              className="inline-flex items-center text-[#F7A707] hover:underline text-sm font-semibold"
            >
              « Back to Home
            </Link>
          </div>
        ) : stories.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-12">
            {stories.map((s) => {
              const formatDate = (dateString?: string) => {
                if (!dateString) return "";
                return new Date(dateString).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                });
              };

              return (
                <div
                  key={s.id}
                  className="bg-white flex flex-col rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-2 border border-slate-100 transition-all duration-300 group"
                >
                  <div className="relative aspect-[4/3] w-full bg-slate-100 overflow-hidden flex items-center justify-center">
                    {s.media?.fileUrl ? (
                      <Image
                        src={s.media.fileUrl}
                        alt={s.media.altText || s.name}
                        className="w-full h-full object-cover top-0 group-hover:scale-105 transition-transform duration-500"
                        width={1920}
                        height={1080}
                      />
                    ) : (
                      <div className="w-full h-full bg-slate-100" />
                    )}
                  </div>
                  <div className="p-6 flex flex-col flex-grow text-left">
                    <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-3 font-medium">
                      <Calendar className="h-3.5 w-3.5 text-[#F7A707]" />
                      <span>{formatDate(s.createdAt)}</span>
                    </div>
                    <h3 className="text-base md:text-lg font-bold text-slate-800 group-hover:text-[#F7A707] transition-colors duration-200 mb-2.5 line-clamp-2 min-h-[3rem] leading-snug">
                      <Link href={`/success-stories/${s.slug}`}>{s.name}</Link>
                    </h3>
                    <p className="text-slate-500 text-sm leading-relaxed mb-5 line-clamp-3 flex-grow">
                      {s.sortDescription || ""}
                    </p>
                    <div className="mt-auto pt-4 border-t border-slate-50">
                      <Link
                        href={`/success-stories/${s.slug}`}
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-[#F7A707] hover:text-[#e67e0a] uppercase tracking-wider transition-colors duration-200"
                      >
                        <span>Read Full Story</span>
                        <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-24 bg-white rounded-3xl border border-slate-100 shadow-sm">
            <svg
              className="mx-auto h-12 w-12 text-slate-300 mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
              />
            </svg>
            <p className="text-slate-500 font-medium">
              No success stories available at the moment.
            </p>
          </div>
        )}
      </section>
    </main>
  );
}

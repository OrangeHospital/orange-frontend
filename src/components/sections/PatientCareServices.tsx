"use client";

import Image from "next/image";
import { getImageUrl, isValidImageUrl } from "@/lib/utils";
import Reveal from "@/components/site/Reveal";

const resolveImageUrl = (img: string | { fileUrl: string } | undefined) => {
  if (!img) return "";

  const url = typeof img === "string" ? img : img.fileUrl;

  if (!url) return "";

  return isValidImageUrl(url) ? getImageUrl(url) : "";
};

interface CareCard {
  title?: string;
  description?: string;
  image?: string | { fileUrl: string };
}

interface PatientCareServicesProps {
  data: {
    title?: string;
    subtitle?: string;
    inpatient?: CareCard;
    outpatient?: CareCard;
  };
}

export default function PatientCareServices({
  data,
}: PatientCareServicesProps) {
  const title = data.title;
  const subtitle = data.subtitle;

  // Filter out services that are completely undefined or have no content
  const services = [data.inpatient, data.outpatient].filter((service) => {
    if (!service) return false;
    return service.title || service.description || service.image;
  }) as CareCard[];

  if (services.length === 0 && !title && !subtitle) return null;

  return (
    <section className="py-20 md:py-28 bg-transparent overflow-hidden">
      <div className="container mx-auto px-6 max-w-6xl">
        <Reveal>
          {/* Header */}
          {(title || subtitle) && (
            <div className="text-center max-w-3xl mx-auto mb-20">
              <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-orange-50 text-[#EF641A] text-xs font-bold uppercase tracking-[0.2em] mb-5">
                Patient Experience
              </span>

              {title && (
                <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-5">
                  {title}
                </h2>
              )}

              {title && (
                <div className="w-20 h-1 bg-[#EF641A] mx-auto rounded-full mb-6" />
              )}

              {subtitle && (
                <p className="text-slate-600 text-lg leading-relaxed">
                  {subtitle}
                </p>
              )}
            </div>
          )}

          {/* Timeline */}
          {services.length > 0 && (
            <div className="relative">
              {/* Center Line */}
              {services.length > 1 && (
                <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-slate-200 -translate-x-1/2" />
              )}

              {services.map((service, index) => {
                const isLeft = index % 2 === 0;
                const imageUrl = resolveImageUrl(service.image);

                return (
                  <div
                    key={index}
                    className={`relative mb-12 flex items-center ${
                      isLeft ? "md:justify-start" : "md:justify-end"
                    }`}
                  >
                    {/* Dot */}
                    {services.length > 1 && (
                      <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 z-20 items-center justify-center">
                        <div className="w-5 h-5 rounded-full bg-[#EF641A] border-4 border-white shadow-xl" />
                      </div>
                    )}

                    {/* Card */}
                    <div className="w-full md:w-[46%] group">
                      <div className="bg-white rounded-2xl overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.04)] hover:-translate-y-1.5 hover:shadow-[0_15px_45px_rgba(0,0,0,0.08)] transition-all duration-500">
                        {/* Image */}
                        {imageUrl && (
                          <div className="relative h-48 overflow-hidden bg-slate-50">
                            <Image
                              src={imageUrl}
                              alt={service.title || "Care Service"}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-700"
                            />
                          </div>
                        )}

                        {/* Content */}
                        {(service.title || service.description) && (
                          <div className="p-6">
                            <span className="inline-flex items-center px-3 py-1 rounded-full bg-orange-50 text-[#EF641A] text-[10px] font-semibold uppercase tracking-wider mb-3">
                              Care Service
                            </span>

                            {service.title && (
                              <h3 className="text-xl font-bold text-slate-900 mb-3">
                                {service.title}
                              </h3>
                            )}

                            {service.description && (
                              <p className="text-slate-500 text-sm leading-relaxed">
                                {service.description}
                              </p>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </Reveal>
      </div>
    </section>
  );
}

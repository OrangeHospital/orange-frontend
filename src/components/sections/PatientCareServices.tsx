"use client";

import Image from "next/image";

interface CareCard {
  title: string;
  description: string;
  image: string;
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
  const title = data.title ?? "Patient Support Services";
  const subtitle =
    data.subtitle ??
    "Holistic Clinical Environments Designed For Comfort & Healing";

  const inpatient = data.inpatient ?? {
    title: "INPATIENT SERVICES",
    description:
      "We Have 5 Special Rooms with Kids Friendly Environment with all basic infrastructures like TV, AC, Refrigerator, Geyser, Sharing rooms also available.",
    image: "/icu_infrastructure.png",
  };

  const outpatient = data.outpatient ?? {
    title: "OUTPATIENT SERVICES",
    description:
      "We provide outpatient services to our NICU graduates, growth & Development Monitoring, High Risk New Born Follow up, their Vaccination, and routine illnesses.",
    image: "/nicu_expertise.png",
  };

  return (
    <section className="py-20 lg:py-24 bg-slate-50/50 border-t border-slate-100">
      <div className="container mx-auto px-6 max-w-7xl">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-[#EF641A] block mb-2">
            Patient Experience
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
            {title}
          </h2>
          <p className="text-base sm:text-lg font-semibold text-slate-500 max-w-2xl mx-auto">
            {subtitle}
          </p>
        </div>

        {/* Dual Card Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-6xl mx-auto">
          {/* Card 1: Inpatient Services */}
          <div className="bg-white border border-slate-100 rounded-[2rem] overflow-hidden shadow-md hover:shadow-2xl hover:border-slate-200/60 hover:-translate-y-1 transition-all duration-300 flex flex-col group">
            {/* Top Image Frame */}
            <div className="relative h-60 sm:h-72 w-full overflow-hidden bg-slate-100">
              <Image
                src={inpatient.image}
                alt={inpatient.title}
                fill
                sizes="(max-w-1024px) 100vw, 50vw"
                className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
              />
            </div>

            {/* Solid Bold Orange-to-Amber Header Bar */}
            <div className="bg-gradient-to-r from-[#F7A707] to-[#EF641A] py-4 px-6 text-center">
              <h3 className="text-lg md:text-xl font-black tracking-wider text-white uppercase select-none">
                {inpatient.title}
              </h3>
            </div>

            {/* Description Body */}
            <div className="p-8 flex-grow flex flex-col justify-between">
              <p className="text-slate-600 text-sm md:text-base leading-relaxed mb-6 font-medium">
                {inpatient.description}
              </p>

              {/* Action accent */}
              <div className="w-full h-1 bg-slate-100 rounded-full overflow-hidden">
                <div className="w-1/4 h-full bg-[#F7A707] group-hover:w-full transition-all duration-700" />
              </div>
            </div>
          </div>

          {/* Card 2: Outpatient Services */}
          <div className="bg-white border border-slate-100 rounded-[2rem] overflow-hidden shadow-md hover:shadow-2xl hover:border-slate-200/60 hover:-translate-y-1 transition-all duration-300 flex flex-col group">
            {/* Top Image Frame */}
            <div className="relative h-60 sm:h-72 w-full overflow-hidden bg-slate-100">
              <Image
                src={outpatient.image}
                alt={outpatient.title}
                fill
                sizes="(max-w-1024px) 100vw, 50vw"
                className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
              />
            </div>

            {/* Solid Bold Orange-to-Amber Header Bar */}
            <div className="bg-gradient-to-r from-[#F7A707] to-[#EF641A] py-4 px-6 text-center">
              <h3 className="text-lg md:text-xl font-black tracking-wider text-white uppercase select-none">
                {outpatient.title}
              </h3>
            </div>

            {/* Description Body */}
            <div className="p-8 flex-grow flex flex-col justify-between">
              <p className="text-slate-600 text-sm md:text-base leading-relaxed mb-6 font-medium">
                {outpatient.description}
              </p>

              {/* Action accent */}
              <div className="w-full h-1 bg-slate-100 rounded-full overflow-hidden">
                <div className="w-1/4 h-full bg-teal-500 group-hover:w-full transition-all duration-700" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

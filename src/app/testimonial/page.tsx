import { fetchTestimonials } from "@/lib/api";
import TestimonialClient from "./TestimonialClient";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

// Generate metadata for SEO
export const metadata: Metadata = {
  title: "Patient Reviews & Testimonials - Orange Children Hospital",
  description:
    "Read real stories, parenting feedback, and video reviews of Level 3 NICU, PICU, and critical care from families at Orange Children Hospital.",
  alternates: {
    canonical: "https://orangechildrenhospital.com/testimonial",
  },
  openGraph: {
    title: "Patient Reviews & Testimonials - Orange Children Hospital",
    description:
      "Read real stories, parenting feedback, and video reviews of Level 3 NICU, PICU, and critical care from families.",
    url: "https://orangechildrenhospital.com/testimonial",
    siteName: "Orange Hospital",
    locale: "en",
    type: "website",
  },
};

export default async function TestimonialPage() {
  let testimonials: Testimonial[] = [];

  try {
    const response = await fetchTestimonials();
    if (response && response.success && Array.isArray(response.data)) {
      testimonials = response.data.filter((t) => t.status === 1);
    }
  } catch (error) {
    console.error("Error fetching testimonials page:", error);
  }

  return (
    <main className="min-h-screen">
      <TestimonialClient testimonials={testimonials} />
    </main>
  );
}

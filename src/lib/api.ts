/* eslint-disable @typescript-eslint/no-explicit-any */
export async function fetchPageSectionsByType(
  pageType: string,
): Promise<PageResponse> {
  // Return Orange Hospital Mock JSON data matching the exact required structures
  if (pageType === "Home") {
    return {
      slug: "",
      title: "Home",
      metaTitle:
        "Orange Children Hospital | Best NICU & PICU in Chandkheda, Ahmedabad",
      metaDescription:
        "Ensure the good health of your little angels with Orange Children Hospital. We specialize in Level 3 Neonatal and Pediatric Intensive Care Unit in Ahmedabad.",
      pageType: "Home",
      sections: [
        {
          id: "hero_section",
          sectionType: "hero",
          sortOrder: 1,
          content: {
            title:
              "Ensure the good health of your little angels with ORANGE HOSPITAL",
            subtitle:
              "Orange Children Hospital - Neonatal and Pediatric Intensive Care Unit",
            badge: { label: "AHMEDABAD'S BEST NICU & PICU" },
            image: {
              id: "img_hero",
              fileUrl: "/hero_baby.png",
              altText: "Orange Hospital Baby Hero",
            },
            primaryCta: { label: "Book Appointment", href: "/contact" },
            secondaryCta: { label: "Our Facilities", href: "/facilities" },
          },
        },
        {
          id: "stats_section",
          sectionType: "stats_content",
          sortOrder: 2,
          content: {
            title: "Ahmedabad's Best NICU & PICU",
            subtitle: "Orange Children Hospital",
            stats: [
              { value: "6,250+", label: "Patients" },
              { value: "1,250+", label: "Ventilated" },
              { value: "500+", label: "Pediatric Surgeries" },
              { value: "13+", label: "Doctors" },
            ],
            description:
              "Orange Children's Hospital is Gujarat's one of the largest 50 bedded pediatric hospital. Orange Hospital has a Level 3 NICU. Level 3 represents the highest level of services that any hospital can provide a newborn. Orange Children's Hospital provides pediatric indoor admission facilities in a deluxe room, special room and sharing rooms.",
            image: {
              id: "img_stats",
              fileUrl: "/nicu_expertise.png",
              altText: "Expertise care of your child",
            },
            points: [
              "We specialize in Neonatal & Pediatric Critical Care.",
              "Level 3 NICU represents the highest level of services.",
              "Complete pediatric indoor admission facilities.",
            ],
          },
        },
        {
          id: "facilities_section",
          sectionType: "icon_card_grid",
          sortOrder: 3,
          content: {
            title: "State of the Art Facilities at Chandkheda",
            subtitle: "Facilities at Orange Children Hospital",
            variant: "facilities",
            cards: [
              {
                title: "40 bedded NICU and PICU",
                icon: "/facility_nicu.png",
                description: "",
              },
              {
                title: "High-tech Operation Theater",
                icon: "/facility_ot.png",
                description: "",
              },
              {
                title: "24 HRS Ambulance Services",
                icon: "/facility_ambulance.png",
                description: "",
              },
              {
                title: "24X7 Neonatologist & Intensivist",
                icon: "/facility_doctor.png",
                description: "",
              },
            ],
          },
        },
        {
          id: "infrastructure_section",
          sectionType: "content_with_image",
          sortOrder: 4,
          content: {
            title: "Best of the medical infrastructure",
            subtitle: "The infrastructure of Orange Hospital",
            image: {
              id: "img_infra",
              fileUrl: "/icu_infrastructure.png",
              altText: "Hospital Infrastructure",
            },
            imagePosition: "left",
            points: [
              "7 Neonatal and Pediatric Ventilators including High Frequency Ventilators",
              "Gujarat's First Geanox-Inhouse Inhaled Nitric Oxide (iNO) System For Critical Babies",
              "1st of kind Isolated Pediatric Dialysis Unit of Gujarat",
              "Mira Cradle - Neonatal Cooling Device For Asphyxiated Baby",
              "Bed Side X-Ray, 2D ECHO, USG (Ultra-Sonography) And Blood Gas Analyser (ABGA)",
            ],
          },
        },
        {
          id: "speciality_section",
          sectionType: "icon_card_grid",
          sortOrder: 5,
          content: {
            title: "Pediatric Super-Speciality Hospital",
            subtitle:
              "With Best of The Medical Infrastructure at Chandkheda, Ahmedabad",
            cards: [
              {
                title: "Pediatric Surgery",
                icon: "scissors",
                description: "Specialized surgeries for children",
              },
              {
                title: "Pediatric Nephrologist",
                icon: "activity",
                description: "Kidney disease specialists",
              },
              {
                title: "Pediatric Cardiologist",
                icon: "heart",
                description: "Heart care for infants & kids",
              },
              {
                title: "Pediatric Gastroenterologist",
                icon: "droplet",
                description: "Digestive system specialists",
              },
              {
                title: "Pediatric Neurologist",
                icon: "brain",
                description: "Nervous system treatments",
              },
              {
                title: "Pediatric Hematooncologist",
                icon: "shield",
                description: "Blood & cancer experts",
              },
              {
                title: "Pediatric Orthopedician",
                icon: "bone",
                description: "Bone and joint specialists",
              },
              {
                title: "Pediatric Endocrinology",
                icon: "flask",
                description: "Hormone & growth specialists",
              },
            ],
          },
        },
        {
          id: "team_section",
          sectionType: "team_grid",
          sortOrder: 6,
          content: {
            title: "With a touch of Kindness",
            subtitle: "The Team of Caring Physicians",
            description:
              "It requires more than just knowledge or medical practice when it comes to child health care. Our team of expert doctors approaches every child and their health problems with the utmost care, starting from the child's treatment to easing the medical environment so that our little patients don't get nervous and enjoy every moment of their journey with us.",
            members: [
              {
                name: "Dr. Sagar Patel",
                designation:
                  "Fellowship in Neonatology (I.A.P.), Pediatric Critical Care (Mumbai), Neonatologist and Pediatric Intensivist",
                photo: {
                  id: "doc_sagar",
                  fileUrl: "/dr_sagar.png",
                  altText: "Dr. Sagar Patel",
                },
                bio: "Dr. Sagar Patel has years of comprehensive clinical pediatric experience, specializing in advanced neonatal critical care and respiratory support structures.",
              },
              {
                name: "Dr. Nirav Patel",
                designation:
                  "Fellowship in Neonatology (N.N.F.), M.B.B.S, D.Ped., Neonatologist and Pediatric Intensivist",
                photo: {
                  id: "doc_nirav",
                  fileUrl: "/dr_nirav.png",
                  altText: "Dr. Nirav Patel",
                },
                bio: "Dr. Nirav Patel is dedicated to exceptional newborn care, special handling for high-risk neonates, and continuous developmental therapy monitoring.",
              },
            ],
          },
        },
      ],
    };
  }

  throw new Error(`Mock data for page type ${pageType} not implemented yet`);
}

export async function fetchSettings(): Promise<Setting[]> {
  return [
    { id: "s1", key: "company_name", value: "Orange Children Hospital" },
    {
      id: "s2",
      key: "company_email",
      value: "info@orangechildrenhospital.com",
    },
    { id: "s3", key: "company_phone", value: "+91 97243 05900" },
    {
      id: "s4",
      key: "default_page_description",
      value: "Best Pediatric and Neonatal ICU Hospital in Ahmedabad",
    },
  ];
}
export async function fetchLanguages(): Promise<any[]> {
  return [{ code: "en", name: "English" }];
}
export async function fetchMenu(): Promise<any> {
  return {
    success: true,
    data: [
      {
        id: "m1",
        title: "Home",
        slug: "/",
        order: 1,
        pageType: "Home",
        isClickable: true,
        pageId: null,
        divisionId: null,
        divisionCategoryId: null,
        children: [],
      },
    ],
  };
}
export async function fetchFooter(): Promise<any> {
  return {
    success: true,
    data: {
      company: {
        name: "Orange Children Hospital",
        logo: "/logo.png",
        phone: "+91 97243 05900",
        email: "info@orangechildrenhospital.com",
        address: "Chandkheda, Ahmedabad",
      },
      sections: [],
      copyright: "© Orange Children Hospital. All Rights Reserved.",
    },
  };
}

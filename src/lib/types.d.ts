// Global Types for Orange Hospital Page Sections
interface MediaAsset {
  id: string;
  fileUrl: string;
  altText?: string;
  title?: string;
  caption?: string;
}

interface CTA {
  label: string;
  href: string;
  variant?: "primary" | "secondary" | "outline" | "ghost";
}

interface PageSection {
  id: string;
  sectionType: string;
  sortOrder: number;
  content: {
    title?: string;
    subtitle?: string;
    description?: string;
    badge?: {
      label: string;
    };
    image?: MediaAsset;
    imagePosition?: "left" | "right";
    variant?: string;
    primaryCta?: CTA;
    secondaryCta?: CTA;
    highlights?: string[];
    stats?: Array<{
      value: string;
      label: string;
      icon?: string;
    }>;
    cards?: Array<{
      title: string;
      description: string;
      icon: string;
      link?: string;
      subline_1?: string;
    }>;
    members?: Array<{
      name: string;
      designation: string;
      photo: MediaAsset;
      bio?: string;
      ishighlight?: boolean;
    }>;
    points?: string[];
  };
}

interface PageResponse {
  slug: string;
  title: string;
  metaTitle?: string;
  metaDescription?: string;
  pageType: string;
  sections: PageSection[];
}

interface Setting {
  id: string;
  key: string;
  value: string;
}

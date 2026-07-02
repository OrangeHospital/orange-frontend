// Global ambient type declarations for Orange Hospital.
// NOTE: This file must stay free of import/export statements so TypeScript
// treats it as a global (non-module) declaration file.

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
  sectionData: {
    title?: string;
    subtitle?: string;
    description?: string;
    badgeText?: string;
    headline?: string;
    shortDescription?: string;
    highlightBoxText?: string;
    bullets?: Array<{ title: string; description?: string }>;
    partnerLogo?: MediaAsset;
    cta?: { label?: string; href?: string };
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
      description?: string;
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
      link?: string;
      facebook?: string;
      twitter?: string;
      instagram?: string;
    }>;
    points?: string[];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
  };
}

interface PageResponse {
  slug: string;
  title: string;
  metaTitle?: string;
  metaDescription?: string;
  pageType: string;
  schemaMarkup?: string;
  sections: PageSection[];
}

interface Setting {
  id: string;
  key: string;
  value: string;
}

interface SiteDetail {
  id: string;
  key: string;
  value: string;
  published: boolean;
}

interface MenusResponse {
  success: boolean;
  status: number;
  message: string;
  data: Menu[];
}

interface Menu {
  id: string;
  menuName: string;
  link: string;
  parentPageId: string | null;
  sortOrder: number;
  status: string;
  isClickable: boolean;
  createdAt: string;
  updatedAt: string;
  parentPage: {
    id: string;
    slug: string;
    pageType: {
      name: string;
    };
  } | null;
  segment: {
    id: string;
    title: string;
    slug: string;
    segmentType: string;
  } | null;
  segmentSlugs?: Array<{
    title: string;
    slug: string;
    preSlug: string;
  }>;
  children: Menu[];
}

interface PageBySlugResponse {
  success: boolean;
  status: number;
  message: string;
  data: PageResponse | null;
}

interface Testimonial {
  id: string;
  title: string;
  description: string | null;
  videoUrl: string | null;
  type: string | null;
  status: number;
  metaTitle: string | null;
  metaDescription: string | null;
  ogImage: string | null;
  isIndex: boolean;
  createdAt: string;
  updatedAt: string;
}

interface TestimonialsResponse {
  success: boolean;
  status: number;
  message: string;
  data: Testimonial[];
}

interface FormField {
  id: string;
  formId: string;
  name: string;
  label: string;
  fieldType:
    | "TEXT"
    | "EMAIL"
    | "NUMBER"
    | "TEXTAREA"
    | "SELECT"
    | "FILE"
    | "DATE";
  isRequired: boolean;
  order?: number;
  placeholder: string | null;
  options: string | null;
}

interface InquiryFormSectionData {
  title?: string;
  subtitle?: string;
  formType?: string;
  variant?: string;
  formId?: string;
  form?: {
    _id: string;
    name: string;
    slug: string;
    description?: string;
    notificationEmail: string;
    isActive: boolean;
    fields: FormField[];
  };
  contactInfo?: {
    phone?: string;
    email?: string;
    address?: string;
  };
}

interface SuccessStory {
  id: string;
  name: string;
  slug: string;
  // Legacy: Lexical JSON string. Sanity: Portable Text block array.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  content?: string | any[];
  sortDescription: string | null;
  status: number;
  metaTitle: string | null;
  metaDescription: string | null;
  ogImage: string | null;
  isIndex: boolean;
  featuredImage: string | null;
  media?: {
    id: string;
    altText?: string;
    description?: string;
    fileUrl: string;
  } | null;
  createdBy: string | null;
  updatedBy: string | null;
  createdAt: string;
  updatedAt: string;
}

interface SuccessStoriesResponse {
  success: boolean;
  status: number;
  message: string;
  data: SuccessStory[];
}

interface SuccessStoryResponse {
  success: boolean;
  status: number;
  message: string;
  data: SuccessStory;
}

interface Social {
  id: string;
  socialKey: string;
  socialValue: string;
  status: string;
}

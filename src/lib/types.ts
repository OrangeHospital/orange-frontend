// TypeScript types that mirror Sanity document schemas.
// These are distinct from the legacy REST-API types in types.d.ts, which are
// kept for backward compatibility with existing components.

// ── Shared ────────────────────────────────────────────────────────────────────

export interface SanityImageRef {
  id: string;
  fileUrl: string;
  altText?: string;
  caption?: string;
}

export interface SanityCTA {
  label: string;
  href: string;
  variant?: "primary" | "secondary" | "outline" | "ghost";
}

export interface SanitySEO {
  metaTitle?: string;
  metaDescription?: string;
  ogImage?: SanityImageRef;
  targetKeywords?: string;
}

// ── Site Settings ─────────────────────────────────────────────────────────────

export interface SanitySocialLink {
  platform: string;
  url: string;
  status: number;
}

export interface SanitySiteSettings {
  contactPhone?: string;
  contactEmail?: string;
  address?: string;
  defaultMetaTitle?: string;
  defaultMetaDescription?: string;
  googleAnalyticsId?: string;
  logo?: SanityImageRef;
  favicon?: SanityImageRef;
  socialLinks?: SanitySocialLink[];
}

export interface SanitySiteDetail {
  _id: string;
  key: string;
  value: string;
  published: boolean;
}

// ── Page ──────────────────────────────────────────────────────────────────────

export interface SanityPageSection {
  id: string;
  sectionType: string;
  sortOrder: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  sectionData: Record<string, any>;
}

export interface SanityPage {
  slug: string;
  title: string;
  pageType?: string;
  metaTitle?: string;
  metaDescription?: string;
  ogImage?: SanityImageRef;
  isIndex?: boolean;
  publishedAt?: string;
  sections: SanityPageSection[];
}

// ── Success Story ─────────────────────────────────────────────────────────────

export interface SanitySuccessStory {
  _id: string;
  name: string;
  slug: string;
  sortDescription?: string;
  // Portable Text blocks (array) or plain string from legacy data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  content?: any[] | string;
  status: number;
  metaTitle?: string;
  metaDescription?: string;
  ogImage?: string;
  isIndex?: boolean;
  media?: SanityImageRef;
  createdAt: string;
  updatedAt: string;
}

// ── Testimonial ───────────────────────────────────────────────────────────────

export interface SanityTestimonial {
  _id: string;
  title: string;
  description?: string;
  videoUrl?: string;
  type?: string;
  status: number;
  metaTitle?: string;
  metaDescription?: string;
  ogImage?: string;
  isIndex?: boolean;
  createdAt: string;
  updatedAt: string;
}

// ── Blog ──────────────────────────────────────────────────────────────────────

export interface SanityBlog {
  _id: string;
  title: string;
  slug: string;
  excerpt?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  content?: any[];
  publishedAt?: string;
  authorName?: string;
  authorLink?: string;
  status: string;
  featuredImage?: SanityImageRef;
  categories?: Array<{ _id: string; name: string; slug: string }>;
  tags?: Array<{ _id: string; name: string; slug: string }>;
  seo?: SanitySEO;
}

// ── Navigation ────────────────────────────────────────────────────────────────

export interface SanityMenuItem {
  menuName?: string;
  title?: string;
  isClickable: boolean;
  linkType?: "page" | "blog" | "external";
  pageSlug?: string;
  blogSlug?: string;
  externalLink?: string;
  sortOrder?: number;
  status?: number;
  children?: SanityMenuItem[];
}

export interface SanityNavigationMenu {
  _id: string;
  menuType: { name: string };
  items?: SanityMenuItem[];
}

// ── Redirect ──────────────────────────────────────────────────────────────────

export interface SanityRedirect {
  fromSlug: string;
  toSlug: string;
  statusCode: 301 | 302;
  type?: string;
}

// ── Structured Data ────────────────────────────────────────────────────────────

export interface SanityStructuredData {
  _id: string;
  type: string;
  refId?: string;
  schemaData?: { code: string };
}

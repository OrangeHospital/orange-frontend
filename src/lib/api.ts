/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Content API layer.
 *
 * All editorial content is fetched from Sanity CMS via GROQ.
 * Operational APIs (forms) remain as REST calls to the Express backend.
 *
 * The public function signatures are intentionally kept identical to the
 * previous REST-backed versions so that existing page/component code
 * requires minimal changes.
 */

import { sanityClient } from "@/lib/sanity";
import {
  SITE_SETTINGS_QUERY,
  PAGE_BY_SLUG_QUERY,
  PAGE_BY_TYPE_QUERY,
  ALL_SUCCESS_STORIES_QUERY,
  SUCCESS_STORY_BY_SLUG_QUERY,
  ALL_TESTIMONIALS_QUERY,
  NAVIGATION_MENU_QUERY,
  PAGES_SITEMAP_QUERY,
  SUCCESS_STORIES_SITEMAP_QUERY,
} from "@/lib/queries";

// ─────────────────────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────────────────────

const REVALIDATE_SECONDS = 3600; // 1 hour ISR

function sanityFetch<T = any>(
  query: string,
  params: Record<string, unknown> = {},
): Promise<T> {
  return sanityClient.fetch<T>(query, params, {
    next: { revalidate: REVALIDATE_SECONDS },
  });
}

// Map a raw Sanity siteSettings document → Setting[] (key/value pairs).
// Social links are inlined as settings so existing components that call
// getSettingValue(settings, 'social_facebook') work without changes.
function mapSiteSettingsToSettings(raw: any): Setting[] {
  if (!raw) return [];

  const settings: Setting[] = [
    {
      id: "hospital_phone",
      key: "hospital_phone",
      value: raw.contactPhone || "",
    },
    {
      id: "hospital_email",
      key: "hospital_email",
      value: raw.contactEmail || "",
    },
    {
      id: "hospital_address",
      key: "hospital_address",
      value: raw.address || "",
    },
    {
      id: "default_meta_title",
      key: "default_meta_title",
      value: raw.defaultMetaTitle || "",
    },
    {
      id: "default_page_description",
      key: "default_page_description",
      value: raw.defaultMetaDescription || "",
    },
    {
      id: "ga_id",
      key: "ga_id",
      value: raw.googleAnalyticsId || "",
    },
  ];

  // Flatten social links as individual settings (social_<platform>)
  if (Array.isArray(raw.socialLinks)) {
    raw.socialLinks.forEach(
      (link: { platform: string; url: string; status: number }) => {
        if (link.platform && link.url) {
          settings.push({
            id: `social_${link.platform}`,
            key: `social_${link.platform}`,
            value: link.url,
          });
        }
      },
    );
  }

  return settings.filter((s) => s.value !== "");
}

// Map a raw Sanity siteSettings → Social[]
function mapSiteSettingsToSocials(raw: any): Social[] {
  if (!raw || !Array.isArray(raw.socialLinks)) return [];
  return raw.socialLinks
    .filter((l: any) => l.platform && l.url)
    .map((l: any, idx: number) => ({
      id: `social_${idx}_${l.platform}`,
      socialKey: l.platform,
      socialValue: l.url,
      status: String(l.status ?? 1),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }));
}

// Map raw Sanity page data → PageResponse
function mapPageData(raw: any): PageResponse | null {
  if (!raw) return null;
  return {
    slug: raw.slug || "",
    title: raw.title || "",
    metaTitle: raw.metaTitle,
    metaDescription: raw.metaDescription,
    pageType: raw.pageType || "",
    sections: Array.isArray(raw.sections)
      ? raw.sections.map((s: any) => ({
          id: s.id || s._key || "",
          sectionType: s.sectionType || "",
          sortOrder: s.sortOrder ?? 0,
          // SectionRenderer reads section.sectionData — keep the key name
          sectionData: s.sectionData || {},
        }))
      : [],
  };
}

// Map raw Sanity success story → SuccessStory
function mapSuccessStory(raw: any): SuccessStory {
  return {
    id: raw._id || raw.id || "",
    name: raw.name || "",
    slug: raw.slug || "",
    // Keep content as-is: Portable Text (array) or legacy string.
    // The page component detects the type and renders accordingly.
    content: raw.content,
    sortDescription: raw.sortDescription || null,
    status: raw.status ?? 1,
    metaTitle: raw.metaTitle || null,
    metaDescription: raw.metaDescription || null,
    ogImage: raw.ogImage || null,
    isIndex: raw.isIndex ?? true,
    featuredImage: raw.media?.fileUrl || null,
    media: raw.media || null,
    createdBy: null,
    updatedBy: null,
    createdAt: raw.createdAt || new Date().toISOString(),
    updatedAt: raw.updatedAt || new Date().toISOString(),
  };
}

// Map raw Sanity testimonial → Testimonial
function mapTestimonial(raw: any): Testimonial {
  return {
    id: raw._id || raw.id || "",
    title: raw.title || "",
    description: raw.description || null,
    videoUrl: raw.videoUrl || null,
    type: raw.type || null,
    status: raw.status ?? 1,
    metaTitle: raw.metaTitle || null,
    metaDescription: raw.metaDescription || null,
    ogImage: raw.ogImage || null,
    isIndex: raw.isIndex ?? true,
    createdAt: raw.createdAt || new Date().toISOString(),
    updatedAt: raw.updatedAt || new Date().toISOString(),
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// Content APIs — now powered by Sanity GROQ
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Fetch all sections for a given page type (e.g. "Home").
 * Used by the home page and any CMS-typed page that isn't addressed by slug.
 */
export async function fetchPageSections(
  pageType: string,
): Promise<PageResponse> {
  const raw = await sanityFetch(PAGE_BY_TYPE_QUERY, {
    pageTypeName: pageType,
  });

  const page = mapPageData(raw);
  if (!page) {
    throw new Error(`No published page found for type "${pageType}"`);
  }
  return page;
}

/**
 * Fetch global site settings and social links.
 * Returns a flat key/value array compatible with getSettingValue().
 * Social links are included as settings with keys like "social_facebook".
 */
export async function fetchSettings(): Promise<Setting[]> {
  const raw = await sanityFetch(SITE_SETTINGS_QUERY);
  return mapSiteSettingsToSettings(raw);
}

/**
 * Mock menu (hardcoded — used as a fallback / placeholder).
 * Dynamic menus are served via fetchMenuFront().
 */
export async function fetchMenu(): Promise<MenusResponse> {
  return {
    success: true,
    status: 200,
    message: "Menu fetched",
    data: [
      {
        id: "m1",
        menuName: "Home",
        link: "/",
        parentPageId: null,
        sortOrder: 1,
        status: "active",
        isClickable: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        parentPage: null,
        segment: null,
        children: [],
      },
    ],
  };
}

/**
 * Fetch the header navigation menu from Sanity.
 */
export async function fetchMenuFront(): Promise<MenusResponse> {
  const raw = await sanityFetch(NAVIGATION_MENU_QUERY, {
    menuTypeName: "Header",
  });

  if (!raw || !Array.isArray(raw.items)) {
    // Gracefully return a minimal response if Sanity has no menu data yet
    return { success: true, status: 200, message: "No menu", data: [] };
  }

  const items = raw.items
    .sort((a: any, b: any) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0))
    .map((item: any, idx: number) => {
      const link =
        item.linkType === "page"
          ? `/${item.pageSlug || ""}`
          : item.linkType === "blog"
            ? `/blog/${item.blogSlug || ""}`
            : item.externalLink || "#";

      return {
        id: `menu-${idx}`,
        menuName: item.menuName || "",
        link,
        parentPageId: null,
        sortOrder: item.sortOrder ?? idx,
        status: item.status === 1 ? "active" : "inactive",
        isClickable: item.isClickable !== false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        parentPage: null,
        segment: null,
        children: Array.isArray(item.children)
          ? item.children.map((child: any, cidx: number) => {
              const childLink =
                child.linkType === "page"
                  ? `/${child.pageSlug || ""}`
                  : child.linkType === "blog"
                    ? `/blog/${child.blogSlug || ""}`
                    : child.externalLink || "#";
              return {
                id: `menu-${idx}-${cidx}`,
                menuName: child.menuName || "",
                link: childLink,
                parentPageId: `menu-${idx}`,
                sortOrder: child.sortOrder ?? cidx,
                status: child.status === 1 ? "active" : "inactive",
                isClickable: child.isClickable !== false,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
                parentPage: null,
                segment: null,
                children: [],
              };
            })
          : [],
      };
    });

  return { success: true, status: 200, message: "Menu fetched", data: items };
}

/**
 * Fetch a single published page by its slug.
 */
export async function fetchPageBySlug(
  slug: string,
): Promise<PageBySlugResponse> {
  const raw = await sanityFetch(PAGE_BY_SLUG_QUERY, { slug });

  const data = mapPageData(raw);
  if (!data) {
    return {
      success: false,
      status: 404,
      message: "Page not found",
      data: null,
    };
  }
  return { success: true, status: 200, message: "Page fetched", data };
}

/**
 * Fetch all active testimonials.
 */
export async function fetchTestimonials(): Promise<TestimonialsResponse> {
  const raw: any[] = await sanityFetch(ALL_TESTIMONIALS_QUERY);
  return {
    success: true,
    status: 200,
    message: "Testimonials fetched",
    data: Array.isArray(raw) ? raw.map(mapTestimonial) : [],
  };
}

/**
 * Fetch all active success stories.
 */
export async function fetchSuccessStories(): Promise<SuccessStoriesResponse> {
  const raw: any[] = await sanityFetch(ALL_SUCCESS_STORIES_QUERY);
  return {
    success: true,
    status: 200,
    message: "Success stories fetched",
    data: Array.isArray(raw) ? raw.map(mapSuccessStory) : [],
  };
}

/**
 * Fetch a single success story by slug.
 */
export async function fetchSuccessStoryBySlug(
  slug: string,
): Promise<SuccessStoryResponse> {
  const raw = await sanityFetch(SUCCESS_STORY_BY_SLUG_QUERY, { slug });
  if (!raw) {
    return {
      success: false,
      status: 404,
      message: "Success story not found",
      data: null as any,
    };
  }
  return {
    success: true,
    status: 200,
    message: "Success story fetched",
    data: mapSuccessStory(raw),
  };
}

/**
 * Fetch all social media links from Sanity siteSettings.
 */
export async function fetchSocial(): Promise<Social[]> {
  const raw = await sanityFetch(SITE_SETTINGS_QUERY);
  return mapSiteSettingsToSocials(raw);
}

/**
 * Return page slugs and last-modified dates for the sitemap.
 */
export async function fetchPagesSitemap(): Promise<{
  pages: Array<{
    slug: string;
    updatedAt: string;
    changefreq?: string;
    priority?: string;
  }>;
}> {
  const raw: any[] = await sanityFetch(PAGES_SITEMAP_QUERY);
  const pages = Array.isArray(raw)
    ? raw
        .filter((p) => p.slug)
        .map((p) => ({
          slug: p.slug as string,
          updatedAt: p.updatedAt as string,
          changefreq: "daily",
          priority: "0.7",
        }))
    : [];
  return { pages };
}

/**
 * Return success-story slugs and last-modified dates for the sitemap.
 */
export async function fetchSuccessStoriesSitemap(): Promise<{
  successStories: Array<{
    slug: string;
    updatedAt: string;
    changefreq?: string;
    priority?: string;
  }>;
}> {
  const raw: any[] = await sanityFetch(SUCCESS_STORIES_SITEMAP_QUERY);
  const successStories = Array.isArray(raw)
    ? raw
        .filter((s) => s.slug)
        .map((s) => ({
          slug: s.slug as string,
          updatedAt: s.updatedAt as string,
          changefreq: "daily",
          priority: "0.7",
        }))
    : [];
  return { successStories };
}

// ─────────────────────────────────────────────────────────────────────────────
// Operational APIs — remain as REST (form processing, authentication, etc.)
// ─────────────────────────────────────────────────────────────────────────────

const OPS_API_BASE = process.env.NEXT_PUBLIC_API_BASE;

/**
 * Fetch dynamic form fields for a given form ID.
 * Calls the operational Express backend — NOT Sanity.
 */
export async function fetchFormFields(formId: string): Promise<FormField[]> {
  const response = await fetch(
    `${OPS_API_BASE}/form/field/get-by-form/${formId}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
    },
  );
  if (!response.ok) {
    throw new Error(`Failed to fetch form fields: ${response.statusText}`);
  }
  const data = await response.json();
  return data.data || [];
}

/**
 * Submit a contact/inquiry form.
 * Calls the operational Express backend — NOT Sanity.
 */
export async function formSubmit(formData: any): Promise<FormField[]> {
  const response = await fetch(`${OPS_API_BASE}/form/submit`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
    cache: "no-store",
  });
  if (!response.ok) {
    throw new Error(`Failed to submit form: ${response.statusText}`);
  }
  const data = await response.json();
  return data.data || [];
}

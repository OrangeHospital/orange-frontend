/* eslint-disable @typescript-eslint/no-unused-vars */
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
  ALL_SITE_DETAILS_QUERY,
  SITE_DETAIL_BY_KEY_QUERY,
  ALL_SOCIALS_QUERY,
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

const REVALIDATE_SECONDS = process.env.NODE_ENV === "development" ? 0 : 300;

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

function mapPageData(raw: any): PageResponse | null {
  if (!raw) return null;

  const camelToSnake = (str: string): string => {
    if (!str) return "";
    return str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);
  };

  return {
    slug: raw.slug || "",
    title: raw.title || "",
    metaTitle: raw.metaTitle,
    metaDescription: raw.metaDescription,
    pageType: raw.pageType || "",
    schemaMarkup: raw.schemaMarkup,

    sections: Array.isArray(raw.sections)
      ? raw.sections
          .filter((section: any) => {
            if (!section) return false;
            const sectionData = section.sectionData || section;
            return (
              sectionData.hideSection !== true && section.hideSection !== true
            );
          })
          .map((section: any, index: number) => {
            const isProjected = section && "sectionData" in section;

            let id = "";
            let rawType = "";
            let sortOrder = index + 1;
            let sectionData = {};

            if (isProjected) {
              id = section.id || section._key || "";
              rawType = section.sectionType || section._type || "";
              sortOrder = section.sortOrder ?? index + 1;
              sectionData = section.sectionData || {};
            } else {
              id = section._key || "";
              rawType = section._type || "";
              sortOrder = index + 1;
              sectionData = { ...section };
            }

            // Clean null and undefined values from sectionData
            let cleanSectionData = {};
            if (sectionData && typeof sectionData === "object") {
              cleanSectionData = Object.fromEntries(
                Object.entries(sectionData).filter(
                  ([_, v]) => v !== null && v !== undefined,
                ),
              );
            }

            const sectionType = camelToSnake(rawType);

            return {
              id,
              sectionType,
              sortOrder,
              sectionData: cleanSectionData,
            };
          })
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

// Map raw Sanity siteDetail → SiteDetail
function mapSiteDetail(raw: any): SiteDetail {
  return {
    id: raw._id || "",
    key: raw.key || "",
    value: raw.value || "",
    published: raw.published ?? false,
  };
}

/**
 * Fetch all published site details.
 */
export async function fetchSiteDetails(): Promise<SiteDetail[]> {
  const raw: any[] = await sanityFetch(ALL_SITE_DETAILS_QUERY);
  return Array.isArray(raw) ? raw.map(mapSiteDetail) : [];
}

/**
 * Fetch a single published site detail matching the specified key.
 */
export async function fetchSiteDetailByKey(
  key: string,
): Promise<SiteDetail | null> {
  const raw = await sanityFetch(SITE_DETAIL_BY_KEY_QUERY, { key });
  return raw ? mapSiteDetail(raw) : null;
}

/**
 * Fetch global site settings and social links.
 * Returns a flat key/value array compatible with getSettingValue().
 * Social links are included as settings with keys like "social_facebook".
 */
export async function fetchSettings(): Promise<Setting[]> {
  const [rawSettings, rawDetails] = await Promise.all([
    sanityFetch(SITE_SETTINGS_QUERY),
    sanityFetch(ALL_SITE_DETAILS_QUERY),
  ]);

  const settingsList = mapSiteSettingsToSettings(rawSettings);

  // Map site details list to Setting format
  const detailsList: Setting[] = Array.isArray(rawDetails)
    ? rawDetails.map((d: any) => ({
        id: d._id || d.key,
        key: d.key,
        value: d.value || "",
      }))
    : [];

  // Create a map to merge key-values cleanly
  const mergedMap = new Map<string, Setting>();

  // Add siteSettings first
  settingsList.forEach((s) => mergedMap.set(s.key, s));

  // Override/add with siteDetail values
  detailsList.forEach((d) => mergedMap.set(d.key, d));

  const finalSettings = Array.from(mergedMap.values()).filter(
    (s) => s.value !== "",
  );

  return finalSettings;
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
      let link = "#";
      if (item.linkType === "page") {
        const slug = item.pageSlug || "";
        link = slug === "/" ? "/" : `/${slug}`;
      } else if (item.linkType === "blog") {
        link = `/blog/${item.blogSlug || ""}`;
      } else {
        link = item.externalLink || "#";
      }

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
              let childLink = "#";
              if (child.linkType === "page") {
                const slug = child.pageSlug || "";
                childLink = slug === "/" ? "/" : `/${slug}`;
              } else if (child.linkType === "blog") {
                childLink = `/blog/${child.blogSlug || ""}`;
              } else {
                childLink = child.externalLink || "#";
              }
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
 * Fetch any navigation menu by its menu type name (e.g. "Footer Quick Links").
 */
export async function fetchMenuByName(
  menuTypeName: string,
): Promise<MenusResponse> {
  const raw = await sanityFetch(NAVIGATION_MENU_QUERY, {
    menuTypeName,
  });

  if (!raw || !Array.isArray(raw.items)) {
    return { success: true, status: 200, message: "No menu", data: [] };
  }

  const items = raw.items
    .sort((a: any, b: any) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0))
    .map((item: any, idx: number) => {
      let link = "#";
      if (item.linkType === "page") {
        const slug = item.pageSlug || "";
        link = slug === "/" ? "/" : `/${slug}`;
      } else if (item.linkType === "blog") {
        link = `/blog/${item.blogSlug || ""}`;
      } else {
        link = item.externalLink || "#";
      }

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
              let childLink = "#";
              if (child.linkType === "page") {
                const slug = child.pageSlug || "";
                childLink = slug === "/" ? "/" : `/${slug}`;
              } else if (child.linkType === "blog") {
                childLink = `/blog/${child.blogSlug || ""}`;
              } else {
                childLink = child.externalLink || "#";
              }
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

function mapSanitySocialToSocial(raw: any): Social {
  return {
    id: raw._id || "",
    socialKey: raw.socialKey || "",
    socialValue: raw.socialValue || "",
    status: raw.status ? "active" : "inactive",
  };
}

/**
 * Fetch all social media links from Sanity.
 */
export async function fetchSocial(): Promise<Social[]> {
  const raw = await sanityFetch(ALL_SOCIALS_QUERY);
  return Array.isArray(raw) ? raw.map(mapSanitySocialToSocial) : [];
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

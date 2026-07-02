// All GROQ queries for Sanity CMS

// ── Shared image projection ──────────────────────────────────────────────────
const imageProjection = `{
  "id": asset->_id,
  "fileUrl": asset->url,
  "altText": coalesce(alt, altText),
  "caption": caption
}`;

// ── Section data projection ──────────────────────────────────────────────────
// Projects Sanity section data into the shape expected by SectionRenderer.
// Each sectionData field is projected explicitly so image references are
// resolved to plain URLs compatible with the existing MediaAsset type.
const sectionDataProjection = `{
  hideSection,
  title,
  subtitle,
  description,
  badge,
  titlePrefix,
  titleHighlight,
  tagline,
  contentTitle,
  "image": image ${imageProjection},
  imagePosition,
  variant,
  layout,
  primaryCta,
  secondaryCta,
  highlights,
  stats,
  points,
  embedUrl,
  mapUrl,
  formId,
  formType,
  form-> {
    _id,
    name,
    "slug": slug.current,
    description,
    notificationEmail,
    isActive,
    fields[] {
      "id": _key,
      name,
      label,
      fieldType,
      isRequired,
      order,
      placeholder,
      options
    }
  },
  contactInfo,
  iframeSrc,
  cards[] {
    title,
    description,
    icon,
    link,
    subline_1,
     "image": image ${imageProjection},
  },
  inpatient[] {
    title,
    description,
    "image": image ${imageProjection},
    link
  },
  inpatient {
    title,
    description,
    "image": image ${imageProjection},
    link
  },
  outpatient {
    title,
    description,
    "image": image ${imageProjection},
    link
  },  
  members[] {
    name,
    designation,
    "photo": photo ${imageProjection},
    bio,
    ishighlight,
    link,
    facebook,
    twitter,
    instagram
  },
  slides[] {
    title,
    subtitle,
    description,
    "image": image ${imageProjection},
    primaryCta,
    secondaryCta,
    badge,
    titlePrefix,
    titleHighlight
  },
  items[] {
    title,
    description,
    icon,
    year,
    label,
    position,
    subtitle,
    logoType,
    "logo": logo ${imageProjection},
    badgeText,
    headline,
    shortDescription,
    points,
    "image": image ${imageProjection},
    link
  },
  features[] {
    title,
    description,
    icon,
    "image": image ${imageProjection}
  },
  reasons[] {
    title,
    description,
    icon
  },
  values[] {
    title,
    description,
    icon
  },
  services[] {
    title,
    description,
    icon
  },
  bottomItems[] {
    title,
    icon
  },
  savedKidsTag {
    show,
    label,
    value,
    avatars
  },
  nicuTag {
    show,
    label,
    value,
    stars
  },
  badgeText,
  headline,
  shortDescription,
  link,
  showGoogleReviews,
  sectionTitle,
  "title": coalesce(sectionTitle, title),
  quote,
  quoteAuthor,
  content
}`;

// ── Site Settings ─────────────────────────────────────────────────────────────
export const SITE_SETTINGS_QUERY = `
*[_type == "siteSettings"][0] {
  contactPhone,
  contactEmail,
  address,
  defaultMetaTitle,
  defaultMetaDescription,
  googleAnalyticsId,
  "logo": logo { "id": asset->_id, "fileUrl": asset->url },
  "favicon": favicon { "id": asset->_id, "fileUrl": asset->url },
  socialLinks[] {
    platform,
    url,
    status
  }
}
`;

// ── Site Details ──────────────────────────────────────────────────────────────
export const ALL_SITE_DETAILS_QUERY = `
*[_type == "siteDetail" && published == true] {
  _id,
  key,
  value,
  published
}
`;

export const SITE_DETAIL_BY_KEY_QUERY = `
*[_type == "siteDetail" && published == true && key == $key][0] {
  _id,
  key,
  value,
  published
}
`;

// ── Socials ───────────────────────────────────────────────────────────────────
export const ALL_SOCIALS_QUERY = `
*[_type == "social" && status == true] {
  _id,
  socialKey,
  socialValue,
  status
}
`;

// ── Navigation Menu ───────────────────────────────────────────────────────────
export const NAVIGATION_MENU_QUERY = `
*[_type == "navigationMenu" && menuType->name == $menuTypeName][0] {
  _id,
  menuType -> { name },
  items[] {
    menuName,
    title,
    isClickable,
    linkType,
    sortOrder,
    status,
    "pageSlug": page->slug.current,
    "blogSlug": blog->slug.current,
    externalLink,
    children[] {
      menuName,
      title,
      isClickable,
      linkType,
      sortOrder,
      status,
      "pageSlug": page->slug.current,
      "blogSlug": blog->slug.current,
      externalLink
    }
  }
}
`;

export const ALL_MENU_TYPES_QUERY = `
*[_type == "menuType"] | order(name asc) {
  _id,
  name,
  status
}
`;

// ── Pages ─────────────────────────────────────────────────────────────────────
export const PAGE_BY_SLUG_QUERY = `
*[_type == "page" && slug.current == $slug && status == "published"][0] {
  "slug": slug.current,
  title,
  "pageType": pageType->name,
  "metaTitle": seo.metaTitle,
  "metaDescription": seo.metaDescription,
  "ogImage": seo.ogImage ${imageProjection},
  "schemaMarkup": seo.schemaMarkup,
  isIndex,
  publishedAt,
  sections[hideSection != true] {
    "id": _key,
    "sectionType": _type,
    sortOrder,
    hideSection,
    "sectionData": @ ${sectionDataProjection}
  }
}
`;

export const PAGE_BY_TYPE_QUERY = `
*[_type == "page" && pageType->name == $pageTypeName && status == "published"][0] {
  "slug": slug.current,
  title,
  "pageType": pageType->name,
  "metaTitle": seo.metaTitle,
  "metaDescription": seo.metaDescription,
  "ogImage": seo.ogImage ${imageProjection},
  "schemaMarkup": seo.schemaMarkup,
  isIndex,
  publishedAt,
  sections[hideSection != true] {
    "id": _key,
    "sectionType": _type,
    sortOrder,
    hideSection,
    "sectionData": @ ${sectionDataProjection}
  }
}
`;

export const ALL_PAGE_SLUGS_QUERY = `
*[_type == "page" && status == "published"] { "slug": slug.current }
`;

export const PAGES_SITEMAP_QUERY = `
*[_type == "page" && status == "published" && isIndex != false] | order(_updatedAt desc) {
  "slug": slug.current,
  "updatedAt": _updatedAt
}
`;

// ── Success Stories ────────────────────────────────────────────────────────────
export const ALL_SUCCESS_STORIES_QUERY = `
*[_type == "successStory" && status == 1] | order(_createdAt desc) {
  _id,
  name,
  "slug": slug.current,
  "sortDescription": shortDescription,
  status,
  "metaTitle": seo.metaTitle,
  "metaDescription": seo.metaDescription,
  "ogImage": seo.ogImage.asset->url,
  isIndex,
  "media": featuredImage {
    "id": asset->_id,
    "fileUrl": asset->url,
    "altText": alt
  },
  "createdAt": _createdAt,
  "updatedAt": _updatedAt
}
`;

export const SUCCESS_STORY_BY_SLUG_QUERY = `
*[_type == "successStory" && slug.current == $slug && status == 1][0] {
  _id,
  name,
  "slug": slug.current,
  "sortDescription": shortDescription,
  content,
  status,
  "metaTitle": seo.metaTitle,
  "metaDescription": seo.metaDescription,
  "ogImage": seo.ogImage.asset->url,
  isIndex,
  "media": featuredImage {
    "id": asset->_id,
    "fileUrl": asset->url,
    "altText": alt
  },
  "createdAt": _createdAt,
  "updatedAt": _updatedAt
}
`;

export const ALL_SUCCESS_STORY_SLUGS_QUERY = `
*[_type == "successStory" && status == 1] { "slug": slug.current }
`;

export const SUCCESS_STORIES_SITEMAP_QUERY = `
*[_type == "successStory" && status == 1 && isIndex != false] | order(_updatedAt desc) {
  "slug": slug.current,
  "updatedAt": _updatedAt
}
`;

// ── Testimonials ──────────────────────────────────────────────────────────────
export const ALL_TESTIMONIALS_QUERY = `
*[_type == "testimonial" && status == 1] | order(_createdAt desc) {
  _id,
  title,
  description,
  videoUrl,
  type,
  status,
  "metaTitle": seo.metaTitle,
  "metaDescription": seo.metaDescription,
  "ogImage": seo.ogImage.asset->url,
  isIndex,
  "createdAt": _createdAt,
  "updatedAt": _updatedAt
}
`;

// ── Blog ──────────────────────────────────────────────────────────────────────
export const ALL_PUBLISHED_BLOGS_QUERY = `
*[_type == "blog" && status == "published"] | order(publishedAt desc) {
  _id,
  title,
  "slug": slug.current,
  excerpt,
  publishedAt,
  authorName,
  status,
  "featuredImage": featuredImage ${imageProjection},
  categories[] -> { _id, name, "slug": slug.current },
  tags[] -> { _id, name, "slug": slug.current }
}
`;

export const BLOG_BY_SLUG_QUERY = `
*[_type == "blog" && slug.current == $slug && status == "published"][0] {
  _id,
  title,
  "slug": slug.current,
  excerpt,
  content,
  publishedAt,
  authorName,
  authorLink,
  "featuredImage": featuredImage ${imageProjection},
  categories[] -> { _id, name, "slug": slug.current },
  tags[] -> { _id, name, "slug": slug.current },
  seo {
    metaTitle,
    metaDescription,
    "ogImage": ogImage ${imageProjection}
  }
}
`;

export const ALL_BLOG_SLUGS_QUERY = `
*[_type == "blog" && status == "published"] { "slug": slug.current }
`;

export const BLOGS_SITEMAP_QUERY = `
*[_type == "blog" && status == "published"] | order(_updatedAt desc) {
  "slug": slug.current,
  "updatedAt": _updatedAt,
  "image": featuredImage.asset->url
}
`;

// ── Blog Categories ────────────────────────────────────────────────────────────
export const ALL_BLOG_CATEGORIES_QUERY = `
*[_type == "blogCategory" && status == "active"] | order(name asc) {
  _id,
  name,
  "slug": slug.current,
  seo { metaTitle, metaDescription }
}
`;

// ── Tags ──────────────────────────────────────────────────────────────────────
export const ALL_TAGS_QUERY = `
*[_type == "tag" && status == "active"] | order(name asc) {
  _id,
  name,
  "slug": slug.current
}
`;

// ── Structured Data ────────────────────────────────────────────────────────────
export const STRUCTURED_DATA_BY_REF_QUERY = `
*[_type == "structuredData" && refId == $refId] {
  _id,
  type,
  schemaData
}
`;

// ── Redirects ─────────────────────────────────────────────────────────────────
export const ALL_REDIRECTS_QUERY = `
*[_type == "redirect"] {
  fromSlug,
  toSlug,
  statusCode,
  type
}
`;

export const REDIRECT_BY_FROM_SLUG_QUERY = `
*[_type == "redirect" && fromSlug == $fromSlug][0] {
  toSlug,
  statusCode
}
`;

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE;

export async function fetchPageSections(
  pageType: string,
): Promise<PageResponse> {
  const response = await fetch(`${API_BASE_URL}/page/sections/get`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ pageType, status: "active" }),
    cache: "no-store", // Ensure fresh data for CMS changes
  });
  if (!response.ok) {
    throw new Error(`Failed to fetch page sections: ${response.statusText}`);
  }

  const data = await response.json();

  return data.data;
}

export async function fetchSettings(): Promise<Setting[]> {
  const response = await fetch(`${API_BASE_URL}/settings/get-all`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch Site Detail: ${response.statusText}`);
  }
  const data = await response.json();
  return data.data;
}
// export async function fetchSettings(): Promise<Setting[]> {
//   return [
//     { id: "s1", key: "company_name", value: "Orange Children Hospital" },
//     {
//       id: "s2",
//       key: "company_email",
//       value: "info@orangechildrenhospital.com",
//     },
//     { id: "s3", key: "company_phone", value: "+91 97243 05900" },
//     {
//       id: "s4",
//       key: "default_page_description",
//       value: "Best Pediatric and Neonatal ICU Hospital in Ahmedabad",
//     },
//   ];
// }
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

export async function fetchMenuFront(): Promise<MenusResponse> {
  const response = await fetch(`${API_BASE_URL}/menu/menu-front`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch Menu: ${response.statusText}`);
  }
  const data = await response.json();
  return data;
}

export async function fetchPageBySlug(
  slug: string,
): Promise<PageBySlugResponse> {
  const response = await fetch(`${API_BASE_URL}/page/get-slug/${slug}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      slug: slug,
      status: "active",
    }),
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch page by slug: ${response.statusText}`);
  }
  const data = await response.json();

  return data;
}

export async function fetchTestimonials(): Promise<TestimonialsResponse> {
  const response = await fetch(`${API_BASE_URL}/testimonial/get-all`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({}),
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch testimonials: ${response.statusText}`);
  }
  const data = await response.json();
  return data;
}

export async function fetchFormFields(formId: string): Promise<FormField[]> {
  const response = await fetch(
    `${API_BASE_URL}/form/field/get-by-form/${formId}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    },
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch form fields: ${response.statusText}`);
  }

  const data = await response.json();
  return data.data || [];
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function formSubmit(formData: any): Promise<FormField[]> {
  const response = await fetch(`${API_BASE_URL}/form/submit`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch form fields: ${response.statusText}`);
  }

  const data = await response.json();
  return data.data || [];
}

export async function fetchSuccessStories(): Promise<SuccessStoriesResponse> {
  const response = await fetch(`${API_BASE_URL}/success-story/get-all`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({}),
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch success stories: ${response.statusText}`);
  }
  const data = await response.json();
  return data;
}

export async function fetchSuccessStoryBySlug(
  slug: string,
): Promise<SuccessStoryResponse> {
  const response = await fetch(
    `${API_BASE_URL}/success-story/get-slug/${slug}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
      cache: "no-store",
    },
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch success story: ${response.statusText}`);
  }
  const data = await response.json();
  return data;
}

export async function fetchSocial(): Promise<Social[]> {
  const response = await fetch(`${API_BASE_URL}/social/get-all`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch Social Detail: ${response.statusText}`);
  }
  const data = await response.json();
  return data.data;
}

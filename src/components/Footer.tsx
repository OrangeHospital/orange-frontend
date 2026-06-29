// Server Component — fetches social links and settings directly from Sanity.
// No "use client" directive; no useState/useEffect.

import Link from "next/link";
import Image from "next/image";
import { fetchSocial, fetchSettings, fetchMenuByName } from "@/lib/api";
import { fetchWithTimeout } from "@/lib/utils";

// Inline SVG social media icons
const FacebookIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="h-4 w-4"
  >
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);
const InstagramIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-4 w-4"
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);
const YoutubeIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="h-4 w-4"
  >
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58zM9.75 15.02V8.98L15.5 12l-5.75 3.02z" />
  </svg>
);
const TwitterIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="h-4 w-4"
  >
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);
const LinkedinIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-4 w-4"
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export default async function Footer() {
  const mapReviewUrl = process.env.MAP_REVIEW_API_URL;
  const mapReviewToken = process.env.MAP_REVIEW_API_TOKEN;

  const mapReviewPromise =
    mapReviewUrl && mapReviewToken
      ? fetchWithTimeout(mapReviewUrl, {
          headers: {
            Authorization: `Bearer ${mapReviewToken}`,
            "Content-Type": "application/json",
          },
          next: { revalidate: 3600 },
          timeout: 5000,
        })
          .then((r) => {
            if (!r.ok) throw new Error(`Status ${r.status}`);
            return r.json();
          })
          .then((j) => j?.data?.summary ?? j?.summary ?? null)
          .catch((err) => {
            console.warn(
              "[Footer] Map Review fetch failed:",
              err.message || err,
            );
            return null;
          })
      : Promise.resolve(null);

  // Fetch from Sanity on the server — no client-side waterfall
  const [socials, settings, footerMenuRes, mapReviewRes] = await Promise.all([
    fetchSocial().catch(() => [] as Social[]),
    fetchSettings().catch(() => [] as Setting[]),
    fetchMenuByName("Footer").catch(() => null),
    mapReviewPromise,
  ]);

  const reviewSummary = mapReviewRes as {
    averageRating: string;
    totalReviews: number;
  } | null;

  const getSocial = (key: string) =>
    socials.find((s) => s.socialKey === key)?.socialValue;

  const getSetting = (key: string) =>
    settings.find((s) => s.key === key)?.value || "";

  const companyPhone = getSetting("hospital_phone");
  const companyEmail = getSetting("hospital_email");
  const companyAddress = getSetting("hospital_address");
  const googleMapsUrl = getSetting("google_maps_url");
  const hasSocials = socials.length > 0 && socials.some((s) => s.socialValue);

  // Parse custom dynamic contents
  const aboutText =
    getSetting("footer_about") ||
    "Orange Children Hospital is Gujarat's one of the largest 50 bedded pediatric hospital. We specialize in Neonatal & Pediatric Critical Care with Level 3 NICU and PICU.";

  const copyrightText =
    getSetting("footer_copyright") ||
    "Orange Children Hospital. All Rights Reserved.";

  const footerMenu =
    footerMenuRes && footerMenuRes.success && Array.isArray(footerMenuRes.data)
      ? footerMenuRes.data
      : [];

  // Column 1 (Quick Links)
  const quickLinksItem = footerMenu[0];
  const quickLinksTitle = quickLinksItem?.menuName || "Quick Links";
  const quickLinks =
    quickLinksItem &&
    Array.isArray(quickLinksItem.children) &&
    quickLinksItem.children.length > 0
      ? quickLinksItem.children.map((item: Menu) => ({
          label: item.menuName,
          href: item.link,
          isClickable: item.isClickable !== false,
        }))
      : [
          { label: "Home", href: "/", isClickable: true },
          { label: "About Us", href: "/about", isClickable: true },
          { label: "Our Doctors", href: "/doctors", isClickable: true },
          { label: "Our Facilities", href: "/facilities", isClickable: true },
          { label: "Contact Us", href: "/contact", isClickable: true },
        ];

  // Column 2 (Facilities)
  const facilitiesItem = footerMenu[1];
  const facilitiesTitle = facilitiesItem?.menuName || "Facilities";
  const facilities =
    facilitiesItem &&
    Array.isArray(facilitiesItem.children) &&
    facilitiesItem.children.length > 0
      ? facilitiesItem.children.map((item: Menu) => ({
          label: item.menuName,
          href: item.link,
          isClickable: item.isClickable !== false,
        }))
      : [
          { label: "40 Bedded NICU and PICU", href: "#", isClickable: false },
          {
            label: "High-tech Operation Theater",
            href: "#",
            isClickable: false,
          },
          { label: "24 HRS Ambulance Services", href: "#", isClickable: false },
          {
            label: "24X7 Neonatologist & Intensivist",
            href: "#",
            isClickable: false,
          },
          {
            label: "Isolated Pediatric Dialysis Unit",
            href: "#",
            isClickable: false,
          },
        ];

  return (
    <footer className="bg-slate-900 text-gray-300 pt-16 pb-8 border-t border-slate-800">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Logo and About */}
          <div className="flex flex-col gap-4">
            <Link
              href="/"
              className="inline-block bg-white px-4 py-2.5 rounded-xl border border-slate-800 shadow-sm max-w-[190px] mb-2 hover:bg-slate-50 transition-colors duration-200"
            >
              <Image
                src="/orange-logo.png"
                alt="Orange Children Hospital Logo"
                width={172}
                height={50}
                className="h-10 w-auto object-contain"
              />
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed">{aboutText}</p>
            {hasSocials && (
              <div className="flex items-center gap-3 mt-2">
                {getSocial("facebook") && (
                  <a
                    href={getSocial("facebook")}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Facebook"
                    className="flex h-8 w-8 items-center justify-center rounded-md border border-slate-800 bg-slate-900 text-gray-400 transition-colors hover:border-[#F7A707] hover:bg-[#F7A707]/10 hover:text-white"
                  >
                    <FacebookIcon />
                  </a>
                )}
                {getSocial("instagram") && (
                  <a
                    href={getSocial("instagram")}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                    className="flex h-8 w-8 items-center justify-center rounded-md border border-slate-800 bg-slate-900 text-gray-400 transition-colors hover:border-[#F7A707] hover:bg-[#F7A707]/10 hover:text-white"
                  >
                    <InstagramIcon />
                  </a>
                )}
                {getSocial("youtube") && (
                  <a
                    href={getSocial("youtube")}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="YouTube"
                    className="flex h-8 w-8 items-center justify-center rounded-md border border-slate-800 bg-slate-900 text-gray-400 transition-colors hover:border-[#F7A707] hover:bg-[#F7A707]/10 hover:text-white"
                  >
                    <YoutubeIcon />
                  </a>
                )}
                {getSocial("twitter") && (
                  <a
                    href={getSocial("twitter")}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Twitter / X"
                    className="flex h-8 w-8 items-center justify-center rounded-md border border-slate-800 bg-slate-900 text-gray-400 transition-colors hover:border-[#F7A707] hover:bg-[#F7A707]/10 hover:text-white"
                  >
                    <TwitterIcon />
                  </a>
                )}
                {getSocial("linkedin") && (
                  <a
                    href={getSocial("linkedin")}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                    className="flex h-8 w-8 items-center justify-center rounded-md border border-slate-800 bg-slate-900 text-gray-400 transition-colors hover:border-[#F7A707] hover:bg-[#F7A707]/10 hover:text-white"
                  >
                    <LinkedinIcon />
                  </a>
                )}
              </div>
            )}

            {/* Google Rating Badge */}
            {reviewSummary && (
              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 mt-1 bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2.5 hover:border-[#F7A707]/50 transition-colors group w-fit"
              >
                {/* Google G logo */}
                <svg
                  className="w-5 h-5 flex-shrink-0"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                </svg>
                <div className="flex flex-col leading-tight">
                  <div className="flex items-center gap-1">
                    <span className="text-white font-bold text-sm">
                      {parseFloat(reviewSummary.averageRating).toFixed(1)}
                    </span>
                    <div className="flex items-center gap-0.5">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <svg
                          key={s}
                          className={`w-3 h-3 ${s <= Math.round(parseFloat(reviewSummary.averageRating)) ? "text-[#F7A707] fill-[#F7A707]" : "text-slate-600 fill-slate-600"}`}
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                  <span className="text-gray-500 text-[10px] group-hover:text-gray-400 transition-colors">
                    {reviewSummary.totalReviews.toLocaleString()} Google reviews
                  </span>
                </div>
              </a>
            )}
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-white mb-4 text-base uppercase tracking-wider">
              {quickLinksTitle}
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  {link.isClickable ? (
                    <Link
                      href={link.href}
                      className="hover:text-[#F7A707] transition-colors text-sm"
                    >
                      {link.label}
                    </Link>
                  ) : (
                    <span className="text-sm text-gray-400">{link.label}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Facilities */}
          <div>
            <h3 className="font-bold text-white mb-4 text-base uppercase tracking-wider">
              {facilitiesTitle}
            </h3>
            <ul className="space-y-2 text-sm text-gray-400">
              {facilities.map((fac) => (
                <li key={fac.label} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#F7A707]" />
                  {fac.isClickable ? (
                    <Link
                      href={fac.href}
                      className="hover:text-[#F7A707] transition-colors text-sm"
                    >
                      {fac.label}
                    </Link>
                  ) : (
                    <span>{fac.label}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h3 className="font-bold text-white mb-4 text-base uppercase tracking-wider">
              Contact Info
            </h3>
            <p className="text-sm text-gray-400 leading-relaxed mb-2">
              {companyAddress}
            </p>
            <p className="text-sm text-gray-400 mb-1">
              <strong>Phone:</strong> {companyPhone}
            </p>
            <p className="text-sm text-gray-400">
              <strong>Email:</strong> {companyEmail}
            </p>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-500">
            &copy; {new Date().getFullYear()} {copyrightText}
          </p>
        </div>
      </div>
    </footer>
  );
}

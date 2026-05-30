"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { fetchSocial, fetchSettings } from "@/lib/api";

// Inline SVGs for social media icons
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

export default function Footer() {
  const [socials, setSocials] = useState<Social[]>([]);
  const [settings, setSettings] = useState<Setting[]>([]);

  useEffect(() => {
    async function loadSocials() {
      try {
        const fetchedSocials = await fetchSocial();
        setSocials(fetchedSocials || []);
      } catch {
        setSocials([]);
      }
    }
    async function loadSettings() {
      try {
        const fetchedSettings = await fetchSettings();
        setSettings(fetchedSettings || []);
      } catch {
        setSettings([]);
      }
    }
    loadSocials();
    loadSettings();
  }, []);

  const getSocials = (key: string): string | undefined =>
    socials.find((item) => item.socialKey === key)?.socialValue;

  const getSetting = (key: string): string =>
    settings.find((item) => item.key === key)?.value || "";

  const companyPhone = getSetting("hospital_phone") || "+91 97243 05900";
  const companyEmail =
    getSetting("hospital_email") || "info@orangechildrenhospital.com";
  const companyAddress =
    getSetting("hospital_address") ||
    "Opp. Satyamev Royal, Near Tapovan Circle, Chandkheda, Ahmedabad, Gujarat 382424";

  const quickLinks = [
    { label: "Home", href: "/" },
    { label: "About Us", href: "/about" },
    { label: "Our Doctors", href: "/doctors" },
    { label: "Our Facilities", href: "/facilities" },
    { label: "Contact Us", href: "/contact" },
  ];

  const facilities = [
    { label: "40 Bedded NICU and PICU" },
    { label: "High-tech Operation Theater" },
    { label: "24 HRS Ambulance Services" },
    { label: "24X7 Neonatologist & Intensivist" },
    { label: "Isolated Pediatric Dialysis Unit" },
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
            <p className="text-sm text-gray-400 leading-relaxed">
              Orange Children Hospital is Gujarat&apos;s one of the largest 50
              bedded pediatric hospital. We specialize in Neonatal & Pediatric
              Critical Care with Level 3 NICU and PICU.
            </p>
            {/* Dynamic Social Icons */}
            {socials.length > 0 && socials.some((item) => item.socialValue) && (
              <div className="flex items-center gap-3 mt-2">
                {getSocials("facebook") && (
                  <a
                    href={getSocials("facebook")}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Facebook"
                    className="flex h-8 w-8 items-center justify-center rounded-md border border-slate-800 bg-slate-900 text-gray-400 transition-colors hover:border-[#F7A707] hover:bg-[#F7A707]/10 hover:text-white"
                  >
                    <FacebookIcon />
                  </a>
                )}
                {getSocials("instagram") && (
                  <a
                    href={getSocials("instagram")}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                    className="flex h-8 w-8 items-center justify-center rounded-md border border-slate-800 bg-slate-900 text-gray-400 transition-colors hover:border-[#F7A707] hover:bg-[#F7A707]/10 hover:text-white"
                  >
                    <InstagramIcon />
                  </a>
                )}
                {getSocials("youtube") && (
                  <a
                    href={getSocials("youtube")}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="YouTube"
                    className="flex h-8 w-8 items-center justify-center rounded-md border border-slate-800 bg-slate-900 text-gray-400 transition-colors hover:border-[#F7A707] hover:bg-[#F7A707]/10 hover:text-white"
                  >
                    <YoutubeIcon />
                  </a>
                )}
                {getSocials("twitter") && (
                  <a
                    href={getSocials("twitter")}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Twitter"
                    className="flex h-8 w-8 items-center justify-center rounded-md border border-slate-800 bg-slate-900 text-gray-400 transition-colors hover:border-[#F7A707] hover:bg-[#F7A707]/10 hover:text-white"
                  >
                    <TwitterIcon />
                  </a>
                )}
                {getSocials("linkedin") && (
                  <a
                    href={getSocials("linkedin")}
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
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-white mb-4 text-base uppercase tracking-wider">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="hover:text-[#F7A707] transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Facilities */}
          <div>
            <h3 className="font-bold text-white mb-4 text-base uppercase tracking-wider">
              Facilities
            </h3>
            <ul className="space-y-2 text-sm text-gray-400">
              {facilities.map((fac) => (
                <li key={fac.label} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#F7A707]" />
                  {fac.label}
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

        {/* Divider */}
        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} Orange Children Hospital. All Rights
            Reserved.
          </p>
          <div className="flex gap-4 text-xs text-gray-500">
            <Link
              href="/privacy"
              className="hover:text-white transition-colors"
            >
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms of Use
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

import HeroSection from "./sections/HeroSection";
import HeroSlider from "./sections/HeroSlider";
import StatsContentSection from "./sections/StatsContentSection";
import ContentWithImageSection from "./sections/ContentWithImageSection";
import IconCardGridSection from "./sections/IconCardGridSection";
import ImageCardGridSection from "./sections/ImageCardGridSection";
import TeamGridSection from "./sections/TeamGridSection";
import CTASection from "./sections/CTASection";
import AboutHeroSection from "./sections/AboutHeroSection";
import AboutIntroSection from "./sections/AboutIntroSection";
import HighlightQuoteSection from "./sections/HighlightQuoteSection";
import ReasonsGridSection from "./sections/ReasonsGridSection";
import ValuesSection from "./sections/ValuesSection";
import StatsProgressSection from "./sections/StatsProgressSection";
import FacilityFeatureSection from "./sections/FacilityFeatureSection";
import PatientCareServices from "./sections/PatientCareServices";
import HorizontalTimelineSection from "./sections/HorizontalTimelineSection";
import ParagraphEditorSection from "./sections/ParagraphEditorSection";
import InquiryFormSection from "./sections/InquiryFormSection";
import MapEmbedSection from "./sections/MapEmbedSection";
import LogoGridSection from "./sections/LogoGridSection";
import MapReviewSection from "./sections/MapReviewSection";
import AnnouncementSection from "./sections/AnnouncementSection";
import React from "react";

interface SectionRendererProps {
  sections: PageSection[];
  settings?: Array<{ key: string; value: string }>;
  lang?: string;
  initialReviews?: [];
  initialSummary?: null;
}

// These section types control their own full-bleed background — don't alternate them
const SELF_BG_TYPES = new Set([
  "hero",
  "hero_slider",
  "heroslider",
  "cta_section",
  "about_hero",
]);

export default function SectionRenderer({
  sections,
  settings,
  lang = "en",
  initialReviews,
  initialSummary,
}: SectionRendererProps) {
  let altIndex = 0;

  return (
    <>
      {sections.map((mapping, index) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const section = (mapping as any).section || mapping;
        const key = `${section.sectionType}-${index}`;

        const isSelfBg = SELF_BG_TYPES.has(section.sectionType);

        // Alternate: cream (#FFF8EE) → white → cream → white ...
        const bgStyle: React.CSSProperties = isSelfBg
          ? {}
          : altIndex % 2 === 0
            ? { backgroundColor: "#fff7f0" }
            : { backgroundColor: "#ffffff" };

        if (!isSelfBg) altIndex++;

        // Wrapper that injects the alternating background directly on the section element
        const wrap = (node: React.ReactNode) =>
          isSelfBg ? (
            node
          ) : (
            <div key={key} style={bgStyle}>
              {node}
            </div>
          );

        switch (section.sectionType) {
          case "hero":
            return section.sectionData ? (
              <HeroSection key={key} data={section.sectionData} />
            ) : null;

          case "stats_content":
            return section.sectionData
              ? wrap(<StatsContentSection data={section.sectionData} />)
              : null;

          case "content_with_image":
            return section.sectionData
              ? wrap(
                  <ContentWithImageSection
                    data={section.sectionData}
                    lang={lang}
                  />,
                )
              : null;

          case "icon_card_grid":
            return section.sectionData
              ? wrap(<IconCardGridSection data={section.sectionData} />)
              : null;

          case "image_card_grid":
            return section.sectionData
              ? wrap(<ImageCardGridSection data={section.sectionData} />)
              : null;

          case "team_grid":
            return section.sectionData
              ? wrap(<TeamGridSection data={section.sectionData} />)
              : null;

          case "cta_section":
            return section.sectionData ? (
              <CTASection key={key} data={section.sectionData} />
            ) : null;

          case "about_hero":
            return section.sectionData ? (
              <AboutHeroSection key={key} data={section.sectionData} />
            ) : null;

          case "about_intro":
            return section.sectionData
              ? wrap(<AboutIntroSection data={section.sectionData} />)
              : null;

          case "highlight_quote":
            return section.sectionData
              ? wrap(<HighlightQuoteSection data={section.sectionData} />)
              : null;

          case "reasons_grid":
            return section.sectionData
              ? wrap(<ReasonsGridSection data={section.sectionData} />)
              : null;

          case "values_section":
            return section.sectionData
              ? wrap(<ValuesSection data={section.sectionData} />)
              : null;

          case "stats_progress":
            return section.sectionData
              ? wrap(<StatsProgressSection data={section.sectionData} />)
              : null;

          case "facility_feature":
            return section.sectionData
              ? wrap(<FacilityFeatureSection data={section.sectionData} />)
              : null;

          case "patient_care_services":
            return section.sectionData
              ? wrap(<PatientCareServices data={section.sectionData} />)
              : null;

          case "timeline_slider":
            return section.sectionData
              ? wrap(<HorizontalTimelineSection data={section.sectionData} />)
              : null;

          case "paragraph_editor":
            return section.sectionData || section.content
              ? wrap(
                  <ParagraphEditorSection
                    data={section.sectionData || section.content}
                  />,
                )
              : null;

          case "inquiry_form":
            return wrap(
              <InquiryFormSection
                data={section.sectionData as InquiryFormSectionData}
                settings={settings}
              />,
            );

          case "logo_grid":
            return section.sectionData || section.content
              ? wrap(
                  <LogoGridSection
                    data={section.sectionData || section.content}
                  />,
                )
              : null;

          case "map_review":
            return wrap(
              <MapReviewSection
                data={section.sectionData ?? {}}
                initialReviews={initialReviews}
                initialSummary={initialSummary}
              />,
            );

          case "map_embed":
            return section.sectionData
              ? wrap(<MapEmbedSection data={section.sectionData} />)
              : null;

          case "announcement_section":
            return section.sectionData
              ? wrap(<AnnouncementSection data={section.sectionData} />)
              : null;

          case "hero_slider":
          case "heroslider":
            return section.sectionData ? (
              <HeroSlider
                key={key}
                data={section.sectionData}
                settings={settings}
              />
            ) : null;

          default:
            return null;
        }
      })}
    </>
  );
}

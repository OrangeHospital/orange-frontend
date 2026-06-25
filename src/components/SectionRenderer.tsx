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

interface SectionRendererProps {
  sections: PageSection[];
  settings?: Array<{ key: string; value: string }>;
  lang?: string;
}

export default function SectionRenderer({
  sections,
  settings,
  lang = "en",
}: SectionRendererProps) {
  return (
    <>
      {sections.map((mapping, index) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const section = (mapping as any).section || mapping;

        const key = `${section.sectionType}-${index}`;

        switch (section.sectionType) {
          case "hero":
            return section.sectionData ? (
              <HeroSection key={key} data={section.sectionData} />
            ) : null;

          case "stats_content":
            return section.sectionData ? (
              <StatsContentSection key={key} data={section.sectionData} />
            ) : null;

          case "content_with_image":
            return section.sectionData ? (
              <ContentWithImageSection
                key={key}
                data={section.sectionData}
                lang={lang}
              />
            ) : null;

          case "icon_card_grid":
            return section.sectionData ? (
              <IconCardGridSection key={key} data={section.sectionData} />
            ) : null;

          case "image_card_grid":
            return section.sectionData ? (
              <ImageCardGridSection key={key} data={section.sectionData} />
            ) : null;

          case "team_grid":
            return section.sectionData ? (
              <TeamGridSection key={key} data={section.sectionData} />
            ) : null;

          case "cta_section":
            return section.sectionData ? (
              <CTASection key={key} data={section.sectionData} />
            ) : null;

          case "about_hero":
            return section.sectionData ? (
              <AboutHeroSection key={key} data={section.sectionData} />
            ) : null;

          case "about_intro":
            return section.sectionData ? (
              <AboutIntroSection key={key} data={section.sectionData} />
            ) : null;

          case "highlight_quote":
            return section.sectionData ? (
              <HighlightQuoteSection key={key} data={section.sectionData} />
            ) : null;

          case "reasons_grid":
            return section.sectionData ? (
              <ReasonsGridSection key={key} data={section.sectionData} />
            ) : null;

          case "values_section":
            return section.sectionData ? (
              <ValuesSection key={key} data={section.sectionData} />
            ) : null;

          case "stats_progress":
            return section.sectionData ? (
              <StatsProgressSection key={key} data={section.sectionData} />
            ) : null;

          case "facility_feature": {
            return section.sectionData ? (
              <FacilityFeatureSection key={key} data={section.sectionData} />
            ) : null;
          }

          case "patient_care_services":
            return section.sectionData ? (
              <PatientCareServices key={key} data={section.sectionData} />
            ) : null;

          case "timeline_slider":
            return section.sectionData ? (
              <HorizontalTimelineSection key={key} data={section.sectionData} />
            ) : null;

          case "paragraph_editor":
            return section.sectionData || section.content ? (
              <ParagraphEditorSection
                key={key}
                data={section.sectionData || section.content}
              />
            ) : null;

          case "inquiry_form":
            return (
              <InquiryFormSection
                key={key}
                data={section.sectionData as InquiryFormSectionData}
                settings={settings}
              />
            );
          case "logo_grid":
            return section.sectionData || section.content ? (
              <LogoGridSection
                key={key}
                data={section.sectionData || section.content}
              />
            ) : null;
          case "map_embed":
            return section.sectionData ? (
              <MapEmbedSection key={key} data={section.sectionData} />
            ) : null;
          case "hero_slider":
          case "heroslider":
            return section.sectionData ? (
              <HeroSlider key={key} data={section.sectionData} />
            ) : null;
          default:
            return null;
        }
      })}
    </>
  );
}

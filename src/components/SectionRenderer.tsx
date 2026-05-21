import HeroSection from "./sections/HeroSection";
import StatsContentSection from "./sections/StatsContentSection";
import ContentWithImageSection from "./sections/ContentWithImageSection";
import IconCardGridSection from "./sections/IconCardGridSection";
import TeamGridSection from "./sections/TeamGridSection";

interface SectionRendererProps {
  sections: PageSection[];
  settings?: Array<{ key: string; value: string }>;
  lang?: string;
}

export default function SectionRenderer({
  sections,
  lang = "en",
}: SectionRendererProps) {
  return (
    <>
      {sections.map((section, index) => {
        const key = section.id ? section.id : `${index}`;

        switch (section.sectionType) {
          case "hero":
            return section.content ? (
              <HeroSection key={key} data={section.content} lang={lang} />
            ) : null;

          case "stats_content":
            return section.content ? (
              <StatsContentSection key={key} data={section.content} />
            ) : null;

          case "content_with_image":
            return section.content ? (
              <ContentWithImageSection
                key={key}
                data={section.content}
                lang={lang}
              />
            ) : null;

          case "icon_card_grid":
            return section.content ? (
              <IconCardGridSection key={key} data={section.content} />
            ) : null;

          case "team_grid":
            return section.content ? (
              <TeamGridSection key={key} data={section.content} />
            ) : null;

          default:
            return null;
        }
      })}
    </>
  );
}

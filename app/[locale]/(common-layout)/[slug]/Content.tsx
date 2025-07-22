import type { ContentPage } from "@/components/WithRealTimeUpdates/types";
import AboutIntro from "@/components/blocksWithVariants/AboutIntroRecord/AboutIntro";
import PostGridRenderer from "@/components/blocksWithVariants/AllPostsSectionRecord/PostGridRenderer";
import BrandCards from "@/components/blocksWithVariants/BrandSectionRecord/BrandCards";
import Brands from "@/components/blocksWithVariants/BrandSectionRecord/Brands";
import DetailSection from "@/components/blocksWithVariants/DetailSectionRecord/DetailSection";
import FAQAccordion from "@/components/blocksWithVariants/FaqSectionRecord/FAQAccordion";
import FAQGrid from "@/components/blocksWithVariants/FaqSectionRecord/FAQGrid";
import FeatureCards from "@/components/blocksWithVariants/FeatureListSectionRecord/FeatureCards";
import MinimalCardsFeature from "@/components/blocksWithVariants/FeatureListSectionRecord/MinimalCardsFeature";
import Blog from "@/components/blocksWithVariants/FeaturedPostsSectionRecord/Blog";
import CarouselFeaturedPosts from "@/components/blocksWithVariants/FeaturedPostsSectionRecord/CarouselFeaturedPosts";
import FullImageFeaturedPosts from "@/components/blocksWithVariants/FeaturedPostsSectionRecord/FullImageFeaturedPosts";
import MinimalistFeaturedPostsGrid from "@/components/blocksWithVariants/FeaturedPostsSectionRecord/MinimalistFeaturedPostsGrid";
import ModernPostCards from "@/components/blocksWithVariants/FeaturedPostsSectionRecord/ModernPostCards";
import BackgroundImageHero from "@/components/blocksWithVariants/HeroSectionRecord/BackgroundImage";
import GradientHero from "@/components/blocksWithVariants/HeroSectionRecord/GradientHero";
import Hero from "@/components/blocksWithVariants/HeroSectionRecord/Hero";
import RightImageHero from "@/components/blocksWithVariants/HeroSectionRecord/RightImageHero";
import Carousel from "@/components/blocksWithVariants/ReviewSectionRecord/Carousel";
import MinimalCarousel from "@/components/blocksWithVariants/ReviewSectionRecord/MinimalCarousel";
import StatsSection from "@/components/blocksWithVariants/StatsSectionRecord/StatsSection";
import ExpandedTeam from "@/components/blocksWithVariants/TeamSectionRecord/ExpandedTeam";
import Video from "@/components/blocksWithVariants/VideoSectionRecord/Video";
import { buildUrl } from "@/utils/globalPageProps";
import { notFound, redirect } from "next/navigation";
import type { PageProps, Query } from "./meta";
import { Box } from "@chakra-ui/react";
import BackgroundVideoHero from "@/components/blocksWithVariants/HeroSectionRecord/BackgroundVideo";
import ExpandedCasting from "@/components/blocksWithVariants/CastingSectionRecord/ExpandedCasting";
import ExpandedOcasting from "@/components/blocksWithVariants/OcastingSectionRecord/ExpandedOcasting";
import ExpandedNewTeam from "@/components/blocksWithVariants/NewTeamSectionRecord/ExpandedNewTeam";
import DetailSectionCta from "@/components/blocksWithVariants/DetailSectionCtaRecord /DetailSectionCta";
import ContactSection from "@/components/blocksWithVariants/ContactSection/ContactSection";

const Content: ContentPage<PageProps, Query> = ({
  data,
  ...globalPageProps
}) => {
  if (!data.page) {
    notFound();
  }

  return (
    <Box id="content-slug">
      {data.page.sections.map((section) => {
        switch (section.__typename) {
          case "HeroSectionRecord": {
            switch (section.displayOptions) {
              case "gradient":
                return <GradientHero fragment={section} />;
              case "right_image":
                return <RightImageHero fragment={section} />;
              case "background_image":
                return <BackgroundImageHero fragment={section} />;
              case "background_video":
                return <BackgroundVideoHero fragment={section} />;
              default:
                return <Hero fragment={section} />;
            }
          }

          case "FeatureListSectionRecord": {
            switch (section.displayOption) {
              case "card_minimal":
                return <MinimalCardsFeature fragment={section} />;
              default:
                return <FeatureCards fragment={section} />;
            }
          }

          case "VideoSectionRecord": {
            return <Video fragment={section} />;
          }
          case "BrandSectionRecord": {
            switch (section.displayOptions) {
              case "brand_cards":
                return <BrandCards fragment={section} />;
              default:
                return <Brands fragment={section} />;
            }
          }
          case "DetailSectionRecord": {
            return <DetailSection fragment={section} />;
          }
          case "DetailSectionCtaRecord": {
            return <DetailSectionCta fragment={section} />;
          }
          case "ContactSectionRecord": {
            return <ContactSection fragment={section} />;
          }
          case "ReviewSectionRecord": {
            switch (section.displayOptions) {
              case "minimal_carrousel":
                return <MinimalCarousel fragment={section} />;

              default:
                return <Carousel fragment={section} />;
            }
          }

          case "FeaturedPostsSectionRecord": {
            switch (section.displayOptions) {
              case "modern_cards":
                return (
                  <ModernPostCards
                    globalPageProps={globalPageProps}
                    fragment={section}
                  />
                );
              case "carrousel":
                return (
                  <CarouselFeaturedPosts
                    globalPageProps={globalPageProps}
                    fragment={section}
                  />
                );
              case "minimalist_grid":
                return (
                  <MinimalistFeaturedPostsGrid
                    globalPageProps={globalPageProps}
                    fragment={section}
                  />
                );
              case "full_image_card":
                return (
                  <FullImageFeaturedPosts
                    globalPageProps={globalPageProps}
                    fragment={section}
                  />
                );
              default:
                return (
                  <Blog globalPageProps={globalPageProps} fragment={section} />
                );
            }
          }

          case "TeamSectionRecord": {
            return (
              <ExpandedTeam
                fragment={section}
                globalPageProps={globalPageProps}
              />
            );
          }
          case "CastingSectionRecord": {
            return (
              <ExpandedCasting
                fragment={section}
                globalPageProps={globalPageProps}
              />
            );
          }

          case "OcastingSectionRecord": {
            return (
              <ExpandedOcasting
                fragment={section}
                globalPageProps={globalPageProps}
              />
            );
          }

          case "NewTeamSectionRecord": {
            return (
              <ExpandedNewTeam
                fragment={section}
                globalPageProps={globalPageProps}
              />
            );
          }

          case "FaqSectionRecord": {
            if (section.displayOptions === "accordion") {
              return <FAQAccordion fragment={section} />;
            }

            return <FAQGrid fragment={section} />;
          }
          case "StatsSectionRecord": {
            return <StatsSection fragment={section} />;
          }
          case "AboutIntroRecord": {
            return <AboutIntro fragment={section} />;
          }
          case "AllPostsSectionRecord": {
            return (
              <PostGridRenderer data={data} globalPageProps={globalPageProps} />
            );
          }
          case "RedirectSectionRecord": {
            const redirectSectionRecord = section;
            redirect(
              buildUrl(
                globalPageProps,
                `/${redirectSectionRecord.slugToRedirectTo}`
              )
            );
            return null;
          }
          default:
            return null;
        }
      })}
    </Box>
  );
};

export default Content;

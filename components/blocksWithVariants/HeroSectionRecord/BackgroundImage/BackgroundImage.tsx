"use client";
import { Box, Button, Heading, Stack, Text } from "@chakra-ui/react";
import { type FragmentType, getFragmentData } from "@/graphql/types";
import {
  DatoImage_ResponsiveImageFragmentDoc,
  HeroSectionFragmentDoc,
} from "@/graphql/types/graphql";
import { MarkdownRenderer } from "@/components/MarkdownRenderer";
import HoverGlowButton from "@/components/GlowButton";

type Props = {
  fragment: FragmentType<typeof HeroSectionFragmentDoc>;
};

const BackgroundImageHero = ({ fragment }: Props) => {
  const {
    heroTitle,
    heroSubtitle,
    buttons,
    heroImage: heroImageFragment,
  } = getFragmentData(HeroSectionFragmentDoc, fragment);

  const heroResponsiveImage = heroImageFragment
    ? getFragmentData(
        DatoImage_ResponsiveImageFragmentDoc,
        heroImageFragment.responsiveImage
      )
    : null;

  console.log(heroResponsiveImage?.src);

  return (
    <Box
      id="BackgroundImageHero"
      mt="20"
      h="48rem"
      w="full"
      bgImage={`url('${heroResponsiveImage?.src}')`}
      bgSize="cover"
      bgPos="center"
      objectFit="cover"
    >
      <Box
        h="full"
        w="full"
        px={{ base: 8, lg: 32 }}
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Stack spacing={8} textAlign="center" align="center">
          <Heading as="h1" color="black" fontWeight="bold">
            {heroTitle}
          </Heading>

          <MarkdownRenderer>{heroSubtitle || ""}</MarkdownRenderer>

          <Stack direction="row" spacing={4} flexWrap="wrap" justify="center">
            {buttons.map((button) => (
              <HoverGlowButton
                primary={button.primary}
                key={button.id}
                href={button.url || "#"}
              >
                {button.label}
              </HoverGlowButton>
            ))}
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
};

export default BackgroundImageHero;

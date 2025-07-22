"use client";

import { Box, Stack, Text } from "@chakra-ui/react";
import { keyframes } from "@emotion/react";
import { type FragmentType, getFragmentData } from "@/graphql/types";
import { HeroSectionFragmentDoc } from "@/graphql/types/graphql";
import { MarkdownRenderer } from "@/components/MarkdownRenderer";
import { VideoPlayer } from "react-datocms/video-player";
import MakeHeading from "@/components/MakeHeading";
import HoverGlowButton from "@/components/GlowButton";
import { motion } from "framer-motion";

const MotionBox = motion(Box);

const fadeUp = keyframes`
  0% {
    transform: translateY(250px);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
`;

type Props = {
  fragment: FragmentType<typeof HeroSectionFragmentDoc>;
};

const BackgroundVideoHero = ({ fragment }: Props) => {
  const { heroTitle, heroSubtitle, heroImages, buttons } = getFragmentData(
    HeroSectionFragmentDoc,
    fragment
  );

  return (
    <Box
      id="BackgroundVideoHero"
      h="39rem"
      w="full"
      mx="auto"
      bgSize="cover"
      bgPos="center"
      position="relative"
      display="grid"
      placeContent="center"
      maxW="container.xl"
    >
      {/* Vídeo de fundo */}
      <Box
        borderBottomRadius={48}
        w="100%"
        h="100%"
        position="absolute"
        top={0}
        left={0}
        zIndex={5}
        overflow="hidden"
        boxShadow="0 30px 24px -8px rgba(0, 0, 0, 0.4)"
      >
        <Box
          w="100%"
          h="100%"
          position="absolute"
          borderBottomRadius={20}
          top={0}
          left={0}
          zIndex={6}
          opacity={0.5}
          sx={{
            borderImage: "fill 0 linear-gradient(#0000,#000)",
          }}
        />
        {/* {heroImages?.map((item: any, index) => (
          <Box
            key={index}
            w="100%"
            h="100%"
            sx={{
              "mux-player": {
                "--controls": "none",
                "--media-object-fit": "cover",
                "--media-object-position": "center",
              },
            }}
          >
            <VideoPlayer
              data={item.video}
              disableCookies
              loop
              autoPlay="muted"
              startTime={0}
              style={{
                width: "100%",
                height: "100%",
                overflow: "hidden",
              }}
            />
          </Box>
        ))} */}

        <Box
          as="video"
          autoPlay
          muted
          loop
          playsInline
          w="100%"
          h="100%"
          sx={{ objectFit: "cover" }}
        >
          <source src="/video/lais.mp4" type="video/mp4" />
        </Box>
      </Box>
      <Stack
        display="grid"
        position="relative"
        placeContent="center"
        justify="center"
        align="center"
        zIndex={10}
        spacing={8}
        textAlign="center"
      >
        <MotionBox
          animation={`${fadeUp} 0.8s ease-out forwards`}
          initial={{ opacity: 0 }}
          transitionDelay="0.1s"
        >
          <MakeHeading
            as="h1"
            color="black"
            fontWeight="bold"
            fontSize={{
              base: "3xl",
              sm: "3xl",
              md: "3xl",
              lg: "6xl",
              xl: "6xl",
              "2xl": "6xl",
            }}
            fontFamily="heading"
            variant="titleH1"
          >
            {heroTitle}
          </MakeHeading>
        </MotionBox>

        <MotionBox
          animation={`${fadeUp} 0.8s ease-out forwards`}
          transitionDelay="0.3s"
          initial={{ opacity: 0 }}
          px={{
            base: "6",
            sm: "6",
            md: "6",
            lg: "0",
            xl: "0",
            "2xl": "0",
          }}
        >
          <MarkdownRenderer>{heroSubtitle || ""}</MarkdownRenderer>
        </MotionBox>

        <MotionBox
          animation={`${fadeUp} 0.8s ease-out forwards`}
          initial={{ opacity: 0 }}
          sx={{ animationDelay: "0.3s" }}
        >
          <Stack
            direction={{
              base: "column",
              sm: "column",
              md: "column",
              lg: "row",
              xl: "row",
              "2xl": "row",
            }}
            spacing={4}
            px={{
              base: "6",
              sm: "6",
              md: "6",
              lg: "0",
              xl: "0",
              "2xl": "0",
            }}
            flexWrap="wrap"
            justify="center"
          >
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
        </MotionBox>
      </Stack>
    </Box>
  );
};

export default BackgroundVideoHero;

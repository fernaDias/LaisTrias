"use client";
import DatoImage from "@/components/DatoImage";
import type { ContentPage } from "@/components/WithRealTimeUpdates/types";
import { notFound } from "next/navigation";
import type { PageProps, Query } from "./meta";
import { Box, Heading, Text, Flex, HStack, Tag } from "@chakra-ui/react";
import { HoverGlowLink } from "@/components/GlowLink";
import SvgRenderer from "@/components/SvgRenderer";
import { motion, useAnimation, type Variants } from "framer-motion";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

const MotionBox = motion(Box);

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

const Content: ContentPage<PageProps, Query> = ({ data }) => {
  if (!data.newTeam) {
    notFound();
  }

  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.3 });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [inView, controls]);

  return (
    <Box
      as="section"
      id="CastingContent"
      display="flex"
      flexDirection="column"
      ref={ref}
    >
      <Box
        mx="auto"
        mb={8}
        display="flex"
        alignItems="center"
        justifyContent="center"
        px={{ base: 6, lg: 16 }}
      >
        <Box py={10}>
          <Flex
            flexDir={{ base: "column", lg: "row" }}
            align="center"
            justify="center"
            gap={{ base: 4, lg: 8 }}
          >
            <MotionBox
              position="relative"
              aspectRatio="square"
              overflow="hidden"
              rounded="xl"
              boxShadow="xl"
              variants={fadeUp}
              initial="hidden"
              animate={controls}
            >
              <Box
                h={{ base: "300px", lg: "600px" }}
                w={{ base: "230px", lg: "430px" }}
              >
                <DatoImage
                  layout="fill"
                  objectFit="cover"
                  objectPosition="top"
                  fragment={data.newTeam.picture.responsiveImage}
                />
              </Box>
            </MotionBox>

            <MotionBox
              flexDir="column"
              gap={6}
              mx={{ base: 4, lg: 8 }}
              display="flex"
              variants={fadeUp}
              initial="hidden"
              animate={controls}
            >
              <Heading
                as="h1"
                fontSize={{ base: "3xl", lg: "6xl" }}
                fontWeight="semibold"
                textTransform="capitalize"
                color="primary.500"
                pt={{ base: 4, lg: 10 }}
                textShadow="0 4px 8px rgba(0, 0, 0, 0.4)"
              >
                {data.newTeam.name}
              </Heading>

              <HStack columnGap={6}>
                <Text fontSize="sm" color="black">
                  @{data.newTeam.teamPosition}
                </Text>
              </HStack>

              <Flex
                rounded="34px"
                color="black"
                flexDir="column"
                gap={4}
                maxW="450px"
              >
                <Text fontSize="sm">{data.newTeam.description}</Text>
              </Flex>

              <Flex columnGap={4}>
                {data.newTeam?.socialMediaLinks.map((socialMedia) => (
                  <HoverGlowLink
                    key={socialMedia.id}
                    href={socialMedia.url}
                    aria-label="social-link"
                  >
                    <SvgRenderer boxSize={8} url={socialMedia.icon.url} />
                  </HoverGlowLink>
                ))}
              </Flex>
            </MotionBox>
          </Flex>
        </Box>
      </Box>
    </Box>
  );
};

export default Content;

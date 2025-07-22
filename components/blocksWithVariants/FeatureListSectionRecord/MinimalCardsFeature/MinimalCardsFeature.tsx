"use client";

import {
  Box,
  Center,
  Container,
  Image,
  Heading,
  SimpleGrid,
  Text,
  HStack,
  Stack,
} from "@chakra-ui/react";
import { type FragmentType, getFragmentData } from "@/graphql/types";
import { FeatureListSectionFragmentDoc } from "@/graphql/types/graphql";
import { MarkdownRenderer } from "@/components/MarkdownRenderer";
import { type Variants, motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";

type Props = {
  fragment: FragmentType<typeof FeatureListSectionFragmentDoc>;
};

const MotionBox = motion(Box);

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.6,
      ease: "easeOut",
    },
  }),
};

const MinimalCardsFeature = ({ fragment }: Props) => {
  const {
    feature: features,
    featuresHeader,
    featuresSubheader,
  } = getFragmentData(FeatureListSectionFragmentDoc, fragment);

  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  return (
    <Box id="minimalCardsFeature" ref={ref}>
      <Container
        display="flex"
        justifyContent="center"
        alignItems="center"
        maxW="container.xl"
        position="relative"
        zIndex={1}
        py={10}
        px={8}
      >
        <Stack flexDir={{ base: "column", lg: "row" }} justify="center">
          {features.map((feature, i) => (
            <MotionBox
              key={feature.id}
              p={6}
              maxW="190px"
              display="flex"
              flexDir="column"
              alignItems="center"
              textAlign="center"
              variants={cardVariants}
              initial="hidden"
              animate={controls}
              custom={i}
            >
              <Box pos="relative" h="100px" w="190px" overflow="hidden">
                <Image
                  src="/svgs/padrao.svg"
                  alt={feature.featureTitle ?? "icon"}
                  objectFit="contain"
                  w="100%"
                  h="100%"
                  transform="rotate(90deg)"
                />
              </Box>

              <Heading
                as="h2"
                fontSize={{ base: "sm", lg: "xl" }}
                fontFamily="heading"
                color="black"
                mt={{ base: 2, md: 0 }}
              >
                {feature.featureTitle}
              </Heading>

              <MarkdownRenderer>
                {feature.featureDescription || ""}
              </MarkdownRenderer>
            </MotionBox>
          ))}
        </Stack>
      </Container>
    </Box>
  );
};

export default MinimalCardsFeature;

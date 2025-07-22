"use client";
import SectionTitle from "@/components/SectionTitle";
import { type FragmentType, getFragmentData } from "@/graphql/types";
import { FeatureListSectionFragmentDoc } from "@/graphql/types/graphql";
import {
  Box,
  Container,
  Heading,
  SimpleGrid,
  Text,
  VStack,
  Center,
} from "@chakra-ui/react";
import MarkdownRenderer from "react-markdown";
import { motion, useAnimation, type Variants } from "framer-motion";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

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

const Features = ({ fragment }: Props) => {
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
    <Box as="section" id="features" ref={ref}>
      <Container
        maxW="container.xl"
        position="relative"
        zIndex={1}
        py={10}
        px={8}
      >
        <MotionBox
          maxW="3xl"
          mx="auto"
          textAlign="center"
          pb={{ base: 12, md: 20 }}
          variants={cardVariants}
          initial="hidden"
          animate={controls}
        >
          <Heading
            as="h1"
            fontSize={{ base: "3xl", lg: "6xl" }}
            fontWeight="bold"
            color="black"
            lineHeight="tight"
          >
            {featuresHeader}
          </Heading>

          <MarkdownRenderer>{featuresSubheader || ""}</MarkdownRenderer>
        </MotionBox>
        <SimpleGrid
          columns={{ base: 1, md: 2, lg: 3 }}
          spacingX={8}
          spacingY={14}
        >
          {features.map(({ id, icon, featureTitle, featureDescription }) => (
            <Box key={id} w="full">
              <VStack spacing={5} textAlign="center" px={{ base: 16, md: 0 }}>
                <Center
                  h="70px"
                  w="70px"
                  bg="primary"
                  opacity={0.1}
                  color="primary"
                  rounded="24px"
                  overflow="hidden"
                  position="relative"
                >
                  {/* <DatoImage
                      fragment={i.responsiveImage}
                      className="h-full w-full aobject-contain"
                      layout="fill"
                      objectFit="cover"
                      objectPosition="50% 50%"
                    /> */}
                </Center>
                <Heading
                  fontSize={{ base: "2xl", lg: "xl", xl: "2xl" }}
                  fontWeight="bold"
                  color="black"
                >
                  {featureTitle}
                </Heading>
                <Text
                  fontSize="24px"
                  fontWeight="medium"
                  color="body"
                  lineHeight="relaxed"
                  pr="10px"
                >
                  <MarkdownRenderer>
                    {featureDescription || ""}
                  </MarkdownRenderer>
                </Text>
              </VStack>
            </Box>
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  );
};

export default Features;

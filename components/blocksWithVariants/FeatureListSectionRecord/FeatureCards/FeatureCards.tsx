"use client";
import { type FragmentType, getFragmentData } from "@/graphql/types";
import { FeatureListSectionFragmentDoc } from "@/graphql/types/graphql";
import {
  Box,
  Button,
  Container,
  Heading,
  Image,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/react";
import { MarkdownRenderer } from "@/components/MarkdownRenderer";
import { motion, useAnimation, type Variants } from "framer-motion";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { keyframes } from "@emotion/react";

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

const FeatureCards = ({ fragment }: Props) => {
  const {
    feature: features,
    featuresHeader,
    featuresSubheader,
    ctabutton,
  } = getFragmentData(FeatureListSectionFragmentDoc, fragment);

  const hasButton = ctabutton !== null;

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
    <Box id="FeatureCards" ref={ref}>
      <Container
        maxW="container.xl"
        position="relative"
        zIndex={1}
        py={10}
        px={{ base: 6, md: 8 }}
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
            fontSize={{ base: "5xl", lg: "6xl" }}
            fontWeight="bold"
            color="colorBrand.200"
            lineHeight="tight"
          >
            {featuresHeader}
          </Heading>

          <MarkdownRenderer>{featuresSubheader || ""}</MarkdownRenderer>
        </MotionBox>

        <SimpleGrid
          columns={{ base: 1, md: 2, lg: 3 }}
          spacing={6}
          maxW={{ base: "sm", md: "2xl", lg: "100%" }}
          mx="auto"
          alignItems="start"
        >
          {features.map((feature, i) => (
            <MotionBox
              key={feature.id}
              h={{ base: "auto", md: "18rem" }}
              bg="white"
              boxShadow="0 16px 24px -8px #3f4d6355"
              rounded="34px"
              p={6}
              gap={2}
              display="flex"
              flexDir="column"
              alignItems="center"
              textAlign="center"
              variants={cardVariants}
              initial="hidden"
              animate={controls}
              custom={i}
            >
              <Box
                h={{ base: "50px", md: "50px" }}
                display="flex"
                alignItems="center"
                justifyContent="center"
                w="100%"
              >
                <Image
                  src={feature.icon.url}
                  alt={feature.featureTitle ?? "icon"}
                  objectFit="contain"
                  w="100%"
                  h="100%"
                />
              </Box>

              <Heading
                as="h4"
                fontSize={{ base: "md", md: "lg" }}
                fontWeight="bold"
                mb={1}
                lineHeight="snug"
                noOfLines={2}
                color="black"
              >
                {feature.featureTitle ?? ""}
              </Heading>

              <MarkdownRenderer>
                {feature.featureDescription ?? ""}
              </MarkdownRenderer>
            </MotionBox>
          ))}
        </SimpleGrid>

        {hasButton && (
          <Stack
            direction="row"
            justifyContent="center"
            spacing={2.5}
            w="full"
            justify={{ base: "center", lg: "flex-start" }}
            mt={10}
          >
            <MotionBox
              variants={cardVariants}
              initial="hidden"
              animate={controls}
              custom={features.length}
            >
              <Button
                key={ctabutton?.id}
                as="a"
                href={ctabutton?.url || "#"}
                colorScheme={ctabutton?.primary ? "primary" : "gray"}
                bg={ctabutton?.primary ? "primary.500" : "gray.200"}
                color={ctabutton?.primary ? "white" : "gray.500"}
                _hover={{
                  bg: ctabutton?.primary ? "indigo.600" : "gray.300",
                }}
                _active={{
                  bg: ctabutton?.primary ? "indigo.700" : "gray.300",
                  color: ctabutton?.primary ? "white" : "gray.700",
                }}
                _focusVisible={{
                  ring: 2,
                  ringColor: "indigo.300",
                }}
                px={8}
                py={3}
                fontSize={{ base: "sm", md: "base" }}
                fontWeight="semibold"
                borderRadius="34px"
                textAlign="center"
              >
                {ctabutton?.label}
              </Button>
            </MotionBox>
          </Stack>
        )}
      </Container>
    </Box>
  );
};

export default FeatureCards;

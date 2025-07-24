"use client";

import Highlighter from "@/components/Highlighter";
import { type FragmentType, getFragmentData } from "@/graphql/types";
import { AboutIntroFragmentDoc } from "@/graphql/types/graphql";
import { isHeading, isParagraph } from "datocms-structured-text-utils";
import {
  StructuredText as StructuredTextField,
  renderNodeRule,
} from "react-datocms";
import { MarkdownRenderer } from "@/components/MarkdownRenderer";
import DatoImage from "../../../DatoImage";
import MakeHeading from "@/components/MakeHeading";

import { Box, Container, Text, SimpleGrid, Button } from "@chakra-ui/react";

import { motion, useAnimation, type Variants } from "framer-motion";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

type Props = {
  fragment: FragmentType<typeof AboutIntroFragmentDoc>;
};

const MotionBox = motion(Box);

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.3,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

const AboutIntro = ({ fragment }: Props) => {
  const {
    header,
    subheader,
    images,
    introductionText: introduction,
  } = getFragmentData(AboutIntroFragmentDoc, fragment);

  const words = header.split(/\s+/);
  const firstTwoWords = words.slice(0, 2).join(" ");
  const restOfTheString = words.slice(2).join(" ");

  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const [carouselIndex, setCarouselIndex] = useState(0);
  const carouselImages = images.slice(1);

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCarouselIndex((prev) => (prev + 1) % carouselImages.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [carouselImages.length]);

  return (
    <Box id="AboutIntro" ref={ref}>
      <Container maxW="container.xl" px={[6, 8]} py={14}>
        <MotionBox
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
          {/* Título e imagem estática */}
          <SimpleGrid columns={{ base: 1, lg: 2 }} gap={8} mb={12}>
            <MotionBox
              variants={itemVariants}
              custom={0}
              display="flex"
              flexDir="column"
              justifyContent="center"
              alignItems="flex-start"
              textAlign="left"
              px={{ base: 0, lg: 6 }}
            >
              <MakeHeading
                variant="titleH1"
                color="black"
                mb={4}
                fontSize="5xl"
              >
                <Box as="span" color="primary.500">
                  {firstTwoWords}
                </Box>{" "}
                {restOfTheString}
              </MakeHeading>

              <Text color="black" fontSize="lg" mb={4}>
                {subheader}
              </Text>

              <Button
                as="a"
                href="https://wa.me/5548988786918"
                colorScheme="colorBrand.100"
                bg="primary.500"
                color="black"
                _hover={{ bg: "indigo.600" }}
                _active={{ bg: "gray.300", color: "gray.700" }}
                _focusVisible={{ ring: 2, ringColor: "indigo.300" }}
                px={8}
                py={3}
                fontSize={{ base: "sm", md: "base" }}
                fontWeight="semibold"
                borderRadius="lg"
              >
                Fale conosco
              </Button>
            </MotionBox>

            <MotionBox variants={itemVariants} custom={1}>
              <Box
                position="relative"
                height={{ base: "300px", lg: "500px" }}
                width="100%"
                borderRadius="24px"
                overflow="hidden"
                boxShadow="0 16px 24px -8px rgba(0, 0, 0, 0.4)"
              >
                <DatoImage
                  fragment={images[0].responsiveImage}
                  layout="fill"
                  objectFit="cover"
                  objectPosition="50% 20%"
                />
              </Box>
            </MotionBox>
          </SimpleGrid>

          {/* Carrossel e texto à direita */}
          <SimpleGrid columns={{ base: 1, lg: 2 }} gap={8}>
            <MotionBox variants={itemVariants} custom={2}>
              {carouselImages.length > 0 && (
                <Box
                  mt={10}
                  position="relative"
                  height="300px"
                  borderRadius="24px"
                  overflow="hidden"
                  boxShadow="0 16px 24px -8px rgba(0, 0, 0, 0.4)"
                >
                  {carouselImages.map((image, i) => (
                    <motion.div
                      key={image.id}
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        opacity: i === carouselIndex ? 1 : 0,
                        transition: "opacity 0.8s ease-in-out",
                      }}
                    >
                      <DatoImage
                        fragment={image.responsiveImage}
                        layout="fill"
                        objectFit="cover"
                        objectPosition="50% 50%"
                      />
                    </motion.div>
                  ))}
                </Box>
              )}
            </MotionBox>

            <MotionBox
              variants={itemVariants}
              custom={3}
              display="flex"
              flexDir="column"
              justifyContent="center"
              alignItems="flex-start"
              textAlign="left"
              px={{ base: 0, lg: 6 }}
            >
              {introduction && (
                <StructuredTextField
                  data={introduction}
                  customNodeRules={[
                    renderNodeRule(isHeading, ({ children, key }) => (
                      <MakeHeading
                        variant="titleH3"
                        fontSize="2xl"
                        key={key}
                        color="black"
                      >
                        {children}
                      </MakeHeading>
                    )),
                    renderNodeRule(isParagraph, ({ children, key }) => (
                      <Text fontSize="16px" color="black" key={key}>
                        {children}
                      </Text>
                    )),
                  ]}
                  renderNode={Highlighter}
                />
              )}
            </MotionBox>
          </SimpleGrid>
        </MotionBox>
      </Container>
    </Box>
  );
};

export default AboutIntro;

"use client";
import {
  Box,
  Flex,
  Heading,
  Text,
  Link as ChakraLink,
  Container,
  chakra,
} from "@chakra-ui/react";
import { type Variants, motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import DatoImage from "@/components/DatoImage";
import { type FragmentType, getFragmentData } from "@/graphql/types";
import { OcastingSectionFragmentDoc } from "@/graphql/types/graphql";
import type { GlobalPageProps } from "@/utils/globalPageProps";
import { buildUrl } from "@/utils/globalPageProps";
import { MarkdownRenderer } from "@/components/MarkdownRenderer";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useEffect, useState } from "react";

// Motion-enhanced Chakra components
const MotionHeading = motion(Heading);
const MotionBox = motion(Box);

type Props = {
  fragment: FragmentType<typeof OcastingSectionFragmentDoc>;
  globalPageProps: GlobalPageProps;
};

const headingVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const subtitleVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut", delay: 0.3 },
  },
};

const ExpandedOcasting = ({ fragment, globalPageProps }: Props) => {
  const {
    title: header,
    subtitle: subheader,
    showcasedOcasting: casting,
  } = getFragmentData(OcastingSectionFragmentDoc, fragment);

  const [currentSlide, setCurrentSlide] = useState(0);
  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    centerMode: true,
    centerPadding: "20px",
    slidesToShow: 3,
    beforeChange: (current: number, next: number) => setCurrentSlide(next),
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          centerPadding: "0px",
        },
      },
    ],
  };

  return (
    <Box id="ExpendedOCasting" ref={ref}>
      <Container maxW="container.xl" py={10} px={8}>
        {/* Animated Heading */}
        <MotionHeading
          as="h1"
          textAlign="center"
          fontSize={{ base: "2xl", lg: "6xl" }}
          color="black"
          initial="hidden"
          animate={controls}
          variants={headingVariants}
        >
          {header}
        </MotionHeading>
        <MotionBox
          maxW="2xl"
          mx="auto"
          my={6}
          textAlign="center"
          color="black"
          initial="hidden"
          animate={controls}
          variants={subtitleVariants}
        >
          <MarkdownRenderer>{subheader || ""}</MarkdownRenderer>
        </MotionBox>

        <MotionBox
          maxW="100%"
          width="1000px"
          mx="auto"
          initial={{ opacity: 0, y: 60 }}
          animate={controls}
          variants={subtitleVariants}
        >
          <Slider {...settings}>
            {casting.map((cast, index) => {
              const isActive = index === currentSlide;
              const isPrev =
                index === currentSlide - 1 ||
                (currentSlide === 0 && index === casting.length - 1);
              const isNext =
                index === currentSlide + 1 ||
                (currentSlide === casting.length - 1 && index === 0);

              let scale = 0.05;
              let opacity = 0.6;

              if (isActive) {
                scale = 0.9;
                opacity = 1;
              } else if (isPrev || isNext) {
                scale = 0.8;
                opacity = 0.8;
              }

              return (
                <Box
                  key={cast.id}
                  px={2}
                  transition="all 0.3s ease"
                  transform={`scale(${scale})`}
                  opacity={opacity}
                  width="200px"
                  height="370px"
                >
                  <ChakraLink
                    role="group"
                    href={buildUrl(
                      globalPageProps,
                      `/posts/ocasting/${cast.slug}`
                    )}
                    borderRadius="xl"
                    bg="#2a2a2a"
                    boxShadow="lg"
                    p={6}
                    display="block"
                    textAlign="center"
                    _hover={{
                      transform: "scale(1.0)",
                      opacity: 1,
                      textDecoration: "none",
                    }}
                  >
                    <Box
                      position="relative"
                      w="100%"
                      h="300px"
                      rounded="xl"
                      overflow="hidden"
                    >
                      <DatoImage
                        layout="fill"
                        objectFit="cover"
                        fragment={cast.picture.responsiveImage}
                      />
                    </Box>
                    <Heading
                      mt={4}
                      as="h2"
                      fontSize={{ base: "lg", md: "xl" }}
                      color="black"
                    >
                      {cast.name}
                    </Heading>
                    <Text mt={2} color="gray.300">
                      @{cast.user}
                    </Text>
                  </ChakraLink>
                </Box>
              );
            })}
          </Slider>
        </MotionBox>
      </Container>
    </Box>
  );
};

export default ExpandedOcasting;

"use client";

import DatoImage from "@/components/DatoImage";
import { type FragmentType, getFragmentData } from "@/graphql/types";
import { HeroSectionFragmentDoc } from "@/graphql/types/graphql";
import { MarkdownRenderer } from "@/components/MarkdownRenderer";
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";

import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";

const MotionBox = motion(Box);

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

type Props = {
  fragment: FragmentType<typeof HeroSectionFragmentDoc>;
};

const RightImageHero = ({ fragment }: Props) => {
  const { heroTitle, heroSubtitle, buttons, heroImage } = getFragmentData(
    HeroSectionFragmentDoc,
    fragment
  );

  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  useEffect(() => {
    if (inView) {
      const timer = setTimeout(() => {
        controls.start("visible");
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [controls, inView]);

  return (
    <MotionBox
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={controls}
      maxH={{ base: "inherit", lg: "865px" }}
    >
      <Container maxW="container.xl" px={{ base: 6, md: 8 }} py={8}>
        <Flex
          direction={{ base: "column-reverse", xl: "row" }} // <- Aqui a mudança
          justify="space-between"
          gap={{ base: 6, sm: 10, md: 10 }}
          overflow="hidden"
        >
          <MotionBox
            variants={containerVariants}
            py={{ lg: 12, xl: 24 }}
            textAlign={{ base: "center", lg: "left" }}
            maxW={{ xl: "600px" }}
          >
            <motion.div variants={itemVariants}>
              <Heading
                as="h1"
                fontWeight="medium"
                fontSize={{ base: "5xl", md: "90px" }}
                color="#637774"
                lineHeight={1}
              >
                {heroTitle}
              </Heading>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Text
                my={10}
                color="black"
                fontWeight="normal"
                fontSize={{ base: "16px", md: "24px" }}
                lineHeight="relaxed"
                maxW={{ lg: "80%" }}
                mx={{ base: "auto", lg: "0" }}
              >
                <MarkdownRenderer>{heroSubtitle || ""}</MarkdownRenderer>
              </Text>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Stack
                direction="row"
                w="full"
                justify={{ base: "center", lg: "flex-start" }}
              >
                {buttons.map((button) => (
                  <Button
                    as="a"
                    key={button.id}
                    href={button.url || "#"}
                    colorScheme={button.primary ? "primary" : "gray"}
                    bg={button.primary ? "primary.500" : "gray.200"}
                    color={button.primary ? "white" : "gray.500"}
                    _hover={{
                      bg: button.primary ? "indigo.600" : "gray.300",
                    }}
                    _active={{
                      bg: button.primary ? "indigo.700" : "gray.300",
                      color: button.primary ? "white" : "gray.700",
                    }}
                    _focusVisible={{
                      ring: 2,
                      ringColor: "indigo.300",
                    }}
                    px={8}
                    py={3}
                    fontSize={{ base: "sm", md: "base" }}
                    fontWeight="semibold"
                    borderRadius="lg"
                    textAlign="center"
                  >
                    {button.label}
                  </Button>
                ))}
              </Stack>
            </motion.div>
          </MotionBox>

          {heroImage?.responsiveImage && (
            <Box
              position="relative"
              w={{ base: "full", lg: "60%" }}
              minH={{ base: "500px", lg: "100vh" }}
            >
              <MotionBox
                variants={itemVariants}
                position="absolute"
                top={0}
                left={0}
                w="full"
                h="100%"
                maxH="750px"
                zIndex={0}
              >
                <Image
                  src="/svgs/LT.svg"
                  alt="letras l e t"
                  objectFit="cover"
                  w="100%"
                  h="100%"
                  objectPosition="50% 50%"
                />
                <DatoImage
                  fragment={heroImage.responsiveImage}
                  layout="fill"
                  objectFit="cover"
                  objectPosition="50% 50%"
                />
              </MotionBox>
            </Box>
          )}
        </Flex>
      </Container>
    </MotionBox>
  );
};

export default RightImageHero;

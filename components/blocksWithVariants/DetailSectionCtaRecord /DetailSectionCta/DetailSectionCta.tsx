"use client";
import {
  Box,
  Button,
  Container,
  Flex,
  Grid,
  GridItem,
  Heading,
  Stack,
  Text,
  Image,
} from "@chakra-ui/react";

import Highlighter from "@/components/Highlighter";
import { type FragmentType, getFragmentData } from "@/graphql/types";
import { DetailSectionCtaFragmentDoc } from "@/graphql/types/graphql";
import {
  isHeading,
  isList,
  isListItem,
  isParagraph,
} from "datocms-structured-text-utils";
import {
  StructuredText as StructuredTextField,
  renderNodeRule,
} from "react-datocms/structured-text";
import { motion, useAnimation, type Variants } from "framer-motion";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { keyframes } from "@emotion/react";

type Props = {
  fragment: FragmentType<typeof DetailSectionCtaFragmentDoc>;
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

const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 100 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
};

const fadeOnlyVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 0.05, // ou outro valor final desejado
    transition: {
      duration: 2, // tempo mais longo = mais devagar
      ease: "easeOut",
    },
  },
};

const DetailSectionCta = ({ fragment }: Props) => {
  const { heading, details, buttonscta } = getFragmentData(
    DetailSectionCtaFragmentDoc,
    fragment
  );

  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.4,
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  return (
    <Box id="detail-section-cta" position="relative" ref={ref}>
      <MotionBox
        position="absolute"
        inset={0}
        zIndex={0}
        pointerEvents="none"
        variants={fadeOnlyVariants}
        initial="hidden"
        animate={controls}
      >
        <Image
          src="/svgs/bgltblue.png"
          alt="letras l e t"
          objectFit="cover"
          w="100%"
          h="100%"
          objectPosition="50% 50%"
        />
      </MotionBox>

      <Container maxW="container.xl" position="relative" zIndex={1} py={10}>
        <Grid
          gap={{ base: 4, lg: 10 }}
          templateColumns={{ base: "1fr", lg: "repeat(2, 500px)" }}
          w="100%"
          h="100%"
          justifyItems="center"
          justifyContent="space-between"
        >
          <MotionBox
            variants={cardVariants}
            initial="hidden"
            animate={controls}
          >
            <GridItem>
              <Heading
                as="h1"
                mb={{ base: 0, md: 12 }}
                fontSize={{ base: "4xl", sm: "5xl", md: "5rem" }}
                color="primary.500"
              >
                {heading}
              </Heading>
            </GridItem>
          </MotionBox>

          <MotionBox
            variants={fadeUpVariants}
            initial="hidden"
            animate={controls}
          >
            <GridItem>
              <Stack
                direction="row"
                justifyContent="end"
                textAlign="end"
                spacing={2.5}
                w="full"
                justify={{ base: "center", lg: "flex-start" }}
              >
                <StructuredTextField
                  data={details}
                  renderNode={Highlighter}
                  customNodeRules={[
                    renderNodeRule(isHeading, ({ children, key }) => (
                      <Heading
                        key={key}
                        as="h3"
                        fontSize={{
                          base: "20px",
                          sm: "2xl",
                          lg: "xl",
                          xl: "2xl",
                        }}
                        mt={9}
                        mb={4}
                        fontWeight="bold"
                        color="black"
                      >
                        {children}
                      </Heading>
                    )),
                    renderNodeRule(isParagraph, ({ children, key }) => (
                      <Text
                        key={key}
                        fontSize={{ base: "20px" }}
                        fontWeight="medium"
                        lineHeight="relaxed"
                        color="black"
                      >
                        {children}
                      </Text>
                    )),
                    renderNodeRule(isListItem, ({ children, key }) => (
                      <Flex
                        key={key}
                        align="center"
                        mb={5}
                        fontSize="24px"
                        fontWeight="medium"
                        color="black"
                      >
                        <Box>{children}</Box>
                      </Flex>
                    )),
                    renderNodeRule(isList, ({ children, key }) => (
                      <Grid
                        key={key}
                        mt={6}
                        mb={6}
                        templateColumns="repeat(2, 1fr)"
                        gap={4}
                        textAlign="center"
                        w="full"
                      >
                        {children}
                      </Grid>
                    )),
                  ]}
                />
              </Stack>
              <Stack
                direction="row"
                justifyContent="end"
                spacing={2.5}
                w="full"
                justify={{ base: "center", lg: "flex-start" }}
                mt={10}
              >
                <MotionBox
                  variants={fadeUpVariants}
                  initial="hidden"
                  animate={controls}
                >
                  <Button
                    as="a"
                    href={buttonscta?.url || "#"}
                    colorScheme={buttonscta?.primary ? "primary" : "gray"}
                    bg={buttonscta?.primary ? "primary.500" : "gray.200"}
                    color={buttonscta?.primary ? "white" : "gray.500"}
                    _hover={{
                      bg: buttonscta?.primary ? "indigo.600" : "gray.300",
                    }}
                    _active={{
                      bg: buttonscta?.primary ? "indigo.700" : "gray.300",
                      color: buttonscta?.primary ? "white" : "gray.700",
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
                    {buttonscta?.label}
                  </Button>
                </MotionBox>
              </Stack>
            </GridItem>
          </MotionBox>
        </Grid>
      </Container>
    </Box>
  );
};

export default DetailSectionCta;

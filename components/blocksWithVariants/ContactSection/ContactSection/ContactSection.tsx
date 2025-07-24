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
  VStack,
  Input,
  Textarea,
} from "@chakra-ui/react";

import Highlighter from "@/components/Highlighter";
import { type FragmentType, getFragmentData } from "@/graphql/types";
import { ContactSectionFragmentDoc } from "@/graphql/types/graphql";
import { useForm } from "react-hook-form";
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
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import ContactForm from "./Contact";

type Props = {
  fragment: FragmentType<typeof ContactSectionFragmentDoc>;
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

type FormInputs = {
  name: string;
  email: string;
  message: string;
};

const ContactSection = ({ fragment }: Props) => {
  const { heading, details } = getFragmentData(
    ContactSectionFragmentDoc,
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

      <Container
        maxW="container.xl"
        position="relative"
        zIndex={1}
        px={{ base: 6, md: 8 }}
        py={10}
      >
        <Grid
          gap={{ base: 6, lg: 10 }}
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
                mb={{ base: 6, md: 12 }}
                fontSize={{ base: "4xl", md: "5xl" }}
                color="primary.500"
              >
                {heading}
              </Heading>

              <Stack
                direction="row"
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
            </GridItem>
          </MotionBox>

          <MotionBox
            variants={fadeUpVariants}
            initial="hidden"
            animate={controls}
            w="100%"
          >
            <GridItem>
              <ContactForm />
            </GridItem>
          </MotionBox>
        </Grid>
      </Container>
    </Box>
  );
};

export default ContactSection;

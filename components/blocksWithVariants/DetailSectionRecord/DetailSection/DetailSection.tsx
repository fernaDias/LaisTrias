"use client";

import {
  Box,
  Container,
  Flex,
  Grid,
  Heading,
  Stack,
  Text,
} from "@chakra-ui/react";
import DatoImage from "@/components/DatoImage";
import Highlighter from "@/components/Highlighter";
import { type FragmentType, getFragmentData } from "@/graphql/types";
import { DetailSectionFragmentDoc } from "@/graphql/types/graphql";
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
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";

const MotionBox = motion(Box);
const MotionGridItem = motion(Grid);

const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 100 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.8,
      ease: "easeOut",
    },
  }),
};

type Props = {
  fragment: FragmentType<typeof DetailSectionFragmentDoc>;
};

const DetailSection = ({ fragment }: Props) => {
  const { details, image, imagePosition } = getFragmentData(
    DetailSectionFragmentDoc,
    fragment
  );

  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.3 });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  return (
    <Box
      id="detail-section"
      as="section"
      ref={ref}
      h={{ base: "100%", lg: "100%" }}
      px={{ base: 4, md: 24, lg: 8 }}
      py={{ base: 12, lg: 20 }}
      mx="auto"
    >
      <Container maxW="container.xl" px={{ base: 0, md: 0 }} h="100%">
        <Grid
          gap={8}
          templateColumns={{ base: "1fr", lg: "repeat(2, 1fr)" }}
          justifyItems="center"
        >
          {/* Imagem */}
          {image.responsiveImage && (
            <motion.div
              variants={fadeUpVariants}
              initial="hidden"
              animate={controls}
              custom={0}
            >
              <Box
                id="box"
                position="relative"
                overflow="hidden"
                boxShadow="0 16px 24px -8px rgba(0, 0, 0, 0.4)"
                borderRadius="34px"
                aspectRatio={1 / 1}
                h={{ base: "300px", lg: "400px" }}
                w={{ base: "390px", lg: "450px" }}
                order={{ base: 0, lg: imagePosition ? 1 : 0 }}
              >
                <DatoImage
                  objectFit="cover"
                  layout="fill"
                  fragment={image.responsiveImage}
                />
              </Box>
            </motion.div>
          )}

          {/* Texto */}
          <motion.div
            variants={fadeUpVariants}
            initial="hidden"
            animate={controls}
            custom={1}
          >
            <Stack w="100%" order={{ base: 1, lg: imagePosition ? 0 : 1 }}>
              <Box
                boxShadow="0 16px 24px -8px rgba(0, 0, 0, 0.4)"
                borderRadius="34px"
                p={8}
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
              </Box>
            </Stack>
          </motion.div>
        </Grid>
      </Container>
    </Box>
  );
};

export default DetailSection;

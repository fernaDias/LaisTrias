"use client";
import {
  Box,
  Flex,
  Link as ChakraLink,
  Container,
  Stack,
  Grid,
} from "@chakra-ui/react";
import { type FragmentType, getFragmentData } from "@/graphql/types";
import { BrandSectionFragmentDoc } from "@/graphql/types/graphql";
import NextImage from "next/image";

import { motion, useAnimation, type Variants } from "framer-motion";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

type Props = {
  fragment: FragmentType<typeof BrandSectionFragmentDoc>;
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

const Brands = ({ fragment }: Props) => {
  const { brand: brandShowcase } = getFragmentData(
    BrandSectionFragmentDoc,
    fragment
  );

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
    <Box id="Brands" as="section" ref={ref}>
      <Container
        maxW="container.xl"
        position="relative"
        zIndex={1}
        py={10}
        px={8}
      >
        <Stack justify="center" align="center" gap={8}>
          <Grid
            templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(3, 1fr)" }}
            gap={4}
            w="100%"
            mx={{ base: 1, lg: 12 }}
            filter="brightness(0.75)"
          >
            {brandShowcase.map((brand, i) => (
              <MotionBox
                key={brand.id}
                position="relative"
                mx={{ base: 8, md: 0 }}
                h={{ base: "4rem", sm: "8rem" }}
                display="flex"
                alignItems="center"
                justifyContent="center"
                rounded="34px"
                color="black"
                px={10}
                py={16}
                variants={cardVariants}
                initial="hidden"
                animate={controls}
                custom={i}
              >
                <ChakraLink
                  href={brand.brandUrl || "#"}
                  isExternal
                  rel="nofollow noreferrer"
                  position="relative"
                  h="40px"
                  w="full"
                  transition="all 0.3s ease"
                  opacity={{ base: 0.7, dark: 0.6 }}
                  _hover={{
                    opacity: 1,
                    filter: "grayscale(0)",
                  }}
                  filter="grayscale(100%)"
                >
                  <NextImage
                    src={brand.brandLogo.url}
                    alt={brand.brandName}
                    fill
                    style={{ objectFit: "contain" }}
                  />
                </ChakraLink>
              </MotionBox>
            ))}
          </Grid>
        </Stack>
      </Container>
    </Box>
  );
};

export default Brands;

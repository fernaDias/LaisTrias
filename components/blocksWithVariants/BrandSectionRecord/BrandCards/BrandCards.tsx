"use client";
import {
  Box,
  Flex,
  Grid,
  Image as ChakraImage,
  Container,
  Image,
  Heading,
  Stack,
} from "@chakra-ui/react";
import { type FragmentType, getFragmentData } from "@/graphql/types";
import { BrandSectionFragmentDoc } from "@/graphql/types/graphql";
import { motion, useAnimation, type Variants } from "framer-motion";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { keyframes } from "@emotion/react";

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

const BrandCards = ({ fragment }: Props) => {
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
    <Box id="BrandCards" ref={ref}>
      <Container
        maxW="container.xl"
        position="relative"
        zIndex={1}
        py={10}
        px={8}
      >
        <Stack justify="center" align="center" gap={8}>
          <MotionBox
            variants={fadeUpVariants}
            initial="hidden"
            animate={controls}
          >
            <Heading
              color="#f1f1f166"
              fontFamily="heading"
              textAlign="center"
              fontSize={{ base: "xs", lg: "lg" }}
            >
              Escolhida por +100 empresas para entregar resultados
            </Heading>
          </MotionBox>
          <Grid
            templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(3, 1fr)" }}
            gap={4}
            rounded="34px"
            mx={{ base: 1, lg: 12 }}
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
                bg="#026666"
                color="black"
                px={10}
                py={16}
                variants={cardVariants}
                initial="hidden"
                animate={controls}
                custom={i}
              >
                <Box w={{ base: "100%", md: "75%" }}>
                  <Image
                    src={brand.brandLogo.url}
                    alt="Logo"
                    width={300}
                    height={300}
                    style={{ width: "100%", height: "auto" }}
                  />
                </Box>
              </MotionBox>
            ))}
          </Grid>
        </Stack>
      </Container>
    </Box>
  );
};

export default BrandCards;

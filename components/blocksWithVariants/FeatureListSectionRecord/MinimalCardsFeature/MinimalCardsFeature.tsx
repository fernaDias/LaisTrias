"use client";

import { Box, Container, Heading, Image, Stack } from "@chakra-ui/react";
import { type FragmentType, getFragmentData } from "@/graphql/types";
import { FeatureListSectionFragmentDoc } from "@/graphql/types/graphql";
import { MarkdownRenderer } from "@/components/MarkdownRenderer";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

type Props = {
  fragment: FragmentType<typeof FeatureListSectionFragmentDoc>;
};

const CARD_WIDTH = 260; // largura total do card com margem
const MAX_TRANSLATE_X = 20; // máximo deslocamento horizontal em px (sutil)

const MotionBox = motion(Box);

const MinimalCardsFeature = ({ fragment }: Props) => {
  const {
    feature: features,
    featuresHeader,
    featuresSubheader,
  } = getFragmentData(FeatureListSectionFragmentDoc, fragment);

  const scrollRef = useRef<HTMLDivElement>(null);
  const [translatesX, setTranslatesX] = useState<number[]>(
    new Array(features.length).fill(0)
  );

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const scrollLeft = scrollRef.current.scrollLeft;

    const newTranslates = features.map((_, i) => {
      // Centro do card (posição absoluta horizontal)
      const cardCenter = i * CARD_WIDTH + CARD_WIDTH / 2;

      // Centro visível do container
      const containerCenter = scrollLeft + scrollRef.current.offsetWidth / 2;

      // Distância entre centro do card e centro do container
      const distance = cardCenter - containerCenter;

      // Normalizar distância para intervalo [-1, 1]
      const maxDistance = scrollRef.current.offsetWidth / 2 + CARD_WIDTH;
      const normalized = Math.max(Math.min(distance / maxDistance, 1), -1);

      // Multiplicar pela distância máxima de translateX (inverte para efeito suave)
      // Cards à esquerda se movem um pouco para a direita e vice-versa
      return -normalized * MAX_TRANSLATE_X;
    });

    setTranslatesX(newTranslates);
  };

  useEffect(() => {
    handleScroll();
  }, []);

  return (
    <Box id="minimalCardsFeature" py={10} position="relative">
      <Container maxW="container.xl" px={4}>
        <Stack spacing={6} align="center" textAlign="center" mb={10}>
          <Heading fontSize={{ base: "2xl", md: "4xl" }} color="primary.500">
            {featuresHeader}
          </Heading>
          {featuresSubheader && (
            <Box maxW="600px">
              <MarkdownRenderer>{featuresSubheader}</MarkdownRenderer>
            </Box>
          )}
        </Stack>

        <Box
          ref={scrollRef}
          onScroll={handleScroll}
          overflowX="auto"
          display="flex"
          minH="320px"
          css={{ "&::-webkit-scrollbar": { display: "none" } }}
          scrollSnapType="x mandatory"
          gap={4}
        >
          {features.map((feature, i) => (
            <MotionBox
              key={feature.id}
              minW={`${CARD_WIDTH}px`}
              maxW={`${CARD_WIDTH}px`}
              mx={2}
              p={6}
              minH="300px"
              flex="0 0 auto"
              display="flex"
              flexDir="column"
              alignItems="center"
              textAlign="center"
              bg="colorBrand.200"
              borderRadius="34px"
              style={{
                transform: `translateX(${translatesX[i]}px)`,
                transition: "transform 0.3s ease",
              }}
            >
              <Box
                h="60px"
                mb={4}
                display="flex"
                alignItems="center"
                justifyContent="center"
                w="60px"
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
                as="h2"
                fontSize={{ base: "sm", md: "lg" }}
                fontFamily="heading"
                color="black"
                mb={2}
              >
                {feature.featureTitle}
              </Heading>

              <Box flex="1">
                <MarkdownRenderer>
                  {feature.featureDescription || ""}
                </MarkdownRenderer>
              </Box>
            </MotionBox>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default MinimalCardsFeature;

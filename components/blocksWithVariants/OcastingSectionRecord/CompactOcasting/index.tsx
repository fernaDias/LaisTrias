"use client";

import DatoImage from "@/components/DatoImage";
import { type FragmentType, getFragmentData } from "@/graphql/types";
import { OcastingSectionFragmentDoc } from "@/graphql/types/graphql";
import type { GlobalPageProps } from "@/utils/globalPageProps";
import { buildUrl } from "@/utils/globalPageProps";
import NextLink from "next/link";
import { MarkdownRenderer } from "@/components/MarkdownRenderer";
import {
  Box,
  Heading,
  Text,
  Grid,
  Flex,
  Link as ChakraLink,
  GridItem,
  Container,
  HStack,
  Stack,
} from "@chakra-ui/react";

type Props = {
  fragment: FragmentType<typeof OcastingSectionFragmentDoc>;
  globalPageProps: GlobalPageProps;
};

const CompactOcasting = ({ fragment, globalPageProps }: Props) => {
  const {
    title: header,
    subtitle: subheader,
    showcasedOcasting: casting,
  } = getFragmentData(OcastingSectionFragmentDoc, fragment);

  return (
    <Box
      id="ExpendedOCastingAAA"
      maxW="screen.xl"
      px={{ base: 4, md: 24, lg: 8 }}
      py={{ base: 12, lg: 20 }}
      mt={16}
      mx="auto"
    >
      <Container maxW="container.xl" px={6}>
        <Heading
          as="h1"
          textAlign="center"
          fontSize={{ base: "2xl", lg: "6xl" }}
          color="black"
        >
          {header}
        </Heading>

        <Box maxW="2xl" mx="auto" my={6} textAlign="center" color="black">
          <MarkdownRenderer>{subheader || ""}</MarkdownRenderer>
        </Box>

        <Stack
          justify="center"
          align="center"
          flexDir={{ base: "column", lg: "row" }}
        >
          {casting.map((cast) => (
            <ChakraLink
              key={cast.id}
              role="group"
              cursor="pointer"
              href={buildUrl(globalPageProps, `/posts/ocasting/${cast.slug}`)}
              borderRadius="xl"
              bg="#2a2a2a"
              boxShadow="0 16px 24px -8px rgba(0, 0, 0, 0.4)"
              p={8}
              h="100%"
              w="300px"
              transition="all 0.3s"
              _hover={{
                bg: "primary.700",
                borderColor: "transparent",
                opacity: 0.95,
                textDecoration: "none",
              }}
            >
              <Flex direction="column" align="center" gap={8}>
                <Box
                  position="relative"
                  w="100%"
                  h="300px"
                  rounded="xl"
                  flexShrink={0}
                  overflow="hidden"
                  mx={{ sm: 4 }}
                >
                  <DatoImage
                    layout="fill"
                    objectFit="cover"
                    objectPosition="50% 20%"
                    fragment={cast.picture.responsiveImage}
                  />
                </Box>

                <Flex
                  flexDir="column"
                  align="flex-start"
                  justify="center"
                  w="100%"
                >
                  <Heading
                    as="h2"
                    fontSize={{ base: "xl", md: "2xl" }}
                    fontWeight="semibold"
                    textTransform="capitalize"
                    color="black"
                    _groupHover={{ color: "white" }}
                  >
                    {cast.name}
                  </Heading>
                  <Text mt={2} color="black" _groupHover={{ color: "white" }}>
                    @{cast.user}
                  </Text>
                </Flex>
              </Flex>
            </ChakraLink>
          ))}
        </Stack>
      </Container>
    </Box>
  );
};

export default CompactOcasting;

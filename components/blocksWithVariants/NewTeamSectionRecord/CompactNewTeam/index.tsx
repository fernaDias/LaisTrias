"use client";

import DatoImage from "@/components/DatoImage";
import { type FragmentType, getFragmentData } from "@/graphql/types";
import { NewTeamSectionFragmentDoc } from "@/graphql/types/graphql";
import type { GlobalPageProps } from "@/utils/globalPageProps";
import { buildUrl } from "@/utils/globalPageProps";
import { MarkdownRenderer } from "@/components/MarkdownRenderer";
import {
  Box,
  Heading,
  Text,
  Flex,
  Link as ChakraLink,
  Container,
  HStack,
} from "@chakra-ui/react";

type Props = {
  fragment: FragmentType<typeof NewTeamSectionFragmentDoc>;
  globalPageProps: GlobalPageProps;
};

const CompactOcasting = ({ fragment, globalPageProps }: Props) => {
  const {
    title: header,
    subtitle: subheader,
    showcasedNewTeam: teams,
  } = getFragmentData(NewTeamSectionFragmentDoc, fragment);

  return (
    <Box
      id="ExpendedOCasting"
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

        <HStack justify="center">
          {teams.map((team) => (
            <ChakraLink
              key={team.id}
              role="group"
              cursor="pointer"
              href={buildUrl(globalPageProps, `/posts/ocasting/${team.slug}`)}
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
                    fragment={team.picture.responsiveImage}
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
                    {team.name}
                  </Heading>
                  <Text mt={2} color="black" _groupHover={{ color: "white" }}>
                    {team.teamPosition}
                  </Text>
                </Flex>
              </Flex>
            </ChakraLink>
          ))}
        </HStack>
      </Container>
    </Box>
  );
};

export default CompactOcasting;

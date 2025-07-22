"use client";
import {
  Box,
  Flex,
  Grid,
  Heading,
  Text,
  Link as ChakraLink,
  useColorModeValue,
  Container,
} from "@chakra-ui/react";
import DatoImage from "@/components/DatoImage";
import { type FragmentType, getFragmentData } from "@/graphql/types";
import { CastingSectionFragmentDoc } from "@/graphql/types/graphql";
import type { GlobalPageProps } from "@/utils/globalPageProps";
import { buildUrl } from "@/utils/globalPageProps";
import Link from "next/link";
import { MarkdownRenderer } from "@/components/MarkdownRenderer";

type Props = {
  fragment: FragmentType<typeof CastingSectionFragmentDoc>;
  globalPageProps: GlobalPageProps;
};

const ExpandedCasting = ({ fragment, globalPageProps }: Props) => {
  const {
    title: header,
    subtitle: subheader,
    showcasedCasting: members,
  } = getFragmentData(CastingSectionFragmentDoc, fragment);

  return (
    <Box
      id="ExpendedCasting"
      maxW="screen.xl"
      px={{ base: 4, md: 24, lg: 8 }}
      py={{ base: 12, lg: 20 }}
      mt={16}
      mx="auto"
    >
      <Container maxW="container.xl" px={{ base: 0, md: 0 }}>
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

        <Grid
          mt={8}
          gap={{ base: 4, md: 8 }}
          templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }}
          textAlign={{ base: "center", md: "left" }}
        >
          {members.map((member) => (
            <ChakraLink
              key={member.id}
              role="group"
              href={buildUrl(globalPageProps, `/posts/casting/${member.slug}`)}
              border="1px solid"
              borderRadius="xl"
              bg="#2a2a2a"
              boxShadow="0 16px 24px -8px rgba(0, 0, 0, 0.4)"
              p={8}
              h="100%"
              w="100%"
              transition="all 0.3s"
              _hover={{
                bg: "primary.500",
                borderColor: "transparent",
                opacity: 0.95,
                textDecoration: "none",
              }}
            >
              <Flex direction={{ base: "column", sm: "row" }} align="center">
                <Box
                  position="relative"
                  w="96px"
                  h="96px"
                  flexShrink={0}
                  overflow="hidden"
                  borderRadius="full"
                  ring="4px"
                  ringColor="gray.300"
                  mx={{ sm: 4 }}
                >
                  <DatoImage
                    layout="fill"
                    objectFit="cover"
                    objectPosition="50% 20%"
                    fragment={member.picture.responsiveImage}
                  />
                </Box>

                <Box mt={{ base: 4, sm: 0 }} mx={{ sm: 4 }}>
                  <Heading
                    as="h2"
                    fontSize={{ base: "xl", md: "2xl" }}
                    fontWeight="semibold"
                    textTransform="capitalize"
                    color="black"
                    _groupHover={{ color: "white" }}
                  >
                    {member.name}
                  </Heading>
                  <Text
                    mt={2}
                    textTransform="capitalize"
                    color="black"
                    _groupHover={{ color: "white" }}
                  >
                    {member.bio}
                  </Text>
                </Box>
              </Flex>

              {/* <Text
                mt={4}
                textTransform="capitalize"
                color="black"
                _groupHover={{ color: "white" }}
              >
                {member.description}
              </Text> */}
            </ChakraLink>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default ExpandedCasting;

"use client";

import DatoImage from "@/components/DatoImage";
import { type FragmentType, getFragmentData } from "@/graphql/types";
import { CastingSectionFragmentDoc } from "@/graphql/types/graphql";
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
} from "@chakra-ui/react";

type Props = {
  fragment: FragmentType<typeof CastingSectionFragmentDoc>;
  globalPageProps: GlobalPageProps;
};

const CompactCasting = ({ fragment, globalPageProps }: Props) => {
  const {
    title: header,
    subtitle: subheader,
    showcasedCasting: members,
  } = getFragmentData(CastingSectionFragmentDoc, fragment);

  return (
    <Box
      id="CompactCasting"
      mx="auto"
      py="10"
      px="6"
      as="section"
      textAlign="center"
    >
      <Container
        maxW="container.xl"
        px={5}
        justifyContent="center"
        alignItems="center"
        justifyItems="center"
      >
        <Heading
          as="h1"
          textAlign="center"
          fontSize={{ base: "2xl", lg: "4xl" }}
          fontWeight="semibold"
          textTransform="capitalize"
          color="black"
        >
          {header}
        </Heading>

        <Box maxW="2xl" mx="auto" textAlign="center" color={"white"}>
          <MarkdownRenderer>{subheader || ""}</MarkdownRenderer>
        </Box>

        <Grid gap={16} templateColumns="repeat(3, 1fr)" mt={8}>
          {members.map((member) => (
            <GridItem key={member.id}>
              <ChakraLink
                as={NextLink}
                href={buildUrl(
                  globalPageProps,
                  `/posts/casting/${member.slug}`
                )}
                key={member.id}
                _hover={{ textDecoration: "none" }}
              >
                <Box
                  p="8"
                  rounded="xl"
                  transition="all 0.3s"
                  textAlign="center"
                  bg="transparent"
                  _hover={{ bg: "primary.500" }}
                  border="1px solid white"
                  maxW={"300px"}
                >
                  <Box
                    position="relative"
                    w="32"
                    h="32"
                    mx="auto"
                    rounded="full"
                    overflow="hidden"
                    ring="4px"
                    ringColor="gray.300"
                  >
                    <DatoImage
                      layout="fill"
                      objectFit="cover"
                      objectPosition="50% 20%"
                      fragment={member.picture.responsiveImage}
                    />
                  </Box>

                  <Heading
                    mt="4"
                    fontSize="2xl"
                    fontWeight="semibold"
                    textTransform="capitalize"
                    color={"white"}
                    _groupHover={{ color: "primary.500" }}
                  >
                    {member.name}
                  </Heading>

                  <Text
                    mt="2"
                    textTransform="capitalize"
                    color={"white"}
                    _groupHover={{ color: "primary.500" }}
                  >
                    {member.bio}
                  </Text>

                  <Flex mt="3" mx="-2" justify="center">
                    <Box
                      mx="2"
                      color={"white"}
                      _hover={{ color: "primary.500" }}
                    >
                      <Box as="span" />
                    </Box>
                  </Flex>
                </Box>
              </ChakraLink>
            </GridItem>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default CompactCasting;

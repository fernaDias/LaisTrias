"use client";

import {
  Box,
  Container,
  Grid,
  Heading,
  Link as ChakraLink,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import DatoImage from "@/components/DatoImage";
import { type FragmentType, getFragmentData } from "@/graphql/types";
import {
  FeaturedPostsSectionFragmentDoc,
  PostExcerptFragmentDoc,
} from "@/graphql/types/graphql";
import { type GlobalPageProps, buildUrl } from "@/utils/globalPageProps";
import transformDate from "@/utils/transformDate";
import NextLink from "next/link";

type Props = {
  fragment: FragmentType<typeof FeaturedPostsSectionFragmentDoc>;
  globalPageProps: GlobalPageProps;
};

const MinimalistFeaturedPostsGrid = ({ fragment, globalPageProps }: Props) => {
  const {
    featuredPosts: blogData,
    featuredPostsHeader: blogHeader,
    featuredPostsSubheader: blogSubheader,
  } = getFragmentData(FeaturedPostsSectionFragmentDoc, fragment);

  const titleColor = useColorModeValue("gray.800", "white");
  const dateColor = useColorModeValue("gray.500", "gray.300");

  return (
    <Box
      id="MinimalsistFeatureProstGrid"
      bg={useColorModeValue("white", "gray.900")}
      py={10}
      px={6}
    >
      <Container maxW="container.xl">
        <Heading
          as="h1"
          fontSize={{ base: "2xl", lg: "3xl" }}
          fontWeight="semibold"
          color={titleColor}
          textTransform="capitalize"
        >
          {blogHeader}
        </Heading>

        <Grid
          mt={8}
          gap={8}
          templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }}
        >
          {blogData.map((postFragment) => {
            const post = getFragmentData(PostExcerptFragmentDoc, postFragment);

            return (
              <Box key={post.id} display="flex" gap={4}>
                {post.seoTags?.image?.responsiveImage && (
                  <Box
                    position="relative"
                    h="14rem"
                    w="14rem"
                    flexShrink={0}
                    overflow="hidden"
                    borderRadius="34px"
                  >
                    <DatoImage
                      layout="fill"
                      objectFit="cover"
                      objectPosition="50% 20%"
                      fragment={post.seoTags?.image?.responsiveImage}
                    />
                  </Box>
                )}

                <Box
                  py={6}
                  ml={{ lg: 6 }}
                  display="flex"
                  flexDirection="column"
                  justifyContent="space-between"
                >
                  <ChakraLink
                    as={NextLink}
                    href={buildUrl(globalPageProps, `/posts/${post.slug}`)}
                    fontSize="xl"
                    fontWeight="semibold"
                    color={titleColor}
                    _hover={{ textDecoration: "underline" }}
                  >
                    {post.title}
                  </ChakraLink>

                  {post._publishedAt && (
                    <Text fontSize="sm" color={dateColor}>
                      {transformDate(post._publishedAt)}
                    </Text>
                  )}
                </Box>
              </Box>
            );
          })}
        </Grid>
      </Container>
    </Box>
  );
};

export default MinimalistFeaturedPostsGrid;

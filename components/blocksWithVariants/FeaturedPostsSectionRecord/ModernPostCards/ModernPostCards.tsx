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
import { MarkdownRenderer } from "@/components/MarkdownRenderer";

type Props = {
  fragment: FragmentType<typeof FeaturedPostsSectionFragmentDoc>;
  globalPageProps: GlobalPageProps;
};

const ModernPostCards = ({ fragment, globalPageProps }: Props) => {
  const {
    featuredPosts: blogData,
    featuredPostsHeader: blogHeader,
    featuredPostsSubheader: blogSubheader,
  } = getFragmentData(FeaturedPostsSectionFragmentDoc, fragment);

  const cardBg = useColorModeValue("white", "gray.900");
  const titleColor = useColorModeValue("gray.800", "white");
  const textColor = useColorModeValue("gray.500", "gray.300");

  return (
    <Box id="ModerPostCards" bg={cardBg} py={10} px={6}>
      <Container maxW="container.xl">
        <Box textAlign="center">
          <Heading
            as="h1"
            fontSize={{ base: "2xl", lg: "3xl" }}
            fontWeight="semibold"
            color={titleColor}
            textTransform="capitalize"
          >
            {blogHeader}
          </Heading>

          <Box mt={4} maxW="34px" mx="auto" color={textColor}>
            <MarkdownRenderer>{blogSubheader || ""}</MarkdownRenderer>
          </Box>
        </Box>

        <Grid
          mt={8}
          gap={8}
          templateColumns={{ base: "1fr", lg: "repeat(2, 1fr)" }}
        >
          {blogData.map((postFragment) => {
            const post = getFragmentData(PostExcerptFragmentDoc, postFragment);

            return (
              <Box key={post.id}>
                <Box
                  position="relative"
                  h="24rem"
                  w="full"
                  overflow="hidden"
                  borderRadius="24px"
                  zIndex={10}
                >
                  {post.seoTags?.image?.responsiveImage && (
                    <DatoImage
                      layout="fill"
                      objectFit="cover"
                      objectPosition="50% 20%"
                      fragment={post.seoTags?.image?.responsiveImage}
                    />
                  )}
                </Box>

                <Box
                  position="relative"
                  zIndex={20}
                  mx="auto"
                  maxW="34px"
                  bg={cardBg}
                  borderRadius="24px"
                  p={6}
                  mt={-20}
                  boxShadow="24px"
                >
                  <ChakraLink
                    as={NextLink}
                    href={buildUrl(globalPageProps, `/posts/${post.slug}`)}
                    fontWeight="semibold"
                    fontSize={{ base: "24px", md: "xl" }}
                    color={titleColor}
                    _hover={{ textDecoration: "underline" }}
                  >
                    {post.title}
                  </ChakraLink>

                  <Text mt={3} fontSize="sm" color={textColor}>
                    {post.seoTags?.description}
                  </Text>

                  {post._publishedAt && (
                    <Text mt={3} fontSize="sm" color="blue.500">
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

export default ModernPostCards;

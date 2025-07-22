import { Box, Heading, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import DatoImage from "@/components/DatoImage";
import { type FragmentType, getFragmentData } from "@/graphql/types";
import {
  FeaturedPostsSectionFragmentDoc,
  PostExcerptFragmentDoc,
} from "@/graphql/types/graphql";
import { type GlobalPageProps, buildUrl } from "@/utils/globalPageProps";
import transformDate from "@/utils/transformDate";
import Link from "next/link";
import { MarkdownRenderer } from "@/components/MarkdownRenderer";

type Props = {
  fragment: FragmentType<typeof FeaturedPostsSectionFragmentDoc>;
  globalPageProps: GlobalPageProps;
};

const FullImageFeaturedPosts = ({ fragment, globalPageProps }: Props) => {
  const {
    featuredPosts: blogData,
    featuredPostsHeader: blogHeader,
    featuredPostsSubheader: blogSubheader,
  } = getFragmentData(FeaturedPostsSectionFragmentDoc, fragment);

  return (
    <Box id="FullImageFeaturedPosts" bg="white" py={{ base: 6, sm: 8, lg: 12 }}>
      <Box maxW="7xl" mx="auto" px={{ base: 4, md: 8 }}>
        <Box mb={{ base: 10, md: 16 }} textAlign="center">
          <Heading
            as="h2"
            mb={{ base: 4, md: 6 }}
            fontSize={{ base: "2xl", lg: "3xl" }}
            fontWeight="bold"
            color="gray.800"
          >
            {blogHeader}
          </Heading>
          <Box maxW="2xl" mx="auto" color="gray.500" fontSize={{ md: "34px" }}>
            <MarkdownRenderer>{blogSubheader || ""}</MarkdownRenderer>
          </Box>
        </Box>

        <SimpleGrid
          columns={{ base: 1, sm: 2, lg: 3 }}
          spacing={{ base: 4, md: 6, xl: 8 }}
        >
          {blogData.map((postFragment) => {
            const post = getFragmentData(PostExcerptFragmentDoc, postFragment);
            return (
              <Box
                as={Link}
                key={post.id}
                href={buildUrl(globalPageProps, `/posts/${post.slug}`)}
                position="relative"
                overflow="hidden"
                borderRadius="34px"
                bg="gray.100"
                boxShadow="34px"
                h={{ base: 48, md: 64, xl: 96 }}
                role="group"
                display="flex"
                flexDirection="column"
              >
                <Box
                  position="absolute"
                  inset={0}
                  w="full"
                  h="full"
                  transition="transform 0.2s"
                  _groupHover={{ transform: "scale(1.1)" }}
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
                  pointerEvents="none"
                  position="absolute"
                  inset={0}
                  bgGradient="linear(to-t, gray.900, transparent)"
                />

                <VStack
                  position="relative"
                  mt="auto"
                  p={4}
                  align="start"
                  spacing={1}
                >
                  {post._publishedAt && (
                    <Text fontSize="sm" color="gray.200">
                      {transformDate(post._publishedAt)}
                    </Text>
                  )}
                  <Heading
                    as="h3"
                    fontSize="xl"
                    fontWeight="semibold"
                    color="black"
                    mb={1}
                    transition="color 0.2s"
                  >
                    {post.title}
                  </Heading>
                  <Text
                    fontWeight="semibold"
                    color="primary.500"
                    filter="brightness(150%)"
                  >
                    Read more
                  </Text>
                </VStack>
              </Box>
            );
          })}
        </SimpleGrid>
      </Box>
    </Box>
  );
};

export default FullImageFeaturedPosts;

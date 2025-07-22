"use client";
import PostExcerpt from "@/components/PostExcerpt";
import SectionTitle from "@/components/SectionTitle";
import { type FragmentType, getFragmentData } from "@/graphql/types";
import { FeaturedPostsSectionFragmentDoc } from "@/graphql/types/graphql";
import type { GlobalPageProps } from "@/utils/globalPageProps";

import {
  Box,
  Container,
  SimpleGrid,
  useColorModeValue,
} from "@chakra-ui/react";

type Props = {
  fragment: FragmentType<typeof FeaturedPostsSectionFragmentDoc>;
  globalPageProps: GlobalPageProps;
};

const Blog = ({ fragment, globalPageProps }: Props) => {
  const {
    featuredPosts: blogData,
    featuredPostsHeader: blogHeader,
    featuredPostsSubheader: blogSubheader,
  } = getFragmentData(FeaturedPostsSectionFragmentDoc, fragment);

  return (
    <Box id="blog" as="section" py={{ base: 16, md: 20, lg: 28 }}>
      <Container maxW="container.xl">
        <SectionTitle title={blogHeader} paragraph={blogSubheader} center />

        <SimpleGrid
          columns={{ base: 1, md: 2, xl: 3 }}
          spacingY={10}
          spacingX={{ base: 8, md: 6, lg: 8 }}
          mt={10}
        >
          {blogData.map((blog) => (
            <Box key={blog.id} w="full">
              <PostExcerpt fragment={blog} globalPageProps={globalPageProps} />
            </Box>
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  );
};

export default Blog;

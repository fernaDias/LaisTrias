import {
  Box,
  Container,
  Flex,
  ListItem,
  UnorderedList,
} from "@chakra-ui/react";
import PageIndicatorList from "@/components/PageIndicatorList";
import PostExcerpt from "@/components/PostExcerpt";
import type { PageQuery } from "@/graphql/types/graphql";
import type { GlobalPageProps } from "@/utils/globalPageProps";

type Props = {
  data: PageQuery;
  globalPageProps: GlobalPageProps;
};

const PostGridRenderer = ({ data, globalPageProps }: Props) => {
  return (
    <Box id="PostGridRendere" as="section" pt="120px" pb="120px">
      <Container maxW="container.xl" mt={4}>
        <Flex mx={-4} flexWrap="wrap" justify="center">
          {data.allPosts.map((post) => (
            <Box
              key={post.id}
              w={{ base: "100%", md: "66.6667%", lg: "50%", xl: "33.3333%" }}
              px={4}
              mb={10}
            >
              <PostExcerpt fragment={post} globalPageProps={globalPageProps} />
            </Box>
          ))}
        </Flex>
      </Container>
    </Box>
  );
};

export default PostGridRenderer;

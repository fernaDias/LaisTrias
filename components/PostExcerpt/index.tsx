"use client";
import DatoImage from "@/components/DatoImage";
import { type FragmentType, getFragmentData } from "@/graphql/types";
import { PostExcerptFragmentDoc } from "@/graphql/types/graphql";
import { type GlobalPageProps, buildUrl } from "@/utils/globalPageProps";
import Link from "next/link";
import {
  Box,
  HStack,
  Heading,
  Tag,
  Text,
  VStack,
  useColorModeValue,
} from "@chakra-ui/react";
import {
  isBlockquote,
  isHeading,
  isLink,
  isParagraph,
} from "datocms-structured-text-utils";
import { StructuredText, renderNodeRule } from "react-datocms/structured-text";
import MakeHeading from "../MakeHeading";
import Highlighter from "../Highlighter";
type Props = {
  fragment: FragmentType<typeof PostExcerptFragmentDoc>;
  globalPageProps: GlobalPageProps;
};

const PostExcerpt = ({ fragment, globalPageProps }: Props) => {
  const { seoTags, tags, slug, title, description } = getFragmentData(
    PostExcerptFragmentDoc,
    fragment
  );

  return (
    <Box
      position="relative"
      h="100%"
      overflow="hidden"
      rounded="xl"
      bg="white"
      boxShadow="0 16px 24px -8px rgba(0, 0, 0, 0.4)"
    >
      <Box
        as={Link}
        href={buildUrl(globalPageProps, `/posts/${slug}`)}
        cursor="pointer"
        position="relative"
        h="370px"
        w="100%"
        overflow="hidden"
        display="block"
      >
        <Box position="relative" h="100%" w="100%" overflow="hidden">
          {seoTags?.image?.responsiveImage && (
            <DatoImage
              layout="fill"
              objectFit="cover"
              objectPosition="50% 50%"
              fragment={seoTags.image.responsiveImage}
            />
          )}
        </Box>
      </Box>

      <VStack px={4} py={6} justify="center" align="start" spacing={4}>
        <Heading as="h3" fontSize="xl">
          <Box
            as={Link}
            href={buildUrl(globalPageProps, `/posts/${slug}`)}
            color="black"
            _hover={{ color: "black" }}
            display="block"
            justifyContent="center"
            alignItems="center"
          >
            {title}
          </Box>
        </Heading>

        <StructuredText
          data={description}
          customNodeRules={[
            renderNodeRule(isHeading, ({ children, key }) => (
              <MakeHeading
                variant="titleH3"
                fontSize="2xl"
                key={key}
                color="black"
              >
                {children}
              </MakeHeading>
            )),
            renderNodeRule(isParagraph, ({ children, key }) => (
              <Text fontSize="14px" color="black" mb={4} key={key}>
                {children}
              </Text>
            )),
          ]}
          renderNode={Highlighter}
        />

        <HStack spacing={2} wrap="wrap">
          {tags?.map((tagObj) => (
            <Tag
              key={tagObj.tag}
              rounded="50px"
              bg="primary.500"
              boxShadow="0 16px 24px -8px rgba(0, 0, 0, 0.4)"
            >
              {tagObj.tag}
            </Tag>
          ))}
        </HStack>
      </VStack>
    </Box>
  );
};

export default PostExcerpt;

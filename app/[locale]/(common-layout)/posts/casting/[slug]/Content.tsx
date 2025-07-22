import DatoImage from "@/components/DatoImage";
import type { ContentPage } from "@/components/WithRealTimeUpdates/types";
import { notFound } from "next/navigation";
import type { PageProps, Query } from "./meta";
import { StructuredText, renderNodeRule } from "react-datocms/structured-text";
import Highlighter from "@/components/Highlighter";
import {
  isBlockquote,
  isHeading,
  isLink,
  isParagraph,
} from "datocms-structured-text-utils";
import {
  Box,
  Heading,
  Text,
  Link as ChakraLink,
  Flex,
  HStack,
  Tag,
} from "@chakra-ui/react";
import NewsletterCTABlock from "@/components/blocksWithVariants/NewsletterSubscriptionRecord/NewsletterCTABlock";
import QuoteBlock from "@/components/QuoteBlock";
import CTABlock from "@/components/blocksWithVariants/CtaButtonWithImageRecord/CTABlock";

const Content: ContentPage<PageProps, Query> = ({ data }) => {
  if (!data.casting) {
    notFound();
  }

  return (
    <Box
      as="section"
      id="CastingContent"
      display="flex"
      mt={16}
      flexDirection="column"
      py={8}
    >
      <Box
        mx="auto"
        mb={8}
        display="flex"
        alignItems="center"
        justifyContent="center"
        px={16}
      >
        <Box py={10}>
          <Flex flexDir="column" align="center" justify="center" gap={8} p={4}>
            <HStack>
              <Flex flexDir="column" gap={6} mx={8}>
                <Heading
                  as="h1"
                  fontSize="6xl"
                  fontWeight="semibold"
                  textTransform="capitalize"
                  color="#21E5B7"
                >
                  {data.casting.name}
                </Heading>

                <Flex maxW="450px">
                  <Text fontSize="sm" color="black">
                    {data.casting.bio}
                  </Text>
                </Flex>
              </Flex>

              <Box
                position="relative"
                aspectRatio="square"
                overflow="hidden"
                rounded="xl"
                boxShadow="xl"
              >
                <Box h="500px" w="600px">
                  <DatoImage
                    layout="fill"
                    objectFit="cover"
                    objectPosition="top"
                    fragment={data.casting.picture.responsiveImage}
                  />
                </Box>
              </Box>
            </HStack>

            <Flex
              mt={4}
              rounded="34px"
              color="black"
              flexDir="column"
              gap={4}
              bg="#2a2a2a"
              boxShadow="0 16px 24px -8px rgba(0, 0, 0, 0.4)"
              p={8}
            >
              <StructuredText
                data={data.casting.description}
                renderNode={Highlighter}
                renderBlock={({ record }) => {
                  switch (record.__typename) {
                    case "ImageBlockRecord": {
                      return (
                        <Box
                          pos="relative"
                          overflow="hidden"
                          rounded="24px"
                          shadow="24px"
                          h="340px"
                          w="210px"
                          boxShadow="0 16px 24px -8px rgba(0, 0, 0, 0.4)"
                        >
                          <Box h="100%" w="100%">
                            <DatoImage
                              fragment={record.image.responsiveImage}
                              layout="fill"
                              objectFit="cover"
                              objectPosition="50% 50%"
                            />
                          </Box>
                        </Box>
                      );
                    }
                    case "NewsletterSubscriptionRecord": {
                      return <NewsletterCTABlock fragment={record} />;
                    }
                    case "CtaButtonWithImageRecord": {
                      return <CTABlock fragment={record} />;
                    }

                    default:
                      return null;
                  }
                }}
                customNodeRules={[
                  renderNodeRule(isHeading, ({ children, key }) => {
                    return (
                      <Heading
                        as="h2"
                        key={key}
                        mt={9}
                        mb={4}
                        fontSize="4xl"
                        fontWeight="bold"
                        color="primary.500"
                      >
                        {children}
                      </Heading>
                    );
                  }),
                  renderNodeRule(isParagraph, ({ children, key }) => {
                    return (
                      <Text
                        fontSize="16px"
                        fontWeight="medium"
                        color="black"
                        lineHeight="relaxed"
                        mb={4}
                      >
                        {children}
                      </Text>
                    );
                  }),
                  renderNodeRule(isLink, ({ node, children, key }) => {
                    const attributeObject =
                      node.meta?.reduce((acc, { id, value }) => {
                        acc[id] = value;
                        return acc;
                      }, {} as Record<string, string>) || {};

                    return (
                      <ChakraLink
                        key={key}
                        href={node.url}
                        isExternal
                        fontWeight="medium"
                        fontSize={{ base: "24px", sm: "34px" }}
                        color="black"
                        textDecoration="underline"
                        {...attributeObject}
                      >
                        {children}
                      </ChakraLink>
                    );
                  }),
                  renderNodeRule(isBlockquote, ({ children, key }) => {
                    return <QuoteBlock key={key}>{children}</QuoteBlock>;
                  }),
                ]}
              />
            </Flex>
          </Flex>
        </Box>
      </Box>
    </Box>
  );
};

export default Content;

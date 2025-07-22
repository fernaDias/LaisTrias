"use client";

import QuoteBlock from "@/components/QuoteBlock";
import CTAAppBlock from "@/components/blocksWithVariants/AppCtaRecord/CTAAppBlock";
import CTABlock from "@/components/blocksWithVariants/CtaButtonWithImageRecord/CTABlock";
import NewsletterCTABlock from "@/components/blocksWithVariants/NewsletterSubscriptionRecord/NewsletterCTABlock";
import DatoImage from "@/components/DatoImage";
import Highlighter from "@/components/Highlighter";
import type { ContentPage } from "@/components/WithRealTimeUpdates/types";
import { buildUrl } from "@/utils/globalPageProps";
import {
  isBlockquote,
  isHeading,
  isLink,
  isParagraph,
} from "datocms-structured-text-utils";
import { notFound } from "next/navigation";
import { StructuredText, renderNodeRule } from "react-datocms";
import type { PageProps, Query } from "./meta";
import {
  Box,
  Container,
  Flex,
  Heading,
  Link as ChakraLink,
  Text,
} from "@chakra-ui/react";
import MakeHeading from "@/components/MakeHeading";

const Content: ContentPage<PageProps, Query> = ({
  data,
  ...globalPageProps
}) => {
  if (!data.post) {
    notFound();
  }

  return (
    <Box
      id="Content Post"
      as="section"
      maxW="screen.xl"
      px={{ base: 4, md: 24, lg: 8 }}
      py={{ base: 12, lg: 20 }}
      mx="auto"
    >
      <Container maxW="container.lg" mx="auto" px={4} mt={16}>
        <Flex flexWrap="wrap" justify="center">
          <Box w="100%" px={4}>
            <Box>
              <Heading
                mb={8}
                fontFamily="body"
                fontSize={["3xl", "4xl"]}
                fontWeight="bold"
                lineHeight="tight"
                color="black"
              >
                {data.post.title}
              </Heading>
              <Box>
                <StructuredText
                  data={data.post.content}
                  renderNode={Highlighter}
                  renderBlock={({ record }) => {
                    switch (record.__typename) {
                      case "ImageBlockRecord": {
                        return (
                          <Box
                            pos="relative"
                            mb={16}
                            mt={16}
                            overflow="hidden"
                            rounded="24px"
                            shadow="24px"
                            h={{ base: "300px", md: "400px" }}
                            boxShadow="0 16px 24px -8px rgba(0, 0, 0, 0.4)"
                          >
                            <DatoImage
                              fragment={record.image.responsiveImage}
                              layout="fill"
                              objectFit="cover"
                              objectPosition="50% 50%"
                            />
                          </Box>
                        );
                      }
                      case "NewsletterSubscriptionRecord": {
                        return <NewsletterCTABlock fragment={record} />;
                      }
                      case "CtaButtonWithImageRecord": {
                        return <CTABlock fragment={record} />;
                      }
                      case "AppCtaRecord": {
                        return <CTAAppBlock fragment={record} />;
                      }
                      default:
                        return null;
                    }
                  }}
                  renderLinkToRecord={({
                    record,
                    children,
                    transformedMeta,
                  }) => {
                    switch (record.__typename) {
                      case "PostRecord":
                        return (
                          <ChakraLink
                            {...transformedMeta}
                            href={buildUrl(
                              globalPageProps,
                              `/posts/${record.slug}`
                            )}
                            textDecoration="underline"
                            key={record.id}
                          >
                            {children}
                          </ChakraLink>
                        );
                      default:
                        return null;
                    }
                  }}
                  renderInlineRecord={({ record }) => {
                    switch (record.__typename) {
                      case "PostRecord": {
                        return (
                          <ChakraLink
                            key={record.id}
                            href={buildUrl(
                              globalPageProps,
                              `/posts/${record.slug}`
                            )}
                            textDecoration="underline"
                          >
                            {record.title}
                          </ChakraLink>
                        );
                      }
                      default:
                        return null;
                    }
                  }}
                  customNodeRules={[
                    renderNodeRule(isHeading, ({ children, key }) => {
                      return (
                        <Heading
                          as="h3"
                          key={key}
                          mt={9}
                          mb={4}
                          fontSize={["xl", "2xl"]}
                          fontWeight="bold"
                          color="black"
                        >
                          {children}
                        </Heading>
                      );
                    }),
                    renderNodeRule(isParagraph, ({ children, key }) => {
                      return (
                        <Text
                          fontSize={{ base: "20px", lg: "24px" }}
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
              </Box>
            </Box>
          </Box>
        </Flex>
      </Container>
    </Box>
  );
};

export default Content;

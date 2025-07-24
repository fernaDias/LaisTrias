"use client";
import {
  Box,
  Container,
  Heading,
  SimpleGrid,
  Text,
  VStack,
} from "@chakra-ui/react";
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

import { motion, useAnimation, type Variants } from "framer-motion";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

const MotionBox = motion(Box);
const MotionLink = motion(Link);

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.6,
      ease: "easeOut",
    },
  }),
};

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

  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  return (
    <MotionBox
      id="FullImageFeaturedPosts"
      bg="white"
      as="section"
      py={{ base: 16, md: 20, lg: 28 }}
      ref={ref}
    >
      <Container maxW="container.xl" px={{ base: 4, md: 8 }}>
        <Box maxW="7xl">
          <MotionBox
            mb={{ base: 10, md: 16 }}
            textAlign="center"
            variants={cardVariants}
            initial="hidden"
            animate={controls}
            custom={0}
          >
            <Heading
              as="h1"
              mb={{ base: 4, md: 6 }}
              fontSize={{ base: "2xl", lg: "6xl" }}
              fontWeight="bold"
              color="primary.500"
            >
              {blogHeader}
            </Heading>
            <Box>
              <MarkdownRenderer>{blogSubheader || ""}</MarkdownRenderer>
            </Box>
          </MotionBox>

          <SimpleGrid
            columns={{ base: 1, sm: 2, lg: 3 }}
            spacing={{ base: 4, md: 6, xl: 8 }}
          >
            {blogData.map((postFragment, i) => {
              const post = getFragmentData(
                PostExcerptFragmentDoc,
                postFragment
              );
              return (
                <MotionLink
                  key={post.id}
                  href={buildUrl(globalPageProps, `/posts/${post.slug}`)}
                  variants={cardVariants}
                  initial="hidden"
                  animate={controls}
                  custom={i + 1} // +1 para o delay começar após o título
                >
                  <Box
                    position="relative"
                    overflow="hidden"
                    borderRadius="34px"
                    bg="gray.100"
                    boxShadow="34px"
                    h={{ base: 48, md: 64, xl: 96 }}
                    role="group"
                    display="flex"
                    flexDirection="column"
                    p={6}
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
                        color="white"
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
                        Acessar post
                      </Text>
                    </VStack>
                  </Box>
                </MotionLink>
              );
            })}
          </SimpleGrid>
        </Box>
      </Container>
    </MotionBox>
  );
};

export default FullImageFeaturedPosts;

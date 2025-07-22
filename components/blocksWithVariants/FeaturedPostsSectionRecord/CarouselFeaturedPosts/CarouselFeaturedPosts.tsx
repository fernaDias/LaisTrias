"use client";

import DatoImage from "@/components/DatoImage";
import { type FragmentType, getFragmentData } from "@/graphql/types";
import {
  FeaturedPostsSectionFragmentDoc,
  PostExcerptFragmentDoc,
} from "@/graphql/types/graphql";
import { type GlobalPageProps, buildUrl } from "@/utils/globalPageProps";
import { useState } from "react";
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  HStack,
  Icon,
  Stack,
  Text,
  useColorModeValue,
  Link as ChakraLink,
} from "@chakra-ui/react";
import { ArrowBackIcon, ArrowForwardIcon } from "@chakra-ui/icons";

type Props = {
  fragment: FragmentType<typeof FeaturedPostsSectionFragmentDoc>;
  globalPageProps: GlobalPageProps;
};

const CarouselFeaturedPosts = ({ fragment, globalPageProps }: Props) => {
  const {
    featuredPosts: blogData,
    featuredPostsHeader: blogHeader,
    featuredPostsSubheader: blogSubheader,
  } = getFragmentData(FeaturedPostsSectionFragmentDoc, fragment);

  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % blogData.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? blogData.length - 1 : prevIndex - 1
    );
  };

  const currentReview = getFragmentData(
    PostExcerptFragmentDoc,
    blogData[currentIndex]
  );

  return (
    <Box
      id="CarouselFeaturedPost"
      as="section"
      bg={useColorModeValue("white", "gray.900")}
      py={10}
    >
      {/* <Container maxW="container.xl" px={6}>
        <Heading
          as="h1"
          fontSize={{ base: "2xl", lg: "3xl" }}
          fontWeight="semibold"
          textTransform="capitalize"
          color={useColorModeValue("gray.800", "white")}
        >
          {blogHeader}
        </Heading>

        <Flex
          mt={8}
          direction={{ base: "column", lg: "row" }}
          align={{ lg: "center" }}
          gap={{ lg: 6 }}
        >
          {currentReview.seoTags?.image?.responsiveImage && (
            <Box
              position="relative"
              h={{ base: "72", lg: "96" }}
              w="50%"
              rounded="xl"
              overflow="hidden"
              flex={{ lg: "1" }}
            >
              <DatoImage
                layout="fill"
                objectFit="cover"
                objectPosition="50% 20%"
                fragment={currentReview.seoTags.image.responsiveImage}
              />
            </Box>
          )}

          <Stack mt={{ base: 6, lg: 0 }} spacing={3} flex={{ lg: "1" }}>
            <Text textTransform="uppercase" fontSize="sm" color="blue.500">
              {currentReview.tags[0].tag}
            </Text>

            <Text
              as="a"
              href="#"
              fontSize="2xl"
              fontWeight="semibold"
              _hover={{ textDecoration: "underline" }}
              color={useColorModeValue("gray.800", "white")}
            >
              {currentReview.title}
            </Text>

            <Text
              fontSize="sm"
              color={useColorModeValue("gray.500", "gray.300")}
            >
              {currentReview.seoTags?.description}
            </Text>

            <ChakraLink
              href={buildUrl(globalPageProps, `/posts/${currentReview.slug}`)}
            >
              <Text
                as="span"
                mt={2}
                color="blue.500"
                textDecoration="underline"
                _hover={{ color: "blue.400" }}
                cursor="pointer"
                fontSize="sm"
              >
                Read more
              </Text>
            </ChakraLink>

            <Flex mt={6} align="center">
              <Box
                position="relative"
                boxSize="10"
                rounded="100%"
                overflow="hidden"
                flexShrink={0}
              >
                <DatoImage
                  layout="fill"
                  objectFit="cover"
                  objectPosition="50% 20%"
                  fragment={currentReview.author.picture.responsiveImage}
                />
              </Box>

              <Box ml={4}>
                <Text
                  fontSize="sm"
                  color={useColorModeValue("gray.700", "gray.200")}
                >
                  {currentReview.author.name}
                </Text>
                <Text
                  fontSize="sm"
                  color={useColorModeValue("gray.500", "gray.400")}
                >
                  {currentReview.author.bio}
                </Text>
              </Box>
            </Flex>

            <HStack mt={8} spacing={6}>
              <Button
                onClick={handlePrev}
                title="left arrow"
                variant="outline"
                rounded="100%"
                p={2}
                colorScheme="blackAlpha"
                _hover={{ bg: "primary.500", color: "white" }}
              >
                <Icon as={ArrowBackIcon} w={6} h={6} />
              </Button>
              <Button
                onClick={handleNext}
                title="right arrow"
                variant="outline"
                rounded="full"
                p={2}
                colorScheme="blackAlpha"
                _hover={{ bg: "primary.500", color: "white" }}
              >
                <Icon as={ArrowForwardIcon} w={6} h={6} />
              </Button>
            </HStack>
          </Stack>
        </Flex>
      </Container> */}
    </Box>
  );
};

export default CarouselFeaturedPosts;

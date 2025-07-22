"use client";

import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Icon,
  useColorModeValue,
} from "@chakra-ui/react";
import { type FragmentType, getFragmentData } from "@/graphql/types";
import { ReviewSectionFragmentDoc } from "@/graphql/types/graphql";
import { useState } from "react";
import { ArrowBackIcon, ArrowForwardIcon } from "@chakra-ui/icons";
import Testimonial from "./Testimonial";

type Props = {
  fragment: FragmentType<typeof ReviewSectionFragmentDoc>;
};

const ModernCarousel = ({ fragment }: Props) => {
  const {
    reviews,
    reviewSectionHeader: header,
    reviewSectionSubheader: subheader,
  } = getFragmentData(ReviewSectionFragmentDoc, fragment);

  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % reviews.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? reviews.length - 1 : prevIndex - 1
    );
  };

  const currentReview = reviews[currentIndex];

  const bgOverlay = useColorModeValue("primary.50", "gray.800");
  const textColor = useColorModeValue("gray.800", "white");

  return (
    <Box
      id="ModernCarousel"
      as="section"
      py={16}
      bg={useColorModeValue("white", "gray.900")}
    >
      <Flex position="relative">
        {/* Left Side Decoration */}
        <Box
          minH="100vh"
          w={{ lg: "33.33%" }}
          display={{ base: "none", lg: "block" }}
        />

        {/* Right Side Background Panel */}
        <Box
          mt="32"
          h="750px"
          w="75%"
          borderRadius="xl"
          bg={bgOverlay}
          display={{ base: "none", lg: "block" }}
        />

        {/* Main Content */}
        <Container
          position={{ lg: "absolute" }}
          insetInline={0}
          minH="100vh"
          display="flex"
          flexDirection="column"
          justifyContent="center"
          px={6}
          py={10}
          maxW="container.lg"
        >
          <Heading
            as="h1"
            fontSize={{ base: "2xl", lg: "3xl" }}
            fontWeight="semibold"
            color={textColor}
            mb={8}
          >
            {header}
          </Heading>

          <Testimonial fragment={currentReview} />

          {/* Navigation Buttons */}
          <Flex
            mt={12}
            align="center"
            justify={{ base: "space-between", lg: "flex-start" }}
          >
            <Button
              onClick={handlePrev}
              aria-label="Previous review"
              title="left arrow"
              rounded="full"
              border="1px solid"
              borderColor={useColorModeValue("gray.200", "gray.700")}
              color={textColor}
              variant="ghost"
              _hover={{ bg: useColorModeValue("gray.100", "gray.800") }}
            >
              <Icon as={ArrowBackIcon} boxSize={6} />
            </Button>

            <Button
              onClick={handleNext}
              aria-label="Next review"
              title="right arrow"
              rounded="full"
              border="1px solid"
              borderColor={useColorModeValue("gray.200", "gray.700")}
              color={textColor}
              variant="ghost"
              ml={{ lg: 6 }}
              _hover={{ bg: useColorModeValue("gray.100", "gray.800") }}
            >
              <Icon as={ArrowForwardIcon} boxSize={6} />
            </Button>
          </Flex>
        </Container>
      </Flex>
    </Box>
  );
};

export default ModernCarousel;

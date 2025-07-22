"use client";

import {
  Box,
  Button,
  Container,
  Icon,
  useColorModeValue,
} from "@chakra-ui/react";
import { type FragmentType, getFragmentData } from "@/graphql/types";
import { ReviewSectionFragmentDoc } from "@/graphql/types/graphql";
import { useState } from "react";
import { ArrowLeftIcon, ArrowRightIcon } from "@chakra-ui/icons";
import Testimonial from "./Testimonial";

type Props = {
  fragment: FragmentType<typeof ReviewSectionFragmentDoc>;
};

const Carousel = ({ fragment }: Props) => {
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

  return (
    <Box id="Carousel" as="section" mb={24}>
      <Container maxW="6xl" px={6} py={10}>
        <Box
          position="relative"
          zIndex={20}
          mt={{ base: 8, xl: 12 }}
          w="full"
          display={{ md: "flex" }}
          alignItems="center"
        >
          <Box
            position="absolute"
            top={0}
            left={0}
            zIndex={-10}
            w="full"
            h={{ base: "full", md: "24rem" }}
            rounded="2xl"
            bg="primary.500"
            opacity={0.7}
          />

          <Testimonial fragment={currentReview}>
            <Button
              onClick={handlePrev}
              title="left arrow"
              aria-label="Previous testimonial"
              rounded="full"
              border="1px solid"
              borderColor="whiteAlpha.400"
              p={2}
              color="black"
              bg="transparent"
              _hover={{ bg: "primary.600" }}
            >
              <Icon as={ArrowLeftIcon} boxSize={6} />
            </Button>

            <Button
              onClick={handleNext}
              title="right arrow"
              aria-label="Next testimonial"
              rounded="full"
              border="1px solid"
              borderColor="whiteAlpha.400"
              p={2}
              color="black"
              bg="transparent"
              _hover={{ bg: "primary.600" }}
              mx={{ md: 6 }}
            >
              <Icon as={ArrowRightIcon} boxSize={6} />
            </Button>
          </Testimonial>
        </Box>
      </Container>
    </Box>
  );
};

export default Carousel;

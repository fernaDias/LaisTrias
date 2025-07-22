"use client";

import { Box, Container, Heading, useColorModeValue } from "@chakra-ui/react";
import { type FragmentType, getFragmentData } from "@/graphql/types";
import { ReviewSectionFragmentDoc } from "@/graphql/types/graphql";
import { useState } from "react";
import Testimonial from "./Testimonial";

type Props = {
  fragment: FragmentType<typeof ReviewSectionFragmentDoc>;
};

const MinimalCarousel = ({ fragment }: Props) => {
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
    <Box id="MinimalCarousel" py={16}>
      <Container
        maxW="container.xl"
        px={8}
        py={10}
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
      >
        <Heading
          textAlign="center"
          fontSize={{ base: "3xl", lg: "6xl" }}
          fontWeight="semibold"
          textTransform="capitalize"
          color="black"
        >
          {header}
        </Heading>

        <Testimonial
          fragment={currentReview}
          onPrev={handlePrev}
          onNext={handleNext}
        />
      </Container>
    </Box>
  );
};

export default MinimalCarousel;

"use client";

import {
  Box,
  Heading,
  SimpleGrid,
  Stack,
  useColorModeValue,
} from "@chakra-ui/react";
import { type FragmentType, getFragmentData } from "@/graphql/types";
import { ReviewSectionFragmentDoc } from "@/graphql/types/graphql";
import Testimonial from "./Testimonial";

type Props = {
  fragment: FragmentType<typeof ReviewSectionFragmentDoc>;
};

const MinimalReviewCards = ({ fragment }: Props) => {
  const {
    reviews,
    reviewSectionHeader: header,
    reviewSectionSubheader: subheader,
  } = getFragmentData(ReviewSectionFragmentDoc, fragment);

  return (
    <Box id="MinimalReviewCards" py={{ base: 8, sm: 8, lg: 12 }}>
      <Box maxW="7xl" mx="auto" px={{ base: 4, md: 8 }}>
        <Heading
          as="h2"
          fontSize={{ base: "2xl", lg: "3xl" }}
          fontWeight="bold"
          textAlign="center"
          color="black"
          mb={{ base: 8, md: 12 }}
        >
          {header}
        </Heading>

        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ base: 4, md: 8 }}>
          {reviews.map((review) => (
            <Testimonial key={review.id} fragment={review} />
          ))}
        </SimpleGrid>
      </Box>
    </Box>
  );
};

export default MinimalReviewCards;

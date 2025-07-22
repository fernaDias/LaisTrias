"use client";

import { Box, Flex, Heading, Text, useColorModeValue } from "@chakra-ui/react";
import DatoImage from "@/components/DatoImage";
import Highlighter from "@/components/Highlighter";
import { type FragmentType, getFragmentData } from "@/graphql/types";
import { TestimonialFragmentDoc } from "@/graphql/types/graphql";
import { StructuredText as StructuredTextField } from "react-datocms/structured-text";

type Props = {
  fragment: FragmentType<typeof TestimonialFragmentDoc>;
};

const Testimonial = ({ fragment }: Props) => {
  const { rating, reviewerName, reviewerPicture, review, reviewerTitle } =
    getFragmentData(TestimonialFragmentDoc, fragment);

  const textColor = useColorModeValue("gray.600", "gray.300");
  const highlightColor = useColorModeValue("gray.500", "gray.400");

  return (
    <Flex
      id="Testemonial Modern Carousel"
      mt={{ base: 10, lg: 20 }}
      direction={{ base: "column", lg: "row" }}
      align="center"
    >
      {/* Image Container */}
      <Box
        position="relative"
        h="24rem"
        w="full"
        maxW={{ lg: "32rem" }}
        overflow="hidden"
        rounded="34px"
        flexShrink={0}
      >
        <DatoImage
          layout="fill"
          objectFit="cover"
          objectPosition="80% 20%"
          fragment={reviewerPicture.responsiveImage}
        />
      </Box>

      {/* Text Content */}
      <Box mt={{ base: 8, lg: 0 }} px={{ lg: 10 }}>
        <Box mt={6} maxW="34px" color={highlightColor}>
          <StructuredTextField data={review} renderNode={Highlighter} />
        </Box>

        <Heading
          as="h3"
          mt={6}
          fontSize="34px"
          fontWeight="medium"
          color="primary.500"
        >
          {reviewerName}
        </Heading>
        <Text color={textColor}>{reviewerTitle}</Text>
      </Box>
    </Flex>
  );
};

export default Testimonial;

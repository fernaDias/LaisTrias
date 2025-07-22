"use client";

import {
  Box,
  Button,
  Flex,
  Heading,
  IconButton,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import DatoImage from "@/components/DatoImage";
import Highlighter from "@/components/Highlighter";
import { type FragmentType, getFragmentData } from "@/graphql/types";
import { TestimonialFragmentDoc } from "@/graphql/types/graphql";
import { StructuredText as StructuredTextField } from "react-datocms/structured-text";
import { ArrowBackIcon, ArrowForwardIcon } from "@chakra-ui/icons";

type Props = {
  fragment: FragmentType<typeof TestimonialFragmentDoc>;
  onPrev: () => void;
  onNext: () => void;
};

const Testimonial = ({ fragment, onPrev, onNext }: Props) => {
  const { reviewerName, reviewerPicture, review, reviewerTitle } =
    getFragmentData(TestimonialFragmentDoc, fragment);

  return (
    <Box is="TestemonialMinimalCarousel" mt={6}>
      {/* Dots */}
      <Flex justify="center" align="center" mt={6}>
        <Box h="4px" w="160px" bg="primary.500" borderRadius="full" />
        <Box h="4px" w="12px" mx={1} bg="primary.500" borderRadius="full" />
        <Box h="4px" w="4px" bg="primary.500" borderRadius="full" />
      </Flex>

      {/* Content */}
      <Flex
        mt={16}
        w="full"
        maxW="6xl"
        mx="auto"
        align="center"
        justify="center"
        textAlign="center"
        direction="row"
        px={4}
      >
        <IconButton
          aria-label="Previous testimonial"
          icon={<ArrowBackIcon />}
          onClick={onPrev}
          variant="outline"
          borderColor="black"
          color="black"
          _hover={{ bg: "primary.500" }}
          isRound
        />

        <Box
          display="flex"
          mx={{ base: 4, lg: 8 }}
          color="black"
          textAlign="center"
          minW={{ base: "250px", lg: "800px" }}
          maxW={{ base: "100%", lg: "800px" }}
          minH={{ base: "250px", lg: "200px" }}
          justifyContent="center"
          alignItems="center"
        >
          <StructuredTextField data={review} renderNode={Highlighter} />
        </Box>

        <IconButton
          aria-label="Next testimonial"
          icon={<ArrowForwardIcon />}
          onClick={onNext}
          variant="outline"
          borderColor="black"
          color="black"
          _hover={{ bg: "primary.500" }}
          isRound
        />
      </Flex>

      {/* Reviewer Info */}
      <Flex mt={8} direction="column" align="center" justify="center">
        <Box
          position="relative"
          h="56px"
          w="56px"
          overflow="hidden"
          borderRadius="full"
        >
          <DatoImage
            layout="fill"
            objectFit="cover"
            objectPosition="80% 20%"
            fragment={reviewerPicture.responsiveImage}
          />
        </Box>

        <Box mt={4} textAlign="center">
          <Heading as="h3" size="24px" color="black">
            {reviewerName}
          </Heading>
          <Text fontSize="sm" color="black">
            {reviewerTitle}
          </Text>
        </Box>
      </Flex>
    </Box>
  );
};

export default Testimonial;

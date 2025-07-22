"use client";
import { Box, Flex, Text, useColorModeValue, chakra } from "@chakra-ui/react";
import DatoImage from "@/components/DatoImage";
import Highlighter from "@/components/Highlighter";
import { type FragmentType, getFragmentData } from "@/graphql/types";
import { TestimonialFragmentDoc } from "@/graphql/types/graphql";
import { StructuredText as StructuredTextField } from "react-datocms/structured-text";

const StarIcon = () => (
  <chakra.svg width="18" height="16" viewBox="0 0 18 16" fill="currentColor">
    <path d="M9.09815 0.361679L11.1054 6.06601H17.601L12.3459 9.59149L14.3532 15.2958L9.09815 11.7703L3.84309 15.2958L5.85035 9.59149L0.595291 6.06601H7.0909L9.09815 0.361679Z" />
  </chakra.svg>
);

type Props = {
  fragment: FragmentType<typeof TestimonialFragmentDoc>;
};

const Testimonial = ({ fragment }: Props) => {
  const { rating, reviewerName, reviewerPicture, review, reviewerTitle } =
    getFragmentData(TestimonialFragmentDoc, fragment);

  const ratingIcons = Array.from({ length: rating }).map((_, index) => (
    <Box key={index} color="yellow.400">
      <StarIcon />
    </Box>
  ));

  const borderColor = useColorModeValue("bodyColor.100", "whiteAlpha.200");
  const textColor = useColorModeValue("bodyColor", "white");

  return (
    <Box id="Testemonial's" h="24rem" w="full">
      <Flex
        direction="column"
        h="full"
        align="center"
        justify="center"
        bg={useColorModeValue("white", "#1D2144")}
        p={8}
        rounded="24px"
        boxShadow="34px"
      >
        <Flex mb={5} gap={1}>
          {ratingIcons}
        </Flex>

        <Box
          mb={8}
          h="9rem"
          borderBottom="1px"
          borderColor={borderColor}
          pb={8}
          fontSize="base"
          lineHeight="relaxed"
          color={textColor}
        >
          <StructuredTextField data={review} renderNode={Highlighter} />
        </Box>

        <Flex
          w={{ base: "full", md: "full", lg: "96" }}
          align="center"
          px={{ base: 4, lg: 0 }}
        >
          <Box
            pos="relative"
            boxSize="50px"
            maxW="50px"
            mr={4}
            rounded="full"
            overflow="hidden"
          >
            <DatoImage
              fragment={reviewerPicture.responsiveImage}
              className="h-full w-full object-contain"
              layout="fill"
              objectFit="cover"
              objectPosition="50% 50%"
            />
          </Box>
          <Box>
            <Text
              mb={1}
              fontSize={{ base: "34px", lg: "base", xl: "34px" }}
              fontWeight="semibold"
              color={useColorModeValue("gray.900", "white")}
            >
              {reviewerName}
            </Text>
            <Text fontSize="sm" color="gray.500">
              {reviewerTitle}
            </Text>
          </Box>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Testimonial;

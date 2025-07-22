"use client";
import {
  Box,
  Flex,
  Text,
  Avatar,
  useColorModeValue,
  Stack,
} from "@chakra-ui/react";
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
  const textColor = "whiteAlpha.900";
  const subTextColor = "whiteAlpha.700";

  return (
    <Flex
      id="Testemonial Minimal Review Cards"
      direction="column"
      align="center"
      justify="space-between"
      gap={{ base: 4, md: 6 }}
      px={8}
      py={6}
      bg="#026666"
      borderRadius="34px"
      boxShadow="0 16px 24px -8px rgba(0, 0, 0, 0.4)"
    >
      <Box textAlign="center" color="black" fontSize={{ lg: "24px" }}>
        <StructuredTextField data={review} renderNode={Highlighter} />
      </Box>

      <Stack
        direction={{ base: "column", sm: "row" }}
        align="center"
        spacing={{ base: 2, md: 3 }}
      >
        <Box
          position="relative"
          w={{ base: "3rem", md: "3.5rem" }}
          h={{ base: "3rem", md: "3.5rem" }}
          borderRadius="full"
          overflow="hidden"
          border="2px solid"
          borderColor="whiteAlpha.300"
          bg="gray.100"
          flexShrink={0}
        >
          <DatoImage
            layout="fill"
            objectFit="cover"
            objectPosition="80% 20%"
            fragment={reviewerPicture.responsiveImage}
          />
        </Box>

        <Box textAlign={{ base: "center", sm: "left" }}>
          <Text
            fontWeight="bold"
            fontSize={{ base: "sm", md: "base" }}
            color="whiteAlpha.900"
          >
            {reviewerName}
          </Text>
          <Text fontSize="sm" color={subTextColor}>
            {reviewerTitle}
          </Text>
        </Box>
      </Stack>
    </Flex>
  );
};

export default Testimonial;

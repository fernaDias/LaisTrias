import { Box, Flex, Text, useColorModeValue } from "@chakra-ui/react";
import DatoImage from "@/components/DatoImage";
import Highlighter from "@/components/Highlighter";
import { type FragmentType, getFragmentData } from "@/graphql/types";
import { TestimonialFragmentDoc } from "@/graphql/types/graphql";
import type { ReactNode } from "react";
import { StructuredText as StructuredTextField } from "react-datocms/structured-text";

type Props = {
  fragment: FragmentType<typeof TestimonialFragmentDoc>;
  children: ReactNode;
};

const Testimonial = ({ fragment, children }: Props) => {
  const { reviewerName, reviewerPicture, review, reviewerTitle } =
    getFragmentData(TestimonialFragmentDoc, fragment);

  return (
    <Box id="Testemonial Carousel" maxW="6xl" mx="auto" px={6} py={10}>
      <Box
        pos="relative"
        zIndex={20}
        w="100%"
        display={{ md: "flex" }}
        alignItems="center"
      >
        <Box
          pos="absolute"
          zIndex={-10}
          w="100%"
          h={"24rem"}
          rounded="2xl"
          bg="primary.500"
          opacity={0.7}
        />

        <Flex
          w="100%"
          h="100%"
          rounded="2xl"
          bg={{ base: "primary.500", md: "transparent" }}
          p={{ base: 6, md: 0 }}
          align={{ md: "center" }}
          justify={{ md: "space-evenly" }}
          direction={{ base: "column", md: "row" }}
          px={{ lg: 12 }}
        >
          <Box
            pos="relative"
            h="6rem"
            w="6rem"
            flexShrink={0}
            overflow="hidden"
            rounded="full"
            shadow="24px"
          >
            <DatoImage
              layout="fill"
              objectFit="cover"
              objectPosition="50% 50%"
              fragment={reviewerPicture.responsiveImage}
            />
          </Box>

          <Box mt={2} mx={{ md: 6 }}>
            <Box>
              <Text fontSize="xl" fontWeight="medium" color="black" mb={1}>
                {reviewerName}
              </Text>
              <Text color="gray.300">{reviewerTitle}</Text>
            </Box>

            <Box
              mt={4}
              fontSize={{ base: "16px", md: "xl" }}
              lineHeight="relaxed"
              color="black"
              minH="200px"
              minW={{ base: "100%", md: "830px" }}
            >
              <StructuredTextField data={review} renderNode={Highlighter} />
            </Box>

            <Flex
              mt={6}
              align="center"
              justify={{ base: "space-between", md: "flex-start" }}
            >
              {children}
            </Flex>
          </Box>
        </Flex>
      </Box>
    </Box>
  );
};

export default Testimonial;

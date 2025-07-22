import DatoImage from "@/components/DatoImage";
import { type FragmentType, getFragmentData } from "@/graphql/types";
import {
  CtaButtonWithImageFragmentDoc,
  ImageFileField,
} from "@/graphql/types/graphql";
import { MarkdownRenderer } from "@/components/MarkdownRenderer";
import { Box, Button, Flex, Heading, Text } from "@chakra-ui/react";

type Props = {
  fragment: FragmentType<typeof CtaButtonWithImageFragmentDoc>;
};

const CTABlock = ({ fragment }: Props) => {
  const { title, subtitle, buttonLabel, image } = getFragmentData(
    CtaButtonWithImageFragmentDoc,
    fragment
  );
  return (
    <Box id="CTABlock" py={{ base: 6, sm: 8, lg: 12 }}>
      <Box mx="auto">
        <Flex
          direction={{ base: "column", sm: "row" }}
          overflow="hidden"
          borderRadius="34px"
          bg="#2a2a2a"
          w={{ base: "100%" }}
          boxShadow="0 16px 24px -8px rgba(0, 0, 0, 0.4)"
        >
          <Box position="relative" w={{ base: "50%" }}>
            <DatoImage
              layout="fill"
              objectFit="cover"
              objectPosition="50% 50%"
              fragment={image.responsiveImage}
            />
          </Box>

          <Flex
            direction="column"
            w="100%"
            p={{ base: 4, sm: 8 }}
            textAlign="center"
          >
            <Heading
              as="h2"
              fontSize={{ base: "34px", md: "xl", lg: "2xl" }}
              fontWeight="bold"
              mb={4}
              color="black"
            >
              {title}
            </Heading>

            <Box
              mb={8}
              mx="auto"
              fontSize="24px"
              color="black"
              sx={{
                "& p": { marginBottom: "0.5rem" },
              }}
            >
              <MarkdownRenderer>{subtitle || ""}</MarkdownRenderer>
            </Box>

            <Box mt="auto">
              <Button
                bg="primary.500"
                color="black"
                px={8}
                py={3}
                fontSize={{ base: "sm", md: "24px" }}
                fontWeight="semibold"
                borderRadius="34px"
                _hover={{ bg: "primary.600", cursor: "pointer" }}
              >
                {buttonLabel}
              </Button>
            </Box>
          </Flex>
        </Flex>
      </Box>
    </Box>
  );
};

export default CTABlock;

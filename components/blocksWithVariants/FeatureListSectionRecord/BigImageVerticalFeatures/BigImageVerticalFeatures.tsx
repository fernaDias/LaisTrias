"use client";
import DatoImage from "@/components/DatoImage";
import { type FragmentType, getFragmentData } from "@/graphql/types";
import { FeatureListSectionFragmentDoc } from "@/graphql/types/graphql";
import {
  Box,
  Container,
  Heading,
  SimpleGrid,
  Text,
  Flex,
} from "@chakra-ui/react";
import { MarkdownRenderer } from "@/components/MarkdownRenderer";

type Props = {
  fragment: FragmentType<typeof FeatureListSectionFragmentDoc>;
};

const BigImageVerticalFeatures = ({ fragment }: Props) => {
  const {
    feature: features,
    featuresHeader,
    featuresSubheader,
  } = getFragmentData(FeatureListSectionFragmentDoc, fragment);

  return (
    <Box id="BigImageVerticalFeatures" py={{ base: 6, sm: 8, lg: 12 }}>
      <Container maxW="7xl" px={{ base: 6, md: 8 }}>
        <Box mb={{ base: 10, md: 16 }} textAlign="center">
          <Heading
            as="h2"
            fontSize={{ base: "2xl", lg: "6xl" }}
            fontWeight="bold"
            color="black"
            mb={4}
          >
            {featuresHeader}
          </Heading>

          <Text
            color="black"
            fontSize={{ base: "22px", md: "2xl" }}
            maxW="3xl"
            mx="auto"
          >
            <MarkdownRenderer>{featuresSubheader || ""}</MarkdownRenderer>
          </Text>
        </Box>

        <SimpleGrid
          columns={{ base: 1, sm: 1, lg: 3, xl: 3 }}
          spacing={{ base: 4, md: 6, xl: 8 }}
        >
          {features.map((feature) => (
            <Box
              key={feature.id}
              bg="#2A2A2A"
              borderRadius="34px"
              overflow="hidden"
              role="group"
              display="flex"
              flexDirection="column"
              boxShadow="0 16px 24px -8px rgba(0, 0, 0, 0.4)"
            >
              <Box
                position="relative"
                h={{ base: 48, md: 64 }}
                overflow="hidden"
              >
                <Box
                  position="absolute"
                  inset={0}
                  transition="transform 0.2s"
                  _groupHover={{ transform: "scale(1.1)" }}
                >
                  {/* <DatoImage
                    layout="fill"
                    objectFit="cover"
                    objectPosition="50% 50%"
                    fragment={feature.featureIcon.responsiveImage}
                  /> */}
                </Box>
              </Box>

              <Flex flex="1" direction="column" p={{ base: 4, sm: 6 }}>
                <Heading
                  as="h3"
                  fontSize="4xl"
                  fontWeight="semibold"
                  color="black"
                  mb={2}
                  _groupHover={{ color: "blue.500" }}
                >
                  {feature.featureTitle}
                </Heading>

                <Text color="black" fontSize="20px" mb={8}>
                  <MarkdownRenderer>
                    {feature.featureDescription || ""}
                  </MarkdownRenderer>
                </Text>
              </Flex>
            </Box>
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  );
};

export default BigImageVerticalFeatures;

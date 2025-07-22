import DatoImage from "@/components/DatoImage";
import { type FragmentType, getFragmentData } from "@/graphql/types";
import { FeatureListSectionFragmentDoc } from "@/graphql/types/graphql";
import {
  Box,
  Flex,
  Heading,
  Text,
  SimpleGrid,
  Container,
} from "@chakra-ui/react";
import { MarkdownRenderer } from "@/components/MarkdownRenderer";

type Props = {
  fragment: FragmentType<typeof FeatureListSectionFragmentDoc>;
};

const BigImageHorizontalFeatures = ({ fragment }: Props) => {
  const {
    feature: features,
    featuresHeader,
    featuresSubheader,
  } = getFragmentData(FeatureListSectionFragmentDoc, fragment);
  return (
    <Box id="BigImageHorizontalFeatures" cursor="default">
      <Container maxW="container.xl" px={{ base: 4, md: 8 }}>
        <Box mb={{ base: 10, md: 16 }} textAlign="center">
          <Heading
            as="h2"
            fontSize={{ base: "3xl", lg: "6xl" }}
            color="black"
            fontFamily="heading"
            mb={4}
          >
            {featuresHeader}
          </Heading>

          <MarkdownRenderer>{featuresSubheader || ""}</MarkdownRenderer>
        </Box>

        <SimpleGrid
          columns={{ base: 1, lg: 3 }}
          spacing={{ base: 4, md: 6, xl: 8 }}
          justifyItems="center"
        >
          {features.map((feature) => (
            <Flex
              key={feature.id}
              direction={{ base: "column", lg: "row" }}
              align="start"
              borderWidth="1px"
              borderRadius="34px"
              overflow="hidden"
              role="group"
              maxW={{ base: "300px", lg: "390px" }}
            >
              <Flex
                pos="relative"
                display="block"
                h={48}
                w={{ base: "100%", md: 32, lg: 48 }}
                flexShrink={0}
                alignSelf="start"
                overflow="hidden"
                bg="gray.100"
              >
                <Flex
                  pos="absolute"
                  inset="0"
                  h="50px"
                  w="50px"
                  objectFit="cover"
                  objectPosition="center"
                  transition="all 0.2s ease-in-out"
                  _groupHover={{ transform: "scale(1.1)" }}
                >
                  <Box w="100%" h="100%" objectFit="contain">
                    {/* <DatoImage
                      fragment={feature.featureIcon.responsiveImage}
                      className="h-full w-full object-contain"
                      layout="fill"
                      objectFit="cover"
                      objectPosition="50% 50%"
                    /> */}
                  </Box>
                </Flex>
              </Flex>
              <Box
                p={{ base: 4, lg: 6 }}
                display="flex"
                flexDirection="column"
                gap={2}
              >
                <Heading
                  as="h3"
                  fontSize="xl"
                  fontWeight="bold"
                  color="gray.800"
                  _groupHover={{ color: "blue.500" }}
                >
                  {feature.featureTitle}
                </Heading>

                <Text color="gray.500">
                  <MarkdownRenderer>
                    {feature.featureDescription || ""}
                  </MarkdownRenderer>
                </Text>
              </Box>
            </Flex>
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  );
};

export default BigImageHorizontalFeatures;

"use client";
import {
  Box,
  Container,
  Heading,
  Link as ChakraLink,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { type FragmentType, getFragmentData } from "@/graphql/types";
import { CtaAppBlockFragmentDoc } from "@/graphql/types/graphql";
import { MarkdownRenderer } from "@/components/MarkdownRenderer";

type Props = {
  fragment: FragmentType<typeof CtaAppBlockFragmentDoc>;
};

const CTAAppBlock = ({ fragment }: Props) => {
  const { title, text, googlePlayUrl, appstoreUrl } = getFragmentData(
    CtaAppBlockFragmentDoc,
    fragment
  );

  const headingColor = useColorModeValue("gray.800", "white");
  const textColor = useColorModeValue("gray.500", "gray.300");
  const appStoreBg = useColorModeValue("gray.900", "gray.800");
  const appStoreHover = useColorModeValue("gray.700", "gray.700");
  const appStoreRing = useColorModeValue("gray.300", "gray.300");

  return (
    <Box
      id="CTAAppBlock"
      bg={useColorModeValue("white", "gray.900")}
      px={8}
      py={16}
    >
      <Container
        maxW="container.xl"
        px={4}
        py={12}
        textAlign="center"
        display="flex"
        flexDir="column"
        alignItems="center"
      >
        <Heading
          fontSize={{ base: "2xl", xl: "3xl" }}
          fontWeight="bold"
          color={headingColor}
          letterSpacing="tight"
        >
          {title}
        </Heading>

        <Box mt={4} maxW="4xl" color={textColor} textAlign="center">
          <MarkdownRenderer>{text || ""}</MarkdownRenderer>
        </Box>

        <Stack
          direction={{ base: "column", sm: "row" }}
          spacing={4}
          mt={6}
          align="center"
          justify="center"
        >
          {appstoreUrl && (
            <ChakraLink
              href={appstoreUrl}
              isExternal
              display="inline-flex"
              alignItems="center"
              justifyContent="center"
              overflow="hidden"
              rounded="34px"
              bg={appStoreBg}
              px={4}
              py={2.5}
              fontSize="sm"
              color="black"
              shadow="24px"
              transition="all 0.3s"
              _hover={{ bg: appStoreHover }}
              _focus={{ ring: 2, ringColor: appStoreRing, ringOpacity: "0.8" }}
              w={{ base: "full", sm: "auto" }}
            >
              <Box
                as="svg"
                mx={2}
                h={5}
                w={5}
                fill="currentColor"
                viewBox="0 0 512 512"
              >
                <svg
                  className="mx-2 h-5 w-5 fill-current"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  x="0px"
                  y="0px"
                  viewBox="0 0 512 512"
                  xmlSpace="preserve"
                >
                  <g>
                    <g>
                      <path d="M407,0H105C47.103,0,0,47.103,0,105v302c0,57.897,47.103,105,105,105h302c57.897,0,105-47.103,105-105V105C512,47.103,464.897,0,407,0z M482,407c0,41.355-33.645,75-75,75H105c-41.355,0-75-33.645-75-75V105c0-41.355,33.645-75,75-75h302c41.355,0,75,33.645,75,75V407z" />
                    </g>
                  </g>
                  <g>
                    <g>
                      <path d="M305.646,123.531c-1.729-6.45-5.865-11.842-11.648-15.18c-11.936-6.892-27.256-2.789-34.15,9.151L256,124.166l-3.848-6.665c-6.893-11.937-22.212-16.042-34.15-9.151h-0.001c-11.938,6.893-16.042,22.212-9.15,34.151l18.281,31.664L159.678,291H110.5c-13.785,0-25,11.215-25,25c0,13.785,11.215,25,25,25h189.86l-28.868-50h-54.079l85.735-148.498C306.487,136.719,307.375,129.981,305.646,123.531z" />
                    </g>
                  </g>
                  <g>
                    <g>
                      <path d="M401.5,291h-49.178l-55.907-96.834l-28.867,50l86.804,150.348c3.339,5.784,8.729,9.921,15.181,11.65c2.154,0.577,4.339,0.863,6.511,0.863c4.332,0,8.608-1.136,12.461-3.361c11.938-6.893,16.042-22.213,9.149-34.15L381.189,341H401.5c13.785,0,25-11.215,25-25C426.5,302.215,415.285,291,401.5,291z" />
                    </g>
                  </g>
                  <g>
                    <g>
                      <path d="M119.264,361l-4.917,8.516c-6.892,11.938-2.787,27.258,9.151,34.15c3.927,2.267,8.219,3.345,12.458,3.344c8.646,0,17.067-4.484,21.693-12.495L176.999,361H119.264z" />
                    </g>
                  </g>
                </svg>
              </Box>
              <Box mx={2}>Get it on the App Store</Box>
            </ChakraLink>
          )}

          {googlePlayUrl && (
            <ChakraLink
              href={googlePlayUrl}
              isExternal
              mt={{ base: 4, sm: 0 }}
              display="inline-flex"
              alignItems="center"
              justifyContent="center"
              overflow="hidden"
              rounded="34px"
              bg="primary"
              px={4}
              py={2.5}
              fontSize="sm"
              color="black"
              shadow="24px"
              transition="all 0.3s"
              _hover={{ bg: "blue.500" }}
              _focus={{ ring: 2, ringColor: "blue.300", ringOpacity: "0.8" }}
              w={{ base: "full", sm: "auto" }}
            >
              <Box
                as="svg"
                mx={2}
                h={5}
                w={5}
                fill="currentColor"
                viewBox="-28 0 512 512.00075"
              >
                <svg
                  className="mx-2 h-5 w-5 fill-current"
                  viewBox="-28 0 512 512.00075"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="m432.320312 215.121094-361.515624-208.722656c-14.777344-8.53125-32.421876-8.53125-47.203126 0-.121093.070312-.230468.148437-.351562.21875-.210938.125-.421875.253906-.628906.390624-14.175782 8.636719-22.621094 23.59375-22.621094 40.269532v417.445312c0 17.066406 8.824219 32.347656 23.601562 40.878906 7.390626 4.265626 15.496094 6.398438 23.601563 6.398438s16.214844-2.132812 23.601563-6.398438l361.519531-208.722656c14.777343-8.53125 23.601562-23.8125 23.601562-40.878906s-8.824219-32.347656-23.605469-40.878906zm-401.941406 253.152344c-.21875-1.097657-.351562-2.273438-.351562-3.550782v-417.445312c0-2.246094.378906-4.203125.984375-5.90625l204.324219 213.121094zm43.824219-425.242188 234.21875 135.226562-52.285156 54.539063zm-6.480469 429.679688 188.410156-196.527344 54.152344 56.484375zm349.585938-201.835938-80.25 46.332031-60.125-62.714843 58.261718-60.773438 82.113282 47.40625c7.75 4.476562 8.589844 11.894531 8.589844 14.875s-.839844 10.398438-8.589844 14.875zm0 0" />
                </svg>
              </Box>
              <Box mx={2}>Get it on Google Play</Box>
            </ChakraLink>
          )}
        </Stack>
      </Container>
    </Box>
  );
};

export default CTAAppBlock;

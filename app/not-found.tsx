import {
  Box,
  Container,
  Flex,
  Heading,
  Text,
  Link as ChakraLink,
  Button,
} from "@chakra-ui/react";
import Link from "next/link";

const NotFound = () => {
  return (
    <Flex
      position="relative"
      zIndex="10"
      pb={{ base: 16, md: 20, lg: 28 }}
      pt={{ base: 36, lg: "180px" }}
      flexDir="column"
      h="100vh"
    >
      <Container maxW="container.lg">
        <Flex mx={-4} flexWrap="wrap">
          <Flex w="100%" px={4}>
            <Flex
              direction="column"
              mx="auto"
              maxW="993px"
              textAlign="center"
              justify="center"
              align="center"
            >
              <Flex mx="auto" mb={9} textAlign="center">
                <svg
                  width="110"
                  height="108"
                  viewBox="0 0 110 108"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M33.8699 58.1L47.47 44.5L52.9399 49.97L39.34 63.57C38.6 64.31 38.2099 65.21 38.1899 66.26C38.1599 67.32 38.5499 68.24 39.3499 69.04C40.1499 69.84 41.07 70.22 42.13 70.19C43.18 70.16 44.08 69.78 44.82 69.04L58.4199 55.44L63.8899 60.91L50.29 74.51C48.01 76.79 45.27 77.93 42.08 77.93C38.89 77.93 36.1499 76.79 33.8699 74.51C31.5899 72.23 30.45 69.49 30.45 66.3C30.45 63.11 31.5899 60.37 33.8699 58.09V58.1Z"
                    fill="#FF3000"
                    stroke="#026666"
                    strokeWidth="2"
                  />
                  <path
                    d="M72.29 30.8L58.69 44.4L53.22 38.93L66.82 25.33C67.56 24.59 67.95 23.69 67.97 22.64C68 21.58 67.61 20.66 66.81 19.86C66.01 19.06 65.09 18.68 64.03 18.71C62.98 18.74 62.08 19.12 61.34 19.86L47.74 33.46L42.27 27.99L55.87 14.39C58.15 12.11 60.89 10.97 64.08 10.97C67.27 10.97 70.01 12.11 72.29 14.39C74.57 16.67 75.71 19.41 75.71 22.6C75.71 25.79 74.57 28.53 72.29 30.81V30.8Z"
                    fill="#FF3000"
                    stroke="#026666"
                    strokeWidth="2"
                  />
                  <path
                    d="M94.01 52.5199L80.41 66.1199L74.94 60.6499L88.54 47.0499C89.28 46.3099 89.67 45.4099 89.69 44.3599C89.72 43.2999 89.33 42.3799 88.53 41.5799C87.73 40.7799 86.81 40.3999 85.75 40.4299C84.7 40.4599 83.8 40.8399 83.06 41.5799L69.46 55.1799L63.99 49.7099L77.59 36.1099C79.87 33.8299 82.61 32.6899 85.8 32.6899C88.99 32.6899 91.73 33.8299 94.01 36.1099C96.29 38.3899 97.43 41.1299 97.43 44.3199C97.43 47.5099 96.29 50.2499 94.01 52.5299V52.5199Z"
                    fill="#FF3000"
                    stroke="#026666"
                    strokeWidth="2"
                  />
                  <path
                    d="M71.19 82.5901L61.15 72.5501L55.63 78.0701L75.23 97.6701L81.11 75.7101L74.74 69.3401L71.19 82.5901Z"
                    fill="#21E5B7"
                    stroke="#026666"
                    strokeWidth="2"
                  />
                  <path
                    d="M25.8 37.2L39.05 33.65L32.68 27.28L10.72 33.16L30.33 52.76L35.85 47.24L25.8 37.2Z"
                    fill="#21E5B7"
                    stroke="#026666"
                    strokeWidth="2"
                  />
                  <path
                    d="M87.8 20.5901L86.24 26.4301C88.95 26.4901 91.5 27.1301 93.82 28.3101L98.84 9.56006L80.09 14.5801C81.27 16.9001 81.9 19.4501 81.97 22.1601L87.81 20.6001L87.8 20.5901Z"
                    fill="#21E5B7"
                    stroke="#026666"
                    strokeWidth="2"
                  />
                </svg>
              </Flex>
              <Heading
                as="h3"
                fontSize={{ base: "3xl", sm: "4xl" }}
                fontWeight="bold"
                mb={4}
                color="black"
                _dark={{ color: "white" }}
              >
                Opa! Essa página parece estar de folga.
              </Heading>
              <Text
                fontSize={{ base: "24px", sm: "34px" }}
                fontWeight="medium"
                mb={10}
                color="black"
                lineHeight="relaxed"
              >
                A gente procurou por todo lado, mas não encontramos o que você
                estava buscando. Talvez o link esteja incorreto ou a página
                tenha sido movida.
              </Text>

              <ChakraLink
                as="a"
                maxW="250px"
                rounded="24px"
                bg="primary.500"
                color="black"
                px={{ base: 8, md: 9, lg: 8, xl: 9 }}
                py={3}
                fontWeight="bold"
                shadow="34px"
                transition="all 0.3s"
                _hover={{ bg: "primary.700" }}
              >
                Back to Homepage
              </ChakraLink>
            </Flex>
          </Flex>
        </Flex>
      </Container>
      <Box
        position="absolute"
        bottom="0"
        left="0"
        zIndex={-1}
        display={{ base: "none", sm: "block" }}
      >
        <svg
          width="406"
          height="286"
          viewBox="0 0 406 286"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g opacity="0.5">
            <rect
              opacity="0.5"
              x="56.25"
              y="110.344"
              width="116.719"
              height="116.438"
              stroke="url(#paint0_linear_116:1140)"
            />
            <rect
              opacity="0.1"
              x="56.25"
              y="110.344"
              width="116.719"
              height="116.438"
              fill="url(#paint1_linear_116:1140)"
            />
            <path
              opacity="0.5"
              d="M172.688 110.344L229.219 51V167.601L172.688 226.781V110.344Z"
              stroke="url(#paint2_linear_116:1140)"
            />
            <path
              opacity="0.1"
              d="M172.688 110.344L229.219 51V167.601L172.688 226.781V110.344Z"
              fill="url(#paint3_linear_116:1140)"
            />
            <path
              opacity="0.5"
              d="M0 169.619L56.25 110.344V226.85L0 286.125V169.619Z"
              stroke="url(#paint4_linear_116:1140)"
            />
            <path
              opacity="0.1"
              d="M0 169.619L56.25 110.344V226.85L0 286.125V169.619Z"
              fill="url(#paint5_linear_116:1140)"
            />
            <rect
              opacity="0.5"
              x="228.938"
              y="51.2812"
              width="119.25"
              height="116.438"
              stroke="url(#paint6_linear_116:1140)"
            />
            <rect
              opacity="0.1"
              x="228.938"
              y="51.2812"
              width="119.25"
              height="116.438"
              fill="url(#paint7_linear_116:1140)"
            />
            <path
              opacity="0.5"
              d="M347.906 51.2812L405 2V110.113L347.906 167.719V51.2812Z"
              stroke="url(#paint8_linear_116:1140)"
            />
            <path
              opacity="0.1"
              d="M347.906 51.2812L405 2V110.113L347.906 167.719V51.2812Z"
              fill="url(#paint9_linear_116:1140)"
            />
          </g>
          <defs>
            <linearGradient
              id="paint0_linear_116:1140"
              x1="49.0781"
              y1="112.313"
              x2="148.922"
              y2="131.859"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#21E5B7" stopOpacity="0" />
              <stop offset="1" stopColor="#21E5B7" />
            </linearGradient>
            <linearGradient
              id="paint1_linear_116:1140"
              x1="179.141"
              y1="209.062"
              x2="32.6026"
              y2="145.47"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#21E5B7" />
              <stop offset="1" stopColor="#21E5B7" stopOpacity="0" />
            </linearGradient>
            <linearGradient
              id="paint2_linear_116:1140"
              x1="170.016"
              y1="125.25"
              x2="217.542"
              y2="125.507"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#21E5B7" stopOpacity="0" />
              <stop offset="1" stopColor="#21E5B7" />
            </linearGradient>
            <linearGradient
              id="paint3_linear_116:1140"
              x1="233.578"
              y1="113.156"
              x2="146.509"
              y2="143.95"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#21E5B7" />
              <stop offset="1" stopColor="#21E5B7" stopOpacity="0" />
            </linearGradient>
            <linearGradient
              id="paint4_linear_116:1140"
              x1="-3.45633"
              y1="113.316"
              x2="46.311"
              y2="116.426"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#21E5B7" stopOpacity="0" />
              <stop offset="1" stopColor="#21E5B7" />
            </linearGradient>
            <linearGradient
              id="paint5_linear_116:1140"
              x1="69.8907"
              y1="189.234"
              x2="84.0124"
              y2="249.947"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#21E5B7" />
              <stop offset="1" stopColor="#21E5B7" stopOpacity="0" />
            </linearGradient>
            <linearGradient
              id="paint6_linear_116:1140"
              x1="218.953"
              y1="157.453"
              x2="330.261"
              y2="148.369"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#21E5B7" stopOpacity="0" />
              <stop offset="1" stopColor="#21E5B7" />
            </linearGradient>
            <linearGradient
              id="paint7_linear_116:1140"
              x1="348.187"
              y1="46.6406"
              x2="280.112"
              y2="168.552"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#21E5B7" />
              <stop offset="1" stopColor="#21E5B7" stopOpacity="0" />
            </linearGradient>
            <linearGradient
              id="paint8_linear_116:1140"
              x1="329"
              y1="190"
              x2="369.525"
              y2="-29.8829"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#21E5B7" stopOpacity="0" />
              <stop offset="1" stopColor="#21E5B7" />
            </linearGradient>
            <linearGradient
              id="paint9_linear_116:1140"
              x1="409"
              y1="10"
              x2="331.729"
              y2="34.2741"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#21E5B7" />
              <stop offset="1" stopColor="#21E5B7" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </Box>

      <Box
        position="absolute"
        top="0"
        right="0"
        zIndex={-1}
        display={{ base: "none", sm: "block" }}
      >
        <svg
          width="406"
          height="286"
          viewBox="0 0 406 286"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g opacity="0.5">
            <rect
              opacity="0.5"
              x="57.25"
              y="108.344"
              width="116.719"
              height="116.438"
              stroke="url(#paint0_linear_116:1151)"
            />
            <rect
              opacity="0.1"
              x="57.25"
              y="108.344"
              width="116.719"
              height="116.438"
              fill="url(#paint1_linear_116:1151)"
            />
            <path
              opacity="0.5"
              d="M173.688 108.344L230.219 49V165.601L173.688 224.781V108.344Z"
              stroke="url(#paint2_linear_116:1151)"
            />
            <path
              opacity="0.1"
              d="M173.688 108.344L230.219 49V165.601L173.688 224.781V108.344Z"
              fill="url(#paint3_linear_116:1151)"
            />
            <path
              opacity="0.5"
              d="M1 167.619L57.25 108.344V224.85L1 284.125V167.619Z"
              stroke="url(#paint4_linear_116:1151)"
            />
            <path
              opacity="0.1"
              d="M1 167.619L57.25 108.344V224.85L1 284.125V167.619Z"
              fill="url(#paint5_linear_116:1151)"
            />
            <rect
              opacity="0.5"
              x="229.938"
              y="49.2812"
              width="119.25"
              height="116.438"
              stroke="url(#paint6_linear_116:1151)"
            />
            <rect
              opacity="0.1"
              x="229.938"
              y="49.2812"
              width="119.25"
              height="116.438"
              fill="url(#paint7_linear_116:1151)"
            />
            <path
              opacity="0.5"
              d="M348.906 49.2812L406 0V108.113L348.906 165.719V49.2812Z"
              stroke="url(#paint8_linear_116:1151)"
            />
            <path
              opacity="0.1"
              d="M348.906 49.2812L406 0V108.113L348.906 165.719V49.2812Z"
              fill="url(#paint9_linear_116:1151)"
            />
          </g>
          <defs>
            <linearGradient
              id="paint0_linear_116:1151"
              x1="50.0781"
              y1="110.313"
              x2="149.922"
              y2="129.859"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#FF3000" stopOpacity="0" />
              <stop offset="1" stopColor="#FF3000" />
            </linearGradient>
            <linearGradient
              id="paint1_linear_116:1151"
              x1="180.141"
              y1="207.062"
              x2="33.6026"
              y2="143.47"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#FF3000" />
              <stop offset="1" stopColor="#FF3000" stopOpacity="0" />
            </linearGradient>
            <linearGradient
              id="paint2_linear_116:1151"
              x1="171.016"
              y1="123.25"
              x2="218.542"
              y2="123.507"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#FF3000" stopOpacity="0" />
              <stop offset="1" stopColor="#FF3000" />
            </linearGradient>
            <linearGradient
              id="paint3_linear_116:1151"
              x1="234.578"
              y1="111.156"
              x2="147.509"
              y2="141.95"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#FF3000" />
              <stop offset="1" stopColor="#FF3000" stopOpacity="0" />
            </linearGradient>
            <linearGradient
              id="paint4_linear_116:1151"
              x1="85.5"
              y1="71.5"
              x2="100.174"
              y2="270.716"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#FF3000" stopOpacity="0" />
              <stop offset="1" stopColor="#FF3000" />
            </linearGradient>
            <linearGradient
              id="paint5_linear_116:1151"
              x1="70.8907"
              y1="187.234"
              x2="85.0124"
              y2="247.947"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#FF3000" />
              <stop offset="1" stopColor="#FF3000" stopOpacity="0" />
            </linearGradient>
            <linearGradient
              id="paint6_linear_116:1151"
              x1="219.953"
              y1="155.453"
              x2="331.261"
              y2="146.369"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#FF3000" stopOpacity="0" />
              <stop offset="1" stopColor="#FF3000" />
            </linearGradient>
            <linearGradient
              id="paint7_linear_116:1151"
              x1="349.187"
              y1="44.6406"
              x2="281.112"
              y2="166.552"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#FF3000" />
              <stop offset="1" stopColor="#FF3000" stopOpacity="0" />
            </linearGradient>
            <linearGradient
              id="paint8_linear_116:1151"
              x1="394.75"
              y1="64.3284"
              x2="409.531"
              y2="110.901"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#FF3000" stopOpacity="0" />
              <stop offset="1" stopColor="#FF3000" />
            </linearGradient>
            <linearGradient
              id="paint9_linear_116:1151"
              x1="410"
              y1="8.00001"
              x2="332.729"
              y2="32.2741"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#FF3000" />
              <stop offset="1" stopColor="#FF3000" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </Box>
    </Flex>
  );
};

export default NotFound;

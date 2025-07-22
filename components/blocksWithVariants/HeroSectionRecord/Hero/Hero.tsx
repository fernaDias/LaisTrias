"use client";

import { MarkdownRenderer } from "@/components/MarkdownRenderer";
import { type FragmentType, getFragmentData } from "@/graphql/types";
import { HeroSectionFragmentDoc } from "@/graphql/types/graphql";
import { Box, Button, Container, Flex, Heading, Stack } from "@chakra-ui/react";
import { motion, useScroll, useTransform } from "framer-motion";

type Props = {
  fragment: FragmentType<typeof HeroSectionFragmentDoc>;
};

const MotionBox = motion(Box);

const Hero = ({ fragment }: Props) => {
  const { heroTitle, heroSubtitle, buttons } = getFragmentData(
    HeroSectionFragmentDoc,
    fragment
  );
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "500%"]);

  return (
    <Box as="section" id="home" h={["100%", "100vh"]}>
      <Box
        pos="relative"
        zIndex={10}
        overflow="hidden"
        h={"100%"}
        pb={[4, 16]}
        pt={[4, 0]}
      >
        <Container justifyContent="center" px={[6, 8]}>
          <Flex
            flexWrap="wrap"
            mx={[0, -4]}
            h={["80vh", "100vh"]}
            justify="center"
            align="center"
          >
            <Box mx="auto" maxW={["300px", "800px"]} textAlign="center">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <Heading
                  mb={5}
                  fontSize={["3xl", "6xl"]}
                  fontWeight="bold"
                  letterSpacing="tight"
                  color="black"
                  fontFamily="heading"
                >
                  {heroTitle}
                </Heading>
                <Box
                  mb={[6, 12]}
                  fontSize={["xs", "sm"]}
                  fontWeight="medium"
                  lineHeight={1.625}
                  color="black"
                >
                  <MarkdownRenderer>{heroSubtitle || ""}</MarkdownRenderer>
                </Box>
              </motion.div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                <Flex
                  direction={{ base: "column", sm: "row" }}
                  align="center"
                  justify="center"
                  gap={6}
                >
                  {buttons.map((button) => {
                    return (
                      <Button
                        key={button.id}
                        as="a"
                        href={button.url || "#"}
                        colorScheme={button.primary ? "primary" : "gray"}
                        bg={button.primary ? "primary.500" : "gray.200"}
                        color={button.primary ? "white" : "black"}
                        px={[4, 8]}
                        py={3}
                        fontSize={["sm", "md"]}
                        _hover={{
                          opacity: button.primary ? 0.8 : 0.7,
                        }}
                        fontWeight="semibold"
                        borderRadius="34px"
                        textAlign="center"
                      >
                        {button.label}
                      </Button>
                    );
                  })}
                </Flex>
              </motion.div>
            </Box>
          </Flex>
        </Container>
        <MotionBox
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.1 }}
          style={{ y }}
          pos="absolute"
          right={0}
          top={0}
          zIndex={-1}
          opacity={0.3}
        >
          <svg
            width="450"
            height="556"
            viewBox="0 0 450 556"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="277"
              cy="63"
              r="225"
              fill="url(#paint0_linear_25:217)"
            />
            <circle
              cx="17.9997"
              cy="182"
              r="18"
              fill="url(#paint1_radial_25:217)"
            />
            <circle
              cx="76.9997"
              cy="288"
              r="34"
              fill="url(#paint2_radial_25:217)"
            />
            <circle
              cx="325.486"
              cy="302.87"
              r="180"
              transform="rotate(-37.6852 325.486 302.87)"
              fill="url(#paint3_linear_25:217)"
            />
            <circle
              opacity="0.8"
              cx="184.521"
              cy="315.521"
              r="132.862"
              transform="rotate(114.874 184.521 315.521)"
              stroke="url(#paint4_linear_25:217)"
            />
            <circle
              opacity="0.8"
              cx="356"
              cy="290"
              r="179.5"
              transform="rotate(-30 356 290)"
              stroke="url(#paint5_linear_25:217)"
            />
            <circle
              opacity="0.8"
              cx="191.659"
              cy="302.659"
              r="133.362"
              transform="rotate(133.319 191.659 302.659)"
              fill="url(#paint6_linear_25:217)"
            />
            <defs>
              <linearGradient
                id="paint0_linear_25:217"
                x1="-54.5003"
                y1="-178"
                x2="222"
                y2="288"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor={"#FF3000"} />
                <stop offset="1" stopColor={"#FF3000"} stopOpacity="0" />
              </linearGradient>
              <radialGradient
                id="paint1_radial_25:217"
                cx="0"
                cy="0"
                r="1"
                gradientUnits="userSpaceOnUse"
                gradientTransform="translate(17.9997 182) rotate(90) scale(18)"
              >
                <stop offset="0.145833" stopColor={"#FF3000"} stopOpacity="0" />
                <stop offset="1" stopColor={"#FF3000"} stopOpacity="0.08" />
              </radialGradient>
              <radialGradient
                id="paint2_radial_25:217"
                cx="0"
                cy="0"
                r="1"
                gradientUnits="userSpaceOnUse"
                gradientTransform="translate(76.9997 288) rotate(90) scale(34)"
              >
                <stop offset="0.145833" stopColor={"#FF3000"} stopOpacity="0" />
                <stop offset="1" stopColor={"#FF3000"} stopOpacity="0.08" />
              </radialGradient>
              <linearGradient
                id="paint3_linear_25:217"
                x1="226.775"
                y1="-66.1548"
                x2="292.157"
                y2="351.421"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor={"#FF3000"} />
                <stop offset="1" stopColor={"#FF3000"} stopOpacity="0" />
              </linearGradient>
              <linearGradient
                id="paint4_linear_25:217"
                x1="184.521"
                y1="182.159"
                x2="184.521"
                y2="448.882"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor={"#FF3000"} />
                <stop offset="1" stopColor="#FF3000" stopOpacity="0" />
              </linearGradient>
              <linearGradient
                id="paint5_linear_25:217"
                x1="356"
                y1="110"
                x2="356"
                y2="470"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor={"#FF3000"} />
                <stop offset="1" stopColor="#FF3000" stopOpacity="0" />
              </linearGradient>
              <linearGradient
                id="paint6_linear_25:217"
                x1="118.524"
                y1="29.2497"
                x2="166.965"
                y2="338.63"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor={"#FF3000"} />
                <stop offset="1" stopColor={"#FF3000"} stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>
        </MotionBox>
        <MotionBox
          style={{ y }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          pos="absolute"
          bottom={0}
          left={0}
          zIndex={-1}
          opacity={{ base: 0.3, lg: 1 }}
        >
          <svg
            width="364"
            height="201"
            viewBox="0 0 364 201"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5.88928 72.3303C33.6599 66.4798 101.397 64.9086 150.178 105.427C211.155 156.076 229.59 162.093 264.333 166.607C299.076 171.12 337.718 183.657 362.889 212.24"
              stroke="url(#paint0_linear_25:218)"
            />
            <path
              d="M-22.1107 72.3303C5.65989 66.4798 73.3965 64.9086 122.178 105.427C183.155 156.076 201.59 162.093 236.333 166.607C271.076 171.12 309.718 183.657 334.889 212.24"
              stroke="url(#paint1_linear_25:218)"
            />
            <path
              d="M-53.1107 72.3303C-25.3401 66.4798 42.3965 64.9086 91.1783 105.427C152.155 156.076 170.59 162.093 205.333 166.607C240.076 171.12 278.718 183.657 303.889 212.24"
              stroke="url(#paint2_linear_25:218)"
            />
            <path
              d="M-98.1618 65.0889C-68.1416 60.0601 4.73364 60.4882 56.0734 102.431C120.248 154.86 139.905 161.419 177.137 166.956C214.37 172.493 255.575 186.165 281.856 215.481"
              stroke="url(#paint3_linear_25:218)"
            />
            <circle
              opacity="0.8"
              cx="214.505"
              cy="60.5054"
              r="49.7205"
              transform="rotate(-13.421 214.505 60.5054)"
              stroke="url(#paint4_linear_25:218)"
            />
            <circle cx="220" cy="63" r="43" fill="url(#paint5_radial_25:218)" />
            <defs>
              <linearGradient
                id="paint0_linear_25:218"
                x1="184.389"
                y1="69.2405"
                x2="184.389"
                y2="212.24"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor={"#FF3000"} stopOpacity="0" />
                <stop offset="1" stopColor={"#FF3000"} />
              </linearGradient>
              <linearGradient
                id="paint1_linear_25:218"
                x1="156.389"
                y1="69.2405"
                x2="156.389"
                y2="212.24"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor={"#FF3000"} stopOpacity="0" />
                <stop offset="1" stopColor={"#FF3000"} />
              </linearGradient>
              <linearGradient
                id="paint2_linear_25:218"
                x1="125.389"
                y1="69.2405"
                x2="125.389"
                y2="212.24"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor={"#FF3000"} stopOpacity="0" />
                <stop offset="1" stopColor={"#FF3000"} />
              </linearGradient>
              <linearGradient
                id="paint3_linear_25:218"
                x1="93.8507"
                y1="67.2674"
                x2="89.9278"
                y2="210.214"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor={"#FF3000"} stopOpacity="0" />
                <stop offset="1" stopColor={"#FF3000"} />
              </linearGradient>
              <linearGradient
                id="paint4_linear_25:218"
                x1="214.505"
                y1="10.2849"
                x2="212.684"
                y2="99.5816"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor={"#FF3000"} />
                <stop offset="1" stopColor={"#FF3000"} stopOpacity="0" />
              </linearGradient>
              <radialGradient
                id="paint5_radial_25:218"
                cx="0"
                cy="0"
                r="1"
                gradientUnits="userSpaceOnUse"
                gradientTransform="translate(220 63) rotate(90) scale(43)"
              >
                <stop offset="0.145833" stopColor="#FF3000" stopOpacity="0" />
                <stop offset="1" stopColor="#FF3000" stopOpacity="0.08" />
              </radialGradient>
            </defs>
          </svg>
        </MotionBox>
      </Box>
    </Box>
  );
};

export default Hero;

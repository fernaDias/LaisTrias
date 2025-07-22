"use client";

import {
  Box,
  Heading,
  Stack,
  Text,
  Button,
  useBreakpointValue,
  Container,
} from "@chakra-ui/react";
import { type FragmentType, getFragmentData } from "@/graphql/types";
import { HeroSectionFragmentDoc } from "@/graphql/types/graphql";
import { motion } from "framer-motion";
import Link from "next/link";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { MarkdownRenderer } from "@/components/MarkdownRenderer";

const MotionBox = motion(Box);

type Props = {
  fragment: FragmentType<typeof HeroSectionFragmentDoc>;
};

const GradientHero = ({ fragment }: Props) => {
  const { heroTitle, heroSubtitle, buttons } = getFragmentData(
    HeroSectionFragmentDoc,
    fragment
  );

  const heroTitleWords = heroTitle.split(/\s+/);
  const lastWord = heroTitleWords.pop();

  return (
    <Box as="section" id="HEROGRADIENTE" position="relative" overflow="hidden">
      <Container
        maxW="container.lg"
        mx="auto"
        px={8}
        pt={40}
        pb={40}
        h={["100%", "100%"]}
      >
        <MotionBox
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          position="absolute"
          bottom={0}
          left={0}
          transform="translateX(-0%)"
          zIndex={10}
          pointerEvents="none"
          aria-hidden="true"
        >
          <svg
            width="104"
            height="100"
            viewBox="0 0 104 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11.6 9.37988H69.19V20.8999H46.15V56.6399H34.63V20.8999H11.59V9.37988H11.6Z"
              fill="#21E5B7"
            />
            <path
              d="M28.95 55.29H57.71V66.86H28.95C27.38 66.86 26.03 67.4 24.88 68.49C23.73 69.58 23.16 70.96 23.16 72.65C23.16 74.34 23.73 75.72 24.88 76.81C26.02 77.9 27.38 78.44 28.95 78.44H57.71V90.01H28.95C24.13 90.01 20.03 88.32 16.66 84.95C13.28 81.57 11.6 77.48 11.6 72.66C11.6 67.84 13.29 63.74 16.66 60.36C20.03 56.98 24.13 55.3 28.95 55.3V55.29Z"
              fill="#00ADB4"
            />
            <path
              d="M80.75 49.6999C80.75 48.0199 80.18 46.6399 79.04 45.5599C77.9 44.4799 76.55 43.9399 74.99 43.9399C73.43 43.9399 72.08 44.4799 70.94 45.5599C69.8 46.6399 69.23 48.0199 69.23 49.6999V90.0099H57.71V49.6999C57.71 45.2599 59.15 41.4199 62.03 38.1799C59.15 34.9399 57.71 31.0999 57.71 26.6599V9.37988H69.23V26.6599C69.23 28.3399 69.8 29.7199 70.94 30.7999C72.08 31.8799 73.43 32.4199 74.99 32.4199C76.55 32.4199 77.9 31.8799 79.04 30.7999C80.18 29.7199 80.75 28.3399 80.75 26.6599V9.37988H92.27V26.6599C92.27 31.0999 90.83 34.9399 87.95 38.1799C90.83 41.4199 92.27 45.2599 92.27 49.6999V90.0099H80.75V49.6999Z"
              fill="#026666"
            />
          </svg>
        </MotionBox>

        <MotionBox
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          position="absolute"
          top={0}
          right={0}
          zIndex={10}
          pointerEvents="none"
          aria-hidden="true"
        >
          <svg
            width="110"
            height="108"
            viewBox="0 0 110 108"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M33.8699 58.1L47.47 44.5L52.9399 49.97L39.34 63.57C38.6 64.31 38.2099 65.21 38.1899 66.26C38.1599 67.32 38.5499 68.24 39.3499 69.04C40.1499 69.84 41.07 70.22 42.13 70.19C43.18 70.16 44.08 69.78 44.82 69.04L58.4199 55.44L63.8899 60.91L50.29 74.51C48.01 76.79 45.27 77.93 42.08 77.93C38.89 77.93 36.1499 76.79 33.8699 74.51C31.5899 72.23 30.45 69.49 30.45 66.3C30.45 63.11 31.5899 60.37 33.8699 58.09V58.1Z"
              fill="#026666"
            />
            <path
              d="M72.29 30.8L58.69 44.4L53.22 38.93L66.82 25.33C67.56 24.59 67.95 23.69 67.97 22.64C68 21.58 67.61 20.66 66.81 19.86C66.01 19.06 65.09 18.68 64.03 18.71C62.98 18.74 62.08 19.12 61.34 19.86L47.74 33.46L42.27 27.99L55.87 14.39C58.15 12.11 60.89 10.97 64.08 10.97C67.27 10.97 70.01 12.11 72.29 14.39C74.57 16.67 75.71 19.41 75.71 22.6C75.71 25.79 74.57 28.53 72.29 30.81V30.8Z"
              fill="#026666"
            />
            <path
              d="M94.01 52.5199L80.41 66.1199L74.94 60.6499L88.54 47.0499C89.28 46.3099 89.67 45.4099 89.69 44.3599C89.72 43.2999 89.33 42.3799 88.53 41.5799C87.73 40.7799 86.81 40.3999 85.75 40.4299C84.7 40.4599 83.8 40.8399 83.06 41.5799L69.46 55.1799L63.99 49.7099L77.59 36.1099C79.87 33.8299 82.61 32.6899 85.8 32.6899C88.99 32.6899 91.73 33.8299 94.01 36.1099C96.29 38.3899 97.43 41.1299 97.43 44.3199C97.43 47.5099 96.29 50.2499 94.01 52.5299V52.5199Z"
              fill="#026666"
            />
            <path
              d="M71.19 82.5901L61.15 72.5501L55.63 78.0701L75.23 97.6701L81.11 75.7101L74.74 69.3401L71.19 82.5901Z"
              fill="#00ADB4"
            />
            <path
              d="M25.8 37.2L39.05 33.65L32.68 27.28L10.72 33.16L30.33 52.76L35.85 47.24L25.8 37.2Z"
              fill="#00ADB4"
            />
            <path
              d="M87.8 20.5901L86.24 26.4301C88.95 26.4901 91.5 27.1301 93.82 28.3101L98.84 9.56006L80.09 14.5801C81.27 16.9001 81.9 19.4501 81.97 22.1601L87.81 20.6001L87.8 20.5901Z"
              fill="#00ADB4"
            />
          </svg>
        </MotionBox>

        <MotionBox
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          mx="auto"
          maxW={["2xl", "4xl"]}
          px={[4, 8]}
          h="100%"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Box textAlign="center">
            <Heading
              as="h1"
              fontSize={["3xl", "6xl"]}
              fontWeight="extrabold"
              lineHeight="tight"
              mb={4}
              color="black"
            >
              {heroTitleWords.join(" ")}{" "}
              <Box
                as="span"
                bgGradient="linear(to-r, #026873, #00b383)"
                bgClip="text"
                color="transparent"
              >
                {lastWord}
              </Box>
            </Heading>

            <Box
              mx="auto"
              maxW="3xl"
              mb={8}
              color="black"
              lineHeight="tall"
              textAlign="center"
            >
              <MarkdownRenderer>{heroSubtitle || ""}</MarkdownRenderer>
            </Box>

            <Stack
              direction={{ base: "column", sm: "row" }}
              spacing={4}
              mx="auto"
              justify="center"
            >
              {buttons.map((button) => (
                <Button
                  as={Link}
                  key={button.id}
                  href={button.url || "#"}
                  id={button.id}
                  fontSize={["sm", "md"]}
                  fontWeight="semibold"
                  borderRadius="34px"
                  textAlign="center"
                  px={8}
                  py={4}
                  colorScheme={button.primary ? undefined : "gray"}
                  bgGradient={
                    button.primary
                      ? "linear(to-r, #026873, #00b383)"
                      : "linear(to-r,#f6f7f8,#eff7f5)"
                  }
                  color={button.primary ? "white" : "black"}
                  _hover={{
                    opacity: button.primary ? 0.8 : 0.7,
                  }}
                >
                  {button.label}
                </Button>
              ))}
            </Stack>
          </Box>
        </MotionBox>
      </Container>
    </Box>
  );
};

export default GradientHero;

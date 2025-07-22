"use client";
import {
  Box,
  Container,
  Heading,
  Text,
  SimpleGrid,
  Center,
  HStack,
  Stack,
} from "@chakra-ui/react";
import SvgRenderer from "@/components/SvgRenderer";
import { type FragmentType, getFragmentData } from "@/graphql/types";
import { StatsSectionFragmentDoc } from "@/graphql/types/graphql";
import { useAnimation, motion, type Variants } from "framer-motion";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

function formatNumber(num: number) {
  if (num >= 1000000) {
    return `${(num / 1000000).toFixed(1)}M`;
  }
  if (num >= 1000) {
    return `${(num / 1000).toFixed(1)}k`;
  }
  return num.toString();
}

type Props = {
  fragment: FragmentType<typeof StatsSectionFragmentDoc>;
};

const MotionBox = motion(Box);
const MotionHeading = motion(Heading);
const MotionText = motion(Text);
const MotionSimpleGrid = motion(SimpleGrid);

const headingVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const subtitleVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut", delay: 0.3 },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.6 + i * 0.2, // começa após título e subtitle
      duration: 0.5,
      ease: "easeOut",
    },
  }),
};

const StatsSection = ({ fragment }: Props) => {
  const { title, subtitle, statistic } = getFragmentData(
    StatsSectionFragmentDoc,
    fragment
  );

  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    if (inView) controls.start("visible");
  }, [controls, inView]);

  return (
    <Box id="StatsSection" ref={ref}>
      <Container maxW="container.xl" px={8} py={10}>
        <Stack
          flexDir={{ base: "column", lg: "row" }}
          gap={8}
          justify="space-between"
          align="center"
        >
          <Center
            flexDir="column"
            w={{ base: "100%", md: "60%" }}
            mb={{ base: 8, md: 0 }}
          >
            <MotionHeading
              as="h1"
              mb={4}
              fontSize={{ base: "3xl", lg: "6xl" }}
              fontWeight="semibold"
              color="black"
              initial="hidden"
              animate={controls}
              variants={headingVariants}
            >
              {title}
            </MotionHeading>

            <MotionText
              color="black"
              fontSize={{ base: "xs", lg: "sm" }}
              initial="hidden"
              animate={controls}
              variants={subtitleVariants}
            >
              {subtitle || ""}
            </MotionText>
          </Center>

          <MotionSimpleGrid
            columns={{ base: 1, md: 2, lg: 3 }}
            spacing={4}
            w="100%"
            maxW={{ base: "350px", lg: "100%" }}
            justifyItems="center"
            initial="hidden"
            animate={controls}
          >
            {statistic.map((stat, i) => (
              <MotionBox
                key={stat.id}
                w="full"
                borderRadius="34px"
                boxShadow="0 24px 24px -8px rgba(0, 0, 0, 0.4)"
                custom={i}
                variants={cardVariants}
              >
                <Box
                  borderWidth="3px"
                  borderColor="primary.500"
                  borderRadius="24px"
                  overflow="hidden"
                  textAlign="center"
                  bg="primary.500"
                >
                  <Box
                    bg="primary.500"
                    h="50px"
                    p={4}
                    display="flex"
                    alignItems="center"
                    gap={4}
                    pb={6}
                  >
                    <Box w="100px" h="30px" bg="#212121" borderRadius="30px" />
                    <Box w="100%" h="30px" bg="#212121" borderRadius="30px" />
                  </Box>
                  <Box p={6} borderRadius="24px" bg="white">
                    <Center
                      mb={4}
                      w="3rem"
                      h="3rem"
                      mx="auto"
                      color="primary.500"
                    >
                      <SvgRenderer boxSize={10} url={stat.icon.url} />
                    </Center>
                    <Text fontSize="2xl" fontWeight="medium" color="black">
                      {formatNumber(stat.quantity)}
                    </Text>
                    <Text color="black" fontSize="sm" mt={2}>
                      {stat.label}
                    </Text>
                  </Box>
                </Box>
              </MotionBox>
            ))}
          </MotionSimpleGrid>
        </Stack>
      </Container>
    </Box>
  );
};

export default StatsSection;

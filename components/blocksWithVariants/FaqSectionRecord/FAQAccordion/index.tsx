"use client";

import Highlighter from "@/components/Highlighter";
import { type FragmentType, getFragmentData } from "@/graphql/types";
import { FaqSectionFragmentDoc } from "@/graphql/types/graphql";
import { motion } from "framer-motion";
import { useState } from "react";
import { StructuredText as StructuredTextField } from "react-datocms/structured-text";
import { MarkdownRenderer } from "@/components/MarkdownRenderer";
import {
  Box,
  Button,
  Container,
  Heading,
  Text,
  VStack,
  Flex,
  useColorModeValue,
  chakra,
  Icon,
} from "@chakra-ui/react";
import { MinusIcon, AddIcon } from "@chakra-ui/icons";

type Props = {
  fragment: FragmentType<typeof FaqSectionFragmentDoc>;
};

const MotionBox = motion(Box);

const FAQAccordion = ({ fragment }: Props) => {
  const colorBg = useColorModeValue("gray.200", "gray.700");
  const colorText = useColorModeValue("gray.400", "gray.300");

  const closeIcon = (
    <Flex
      rounded="full"
      bg={colorBg}
      color={colorText}
      boxSize="6"
      align="center"
      justify="center"
    >
      <Icon as={MinusIcon} boxSize="4" />
    </Flex>
  );

  const openIcon = (
    <Flex
      rounded="full"
      bg="blue.500"
      color="black"
      boxSize="6"
      align="center"
      justify="center"
    >
      <Icon as={AddIcon} boxSize="4" />
    </Flex>
  );
  const { title, subtitle, questions } = getFragmentData(
    FaqSectionFragmentDoc,
    fragment
  );
  const [openQuestions, setOpenQuestions] = useState<string[]>([]);

  function toggleQuestion(id: string) {
    setOpenQuestions((prev) =>
      prev.includes(id) ? prev.filter((q) => q !== id) : [...prev, id]
    );
  }

  return (
    <Box id="FAQAccordion" bg={useColorModeValue("white", "gray.900")} py={12}>
      <Container maxW="container.xl" px={6}>
        <Heading
          as="h1"
          textAlign="center"
          mb={4}
          fontSize={{ base: "2xl", lg: "4xl" }}
          fontWeight="semibold"
          color={useColorModeValue("gray.800", "white")}
        >
          {title}
        </Heading>
        <Text
          textAlign="center"
          color={useColorModeValue("gray.500", "gray.400")}
        >
          <MarkdownRenderer>{subtitle || ""}</MarkdownRenderer>
        </Text>

        <VStack spacing={4} mt={8} mx={{ base: 8, lg: 40 }} align="stretch">
          {questions.map((question) => {
            const isOpen = openQuestions.includes(question.id);
            return (
              <MotionBox
                key={question.id}
                layout="position"
                bg={colorBg}
                p={8}
                rounded="34px"
                cursor="pointer"
                onClick={() => toggleQuestion(question.id)}
              >
                <Button
                  variant="unstyled"
                  w="full"
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Heading
                    as="h2"
                    fontSize="24px"
                    fontWeight="semibold"
                    color={colorText}
                  >
                    {question.question}
                  </Heading>
                  {isOpen ? closeIcon : openIcon}
                </Button>

                <motion.div
                  animate={isOpen ? "open" : "closed"}
                  variants={{
                    open: { opacity: 1 },
                    closed: { opacity: 0 },
                  }}
                  transition={{ duration: 0.5 }}
                  style={{ marginTop: "1.5rem" }}
                >
                  <Box
                    fontSize="sm"
                    color={colorText}
                    display={isOpen ? "block" : "none"}
                  >
                    <StructuredTextField
                      data={question.answer}
                      renderNode={Highlighter}
                    />
                  </Box>
                </motion.div>
              </MotionBox>
            );
          })}
        </VStack>
      </Container>
    </Box>
  );
};

export default FAQAccordion;

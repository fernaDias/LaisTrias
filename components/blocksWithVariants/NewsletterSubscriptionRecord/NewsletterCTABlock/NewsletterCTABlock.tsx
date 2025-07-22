import {
  Box,
  Button,
  Container,
  FormControl,
  Input,
  Text,
  Heading,
  Stack,
  VisuallyHidden,
  Flex,
  FormLabel,
} from "@chakra-ui/react";
import { type FragmentType, getFragmentData } from "@/graphql/types";
import { NewsletterSubscriptionFragmentDoc } from "@/graphql/types/graphql";
import { MarkdownRenderer } from "@/components/MarkdownRenderer";

type Params = {
  fragment: FragmentType<typeof NewsletterSubscriptionFragmentDoc>;
};

const NewsletterCTABlock = ({ fragment }: Params) => {
  const { title, subtitle, buttonLabel } = getFragmentData(
    NewsletterSubscriptionFragmentDoc,
    fragment
  );

  return (
    <Box id="NewsletterCTABlck" mt={8} bg="#2a2a2a" rounded="xl">
      <Box
        px={{ base: 8, lg: 16 }}
        py={{ base: 8, lg: 16 }}
        boxShadow="0 16px 24px -8px rgba(0, 0, 0, 0.4)"
      >
        <Container textAlign="center">
          <Heading
            as="h2"
            fontSize={{ base: "2xl", md: "3xl" }}
            fontWeight="bold"
            color="black"
          >
            {title}
          </Heading>

          {subtitle && (
            <Text mt={4} display={{ base: "none", sm: "block" }} color="black">
              <MarkdownRenderer>{subtitle}</MarkdownRenderer>
            </Text>
          )}
        </Container>

        <Container maxW="xl" mt={8}>
          <FormControl as="form" action="#" method="POST">
            <Flex
              direction={{ base: "column", sm: "row" }}
              gap={4}
              as="fieldset"
            >
              <FormControl flex={1}>
                <VisuallyHidden>
                  <FormLabel htmlFor="email">Email</FormLabel>
                </VisuallyHidden>
                <Input
                  type="email"
                  id="email"
                  placeholder="Email address"
                  bg="white"
                  borderColor="gray.200"
                  color="black"
                  shadow="sm"
                  px={4}
                  py={3}
                  focusBorderColor="black"
                  _focus={{
                    outline: "none",
                    ring: 2,
                    ringColor: "yellow.400",
                  }}
                />
              </FormControl>

              <Button
                type="submit"
                colorScheme="primary"
                bg="primary.500"
                color="black"
                px={5}
                py={3}
                mt={{ base: 4, sm: 0 }}
                w={{ base: "full", sm: "auto" }}
                display="flex"
                alignItems="center"
                gap={2}
                fontSize="sm"
                fontWeight="medium"
                _hover={{ bg: "primary.600" }}
                _focusVisible={{ ring: 2, ringColor: "yellow.400" }}
              >
                {buttonLabel}
                <Box
                  as="svg"
                  h="5"
                  w="5"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </Box>
              </Button>
            </Flex>
          </FormControl>
        </Container>
      </Box>
    </Box>
  );
};

export default NewsletterCTABlock;

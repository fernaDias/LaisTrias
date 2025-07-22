import { Box, Heading, Text } from "@chakra-ui/react";
import type { Maybe } from "graphql/jsutils/Maybe";
import { MarkdownRenderer } from "@/components/MarkdownRenderer";

const SectionTitle = ({
  title,
  paragraph,
  width = "570px",
  center,
}: {
  title: string;
  paragraph: Maybe<string>;
  width?: string;
  center?: boolean;
  mb?: string;
}) => {
  return (
    <Box
      w="100%"
      maxW={width}
      mx={center ? "auto" : undefined}
      textAlign={center ? "center" : "left"}
    >
      <Heading
        as="h2"
        mb={4}
        fontSize={["3xl", "4xl", "6xl"]}
        fontWeight="bold"
        lineHeight="tight"
        color="black"
      >
        {title}
      </Heading>

      <MarkdownRenderer>{paragraph || ""}</MarkdownRenderer>
    </Box>
  );
};

export default SectionTitle;

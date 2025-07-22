import ReactMarkdown from "react-markdown";
import type { ComponentProps } from "react";
import {
  Box,
  Code,
  Heading,
  Link,
  ListItem,
  OrderedList,
  UnorderedList,
} from "@chakra-ui/react";
import MakeHeading from "../MakeHeading";

interface MarkdownComponents {
  p: (props: ComponentProps<typeof Box>) => JSX.Element;
  h1: (props: ComponentProps<typeof MakeHeading>) => JSX.Element;
  h2: (props: ComponentProps<typeof MakeHeading>) => JSX.Element;
  h3: (props: ComponentProps<typeof MakeHeading>) => JSX.Element;
  ul: (props: ComponentProps<typeof UnorderedList>) => JSX.Element;
  ol: (props: ComponentProps<typeof OrderedList>) => JSX.Element;
  li: (props: ComponentProps<typeof ListItem>) => JSX.Element;
  code: (props: ComponentProps<typeof Code>) => JSX.Element;
  a: (props: ComponentProps<typeof Link>) => JSX.Element;
}

interface MarkdownComponentProps {
  p: ComponentProps<typeof Box>;
  h1: ComponentProps<typeof MakeHeading>;
  h2: ComponentProps<typeof MakeHeading>;
  h3: ComponentProps<typeof MakeHeading>;
  ul: ComponentProps<typeof UnorderedList>;
  ol: ComponentProps<typeof OrderedList>;
  li: ComponentProps<typeof ListItem>;
  code: ComponentProps<typeof Code>;
  a: ComponentProps<typeof Link>;
}

const markdownComponents: MarkdownComponents = {
  p: (props: MarkdownComponentProps["p"]) => (
    <Box
      as="span"
      display="block"
      color="black"
      fontFamily="body"
      fontSize={{ base: "xs", lg: "sm" }}
      mb={4}
      {...props}
    />
  ),
  h1: (props: MarkdownComponentProps["h1"]) => (
    <MakeHeading as="h1" variant="titleH1" {...props} />
  ),
  h2: (props: MarkdownComponentProps["h2"]) => (
    <MakeHeading as="h2" variant="titleH2" {...props} />
  ),
  h3: (props: MarkdownComponentProps["h3"]) => (
    <MakeHeading as="h3" variant="titleH3" {...props} />
  ),
  ul: (props: MarkdownComponentProps["ul"]) => (
    <UnorderedList mb={4} pl={4} {...props} />
  ),
  ol: (props: MarkdownComponentProps["ol"]) => (
    <OrderedList mb={4} pl={4} {...props} />
  ),
  li: (props: MarkdownComponentProps["li"]) => <ListItem {...props} />,
  code: (props: MarkdownComponentProps["code"]) => <Code {...props} />,
  a: (props: MarkdownComponentProps["a"]) => (
    <Link color="blue.500" isExternal {...props} />
  ),
};
export const MarkdownRenderer = ({ children }: { children: string }) => (
  <ReactMarkdown components={markdownComponents}>{children}</ReactMarkdown>
);

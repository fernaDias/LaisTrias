"use client";
import {
  Box,
  Container,
  Flex,
  Link as ChakraLink,
  Text,
  SimpleGrid,
} from "@chakra-ui/react";
import SvgRenderer from "@/components/SvgRenderer";
import type { CommonLayoutQuery, PageRecord } from "@/graphql/types/graphql";
import type { GlobalPageProps } from "@/utils/globalPageProps";
import { buildUrl } from "@/utils/globalPageProps";
import Image from "next/image";
import NextLink from "next/link";
import MarkdownRenderer from "react-markdown";
import { HoverGlowLink } from "../GlowLink";
import HoverGlowButton from "../GlowButton";

type Props = {
  data: CommonLayoutQuery;
  globalPageProps: GlobalPageProps;
};

const Footer = ({ data, globalPageProps }: Props) => {
  return (
    <Box as="footer" pos="relative" bg="colorBrand.200">
      <Container maxW="container.xl" px={8}>
        <SimpleGrid
          flex={{ base: "column", lg: "row" }}
          justifyContent={{ base: "center", lg: "space-between" }}
          templateColumns="repeat(4,1fr)"
          w="full"
          borderRadius="34px"
          p={8}
          gap={6}
        >
          <Box
            w="250px"
            gridColumn="1"
            display="flex"
            ml="-10px"
            flexDirection="column"
            gridColumnStart={1}
            gridColumnEnd={{ base: 5, lg: 1 }}
            justifyContent="center"
          >
            <ChakraLink as={NextLink} href={buildUrl(globalPageProps, "/home")}>
              {data.layout?.footerLogo && (
                <Image
                  src={data.layout.footerLogo.url}
                  alt="logo"
                  width={data.layout.footerLogo.width || 100}
                  height={data.layout.footerLogo.height || 100}
                />
              )}
            </ChakraLink>
          </Box>
          <Box
            display="flex"
            flexDirection="column"
            gridColumnStart={{ base: 1, lg: 3 }}
            gridColumnEnd={{ base: 5, lg: 1 }}
            justifyContent={{ base: "space-between", lg: "center" }}
          >
            <SimpleGrid
              columns={{ base: 5, lg: 5 }}
              spacingY={2}
              justifyContent={{ base: "space-between", lg: "center" }}
            >
              {data.layout?.footerLinks.map((link, idx) => {
                const pageLink = link as PageRecord;
                return (
                  <ChakraLink
                    key={pageLink.id || pageLink.slug || idx}
                    as={NextLink}
                    href={buildUrl(globalPageProps, `/${pageLink.slug}`)}
                    fontSize="base"
                    fontWeight="medium"
                    color="white"
                    textTransform="capitalize"
                    _hover={{ color: "primary" }}
                  >
                    {pageLink.slug
                      .replace(/-/g, " ")
                      .replace(/\b\w/g, (c) => c.toUpperCase())}
                  </ChakraLink>
                );
              })}
            </SimpleGrid>
          </Box>

          <Box
            gridColumn="1"
            gridColumnStart={{ base: 1, lg: 3 }}
            gridColumnEnd={{ base: 5, lg: 5 }}
            fontSize="base"
            fontWeight="bold"
            color="white"
          >
            <MarkdownRenderer>
              {data.layout?.footerSubtitle || ""}
            </MarkdownRenderer>
          </Box>

          <Flex
            flexDir={{ base: "column", lg: "row" }}
            gridColumnStart={1}
            gridColumnEnd={{ base: 5, lg: 5 }}
            w="100%"
            gap={6}
            justify={{ base: "flex-start", lg: "space-between" }}
            align={{ base: "flex-start", lg: "center" }}
          >
            <Flex gap={4}>
              {data.layout?.socialMediaLinks.map((socialMedia) => (
                <HoverGlowLink
                  key={socialMedia.id}
                  href={socialMedia.url}
                  aria-label="social-link"
                >
                  <SvgRenderer boxSize={8} url={socialMedia.icon.url} />
                </HoverGlowLink>
              ))}
            </Flex>
          </Flex>

          <Flex
            flexDir={{ base: "column", lg: "row" }}
            gridColumnStart={1}
            gridColumnEnd={{ base: 5, lg: 5 }}
            w="100%"
            borderRadius="36px"
            p={0}
            justifyContent="space-between"
          >
            <Text color="black" fontSize="sm" fontWeight="medium">
              © 2025 | Laís Trias Advocacia e Consultoria | Todos os Direitos
              Reservados
            </Text>
            <ChakraLink
              color="black"
              fontSize="sm"
              fontWeight="medium"
              href="https://github.com/fernadias"
              isExternal
              _hover={{ color: "primary" }}
            >
              Created by Fernanda
            </ChakraLink>
          </Flex>
        </SimpleGrid>
      </Container>
    </Box>
  );
};

export default Footer;

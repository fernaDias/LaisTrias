"use client";
import type { SiteLocale } from "@/graphql/types/graphql";
import { buildUrl } from "@/utils/globalPageProps";
import type { GlobalPageProps } from "@/utils/globalPageProps";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import {
  Box,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useColorModeValue,
} from "@chakra-ui/react";

type Props = {
  globalPageProps: GlobalPageProps;
  languages: SiteLocale[];
};

export const localeToLanguageName = (locale: SiteLocale): string => {
  const normalizedLocale = locale.replaceAll("_", "-");
  return (
    new Intl.DisplayNames([normalizedLocale], { type: "language" }).of(
      normalizedLocale
    ) ?? normalizedLocale
  );
};

const LanguageSelector = ({ globalPageProps, languages }: Props) => {
  const currentLocale = globalPageProps.params.locale;
  const pathname = usePathname();
  const pathnameWithoutPrefix = pathname.replace(
    new RegExp(`^\\/${currentLocale}`),
    ""
  );

  const bg = useColorModeValue("white", "gray.700");
  const hoverBg = useColorModeValue("gray.100", "gray.600");
  const color = useColorModeValue("gray.800", "whiteAlpha.900");

  return (
    <Box ml={4} w="160px">
      <Menu>
        <MenuButton
          as={Button}
          w="100%"
          textAlign="center"
          variant="outline"
          color={color}
          bg={bg}
          _hover={{ bg: hoverBg }}
          _active={{ transform: "scale(0.95)", bg: "gray.200" }}
        >
          {localeToLanguageName(currentLocale)}
        </MenuButton>
        <MenuList zIndex={10} bg={bg} borderColor="gray.100">
          {languages.map((locale) => (
            <MenuItem
              as={Link}
              key={locale}
              href={buildUrl({ params: { locale } }, pathnameWithoutPrefix)}
              _hover={{ bg: hoverBg }}
              color={color}
              textAlign="center"
              justifyContent="center"
            >
              {localeToLanguageName(locale)}
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
    </Box>
  );
};

export default LanguageSelector;

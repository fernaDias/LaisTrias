"use client";

import {
  Box,
  Flex,
  Button,
  IconButton,
  Collapse,
  Link as ChakraLink,
  useBreakpointValue,
  Container,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import LanguageSelector from "@/components/Header/LanguageSelector";
import type { CommonLayoutQuery } from "@/graphql/types/graphql";
import type { GlobalPageProps } from "@/utils/globalPageProps";
import { buildUrl } from "@/utils/globalPageProps";

type Menu = {
  id: string;
  title: string;
  path?: string;
  newTab: boolean;
  submenu?: Menu[];
};

type Props = {
  globalPageProps: GlobalPageProps;
  data: CommonLayoutQuery;
};

const Header = ({ globalPageProps, data }: Props) => {
  const menuData: Menu[] = [];

  data.layout?.menu.map((item) => {
    if (item.__typename === "MenuDropdownRecord") {
      menuData.push({
        id: "1",
        title: item.title || "Other Items",
        newTab: false,
        submenu: item.items.map((subItem) => ({
          id: subItem.id,
          title: subItem.title,
          path: `/${subItem.page.slug}`,
          newTab: true,
        })),
      });
    } else {
      menuData.push({
        id: item.id,
        title: item.title,
        path: `/${item.page.slug}`,
        newTab: false,
      });
    }
  });

  const [navbarOpen, setNavbarOpen] = useState(false);
  const [sticky, setSticky] = useState(false);
  const [openIndex, setOpenIndex] = useState(-1);

  const handleStickyNavbar = () => {
    if (window.scrollY >= 80) {
      setSticky(true);
    } else {
      setSticky(false);
    }
  };

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    window.addEventListener("scroll", handleStickyNavbar);
    return () => window.removeEventListener("scroll", handleStickyNavbar);
  }, []);

  const isMobile = useBreakpointValue({ base: true, lg: false });

  const toggleNavbar = () => setNavbarOpen(!navbarOpen);

  return (
    <Box
      id=""
      as="header"
      position={sticky ? "fixed" : "fixed"}
      top={0}
      left={0}
      w="100%"
      zIndex={50}
      bg={sticky ? "#ffffff88" : "gray.100"}
      backdropFilter={sticky ? "blur(10px)" : "none"}
      boxShadow={sticky ? "sm" : "none"}
      transition="all 0.3s ease"
      color="black"
    >
      <Container px={8} maxW="container.xl">
        <Flex justify="space-between" align="center">
          <Box>
            <ChakraLink href={buildUrl(globalPageProps)}>
              {data.layout?.logo.url && (
                <Image
                  src={data.layout.logo.url}
                  alt="logo"
                  width={250}
                  height={20}
                  priority
                />
              )}
            </ChakraLink>
          </Box>

          <Box display={{ base: "block", lg: "none" }}>
            <IconButton
              icon={
                <Box>
                  <Box
                    h="2px"
                    w="30px"
                    bg="colorBrand.200"
                    my="5px"
                    transform={
                      navbarOpen ? "rotate(45deg) translateY(10px)" : "none"
                    }
                    transition="0.3s"
                  />
                  <Box
                    h="2px"
                    w="30px"
                    my="5px"
                    opacity={navbarOpen ? 0 : 1}
                    transition="0.3s"
                    bg="colorBrand.200"
                  />
                  <Box
                    h="2px"
                    w="30px"
                    bg="colorBrand.200"
                    my="5px"
                    transform={
                      navbarOpen ? "rotate(-45deg) translateY(-10px)" : "none"
                    }
                    transition="0.3s"
                  />
                </Box>
              }
              onClick={toggleNavbar}
              bg={"transparent"}
              aria-label="Toggle Menu"
              _active={{ background: "transparent" }}
              _focus={{ background: "transparent" }}
            />
          </Box>

          <Flex align="center" display={{ base: "none", lg: "flex" }} gap={6}>
            {menuData.map((menuItem, index) => (
              <Box key={menuItem.id} position="relative">
                {menuItem.path ? (
                  <ChakraLink
                    fontWeight="medium"
                    color="colorBrand.300"
                    href={buildUrl(globalPageProps, menuItem.path)}
                  >
                    {menuItem.title}
                  </ChakraLink>
                ) : (
                  <Box>
                    <Button
                      variant="ghost"
                      onClick={() =>
                        setOpenIndex(openIndex === index ? -1 : index)
                      }
                      rightIcon={<ChevronDownIcon />}
                    >
                      {menuItem.title}
                    </Button>
                    <Collapse in={openIndex === index} animateOpacity>
                      <Box
                        bg="white"
                        shadow="24px"
                        position="absolute"
                        mt={2}
                        borderRadius="24px"
                        zIndex={10}
                      >
                        {menuItem.submenu?.map((submenuItem) => (
                          <ChakraLink
                            href={buildUrl(globalPageProps, submenuItem.path)}
                            key={submenuItem.id}
                            px={4}
                            py={2}
                            color="colorBrand.300"
                            display="block"
                            fontSize="sm"
                            bg="transparent"
                            _hover={{ bg: "transparent" }}
                          >
                            {submenuItem.title}
                          </ChakraLink>
                        ))}
                      </Box>
                    </Collapse>
                  </Box>
                )}
              </Box>
            ))}
          </Flex>
        </Flex>

        <Collapse in={navbarOpen} animateOpacity>
          <Box mt={4} display={{ lg: "none" }}>
            {menuData.map((menuItem, index) => (
              <Box key={menuItem.id} mb={2}>
                {menuItem.path ? (
                  <ChakraLink
                    display="block"
                    py={2}
                    key={menuItem.id}
                    href={buildUrl(globalPageProps, menuItem.path)}
                  >
                    {menuItem.title}
                  </ChakraLink>
                ) : (
                  <>
                    <Button
                      variant="ghost"
                      w="100%"
                      justifyContent="space-between"
                      onClick={() =>
                        setOpenIndex(openIndex === index ? -1 : index)
                      }
                      rightIcon={<ChevronDownIcon />}
                    >
                      {menuItem.title}
                    </Button>
                    <Collapse in={openIndex === index}>
                      <Box pl={4}>
                        {menuItem.submenu?.map((submenuItem) => (
                          <ChakraLink
                            display="block"
                            py={2}
                            key={submenuItem.id}
                            href={buildUrl(globalPageProps, submenuItem.path)}
                          >
                            {submenuItem.title}
                          </ChakraLink>
                        ))}
                      </Box>
                    </Collapse>
                  </>
                )}
              </Box>
            ))}
          </Box>
        </Collapse>
      </Container>
    </Box>
  );
};

export default Header;

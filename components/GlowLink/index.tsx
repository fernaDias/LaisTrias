"use client";
import { Link as ChakraLink, Box } from "@chakra-ui/react";
import NextLink from "next/link";
import { useRef, useState } from "react";

type Props = {
  href: string;
  children: React.ReactNode;
};

export function HoverGlowLink({ href, children }: Props) {
  const linkRef = useRef<HTMLAnchorElement>(null);
  const [coords, setCoords] = useState({ x: -9999, y: -9999 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = linkRef.current?.getBoundingClientRect();
    if (rect) {
      setCoords({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  };

  const handleMouseLeave = () => {
    setCoords({ x: -9999, y: -9999 });
  };

  return (
    <ChakraLink
      as={NextLink}
      href={href}
      ref={linkRef}
      pos="relative"
      cursor="pointer"
      border="2px solid #ffff"
      borderRadius="50px"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      color="black"
      fontWeight="medium"
      textTransform="capitalize"
      _hover={{ textDecoration: "none" }}
      sx={{
        "--x": `${coords.x}px`,
        "--y": `${coords.y}px`,
        "--s": "1",
        "--g": "#90a2ae66",
      }}
    >
      <Box
        as="span"
        pos="absolute"
        top="0"
        left="0"
        w="2rem"
        h="2rem"
        bg="var(--g)"
        borderRadius="50%"
        filter="blur(10px)"
        opacity="var(--s)"
        transform="translate3d(calc(var(--x) - 50%), calc(var(--y) - 50%), 0)"
        pointerEvents="none"
        transition="opacity 0.3s"
        willChange="transform"
      />
      {children}
    </ChakraLink>
  );
}

"use client";

import { Button, Box } from "@chakra-ui/react";
import { useRef, useState } from "react";

type HoverGlowButtonProps = {
  children: React.ReactNode;
  href: string;
  primary?: boolean;
};

const HoverGlowButton = ({
  children,
  href,
  primary = false,
}: HoverGlowButtonProps) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [coords, setCoords] = useState({ x: -9999, y: -9999 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = buttonRef.current?.getBoundingClientRect();
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
    <Button
      as="a"
      href={href}
      ref={buttonRef}
      pos="relative"
      overflow="hidden"
      borderRadius="50px"
      border={primary ? "none" : "2px solid #777777"}
      color={primary ? "white" : "#212121"}
      bg={primary ? "primary.500" : "white"}
      _hover={{
        bg: primary ? "primary.700" : "white",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      boxShadow="0 10px 24px -5px rgba(0, 0, 0, 0.4)"
      sx={{
        "--x": `${coords.x}px`,
        "--y": `${coords.y}px`,
        "--s": "1",
        "--g": primary ? "rgba(255,255,255,0.6)" : "#2a2a2a",
      }}
    >
      <Box
        as="span"
        pos="absolute"
        top="0"
        left="0"
        w="4rem"
        h="4rem"
        bg="var(--g)"
        borderRadius="50%"
        filter="blur(30px)"
        opacity="var(--s)"
        transform="translate3d(calc(var(--x) - 50%), calc(var(--y) - 50%), 0)"
        pointerEvents="none"
        transition="opacity 0.3s"
        willChange="transform"
      />
      {children}
    </Button>
  );
};

export default HoverGlowButton;

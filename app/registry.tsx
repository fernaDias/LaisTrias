"use client";

import { Box, ColorModeScript } from "@chakra-ui/react";
import { useServerInsertedHTML } from "next/navigation";
import React, { type ReactNode, useState } from "react";
import { StyleRegistry, createStyleRegistry } from "styled-jsx";
import { ChakraProviderWrapper } from "./ChakraProviderWrapper";
import { theme } from "@/settings/theme";

type Props = {
  r: number;
  g: number;
  b: number;
  children: ReactNode;
};

export default function StyledJsxRegistry({ r, g, b, children }: Props) {
  // Only create stylesheet once with lazy initial state
  // x-ref: https://reactjs.org/docs/hooks-reference.html#lazy-initial-state
  const [jsxStyleRegistry] = useState(() => createStyleRegistry());

  useServerInsertedHTML(() => {
    const styles = jsxStyleRegistry.styles();
    jsxStyleRegistry.flush();
    return <Box>{styles}</Box>;
  });

  return (
    <StyleRegistry registry={jsxStyleRegistry}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <ChakraProviderWrapper r={r} g={g} b={b}>
        {children}
      </ChakraProviderWrapper>
    </StyleRegistry>
  );
}

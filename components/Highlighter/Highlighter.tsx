import { chakra } from "@chakra-ui/react";
import React from "react";

export default function Highlighter(
  rawTagName: string,
  props: unknown,
  ...children: React.ReactNode[]
) {
  if (rawTagName === "mark") {
    return (
      <chakra.mark display="inline" borderRadius="sm" bg="yellow" px="1" py="1">
        {children}
      </chakra.mark>
    );
  }

  return React.createElement(rawTagName, props as any, ...children);
}

"use client";

import type { URL } from "node:url";
import React, { useEffect, useState } from "react";
import { Box } from "@chakra-ui/react";

type Props = {
  url: string | URL;
  boxSize?: string | number;
};

const SvgRenderer = ({ url, boxSize }: Props) => {
  const [svgContent, setSvgContent] = useState("");

  useEffect(() => {
    const fetchSvg = async () => {
      try {
        const response = await fetch(url);
        const svgText = await response.text();
        setSvgContent(svgText);
      } catch (error) {
        console.error("Error fetching SVG:", error);
      }
    };

    fetchSvg();
  }, [url]);

  return (
    <Box>
      {svgContent && (
        <Box
          aria-hidden="true"
          display="flex"
          justifyContent="center"
          alignContent="center"
          alignItems={"center"}
          h="100%"
          w="100%"
          color="black"
          bg="white"
          rounded="100%"
          p={2}
          boxSize={boxSize}
          ref={(node) => {
            if (node && svgContent) {
              while (node.firstChild) node.removeChild(node.firstChild);
              const parser = new DOMParser();
              const doc = parser.parseFromString(svgContent, "image/svg+xml");
              const svg = doc.querySelector("svg");
              if (svg) node.appendChild(svg);
            }
          }}
        />
      )}
    </Box>
  );
};

export default SvgRenderer;

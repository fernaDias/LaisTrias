import { Box, HStack, Image } from "@chakra-ui/react";

const svgList = [""];

export default function SvgGalery() {
  return (
    <Box p={6}>
      <HStack spacing={4} wrap="wrap">
        {svgList.map((src, i) => (
          <Image key={i} src={src} alt={`SVG ${i + 1}`} boxSize="100px" />
        ))}
      </HStack>
    </Box>
  );
}

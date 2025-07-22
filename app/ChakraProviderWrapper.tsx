"use client";

import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import type { ReactNode } from "react";
import { useMemo } from "react";
import { Manrope, Open_Sans, Tenor_Sans } from "next/font/google";

const openSans = Open_Sans({ subsets: ["latin"] });
const tenorSans = Tenor_Sans({ subsets: ["latin"], weight: "400" });
const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  weight: ["400", "500", "600", "700"], // choose what you need
  display: "swap",
});

type Props = {
  r: number;
  g: number;
  b: number;
  children: ReactNode;
};

export function ChakraProviderWrapper({ r, g, b, children }: Props) {
  const rgb = `${r}, ${g}, ${b}`;
  const theme = useMemo(() => {
    return extendTheme({
      colors: {
        primary: {
          500: `rgb(${rgb})`,
          600: `rgba(${rgb}, 0.9)`,
          700: `rgba(${rgb}, 0.7)`,
        },
        colorBrand: {
          100: "#b2838b",
          200: "#90a2ae",
          300: "#3f4d63",
          400: "#637774",
        },
      },
      fonts: {
        heading: manrope.style.fontFamily,
        body: openSans.style.fontFamily,
      },
    });
  }, [rgb]);
  return <ChakraProvider theme={theme}>{children}</ChakraProvider>;
}

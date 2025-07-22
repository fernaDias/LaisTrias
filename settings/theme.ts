import { extendTheme } from "@chakra-ui/react";

export const theme = extendTheme({

  fonts: {
    heading: "'Neutral Sans', sans-serif",
    body: "'Funnel Display', sans-serif",
  },

  fontSizes: {
    9: "38px",
    8: "34px",
    7: "28px",
    6: "24px",
    5: "20px",
    4: "18px",
    3: "16px",
    2: "14px",
    1: "12px",
  },

  styles: {
    global: {
      html: {
        scrollBehavior: "smooth",
      },
      body: {
        WebkitFontSmoothing: "antialiased",
        MozOsxFontSmoothing: "grayscale",
        textRendering: "optimizeLegibility",
      },
    },
  },

  shadows: {
    "shadow-01": "0px 4px 24px rgba(0, 0, 0, 0.1)",
    "shadow-02": "0px 4px 24px rgba(0, 0, 0, 0.2)",
    "shadow-03": "0px 4px 24px rgba(0, 0, 0, 0.3)",
    "shadow-04": "0px 4px 24px rgba(0, 0, 0, 0.4)",
    "shadow-05": "0px 4px 24px rgba(0, 0, 0, 0.5)",
    "shadow-06": "0px 4px 24px rgba(0, 0, 0, 0.6)",
    "shadow-07": "0px 4px 24px rgba(0, 0, 0, 0.7)",
    "shadow-08": "0px 4px 24px rgba(0, 0, 0, 0.8)",
    "shadow-09": "0px 4px 24px rgba(0, 0, 0, 1)",
  }
});

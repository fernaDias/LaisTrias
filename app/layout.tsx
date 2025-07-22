import type { Metadata } from "next";
import { Open_Sans, Tenor_Sans } from "next/font/google";

import type { GlobalPageProps } from "@/utils/globalPageProps";
import "node_modules/react-modal-video/css/modal-video.css";
import StyledJsxRegistry from "./registry";
import { type SiteLocale, LayoutDocument } from "@/graphql/types/graphql";
import getAvailableLocales from "./i18n/settings";
import queryDatoCMS from "@/utils/queryDatoCMS";

export const metadata: Metadata = {
  title: "Landing page DatoCMS Starter",
  description: "",
};

type Params = GlobalPageProps & {
  children: React.ReactNode;
  params: {
    lng: SiteLocale;
  };
};

export async function generateStaticParams() {
  const languages = await getAvailableLocales();
  return languages.map((language) => {
    language;
  });
}

export default async function RootLayout({
  children,
  params: { lng },
}: Params) {
  const lang = lng ? lng : "pt-br";
  const data = await queryDatoCMS(LayoutDocument);

  return (
    <html lang={lang}>
      <body suppressHydrationWarning={true}>
        <StyledJsxRegistry
          r={data.layout?.mainColor.red ?? 74}
          g={data.layout?.mainColor.green ?? 247}
          b={data.layout?.mainColor.blue ?? 108}
        >
          {children}
        </StyledJsxRegistry>
      </body>
    </html>
  );
}

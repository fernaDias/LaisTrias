import getAvailableLocales from "@/app/i18n/settings";
import { LayoutDocument } from "@/graphql/types/graphql";
import type { GlobalPageProps } from "@/utils/globalPageProps";
import queryDatoCMS from "@/utils/queryDatoCMS";
import { Box } from "@chakra-ui/react";
import { draftMode } from "next/headers";
import { notFound } from "next/navigation";
import "node_modules/react-modal-video/css/modal-video.css";
import { toNextMetadata } from "react-datocms/seo";

type Params = GlobalPageProps & {
  children: React.ReactNode;
};

export async function generateMetadata() {
  const { isEnabled: isDraft } = draftMode();
  const data = await queryDatoCMS(LayoutDocument, {}, isDraft);
  return toNextMetadata(data._site.faviconMetaTags);
}

export default async function RootLayout({ children, params }: Params) {
  const allLocales: string[] = await getAvailableLocales();

  if (!allLocales.includes(params.locale)) {
    notFound();
  }

  return <Box>{children}</Box>;
}

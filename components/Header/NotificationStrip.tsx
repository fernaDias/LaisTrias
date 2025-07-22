import Highlighter from "@/components/Highlighter";
import type { CommonLayoutQuery, SiteLocale } from "@/graphql/types/graphql";
import { buildUrl } from "@/utils/globalPageProps";
import type { GlobalPageProps } from "@/utils/globalPageProps";
import { isLink } from "datocms-structured-text-utils";
import Link from "next/link";
import type { SetStateAction } from "react";
import {
  StructuredText as StructuredTextField,
  renderNodeRule,
} from "react-datocms/structured-text";
import { Box, Icon, Text } from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";

type Props = {
  notification: NonNullable<CommonLayoutQuery["layout"]>["notification"];
  globalPageProps: GlobalPageProps;
  setNotificationStrip: React.Dispatch<SetStateAction<boolean>>;
};

const NotificationStrip = ({
  notification,
  globalPageProps,
  setNotificationStrip,
}: Props) => {
  return (
    <Box bg="white" px={4} py={3} color="black" position="relative">
      {/* <Text textAlign="center" fontSize="sm" fontWeight="medium" color="black">
        <StructuredTextField
          data={notification}
          renderNode={Highlighter}
          customNodeRules={[
            renderNodeRule(isLink, ({ node, children, key }) => (
              <Link
                href={buildUrl(globalPageProps, `${node.url}`) || "#"}
                key={key}
              >
                <Text
                  as="span"
                  textDecoration="underline"
                  color="black"
                  display="inline"
                >
                  {children}
                </Text>
              </Link>
            )),
          ]}
        />
      </Text>
      <Icon
        as={CloseIcon}
        position="absolute"
        top={3}
        right={4}
        w={4}
        h={4}
        color="black"
        cursor="pointer"
        onClick={() => setNotificationStrip(false)}
      /> */}
    </Box>
  );
};

export default NotificationStrip;

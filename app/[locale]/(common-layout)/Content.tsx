import Footer from "@/components/Footer";
import Header from "@/components/Header";
import type { ContentPage } from "@/components/WithRealTimeUpdates/types";
import type { PageProps, Query } from "./meta";
import { Box } from "@chakra-ui/react";

const Content: ContentPage<PageProps, Query> = ({
  data,
  children,
  ...globalPageProps
}) => {
  return (
    <Box mt={16}>
      <Header globalPageProps={globalPageProps} data={data} />
      {children}
      <Footer globalPageProps={globalPageProps} data={data} />
    </Box>
  );
};

export default Content;

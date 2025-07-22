import { type GlobalPageProps, buildUrl } from "@/utils/globalPageProps";
import Link from "next/link";
import { Button } from "@chakra-ui/react";

type Props = {
  tag: string;
  globalPageProps: GlobalPageProps;
  slug: string;
};

const TagButton = ({ tag, globalPageProps, slug }: Props) => {
  return (
    <Button
      as={Link}
      href={buildUrl(globalPageProps, `/posts/tag/${slug}`)}
      mb={3}
      mr={3}
      bg="primary"
      px={4}
      py={2}
      color="primary.500"
      borderRadius="24px"
      transition="all 0.3s"
      _hover={{
        bgOpacity: "100%",
        color: "primary.700",
      }}
    >
      {tag}
    </Button>
  );
};

export default TagButton;

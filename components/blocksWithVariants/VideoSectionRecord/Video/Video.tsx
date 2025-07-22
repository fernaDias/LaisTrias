"use client";

import { Box, Button, Center, Flex } from "@chakra-ui/react";
import { useState } from "react";
import Image from "next/image";
import ModalVideo from "react-modal-video";

import SectionTitle from "@/components/SectionTitle";
import DatoImage from "@/components/DatoImage";
import { type FragmentType, getFragmentData } from "@/graphql/types";
import { VideoSectionFragmentDoc } from "@/graphql/types/graphql";

type Props = {
  fragment: FragmentType<typeof VideoSectionFragmentDoc>;
};

const Video = ({ fragment }: Props) => {
  const { videoHeader, videoSubheader, videoThumbnail, video } =
    getFragmentData(VideoSectionFragmentDoc, fragment);

  const [isOpen, setOpen] = useState(false);

  return (
    <Box
      as="section"
      pos="relative"
      zIndex="10"
      py={{ base: 16, md: 20, lg: 28 }}
    >
      <Box maxW="container.xl" mx="auto" px={4}>
        <SectionTitle
          title={videoHeader}
          paragraph={videoSubheader}
          center
          mb="80px"
        />

        <Flex justify="center">
          <Box maxW="1024px" w="full" overflow="hidden" rounded="24px">
            <Box
              pos="relative"
              w="full"
              pt="calc(100% * 40 / 77)" // Keeps aspect ratio 77:40
            >
              <DatoImage
                className="object-cover"
                layout="fill"
                objectFit="cover"
                objectPosition="top"
                fragment={videoThumbnail.responsiveImage}
              />
              <Center pos="absolute" top={0} left={0} w="full" h="full">
                <Button
                  onClick={() => setOpen(true)}
                  borderRadius="full"
                  h="70px"
                  w="70px"
                  bg="whiteAlpha.800"
                  color="primary.500"
                  _hover={{ bg: "whiteAlpha.900" }}
                  p={0}
                  minW="unset"
                >
                  <Box
                    as="svg"
                    width="16px"
                    height="18px"
                    viewBox="0 0 16 18"
                    fill="currentColor"
                  >
                    <path d="M15.5 8.13397C16.1667 8.51888 16.1667 9.48112 15.5 9.86602L2 17.6603C1.33333 18.0452 0.499999 17.564 0.499999 16.7942L0.5 1.20577C0.5 0.43597 1.33333 -0.0451549 2 0.339745L15.5 8.13397Z" />
                  </Box>
                </Button>
              </Center>
            </Box>
          </Box>
        </Flex>
      </Box>

      <ModalVideo
        isOpen={isOpen}
        videoId={video.providerUid}
        onClose={() => setOpen(false)}
      />

      <Box pos="absolute" bottom={0} left={0} right={0} zIndex={-1}>
        {/* <Image
          fill
          src="/images/video/shape.svg"
          alt="shape"
          className="w-full object-cover"
        /> */}
      </Box>
    </Box>
  );
};

export default Video;

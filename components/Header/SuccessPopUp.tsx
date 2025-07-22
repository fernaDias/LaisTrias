import type { Dispatch, SetStateAction } from "react";
import {
  Box,
  Flex,
  Icon,
  Text,
  Button,
  VisuallyHidden,
} from "@chakra-ui/react";
import { CheckCircleIcon, CloseIcon } from "@chakra-ui/icons";

type Props = {
  setSuccessToast: Dispatch<SetStateAction<boolean>>;
};

const SuccessPopUp = ({ setSuccessToast }: Props) => {
  return (
    <Box
      role="alert"
      borderRadius="xl"
      border="1px solid"
      borderColor="gray.100"
      bg="white"
      p={6}
      shadow="xl"
    >
      <Flex align="center" justify="center" gap={4} textAlign="center">
        <Icon as={CheckCircleIcon} boxSize={12} color="green.500" />

        <Box flex="1">
          <Text
            as="strong"
            display="block"
            fontWeight="medium"
            color="gray.900"
          >
            Draft Mode activated!
          </Text>
          <Text mt={1} fontSize="sm" color="gray.700">
            You&#39;re now pulling content from the DatoCMS Draft endpoint, with
            real-time updates! As soon as you make a change on DatoCMS, the new
            content will instantly show up on the pages!
          </Text>
        </Box>

        <Button
          variant="ghost"
          color="gray.500"
          _hover={{ color: "gray.600" }}
          onClick={() => setSuccessToast(false)}
          p={0}
          minW="auto"
          height="auto"
        >
          <VisuallyHidden>Dismiss popup</VisuallyHidden>
          <Icon as={CloseIcon} boxSize={6} />
        </Button>
      </Flex>
    </Box>
  );
};

export default SuccessPopUp;

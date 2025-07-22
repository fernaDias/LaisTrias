"use client";

import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Box,
  Flex,
  Text,
  Code,
  Icon,
  useColorModeValue,
} from "@chakra-ui/react";
import {
  type Dispatch,
  type FormEvent,
  type SetStateAction,
  useState,
} from "react";
import { LockIcon } from "@chakra-ui/icons";

type Props = {
  setModalOpen: Dispatch<SetStateAction<boolean>>;
  refresh: () => void;
  triggerSuccessToast: () => void;
};

const AuthenticationModal = ({
  setModalOpen,
  refresh,
  triggerSuccessToast,
}: Props) => {
  const [inputValue, setInputValue] = useState("superSecretToken");
  const [hasError, setHasError] = useState(false);

  async function enableDraft(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      const response = await fetch(`/api/draft/enable?token=${inputValue}`);
      if (response.status === 200) {
        refresh();
        setModalOpen(false);
        triggerSuccessToast();
        return;
      }
      throw new Error("Wrong token!");
    } catch (error) {
      setInputValue("");
      setHasError(true);
    }
  }

  const borderColor = useColorModeValue("blue.100", "blue.300");
  const bgColor = useColorModeValue("white", "gray.700");

  return (
    <Box
      as="form"
      onSubmit={enableDraft}
      role="alert"
      rounded="2xl"
      border="1px"
      borderColor={borderColor}
      bg={bgColor}
      p={{ base: 4, sm: 6, lg: 8 }}
      shadow="34px"
    >
      <Flex align="center" gap={2}>
        <Box
          bg="primary"
          color="black"
          rounded="full"
          p={2}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Icon as={LockIcon} boxSize={4} />
        </Box>
        <Text fontWeight="medium" fontSize={{ base: "24px", sm: "34px" }}>
          Authenticate First!
        </Text>
      </Flex>

      <Text mt={4} color="gray.500">
        Please insert the password to access the content drafts (default:{" "}
        <Code>superSecretToken</Code>):
      </Text>

      <FormControl mt={4} isInvalid={hasError}>
        <Input
          id="UserToken"
          type="text"
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
            setHasError(false);
          }}
          borderColor={hasError ? "red.300" : "gray.100"}
          _focusVisible={{ borderColor: hasError ? "red.300" : "blue.300" }}
          shadow="sm"
          rounded="24px"
          fontSize="sm"
        />
        {hasError && (
          <Text mt={2} color="red.400" fontSize="sm">
            Incorrect token!
          </Text>
        )}
      </FormControl>

      <Flex mt={6} gap={4} direction={{ base: "column", sm: "row" }}>
        <Button
          type="submit"
          bg="primary"
          color="black"
          _hover={{ opacity: 0.9 }}
          w={{ base: "full", sm: "auto" }}
        >
          Authenticate
        </Button>

        <Button
          onClick={() => setModalOpen(false)}
          variant="outline"
          colorScheme="gray"
          w={{ base: "full", sm: "auto" }}
        >
          Cancel
        </Button>
      </Flex>
    </Box>
  );
};

export default AuthenticationModal;

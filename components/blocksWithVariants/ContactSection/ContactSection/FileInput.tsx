import { AttachmentIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Input,
  Text,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import { useRef, useState } from "react";

export default function FileInput() {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
    }
  };

  return (
    <VStack align="start" spacing={2} justify="flex-start" w="full">
      <Input
        type="file"
        accept="image/*,.pdf"
        onChange={handleFileChange}
        ref={inputRef}
        display="none"
      />

      <Button
        onClick={() => inputRef.current?.click()}
        leftIcon={<AttachmentIcon />}
        bg="white"
        color="black"
      >
        Anexar
      </Button>

      {fileName && (
        <Box>
          <Text fontSize="xs" color="white">
            Arquivo selecionado: <strong>{fileName}</strong>
          </Text>
        </Box>
      )}
    </VStack>
  );
}

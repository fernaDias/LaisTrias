import { AttachmentIcon } from "@chakra-ui/icons";
import { Box, Button, Input, Text, VStack } from "@chakra-ui/react";
import { forwardRef, useImperativeHandle, useRef, useState } from "react";

export type FileInputRef = {
  clear: () => void;
};

type FileInputProps = {
  onFilesSelect: (files: File[]) => void;
};

const FileInput = forwardRef<FileInputRef, FileInputProps>(
  ({ onFilesSelect }, ref) => {
    const inputRef = useRef<HTMLInputElement | null>(null);
    const [fileNames, setFileNames] = useState<string[]>([]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const selectedFiles = Array.from(e.target.files ?? []);
      if (selectedFiles.length > 0) {
        setFileNames(selectedFiles.map((f) => f.name));
        onFilesSelect(selectedFiles);
      }
    };

    useImperativeHandle(ref, () => ({
      clear: () => {
        if (inputRef.current) {
          inputRef.current.value = "";
          setFileNames([]);
        }
      },
    }));

    return (
      <VStack align="start" spacing={2} justify="flex-start" w="full">
        <Input
          type="file"
          accept="image/*,.pdf"
          multiple
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
          Anexar Arquivos
        </Button>

        {fileNames.map((name) => (
          <Text key={name} fontSize="xs" color="white">
            {name}
          </Text>
        ))}
      </VStack>
    );
  }
);

FileInput.displayName = "FileInput";

export default FileInput;

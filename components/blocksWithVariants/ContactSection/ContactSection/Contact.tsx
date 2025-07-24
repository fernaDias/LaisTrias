"use client";

import { VStack, Input, Textarea, Button, Stack } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useRef, useState } from "react";
import FileInput, { type FileInputRef } from "./FileInput";

type FormValues = {
  name: string;
  email: string;
  message: string;
};

export default function ContactForm() {
  const { register, handleSubmit, reset } = useForm<FormValues>();
  const [files, setFiles] = useState<File[]>([]);
  const fileInputRef = useRef<FileInputRef>(null);

  const onSubmit = async (data: FormValues) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("message", data.message);
    for (const file of files) {
      formData.append("files", file);
    }

    try {
      const res = await fetch("/api/sendEmail", {
        method: "POST",
        body: formData,
      });

      const result = await res.json();

      if (result.success) {
        alert("Email enviado com sucesso");
        reset();
        setFiles([]);
        fileInputRef.current?.clear();
      } else {
        alert(`Erro ao enviar: ${result.error}`);
      }
    } catch (err) {
      alert("Erro na conexão com servidor");
    }
  };

  return (
    <VStack
      w="100%"
      as="form"
      onSubmit={handleSubmit(onSubmit)}
      spacing={4}
      p={8}
      bg="primary.500"
      borderRadius="34px"
    >
      <Input
        placeholder="Nome"
        bg="white"
        {...register("name", { required: true })}
      />
      <Input
        placeholder="Email"
        bg="white"
        type="email"
        {...register("email", { required: true })}
      />
      <Textarea
        placeholder="Mensagem"
        bg="white"
        {...register("message", { required: true })}
      />
      <FileInput
        ref={fileInputRef}
        onFilesSelect={(files) => setFiles(files)}
      />

      <Stack direction="row" spacing={4} w="full" justifyContent="flex-end">
        <Button
          type="submit"
          color="white"
          _hover={{ bg: "colorBrand.300" }}
          variant="solid"
          bg="colorBrand.200"
        >
          Enviar Mensagem
        </Button>
      </Stack>
    </VStack>
  );
}

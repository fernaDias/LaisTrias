"use client";

import { VStack, Input, Textarea, Button, Stack } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useState } from "react";
import FileInput from "./FileInput";

type FormValues = {
  name: string;
  email: string;
  message: string;
};

export default function ContactForm() {
  const { register, handleSubmit, reset } = useForm<FormValues>();
  const [file, setFile] = useState<File | null>(null);

  const onSubmit = async (data: FormValues) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("message", data.message);
    if (file) {
      formData.append("file", file);
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
        setFile(null);
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
      <Input placeholder="Nome" bg="white" {...register("name")} />
      <Input
        placeholder="Email"
        bg="white"
        type="email"
        {...register("email")}
      />
      <Textarea placeholder="Mensagem" bg="white" {...register("message")} />
      <FileInput />
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

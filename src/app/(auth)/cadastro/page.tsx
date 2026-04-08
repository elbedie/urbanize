"use client";

import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import { AuthForm } from "@/components/forms/AuthForm";

export default function RegisterPage() {
  return (
    <Flex minH="100vh" align="center" justify="center" px={6} py={12} bg="gray.50">
      <Box maxW="lg" w="full">
        <Heading mb={2}>Criar conta</Heading>
        <Text mb={6} color="gray.600">
          Cadastre-se como cidadão ou gestor público.
        </Text>
        <AuthForm mode="register" />
      </Box>
    </Flex>
  );
}

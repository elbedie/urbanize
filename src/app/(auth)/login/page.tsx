"use client";

import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import { AuthForm } from "@/components/forms/AuthForm";

export default function LoginPage() {
  return (
    <Flex minH="100vh" align="center" justify="center" px={6} py={12} bg="gray.50">
      <Box maxW="lg" w="full">
        <Heading mb={2}>Entrar</Heading>
        <Text mb={6} color="gray.600">
          Acesse para registrar e acompanhar demandas urbanas.
        </Text>
        <AuthForm mode="login" />
      </Box>
    </Flex>
  );
}

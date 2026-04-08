"use client";

import { Box, Button, Flex, Heading, Stack, Text } from "@chakra-ui/react";
import Link from "next/link";

export default function Home() {
  return (
    <Flex minH="100vh" align="center" justify="center" px={6} py={12}>
      <Box maxW="3xl" bg="white" p={10} rounded="2xl" shadow="md" border="1px" borderColor="gray.100">
        <Stack spacing={6}>
          <Box>
            <Text fontWeight="semibold" color="brand.500" mb={2}>
              Urbanize — Smart City
            </Text>
            <Heading size="xl">Centralize e acompanhe demandas urbanas</Heading>
            <Text mt={3} color="gray.600">
              Registro estruturado de solicitações, painel para gestores e transparência para cidadãos.
            </Text>
          </Box>
          <Flex gap={3} wrap="wrap">
            <Button as={Link} href="/dashboard" colorScheme="brand">Ir para Dashboard</Button>
            <Button as={Link} href="/demandas" variant="outline" colorScheme="brand">Ver demandas</Button>
            <Button as={Link} href="/demandas/nova" variant="ghost">Registrar demanda</Button>
          </Flex>
          <Stack spacing={2} color="gray.600">
            <Text>• Cidadão registra e acompanha solicitações</Text>
            <Text>• Gestor filtra, prioriza e atualiza status</Text>
            <Text>• Indicadores rápidos: volume, categorias, SLA</Text>
          </Stack>
        </Stack>
      </Box>
    </Flex>
  );
}

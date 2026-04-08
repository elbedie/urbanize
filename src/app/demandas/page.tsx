"use client";

import { AppLayout } from "@/components/layout/AppLayout";
import { DemandCard } from "@/components/demandas/DemandCard";
import { useDemandStore } from "@/store/demandStore";
import { Box, Button, Flex, Grid, Heading, Input, Select, Spinner, Stack, Text } from "@chakra-ui/react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function DemandListPage() {
  const { demands, list, loading } = useDemandStore();
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<string>("");
  const [category, setCategory] = useState<string>("");

  useEffect(() => {
    list({ search, status: status as any, category: category as any });
  }, [search, status, category, list]);

  return (
    <AppLayout>
      <Flex justify="space-between" align={{ base: "flex-start", md: "center" }} mb={4} direction={{ base: "column", md: "row" }} gap={3}>
        <Heading>Demandas</Heading>
        <Button as={Link} href="/demandas/nova" colorScheme="brand">
          Nova demanda
        </Button>
      </Flex>

      <Stack direction={{ base: "column", md: "row" }} spacing={3} mb={4}>
        <Input placeholder="Buscar por título" value={search} onChange={(e) => setSearch(e.target.value)} />
        <Select placeholder="Status" value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="aberta">Aberta</option>
          <option value="em_andamento">Em andamento</option>
          <option value="concluida">Concluída</option>
          <option value="cancelada">Cancelada</option>
        </Select>
        <Select placeholder="Categoria" value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="iluminacao">Iluminação</option>
          <option value="vias">Vias</option>
          <option value="coleta">Coleta</option>
          <option value="saneamento">Saneamento</option>
          <option value="fiscalizacao">Fiscalização</option>
        </Select>
      </Stack>

      {loading ? (
        <Flex justify="center" py={10}>
          <Spinner />
        </Flex>
      ) : demands.length === 0 ? (
        <Box bg="white" p={6} rounded="lg" border="1px solid" borderColor="gray.100" textAlign="center">
          <Text color="gray.600">Nenhuma demanda encontrada. Que tal criar a primeira?</Text>
        </Box>
      ) : (
        <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={4}>
          {demands.map((demand) => (
            <DemandCard key={demand.id} demand={demand} />
          ))}
        </Grid>
      )}
    </AppLayout>
  );
}

"use client";

import { AppLayout } from "@/components/layout/AppLayout";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { useDemandStore } from "@/store/demandStore";
import { formatDate } from "@/utils/formatDate";
import { Box, Button, Flex, Heading, Stack, Text, useToast } from "@chakra-ui/react";
import { useParams } from "next/navigation";
import { useEffect } from "react";

const nextStatus = {
  aberta: "em_andamento",
  em_andamento: "concluida",
  concluida: "concluida",
  cancelada: "cancelada",
} as const;

export default function DemandDetailPage() {
  const params = useParams<{ id: string }>();
  const toast = useToast();
  const { selected, get, updateStatus, loading } = useDemandStore();

  useEffect(() => {
    if (params?.id) get(params.id);
  }, [params?.id, get]);

  if (!selected) {
    return (
      <AppLayout>
        <Text>Carregando demanda...</Text>
      </AppLayout>
    );
  }

  const handleAdvance = async () => {
    const target = nextStatus[selected.status];
    await updateStatus(selected.id, target);
    toast({ title: `Status atualizado para ${target}`, status: "success" });
  };

  return (
    <AppLayout>
      <Flex justify="space-between" mb={4} align={{ base: "flex-start", md: "center" }} gap={3}>
        <Box>
          <Heading>{selected.title}</Heading>
          <Text color="gray.600">Registrada em {formatDate(selected.createdAt)} por {selected.citizenName}</Text>
        </Box>
        <StatusBadge status={selected.status} />
      </Flex>

      <Stack spacing={4} bg="white" p={6} rounded="lg" border="1px solid" borderColor="gray.100" shadow="sm">
        <Box>
          <Heading size="sm" mb={2}>Descrição</Heading>
          <Text color="gray.700">{selected.description}</Text>
        </Box>
        <Box>
          <Heading size="sm" mb={2}>Localização</Heading>
          <Text color="gray.700">{selected.location.address}</Text>
          <Text color="gray.500">Região: {selected.location.region ?? "-"}</Text>
        </Box>
        <Box>
          <Heading size="sm" mb={2}>Histórico</Heading>
          <Text color="gray.600">Atualizada em {formatDate(selected.updatedAt)}</Text>
        </Box>
        <Flex gap={3}>
          <Button colorScheme="brand" onClick={handleAdvance} isLoading={loading} isDisabled={selected.status === "concluida" || selected.status === "cancelada"}>
            Avançar status
          </Button>
          <Button variant="outline" onClick={() => updateStatus(selected.id, "cancelada")}>Cancelar</Button>
        </Flex>
      </Stack>
    </AppLayout>
  );
}

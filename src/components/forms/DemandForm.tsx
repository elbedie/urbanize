"use client";

import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  Stack,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { useDemandStore } from "@/store/demandStore";
import { Demand, DemandCategory } from "@/types/demand";

const categories: DemandCategory[] = ["iluminacao", "vias", "coleta", "saneamento", "fiscalizacao"];

export function DemandForm() {
  const toast = useToast();
  const { create, loading } = useDemandStore();
  const [form, setForm] = useState<Partial<Demand>>({
    category: "iluminacao",
    status: "aberta",
  });

  const handleChange = (field: keyof Demand, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    if (!form.title || !form.description || !form.location?.address) {
      toast({ title: "Preencha os campos obrigatórios", status: "warning" });
      return;
    }
    const payload = {
      ...form,
      category: (form.category as DemandCategory) ?? "iluminacao",
      status: "aberta" as const,
      location: {
        lat: form.location?.lat ?? -8.05,
        lng: form.location?.lng ?? -34.9,
        address: form.location?.address ?? "Recife, PE",
        region: form.location?.region ?? "Centro",
      },
      citizenName: form.citizenName ?? "Cidadão", 
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    } as Omit<Demand, "id">;

    try {
      const created = await create(payload);
      toast({ title: "Demanda registrada", status: "success" });
      return created;
    } catch (error) {
      console.error(error);
      toast({ title: "Erro ao registrar demanda", status: "error" });
    }
  };

  return (
    <Box bg="white" p={6} rounded="lg" border="1px solid" borderColor="gray.100" shadow="sm">
      <Stack spacing={4}>
        <FormControl isRequired>
          <FormLabel>Título</FormLabel>
          <Input value={form.title ?? ""} onChange={(e) => handleChange("title", e.target.value)} placeholder="Ex: Buraco em via" />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Descrição</FormLabel>
          <Textarea value={form.description ?? ""} onChange={(e) => handleChange("description", e.target.value)} placeholder="Explique o problema" />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Categoria</FormLabel>
          <Select
            value={(form.category as string) ?? "iluminacao"}
            onChange={(e) => handleChange("category", e.target.value)}
          >
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </Select>
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Endereço</FormLabel>
          <Input
            value={form.location?.address ?? ""}
            onChange={(e) =>
              setForm((prev) => ({
                ...prev,
                location: { ...prev.location, address: e.target.value },
              }))
            }
            placeholder="Rua, número, bairro"
          />
        </FormControl>
        <FormControl>
          <FormLabel>Região</FormLabel>
          <Input
            value={form.location?.region ?? ""}
            onChange={(e) =>
              setForm((prev) => ({
                ...prev,
                location: { ...prev.location, region: e.target.value },
              }))
            }
            placeholder="Zona Norte, Sul, etc"
          />
        </FormControl>
        <Button colorScheme="brand" onClick={handleSubmit} isLoading={loading}>
          Registrar demanda
        </Button>
      </Stack>
    </Box>
  );
}

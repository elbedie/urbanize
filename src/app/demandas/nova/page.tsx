"use client";

import { AppLayout } from "@/components/layout/AppLayout";
import { DemandForm } from "@/components/forms/DemandForm";
import { Heading, Text } from "@chakra-ui/react";

export default function NewDemandPage() {
  return (
    <AppLayout>
      <Heading mb={2}>Registrar demanda</Heading>
      <Text mb={6} color="gray.600">
        Informe detalhes, categoria e localização para facilitar o atendimento.
      </Text>
      <DemandForm />
    </AppLayout>
  );
}

"use client";

import { AppLayout } from "@/components/layout/AppLayout";
import { metricsService, MetricsSummary } from "@/services/metricsService";
import { Box, Grid, GridItem, Heading, Stat, StatHelpText, StatLabel, StatNumber, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";

export default function DashboardPage() {
  const [metrics, setMetrics] = useState<MetricsSummary | null>(null);

  useEffect(() => {
    metricsService.summary().then(setMetrics).catch(() => setMetrics(null));
  }, []);

  return (
    <AppLayout>
      <Heading mb={6}>Dashboard</Heading>
      <Grid templateColumns={{ base: "repeat(2, 1fr)", md: "repeat(4, 1fr)" }} gap={4}>
        <MetricCard title="Total" value={metrics?.total ?? 0} help="Demandas registradas" />
        <MetricCard title="Abertas" value={metrics?.abertas ?? 0} color="orange" />
        <MetricCard title="Em andamento" value={metrics?.emAndamento ?? 0} color="blue" />
        <MetricCard title="Concluídas" value={metrics?.concluidas ?? 0} color="green" />
      </Grid>

      <Box mt={10} bg="white" p={6} rounded="lg" border="1px solid" borderColor="gray.100" shadow="sm">
        <Heading size="md" mb={4}>Demandas por categoria</Heading>
        {metrics ? (
          <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={3}>
            {Object.entries(metrics.porCategoria).map(([category, value]) => (
              <Box key={category} p={4} border="1px solid" borderColor="gray.100" rounded="md" bg="gray.50">
                <Text fontWeight="semibold">{category}</Text>
                <Text color="gray.600">{value} demandas</Text>
              </Box>
            ))}
          </Grid>
        ) : (
          <Text color="gray.500">Carregando métricas...</Text>
        )}
      </Box>
    </AppLayout>
  );
}

function MetricCard({ title, value, help, color = "brand" }: { title: string; value: number; help?: string; color?: string }) {
  return (
    <GridItem>
      <Stat bg="white" p={4} rounded="lg" border="1px solid" borderColor="gray.100" shadow="sm">
        <StatLabel>{title}</StatLabel>
        <StatNumber color={`${color}.600`}>{value}</StatNumber>
        {help && <StatHelpText>{help}</StatHelpText>}
      </Stat>
    </GridItem>
  );
}

"use client";

import { Box, Flex, Heading, Icon, Stack, Text } from "@chakra-ui/react";
import Link from "next/link";
import { Demand } from "@/types/demand";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { formatDate } from "@/utils/formatDate";
import { FaMapMarkerAlt } from "react-icons/fa";

interface Props {
  demand: Demand;
}

export function DemandCard({ demand }: Props) {
  return (
    <Box as={Link} href={`/demandas/${demand.id}`} p={5} rounded="lg" bg="white" border="1px solid" borderColor="gray.100" shadow="xs" _hover={{ shadow: "md" }} transition="all 0.2s">
      <Flex justify="space-between" align="flex-start" gap={3}>
        <Stack spacing={2}>
          <StatusBadge status={demand.status} />
          <Heading size="md">{demand.title}</Heading>
          <Text color="gray.600" noOfLines={2}>
            {demand.description}
          </Text>
          <Flex align="center" gap={2} color="gray.500" fontSize="sm">
            <Icon as={FaMapMarkerAlt} />
            <Text>{demand.location.address}</Text>
          </Flex>
        </Stack>
        <Stack align="flex-end" spacing={1} fontSize="sm" color="gray.500">
          <Text>Categoria: {demand.category}</Text>
          <Text>Registrada: {formatDate(demand.createdAt)}</Text>
        </Stack>
      </Flex>
    </Box>
  );
}

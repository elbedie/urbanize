"use client";

import { Badge } from "@chakra-ui/react";
import { DemandStatus } from "@/types/demand";
import { statusColor, statusLabel } from "@/utils/statusLabel";

interface Props {
  status: DemandStatus;
}

export function StatusBadge({ status }: Props) {
  return (
    <Badge colorScheme={statusColor[status]} rounded="full" px={3} py={1} textTransform="none">
      {statusLabel[status]}
    </Badge>
  );
}

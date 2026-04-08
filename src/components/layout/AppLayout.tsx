"use client";

import { Box, Flex } from "@chakra-ui/react";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";
import { ReactNode } from "react";

export function AppLayout({ children }: { children: ReactNode }) {
  return (
    <Flex minH="100vh" direction="column">
      <Header />
      <Flex flex="1" bg="gray.50">
        <Box display={{ base: "none", md: "block" }}>
          <Sidebar />
        </Box>
        <Box flex="1" p={{ base: 4, md: 8 }}>
          {children}
        </Box>
      </Flex>
    </Flex>
  );
}

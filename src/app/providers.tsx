"use client";

import { ChakraProvider } from "@chakra-ui/react";
import { ReactNode, useEffect } from "react";
import { theme } from "@/theme";

export default function Providers({ children }: { children: ReactNode }) {
  useEffect(() => {
    if (process.env.NEXT_PUBLIC_MOCKS === "true") {
      import("@/mocks/browser").then(({ worker }) => {
        worker.start();
      });
    }
  }, []);

  return <ChakraProvider theme={theme}>{children}</ChakraProvider>;
}

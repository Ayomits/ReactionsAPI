"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ReactNode } from "react";
import { getQueryClient } from "../lib/qc";

export const ReactQueryProvider = ({ children }: { children: ReactNode }) => {
  const queryClient = getQueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <div className="fixed z-40" style={{ bottom: "60px", left: "20px" }}>
        <ReactQueryDevtools initialIsOpen={false} buttonPosition="relative" />
      </div>
    </QueryClientProvider>
  );
};

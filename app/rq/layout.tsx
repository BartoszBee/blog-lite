"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export default function RqLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Singleton QueryClient dla sekcji RQ
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      {/* Każda strona w /rq będzie działać z React Query */}
      {children}
    </QueryClientProvider>
  );
}

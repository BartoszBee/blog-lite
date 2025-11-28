"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export default function RqLayout({ children }: { children: React.ReactNode }) {
  // Singleton QueryClient dla sekcji RQ
  const queryClient = new QueryClient();

  return (
    <div className="bg-sky-400 p-6 rounded-lg min-h-[70vh]">
      <QueryClientProvider client={queryClient}>
        {/* Każda strona w /rq będzie działać z React Query */}
        {children}
      </QueryClientProvider>
    </div>
  );
}

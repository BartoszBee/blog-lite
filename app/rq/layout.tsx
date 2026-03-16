"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function RqLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl min-h-[70vh] overflow-hidden">
      <div className="h-1 bg-sky-500" />
      <QueryClientProvider client={queryClient}>
        <div className="p-6">{children}</div>
      </QueryClientProvider>
    </div>
  );
}

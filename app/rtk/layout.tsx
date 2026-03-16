"use client";

import { Provider } from "react-redux";
import { store } from "@/lib/store";

export default function RtkLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl min-h-[70vh] overflow-hidden">
      <div className="h-1 bg-orange-500" />
      <Provider store={store}>
        <div className="p-6">{children}</div>
      </Provider>
    </div>
  );
}

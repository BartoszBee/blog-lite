import "./globals.css";
import Link from "next/link";

export const metadata = {
  title: "BlogLite",
  description: "CRUD Example — Classic + Server Actions",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pl">
      <body className="bg-zinc-950 text-zinc-100 min-h-screen">
        <header className="bg-zinc-900 border-b border-zinc-800 sticky top-0 z-10">
          <nav className="mx-auto max-w-5xl px-4 py-3 flex items-center justify-between">
            <Link href="/" className="text-lg font-bold tracking-tight">
              Blog<span className="text-zinc-500">Lite</span>
            </Link>

            <div className="flex items-center gap-1">
              <Link
                href="/"
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 transition text-sm font-medium text-zinc-300 hover:text-white"
              >
                <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
                Classic
              </Link>

              <Link
                href="/actions"
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 transition text-sm font-medium text-zinc-300 hover:text-white"
              >
                <span className="w-2 h-2 rounded-full bg-slate-400"></span>
                Server Actions
              </Link>

              <Link
                href="/rq"
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 transition text-sm font-medium text-zinc-300 hover:text-white"
              >
                <span className="w-2 h-2 rounded-full bg-sky-500"></span>
                React Query
              </Link>

              <Link
                href="/swr"
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 transition text-sm font-medium text-zinc-300 hover:text-white"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                SWR
              </Link>

              <Link
                href="/zustand"
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 transition text-sm font-medium text-zinc-300 hover:text-white"
              >
                <span className="w-2 h-2 rounded-full bg-violet-500"></span>
                Zustand
              </Link>

              <Link
                href="/rtk"
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 transition text-sm font-medium text-zinc-300 hover:text-white"
              >
                <span className="w-2 h-2 rounded-full bg-orange-500"></span>
                RTK Query
              </Link>
            </div>
          </nav>
        </header>

        <main className="mx-auto max-w-5xl py-8 px-4">{children}</main>
      </body>
    </html>
  );
}

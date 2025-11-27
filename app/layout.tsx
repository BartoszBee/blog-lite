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
      <body className="bg-gray-50 text-gray-900">
        <header className="bg-white border-b shadow-sm">
          <nav className="mx-auto max-w-4xl px-4 py-3 flex items-center justify-between">
            <Link href="/" className="text-xl font-bold text-gray-800">
              BlogLite
            </Link>

            <div className="flex gap-4">
              {/* Link do klasycznego CRUD */}
              <Link
                href="/"
                className="px-3 py-1.5 rounded hover:bg-gray-200 transition text-sm font-medium border"
              >
                posts (classic fetch)
              </Link>

              {/* Link do server actions CRUD */}
              <Link
                href="/actions"
                className="px-3 py-1.5 rounded bg-gray-500 hover:bg-gray-600 transition text-sm font-medium border"
              >
                posts (server actions)
              </Link>
              <Link
                href="/rq"
                className="px-3 py-1.5 rounded bg-purple-500 hover:bg-purple-600 transition text-sm font-medium border"
              >
                posts (react query)
              </Link>
            </div>
          </nav>
        </header>

        <main className="mx-auto max-w-4xl py-8 px-4">{children}</main>
      </body>
    </html>
  );
}

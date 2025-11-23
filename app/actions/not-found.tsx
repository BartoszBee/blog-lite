import Link from "next/link";

export default function NotFoundActionsPage() {
  return (
    <main className="p-10 text-center">
      <h1 className="text-5xl text-gray-700 mb-8">404</h1>
      <p className="text-lg text-gray-700 mb-8">
        Oops! Nie znaleziono posta w wersji Server Actions.
      </p>

      <Link
        href="/actions"
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        Wróć do listy postów (SA)
      </Link>
    </main>
  );
}

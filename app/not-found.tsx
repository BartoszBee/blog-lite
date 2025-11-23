import Link from "next/link";

export default function NotFoundPage() {
  return (
    <main className="p-10 text-center">
      <h1 className="text-5xl text-gray-700 mb-8">404</h1>
      <p className="text-lg text-gray-700 mb-8">
        Oops! Nie znaleziono strony, której szukasz.
      </p>
      <Link
        href="/"
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        Wróć na stronę główną
      </Link>
    </main>
  );
}

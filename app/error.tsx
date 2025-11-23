"use client";
import { useEffect } from "react";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Błąd aplikacji:", error);
  }, [error]);

  return (
    <main className="text-center p-6">
      <h1 className="text-2xl font-bold text-red-600 mb-4">Wystąpił błąd 😥</h1>
      <p className="mb-4 text-gray-700">
        {error.message || "Coś poszło nie tak."}
      </p>
      {/* reset() przeładowuje bieżący segment route */}
      <button
        onClick={() => reset()}
        className="px-4 py-2 bg-blue-600 text-white rounded"
      >
        Spróbuj ponownie
      </button>
    </main>
  );
}

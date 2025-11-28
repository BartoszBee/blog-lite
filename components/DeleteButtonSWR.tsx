"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSWRConfig } from "swr";

export default function DeleteButtonSWR({ id }: { id: number }) {
  const router = useRouter();
  const { mutate } = useSWRConfig();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleDelete() {
    setLoading(true);
    setError("");

    try {
      const res = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${id}`,
        { method: "DELETE" }
      );

      if (!res.ok) {
        throw new Error("Nie udało się usunąć posta");
      }

      // JSONPlaceholder zwraca {}
      await mutate(
        "https://jsonplaceholder.typicode.com/posts",
        undefined,
        { revalidate: true }
      );

      router.push("/swr");
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
      else setError("Wystąpił błąd przy usuwaniu");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mt-4">
      {error && <p className="text-red-600 mb-2">{error}</p>}

      <button
        onClick={handleDelete}
        disabled={loading}
        className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-500 transition disabled:opacity-50"
      >
        {loading ? "Usuwam..." : "🗑 Usuń post"}
      </button>
    </div>
  );
}

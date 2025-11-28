"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSWRConfig } from "swr";
import type { Post } from "@/types/Post";

export default function NewPostSWRPage() {
  const router = useRouter();
  const { mutate } = useSWRConfig();

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [created, setCreated] = useState<Post | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    setCreated(null);

    try {
      const res = await fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          body,
          userId: 1,
        }),
      });

      if (!res.ok) {
        throw new Error("Nie udało się utworzyć posta");
      }

      const data = await res.json();
      setCreated(data);

      // SWR revalidate listy
      mutate("https://jsonplaceholder.typicode.com/posts", undefined, {
        revalidate: true,
      });

    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Wystąpił błąd");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="p-6 max-w-xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Dodaj nowy post (SWR)</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="titleInput" className="block mb-1 font-medium">
            Tytuł
          </label>
          <input
            id="titleInput"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label htmlFor="bodyArea" className="block mb-1 font-medium">
            Treść
          </label>
          <textarea
            id="bodyArea"
            rows={5}
            value={body}
            onChange={(e) => setBody(e.target.value)}
            required
            className="w-full p-2 border rounded"
          ></textarea>
        </div>

        {error && <p className="text-red-600">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 bg-green-600 text-white rounded disabled:opacity-50 hover:bg-green-700 transition"
        >
          {loading ? "Wysyłam..." : "Utwórz post"}
        </button>
      </form>

      {created && (
        <div className="mt-6 p-4 border border-green-500 rounded bg-green-50">
          <h2 className="text-xl font-bold text-green-700 mb-2">
            Fake post został utworzony 🎉
          </h2>

          <p>ID zwrócone przez JSONPlaceholder: {created.id}</p>

          <p className="mt-2 text-gray-700">
            <strong>Tytuł:</strong> {created.title}
            <br />
            <strong>Treść:</strong> {created.body}
          </p>

          <p className="text-green-700 mt-4">
            JSONPlaceholder nie zapisuje danych — tylko udaje zapis!
          </p>
        </div>
      )}

      <button
        onClick={() => router.push("/swr")}
        className="mt-6 px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition"
      >
        ← Powrót
      </button>
    </main>
  );
}

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewPostPage() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          body,
          userId: 1,
        }),
      });

      if (!res.ok) {
        setError("Nie udało się utworzyć posta");
      }

      const newPost = await res.json();

      router.push(`/posts/${newPost.id}`);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Nie udało się utworzyć posta");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="p-6 max-w-xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Dodaj nowy post</h1>
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
          className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50 hover:opacity-70"
        >
          {loading ? "Wysyłam..." : "Utwórz post"}
        </button>
      </form>
      <button
        onClick={() => router.push("/")}
        className="mt-6 px-4 py-2 bg-gray-300 rounded hover:opacity-70"
      >
        ← Powrót
      </button>
    </main>
  );
}

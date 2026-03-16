"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Post } from "@/types/Post";
import { createPost } from "@/lib/api";

export default function NewPostPage() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [createdFakePost, setCreatedFakePost] = useState<Post | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    setCreatedFakePost(null);

    try {
      const result = await createPost({ title, body, userId: 1 });
      setCreatedFakePost(result);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Nie udało się utworzyć posta");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="p-6 max-w-xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Dodaj nowy post</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="titleInput" className="block mb-1 font-medium">Tytuł</label>
          <input
            id="titleInput"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label htmlFor="bodyArea" className="block mb-1 font-medium">Treść</label>
          <textarea
            id="bodyArea"
            rows={5}
            value={body}
            onChange={(e) => setBody(e.target.value)}
            required
            className="w-full p-2 border rounded"
          ></textarea>
        </div>
        {error && <p className="text-red-400">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg disabled:opacity-50 transition cursor-pointer"
        >
          {loading ? "Wysyłam..." : "Utwórz post"}
        </button>
      </form>

      {createdFakePost && (
        <div className="mt-6 p-4 border border-green-500/40 rounded-lg bg-green-950/30">
          <h2 className="text-xl font-bold text-green-400 mb-2">Fake post został utworzony 🎉</h2>
          <p className="text-zinc-400">ID zwrócone przez JSONPlaceholder: {createdFakePost.id}</p>
          <p className="mt-2 text-zinc-300">
            <strong>Tytuł:</strong> {createdFakePost.title}<br />
            <strong>Treść:</strong> {createdFakePost.body}
          </p>
          <p className="text-green-500/70 mt-4 text-sm">JSONPlaceholder NIE zapisuje danych, tylko udaje zapis!</p>
        </div>
      )}

      <button
        onClick={() => router.push("/")}
        className="mt-6 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-100 rounded-lg transition cursor-pointer"
      >
        ← Powrót
      </button>
    </main>
  );
}

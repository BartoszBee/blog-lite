"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Post } from "@/types/Post";

export default function RqNewPostPage() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [error, setError] = useState("");
  const [createdPost, setCreatedPost] = useState<Post | null>(null);

  const mutation = useMutation({
    mutationFn: async () => {
      const res = await fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, body, userId: 1 }),
      });
      if (!res.ok) throw new Error("Nie udało się utworzyć posta");
      return res.json();
    },
    onSuccess: (data) => {
      setCreatedPost(data);
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
    onError: (err: unknown) => {
      setError(err instanceof Error ? err.message : "Nie udało się utworzyć posta");
    },
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setCreatedPost(null);
    mutation.mutate();
  }

  return (
    <main className="p-6 max-w-xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Dodaj nowy post (React Query)</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Tytuł</label>
          <input className="w-full p-2 border rounded" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>
        <div>
          <label className="block mb-1 font-medium">Treść</label>
          <textarea className="w-full p-2 border rounded" rows={5} value={body} onChange={(e) => setBody(e.target.value)} required></textarea>
        </div>
        {error && <p className="text-red-400">{error}</p>}
        <button
          type="submit"
          disabled={mutation.isPending}
          className="px-4 py-2 bg-sky-600 hover:bg-sky-500 text-white rounded-lg disabled:opacity-50 transition"
        >
          {mutation.isPending ? "Wysyłam..." : "Utwórz post"}
        </button>
      </form>

      {createdPost && (
        <div className="mt-6 p-4 border border-green-500/40 rounded-lg bg-green-950/30">
          <h2 className="text-xl font-bold text-green-400 mb-2">Fake post został utworzony 🎉</h2>
          <p className="text-zinc-400">ID zwrócone przez API: {createdPost.id}</p>
          <p className="mt-2 text-zinc-300">
            <strong>Tytuł:</strong> {createdPost.title}<br />
            <strong>Treść:</strong> {createdPost.body}
          </p>
          <p className="text-green-500/70 mt-4 text-sm">JSONPlaceholder NIE zapisuje danych — to tylko symulacja.</p>
        </div>
      )}

      <button
        onClick={() => router.push("/rq")}
        className="mt-6 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-100 rounded-lg transition"
      >
        ← Powrót
      </button>
    </main>
  );
}

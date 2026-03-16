"use client";

import { useEffect, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchPost } from "@/lib/rqApi";
import Link from "next/link";
import type { Post } from "@/types/Post";

export default function RqEditPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const [id, setId] = useState<string>("");
  const queryClient = useQueryClient();

  useEffect(() => {
    async function unwrap() {
      const p = await params;
      setId(p.id);
    }
    unwrap();
  }, [params]);

  const { data: post, isLoading, isError, error } = useQuery({
    queryKey: ["post", id],
    queryFn: () => fetchPost(id),
    enabled: !!id,
  });

  const [editPost, setEditPost] = useState<Post | null>(null);
  const [updatedPost, setUpdatedPost] = useState<Post | null>(null);
  const [updateError, setUpdateError] = useState("");

  useEffect(() => {
    if (post) setEditPost(post);
  }, [post]);

  const mutation = useMutation({
    mutationFn: async () => {
      if (!editPost) throw new Error("Brak danych posta");
      const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${editPost.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editPost),
      });
      if (!res.ok) throw new Error("Nie udało się zaktualizować posta");
      return res.json();
    },
    onSuccess: (data) => {
      setUpdatedPost(data);
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      queryClient.invalidateQueries({ queryKey: ["post", id] });
    },
    onError: (err: unknown) => {
      setUpdateError(err instanceof Error ? err.message : "Nie udało się zaktualizować posta");
    },
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setUpdatedPost(null);
    setUpdateError("");
    mutation.mutate();
  }

  if (!id || isLoading) return <p className="p-6 text-zinc-400">Ładowanie...</p>;
  if (isError) return <p className="p-6 text-red-400">Błąd: {(error as Error).message}</p>;
  if (!editPost) return <p className="p-6 text-red-400">Nie znaleziono posta.</p>;

  return (
    <main className="p-6 max-w-xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Edytuj post (React Query)</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Tytuł</label>
          <input
            className="w-full p-2 border rounded"
            value={editPost.title}
            onChange={(e) => setEditPost((prev) => prev ? { ...prev, title: e.target.value } : prev)}
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Treść</label>
          <textarea
            className="w-full p-2 border rounded"
            rows={5}
            value={editPost.body}
            onChange={(e) => setEditPost((prev) => prev ? { ...prev, body: e.target.value } : prev)}
            required
          />
        </div>
        {updateError && <p className="text-red-400">{updateError}</p>}
        <button
          type="submit"
          disabled={mutation.isPending}
          className="px-4 py-2 bg-sky-600 hover:bg-sky-500 text-white rounded-lg disabled:opacity-50 transition"
        >
          {mutation.isPending ? "Zapisuję..." : "Zapisz zmiany"}
        </button>
      </form>

      {updatedPost && (
        <div className="mt-6 p-4 border border-green-500/40 rounded-lg bg-green-950/30">
          <h2 className="text-xl font-semibold text-green-400 mb-2">Fake post zaktualizowany 🎉</h2>
          <p className="text-zinc-400">ID: {updatedPost.id}</p>
          <p className="mt-2 text-zinc-300">
            <strong>Tytuł:</strong> {updatedPost.title}<br />
            <strong>Treść:</strong> {updatedPost.body}
          </p>
        </div>
      )}

      <Link href={`/rq/${editPost.id}`} className="inline-block px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-100 rounded-lg transition mt-6">
        ← Powrót
      </Link>
    </main>
  );
}

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useGetPostQuery, useUpdatePostMutation } from "@/lib/postsApi";
import type { Post } from "@/types/Post";

export default function EditPostRtkPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const [id, setId] = useState<number | null>(null);

  useEffect(() => {
    params.then(({ id }) => setId(Number(id)));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { data: post, isLoading, isError } = useGetPostQuery(id!, { skip: id === null });
  const [updatePost, { isLoading: isSaving }] = useUpdatePostMutation();

  const [editPost, setEditPost] = useState<Post | null>(null);
  const [updated, setUpdated] = useState<Post | null>(null);
  const [saveError, setSaveError] = useState("");

  useEffect(() => {
    if (post) setEditPost(post);
  }, [post]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!editPost) return;
    setSaveError("");
    setUpdated(null);

    try {
      const result = await updatePost(editPost).unwrap();
      setUpdated(result);
    } catch {
      setSaveError("Nie udało się zaktualizować posta");
    }
  }

  function updateField(field: keyof Post, value: string) {
    setEditPost((prev) => (prev ? { ...prev, [field]: value } : prev));
  }

  if (isError) return <p className="p-6 text-red-400">Błąd podczas pobierania posta.</p>;
  if (!post || !editPost || isLoading) return <p className="p-6 text-zinc-400">Ładowanie...</p>;

  return (
    <main className="p-6 max-w-xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Edytuj post (RTK Query)</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="titleInput" className="block mb-1 font-medium">Tytuł</label>
          <input id="titleInput" className="w-full p-2 border rounded" value={editPost.title} onChange={(e) => updateField("title", e.target.value)} required />
        </div>
        <div>
          <label htmlFor="bodyInput" className="block mb-1 font-medium">Treść</label>
          <textarea id="bodyInput" className="w-full p-2 border rounded" rows={5} value={editPost.body} onChange={(e) => updateField("body", e.target.value)} required></textarea>
        </div>
        {saveError && <p className="text-red-400">{saveError}</p>}
        <button
          type="submit"
          disabled={isSaving}
          className="px-4 py-2 bg-yellow-500 hover:bg-yellow-400 text-black rounded-lg disabled:opacity-50 transition cursor-pointer"
        >
          {isSaving ? "Zapisuję..." : "Zapisz zmiany"}
        </button>
      </form>

      {updated && (
        <div className="mt-6 p-4 border border-green-500/40 rounded-lg bg-green-950/30">
          <h2 className="text-xl font-semibold text-green-400 mb-2">Fake post zaktualizowany 🎉</h2>
          <p className="text-zinc-400">ID: {updated.id}</p>
          <p className="mt-2 text-zinc-300">
            <strong>Tytuł:</strong> {updated.title}<br />
            <strong>Treść:</strong> {updated.body}
          </p>
        </div>
      )}

      <Link href={`/rtk/${editPost.id}`} className="inline-block px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-100 rounded-lg transition mt-6">
        ← Powrót
      </Link>
    </main>
  );
}

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePostsStore } from "@/lib/postsStore";
import DeleteButtonZustand from "@/components/DeleteButtonZustand";

export default function ZustandPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const [id, setId] = useState<number | null>(null);
  const { post, loading, error, fetchPost } = usePostsStore();

  useEffect(() => {
    params.then(({ id }) => setId(Number(id)));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (id !== null) fetchPost(id);
  }, [id, fetchPost]);

  if (!id || loading) return <p className="p-6 text-zinc-400">Ładowanie...</p>;
  if (error) return <p className="p-6 text-red-400">{error}</p>;
  if (!post) return <p className="p-6 text-red-400">Nie znaleziono posta.</p>;

  return (
    <main className="p-6 max-w-3xl mx-auto">
      <article className="bg-zinc-900 border border-zinc-800 rounded-xl p-8 mb-10">
        <h1 className="text-4xl font-bold text-zinc-100 mb-6">{post.title}</h1>

        <div className="text-zinc-300 mb-10 leading-relaxed whitespace-pre-line">
          {post.body}
        </div>

        <div className="flex items-center gap-4 flex-wrap">
          <Link
            href={`/zustand/${post.id}/edit`}
            className="px-5 py-2.5 bg-violet-600 hover:bg-violet-500 text-white rounded-lg transition font-medium"
          >
            ✏️ Edytuj post (Zustand)
          </Link>

          <DeleteButtonZustand id={post.id} />

          <Link
            href="/zustand"
            className="px-5 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-100 rounded-lg transition font-medium"
          >
            ← Powrót do listy
          </Link>
        </div>
      </article>

      <section className="text-zinc-500 text-sm">
        <p>
          Post ID: <span className="font-semibold text-zinc-400">{post.id}</span> • User ID:{" "}
          <span className="font-semibold text-zinc-400">{post.userId}</span>
        </p>
      </section>
    </main>
  );
}

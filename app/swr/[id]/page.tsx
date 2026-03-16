"use client";

import { useEffect, useState } from "react";
import useSWR from "swr";
import Link from "next/link";
import DeleteButtonSWR from "@/components/DeleteButtonSWR";
import type { Post } from "@/types/Post";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function SwrPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const [id, setId] = useState<string>("");

  useEffect(() => {
    async function unwrap() {
      const p = await params;
      setId(p.id);
    }
    unwrap();
  }, [params]);

  const { data: post, error, isLoading } = useSWR<Post>(
    id ? `https://jsonplaceholder.typicode.com/posts/${id}` : null,
    fetcher
  );

  if (!id || isLoading) return <p className="p-6 text-zinc-400">Ładowanie...</p>;
  if (error) return <p className="p-6 text-red-400">Błąd podczas pobierania posta.</p>;
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
            href={`/swr/${post.id}/edit`}
            className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg transition font-medium"
          >
            ✏️ Edytuj post (SWR)
          </Link>

          <DeleteButtonSWR id={post.id} />

          <Link
            href="/swr"
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

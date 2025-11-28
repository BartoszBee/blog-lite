"use client";

import { useEffect, useState } from "react";
import useSWR from "swr";
import Link from "next/link";
import DeleteButtonSWR from "@/components/DeleteButtonSWR";
import type { Post } from "@/types/Post";

// klasyczny fetcher
const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function SwrPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const [id, setId] = useState<string>("");

  // unwrap params — Twój standard
  useEffect(() => {
    async function unwrap() {
      const p = await params;
      setId(p.id);
    }
    unwrap();
  }, [params]);

  // SWR musi znać URL od razu, więc robimy conditional key
  const { data: post, error, isLoading } = useSWR<Post>(
    id ? `https://jsonplaceholder.typicode.com/posts/${id}` : null,
    fetcher
  );

  if (!id) return <p className="p-6">Ładowanie...</p>;
  if (isLoading) return <p className="p-6">Ładowanie...</p>;
  if (error)
    return (
      <p className="p-6 text-red-600">Błąd podczas pobierania posta.</p>
    );
  if (!post)
    return <p className="p-6 text-red-600">Nie znaleziono posta.</p>;

  return (
    <main className="p-6 max-w-3xl mx-auto">
      <article className="bg-white border rounded-xl shadow-sm p-8 mb-10">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">
          {post.title}
        </h1>

        <div className="prose prose-lg text-gray-800 mb-10 whitespace-pre-line">
          {post.body}
        </div>

        <div className="flex items-center gap-4 flex-wrap">
          <Link
            href={`/swr/${post.id}/edit`}
            className="px-5 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-500 transition font-medium shadow-sm"
          >
            ✏️ Edytuj post (SWR)
          </Link>

          <DeleteButtonSWR id={post.id} />

          <Link
            href="/swr"
            className="px-5 py-2.5 bg-gray-200 text-gray-900 rounded-lg hover:bg-gray-300 transition font-medium"
          >
            ← Powrót do listy
          </Link>
        </div>
      </article>

      <section className="text-gray-600 text-sm">
        <p>
          Post ID: <span className="font-semibold">{post.id}</span> • User ID:{" "}
          <span className="font-semibold">{post.userId}</span>
        </p>
      </section>
    </main>
  );
}

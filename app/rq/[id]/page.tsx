"use client";

import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchPost } from "@/lib/rqApi";
import Link from "next/link";
import DeleteButtonRQ from "@/components/DeleteButtonRQ";

export default function RqPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const [id, setId] = useState<string>("");
  
  useEffect(() => {
    async function unwrap() {
      const { id } = await params;
      setId(id);
    }
    unwrap();
  }, [params]);
  
  const {
    data: post,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["post", id],
    queryFn: () => fetchPost(id),
    enabled: !!id, // działa dopiero gdy id jest gotowe
  });

  // dopóki nie mamy id → wyświetlamy loading
  if (!id) return <p className="p-6">Ładowanie...</p>;

  if (isLoading) return <p className="p-6">Ładowanie...</p>;

  if (isError)
    return (
      <p className="p-6 text-red-600">
        Błąd: {(error as Error).message}
      </p>
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
            href={`/rq/${post.id}/edit`}
            className="px-5 py-2.5 bg-purple-600 text-white rounded-lg hover:bg-purple-500 transition font-medium shadow-sm"
          >
            ✏️ Edytuj post (RQ)
          </Link>

          <DeleteButtonRQ id={post.id} />

          <Link
            href="/rq"
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

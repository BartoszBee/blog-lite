"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchPosts } from "@/lib/rqApi";
import PostCard from "@/components/PostCard";
import Link from "next/link";

export default function RqHomePage() {
  // Pobieranie danych z React Query
  const {
    data: posts,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
  });

  if (isLoading) return <p className="p-6">Ładowanie...</p>;
  if (isError)
    return (
      <p className="p-6 text-red-600">
        Błąd: {(error as Error).message}
      </p>
    );

  return (
    <main>
      <h1 className="text-2xl font-bold mb-4">
        Lista postów (React Query)
      </h1>

      <Link
        href="/rq/new"
        className="inline-block mb-6 px-4 py-2 bg-sky-500 text-white rounded hover:bg-sky-600 transition"
      >
        ➕ Dodaj nowy post (RQ)
      </Link>

      <ul className="space-y-3">
        {posts?.map((post) => (
          <li key={post.id}>
            <PostCard post={post} action="rq" />
          </li>
        ))}
      </ul>
    </main>
  );
}

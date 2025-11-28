"use client";

import useSWR from "swr";
import Link from "next/link";
import PostCard from "@/components/PostCard";
import type { Post } from "@/types/Post";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function SwrHomePage() {
  // SWR — pobieranie listy postów
  const { data: posts, error, isLoading } = useSWR<Post[]>(
    "https://jsonplaceholder.typicode.com/posts",
    fetcher
  );

  if (isLoading) return <p className="p-6">Ładowanie...</p>;
  if (error)
    return (
      <p className="p-6 text-red-600">
        Błąd podczas pobierania postów.
      </p>
    );

  return (
    <main >
      <h1 className="text-2xl font-bold mb-4">
        Lista postów (SWR)
      </h1>

      <Link
        href="/swr/new"
        className="inline-block mb-6 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
      >
        ➕ Dodaj nowy post (SWR)
      </Link>

      <ul className="space-y-3">
        {posts?.map((post) => (
          <li key={post.id}>
            <PostCard post={post} action="swr" />
          </li>
        ))}
      </ul>
    </main>
  );
}

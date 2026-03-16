"use client";

import useSWR from "swr";
import Link from "next/link";
import PostCard from "@/components/PostCard";
import type { Post } from "@/types/Post";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function SwrHomePage() {
  const { data: posts, error, isLoading } = useSWR<Post[]>(
    "https://jsonplaceholder.typicode.com/posts",
    fetcher
  );

  if (isLoading) return <p className="text-zinc-400">Ładowanie...</p>;
  if (error) return <p className="text-red-400">Błąd podczas pobierania postów.</p>;

  return (
    <main>
      <h1 className="text-2xl font-bold mb-4">Lista postów (SWR)</h1>

      <Link
        href="/swr/new"
        className="inline-block mb-6 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg transition text-sm font-medium"
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

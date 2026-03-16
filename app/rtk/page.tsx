"use client";

import Link from "next/link";
import PostCard from "@/components/PostCard";
import { useGetPostsQuery } from "@/lib/postsApi";

export default function RtkHomePage() {
  const { data: posts, isLoading, isError, error } = useGetPostsQuery();

  if (isLoading) return <p className="text-zinc-400">Ładowanie...</p>;
  if (isError) return <p className="text-red-400">Błąd: {(error as Error).message}</p>;

  return (
    <main>
      <h1 className="text-2xl font-bold mb-4">Lista postów (RTK Query)</h1>

      <Link
        href="/rtk/new"
        className="inline-block mb-6 px-4 py-2 bg-orange-600 hover:bg-orange-500 text-white rounded-lg transition text-sm font-medium"
      >
        ➕ Dodaj nowy post (RTK)
      </Link>

      <ul className="space-y-3">
        {posts?.map((post) => (
          <li key={post.id}>
            <PostCard post={post} action="rtk" />
          </li>
        ))}
      </ul>
    </main>
  );
}

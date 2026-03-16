"use client";

import { useEffect } from "react";
import Link from "next/link";
import PostCard from "@/components/PostCard";
import { usePostsStore } from "@/lib/postsStore";

export default function ZustandHomePage() {
  const { posts, loading, error, fetchPosts } = usePostsStore();

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  if (loading) return <p className="text-zinc-400">Ładowanie...</p>;
  if (error) return <p className="text-red-400">{error}</p>;

  return (
    <main>
      <h1 className="text-2xl font-bold mb-4">Lista postów (Zustand)</h1>

      <Link
        href="/zustand/new"
        className="inline-block mb-6 px-4 py-2 bg-violet-600 hover:bg-violet-500 text-white rounded-lg transition text-sm font-medium"
      >
        ➕ Dodaj nowy post (Zustand)
      </Link>

      <ul className="space-y-3">
        {posts.map((post) => (
          <li key={post.id}>
            <PostCard post={post} action="zustand" />
          </li>
        ))}
      </ul>
    </main>
  );
}

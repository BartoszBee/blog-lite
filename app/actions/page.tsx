import Link from "next/link";
import type { Post } from "@/types/Post";
import { getPosts } from "@/lib/api";
import PostCard from "@/components/PostCard";

export default async function ActionsHomePage() {
  // 🔹 Pobranie postów SSR (po mutacji revalidatePath("/actions") wymusi świeże dane)
  const posts: Post[] = await getPosts();

  return (
    <main className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Lista postów (Server Actions)</h1>

      {/* 🔹 Link do tworzenia posta z Server Actions */}
      <Link
        href="/actions/new"
        className="inline-block mb-6 px-4 py-2 bg-blue-600 text-white rounded cursor-pointer"
      >
        ➕ Utwórz nowy post (SA)
      </Link>

      <ul className="space-y-3">
        {posts.map((post) => (
          <li key={post.id}>
            <PostCard post={post} action="server" />
          </li>
        ))}
      </ul>
    </main>
  );
}

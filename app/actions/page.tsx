import Link from "next/link";
import type { Post } from "@/types/Post";
import { getPosts } from "@/lib/api";
import PostCard from "@/components/PostCard";

export default async function ActionsHomePage() {
  const posts: Post[] = await getPosts();

  return (
    <main>
      <h1 className="text-2xl font-bold mb-4">Lista postów (Server Actions)</h1>

      <Link
        href="/actions/new"
        className="inline-block mb-6 px-4 py-2 bg-slate-600 hover:bg-slate-500 text-white rounded-lg transition text-sm font-medium"
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

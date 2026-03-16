import Link from "next/link";
import type { Post } from "@/types/Post";
import { getPosts } from "@/lib/api";
import PostCard from "@/components/PostCard";

export default async function HomePage() {
  const posts: Post[] = await getPosts();

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl min-h-[70vh] overflow-hidden">
      <div className="h-1 bg-indigo-500" />
      <main className="p-6">
        <h1 className="text-2xl font-bold mb-4">Lista postów</h1>
        <Link
          href="/posts/new"
          className="inline-block mb-6 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg transition text-sm font-medium"
        >
          ➕ Dodaj nowy post
        </Link>
        <ul className="space-y-3">
          {posts.map((post) => (
            <li key={post.id}>
              <PostCard post={post} />
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}

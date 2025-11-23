import Link from "next/link";
import type { Post } from "@/types/Post";
import { getPosts } from "@/lib/api";
import PostCard from "@/components/PostCard";

export default async function HomePage() {
  const posts: Post[] = await getPosts();

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Lista postów</h1>
      <Link
        href="/posts/new"
        className="inline-block mb-6 px-4 py-2 bg-blue-600 text-white rounded"
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
  );
}

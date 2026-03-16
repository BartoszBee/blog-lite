import type { Post } from "@/types/Post";
import Link from "next/link";

export default function FakePostView({ post }: { post: Post }) {
  return (
    <main className="p-6 max-w-xl mx-auto">
      <article className="bg-zinc-900 border border-zinc-800 rounded-xl p-8">
        <h1 className="text-3xl font-bold mb-4 text-zinc-100">{post.title}</h1>
        <p className="whitespace-pre-line text-zinc-300">{post.body}</p>

        <p className="my-6 text-sm text-red-400 border border-red-500/30 bg-red-950/20 p-3 rounded-lg">
          Ten post jest FAKE — JSONPlaceholder udaje zapis, ale go nie przechowuje.
        </p>

        <Link
          href="/actions"
          className="px-5 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-100 rounded-lg transition font-medium"
        >
          ← Powrót do listy
        </Link>
      </article>
    </main>
  );
}

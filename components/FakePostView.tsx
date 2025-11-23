import type { Post } from "@/types/Post";
import Link from "next/link";

export default function FakePostView({ post }: { post: Post }) {
  return (
    <main className="p-6 max-w-xl mx-auto">
      <article className="bg-white border rounded-xl p-8 shadow-sm">
        <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
        <p className="whitespace-pre-line text-gray-800">{post.body}</p>

        <p className="my-6 text-sm text-red-500 border p-2 rounded-2xl">
          !!! Ten post jest FAKE — JSONPlaceholder udaje zapis, ale go nie
          przechowuje.
        </p>
        <Link
          href="/actions"
          className="px-5 py-2.5 bg-gray-200 text-gray-900 rounded-lg hover:bg-gray-300 transition font-medium"
        >
          ← Powrót do listy
        </Link>
      </article>
    </main>
  );
}

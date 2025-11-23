import { getPost } from "@/lib/api";
import type { Post } from "@/types/Post";
import { notFound } from "next/navigation";
import Link from "next/link";
import DeleteButton from "@/components/DeleteButton";

export default async function PostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  let post: Post | null = null;

  try {
    post = await getPost(id);
  } catch {
    notFound();
  }

  if (!post || !post.id) {
    notFound();
  }

  return (
    <main className="p-6 max-w-3xl mx-auto">
      {/* Karta posta */}
      <article className="bg-white border rounded-xl shadow-sm p-8 mb-10">
        {/* Tytuł */}
        <h1 className="text-4xl font-bold text-gray-900 mb-6 leading-tight">
          {post.title}
        </h1>

        {/* Treść */}
        <div className="prose prose-lg text-gray-800 mb-10">
          {/* używamy <div> zamiast <p>, by Tailwind Prose działał */}
          <div className="whitespace-pre-line">{post.body}</div>
        </div>

        {/* Przyciski akcji */}
        <div className="flex items-center gap-4 flex-wrap">
          <Link
            href={`/posts/${post.id}/edit`}
            className="px-5 py-2.5 bg-yellow-500 text-white rounded-lg hover:bg-yellow-400 transition font-medium shadow-sm"
          >
            ✏️ Edytuj post
          </Link>

          <Link
            href="/"
            className="px-5 py-2.5 bg-gray-200 text-gray-900 rounded-lg hover:bg-gray-300 transition font-medium"
          >
            ← Powrót do listy
          </Link>
        </div>
        <DeleteButton id={post.id} />
      </article>

      {/* Dodatkowa sekcja — jak w nowoczesnych blogach */}
      <section className="text-gray-600 text-sm">
        <p>
          Post ID: <span className="font-semibold">{post.id}</span> • User ID:{" "}
          <span className="font-semibold">{post.userId}</span>
        </p>
      </section>
    </main>
  );
}

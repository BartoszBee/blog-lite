import { getPost } from "@/lib/api";
import type { Post } from "@/types/Post";
import { notFound } from "next/navigation";
import Link from "next/link";
import { deletePostAction } from "@/app/actions";
import FakePostView from "@/components/FakePostView";

export default async function PostServerActionPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: {
    fake?: string;
    title?: string;
    body?: string;
    userId?: string;
  };
}) {
  const { id } = await params;
  const queryParams = await searchParams;
  const fake = queryParams.fake === "1";
  if (fake) {
    const post: Post = {
      id: Number(id),
      userId: Number(queryParams.userId || 1),
      title: queryParams.title || "(Brak tytułu)",
      body: queryParams.body || "(Brak treści)",
    };

    return <FakePostView post={post} />;
  }
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
          <div className="whitespace-pre-line">{post.body}</div>
        </div>

        {/* Przyciski akcji */}
        <div className="flex items-center gap-4 flex-wrap">
          {/* 🔹 Edytuj — wersja Server Actions */}
          <Link
            href={`/actions/${post.id}/edit`}
            className="px-5 py-2.5 bg-yellow-500 text-white rounded-lg hover:bg-yellow-400 transition font-medium shadow-sm"
          >
            ✏️ Edytuj post (SA)
          </Link>

          {/* 🔹 Usuń — SERVER ACTION */}
          <form action={deletePostAction}>
            <input type="hidden" name="id" value={post.id} />
            <button className="px-5 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition font-medium shadow-sm">
              🗑️ Usuń (SA)
            </button>
          </form>

          {/* 🔹 Powrót */}
          <Link
            href="/actions"
            className="px-5 py-2.5 bg-gray-200 text-gray-900 rounded-lg hover:bg-gray-300 transition font-medium"
          >
            ← Powrót do listy
          </Link>
        </div>
      </article>

      {/* Dodatkowa sekcja */}
      <section className="text-gray-600 text-sm">
        <p>
          Post ID: <span className="font-semibold">{post.id}</span> • User ID:{" "}
          <span className="font-semibold">{post.userId}</span>
        </p>
      </section>
    </main>
  );
}

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

  if (!post || !post.id) notFound();

  return (
    <main className="p-6 max-w-3xl mx-auto">
      <article className="bg-zinc-900 border border-zinc-800 rounded-xl p-8 mb-10">
        <h1 className="text-4xl font-bold text-zinc-100 mb-6 leading-tight">
          {post.title}
        </h1>

        <div className="text-zinc-300 mb-10 leading-relaxed whitespace-pre-line">
          {post.body}
        </div>

        <div className="flex items-center gap-4 flex-wrap">
          <Link
            href={`/actions/${post.id}/edit`}
            className="px-5 py-2.5 bg-yellow-500 hover:bg-yellow-400 text-black rounded-lg transition font-medium"
          >
            ✏️ Edytuj post (SA)
          </Link>

          <form action={deletePostAction}>
            <input type="hidden" name="id" value={post.id} />
            <button className="px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-lg transition font-medium cursor-pointer">
              🗑️ Usuń (SA)
            </button>
          </form>

          <Link
            href="/actions"
            className="px-5 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-100 rounded-lg transition font-medium"
          >
            ← Powrót do listy
          </Link>
        </div>
      </article>

      <section className="text-zinc-500 text-sm">
        <p>
          Post ID: <span className="font-semibold text-zinc-400">{post.id}</span> • User ID:{" "}
          <span className="font-semibold text-zinc-400">{post.userId}</span>
        </p>
      </section>
    </main>
  );
}

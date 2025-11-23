import { getPost } from "@/lib/api";
import { Post } from "@/types/Post";
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

  // jeżeli api zwróci pusty obiekt
  if (!post || !post.id) {
    notFound();
  }

  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
      <p className="text-gray-700 mb-8 whitespace-pre-line">{post.body}</p>
      <Link
        href={`/posts/${post.id}/edit`}
        className="inline-block mr-4 px-4 py-2 bg-yellow-500 text-white rounded hover:bg-amber-400  transition"
      >
        ✏️ Edytuj post
      </Link>
      <DeleteButton id={post.id} />
      <Link
        href={`/`}
        className="inline-block px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400  transition"
      >
        ← Powrót do listy
      </Link>
    </main>
  );
}

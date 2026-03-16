import { getPost } from "@/lib/api";
import type { Post } from "@/types/Post";
import { notFound } from "next/navigation";
import Link from "next/link";
import { updatePostAction } from "@/app/actions";

export default async function EditPostServerActionPage({
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

  if (!post || !post.id) notFound();

  return (
    <main className="p-6 max-w-xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Edytuj post (Server Action)</h1>

      <form action={updatePostAction} className="space-y-4">
        <input type="hidden" name="id" value={post.id} />
        <input type="hidden" name="userId" value={post.userId} />

        <div>
          <label htmlFor="titleInput" className="block mb-1 font-medium">Tytuł</label>
          <input id="titleInput" name="title" defaultValue={post.title} required className="w-full p-2 border rounded" />
        </div>

        <div>
          <label htmlFor="bodyInput" className="block mb-1 font-medium">Treść</label>
          <textarea id="bodyInput" name="body" rows={5} defaultValue={post.body} required className="w-full p-2 border rounded"></textarea>
        </div>

        <button className="px-4 py-2 bg-yellow-500 hover:bg-yellow-400 text-black rounded-lg transition cursor-pointer">
          Zapisz zmiany
        </button>
      </form>

      <Link
        href="/actions"
        className="inline-block px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-100 rounded-lg transition mt-6"
      >
        ← Powrót do listy
      </Link>
    </main>
  );
}

import { createPostAction } from "@/app/actions";
import Link from "next/link";

export default function NewPostServerActionPage() {
  return (
    <main className="p-6 max-w-xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Dodaj nowy post (Server Action)</h1>

      <form action={createPostAction} className="space-y-4">
        <div>
          <label htmlFor="title" className="block mb-1 font-medium">Tytuł</label>
          <input id="title" name="title" required className="w-full p-2 border rounded" />
        </div>

        <div>
          <label htmlFor="body" className="block mb-1 font-medium">Treść</label>
          <textarea id="body" name="body" rows={5} required className="w-full p-2 border rounded"></textarea>
        </div>

        <input type="hidden" name="userId" value="1" />

        <button
          type="submit"
          className="px-4 py-2 bg-slate-600 hover:bg-slate-500 text-white rounded-lg transition cursor-pointer"
        >
          Utwórz post
        </button>
      </form>

      <Link
        href="/actions"
        className="inline-block mt-6 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-100 rounded-lg transition"
      >
        ← Powrót
      </Link>
    </main>
  );
}

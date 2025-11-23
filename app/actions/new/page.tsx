import { createPostAction } from "@/app/actions";
import Link from "next/link";

export default function NewPostServerActionPage() {
  return (
    <main className="p-6 max-w-xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">
        Dodaj nowy post (Server Action)
      </h1>

      {/* 🔹 Formularz wysyła dane do server action */}
      <form action={createPostAction} className="space-y-4">
        <div>
          <label htmlFor="title" className="block mb-1 font-medium">
            Tytuł
          </label>
          <input
            id="title"
            name="title"
            required
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label htmlFor="body" className="block mb-1 font-medium">
            Treść
          </label>
          <textarea
            id="body"
            name="body"
            rows={5}
            required
            className="w-full p-2 border rounded"
          ></textarea>
        </div>

        {/* UserId (ukryty, jak w wersji client) */}
        <input type="hidden" name="userId" value="1" />

        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:opacity-80 transition cursor-pointer"
        >
          Utwórz post
        </button>
      </form>

      {/* Powrót */}
      <Link
        href="/actions"
        className="inline-block mt-6 px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition"
      >
        ← Powrót
      </Link>
    </main>
  );
}

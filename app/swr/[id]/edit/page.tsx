"use client";

import { useEffect, useState } from "react";
import useSWR, { useSWRConfig } from "swr";
import Link from "next/link";
import type { Post } from "@/types/Post";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function EditPostSWRPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const [resolvedId, setResolvedId] = useState<string | null>(null);

  // 🔹 async params → rozpakowujemy tylko raz
  useEffect(() => {
    params.then(({ id }) => setResolvedId(id));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 🔹 stabilny klucz SWR (najważniejsza poprawka)
  const postUrl = resolvedId
    ? `https://jsonplaceholder.typicode.com/posts/${resolvedId}`
    : null;

  const { data: post, error } = useSWR<Post>(postUrl, fetcher);
  const { mutate } = useSWRConfig();

  const [editPost, setEditPost] = useState<Post | null>(null);
  const [updated, setUpdated] = useState<Post | null>(null);
  const [saveError, setSaveError] = useState("");

  // 🔹 kopiujemy posta do formularza, gdy się załaduje
  useEffect(() => {
    if (post) setEditPost(post);
  }, [post]);

  // 🔹 błędy
  if (error) {
    return (
      <p className="p-6 text-red-600">Nie udało się pobrać posta.</p>
    );
  }

  // 🔹 zabezpieczenie podczas refetch SWR
  if (!post || !editPost) {
    return <p className="p-6">Ładowanie...</p>;
  }

  // 🔹 zapis zmian (PUT fake)
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaveError("");
    setUpdated(null);

    try {
      const res = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${editPost!.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(editPost),
        }
      );

      if (!res.ok) throw new Error("Nie udało się zaktualizować posta");

      const result = await res.json();
      setUpdated(result);

      // 🔄 revalidate szczegółów i listy przez SWR
      await mutate(postUrl); // <-- KLUCZOWE
      mutate("https://jsonplaceholder.typicode.com/posts");
    } catch (err: unknown) {
      setSaveError(err instanceof Error ? err.message : "Błąd zapisu");
    }
  }

  function updateField(field: keyof Post, value: string) {
    setEditPost((prev) => (prev ? { ...prev, [field]: value } : prev));
  }

  return (
    <main className="p-6 max-w-xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Edytuj post (SWR)</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="titleInput" className="block mb-1 font-medium">
            Tytuł
          </label>
          <input
            id="titleInput"
            className="w-full p-2 border rounded"
            value={editPost.title}
            onChange={(e) => updateField("title", e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="bodyInput" className="block mb-1 font-medium">
            Treść
          </label>
          <textarea
            id="bodyInput"
            className="w-full p-2 border rounded"
            rows={5}
            value={editPost.body}
            onChange={(e) => updateField("body", e.target.value)}
            required
          ></textarea>
        </div>

        <button className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-300 cursor-pointer transition">
          Zapisz zmiany
        </button>
      </form>

      {saveError && <p className="text-red-600 mt-4">{saveError}</p>}

      {updated && (
        <div className="mt-6 p-4 border border-green-500 bg-green-50 rounded">
          <h2 className="text-xl font-semibold text-green-700 mb-2">
            Fake post zaktualizowany 🎉
          </h2>

          <p>ID: {updated.id}</p>
          <p className="mt-2">
            <strong>Tytuł:</strong> {updated.title}
            <br />
            <strong>Treść:</strong> {updated.body}
          </p>
        </div>
      )}

      <Link
        href="/swr"
        className="inline-block px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition mt-6"
      >
        ← Powrót
      </Link>
    </main>
  );
}

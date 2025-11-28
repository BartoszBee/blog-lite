"use client";

import { useEffect, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchPost } from "@/lib/rqApi";
import Link from "next/link";
import type { Post } from "@/types/Post";

export default function RqEditPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const [id, setId] = useState<string>("");
  const queryClient = useQueryClient();

  // Odbieramy ID z promisa — Twój styl
  useEffect(() => {
    async function unwrap() {
      const p = await params;
      setId(p.id);
    }
    unwrap();
  }, [params]);

  // Hook ZAWSZE wywołany, ale aktywuje się dopiero przy id
  const {
    data: post,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["post", id],
    queryFn: () => fetchPost(id),
    enabled: !!id,
  });

  // Pola do edycji
  const [editPost, setEditPost] = useState<Post | null>(null);
  const [updatedPost, setUpdatedPost] = useState<Post | null>(null);
  const [updateError, setUpdateError] = useState("");

  // Gdy post się załaduje → wrzucamy go do edytowanego stanu
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (post) setEditPost(post);
  }, [post]);

  // Mutacja UPDATE
  const mutation = useMutation({
    mutationFn: async () => {
      if (!editPost) throw new Error("Brak danych posta");
      const res = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${editPost.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(editPost),
        }
      );

      if (!res.ok) {
        throw new Error("Nie udało się zaktualizować posta");
      }

      return res.json(); // JSONPlaceholder zwraca FAKE zaktualizowany post
    },

    onSuccess: (data) => {
      setUpdatedPost(data);

      // Odśwież listę i pojedynczy post
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      queryClient.invalidateQueries({ queryKey: ["post", id] });
    },

    onError: (err: unknown) => {
       if (err instanceof Error) {
        setUpdateError(err.message);
      } else {
        setUpdateError("Nie udało się utworzyć posta");
      }
    },
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setUpdatedPost(null);
    setUpdateError("");
    mutation.mutate();
  }

  if (!id) return <p className="p-6">Ładowanie...</p>;
  if (isLoading) return <p className="p-6">Ładowanie...</p>;

  if (isError) {
    return (
      <p className="p-6 text-red-600">
        Błąd: {(error as Error).message}
      </p>
    );
  }

  if (!editPost) {
    return <p className="p-6 text-red-600">Nie znaleziono posta.</p>;
  }

  return (
    <main className="p-6 max-w-xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Edytuj post (React Query)</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Tytuł</label>
          <input
            className="w-full p-2 border rounded"
            value={editPost.title}
            onChange={(e) =>
              setEditPost((prev) =>
                prev ? { ...prev, title: e.target.value } : prev
              )
            }
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Treść</label>
          <textarea
            className="w-full p-2 border rounded"
            rows={5}
            value={editPost.body}
            onChange={(e) =>
              setEditPost((prev) =>
                prev ? { ...prev, body: e.target.value } : prev
              )
            }
            required
          />
        </div>

        {updateError && <p className="text-red-600">{updateError}</p>}

        <button
          type="submit"
          disabled={mutation.isPending}
          className="px-4 py-2 bg-sky-500 text-white rounded hover:bg-purple-500 disabled:opacity-50"
        >
          {mutation.isPending ? "Zapisuję..." : "Zapisz zmiany"}
        </button>
      </form>

      {/* FAKE UPDATE info */}
      {updatedPost && (
        <div className="mt-6 p-4 border border-green-500 bg-green-50 rounded">
          <h2 className="text-xl font-semibold text-green-700 mb-2">
            Fake post zaktualizowany 🎉
          </h2>

          <p>ID: {updatedPost.id}</p>

          <p className="mt-2">
            <strong>Tytuł:</strong> {updatedPost.title}
            <br />
            <strong>Treść:</strong> {updatedPost.body}
          </p>
        </div>
      )}

      <Link
        href={`/rq/${editPost.id}`}
        className="inline-block px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400 transition mt-6"
      >
        ← Powrót
      </Link>
    </main>
  );
}

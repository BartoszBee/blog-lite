"use client";

import { useEffect, useState } from "react";
import { getPost, updatePost } from "@/lib/api";
import { Post } from "@/types/Post";
import Link from "next/link";

export default function EditPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const [loading, setLoading] = useState(true);
  const [postError, setPostError] = useState("");

  const [post, setPost] = useState<Post | null>(null);
  const [updatedPost, setUpdatedPost] = useState<Post | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const { id } = await params;
        const fetchedPost = await getPost(id);
        setPost(fetchedPost);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setPostError(err.message);
        } else {
          setPostError("Nie udało się pobrać posta");
        }
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [params]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setUpdatedPost(null);
    if (!post) return;

    try {
      const result = await updatePost({
        id: post.id,
        userId: post.userId,
        title: post.title,
        body: post.body,
      });

      setUpdatedPost(result);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setPostError(err.message);
      } else {
        setPostError("Nie udało się zaktualizować posta");
      }
    }
  }

  function updateField(field: keyof Post, value: string) {
    setPost((prev) => (prev ? { ...prev, [field]: value } : prev));
  }

  if (loading) {
    return <p className="p-6">Ładowanie...</p>;
  }

  if (postError) {
    return <p className="p-6 text-red-600">{postError}</p>;
  }

  if (!post) {
    return <p className="p-6 text-red-600">Nie znaleziono posta.</p>;
  }

  return (
    <main className="p-6 max-w-xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Edytuj post</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="titleInput" className="block mb-1 font-medium">
            Tytuł
          </label>
          <input
            id="titleInput"
            className="w-full p-2 border rounded"
            value={post.title}
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
            value={post.body}
            onChange={(e) => updateField("body", e.target.value)}
            required
          />
        </div>

        <button className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-300 cursor-pointer">
          Zapisz zmiany
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
        href={`/`}
        className="inline-block px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400  transition mt-6"
      >
        ← Powrót do listy
      </Link>
    </main>
  );
}

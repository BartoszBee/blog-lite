"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { usePostsStore } from "@/lib/postsStore";

export default function DeleteButtonZustand({ id }: { id: number }) {
  const router = useRouter();
  const { deletePost } = usePostsStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleDelete() {
    setLoading(true);
    setError("");

    try {
      await deletePost(id);
      router.push("/zustand");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Wystąpił błąd przy usuwaniu");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      {error && <p className="text-red-600 mb-2">{error}</p>}

      <button
        onClick={handleDelete}
        disabled={loading}
        className="px-5 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition disabled:opacity-50"
      >
        {loading ? "Usuwam..." : "🗑 Usuń post"}
      </button>
    </div>
  );
}

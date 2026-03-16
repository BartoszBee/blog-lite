"use client";

import { useState } from "react";
import { deletePost } from "@/lib/api";
import { useRouter } from "next/navigation";

export default function DeleteButton({ id }: { id: number }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  async function handleDelete() {
    setLoading(true);
    setError("");

    try {
      await deletePost(id);
      router.push("/");
    } catch (err: unknown) {
      setError(
        err instanceof Error ? err.message : "Nie udało się usunąć posta",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="my-6">
      {error && <p className="text-red-400 mb-2">{error}</p>}
      <button
        onClick={handleDelete}
        disabled={loading}
        className="px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-lg transition font-medium cursor-pointer disabled:opacity-50"
      >
        {loading ? "Usuwanie..." : "🗑️ Usuń post"}
      </button>
    </div>
  );
}

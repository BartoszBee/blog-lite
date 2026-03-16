"use client";

import { useState } from "react";
import { deletePost } from "@/lib/api";
import { useRouter } from "next/navigation";

export default function DeleteButton({ id }: { id: number }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const [error, setError] = useState("");

  async function handleDelete() {
    const confirmDelete = confirm("Czy na pewno chcesz usunąć ten post?");
    if (!confirmDelete) return;

    setLoading(true);
    setError("");

    try {
      await deletePost(id);
      setDeleted(true);
      setTimeout(() => {
        router.push("/");
      }, 2000);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Nie udało się usunąć posta");
    } finally {
      setLoading(false);
    }
  }

  if (deleted) {
    return (
      <div className="mt-6 p-4 border border-red-500/40 rounded-lg bg-red-950/30">
        <h2 className="text-xl font-bold text-red-400 mb-2">Fake post deleted ❌</h2>
        <p className="text-zinc-400">JSONPlaceholder nie usuwa postów — to tylko symulacja.</p>
      </div>
    );
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

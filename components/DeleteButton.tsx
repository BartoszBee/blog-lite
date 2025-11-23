"use client";
import { useState } from "react";
import { deletePost } from "@/lib/api";

export default function DeleteButton({ id }: { id: number }) {
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
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Nie udało się usunąć posta");
      }
    } finally {
      setLoading(false);
    }
  }

  if (deleted) {
    return (
      <div className="mt-6 p-4 border border-red-600 bg-red-50 rounded">
        <h2 className="text-xl font-bold text-red-700 mb-2">
          Fake post deleted ❌
        </h2>
        <p className="text-gray-700">
          JSONPlaceholder nie usuwa postów — to tylko symulacja.
        </p>
      </div>
    );
  }

  return (
    <div className="my-6">
      {error && <p className="text-red-600 mb-2">{error}</p>}

      <button
        onClick={handleDelete}
        disabled={loading}
        className="px-4 py-2 bg-red-600 text-white rounded disabled:opacity-50 hover:bg-red-700"
      >
        {loading ? "Usuwanie..." : "🗑️ Usuń post"}
      </button>
    </div>
  );
}

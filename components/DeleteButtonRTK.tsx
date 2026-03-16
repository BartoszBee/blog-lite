"use client";

import { useRouter } from "next/navigation";
import { useDeletePostMutation } from "@/lib/postsApi";

export default function DeleteButtonRTK({ id }: { id: number }) {
  const router = useRouter();
  const [deletePost, { isLoading }] = useDeletePostMutation();

  async function handleDelete() {
    try {
      await deletePost(id).unwrap();
      router.push("/rtk");
    } catch {
      // błąd ignorowany — JSONPlaceholder zawsze zwraca sukces
    }
  }

  return (
    <button
      onClick={handleDelete}
      disabled={isLoading}
      className="px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-lg transition font-medium disabled:opacity-50"
    >
      {isLoading ? "Usuwam..." : "🗑 Usuń post"}
    </button>
  );
}

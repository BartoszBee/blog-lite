"use client";

import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function DeleteButtonRQ({ id }: { id: number }) {
  const router = useRouter();
  const queryClient = useQueryClient();

  // Mutacja do DELETE
  const mutation = useMutation({
    mutationFn: async () => {
      const res = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${id}`,
        { method: "DELETE" }
      );

      if (!res.ok) {
        throw new Error("Nie udało się usunąć posta");
      }

      // JSONPlaceholder zawsze zwraca {} — udajemy usunięcie
      return res.json();
    },

    // po sukcesie:
    onSuccess: () => {
      // usuwamy pojedynczy post z cache
      queryClient.removeQueries({ queryKey: ["post", id] });

      // odświeżamy listę
      queryClient.invalidateQueries({ queryKey: ["posts"] });

      // wracamy do listy
      router.push("/rq");
    },
  });

  return (
    <button
      onClick={() => mutation.mutate()}
      disabled={mutation.isPending}
      className="px-5 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition disabled:opacity-50"
    >
      {mutation.isPending ? "Usuwam..." : "🗑️ Usuń (RQ)"}
    </button>
  );
}

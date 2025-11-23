"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import type { Post } from "@/types/Post";

// --------------------------------------------------
// CREATE POST (Server Action)
// --------------------------------------------------
export async function createPostAction(formData: FormData) {
  const title = formData.get("title") as string;
  const body = formData.get("body") as string;
  const userId = Number(formData.get("userId") || 1);

  const res = await fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, body, userId }),
  });

  if (!res.ok) {
    throw new Error("Nie udało się utworzyć posta");
  }

  const data = (await res.json()) as { id: number };

  // Odśwież listę postów (działającą w /actions)
  revalidatePath("/actions");

  // Przekierowanie do strony fake posta
  redirect(
    `/actions/${
      data.id ?? 101
    }?fake=1&title=${title}&body=${body}&userId=${userId}`
  );
}

// --------------------------------------------------
// UPDATE POST (Server Action)
// --------------------------------------------------
export async function updatePostAction(formData: FormData) {
  const id = Number(formData.get("id"));
  const title = formData.get("title") as string;
  const body = formData.get("body") as string;
  const userId = Number(formData.get("userId") || 1);

  const post: Post = {
    id,
    title,
    body,
    userId,
  };

  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(post),
  });

  if (!res.ok) {
    throw new Error("Nie udało się zaktualizować posta");
  }

  // JSONPlaceholder zwróci fake updated Obiekt
  await res.json();

  revalidatePath("/actions");
  redirect(`/actions/${id}`);
}

// --------------------------------------------------
// DELETE POST (Server Action)
// --------------------------------------------------
export async function deletePostAction(formData: FormData) {
  const id = Number(formData.get("id"));

  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    throw new Error("Nie udało się usunąć posta");
  }

  // JSONPlaceholder zwraca {}

  revalidatePath("/actions");
  redirect("/actions");
}

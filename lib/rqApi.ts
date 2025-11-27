// lib/rqApi.ts
import { Post } from "@/types/Post";

const BASE_URL = "https://jsonplaceholder.typicode.com";

// Pobranie listy postów
export async function fetchPosts(): Promise<Post[]> {
  const res = await fetch(`${BASE_URL}/posts`);
  if (!res.ok) throw new Error("Nie udało się pobrać postów");
  return res.json();
}

// Pobranie jednego posta
export async function fetchPost(id: number | string): Promise<Post> {
  const res = await fetch(`${BASE_URL}/posts/${id}`);
  if (!res.ok) throw new Error("Nie udało się pobrać posta");
  return res.json();
}

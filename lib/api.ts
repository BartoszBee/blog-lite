import { Post } from "@/types/Post";

const BASE_URL = "https://jsonplaceholder.typicode.com";

export async function getPosts(): Promise<Post[]> {
  const res = await fetch(`${BASE_URL}/posts`);

  if (!res.ok) throw new Error("Nie udało się pobrać listy postów");

  return res.json();
}

export async function getPost(id: string | number): Promise<Post> {
  const res = await fetch(`${BASE_URL}/posts/${id}`);

  if (!res.ok) throw new Error("Nie udało się pobrać posta");
  return res.json();
}

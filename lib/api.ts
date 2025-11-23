import { Post } from "@/types/Post";

const BASE_URL = "https://jsonplaceholder.typicode.com";

export async function getPosts(): Promise<Post[]> {
  const res = await fetch(`${BASE_URL}/posts`);

  if (!res.ok) throw new Error("Nie udało się pobrać listy postów");

  return res.json();
}

import Link from "next/link";
import type { Post } from "@/types/Post";

async function getPosts() {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");

  if (!res.ok) throw new Error("Nie udało się pobrać postów");

  return res.json();
}

export default async function HomePage() {
  const posts: Post[] = await getPosts();

  return (
    <main>
      <h1>Lista postów</h1>
      <Link href="/posts/new">➕ Dodaj nowy post</Link>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <Link href={`/posts/${post.id}`}>{post.title}</Link>
          </li>
        ))}
      </ul>
    </main>
  );
}

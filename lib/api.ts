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

type createPostData = Omit<Post, "id">;

export async function createPost(data: createPostData) {
  const res = await fetch(`${BASE_URL}/posts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: data.title,
      body: data.body,
      userId: data.userId,
    }),
  });

  if (!res.ok) {
    throw new Error("Nie udało się utworzyć posta");
  }

  return res.json();
}

export async function updatePost(post: Post) {
  const res = await fetch(`${BASE_URL}/posts/${post.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(post),
  });
  if (!res.ok) {
    throw new Error("Nie udało się zaktualizować posta");
  }
  return res.json();
}

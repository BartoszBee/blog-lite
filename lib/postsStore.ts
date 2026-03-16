import { create } from "zustand";
import type { Post } from "@/types/Post";

const API = "https://jsonplaceholder.typicode.com/posts";

type PostsState = {
  posts: Post[];
  post: Post | null;
  loading: boolean;
  error: string;

  fetchPosts: () => Promise<void>;
  fetchPost: (id: number) => Promise<void>;
  createPost: (data: { title: string; body: string }) => Promise<Post>;
  updatePost: (post: Post) => Promise<Post>;
  deletePost: (id: number) => Promise<void>;
};

export const usePostsStore = create<PostsState>((set) => ({
  posts: [],
  post: null,
  loading: false,
  error: "",

  fetchPosts: async () => {
    set({ loading: true, error: "" });
    try {
      const res = await fetch(API);
      if (!res.ok) throw new Error("Nie udało się pobrać postów");
      const data: Post[] = await res.json();
      set({ posts: data });
    } catch (err) {
      set({ error: err instanceof Error ? err.message : "Błąd pobierania" });
    } finally {
      set({ loading: false });
    }
  },

  fetchPost: async (id: number) => {
    set({ loading: true, error: "", post: null });
    try {
      const res = await fetch(`${API}/${id}`);
      if (!res.ok) throw new Error("Nie znaleziono posta");
      const data: Post = await res.json();
      set({ post: data });
    } catch (err) {
      set({ error: err instanceof Error ? err.message : "Błąd pobierania" });
    } finally {
      set({ loading: false });
    }
  },

  createPost: async ({ title, body }) => {
    const res = await fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, body, userId: 1 }),
    });
    if (!res.ok) throw new Error("Nie udało się utworzyć posta");
    return res.json();
  },

  updatePost: async (post: Post) => {
    const res = await fetch(`${API}/${post.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(post),
    });
    if (!res.ok) throw new Error("Nie udało się zaktualizować posta");
    return res.json();
  },

  deletePost: async (id: number) => {
    const res = await fetch(`${API}/${id}`, { method: "DELETE" });
    if (!res.ok) throw new Error("Nie udało się usunąć posta");
  },
}));

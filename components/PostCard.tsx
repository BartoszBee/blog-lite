import Link from "next/link";
import type { Post } from "@/types/Post";

type PostCardProps = {
  post: Post;
  action?: "client" | "server" | "rq"; // domyślnie "client"
};

// 🔹 Komponent wyświetlający kartę posta (wersja dual-mode: client/server)
export default function PostCard({ post, action = "client" }: PostCardProps) {
  // wybór ścieżki w zależności od trybu
  const href =
    action === "server"
      ? `/actions/${post.id}`
      : action === "rq"
      ? `/rq/${post.id}`
      : `/posts/${post.id}`;

  return (
    <div className="border rounded-lg p-5 bg-white shadow-sm hover:shadow-md transition-shadow duration-200">
      {/* Tytuł posta */}
      <h2 className="text-xl font-semibold mb-2 text-gray-900">{post.title}</h2>

      {/* Treść skrócona */}
      <p className="text-gray-600 mb-4 leading-relaxed">
        {post.body.length > 120 ? post.body.slice(0, 120) + "..." : post.body}
      </p>

      {/* Link */}
      <Link href={href} className="text-blue-600 font-medium hover:underline">
        Czytaj więcej →
      </Link>
    </div>
  );
}

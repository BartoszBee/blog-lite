import Link from "next/link";
import type { Post } from "@/types/Post";

// 🔹 Komponent wyświetlający ładną kartę posta
export default function PostCard({ post }: { post: Post }) {
  return (
    <div className="border rounded-lg p-5 bg-white shadow-sm hover:shadow-md transition-shadow duration-200">
      {/* Tytuł posta */}
      <h2 className="text-xl font-semibold mb-2 text-gray-900">{post.title}</h2>

      {/* Treść skrócona do ok. 120 znaków */}
      <p className="text-gray-600 mb-4 leading-relaxed">
        {post.body.length > 120 ? post.body.slice(0, 120) + "..." : post.body}
      </p>

      {/* Link */}
      <Link
        href={`/posts/${post.id}`}
        className="text-blue-600 font-medium hover:underline"
      >
        Czytaj więcej →
      </Link>
    </div>
  );
}

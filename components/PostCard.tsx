import Link from "next/link";
import type { Post } from "@/types/Post";

type PostCardProps = {
  post: Post;
  action?: "client" | "server" | "rq" | "swr" | "zustand" | "rtk";
};

const accentColor: Record<string, string> = {
  client: "group-hover:text-indigo-400",
  server: "group-hover:text-slate-300",
  rq: "group-hover:text-sky-400",
  swr: "group-hover:text-emerald-400",
  zustand: "group-hover:text-violet-400",
  rtk: "group-hover:text-orange-400",
};

export default function PostCard({ post, action = "client" }: PostCardProps) {
  const paths: Record<string, string> = {
    client: "/posts",
    server: "/actions",
    rq: "/rq",
    swr: "/swr",
    zustand: "/zustand",
    rtk: "/rtk",
  };

  const href = `${paths[action] ?? "/posts"}/${post.id}`;

  return (
    <Link href={href} className="group block">
      <div className="border border-zinc-800 rounded-xl p-5 bg-zinc-900 hover:border-zinc-600 hover:bg-zinc-800/50 transition-all duration-200">
        <h2 className="text-base font-semibold mb-1.5 text-zinc-100 group-hover:text-white transition-colors">
          {post.title}
        </h2>
        <p className="text-zinc-500 mb-3 leading-relaxed text-sm">
          {post.body.length > 120 ? post.body.slice(0, 120) + "..." : post.body}
        </p>
        <span className={`text-sm font-medium text-zinc-400 transition-colors ${accentColor[action]}`}>
          Czytaj więcej →
        </span>
      </div>
    </Link>
  );
}

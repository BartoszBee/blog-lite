export default function ZustandLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl min-h-[70vh] overflow-hidden">
      <div className="h-1 bg-violet-500" />
      <div className="p-6">{children}</div>
    </div>
  );
}

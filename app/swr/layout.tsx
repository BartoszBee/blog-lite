export default function SwrLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-green-300 p-6 rounded-lg min-h-[70vh]">      
      <div className="mx-auto max-w-4xl py-8 px-4">{children}</div>
    </div>
  );
}

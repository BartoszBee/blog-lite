export default function ActionsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-gray-500 p-6 rounded-lg min-h-[70vh]">{children}</div>
  );
}

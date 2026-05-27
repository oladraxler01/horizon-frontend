"use client";

export default function LendingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#fcf9f2] dark:bg-stone-900">
      {children}
    </div>
  );
}
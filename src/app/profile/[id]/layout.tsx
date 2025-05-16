// src/app/profile/[id]/layout.tsx
export default function Layout({
  children,
  modals,
}: {
  children: React.ReactNode;
  modals: React.ReactNode;
}) {
  return (
    <>
      {children}
      {modals}
    </>
  );
}

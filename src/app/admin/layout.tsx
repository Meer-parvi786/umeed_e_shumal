import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Dashboard | Umeed e Shumaal",
  description: "Umeed e Shumaal - Admin Dashboard",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

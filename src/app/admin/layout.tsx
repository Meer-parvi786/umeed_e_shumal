import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Dashboard | SYWF",
  description: "Skardu Youth Welfare Foundation - Admin Dashboard",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

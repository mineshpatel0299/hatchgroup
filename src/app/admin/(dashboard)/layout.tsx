import { redirect } from "next/navigation";
import { isAuthenticated } from "@/lib/auth";
import Sidebar from "@/components/admin/Sidebar";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  if (!(await isAuthenticated())) {
    redirect("/admin/login");
  }

  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 min-w-0 px-8 md:px-12 py-10">{children}</main>
    </div>
  );
}

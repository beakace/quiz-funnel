"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session } = useSession();
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut({ redirect: false });
    router.push("/login");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="border-b bg-white">
        <div className="container mx-auto py-4 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold">
            RentOptimizer
          </Link>
          <nav className="flex items-center gap-4">
            <Link href="/dashboard">
              <Button variant="ghost">Dashboard</Button>
            </Link>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">
                {session?.user?.email}
              </span>
              <Button variant="outline" onClick={handleSignOut}>
                Sign Out
              </Button>
            </div>
          </nav>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-4 mb-8">
          <Link href="/dashboard">
            <Button variant="ghost">Podsumowanie</Button>
          </Link>
          <Link href="/dashboard/leads">
            <Button variant="ghost">
              Leady (
              {typeof window !== "undefined"
                ? JSON.parse(localStorage.getItem("quiz_leads") || "[]").length
                : 0}
              )
            </Button>
          </Link>
        </div>

        {children}
      </div>
    </div>
  );
}

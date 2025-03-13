"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session } = useSession();
  const router = useRouter();
  const [leadCount, setLeadCount] = useState(0);

  // Fetch lead count from API
  useEffect(() => {
    async function fetchLeadCount() {
      try {
        const response = await fetch("/api/leads");
        if (response.ok) {
          const leads = await response.json();
          setLeadCount(leads.length);
        }
      } catch (error) {
        console.error("Error fetching lead count:", error);
      }
    }

    fetchLeadCount();

    // Set up polling to refresh lead count every 30 seconds
    const intervalId = setInterval(fetchLeadCount, 30000);

    // Clean up interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

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
            <Button variant="ghost">Leady ({leadCount})</Button>
          </Link>
        </div>

        {children}
      </div>
    </div>
  );
}

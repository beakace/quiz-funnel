import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="border-b bg-white">
        <div className="container mx-auto py-4 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold">
            RentOptimizer
          </Link>
          <nav>
            <Link href="/dashboard">
              <Button variant="ghost">Dashboard</Button>
            </Link>
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

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section with Header Image */}
      <div className="relative h-[500px] w-full">
        <Image
          src="/header.jpg"
          alt="Luxury vacation rental property"
          fill
          className="object-cover brightness-75"
          priority
        />
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Zoptymalizuj Swój Wynajem Krótkoterminowy
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl">
            Dowiedz się, jak zwiększyć zyski i zautomatyzować zarządzanie swoją
            nieruchomością
          </p>
          <Link href="/quiz/rental-optimization">
            <Button size="lg" className="text-lg px-8">
              Rozpocznij Quiz
            </Button>
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Jak Możemy Ci Pomóc?
          </h2>

          <div className="grid gap-8 md:grid-cols-2">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">
                Dla Kogo Jest Ten Quiz?
              </h3>
              <ul className="space-y-3 text-gray-600">
                <li>✓ Właścicieli mieszkań na wynajem krótkoterminowy</li>
                <li>✓ Osób planujących rozpoczęcie wynajmu</li>
                <li>✓ Zarządców nieruchomości</li>
                <li>✓ Inwestorów w nieruchomości</li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Co Otrzymasz?</h3>
              <ul className="space-y-3 text-gray-600">
                <li>✓ Spersonalizowaną analizę Twojej nieruchomości</li>
                <li>✓ Konkretne wskazówki optymalizacyjne</li>
                <li>✓ Plan działania dostosowany do Twoich potrzeb</li>
                <li>✓ Konsultację z ekspertem</li>
              </ul>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link href="/quiz/rental-optimization">
              <Button size="lg" className="text-lg">
                Rozpocznij Quiz
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}

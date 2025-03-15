import Image from "next/image";
import { AnimatedButton } from "@/components/ui/animated-button";

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="bg-white relative overflow-visible">
        {/* Decorative elements - enhanced to overflow more */}
        {/* <div className="absolute top-0 left-0 w-96 h-96 bg-primary/5 rounded-full -translate-x-1/3 -translate-y-1/3 z-0"></div>
        <div className="absolute bottom-0 right-0 w-[30rem] h-[30rem] bg-secondary/5 rounded-full translate-x-1/4 translate-y-1/4 z-0"></div>
        <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-orange-100/5 rounded-full z-0"></div>
        <div className="absolute bottom-1/4 left-1/3 w-48 h-48 bg-yellow-100/5 rounded-full z-0"></div> */}

        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between py-20 gap-12">
            <div className="flex-1 text-center md:text-left">
              <span className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary font-medium text-sm mb-6">
                Optymalizacja wynajmu
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-[#3D3D3D] leading-tight">
                Sprawdź, ile możesz zyskać na wynajmie bez dodatkowej pracy!
              </h1>
              <p className="text-xl md:text-2xl mb-10 max-w-2xl text-[#3D3D3D]/80 leading-relaxed">
                Dowiedz się, jak zwiększyć zyski i zautomatyzować zarządzanie
                swoją nieruchomością
              </p>
              <AnimatedButton href="/quiz/rental-optimization">
                Rozpocznij Quiz
              </AnimatedButton>
            </div>
            <div className="relative w-72 h-72 md:w-96 md:h-96 flex-shrink-0">
              <div className="absolute inset-0 bg-primary rounded-full transform "></div>
              <Image
                src="/quiz-header.png"
                alt="Happy property owner"
                fill
                className="object-cover rounded-2xl"
                priority
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16 relative">
        {/* Additional decorative elements for the content section */}
        {/* <div className="absolute -top-24 -left-24 w-48 h-48 bg-orange-100/10 rounded-full z-0"></div>
        <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-yellow-100/15 rounded-full z-0"></div> */}

        <div className="max-w-4xl mx-auto relative z-10">
          <h2 className="text-3xl font-bold text-center mb-12 text-[#3D3D3D]">
            Jak Możemy Ci Pomóc?
          </h2>

          <div className="grid gap-8 md:grid-cols-2">
            <div className="bg-white p-6 rounded-lg shadow-md border border-border">
              <h3 className="text-xl font-semibold mb-4 text-[#3D3D3D]">
                Dla Kogo Jest Ten Quiz?
              </h3>
              <ul className="space-y-3 text-[#3D3D3D]">
                <li>✓ Właścicieli mieszkań na wynajem krótkoterminowy</li>
                <li>✓ Osób planujących rozpoczęcie wynajmu</li>
                <li>✓ Zarządców nieruchomości</li>
                <li>✓ Inwestorów w nieruchomości</li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md border border-border">
              <h3 className="text-xl font-semibold mb-4 text-[#3D3D3D]">
                Co Otrzymasz?
              </h3>
              <ul className="space-y-3 text-[#3D3D3D]">
                <li>✓ Spersonalizowaną analizę Twojej nieruchomości</li>
                <li>✓ Konkretne wskazówki optymalizacyjne</li>
                <li>✓ Plan działania dostosowany do Twoich potrzeb</li>
                <li>✓ Konsultację z ekspertem</li>
              </ul>
            </div>
          </div>

          <div className="text-center mt-12">
            <AnimatedButton href="/quiz/rental-optimization">
              Rozpocznij Quiz
            </AnimatedButton>
          </div>
        </div>
      </div>
    </main>
  );
}

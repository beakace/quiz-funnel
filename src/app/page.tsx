import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b">
        <div className="container mx-auto py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold">RentOptimizer</h1>
          <div className="flex items-center gap-4">
            <Link href="/kontakt">
              <Button variant="ghost">Kontakt</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <section className="py-20 bg-gradient-to-b from-white to-slate-200">
          <div className="container mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 max-w-4xl mx-auto">
              Sprawdź, ile możesz zyskać na wynajmie bez dodatkowej pracy!
            </h2>
            <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto">
              Wypełnij krótki quiz i dowiedz się, jak zwiększyć swoje zyski z
              wynajmu nawet o 40%, jednocześnie poświęcając mniej czasu na
              zarządzanie nieruchomością.
            </p>
            <div className="flex justify-center">
              <Link href="/quiz/rental-optimization">
                <Button size="lg" className="px-8 py-6 text-lg">
                  Rozpocznij Quiz (2 min)
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">
              Co zyskasz wypełniając quiz?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>Spersonalizowana Analiza</CardTitle>
                  <CardDescription>
                    Poznaj potencjał swojej nieruchomości
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p>
                    Otrzymasz szczegółową analizę potencjału Twojej
                    nieruchomości oraz konkretne wskazówki, jak zwiększyć jej
                    dochodowość.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Kalkulacja Oszczędności</CardTitle>
                  <CardDescription>
                    Zobacz, ile czasu możesz zaoszczędzić
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p>
                    Dowiesz się, ile czasu możesz zaoszczędzić dzięki
                    automatyzacji i profesjonalnemu zarządzaniu najmem.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Plan Działania</CardTitle>
                  <CardDescription>Otrzymaj gotowe rozwiązania</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>
                    Dostaniesz konkretny plan działania, jak zoptymalizować swój
                    wynajem i zwiększyć zyski bez dodatkowej pracy.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="py-20 bg-gray-50">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">
              Dla Kogo Jest Ten Quiz?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                {
                  title: "Właściciele Apartamentów",
                  description:
                    "Posiadasz jeden lub więcej apartamentów na wynajem",
                },
                {
                  title: "Początkujący",
                  description:
                    "Dopiero zaczynasz przygodę z wynajmem krótkoterminowym",
                },
                {
                  title: "Doświadczeni Wynajmujący",
                  description:
                    "Chcesz zoptymalizować obecny proces zarządzania",
                },
                {
                  title: "Inwestorzy",
                  description: "Planujesz zakup nieruchomości pod wynajem",
                },
              ].map((item) => (
                <Card key={item.title} className="text-center p-6">
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-gray-600 text-sm">{item.description}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl font-bold mb-8">
              Nie czekaj - sprawdź potencjał swojej nieruchomości!
            </h2>
            <Link href="/quiz/rental-optimization">
              <Button size="lg" className="px-8 py-6 text-lg">
                Rozpocznij Bezpłatny Quiz
              </Button>
            </Link>
          </div>
        </section>
      </main>

      <footer className="border-t py-8">
        <div className="container mx-auto text-center text-gray-500">
          <p>
            &copy; {new Date().getFullYear()} RentOptimizer. Wszystkie prawa
            zastrzeżone.
          </p>
        </div>
      </footer>
    </div>
  );
}

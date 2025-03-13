"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function ThankYouPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <Card className="w-full max-w-3xl mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl text-center">
              Dziękujemy za wypełnienie quizu!
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center text-gray-600">
              <p className="mb-4">
                Twoje odpowiedzi zostały zapisane. Nasz zespół przeanalizuje je
                i przygotuje spersonalizowane rekomendacje dotyczące
                optymalizacji Twojego wynajmu.
              </p>
              <p>
                Skontaktujemy się z Tobą w ciągu 24 godzin, aby omówić szczegóły
                i przedstawić plan działania.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-center">Co dalej?</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-600">
                <li>Przeanalizujemy Twoje odpowiedzi</li>
                <li>Przygotujemy spersonalizowane rekomendacje</li>
                <li>Skontaktujemy się z Tobą, aby omówić szczegóły</li>
                <li>Wspólnie ustalimy plan działania</li>
              </ul>
            </div>

            <div className="flex justify-center pt-4">
              <Link href="/">
                <Button>Wróć na stronę główną</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

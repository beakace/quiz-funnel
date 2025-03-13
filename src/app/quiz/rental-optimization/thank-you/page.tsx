"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ThankYouPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        <Card className="w-full max-w-3xl mx-auto overflow-hidden">
          <div className="bg-primary h-2 w-full"></div>
          <CardHeader className="text-center">
            <div className="mx-auto mb-6 bg-primary/10 p-3 rounded-full w-16 h-16 flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-primary"
              >
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
            </div>
            <CardTitle className="text-3xl font-bold text-center text-primary">
              Dziękujemy za wypełnienie quizu!
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-8">
            <div className="text-center text-gray-600">
              <p className="mb-4 text-lg">
                Twoje odpowiedzi zostały zapisane. Nasz zespół przeanalizuje je
                i przygotuje spersonalizowane rekomendacje dotyczące
                optymalizacji Twojego wynajmu.
              </p>
              <p className="text-lg">
                Skontaktujemy się z Tobą w ciągu 24 godzin, aby omówić szczegóły
                i przedstawić plan działania.
              </p>
            </div>

            <div className="bg-secondary/10 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-center text-secondary mb-4">
                Co dalej?
              </h3>
              <ul className="space-y-3">
                {[
                  "Przeanalizujemy Twoje odpowiedzi",
                  "Przygotujemy spersonalizowane rekomendacje",
                  "Skontaktujemy się z Tobą, aby omówić szczegóły",
                  "Wspólnie ustalimy plan działania",
                ].map((step, index) => (
                  <li key={index} className="flex items-start">
                    <span className="bg-secondary text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0">
                      {index + 1}
                    </span>
                    <span className="text-gray-700">{step}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex justify-center pt-4">
              <Link
                href="/"
                className="bg-primary hover:bg-primary/90 text-white py-3 px-8 rounded-md transition-colors inline-flex items-center"
              >
                <span>Wróć na stronę główną</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="ml-2"
                >
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { rentalQuiz } from "@/lib/quiz-data";
import { QuizResult } from "@/lib/types";

// Loading component to show while waiting for the result
function ResultLoading() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <Card className="w-full max-w-3xl mx-auto overflow-hidden">
        <div className="bg-primary h-2 w-full"></div>
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-center text-primary">
            Ładowanie wyników...
          </CardTitle>
        </CardHeader>
      </Card>
    </div>
  );
}

// Component that uses useSearchParams
function ResultContent() {
  const searchParams = useSearchParams();
  const resultId = searchParams.get("id");
  const [result, setResult] = useState<QuizResult | null>(null);

  useEffect(() => {
    if (resultId) {
      const foundResult = rentalQuiz.results.find((r) => r.id === resultId);
      if (foundResult) {
        setResult(foundResult);
      }
    }
  }, [resultId]);

  if (!result) {
    return <ResultLoading />;
  }

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
              {result.title}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-8">
            <div className="text-center text-gray-600">
              <p className="mb-4 text-lg">{result.description}</p>
            </div>

            <div className="bg-secondary/10 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-center text-secondary mb-4">
                Nasze rekomendacje dla Ciebie:
              </h3>
              <ul className="space-y-3">
                {result.recommendations.map((recommendation, index) => (
                  <li key={index} className="flex items-start">
                    <span className="bg-secondary text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0">
                      {index + 1}
                    </span>
                    <span className="text-gray-700">{recommendation}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="text-center text-gray-600">
              <p className="mb-4 text-lg">
                Dziękujemy za wypełnienie quizu! Nasz zespół skontaktuje się z
                Tobą w ciągu 24 godzin, aby omówić szczegóły i przedstawić
                spersonalizowany plan działania.
              </p>
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

// Main component with Suspense boundary
export default function ResultPage() {
  return (
    <Suspense fallback={<ResultLoading />}>
      <ResultContent />
    </Suspense>
  );
}

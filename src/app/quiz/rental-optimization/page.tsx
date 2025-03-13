"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { QuizQuestion } from "@/components/quiz/QuizQuestion";
import { LeadForm } from "@/components/quiz/LeadForm";
import { rentalQuiz } from "@/lib/quiz-data";
import { QuizAnswers, LeadFormData } from "@/lib/types";
import { Progress } from "@/components/ui/progress";
import { saveLead } from "@/lib/leads";

export default function QuizPage() {
  const router = useRouter();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswers>({});
  const [showLeadForm, setShowLeadForm] = useState(false);

  const currentQuestion = rentalQuiz.questions[currentQuestionIndex];
  const progress =
    ((currentQuestionIndex + 1) / rentalQuiz.questions.length) * 100;

  const handleAnswer = (questionId: string, answerId: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: answerId }));

    if (currentQuestionIndex === rentalQuiz.questions.length - 1) {
      setShowLeadForm(true);
    } else {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  const handleLeadSubmit = async (data: LeadFormData) => {
    try {
      // Save lead data with the quiz ID
      await saveLead(data, answers, "rental-optimization");

      // Redirect to thank you page
      router.push("/quiz/rental-optimization/thank-you");
    } catch (error) {
      console.error("Error saving lead:", error);
      alert("Wystąpił błąd podczas zapisywania danych. Spróbuj ponownie.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Progress value={progress} className="w-full" />
          <p className="text-center mt-2 text-sm text-gray-600">
            Pytanie {currentQuestionIndex + 1} z {rentalQuiz.questions.length}
          </p>
        </div>

        {!showLeadForm ? (
          <QuizQuestion
            question={currentQuestion}
            onAnswer={handleAnswer}
            selectedAnswer={answers[currentQuestion.id]}
          />
        ) : (
          <LeadForm onSubmit={handleLeadSubmit} quizId="rental-optimization" />
        )}
      </div>
    </div>
  );
}

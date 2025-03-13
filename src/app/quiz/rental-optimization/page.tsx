"use client";

import { useState, useEffect } from "react";
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
  const [score, setScore] = useState(0);
  const [resultId, setResultId] = useState<string | null>(null);
  const [isNonRentingOwner, setIsNonRentingOwner] = useState(false);

  const currentQuestion = rentalQuiz.questions[currentQuestionIndex];
  const progress =
    ((currentQuestionIndex + 1) / rentalQuiz.questions.length) * 100;

  // Determine if we're at the milestone question (question 5)
  const isMilestoneQuestion = currentQuestionIndex === 4;

  // Determine if we've passed the milestone
  const hasPastMilestone = currentQuestionIndex > 4;

  // Calculate the result based on the score
  useEffect(() => {
    if (showLeadForm) {
      if (isNonRentingOwner) {
        setResultId("non_renting_owner");
      } else {
        const result = rentalQuiz.results.find(
          (r) =>
            score >= r.minScore &&
            score <= r.maxScore &&
            r.id !== "non_renting_owner"
        );
        if (result) {
          setResultId(result.id);
        }
      }
    }
  }, [showLeadForm, score, isNonRentingOwner]);

  const handleAnswer = (questionId: string, answerId: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: answerId }));

    // Find the question and selected option to get the points
    const question = rentalQuiz.questions.find((q) => q.id === questionId);
    const selectedOption = question?.options.find((o) => o.id === answerId);

    if (selectedOption) {
      // Add points to the score
      setScore((prevScore) => prevScore + selectedOption.points);
    }

    // Check if this is question 5 (rental_management) and the answer is "none"
    if (questionId === "rental_management" && answerId === "none") {
      setIsNonRentingOwner(true);
      setShowLeadForm(true);
      return;
    }

    if (currentQuestionIndex === rentalQuiz.questions.length - 1) {
      setShowLeadForm(true);
    } else {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  const handleLeadSubmit = async (data: LeadFormData) => {
    try {
      // Save lead data with the quiz ID and score
      const leadData = {
        ...data,
        score: isNonRentingOwner ? -1 : score, // Special score for non-renting owners
        resultId,
      };

      await saveLead(leadData, answers, "rental-optimization");

      // Redirect to result page with the result ID
      router.push(`/quiz/rental-optimization/result?id=${resultId}`);
    } catch (error) {
      console.error("Error saving lead:", error);
      alert("Wystąpił błąd podczas zapisywania danych. Spróbuj ponownie.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="relative mb-2">
            <Progress value={progress} className="w-full" />
            {/* Milestone marker at 50% */}
            <div
              className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full border-2 ${
                hasPastMilestone
                  ? "bg-primary border-primary"
                  : "bg-white border-primary"
              } flex items-center justify-center z-10`}
            >
              {hasPastMilestone && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-white"
                >
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              )}
            </div>
          </div>
          <div className="flex justify-between text-sm text-gray-600">
            <span>Podstawowe informacje</span>
            <span>Szczegóły zarządzania</span>
          </div>
          <p className="text-center mt-2 text-sm text-gray-600">
            Pytanie {currentQuestionIndex + 1} z {rentalQuiz.questions.length}
            {isMilestoneQuestion && (
              <span className="ml-2 text-primary font-medium">
                (Kluczowe pytanie)
              </span>
            )}
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

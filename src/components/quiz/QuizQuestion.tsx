import { QuizQuestion as QuizQuestionType } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface QuizQuestionProps {
  question: QuizQuestionType;
  onAnswer: (questionId: string, answerId: string) => void;
  selectedAnswer?: string;
}

export function QuizQuestion({
  question,
  onAnswer,
  selectedAnswer,
}: QuizQuestionProps) {
  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl">{question.question}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          {question.options.map((option) => (
            <Button
              key={option.id}
              variant={selectedAnswer === option.id ? "default" : "outline"}
              className="w-full justify-start text-left h-auto py-6 px-4"
              onClick={() => onAnswer(question.id, option.id)}
            >
              {option.text}
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

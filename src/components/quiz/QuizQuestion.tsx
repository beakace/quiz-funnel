import { QuizQuestion as QuizQuestionType } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

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
              className={cn(
                "w-full justify-start text-left h-auto py-4 px-4 whitespace-normal",
                "transition-all duration-200",
                selectedAnswer === option.id
                  ? "scale-[1.02] shadow-md"
                  : "hover:scale-[1.01] hover:shadow-sm hover:border-primary/50",
                "md:py-6"
              )}
              onClick={() => onAnswer(question.id, option.id)}
            >
              <span className="break-words">{option.text}</span>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

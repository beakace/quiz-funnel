import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// Define the quiz type
type Quiz = {
  id: string;
  title: string;
  description?: string;
  slug: string;
  published: boolean;
  questionsCount?: number;
  leadsCount?: number;
};

export default function QuizzesPage() {
  // Mock data for demonstration
  const quizzes: Quiz[] = [];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Quizzes</h1>
        <Link href="/dashboard/quizzes/new">
          <Button>Create New Quiz</Button>
        </Link>
      </div>

      {quizzes.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {quizzes.map((quiz) => (
            <Card key={quiz.id}>
              <CardHeader>
                <CardTitle>{quiz.title}</CardTitle>
                <CardDescription>
                  {quiz.published ? (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Published
                    </span>
                  ) : (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                      Draft
                    </span>
                  )}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-500 line-clamp-2">
                  {quiz.description || "No description provided."}
                </p>
                <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <p className="text-gray-500">Questions</p>
                    <p className="font-medium">{quiz.questionsCount || 0}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Leads</p>
                    <p className="font-medium">{quiz.leadsCount || 0}</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Link href={`/dashboard/quizzes/${quiz.id}`}>
                  <Button variant="outline" size="sm">
                    Edit
                  </Button>
                </Link>
                <Link href={`/quiz/${quiz.slug}`} target="_blank">
                  <Button variant="ghost" size="sm">
                    View
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="border rounded-lg overflow-hidden">
          <div className="p-8 text-center">
            <p className="text-gray-500 mb-4">
              You haven&apos;t created any quizzes yet.
            </p>
            <Link href="/dashboard/quizzes/new">
              <Button>Create Your First Quiz</Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

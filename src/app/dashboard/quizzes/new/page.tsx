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
import { Input } from "@/components/ui/input";
import {
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
} from "@/components/ui/form";

export default function NewQuizPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Create New Quiz</h1>
        <Link href="/dashboard/quizzes">
          <Button variant="outline">Cancel</Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Quiz Details</CardTitle>
          <CardDescription>
            Enter the basic information about your quiz.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-6">
            <FormItem>
              <FormLabel>Quiz Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter quiz title" />
              </FormControl>
              <FormDescription>
                This will be displayed as the headline of your quiz.
              </FormDescription>
            </FormItem>

            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <textarea
                  className="flex min-h-24 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder="Enter a description for your quiz"
                />
              </FormControl>
              <FormDescription>
                Briefly describe what this quiz is about.
              </FormDescription>
            </FormItem>

            <FormItem>
              <FormLabel>Slug</FormLabel>
              <FormControl>
                <Input placeholder="quiz-name" />
              </FormControl>
              <FormDescription>
                This will be used in the URL: yourdomain.com/quiz/quiz-name
              </FormDescription>
            </FormItem>
          </form>
        </CardContent>
        <CardFooter className="flex justify-end gap-2">
          <Button variant="outline">Save as Draft</Button>
          <Button>Continue to Questions</Button>
        </CardFooter>
      </Card>
    </div>
  );
}

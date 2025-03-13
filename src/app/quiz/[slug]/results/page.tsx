import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

export default function ResultsPage({ params }: { params: { slug: string } }) {
  // In a real implementation, we would fetch the results based on the slug and user's answers
  console.log(`Showing results for quiz: ${params.slug}`);

  // Mock data for demonstration
  const result = {
    title: "Vacation Rental Optimization Expert",
    description:
      "You have a strong understanding of how to optimize vacation rental properties for maximum occupancy and revenue. Your approach to property management is strategic and data-driven.",
    score: 85,
    recommendations: [
      "Consider implementing dynamic pricing to maximize revenue during peak seasons",
      "Invest in professional photography to make your listings stand out",
      "Automate guest communications to improve the guest experience",
      "Collect and showcase more guest reviews to build trust with potential guests",
    ],
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-3xl">
        <Card>
          <CardHeader className="text-center">
            <div className="mb-4 inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-green-800 text-2xl font-bold">
              {result.score}%
            </div>
            <CardTitle className="text-3xl">{result.title}</CardTitle>
            <CardDescription className="text-lg">
              {result.description}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-3">Recommendations</h3>
                <ul className="space-y-2">
                  {result.recommendations.map((recommendation, index) => (
                    <li key={index} className="flex items-start">
                      <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-blue-800 text-sm font-medium mr-3 flex-shrink-0">
                        {index + 1}
                      </span>
                      <span>{recommendation}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button className="w-full">Download Full Report</Button>
            <div className="text-center text-sm text-gray-500">
              <p>
                Want to learn more about optimizing your property management?
              </p>
              <Link href="/" className="text-blue-600 hover:underline">
                Visit our website
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function TestComponent() {
  return (
    <div className="p-4">
      <Card>
        <CardHeader>
          <CardTitle>Test Component</CardTitle>
          <CardDescription>
            This is a test component to verify that our UI components are
            working correctly.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>
            If you can see this card with proper styling, then the UI components
            are working correctly.
          </p>
        </CardContent>
        <CardFooter>
          <Button>Test Button</Button>
        </CardFooter>
      </Card>
    </div>
  );
}

"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { LeadFormData } from "@/lib/types";

interface LeadFormProps {
  onSubmit: (data: LeadFormData) => void;
  quizId: string;
}

export function LeadForm({ onSubmit, quizId }: LeadFormProps) {
  const router = useRouter();
  const [formData, setFormData] = useState<LeadFormData>({
    name: "",
    email: "",
    phone: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await onSubmit(formData);
      router.push(`/quiz/${quizId}/thank-you`);
    } catch (error) {
      console.error("Error submitting lead:", error);
      alert("Wystąpił błąd podczas zapisywania danych. Spróbuj ponownie.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl text-center">
          Otrzymaj spersonalizowany raport i dowiedz się, jak zwiększyć swoje
          zyski!
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Input
              placeholder="Imię i nazwisko"
              name="name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
            />
          </div>
          <div>
            <Input
              type="email"
              name="email"
              placeholder="Adres email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              required
            />
          </div>
          <div>
            <Input
              type="tel"
              name="phone"
              placeholder="Numer telefonu (opcjonalnie)"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
            />
          </div>
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Zapisywanie..." : "Otrzymaj Raport"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

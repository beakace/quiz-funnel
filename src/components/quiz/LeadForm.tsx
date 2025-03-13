"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { LeadFormData } from "@/lib/types";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface LeadFormProps {
  onSubmit: (data: LeadFormData) => void;
  quizId?: string;
}

export function LeadForm({ onSubmit, quizId }: LeadFormProps) {
  const [formData, setFormData] = useState<LeadFormData>({
    name: "",
    email: "",
    phone: "",
    sendResultsViaEmail: true,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Imię jest wymagane";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email jest wymagany";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Niepoprawny format adresu email";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, sendResultsViaEmail: checked }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      setIsSubmitting(true);
      try {
        await onSubmit({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          quizId: quizId,
          sendResultsViaEmail: formData.sendResultsViaEmail,
        });
      } catch (error) {
        console.error("Error submitting form:", error);
      } finally {
        setIsSubmitting(false);
      }
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
              onChange={handleChange}
              required
              className={`w-full p-3 border rounded-md ${
                errors.name ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-500">{errors.name}</p>
            )}
          </div>
          <div>
            <Input
              type="email"
              name="email"
              placeholder="Adres email"
              value={formData.email}
              onChange={handleChange}
              required
              className={`w-full p-3 border rounded-md ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-500">{errors.email}</p>
            )}
          </div>
          <div>
            <Input
              type="tel"
              name="phone"
              placeholder="Numer telefonu (opcjonalnie)"
              value={formData.phone}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md"
            />
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="sendResultsViaEmail"
              checked={formData.sendResultsViaEmail}
              onCheckedChange={handleCheckboxChange}
            />
            <Label
              htmlFor="sendResultsViaEmail"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Wyślij moje wyniki i rekomendacje na podany adres email
            </Label>
          </div>
          <div className="text-sm text-gray-500 mt-2">
            <p>Otrzymasz:</p>
            <ul className="list-disc pl-5 mt-1 space-y-1">
              <li>Szczegółową analizę Twojego wyniku</li>
              <li>Personalizowane rekomendacje</li>
              <li>Dodatkowe materiały pomocnicze</li>
            </ul>
          </div>
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Zapisywanie..." : "Otrzymaj Raport"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

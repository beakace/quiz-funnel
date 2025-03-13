"use client";

import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getLeads, Lead } from "@/lib/leads";
import { rentalQuiz } from "@/lib/quiz-data";

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);

  useEffect(() => {
    setLeads(getLeads());
  }, []);

  function formatDate(dateString: string) {
    return new Date(dateString).toLocaleString("pl-PL");
  }

  function getAnswerText(questionId: string, answerId: string) {
    const question = rentalQuiz.questions.find((q) => q.id === questionId);
    if (!question) return answerId;

    const option = question.options.find((o) => o.id === answerId);
    return option?.text || answerId;
  }

  return (
    <div className="container mx-auto py-8">
      <Card>
        <CardHeader>
          <CardTitle>Zebrane Leady</CardTitle>
          <CardDescription>
            Lista osób, które wypełniły quiz i zostawiły swoje dane kontaktowe
          </CardDescription>
        </CardHeader>
        <CardContent>
          {leads.length === 0 ? (
            <p className="text-center py-8 text-gray-500">
              Brak zebranych leadów
            </p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Data</TableHead>
                  <TableHead>Imię i nazwisko</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Telefon</TableHead>
                  <TableHead>Szczegóły</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {leads.map((lead) => (
                  <TableRow key={lead.id}>
                    <TableCell>{formatDate(lead.createdAt)}</TableCell>
                    <TableCell>{lead.name}</TableCell>
                    <TableCell>{lead.email}</TableCell>
                    <TableCell>{lead.phone || "-"}</TableCell>
                    <TableCell>
                      <details className="text-sm">
                        <summary className="cursor-pointer text-blue-600">
                          Zobacz odpowiedzi
                        </summary>
                        <div className="mt-2 space-y-1 text-gray-600">
                          {Object.entries(lead.answers).map(
                            ([questionId, answerId]) => {
                              const question = rentalQuiz.questions.find(
                                (q) => q.id === questionId
                              );
                              if (!question) return null;

                              return (
                                <div key={questionId} className="text-xs">
                                  <strong>{question.question}</strong>
                                  <br />
                                  {getAnswerText(questionId, answerId)}
                                </div>
                              );
                            }
                          )}
                        </div>
                      </details>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

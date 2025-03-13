export type QuizQuestion = {
  id: string;
  question: string;
  options: {
    id: string;
    text: string;
    points: number;
  }[];
  category: string;
};

export type QuizResult = {
  id: string;
  title: string;
  minScore: number;
  maxScore: number;
  description: string;
  recommendations: string[];
};

export type QuizData = {
  id: string;
  title: string;
  questions: QuizQuestion[];
  results: QuizResult[];
};

export type QuizAnswers = {
  [key: string]: string;
};

export type LeadFormData = {
  name: string;
  email: string;
  phone?: string;
  quizId?: string;
  sendResultsViaEmail?: boolean;
};

export type QuizQuestion = {
  id: string;
  question: string;
  options: {
    id: string;
    text: string;
  }[];
  category: string;
};

export type QuizData = {
  id: string;
  title: string;
  questions: QuizQuestion[];
};

export type QuizAnswers = {
  [key: string]: string;
};

export type LeadFormData = {
  name: string;
  email: string;
  phone?: string;
  quizId?: string;
};

import { create } from "zustand";

export type Answer = {
  questionId: string;
  optionId: string;
};

export type QuizState = {
  quizId: string | null;
  currentQuestionIndex: number;
  answers: Answer[];
  score: number;
  leadInfo: {
    name: string;
    email: string;
    phone: string;
  };
  resultId: string | null;
  isComplete: boolean;
};

export type QuizActions = {
  setQuizId: (quizId: string) => void;
  setCurrentQuestionIndex: (index: number) => void;
  addAnswer: (answer: Answer) => void;
  updateAnswer: (questionId: string, optionId: string) => void;
  setScore: (score: number) => void;
  setLeadInfo: (leadInfo: Partial<QuizState["leadInfo"]>) => void;
  setResultId: (resultId: string) => void;
  setIsComplete: (isComplete: boolean) => void;
  resetQuiz: () => void;
};

const initialState: QuizState = {
  quizId: null,
  currentQuestionIndex: 0,
  answers: [],
  score: 0,
  leadInfo: {
    name: "",
    email: "",
    phone: "",
  },
  resultId: null,
  isComplete: false,
};

export const useQuizStore = create<QuizState & QuizActions>((set) => ({
  ...initialState,

  setQuizId: (quizId) => set({ quizId }),

  setCurrentQuestionIndex: (index) => set({ currentQuestionIndex: index }),

  addAnswer: (answer) =>
    set((state) => ({
      answers: [...state.answers, answer],
    })),

  updateAnswer: (questionId, optionId) =>
    set((state) => {
      const existingAnswerIndex = state.answers.findIndex(
        (a) => a.questionId === questionId
      );

      if (existingAnswerIndex >= 0) {
        const newAnswers = [...state.answers];
        newAnswers[existingAnswerIndex] = { questionId, optionId };
        return { answers: newAnswers };
      }

      return { answers: [...state.answers, { questionId, optionId }] };
    }),

  setScore: (score) => set({ score }),

  setLeadInfo: (leadInfo) =>
    set((state) => ({
      leadInfo: { ...state.leadInfo, ...leadInfo },
    })),

  setResultId: (resultId) => set({ resultId }),

  setIsComplete: (isComplete) => set({ isComplete }),

  resetQuiz: () => set(initialState),
}));

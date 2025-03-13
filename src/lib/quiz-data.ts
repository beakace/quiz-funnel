import { QuizData } from "./types";

export const rentalQuiz: QuizData = {
  id: "rental-optimization",
  title: "Sprawdź, ile możesz zyskać na wynajmie bez dodatkowej pracy!",
  questions: [
    {
      id: "property_count",
      question: "Ile apartamentów na wynajem posiadasz?",
      category: "Informacje o nieruchomości",
      options: [
        { id: "1", text: "1" },
        { id: "2", text: "2" },
        { id: "3", text: "3 lub więcej" },
      ],
    },
    {
      id: "property_location",
      question: "Gdzie znajduje się Twoja nieruchomość?",
      category: "Informacje o nieruchomości",
      options: [
        { id: "seaside", text: "Nad morzem" },
        { id: "mountains", text: "W górach" },
        { id: "city", text: "W dużym mieście" },
        { id: "other", text: "Inne" },
      ],
    },
    {
      id: "time_spent",
      question: "Ile czasu tygodniowo poświęcasz na zarządzanie wynajmem?",
      category: "Zarządzanie i poświęcany czas",
      options: [
        { id: "less_than_2", text: "Mniej niż 2 godziny" },
        { id: "3_to_5", text: "3-5 godzin" },
        { id: "more_than_6", text: "Powyżej 6 godzin" },
      ],
    },
    {
      id: "main_challenge",
      question: "Co sprawia Ci największy problem w zarządzaniu wynajmem?",
      category: "Zarządzanie i poświęcany czas",
      options: [
        { id: "cleaning", text: "Sprzątanie i utrzymanie czystości" },
        { id: "bookings", text: "Znalezienie gości i rezerwacje" },
        { id: "finances", text: "Formalności i rozliczenia finansowe" },
        { id: "guest_needs", text: "Reagowanie na potrzeby gości" },
        { id: "profits", text: "Zwiększenie zysków" },
      ],
    },
    {
      id: "occupancy",
      question: "Jakie jest średnie obłożenie Twojej nieruchomości?",
      category: "Obłożenie i zyskowność",
      options: [
        { id: "below_30", text: "Poniżej 30%" },
        { id: "30_to_60", text: "30-60%" },
        { id: "60_to_80", text: "60-80%" },
        { id: "above_80", text: "Powyżej 80%" },
      ],
    },
    {
      id: "nightly_rate",
      question: "Jaka jest średnia cena za noc w Twoim obiekcie?",
      category: "Obłożenie i zyskowność",
      options: [
        { id: "below_200", text: "Poniżej 200 PLN" },
        { id: "200_to_400", text: "200-400 PLN" },
        { id: "400_to_600", text: "400-600 PLN" },
        { id: "above_600", text: "Powyżej 600 PLN" },
      ],
    },
    {
      id: "pricing_strategy",
      question: "Czy dostosowujesz ceny w zależności od sezonu i popytu?",
      category: "Obłożenie i zyskowność",
      options: [
        {
          id: "dynamic",
          text: "Tak, regularnie zmieniam ceny w zależności od sezonu i obłożenia",
        },
        {
          id: "sometimes",
          text: "Czasami zmieniam ceny, ale nie zawsze wiem, kiedy warto to robić",
        },
        {
          id: "fixed",
          text: "Nie, trzymam stałą cenę przez cały rok",
        },
      ],
    },
    {
      id: "check_in_process",
      question: "Jak obsługujesz zameldowania gości?",
      category: "Doświadczenie gości i zadowolenie klientów",
      options: [
        { id: "personal", text: "Osobiście witam każdego gościa" },
        {
          id: "automated",
          text: "Mam system automatycznego zameldowania (np. kod do drzwi, skrytka na klucz)",
        },
        { id: "management", text: "Korzystam z firmy zarządzającej najmem" },
        { id: "no_system", text: "Nie mam ustalonego systemu" },
      ],
    },
    {
      id: "negative_reviews",
      question: "Czy kiedykolwiek otrzymałeś negatywną opinię od gościa?",
      category: "Doświadczenie gości i zadowolenie klientów",
      options: [
        { id: "multiple", text: "Tak, kilka razy" },
        { id: "once_twice", text: "Raz lub dwa" },
        { id: "never", text: "Nie, mam same pozytywne opinie" },
      ],
    },
    {
      id: "average_rating",
      question: "Jaka jest Twoja średnia ocena na portalach rezerwacyjnych?",
      category: "Doświadczenie gości i zadowolenie klientów",
      options: [
        { id: "below_7_5", text: "Poniżej 7.5" },
        { id: "7_5_to_8_5", text: "7.5-8.5" },
        { id: "8_5_to_9_5", text: "8.5-9.5" },
        { id: "above_9_5", text: "Powyżej 9.5" },
      ],
    },
    {
      id: "optimization_interest",
      question:
        "Chcesz zobaczyć, jak możemy pomóc Ci zarządzać wynajmem i zwiększyć Twoje zyski bez dodatkowej pracy?",
      category: "Generowanie leadów",
      options: [
        { id: "yes", text: "Tak, chcę poznać szczegóły i oszczędzić czas" },
        { id: "no", text: "Nie, wolę zajmować się tym sam" },
      ],
    },
  ],
};

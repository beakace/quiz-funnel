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
        { id: "1", text: "1", points: 1 },
        { id: "2", text: "2", points: 2 },
        { id: "3", text: "3 lub więcej", points: 3 },
      ],
    },
    {
      id: "property_location",
      question: "Gdzie znajduje się Twoja nieruchomość?",
      category: "Informacje o nieruchomości",
      options: [
        { id: "seaside", text: "Nad morzem", points: 3 },
        { id: "mountains", text: "W górach", points: 3 },
        { id: "city", text: "W dużym mieście", points: 2 },
        { id: "other", text: "Inne", points: 1 },
      ],
    },
    {
      id: "property_size",
      question: "Jaka jest wielkość Twojego apartamentu?",
      category: "Informacje o nieruchomości",
      options: [
        { id: "small", text: "Mały (do 40m²)", points: 1 },
        { id: "medium", text: "Średni (40-70m²)", points: 2 },
        { id: "large", text: "Duży (powyżej 70m²)", points: 3 },
      ],
    },
    {
      id: "property_amenities",
      question: "Jakie udogodnienia posiada Twój apartament?",
      category: "Informacje o nieruchomości",
      options: [
        { id: "basic", text: "Podstawowe wyposażenie", points: 1 },
        { id: "standard", text: "Standardowe wyposażenie z Wi-Fi", points: 2 },
        {
          id: "premium",
          text: "Premium (np. jacuzzi, sauna, klimatyzacja)",
          points: 3,
        },
        { id: "luxury", text: "Luksusowe udogodnienia", points: 4 },
      ],
    },
    {
      id: "rental_management",
      question: "Czy zarządzasz wynajmem swojego apartamentu?",
      category: "Zarządzanie i poświęcany czas",
      options: [
        { id: "self_managed", text: "Tak, samodzielnie", points: 2 },
        { id: "partial", text: "Częściowo (korzystam z pomocy)", points: 1 },
        { id: "company", text: "Korzystam z firmy zarządzającej", points: 3 },
        { id: "none", text: "Nie, nie wynajmuję go obecnie", points: 0 },
      ],
    },
    {
      id: "time_spent",
      question: "Ile czasu tygodniowo poświęcasz na zarządzanie wynajmem?",
      category: "Zarządzanie i poświęcany czas",
      options: [
        { id: "less_than_2", text: "Mniej niż 2 godziny", points: 3 },
        { id: "3_to_5", text: "3-5 godzin", points: 2 },
        { id: "more_than_6", text: "Powyżej 6 godzin", points: 1 },
        { id: "none", text: "Nie zarządzam wynajmem", points: 0 },
      ],
    },
    {
      id: "main_challenge",
      question: "Co sprawia Ci największy problem w zarządzaniu wynajmem?",
      category: "Zarządzanie i poświęcany czas",
      options: [
        {
          id: "cleaning",
          text: "Sprzątanie i utrzymanie czystości",
          points: 1,
        },
        { id: "bookings", text: "Znalezienie gości i rezerwacje", points: 2 },
        {
          id: "finances",
          text: "Formalności i rozliczenia finansowe",
          points: 2,
        },
        { id: "guest_needs", text: "Reagowanie na potrzeby gości", points: 1 },
        { id: "profits", text: "Zwiększenie zysków", points: 3 },
        { id: "marketing", text: "Marketing i promocja obiektu", points: 3 },
        { id: "none", text: "Nie zarządzam wynajmem", points: 0 },
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
          points: 3,
        },
        {
          id: "sometimes",
          text: "Czasami zmieniam ceny, ale nie zawsze wiem, kiedy warto to robić",
          points: 2,
        },
        {
          id: "fixed",
          text: "Nie, trzymam stałą cenę przez cały rok",
          points: 1,
        },
        { id: "none", text: "Nie zarządzam wynajmem", points: 0 },
      ],
    },
    {
      id: "negative_reviews",
      question: "Czy kiedykolwiek otrzymałeś negatywną opinię od gościa?",
      category: "Doświadczenie gości i zadowolenie klientów",
      options: [
        { id: "multiple", text: "Tak, kilka razy", points: 1 },
        { id: "once_twice", text: "Raz lub dwa", points: 2 },
        { id: "never", text: "Nie, mam same pozytywne opinie", points: 3 },
        { id: "none", text: "Nie zarządzam wynajmem", points: 0 },
      ],
    },
    {
      id: "average_rating",
      question: "Jaka jest Twoja średnia ocena na portalach rezerwacyjnych?",
      category: "Doświadczenie gości i zadowolenie klientów",
      options: [
        { id: "below_7_5", text: "Poniżej 7.5", points: 1 },
        { id: "7_5_to_8_5", text: "7.5-8.5", points: 2 },
        { id: "8_5_to_9_5", text: "8.5-9.5", points: 3 },
        { id: "above_9_5", text: "Powyżej 9.5", points: 4 },
        { id: "none", text: "Nie zarządzam wynajmem", points: 0 },
      ],
    },
  ],
  results: [
    {
      id: "non_renting_owner",
      title: "Właściciel Nieruchomości",
      minScore: -1,
      maxScore: -1,
      description:
        "Posiadasz nieruchomość, ale obecnie jej nie wynajmujesz. Istnieje ogromny potencjał do generowania dodatkowego dochodu z Twojej nieruchomości bez znacznego nakładu pracy.",
      recommendations: [
        "Rozważ rozpoczęcie wynajmu krótkoterminowego, który może przynieść znacznie wyższe zyski niż wynajem długoterminowy",
        "Skorzystaj z usług profesjonalnej firmy zarządzającej, aby zminimalizować swoje zaangażowanie czasowe",
        "Przeanalizuj potencjał zarobkowy Twojej nieruchomości w oparciu o jej lokalizację i wielkość",
        "Zapoznaj się z podstawowymi wymogami prawnymi i podatkowymi dotyczącymi wynajmu krótkoterminowego",
      ],
    },
    {
      id: "beginner",
      title: "Początkujący Gospodarz",
      minScore: 0,
      maxScore: 24,
      description:
        "Dopiero zaczynasz swoją przygodę z wynajmem krótkoterminowym. Masz przed sobą wiele możliwości optymalizacji i zwiększenia zysków bez dodatkowej pracy.",
      recommendations: [
        "Zautomatyzuj proces zameldowania gości",
        "Wprowadź dynamiczne ceny w zależności od sezonu",
        "Skorzystaj z narzędzi do zarządzania rezerwacjami",
        "Popraw jakość zdjęć i opisu swojej oferty",
      ],
    },
    {
      id: "intermediate",
      title: "Doświadczony Wynajmujący",
      minScore: 25,
      maxScore: 35,
      description:
        "Masz już spore doświadczenie w zarządzaniu wynajmem. Wdrożyłeś kilka dobrych praktyk, ale wciąż jest przestrzeń do optymalizacji i zwiększenia zysków.",
      recommendations: [
        "Zoptymalizuj strategię cenową z wykorzystaniem narzędzi analitycznych",
        "Rozważ automatyzację komunikacji z gośćmi",
        "Wprowadź dodatkowe usługi zwiększające wartość pobytu",
        "Analizuj dane o obłożeniu i dostosuj swoją strategię marketingową",
      ],
    },
    {
      id: "expert",
      title: "Ekspert Wynajmu",
      minScore: 36,
      maxScore: 100,
      description:
        "Jesteś profesjonalistą w zarządzaniu wynajmem krótkoterminowym. Twoje podejście jest zoptymalizowane i efektywne, ale zawsze można osiągnąć jeszcze więcej.",
      recommendations: [
        "Rozważ skalowanie swojego biznesu o kolejne nieruchomości",
        "Wdrażaj najnowsze technologie smart home dla jeszcze lepszego doświadczenia gości",
        "Buduj lojalność gości poprzez programy lojalnościowe",
        "Optymalizuj koszty operacyjne poprzez analizę wydatków",
      ],
    },
  ],
};

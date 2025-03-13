import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SessionProvider } from "@/components/SessionProvider";
import Navbar from "@/components/Navbar";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Optymalizacja Wynajmu",
  description:
    "Odkryj jak zoptymalizować swój wynajem nieruchomości i zwiększyć zyski dzięki naszemu interaktywnemu quizowi",
  keywords: [
    "wynajem nieruchomości",
    "optymalizacja wynajmu",
    "quiz",
    "nieruchomości",
    "zwiększenie zysków",
  ],
  authors: [{ name: "Quiz Funnel Team" }],
  creator: "Quiz Funnel",
  publisher: "Quiz Funnel",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    apple: "/apple-touch-icon.svg",
  },
  openGraph: {
    type: "website",
    locale: "pl_PL",
    url: "https://quiz-funnel.vercel.app/",
    title: "Optymalizacja Wynajmu | Quiz Funnel",
    description:
      "Odkryj jak zoptymalizować swój wynajem nieruchomości i zwiększyć zyski dzięki naszemu interaktywnemu quizowi",
    siteName: "Quiz Funnel",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.svg" />
      </head>
      <body className={`${inter.variable} font-sans antialiased`}>
        <SessionProvider>
          <Navbar />
          <div className="pt-20">{children}</div>
        </SessionProvider>
      </body>
    </html>
  );
}

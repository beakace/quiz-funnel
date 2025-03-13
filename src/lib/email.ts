import nodemailer from "nodemailer";
import { Lead } from "./leads";
import { rentalQuiz } from "./quiz-data";

// Email configuration
// For production, use your actual SMTP settings
// For development, you can use services like Mailtrap, SendGrid, or Gmail
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || "smtp.example.com",
  port: parseInt(process.env.EMAIL_PORT || "587"),
  secure: process.env.EMAIL_SECURE === "true",
  auth: {
    user: process.env.EMAIL_USER || "user@example.com",
    pass: process.env.EMAIL_PASSWORD || "password",
  },
});

// Function to generate HTML content for the email
function generateResultEmailHtml(lead: Lead): string {
  // Find the result based on the resultId
  const result = rentalQuiz.results.find((r) => r.id === lead.resultId);

  if (!result) {
    return `
      <h1>Wyniki Twojego quizu</h1>
      <p>Dziękujemy za wypełnienie quizu. Niestety, nie mogliśmy znaleźć Twoich wyników.</p>
      <p>Skontaktuj się z nami, aby uzyskać więcej informacji.</p>
    `;
  }

  // Generate recommendations HTML
  const recommendationsHtml = result.recommendations
    .map((rec) => `<li>${rec}</li>`)
    .join("");

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Wyniki Twojego Quizu</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          line-height: 1.6;
          color: #333;
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
        }
        .header {
          background-color: #FBAF30;
          color: white;
          padding: 20px;
          text-align: center;
          border-radius: 5px 5px 0 0;
        }
        .content {
          padding: 20px;
          border: 1px solid #ddd;
          border-top: none;
          border-radius: 0 0 5px 5px;
        }
        .result-title {
          color: #FBAF30;
          font-size: 24px;
          margin-bottom: 10px;
        }
        .recommendations {
          background-color: #f9f9f9;
          padding: 15px;
          border-radius: 5px;
          margin-top: 20px;
        }
        .recommendations h3 {
          color: #555;
          margin-top: 0;
        }
        .recommendations ul {
          padding-left: 20px;
        }
        .recommendations li {
          margin-bottom: 10px;
        }
        .cta-button {
          display: inline-block;
          background-color: #FBAF30;
          color: white;
          text-decoration: none;
          padding: 10px 20px;
          border-radius: 5px;
          margin-top: 20px;
        }
        .footer {
          margin-top: 30px;
          font-size: 12px;
          color: #777;
          text-align: center;
        }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>Wyniki Twojego Quizu</h1>
      </div>
      <div class="content">
        <p>Witaj ${lead.name},</p>
        <p>Dziękujemy za wypełnienie naszego quizu dotyczącego optymalizacji wynajmu. Poniżej znajdziesz swoje wyniki i spersonalizowane rekomendacje.</p>
        
        <div class="result-title">${result.title}</div>
        <p>${result.description}</p>
        
        <div class="recommendations">
          <h3>Nasze rekomendacje dla Ciebie:</h3>
          <ul>
            ${recommendationsHtml}
          </ul>
        </div>
        
        <p>Chcesz dowiedzieć się więcej? Nasi eksperci są gotowi, aby pomóc Ci wdrożyć te rekomendacje i osiągnąć jeszcze lepsze wyniki.</p>
        
        <a href="${
          process.env.NEXT_PUBLIC_APP_URL || "https://example.com"
        }/contact" class="cta-button">Umów się na konsultację</a>
        
        <p>Pozdrawiamy,<br>Zespół Optymalizacji Wynajmu</p>
      </div>
      <div class="footer">
        <p>Ta wiadomość została wysłana, ponieważ wypełniłeś/aś quiz na naszej stronie i wyraziłeś/aś zgodę na otrzymanie wyników drogą mailową.</p>
        <p>© ${new Date().getFullYear()} Optymalizacja Wynajmu. Wszelkie prawa zastrzeżone.</p>
      </div>
    </body>
    </html>
  `;
}

// Function to send the quiz results via email
export async function sendResultsEmail(lead: Lead): Promise<boolean> {
  if (!lead.email || !lead.sendResultsViaEmail) {
    return false;
  }

  try {
    const mailOptions = {
      from: process.env.EMAIL_FROM || "noreply@example.com",
      to: lead.email,
      subject: "Twoje wyniki quizu optymalizacji wynajmu",
      html: generateResultEmailHtml(lead),
    };

    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.error("Error sending email:", error);
    return false;
  }
}

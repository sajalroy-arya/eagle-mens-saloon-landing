import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Eagle Men's Saloon | Premium Grooming & Barber Services in Jhansi",
  description: "Experience premium grooming at Eagle Men's Saloon, Jhansi. Master Barber Satyendra and team offer bespoke haircuts, beard styling, and luxury treatments in an elegant, editorial space. Book your appointment online.",
  keywords: "Best Salon in Jhansi, Salon Near Me, Haircut Jhansi, Men Salon Jhansi, Hair Spa Jhansi, Premium Salon Jhansi, Beard Styling Jhansi, Satyendra Barber, Wedding Grooming Jhansi",
  authors: [{ name: "Eagle Men's Saloon" }],
  openGraph: {
    type: "website",
    title: "Eagle Men's Saloon | Premium Grooming in Jhansi",
    description: "Luxurious grooming experience by Master Barber Satyendra. Precision haircuts, beard styling, and custom packages.",
    siteName: "Eagle Men's Saloon",
  },
  twitter: {
    card: "summary_large_image",
    title: "Eagle Men's Saloon | Premium Grooming in Jhansi",
    description: "Experience premium grooming at Eagle Men's Saloon. Book your session online.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${inter.variable} scroll-smooth h-full antialiased`}
    >
      <body className="bg-[#FAF8F5] text-[#111111] font-sans min-h-full flex flex-col selection:bg-[#C8A76A] selection:text-white">
        {children}
      </body>
    </html>
  );
}

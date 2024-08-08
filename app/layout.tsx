import type { Metadata } from "next";
import { Montserrat_Alternates } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";

const inter = Montserrat_Alternates({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });


export const metadata :Metadata = {
  title: 'Alg-Consultas',
  description: 'App desarrollada desde Algámitas-Andalucía para gestionar tus citas',
  openGraph: {
   title: 'Alg-Consultas',
   description: 'App desarrollada desde Algámitas-Andalucía para gestionar tus citas',
   url: 'https://www.example.com',
   images: [
    {
     url: 'assets/images/onboarding-img.png',
     width: 1200,
     height: 630,
     alt: 'Alg-Consultas',
    },
   ],
   siteName: 'Alg-Consultas',
  },
 };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn('min-h-screen bg-dark-300 antialiased', inter.className)}>
      <ThemeProvider
        attribute="class"
        defaultTheme="dark"
      >
        {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

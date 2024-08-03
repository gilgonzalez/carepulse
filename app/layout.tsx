import type { Metadata } from "next";
import { Montserrat_Alternates } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";

const inter = Montserrat_Alternates({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });

export const metadata: Metadata = {
  title: "Name company",
  description: "Aplicación para gestionar pacientes y citas",
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

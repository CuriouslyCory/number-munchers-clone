import type React from "react";
import "~/styles/globals.css";
import { Inter } from "next/font/google";
import { ThemeProvider } from "~/components/theme-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Number Munchers",
  description: "A web remake of the classic DOS game",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

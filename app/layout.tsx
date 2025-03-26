import type React from "react"
import "@/app/globals.css"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { ThemeToggle } from "@/components/theme-toggle";
import AuthorInfo from "@/components/author-info";

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Guessing Game by Nihir Shah",
  description: "A fun guessing game with multiple categories created by Nihir Shah.",
  creator: 'Nihir Shah',
  authors: 'Nihir Shah',

}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <AuthorInfo
            name="Nihir Shah"
            linkedinUrl="https://www.linkedin.com/in/nihir-shah/"
            githubUrl="https://github.com/Nihir10dec"
            portfolioUrl="https://nihir-shah.netlify.app/"
          />
          {/* <ThemeToggle /> */}
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}



import './globals.css'
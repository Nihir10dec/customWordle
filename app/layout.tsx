import type React from "react"
import "@/app/globals.css"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import Script from "next/script";
import AuthorInfo from "@/components/author-info";
import { Analytics } from '@vercel/analytics/next';

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Guessing Game by Nihir Shah",
  description: "A fun guessing game with multiple categories created by Nihir Shah.",
  creator: 'Nihir Shah',
  authors: 'Nihir Shah',
};

const clarityId = process.env.NEXT_PUBLIC_CLARITY_ID;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {clarityId && (
          <Script
            id="clarity-script"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                (function(c,l,a,r,i,t,y){
                    c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                    t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                    y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
                })(window, document, "clarity", "script", "${clarityId}");
              `,
            }}
          />
        )}
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <AuthorInfo
            name="Nihir Shah"
            linkedinUrl="https://www.linkedin.com/in/nihir-shah/"
            githubUrl="https://github.com/Nihir10dec"
            portfolioUrl="https://nihir-shah.netlify.app/"
          />
          {children}
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  )
}



import './globals.css'
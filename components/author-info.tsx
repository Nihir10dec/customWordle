import Link from "next/link"
import { Github, Linkedin, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { ThemeToggle } from "./theme-toggle"

interface AuthorInfoProps {
  name: string
  linkedinUrl: string
  githubUrl: string
  portfolioUrl: string
}

export default function AuthorInfo({ name, linkedinUrl, githubUrl, portfolioUrl }: AuthorInfoProps) {


  return (
    <div className="fixed top-2 p-2 flex items-center justify-between w-full">
      <div className="flex items-center z-50 gap-2 bg-background/80 backdrop-blur-sm p-2 rounded-lg shadow-sm border">
        <span className="text-sm font-medium hidden md:inline-block">Created by {name}</span>
        <span className="text-sm font-medium md:hidden">Created by {name}</span>

        <div className="flex items-center gap-1">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8" asChild>
                  <Link href={linkedinUrl} target="_blank" rel="noopener noreferrer">
                    <Linkedin className="h-4 w-4" />
                    <span className="sr-only">LinkedIn</span>
                  </Link>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>LinkedIn Profile</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8" asChild>
                  <Link href={githubUrl} target="_blank" rel="noopener noreferrer">
                    <Github className="h-4 w-4" />
                    <span className="sr-only">GitHub</span>
                  </Link>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>GitHub Profile</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8" asChild>
                  <Link href={portfolioUrl} target="_blank" rel="noopener noreferrer">
                    <Globe className="h-4 w-4" />
                    <span className="sr-only">Portfolio</span>
                  </Link>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Portfolio Site</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
      <div className=" z-50 flex items-center rounded-lg">
        <ThemeToggle />
      </div>
    </div>
  )
}


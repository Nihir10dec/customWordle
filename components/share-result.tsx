"use client"

import { useState } from "react"
import { Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { toast } from "@/hooks/use-toast"

interface ShareResultsProps {
  categoryName: string
  attempts: number
  won: boolean
}

export default function ShareResults({ categoryName, attempts, won }: ShareResultsProps) {
  const [isSharing, setIsSharing] = useState(false)

  const handleShare = async () => {
    setIsSharing(true)

    const shareText = won
      ? `I guessed the ${categoryName} in ${attempts} attempts! 🎮 Play the Guessing Game!`
      : `I tried guessing the ${categoryName} but couldn't get it this time. 🎮 Can you do better?`

    try {
      if (navigator.share) {
        await navigator.share({
          title: "Guessing Game Results",
          text: shareText,
          url: window.location.href,
        })
      } else {
        await navigator.clipboard.writeText(shareText + " " + window.location.href)
        toast({
          title: "Copied to clipboard",
          description: "Share your results with friends!",
        })
      }
    } catch (error) {
      console.error("Error sharing:", error)
    } finally {
      setIsSharing(false)
    }
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline" size="sm" className="gap-1" onClick={handleShare} disabled={isSharing}>
            <Share2 className="h-4 w-4" />
            <span>Share</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Share your results</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}


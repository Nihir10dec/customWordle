"use client"

import { CheckCircle, XCircle } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import WordleFeedback from "./wordle-feedback";

interface Attribute {
  id: string
  name: string
  icon: string
  possibleValues: string[]
}

interface FeedbackProps {
  feedback: {
    name: string
    emoji?: string
    [key: string]: any
  }
  attributes: Attribute[]
  isNew?: boolean
  enableWordleStyle?: boolean
  targetName?: string
}

export default function GuessFeedback({
  feedback,
  attributes,
  isNew = false,
  enableWordleStyle = false,
  targetName = "",
}: FeedbackProps) {
  return (
    <div
      className={`p-3 border rounded-lg bg-background shadow-sm transition-all duration-300 ${isNew ? "scale-105 border-primary" : ""}`}
    >
      <div className="flex flex-wrap items-center gap-2">
        <div className="flex items-center mr-2">
          <span className="text-xl mr-1">{feedback.emoji || "🔍"}</span>
          <span className="font-bold">{feedback.name}</span>
        </div>

        <div className="flex flex-wrap gap-2">
          {attributes.map((attr) => (
            <TooltipProvider key={attr.id}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex items-center bg-muted/50 rounded-md px-2 py-1">
                    <div className="flex items-center">
                      <span className="mr-1">{attr.icon}</span>
                      <span className="text-sm font-medium">{feedback[attr.id].value}</span>
                    </div>
                    <div className="ml-1">
                      {feedback[attr.id].match ? (
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      ) : (
                        <XCircle className="h-4 w-4 text-red-500" />
                      )}
                    </div>
                  </div>
                </TooltipTrigger>
                <TooltipContent side="top" className="max-w-[200px] break-words">
                  {feedback[attr.id].match ? (
                    <p>
                      Correct {attr.name}: {feedback[attr.id].value}
                    </p>
                  ) : (
                    <p>
                      Possible values are {attr.possibleValues.join(', ')}
                    </p>
                  )}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ))}
        </div>
      </div>

      {/* Add Wordle-style letter feedback if enabled */}
      {enableWordleStyle && targetName && <WordleFeedback guess={feedback.name} target={targetName} />}
    </div>
  )
}


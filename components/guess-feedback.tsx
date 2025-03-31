"use client"

import { CheckCircle, XCircle, ArrowUp, ArrowDown } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import WordleFeedback from "./wordle-feedback"
import MobileTooltip from "./mobile-tooltip"
import { useMobileDetect } from "@/hooks/use-mobile"

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
  category?: string
}

export default function GuessFeedback({
  feedback,
  attributes,
  isNew = false,
  enableWordleStyle = false,
  targetName = "",
  category = "",
}: FeedbackProps) {
  const isMobile = useMobileDetect()

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
          {attributes.map((attr) => {
            const isMatch = feedback[attr.id].match

            // Special handling for release_year in Bollywood category
            const isBollywoodYear = category === "bollywood" && attr.id === "release_year"
            const direction = isBollywoodYear ? feedback[attr.id].direction : null

            let tooltipContent

            if (isBollywoodYear) {
              if (isMatch) {
                tooltipContent = (
                  <p key={attr.id}>
                    Correct {attr.name}: {feedback[attr.id].value}
                  </p>
                )
              } else if (direction === "earlier") {
                tooltipContent = (
                  <p key={attr.id}>
                    The movie was released earlier than {feedback[attr.id].value}.
                  </p>
                )
              } else {
                tooltipContent = (
                  <p key={attr.id}>
                    The movie was released later than {feedback[attr.id].value}.
                  </p>
                )
              }
            } else {
              tooltipContent = isMatch ? (
                <p key={attr.id}>
                  Correct {attr.name}: {feedback[attr.id].value}
                </p>
              ) : (
                <p key={attr.id}>
                  Possible values are {attr.possibleValues.join(', ')}
                </p>
              )
            }

            const attributeElement = (
              <div
                key={attr.id}
                className={`flex items-center rounded-md px-2 py-1 ${isMatch ? "bg-green-100 dark:bg-green-900/30" : "bg-red-100 dark:bg-red-900/30"
                  }`}
              >
                <div className="flex items-center">
                  <span className="mr-1">{attr.icon}</span>
                  <span className="text-sm font-medium">{feedback[attr.id].value}</span>
                </div>
                <div className="ml-1">
                  {isMatch ? (
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  ) : isBollywoodYear ? (
                    direction === "earlier" ? (
                      <ArrowDown className="h-4 w-4 text-blue-500" />
                    ) : (
                      <ArrowUp className="h-4 w-4 text-orange-500" />
                    )
                  ) : (
                    <XCircle className="h-4 w-4 text-red-500" />
                  )}
                </div>
              </div>
            )

            return isMobile ? (
              <MobileTooltip key={attr.id} trigger={attributeElement} content={tooltipContent} title={attr.name} />
            ) : (
              <TooltipProvider key={attr.id}>
                <Tooltip>
                  <TooltipTrigger asChild>{attributeElement}</TooltipTrigger>
                  <TooltipContent side="top" className="max-w-[250px] break-words">
                    {tooltipContent}
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )
          })}
        </div>
      </div>

      {/* Add Wordle-style letter feedback if enabled */}
      {enableWordleStyle && targetName && <WordleFeedback guess={feedback.name} target={targetName} />}
    </div>
  )
}


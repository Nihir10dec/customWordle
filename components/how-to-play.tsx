"use client"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import type { CategoryData } from "@/lib/category-data"
import { ArrowUp, ArrowDown } from "lucide-react"

interface HowToPlayProps {
  categoryData: CategoryData
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function HowToPlay({ categoryData, open, onOpenChange }: HowToPlayProps) {
  const isBollywood = categoryData.id === "bollywood"

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>How to Play {categoryData.title}</DialogTitle>
          <DialogDescription>Learn how to play the {categoryData.title} game</DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-2">
          {/* <div>
            <h3 className="font-medium mb-2">Game Objective</h3>
            <p className="text-sm text-muted-foreground">
              Guess the correct {categoryData.itemName} in as few attempts as possible.
            </p>
          </div> */}

          <div>
            <h3 className="font-medium mb-2">How to Play</h3>
            <ol className="text-sm text-muted-foreground space-y-2 list-decimal pl-4">
              <li>Type a {categoryData.itemName} name and submit your guess</li>
              <li>After each guess, you'll get feedback on different attributes</li>
              <li>A green checkmark means the attribute matches the target {categoryData.itemName}. A red X means the attribute is different</li>
              {isBollywood && (
                <li>
                  For release year, you'll see directional arrows:
                  <ul className="list-disc pl-4 mt-1">
                    <li className="flex items-center">
                      <ArrowUp className="h-4 w-4 text-orange-500 mr-1" />
                      means the movie was released later than your guess
                    </li>
                    <li className="flex items-center">
                      <ArrowDown className="h-4 w-4 text-blue-500 mr-1" />
                      means the movie was released earlier than your guess but in or after 2000
                    </li>
                  </ul>
                </li>
              )}
              {categoryData.enableWordleStyle && (
                <li>
                  You'll also get letter-by-letter feedback:
                  <ul className="list-disc pl-4 mt-1">
                    <li>Green letters are in the correct position</li>
                    <li>Yellow letters are in the word but in the wrong position</li>
                    <li>Gray letters are not in the word</li>
                  </ul>
                </li>
              )}
              <li>Both singular and plural forms are accepted where applicable (e.g., "grape" and "grapes")</li>
            </ol>
          </div>

          <div>
            <h3 className="font-medium mb-2">Attributes</h3>
            <div className="text-sm text-muted-foreground space-y-1">
              {categoryData.attributes.map((attr) => (
                <p key={attr.id}>
                  <span className="mr-2">{attr.icon}</span>
                  <strong>{attr.name}:</strong>{" "}
                  {attr.possibleValues.length > 10
                    ? `Various ${attr.name.toLowerCase()} options`
                    : attr.possibleValues.join(", ")}
                </p>
              ))}
            </div>
          </div>
        </div>

        <Button onClick={() => onOpenChange(false)} className="w-full">
          Got it!
        </Button>
      </DialogContent>
    </Dialog>
  )
}


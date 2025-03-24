"use client"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import type { CategoryData } from "@/lib/category-data"

interface HowToPlayProps {
  categoryData: CategoryData
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function HowToPlay({ categoryData, open, onOpenChange }: HowToPlayProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>How to Play {categoryData.title}</DialogTitle>
          <DialogDescription>Learn how to play the {categoryData.title} game</DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div>
            <h3 className="font-medium mb-2">Game Objective</h3>
            <p className="text-sm text-muted-foreground">
              Guess the correct {categoryData.itemName} in as few attempts as possible.
            </p>
          </div>

          <div>
            <h3 className="font-medium mb-2">How to Play</h3>
            <ol className="text-sm text-muted-foreground space-y-2 list-decimal pl-4">
              <li>Type a {categoryData.itemName} name and submit your guess</li>
              <li>After each guess, you'll get feedback on different attributes</li>
              <li>A green checkmark means the attribute matches the target {categoryData.itemName}</li>
              <li>A red X means the attribute is different</li>
              <li>Use the feedback to make better guesses</li>
              <li>Try to guess the {categoryData.itemName} in as few attempts as possible</li>
            </ol>
          </div>

          <div>
            <h3 className="font-medium mb-2">Attributes</h3>
            <div className="text-sm text-muted-foreground space-y-1">
              {categoryData.attributes.map((attr) => (
                <p key={attr.id}>
                  <span className="mr-2">{attr.icon}</span>
                  <strong>{attr.name}:</strong> {attr.possibleValues.join(", ")}
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


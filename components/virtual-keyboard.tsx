"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { SkipBackIcon as Backspace, SpaceIcon, CornerDownLeft } from "lucide-react"
import { useMobileDetect } from "@/hooks/use-mobile"

interface VirtualKeyboardProps {
  onKeyPress: (key: string) => void
  onBackspace: () => void
  onEnter: () => void
  disabled?: boolean
  incorrectLetters?: Set<string>
}

export default function VirtualKeyboard({
  onKeyPress,
  onBackspace,
  onEnter,
  disabled = false,
  incorrectLetters = new Set(),
}: VirtualKeyboardProps) {
  const isMobile = useMobileDetect()
  const [showKeyboard, setShowKeyboard] = useState(false)

  useEffect(() => {
    setShowKeyboard(isMobile)
  }, [isMobile])

  if (!showKeyboard) return null

  const rows = [
    ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"],
    ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
    ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
    ["Z", "X", "C", "V", "B", "N", "M"],
  ]

  return (
    <div className="w-full max-w-md mx-auto mt-4">
      {rows.map((row, rowIndex) => (
        <div key={rowIndex} className="flex justify-center mb-2 gap-1">

          {row.map((key) => {
            const isIncorrect = incorrectLetters.has(key.toLowerCase())
            return (
              <Button
                key={key}
                variant="outline"
                size="sm"
                className={`w-8 h-10 p-0 font-medium ${isIncorrect ? "text-muted-foreground bg-muted" : ""}`}
                onClick={() => {
                  if (!disabled) onKeyPress(key)
                }}
                disabled={disabled}
              >
                {key}
              </Button>
            )
          })}


        </div>

      ))}
      <div key={4} className="flex justify-center mb-2 gap-1">

        <Button
          variant="outline"
          size="icon"
          className="w-20 h-10 font-[900]"
          onClick={() => {
            if (!disabled) onEnter()
          }}
          disabled={disabled}
        >
          SUBMIT
          <span className="sr-only">Submit</span>
        </Button>

        <Button
          variant="outline"
          size="icon"
          className="w-40 h-10"
          onClick={() => {
            if (!disabled) onKeyPress(" ")
          }}
          disabled={disabled}
        >
          <SpaceIcon className="h-4 w-4" strokeWidth={3} />
          <span className="sr-only">Space</span>
        </Button>


        <Button
          variant="outline"
          size="icon"
          className="w-10 h-10 font-[900]"
          onClick={() => {
            if (!disabled) onBackspace()
          }}
          disabled={disabled}
        >
          <Backspace className="h-4 w-4" strokeWidth={3} />
          <span className="sr-only">Backspace</span>
        </Button>
      </div>
    </div>
  )
}


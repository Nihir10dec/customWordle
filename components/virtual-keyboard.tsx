"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { SkipBackIcon as Backspace, CornerDownLeft } from "lucide-react"
import { useMobileDetect } from "@/hooks/use-mobile"

interface VirtualKeyboardProps {
  onKeyPress: (key: string) => void
  onBackspace: () => void
  onEnter: () => void
  disabled?: boolean
}

export default function VirtualKeyboard({ onKeyPress, onBackspace, onEnter, disabled = false }: VirtualKeyboardProps) {
  const isMobile = useMobileDetect()
  const [showKeyboard, setShowKeyboard] = useState(false)

  useEffect(() => {
    setShowKeyboard(isMobile)
  }, [isMobile])

  if (!showKeyboard) return null

  const rows = [
    ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
    ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
    ["Z", "X", "C", "V", "B", "N", "M"],
  ]

  return (
    <div className="w-full max-w-md mx-auto mt-4">
      {rows.map((row, rowIndex) => (
        <div key={rowIndex} className="flex justify-center mb-2 gap-1">
          {rowIndex === 2 && (
            <Button
              variant="outline"
              size="icon"
              className="w-10 h-10"
              onClick={() => {
                if (!disabled) onEnter()
              }}
              disabled={disabled}
            >
              <CornerDownLeft className="h-4 w-4" />
              <span className="sr-only">Enter</span>
            </Button>
          )}

          {row.map((key) => (
            <Button
              key={key}
              variant="outline"
              size="sm"
              className="w-8 h-10 p-0 font-medium"
              onClick={() => {
                if (!disabled) onKeyPress(key)
              }}
              disabled={disabled}
            >
              {key}
            </Button>
          ))}

          {rowIndex === 2 && (
            <Button
              variant="outline"
              size="icon"
              className="w-10 h-10"
              onClick={() => {
                if (!disabled) onBackspace()
              }}
              disabled={disabled}
            >
              <Backspace className="h-4 w-4" />
              <span className="sr-only">Backspace</span>
            </Button>
          )}
        </div>
      ))}
    </div>
  )
}


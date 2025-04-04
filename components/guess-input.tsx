"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import VirtualKeyboard from "./virtual-keyboard"
import { useMobileDetect } from "@/hooks/use-mobile"

interface GuessInputProps {
  guess: string
  setGuess: (guess: string) => void
  onSubmit: () => void
  disabled?: boolean
  maxLength?: number
  categoryColor?: string
  incorrectLetters?: Set<string>
}

export default function GuessInput({
  guess,
  setGuess,
  onSubmit,
  disabled = false,
  maxLength = 15,
  categoryColor = "focus:border-primary",
  incorrectLetters = new Set(),
}: GuessInputProps) {
  const [letters, setLetters] = useState<string[]>(Array(maxLength).fill(""))
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])
  const isMobile = useMobileDetect()

  // Initialize refs array
  useEffect(() => {
    inputRefs.current = inputRefs.current.slice(0, maxLength)
  }, [maxLength])

  // Update letters when guess changes
  useEffect(() => {
    const newLetters = Array(maxLength).fill("")
    for (let i = 0; i < guess.length && i < maxLength; i++) {
      newLetters[i] = guess[i]
    }
    setLetters(newLetters)
  }, [guess, maxLength])

  const handleInputChange = (index: number, value: string) => {
    if (value.length > 1) {
      value = value.charAt(0)
    }

    const newLetters = [...letters]
    newLetters[index] = value
    setLetters(newLetters)
    setGuess(newLetters.join("").trim())

    // Move to next input if a letter was entered
    if (value && index < maxLength - 1) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault()
      onSubmit()
      // Focus on the first input after submission
      setTimeout(() => {
        inputRefs.current[0]?.focus()
      }, 10)
    } else if (e.key === "Backspace" && !letters[index] && index > 0) {
      // Move to previous input on backspace if current is empty
      inputRefs.current[index - 1]?.focus()
    } else if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus()
    } else if (e.key === "ArrowRight" && index < maxLength - 1) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handleVirtualKeyPress = (key: string) => {
    if (disabled) return

    // Find the first empty input
    let targetIndex = letters.findIndex((letter) => !letter)
    if (targetIndex === -1) {
      // If all filled, append to the end if there's space
      targetIndex = Math.min(letters.length - 1, letters.filter((l) => l).length)
    }

    if (targetIndex >= 0) {
      const newLetters = [...letters]
      newLetters[targetIndex] = key
      setLetters(newLetters)
      setGuess(newLetters.join("").trim())

      // Move to next input if there's space
      if (targetIndex < maxLength - 1) {
        setTimeout(() => {
          inputRefs.current[targetIndex + 1]?.focus()
        }, 10)
      }
    }
  }

  const handleVirtualBackspace = () => {
    if (disabled) return

    // Find the last filled input
    const targetIndex = letters.map((l) => !!l).lastIndexOf(true)
    if (targetIndex >= 0) {
      handleInputChange(targetIndex, "")
    }
    setTimeout(() => {
      inputRefs.current[targetIndex]?.focus()
    }, 10)
  }

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="flex flex-wrap justify-center gap-1 max-w-md">
        {letters.map((letter, index) => (
          <input
            key={index}
            ref={(el) => { inputRefs.current[index] = el }}
            type="text"
            value={letter}
            onChange={(e) => handleInputChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            className={`w-7 h-9 md:w-9 md:h-10 text-center border-2 rounded font-bold text-lg uppercase ${categoryColor} focus:outline-none`}
            maxLength={1}
            disabled={disabled}
            readOnly={isMobile} // Make inputs readonly on mobile to prevent keyboard popup
          />
        ))}
      </div>

      {!isMobile && (
        <Button
          onClick={() => {
            onSubmit()
            // Focus on the first input after submission
            setTimeout(() => {
              inputRefs.current[0]?.focus()
            }, 10)
          }}
          disabled={!guess.trim() || disabled}
          className="w-full max-w-xs"
        >
          Submit Guess
        </Button>
      )}

      <VirtualKeyboard
        onKeyPress={handleVirtualKeyPress}
        onBackspace={handleVirtualBackspace}
        onEnter={onSubmit}
        disabled={disabled}
        incorrectLetters={incorrectLetters}
      />
    </div>
  )
}


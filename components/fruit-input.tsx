"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"

interface FruitInputProps {
  guess: string
  setGuess: (guess: string) => void
  onSubmit: () => void
  disabled?: boolean
}

export default function FruitInput({ guess, setGuess, onSubmit, disabled = false }: FruitInputProps) {
  const [letters, setLetters] = useState<string[]>(Array(15).fill(""))
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  // Initialize refs array
  useEffect(() => {
    inputRefs.current = inputRefs.current.slice(0, 15)
  }, [])

  // Update letters when guess changes
  useEffect(() => {
    const newLetters = Array(15).fill("")
    for (let i = 0; i < guess.length && i < 15; i++) {
      newLetters[i] = guess[i]
    }
    setLetters(newLetters)
  }, [guess])

  const handleInputChange = (index: number, value: string) => {
    if (value.length > 1) {
      value = value.charAt(0)
    }

    const newLetters = [...letters]
    newLetters[index] = value
    setLetters(newLetters)
    setGuess(newLetters.join("").trim())

    // Move to next input if a letter was entered
    if (value && index < 14) {
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
    } else if (e.key === "ArrowRight" && index < 14) {
      inputRefs.current[index + 1]?.focus()
    }
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
            className="w-7 h-9 md:w-9 md:h-10 text-center border-2 rounded font-bold text-lg uppercase focus:border-primary focus:outline-none"
            maxLength={1}
            disabled={disabled}
          />
        ))}
      </div>
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
    </div>
  )
}


"use client"

import { useMemo } from "react"

interface WordleFeedbackProps {
  guess: string
  target: string
}

type LetterStatus = "correct" | "present" | "absent"

export default function WordleFeedback({ guess, target }: WordleFeedbackProps) {
  // Calculate letter statuses
  const letterStatuses = useMemo(() => {
    const statuses: LetterStatus[] = []
    const targetLetters = target.toLowerCase().split("")
    const guessLetters = guess.toLowerCase().split("")

    // Create a copy of target letters to track which ones have been matched
    const remainingTargetLetters = [...targetLetters]

    // First pass: mark correct letters
    guessLetters.forEach((letter, index) => {
      if (index < targetLetters.length && letter === targetLetters[index]) {
        statuses[index] = "correct"
        // Remove this letter from remaining target letters
        remainingTargetLetters[index] = ""
      }
    })

    // Second pass: mark present or absent letters
    guessLetters.forEach((letter, index) => {
      if (statuses[index]) return // Skip already marked letters

      const targetIndex = remainingTargetLetters.indexOf(letter)
      if (targetIndex !== -1) {
        statuses[index] = "present"
        // Remove this letter from remaining target letters
        remainingTargetLetters[targetIndex] = ""
      } else {
        statuses[index] = "absent"
      }
    })

    return statuses
  }, [guess, target])

  // Get color classes based on letter status
  const getColorClass = (status: LetterStatus) => {
    switch (status) {
      case "correct":
        return "bg-green-500 text-white border-green-600"
      case "present":
        return "bg-yellow-500 text-white border-yellow-600"
      case "absent":
        return "bg-gray-400 text-white border-gray-500 dark:bg-gray-600 dark:border-gray-700"
      default:
        return "bg-transparent"
    }
  }

  return (
    <div className="flex flex-wrap justify-center gap-1 my-2">
      {guess.split("").map((letter, index) => (
        <div
          key={index}
          className={`w-7 h-7 md:w-8 md:h-8 flex items-center justify-center rounded border-2 font-bold text-sm uppercase ${getColorClass(letterStatuses[index] || "absent")}`}
        >
          {letter}
        </div>
      ))}
    </div>
  )
}


"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { fruitData } from "@/lib/fruit-data"
import FruitInput from "./fruit-input"
import GuessFeedback from "./guess-feedback"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle, Info } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export default function FruitGame() {
  const [targetFruit, setTargetFruit] = useState<any>(null)
  const [guess, setGuess] = useState("")
  const [guessHistory, setGuessHistory] = useState<any[]>([])
  const [gameWon, setGameWon] = useState(false)
  const [showError, setShowError] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const [attempts, setAttempts] = useState(0)
  const [showHint, setShowHint] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  // Initialize the game with a random fruit
  useEffect(() => {
    startNewGame()
  }, [])

  const startNewGame = () => {
    const randomIndex = Math.floor(Math.random() * fruitData.length)
    setTargetFruit(fruitData[randomIndex])
    setGuess("")
    setGuessHistory([])
    setGameWon(false)
    setShowError(false)
    setAttempts(0)
    setShowHint(false)
  }

  const handleGuessSubmit = () => {
    if (!guess.trim()) return

    // Check if the guess is valid (exists in our fruit data)
    const guessLower = guess.toLowerCase()
    const guessedFruit = fruitData.find((fruit) => fruit.name.toLowerCase() === guessLower)

    if (!guessedFruit) {
      setErrorMessage(`"${guess}" is not in our fruit database.`)
      setShowError(true)
      setTimeout(() => setShowError(false), 3000)
      return
    }

    // Create feedback for the guess
    const feedback = {
      fruit: guessedFruit.name,
      emoji: guessedFruit.emoji,
      taste: {
        match: guessedFruit.taste === targetFruit.taste,
        value: guessedFruit.taste,
        target: targetFruit.taste,
      },
      origin: {
        match: guessedFruit.origin === targetFruit.origin,
        value: guessedFruit.origin,
        target: targetFruit.origin,
      },
      color: {
        match: guessedFruit.color === targetFruit.color,
        value: guessedFruit.color,
        target: targetFruit.color,
      },
      texture: {
        match: guessedFruit.texture === targetFruit.texture,
        value: guessedFruit.texture,
        target: targetFruit.texture,
      },
    }

    // Add to history
    setGuessHistory([feedback, ...guessHistory])
    setAttempts(attempts + 1)

    // Check if the guess is correct
    if (guessedFruit.name.toLowerCase() === targetFruit.name.toLowerCase()) {
      setGameWon(true)
    } else if (attempts >= 4) {
      // Show hint after 5 attempts
      setShowHint(true)
    }

    // Reset the guess
    setGuess("")
  }

  const getHint = () => {
    if (!targetFruit) return ""
    return `Hint: The fruit starts with "${targetFruit.name.charAt(0)}" and has ${targetFruit.name.length} letters.`
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-center flex items-center justify-center">
          {gameWon ? (
            <div className="flex items-center">
              <span className="text-2xl mr-2">{targetFruit.emoji}</span>
              Congratulations! You found {targetFruit.name}!
            </div>
          ) : (
            <div className="flex items-center">
              Guess the Fruit
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" className="ml-2 h-6 w-6">
                      <Info className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Guess the fruit and get feedback on its attributes.</p>
                    <p>👅 = Taste, 🌍 = Origin, 🎨 = Color, 👆 = Texture</p>
                    <p>Hover over icons to see details.</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {showError && (
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{errorMessage}</AlertDescription>
          </Alert>
        )}

        {showHint && !gameWon && (
          <Alert className="mb-4 bg-primary/10">
            <Info className="h-4 w-4" />
            <AlertDescription>{getHint()}</AlertDescription>
          </Alert>
        )}

        <div className="mb-6">
          <FruitInput guess={guess} setGuess={setGuess} onSubmit={handleGuessSubmit} disabled={gameWon} />
        </div>

        <div className="space-y-2">
          {guessHistory.map((feedback, index) => (
            <GuessFeedback key={index} feedback={feedback} attributes={[]} />
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <div className="text-sm text-muted-foreground">Attempts: {attempts}</div>
        <Button onClick={startNewGame}>{gameWon ? "Play Again" : "New Game"}</Button>
      </CardFooter>
    </Card>
  )
}


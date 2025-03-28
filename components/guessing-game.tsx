"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { getCategoryData, getItemsForCategory } from "@/lib/category-data"
import GuessInput from "./guess-input"
import GuessFeedback from "./guess-feedback"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle, BarChart, Info, ArrowLeft, HelpCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import Link from "next/link"
import Confetti from "./confetti"
import GameStats from "./game-stats"
import HowToPlay from "./how-to-play"
import { useGameStats } from "@/hooks/use-game-stats"
import { useSound } from "@/hooks/use-sound"
import ShareResults from "./share-result"
import MobileTooltip from "./mobile-tooltip"
import { useMobileDetect } from "@/hooks/use-mobile"
import { getCategoryHeaderColor, getCategoryButtonColor, getCategoryInputColor } from "@/lib/utils";

export default function GuessingGame({ category }: { category: string }) {
  const categoryData = getCategoryData(category)
  const items = getItemsForCategory(category)
  const isMobile = useMobileDetect()

  const [targetItem, setTargetItem] = useState<any>(null)
  const [guess, setGuess] = useState("")
  const [guessHistory, setGuessHistory] = useState<any[]>([])
  const [gameWon, setGameWon] = useState(false)
  const [showError, setShowError] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const [attempts, setAttempts] = useState(0)
  const [showHint, setShowHint] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)
  const [showStats, setShowStats] = useState(false)
  const [showHowToPlay, setShowHowToPlay] = useState(false)
  const [newFeedback, setNewFeedback] = useState<boolean>(false)

  const { recordGame } = useGameStats(category)
  const { playSound } = useSound()

  // Initialize the game with a random item
  useEffect(() => {
    startNewGame()

    // Check if this is the first time playing this category
    const hasPlayed = localStorage.getItem(`played-${category}`)
    if (!hasPlayed) {
      setShowHowToPlay(true)
      localStorage.setItem(`played-${category}`, "true")
    }
  }, [])

  const startNewGame = () => {
    const randomIndex = Math.floor(Math.random() * items.length)
    setTargetItem(items[randomIndex])
    setGuess("")
    setGuessHistory([])
    setGameWon(false)
    setShowError(false)
    setAttempts(0)
    setShowHint(false)
    setShowConfetti(false)
    setShowStats(false)
  }

  const handleGuessSubmit = () => {
    if (!guess.trim()) return

    // Check if the guess is valid (exists in our data)
    const guessLower = guess.toLowerCase()
    const guessedItem = items.find((item) => item.name.toLowerCase() === guessLower)

    if (!guessedItem) {
      setErrorMessage(`"${guess}" is not in our ${categoryData?.itemName} database.`)
      setShowError(true)
      setTimeout(() => setShowError(false), 3000)
      return
    }

    // Create feedback for the guess
    const feedback: any = {
      name: guessedItem.name,
      emoji: guessedItem.emoji,
    }

    // Add attribute feedback
    categoryData?.attributes.forEach((attr) => {
      feedback[attr.id] = {
        match: guessedItem[attr.id] === targetItem[attr.id],
        value: guessedItem[attr.id],
        target: targetItem[attr.id],
      }
    })

    // Add to history and play sound
    setGuessHistory((prev) => {
      setNewFeedback(true)
      setTimeout(() => setNewFeedback(false), 500)
      playSound("submit")
      return [feedback, ...prev]
    })

    setAttempts(attempts + 1)

    // Check if the guess is correct
    if (guessedItem.name.toLowerCase() === targetItem.name.toLowerCase()) {
      setGameWon(true)
      setShowConfetti(true)
      playSound("win")

      // Record the game in stats
      recordGame(true, attempts + 1)

      // Show stats after a short delay
      setTimeout(() => {
        setShowStats(true)
      }, 2000)
    } else if (attempts >= 4) {
      // Show hint after 5 attempts
      setShowHint(true)
    }

    // Reset the guess
    setGuess("")
  }

  const getHint = () => {
    if (!targetItem) return ""
    return `Hint: The ${categoryData?.itemName} starts with "${targetItem.name.charAt(0)}" and has ${targetItem.name.length} letters.`
  }

  if (!categoryData) {
    return <div>Category not found</div>
  }

  // Get category-specific colors
  const headerBgClass = getCategoryHeaderColor(category)
  const buttonColorClass = getCategoryButtonColor(category)

  // Info tooltip content
  const infoTooltipContent = (
    <>
      <p>Guess the {categoryData.itemName} and get feedback on its attributes.</p>
      {categoryData.attributes.map((attr) => (
        <p key={attr.id}>
          {attr.icon} = {attr.name}
        </p>
      ))}
      {categoryData.enableWordleStyle && (
        <div className="mt-2">
          <p>Letter colors:</p>
          <p>🟩 Green = Correct letter in correct position</p>
          <p>🟨 Yellow = Correct letter in wrong position</p>
          <p>⬜ Gray = Letter not in the word</p>
        </div>
      )}
      <p>Tap on attributes to see details.</p>
    </>
  )

  return (
    <Card className="w-full border-2">
      {showConfetti && <Confetti />}
      <CardHeader className={headerBgClass}>
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center text-sm text-foreground/70 hover:text-foreground">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back
          </Link>
          <CardTitle className="text-center flex-1 flex items-center justify-center">
            {gameWon ? (
              <div className="flex items-center">
                <span className="text-2xl mr-2">{targetItem.emoji}</span>
                Congratulations! You found {targetItem.name}!
              </div>
            ) : (
              <div className="flex items-center">
                Guess the {categoryData.itemName}
                {isMobile ? (
                  <MobileTooltip
                    trigger={
                      <Button variant="ghost" size="icon" className="ml-2 h-6 w-6">
                        <Info className="h-4 w-4" />
                      </Button>
                    }
                    content={infoTooltipContent}
                    title="How to Play"
                  />
                ) : (
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="ghost" size="icon" className="ml-2 h-6 w-6">
                          <Info className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent className="max-w-[250px]">{infoTooltipContent}</TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                )}
              </div>
            )}
          </CardTitle>
          <div className="flex items-center">
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setShowHowToPlay(true)}>
              <HelpCircle className="h-4 w-4" />
              <span className="sr-only">How to Play</span>
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setShowStats(true)}>
              <BarChart className="h-4 w-4" />
              <span className="sr-only">Statistics</span>
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {showError && (
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{errorMessage}</AlertDescription>
          </Alert>
        )}

        {showHint && !gameWon && (
          <Alert className={`mb-4 ${headerBgClass}`}>
            <Info className="h-4 w-4" />
            <AlertDescription>{getHint()}</AlertDescription>
          </Alert>
        )}

        <div className="mb-6">
          <GuessInput
            guess={guess}
            setGuess={setGuess}
            onSubmit={handleGuessSubmit}
            disabled={gameWon}
            maxLength={20}
            categoryColor={getCategoryInputColor(category)}
          />
        </div>

        <div className="space-y-2">
          {guessHistory.map((feedback, index) => (
            <GuessFeedback
              key={index}
              feedback={feedback}
              attributes={categoryData.attributes}
              isNew={index === 0 && newFeedback}
              enableWordleStyle={categoryData.enableWordleStyle}
              targetName={targetItem?.name || ""}
            />
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex flex-wrap justify-between gap-2">
        <div className="text-sm text-muted-foreground">Attempts: {attempts}</div>
        <div className="flex items-center gap-2">
          {gameWon && <ShareResults categoryName={categoryData.title} attempts={attempts} won={gameWon} />}
          <Button onClick={startNewGame} className={buttonColorClass}>
            {gameWon ? "Play Again" : "New Game"}
          </Button>
        </div>
      </CardFooter>

      <GameStats
        categoryId={category}
        categoryTitle={categoryData.title}
        open={showStats}
        onOpenChange={setShowStats}
        onPlayAgain={startNewGame}
      />

      <HowToPlay categoryData={categoryData} open={showHowToPlay} onOpenChange={setShowHowToPlay} />
    </Card>
  )
}

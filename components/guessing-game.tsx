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
import { useSound } from "@/hooks/use-sound"
import ShareResults from "./share-result"
import MobileTooltip from "./mobile-tooltip"
import { useMobileDetect } from "@/hooks/use-mobile"
import { getCategoryHeaderColor, getCategoryButtonColor, getCategoryInputColor } from "@/lib/utils";

export interface GameStats {
  totalGames: number
  wins: number
  losses: number
  totalAttempts: number
  bestAttempt: number | null
  lastPlayed: string | null
}

const defaultStats: GameStats = {
  totalGames: 0,
  wins: 0,
  losses: 0,
  totalAttempts: 0,
  bestAttempt: null,
  lastPlayed: null,
}

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

  const [stats, setStats] = useState<GameStats>(() => {
    if (typeof window !== "undefined") {
      const savedStats = localStorage.getItem(`guessing-game-stats-${category}`);
      return savedStats ? JSON.parse(savedStats) : defaultStats;
    }
    return defaultStats;
  });
  const [isClient, setIsClient] = useState(false);
  const { playSound } = useSound()

  // Initialize the game with a random item
  useEffect(() => {
    setIsClient(true);
    startNewGame();

    // Check if this is the first time playing this category
    const hasPlayed = localStorage.getItem(`played-${category}`)
    if (!hasPlayed) {
      setShowHowToPlay(true)
      localStorage.setItem(`played-${category}`, "true")
    }
  }, []);

  useEffect(() => {
    if (isClient) {
      const savedStats = localStorage.getItem(`guessing-game-stats-${category}`);

      if (savedStats) {
        try {
          const parsedStats = JSON.parse(savedStats);
          setStats(parsedStats);
        } catch (e) {
          console.error("Failed to parse saved stats", e);
        }
      }
    }
  }, [isClient, category]);

  const recordGame = (won: boolean, attempts: number) => {
    setStats((prevStats) => {
      const newStats = {
        totalGames: prevStats.totalGames + 1,
        wins: won ? prevStats.wins + 1 : prevStats.wins,
        losses: !won ? prevStats.losses + 1 : prevStats.losses,
        totalAttempts: prevStats.totalAttempts + attempts,
        bestAttempt: won
          ? prevStats.bestAttempt === null || attempts < prevStats.bestAttempt
            ? attempts
            : prevStats.bestAttempt
          : prevStats.bestAttempt,
        lastPlayed: new Date().toISOString(),
      };

      localStorage.setItem(`guessing-game-stats-${category}`, JSON.stringify(newStats));
      return newStats;
    });

  };

  const clearStats = () => {
    setStats(defaultStats);
    if (isClient) {
      localStorage.removeItem(`guessing-game-stats-${category}`);
    }
  }

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

  // Function to normalize item names for comparison (handles plurals and common variations)
  const normalizeItemName = (name: string): string => {
    // Convert to lowercase
    let normalized = name.toLowerCase().trim()

    // Remove trailing 's' for plurals if it exists
    if (normalized.endsWith("s") && normalized.length > 1) {
      const singular = normalized.slice(0, -1)
      // Check if the singular form exists in our items
      const singularExists = items.some((item) => item.name.toLowerCase() === singular)

      if (singularExists) {
        normalized = singular
      }
    }

    return normalized
  }

  const handleGuessSubmit = () => {
    if (!guess.trim()) return

    // Normalize the guess for comparison
    const normalizedGuess = normalizeItemName(guess)

    // Find the matching item, allowing for plurals and variations
    const guessedItem = items.find((item) => {
      const normalizedItemName = normalizeItemName(item.name)
      return normalizedItemName === normalizedGuess
    })

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
      // Special handling for release_year in Bollywood category
      if (category === "bollywood" && attr.id === "release_year") {
        const guessYear = Number.parseInt(guessedItem[attr.id])
        const targetYear = Number.parseInt(targetItem[attr.id])

        feedback[attr.id] = {
          match: guessYear === targetYear,
          value: guessedItem[attr.id],
          target: targetItem[attr.id],
          direction: guessYear < targetYear ? "later" : guessYear > targetYear ? "earlier" : "match",
        }
      } else {
        feedback[attr.id] = {
          match: guessedItem[attr.id] === targetItem[attr.id],
          value: guessedItem[attr.id],
          target: targetItem[attr.id],
        }
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
    if (normalizeItemName(guessedItem.name) === normalizeItemName(targetItem.name)) {
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
      {category === "bollywood" && (
        <div className="mt-1">
          <p>For release year:</p>
          <p>⬆️ = Movie was released later than your guess</p>
          <p>⬇️ = Movie was released earlier than your guess</p>
        </div>
      )}
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
              category={category}
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
        categoryTitle={categoryData.title}
        open={showStats}
        onOpenChange={setShowStats}
        onPlayAgain={startNewGame}
        stats={stats}
        clearStats={clearStats}
      />

      <HowToPlay categoryData={categoryData} open={showHowToPlay} onOpenChange={setShowHowToPlay} />
    </Card>
  )
}
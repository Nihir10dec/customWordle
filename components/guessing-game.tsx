"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { getCategoryData, getItemsForCategory } from "@/lib/category-data"
import GuessInput from "./guess-input"
import GuessFeedback from "./guess-feedback"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle, BarChart, Info, ArrowLeft, HelpCircle, Lightbulb } from "lucide-react"
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
  const [hintAttribute, setHintAttribute] = useState<string | null>(null)
  const [showConfetti, setShowConfetti] = useState(false)
  const [showStats, setShowStats] = useState(false)
  const [showHowToPlay, setShowHowToPlay] = useState(false)
  const [newFeedback, setNewFeedback] = useState<boolean>(false)
  const [attemptsAfterHint, setAttemptsAfterHint] = useState(0)
  const [hintButtonEnabled, setHintButtonEnabled] = useState(false)
  const [revealedHints, setRevealedHints] = useState<string[]>([])
  const [correctlyGuessedAttributes, setCorrectlyGuessedAttributes] = useState<string[]>([])
  const [usedLetters, setUsedLetters] = useState<Set<string>>(new Set())
  const [incorrectLetters, setIncorrectLetters] = useState<Set<string>>(new Set())
  const [hasGuessed, setHasGuessed] = useState(false)

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

  // Update hint button status based on attempts
  useEffect(() => {
    if (attempts >= 3 && attemptsAfterHint >= 2) {
      setHintButtonEnabled(true)
    } else if (attempts < 3) {
      setHintButtonEnabled(false)
    }
  }, [attempts, attemptsAfterHint])

  const startNewGame = () => {
    const randomIndex = Math.floor(Math.random() * items.length)
    setTargetItem(items[randomIndex])
    setGuess("")
    setGuessHistory([])
    setGameWon(false)
    setShowError(false)
    setAttempts(0)
    setShowHint(false)
    setHintAttribute(null)
    setShowConfetti(false)
    setShowStats(false)
    setAttemptsAfterHint(0)
    setHintButtonEnabled(false)
    setRevealedHints([])
    setCorrectlyGuessedAttributes([])
    setUsedLetters(new Set())
    setIncorrectLetters(new Set())
    setHasGuessed(false)
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

  // Function to get a random attribute hint
  const getRandomAttributeHint = (): string => {
    if (!targetItem || !categoryData) return ""

    // Filter out attributes that have already been revealed or correctly guessed
    const availableAttributes = categoryData.attributes.filter(
      (attr) => !revealedHints.includes(attr.id) && !correctlyGuessedAttributes.includes(attr.id),
    )

    // If all attributes have been revealed or guessed, use any non-guessed attribute
    const nonGuessedAttributes = categoryData.attributes.filter((attr) => !correctlyGuessedAttributes.includes(attr.id))

    // If all attributes have been correctly guessed, just pick any attribute
    const attributes =
      availableAttributes.length > 0
        ? availableAttributes
        : nonGuessedAttributes.length > 0
          ? nonGuessedAttributes
          : categoryData.attributes

    // Select a random attribute
    const randomIndex = Math.floor(Math.random() * attributes.length)
    const selectedAttribute = attributes[randomIndex]

    // Add to revealed hints
    if (!revealedHints.includes(selectedAttribute.id)) {
      setRevealedHints([...revealedHints, selectedAttribute.id])
    }

    return selectedAttribute.id
  }

  // Function to get hint text based on the selected attribute
  const getHintText = (): string => {
    if (!targetItem || !hintAttribute || !categoryData) return ""

    const attribute = categoryData.attributes.find((attr) => attr.id === hintAttribute)
    if (!attribute) return ""

    return `Hint: The ${categoryData.itemName}'s ${attribute.name.toLowerCase()} is ${targetItem[hintAttribute]}.`
  }

  // Function to update used and incorrect letters
  const updateLetterStatus = (guessedWord: string, targetWord: string) => {
    const guessLetters = guessedWord.toLowerCase().split("")
    const targetLetters = targetWord.toLowerCase().split("")

    // Add all guessed letters to used letters
    const newUsedLetters = new Set(usedLetters)
    guessLetters.forEach((letter) => newUsedLetters.add(letter))
    setUsedLetters(newUsedLetters)

    // Find letters that are in the guess but not in the target
    const newIncorrectLetters = new Set(incorrectLetters)
    guessLetters.forEach((letter) => {
      if (!targetLetters.includes(letter)) {
        newIncorrectLetters.add(letter)
      }
    })
    setIncorrectLetters(newIncorrectLetters)
  }

  // Function to handle hint button click
  const handleShowHint = () => {
    if (!hintButtonEnabled || gameWon) return

    const attributeId = getRandomAttributeHint()
    setHintAttribute(attributeId)
    setShowHint(true)
    setHintButtonEnabled(false)
    setAttemptsAfterHint(0)

    // Play a sound for hint reveal
    playSound("submit")
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

    // Set hasGuessed to true after first valid guess
    setHasGuessed(true)

    // Create feedback for the guess
    const feedback: any = {
      name: guessedItem.name,
      emoji: guessedItem.emoji,
    }

    // Track correctly guessed attributes
    const newCorrectlyGuessedAttributes = [...correctlyGuessedAttributes]

    // Add attribute feedback
    categoryData?.attributes.forEach((attr) => {
      // Special handling for release_year in Bollywood category
      if (category === "bollywood" && attr.id === "release_year") {
        const guessYear = Number.parseInt(guessedItem[attr.id])
        const targetYear = Number.parseInt(targetItem[attr.id])

        const isMatch = guessYear === targetYear

        feedback[attr.id] = {
          match: isMatch,
          value: guessedItem[attr.id],
          target: targetItem[attr.id],
          direction: guessYear < targetYear ? "later" : guessYear > targetYear ? "earlier" : "match",
        }

        // If this attribute was guessed correctly, add it to the list
        if (isMatch && !newCorrectlyGuessedAttributes.includes(attr.id)) {
          newCorrectlyGuessedAttributes.push(attr.id)
        }
      } else {
        const isMatch = guessedItem[attr.id] === targetItem[attr.id]

        feedback[attr.id] = {
          match: isMatch,
          value: guessedItem[attr.id],
          target: targetItem[attr.id],
        }

        // If this attribute was guessed correctly, add it to the list
        if (isMatch && !newCorrectlyGuessedAttributes.includes(attr.id)) {
          newCorrectlyGuessedAttributes.push(attr.id)
        }
      }
    })

    // Update correctly guessed attributes
    setCorrectlyGuessedAttributes(newCorrectlyGuessedAttributes)

    // Update letter status for keyboard
    if (categoryData?.enableWordleStyle) {
      updateLetterStatus(guessedItem.name, targetItem.name)
    }

    // Add to history and play sound
    setGuessHistory((prev) => {
      setNewFeedback(true)
      setTimeout(() => setNewFeedback(false), 500)
      playSound("submit")
      return [feedback, ...prev]
    })

    // Increment attempts and attempts after hint
    setAttempts(attempts + 1)
    setAttemptsAfterHint(attemptsAfterHint + 1)

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
    } else if (attempts >= 4 && !hintAttribute) {
      // Show attribute hint after 5 attempts if no hint has been shown yet
      const attributeId = getRandomAttributeHint()
      setHintAttribute(attributeId)
      setShowHint(true)
    }

    // Reset the guess
    setGuess("")
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
  );

  // Hint button tooltip content
  const hintButtonTooltip = hintButtonEnabled
    ? "Reveal a random attribute of the target item"
    : attempts < 3
      ? "Available after 3 wrong attempts"
      : "Available after 2 more attempts";

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
            <AlertDescription>{getHintText()}</AlertDescription>
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
            incorrectLetters={incorrectLetters}
          />
        </div>

        {!gameWon && (
          <div className="flex justify-center mb-4">
            {isMobile ? (
              <MobileTooltip
                trigger={
                  <Button
                    variant="outline"
                    size="sm"
                    className="gap-1"
                    onClick={handleShowHint}
                    disabled={!hintButtonEnabled || gameWon}
                  >
                    <Lightbulb className={`h-4 w-4 ${hintButtonEnabled ? "text-yellow-500" : ""}`} />
                    <span>Show Hint</span>
                  </Button>
                }
                content={hintButtonTooltip}
                title="Hint Button"
              />
            ) : (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span>
                      <Button
                        variant="outline"
                        size="sm"
                        className="gap-1"
                        onClick={handleShowHint}
                        disabled={!hintButtonEnabled || gameWon}
                      >
                        <Lightbulb className={`h-4 w-4 ${hintButtonEnabled ? "text-yellow-500" : ""}`} />
                        <span>Show Hint</span>
                      </Button>
                    </span>
                  </TooltipTrigger>
                  <TooltipContent>{hintButtonTooltip}</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </div>
        )}

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
          <Button onClick={startNewGame} className={buttonColorClass} disabled={!hasGuessed && !gameWon}>
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
        itemFact={gameWon ? targetItem.fact : null}
      />

      <HowToPlay categoryData={categoryData} open={showHowToPlay} onOpenChange={setShowHowToPlay} />
    </Card>
  )
}
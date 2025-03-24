"use client"

import { useState, useEffect } from "react"

interface GameStats {
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

export function useGameStats(categoryId: string) {
  const [stats, setStats] = useState<GameStats>(defaultStats)
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); // Only runs on the client
  }, []);

  // Load stats from localStorage on mount
  useEffect(() => {
    if (isClient) {
      const savedStats = localStorage.getItem(`guessing-game-stats-${categoryId}`);

      if (savedStats) {
        try {
          setStats(JSON.parse(savedStats))
        } catch (e) {
          console.error("Failed to parse saved stats", e)
          setStats(defaultStats)
        }
      }
    }
  }, [categoryId, isClient]);

  // Save stats to localStorage whenever they change
  useEffect(() => {
    if (isClient && stats.totalGames > 0) {
      localStorage.setItem(`guessing-game-stats-${categoryId}`, JSON.stringify(stats))
    }
  }, [stats, categoryId, isClient])

  const recordGame = (won: boolean, attempts: number) => {
    setStats((prevStats) => {
      const newStats = {
        ...prevStats,
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
      }
      return newStats
    })
  }

  const clearStats = () => {
    setStats(defaultStats)
    if (isClient) {
      localStorage.removeItem(`guessing-game-stats-${categoryId}`)
    }
  }

  return { stats, recordGame, clearStats }
}


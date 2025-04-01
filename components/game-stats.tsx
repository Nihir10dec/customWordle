"use client"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { ChevronRight } from "lucide-react"
import type { GameStats } from "./guessing-game";
import { useEffect } from "react"

interface GameStatsProps {
  categoryTitle: string
  open: boolean
  onOpenChange: (open: boolean) => void
  onPlayAgain: () => void
  stats: GameStats;
  clearStats: () => void;
  itemFact?: string | null
}

export default function GameStats({
  categoryTitle,
  open,
  onOpenChange,
  onPlayAgain,
  stats,
  clearStats,
  itemFact = null,
}: GameStatsProps) {

  const averageAttempts = stats.totalGames > 0 ? Math.round((stats.totalAttempts / stats.totalGames) * 10) / 10 : 0
  const bestAttempt = stats.bestAttempt || "-"

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Your {categoryTitle} Stats</DialogTitle>
          {/* <DialogDescription>Your performance in the {categoryTitle} category</DialogDescription> */}
        </DialogHeader>

        {itemFact && (
          <div className="bg-primary/10 p-4 rounded-lg mb-4 text-sm">
            <h3 className="font-bold mb-1">Fun Fact of the answer</h3>
            <p>{itemFact}</p>
          </div>
        )}

        <div className="grid grid-cols-2 gap-4 py-4">
          <div className="flex flex-col items-center p-3 bg-muted rounded-lg">
            <span className="text-sm text-muted-foreground">Games Played</span>
            <span className="text-2xl font-bold">{stats.totalGames}</span>
          </div>

          <div className="flex flex-col items-center p-3 bg-muted rounded-lg">
            <span className="text-sm text-muted-foreground">Win Rate</span>
            <span className="text-2xl font-bold">
              {stats.totalGames > 0 ? `${Math.round((stats.wins / stats.totalGames) * 100)}%` : "0%"}
            </span>
          </div>

          <div className="flex flex-col items-center p-3 bg-muted rounded-lg">
            <span className="text-sm text-muted-foreground">Avg Attempts</span>
            <span className="text-2xl font-bold">{averageAttempts}</span>
          </div>

          <div className="flex flex-col items-center p-3 bg-muted rounded-lg">
            <span className="text-sm text-muted-foreground">Best Attempt</span>
            <span className="text-2xl font-bold">{bestAttempt}</span>
          </div>
        </div>

        <div className="flex flex-col gap-2 mt-2">
          <Button onClick={onPlayAgain} className="w-full">
            Play Again
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>

          <Button variant="outline" onClick={() => clearStats()} className="w-full">
            Reset Stats
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}


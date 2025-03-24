"use client"

import { useEffect, useRef, useState } from "react"

type SoundType = "submit" | "win"

export function useSound() {
  const submitSoundRef = useRef<HTMLAudioElement | null>(null)
  const winSoundRef = useRef<HTMLAudioElement | null>(null)

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); // Only runs on the client
  }, []);

  useEffect(() => {
    if (isClient) {
      submitSoundRef.current = new Audio("/sounds/submit.wav")
      winSoundRef.current = new Audio("/sounds/win.wav")
    }

    return () => {
      submitSoundRef.current = null
      winSoundRef.current = null
    }
  }, [isClient]);

  const playSound = (type: SoundType) => {
    if (!isClient) return

    try {
      if (type === "submit" && submitSoundRef.current) {
        submitSoundRef.current.currentTime = 0
        submitSoundRef.current.play()
      } else if (type === "win" && winSoundRef.current) {
        winSoundRef.current.currentTime = 0
        winSoundRef.current.play()
      }
    } catch (error) {
      console.error("Error playing sound:", error)
    }
  }

  return { playSound }
}


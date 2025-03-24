"use client"

import { useEffect, useState } from "react"
import ReactConfetti from "react-confetti"

export default function Confetti() {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const [pieces, setPieces] = useState(200)

  useEffect(() => {
    const { innerWidth, innerHeight } = window
    setDimensions({
      width: innerWidth,
      height: innerHeight,
    })

    const timer = setTimeout(() => {
      setPieces(0)
    }, 5000)

    return () => clearTimeout(timer)
  }, [])

  return <ReactConfetti width={dimensions.width} height={dimensions.height} numberOfPieces={pieces} recycle={false} />
}


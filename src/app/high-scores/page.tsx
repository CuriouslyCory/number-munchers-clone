"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "~/components/ui/button"

interface HighScore {
  name: string
  score: number
  date: string
}

export default function HighScoresPage() {
  const [highScores, setHighScores] = useState<HighScore[]>([])

  useEffect(() => {
    // In a real app, this would fetch from an API
    // For now, we'll use localStorage
    const storedScores = localStorage.getItem("numberMunchersHighScores")
    if (storedScores) {
      setHighScores(JSON.parse(storedScores))
    } else {
      // Sample data
      const sampleScores: HighScore[] = [
        { name: "MATH", score: 1200, date: "2023-01-15" },
        { name: "WHIZ", score: 950, date: "2023-02-10" },
        { name: "PROF", score: 800, date: "2023-03-05" },
        { name: "NERD", score: 650, date: "2023-04-20" },
        { name: "COOL", score: 500, date: "2023-05-12" },
      ]
      setHighScores(sampleScores)
      localStorage.setItem("numberMunchersHighScores", JSON.stringify(sampleScores))
    }
  }, [])

  return (
    <div className="flex min-h-screen flex-col items-center bg-blue-950 text-white p-4">
      <div className="max-w-md w-full py-8">
        <h1 className="text-3xl font-bold mb-8 text-center font-mono">HIGH SCORES</h1>

        <div className="bg-blue-900 border-2 border-pink-500 p-4 mb-8">
          <table className="w-full">
            <thead>
              <tr className="border-b border-pink-500">
                <th className="text-left py-2">Rank</th>
                <th className="text-left py-2">Name</th>
                <th className="text-right py-2">Score</th>
              </tr>
            </thead>
            <tbody>
              {highScores.map((score, index) => (
                <tr key={index} className="border-b border-pink-500/30">
                  <td className="py-2">{index + 1}</td>
                  <td className="py-2 font-mono">{score.name}</td>
                  <td className="py-2 text-right">{score.score}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-center">
          <Link href="/">
            <Button className="w-40 h-12 text-xl">Back to Menu</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}


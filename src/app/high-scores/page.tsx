"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "~/components/ui/button";

interface HighScore {
  name: string;
  score: number;
  date: string;
}

const sampleScores: HighScore[] = [
  { name: "MATH", score: 1200, date: "2023-01-15" },
  { name: "WHIZ", score: 950, date: "2023-02-10" },
  { name: "PROF", score: 800, date: "2023-03-05" },
  { name: "NERD", score: 650, date: "2023-04-20" },
  { name: "COOL", score: 500, date: "2023-05-12" },
];

function loadHighScores(): HighScore[] {
  if (typeof window === "undefined") return sampleScores;
  const storedScores = localStorage.getItem("numberMunchersHighScores");
  if (storedScores) {
    return JSON.parse(storedScores) as HighScore[];
  }
  localStorage.setItem(
    "numberMunchersHighScores",
    JSON.stringify(sampleScores),
  );
  return sampleScores;
}

export default function HighScoresPage() {
  const [highScores] = useState<HighScore[]>(loadHighScores);

  return (
    <div className="flex min-h-screen flex-col items-center bg-blue-950 p-4 text-white">
      <div className="mx-auto w-full max-w-md py-8">
        <h1 className="mb-8 text-center font-mono text-3xl font-bold">
          HIGH SCORES
        </h1>

        <div className="mb-8 border-2 border-pink-500 bg-blue-900 p-4">
          <table className="w-full">
            <thead>
              <tr className="border-b border-pink-500">
                <th className="py-2 text-left">Rank</th>
                <th className="py-2 text-left">Name</th>
                <th className="py-2 text-right">Score</th>
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
            <Button className="h-12 w-40 text-xl">Back to Menu</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

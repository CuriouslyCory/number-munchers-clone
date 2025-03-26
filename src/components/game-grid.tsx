import type { Cell, Position, Troggle } from "~/lib/game-logic"
import MuncherCharacter from "./muncher-character"
import TroggleCharacter from "./troggle-character"

interface GameGridProps {
  grid: Cell[][]
  muncher: Position
  troggles: Troggle[]
}

export default function GameGrid({ grid, muncher, troggles }: GameGridProps) {
  if (grid.length === 0) {
    // Return empty grid if game hasn't started
    return (
      <div className="border-4 border-pink-500 bg-blue-900 grid grid-cols-6 grid-rows-5 aspect-[6/5] w-full">
        {Array.from({ length: 30 }).map((_, index) => (
          <div
            key={index}
            className="border border-pink-500 flex items-center justify-center text-3xl font-bold font-mono"
          />
        ))}
      </div>
    )
  }

  return (
    <div className="border-4 border-pink-500 bg-blue-900 grid grid-cols-6 grid-rows-5 aspect-[6/5] w-full relative">
      {grid.map((row, y) =>
        row.map((cell, x) => (
          <div
            key={`${y}-${x}`}
            className="border border-pink-500 flex items-center justify-center text-3xl font-bold font-mono"
          >
            {!cell.munched && cell.value}
          </div>
        )),
      )}

      {/* Muncher */}
      <div
        className="absolute transition duration-200"
        style={{
          top: `${muncher.y * 20}%`,
          left: `${muncher.x * 16.666}%`,
          width: "16.666%",
          height: "20%",
        }}
      >
        <MuncherCharacter />
      </div>

      {/* Troggles */}
      {troggles.map((troggle) => (
        <div
          key={troggle.id}
          className="absolute transition duration-200"
          style={{
            top: `${troggle.position.y * 20}%`,
            left: `${troggle.position.x * 16.666}%`,
            width: "16.666%",
            height: "20%",
          }}
        >
          <TroggleCharacter type={troggle.type} />
        </div>
      ))}
    </div>
  )
}


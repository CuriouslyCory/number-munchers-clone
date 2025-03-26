"use client"

import { useEffect, useState, useCallback } from "react"
import { useRouter } from "next/navigation"
import { Button } from "~/components/ui/button"
import GameGrid from "~/components/game-grid"
import GameHeader from "~/components/game-header"
import GameFooter from "~/components/game-footer"
import { generateGameBoard, checkAnswer, GameRule, type GameState, type Position, type Troggle } from "~/lib/game-logic"

export default function GamePage() {
  const router = useRouter()
  const [gameState, setGameState] = useState<GameState>({
    level: 1,
    score: 0,
    lives: 3,
    rule: GameRule.MULTIPLES,
    ruleValue: 2,
    grid: [],
    muncher: { x: 2, y: 2 },
    troggles: [],
    gameStatus: "ready", // ready, playing, paused, gameOver
  })

  const startGame = useCallback(() => {
    const { grid, rule, ruleValue } = generateGameBoard(gameState.level)

    // Start with one troggle
    const initialTroggles: Troggle[] = [
      {
        id: 1,
        position: { x: 0, y: 0 },
        type: "random",
        direction: "right",
      },
    ]

    setGameState((prev) => ({
      ...prev,
      grid,
      rule,
      ruleValue,
      muncher: { x: 2, y: 2 },
      troggles: initialTroggles,
      gameStatus: "playing",
    }))
  }, [gameState.level])

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (gameState.gameStatus !== "playing") return

      const { muncher, grid } = gameState
      const newPosition: Position = { ...muncher }

      switch (e.key) {
        case "ArrowUp":
          if (muncher.y > 0) newPosition.y -= 1
          break
        case "ArrowDown":
          if (muncher.y < 4) newPosition.y += 1
          break
        case "ArrowLeft":
          if (muncher.x > 0) newPosition.x -= 1
          break
        case "ArrowRight":
          if (muncher.x < 5) newPosition.x += 1
          break
        case " ":
          // Munch the current cell
          const currentCell = grid[muncher.y][muncher.x]
          if (!currentCell.munched) {
            const isCorrect = checkAnswer(currentCell.value, gameState.rule, gameState.ruleValue)

            const newGrid = [...grid]
            newGrid[muncher.y][muncher.x] = {
              ...currentCell,
              munched: true,
            }

            setGameState((prev) => ({
              ...prev,
              grid: newGrid,
              score: isCorrect ? prev.score + 10 : Math.max(0, prev.score - 5),
              lives: isCorrect ? prev.lives : prev.lives - 1,
            }))
          }
          return
        default:
          return
      }

      // Check for collision with troggles
      const troggleCollision = gameState.troggles.some(
        (troggle) => troggle.position.x === newPosition.x && troggle.position.y === newPosition.y,
      )

      if (troggleCollision) {
        setGameState((prev) => ({
          ...prev,
          lives: prev.lives - 1,
        }))
        return
      }

      setGameState((prev) => ({
        ...prev,
        muncher: newPosition,
      }))
    },
    [gameState],
  )

  // Move troggles on interval
  useEffect(() => {
    if (gameState.gameStatus !== "playing") return

    const moveTroggles = () => {
      setGameState((prev) => {
        const newTroggles = prev.troggles.map((troggle) => {
          // Simple random movement for now
          const directions = ["up", "down", "left", "right"]
          const randomDirection = directions[Math.floor(Math.random() * directions.length)]

          const newPosition = { ...troggle.position }

          switch (randomDirection) {
            case "up":
              if (newPosition.y > 0) newPosition.y -= 1
              break
            case "down":
              if (newPosition.y < 4) newPosition.y += 1
              break
            case "left":
              if (newPosition.x > 0) newPosition.x -= 1
              break
            case "right":
              if (newPosition.x < 5) newPosition.x += 1
              break
          }

          return {
            ...troggle,
            position: newPosition,
            direction: randomDirection,
          }
        })

        // Check for collision with muncher
        const muncherCollision = newTroggles.some(
          (troggle) => troggle.position.x === prev.muncher.x && troggle.position.y === prev.muncher.y,
        )

        if (muncherCollision) {
          return {
            ...prev,
            troggles: newTroggles,
            lives: prev.lives - 1,
          }
        }

        return {
          ...prev,
          troggles: newTroggles,
        }
      })
    }

    const troggleInterval = setInterval(moveTroggles, 1000)
    return () => clearInterval(troggleInterval)
  }, [gameState.gameStatus])

  // Check for game over
  useEffect(() => {
    if (gameState.lives <= 0) {
      setGameState((prev) => ({
        ...prev,
        gameStatus: "gameOver",
      }))
    }
  }, [gameState.lives])

  // Add keyboard event listener
  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [handleKeyDown])

  // Check for level completion
  useEffect(() => {
    if (gameState.gameStatus !== "playing") return

    const allCorrectCellsMunched = gameState.grid.every((row) =>
      row.every((cell) => !checkAnswer(cell.value, gameState.rule, gameState.ruleValue) || cell.munched),
    )

    if (allCorrectCellsMunched) {
      setGameState((prev) => ({
        ...prev,
        level: prev.level + 1,
        gameStatus: "ready",
      }))
    }
  }, [gameState])

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-blue-950 text-white p-4">
      {gameState.gameStatus === "ready" && (
        <div className="absolute z-10 bg-blue-600 p-8 rounded-lg shadow-lg text-center">
          <h2 className="text-2xl font-bold mb-4">Level {gameState.level}</h2>
          <Button className="w-40 h-16 text-2xl" onClick={startGame}>
            Start
          </Button>
        </div>
      )}

      {gameState.gameStatus === "gameOver" && (
        <div className="absolute z-10 bg-blue-600 p-8 rounded-lg shadow-lg text-center">
          <h2 className="text-2xl font-bold mb-4">Game Over</h2>
          <p className="mb-4">Final Score: {gameState.score}</p>
          <Button className="w-40 h-12 text-xl mb-2" onClick={() => router.push("/")}>
            Main Menu
          </Button>
          <Button
            className="w-40 h-12 text-xl"
            onClick={() => {
              setGameState({
                level: 1,
                score: 0,
                lives: 3,
                rule: GameRule.MULTIPLES,
                ruleValue: 2,
                grid: [],
                muncher: { x: 2, y: 2 },
                troggles: [],
                gameStatus: "ready",
              })
            }}
          >
            Try Again
          </Button>
        </div>
      )}

      <div className="w-full max-w-3xl">
        <GameHeader level={gameState.level} rule={gameState.rule} ruleValue={gameState.ruleValue} />

        <GameGrid grid={gameState.grid} muncher={gameState.muncher} troggles={gameState.troggles} />

        <GameFooter score={gameState.score} lives={gameState.lives} />
      </div>
    </div>
  )
}


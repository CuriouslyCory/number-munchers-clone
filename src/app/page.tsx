import Link from "next/link"
import { Button } from "~/components/ui/button"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-blue-950 text-white p-4">
      <h1 className="text-4xl font-bold mb-8 font-mono">NUMBER MUNCHERS</h1>
      <div className="max-w-md w-full space-y-6 text-center">
        <Link href="/game">
          <Button className="w-full h-16 text-2xl bg-blue-600 hover:bg-blue-700">Start Game</Button>
        </Link>
        <Link href="/instructions">
          <Button variant="outline" className="w-full h-12 text-xl border-white text-white hover:bg-blue-800">
            Instructions
          </Button>
        </Link>
        <Link href="/high-scores">
          <Button variant="outline" className="w-full h-12 text-xl border-white text-white hover:bg-blue-800">
            High Scores
          </Button>
        </Link>
      </div>
    </div>
  )
}


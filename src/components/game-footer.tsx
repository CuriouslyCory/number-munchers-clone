import MuncherCharacter from "./muncher-character"

interface GameFooterProps {
  score: number
  lives: number
}

export default function GameFooter({ score, lives }: GameFooterProps) {
  return (
    <div className="mt-4 flex items-center">
      <div className="font-mono text-xl">Score: </div>
      <div className="border-2 border-white px-4 py-1 ml-2 min-w-[150px] font-mono text-xl">{score}</div>
      <div className="ml-auto flex">
        {Array.from({ length: lives }).map((_, i) => (
          <div key={i} className="w-12 h-12 ml-2">
            <MuncherCharacter />
          </div>
        ))}
      </div>
    </div>
  )
}


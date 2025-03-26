import { GameRule } from "~/lib/game-logic"

interface GameHeaderProps {
  level: number
  rule: GameRule
  ruleValue: number
}

export default function GameHeader({ level, rule, ruleValue }: GameHeaderProps) {
  const getRuleText = () => {
    switch (rule) {
      case GameRule.MULTIPLES:
        return `Multiples of ${ruleValue}`
      case GameRule.FACTORS:
        return `Factors of ${ruleValue}`
      case GameRule.PRIMES:
        return "Prime Numbers"
      case GameRule.EQUALS:
        return `Equals ${ruleValue}`
      case GameRule.LESS_THAN:
        return `Less than ${ruleValue}`
      case GameRule.GREATER_THAN:
        return `Greater than ${ruleValue}`
      default:
        return "Unknown Rule"
    }
  }

  return (
    <div className="mb-4 text-center">
      <div className="flex justify-between mb-2">
        <div className="text-xl font-mono">Level: {level}</div>
        <div className="invisible">Placeholder</div> {/* For alignment */}
      </div>
      <div className="text-2xl font-bold font-mono border-t-2 border-b-2 border-white py-1 mb-2">{getRuleText()}</div>
    </div>
  )
}


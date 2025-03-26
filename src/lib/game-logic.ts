export enum GameRule {
  MULTIPLES = "multiples",
  FACTORS = "factors",
  PRIMES = "primes",
  EQUALS = "equals",
  LESS_THAN = "lessThan",
  GREATER_THAN = "greaterThan",
}

export interface Cell {
  value: number | string;
  munched: boolean;
}

export interface Position {
  x: number;
  y: number;
}

export interface Troggle {
  id: number;
  position: Position;
  type: string;
  direction: string;
}

export interface GameState {
  level: number;
  score: number;
  lives: number;
  rule: GameRule;
  ruleValue: number;
  grid: Cell[][];
  muncher: Position;
  troggles: Troggle[];
  gameStatus: "ready" | "playing" | "paused" | "gameOver";
}

// Helper function to check if a number is prime
export function isPrime(num: number): boolean {
  if (num <= 1) return false;
  if (num <= 3) return true;
  if (num % 2 === 0 || num % 3 === 0) return false;

  let i = 5;
  while (i * i <= num) {
    if (num % i === 0 || num % (i + 2) === 0) return false;
    i += 6;
  }

  return true;
}

// Check if an answer is correct based on the rule
export function checkAnswer(
  value: number | string,
  rule: GameRule,
  ruleValue: number,
): boolean {
  // Handle string values (equations) - not implemented in this version
  if (typeof value === "string") {
    return false;
  }

  switch (rule) {
    case GameRule.MULTIPLES:
      return value % ruleValue === 0;
    case GameRule.FACTORS:
      return ruleValue % value === 0;
    case GameRule.PRIMES:
      return isPrime(value);
    case GameRule.EQUALS:
      return value === ruleValue;
    case GameRule.LESS_THAN:
      return value < ruleValue;
    case GameRule.GREATER_THAN:
      return value > ruleValue;
    default:
      return false;
  }
}

// Generate a game board based on level
export function generateGameBoard(level: number): {
  grid: Cell[][];
  rule: GameRule;
  ruleValue: number;
} {
  // Determine rule based on level
  let rule: GameRule;
  let ruleValue: number;

  // Cycle through different rule types as levels progress
  switch (level % 5) {
    case 1:
      rule = GameRule.MULTIPLES;
      ruleValue = Math.floor(level / 5) * 2 + 2; // 2, 4, 6, etc.
      break;
    case 2:
      rule = GameRule.FACTORS;
      ruleValue = (Math.floor(level / 5) + 1) * 12; // 12, 24, 36, etc.
      break;
    case 3:
      rule = GameRule.PRIMES;
      ruleValue = 0; // Not used for primes
      break;
    case 4:
      rule = GameRule.LESS_THAN;
      ruleValue = (Math.floor(level / 5) + 1) * 10; // 10, 20, 30, etc.
      break;
    case 0:
      rule = GameRule.GREATER_THAN;
      ruleValue = Math.floor(level / 5) * 10; // 0, 10, 20, etc.
      break;
    default:
      rule = GameRule.MULTIPLES;
      ruleValue = 2;
  }

  // Generate grid
  const grid: Cell[][] = [];

  // Create a pool of numbers based on the rule
  const numberPool: number[] = [];
  const maxNumber = Math.min(50, level * 10); // Increase max number with level

  // Fill number pool with valid and invalid answers
  for (let i = 1; i <= maxNumber; i++) {
    numberPool.push(i);
  }

  // Shuffle the pool
  for (let i = numberPool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = numberPool[i];
    if (temp === undefined) continue;
    numberPool[i] = numberPool[j] ?? temp;
    numberPool[j] = temp;
  }

  // Create the grid
  for (let y = 0; y < 5; y++) {
    const row: Cell[] = [];
    for (let x = 0; x < 6; x++) {
      if (numberPool.length > 0) {
        const value = numberPool.pop() ?? 1;
        row.push({ value, munched: false });
      } else {
        // Fallback if we run out of numbers
        row.push({
          value: Math.floor(Math.random() * maxNumber) + 1,
          munched: false,
        });
      }
    }
    grid.push(row);
  }

  // Ensure there are enough correct answers (at least 5)
  let correctCount = 0;
  grid.forEach((row) => {
    row.forEach((cell) => {
      if (checkAnswer(cell.value, rule, ruleValue)) {
        correctCount++;
      }
    });
  });

  // If not enough correct answers, add some
  if (correctCount < 5) {
    const neededCorrect = 5 - correctCount;

    // Find cells to replace with correct answers
    let added = 0;
    for (let y = 0; y < 5 && added < neededCorrect; y++) {
      for (let x = 0; x < 6 && added < neededCorrect; x++) {
        const cell = grid[y]?.[x];
        if (!cell || !checkAnswer(cell.value, rule, ruleValue)) {
          // Replace with a correct answer
          let correctValue: number;

          switch (rule) {
            case GameRule.MULTIPLES:
              correctValue = ruleValue * (Math.floor(Math.random() * 5) + 1);
              break;
            case GameRule.FACTORS:
              const factors: number[] = [];
              for (let i = 1; i <= ruleValue; i++) {
                if (ruleValue % i === 0) factors.push(i);
              }
              correctValue =
                factors[Math.floor(Math.random() * factors.length)] ??
                ruleValue;
              break;
            case GameRule.PRIMES:
              const primes = [
                2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47,
              ] as const;
              correctValue =
                primes[Math.floor(Math.random() * primes.length)] ?? 2;
              break;
            case GameRule.LESS_THAN:
              correctValue = Math.floor(Math.random() * (ruleValue - 1)) + 1;
              break;
            case GameRule.GREATER_THAN:
              correctValue = ruleValue + Math.floor(Math.random() * 10) + 1;
              break;
            default:
              correctValue = ruleValue;
          }

          if (grid[y]?.[x]) {
            const cell = grid[y]?.[x];
            if (cell) {
              cell.value = correctValue;
            }
          }
          added++;
        }
      }
    }
  }

  return { grid, rule, ruleValue };
}

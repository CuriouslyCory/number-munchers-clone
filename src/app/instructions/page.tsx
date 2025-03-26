import Link from "next/link";
import { Button } from "~/components/ui/button";

export default function InstructionsPage() {
  return (
    <div className="flex min-h-screen flex-col items-center bg-blue-950 p-4 text-white">
      <div className="mx-auto w-full max-w-2xl py-8">
        <h1 className="mb-6 text-center font-mono text-3xl font-bold">
          HOW TO PLAY NUMBER MUNCHERS
        </h1>

        <div className="mb-8 space-y-6">
          <section>
            <h2 className="mb-2 text-xl font-bold">Goal</h2>
            <p>
              Help the green &quot;Muncher&quot; eat the correct numbers on a
              grid while avoiding enemies (Troggles)!
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-xl font-bold">How to Play</h2>
            <ul className="list-disc space-y-2 ps-5">
              <li>The game presents a 5x6 grid of numbers.</li>
              <li>
                At the top of the screen, a math rule is displayed (e.g.,
                Multiples of 3, Prime Numbers).
              </li>
              <li>
                Control the Muncher using arrow keys to move across the grid.
              </li>
              <li>
                Press the spacebar to &quot;munch&quot; numbers that fit the
                given rule.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="mb-2 text-xl font-bold">Types of Rules</h2>
            <ul className="list-disc space-y-2 ps-5">
              <li>
                <strong>Multiples</strong> – Eat numbers that are multiples of a
                target number (e.g., 3, 5, 10).
              </li>
              <li>
                <strong>Factors</strong> – Eat numbers that divide evenly into a
                given number.
              </li>
              <li>
                <strong>Primes</strong> – Eat prime numbers only.
              </li>
              <li>
                <strong>Equal Equations</strong> – Eat equations that match a
                given value.
              </li>
              <li>
                <strong>Inequalities</strong> – Eat numbers or equations that
                meet inequality conditions (e.g., &lt; 10).
              </li>
            </ul>
          </section>

          <section>
            <h2 className="mb-2 text-xl font-bold">Avoid the Troggles!</h2>
            <ul className="list-disc space-y-2 ps-5">
              <li>
                Troggles are enemies that roam the grid. If they touch the
                Muncher, you lose a life.
              </li>
              <li>
                Some Troggles move randomly, while others follow you or patrol
                in patterns.
              </li>
              <li>You can sometimes trick them into walking off the grid.</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-2 text-xl font-bold">Lives and Scoring</h2>
            <ul className="list-disc space-y-2 ps-5">
              <li>You start with 3 lives.</li>
              <li>Correct munches increase your score.</li>
              <li>
                Wrong munches or getting caught by a Troggle lose you a life.
              </li>
              <li>
                Bonus levels appear occasionally, where you munch without
                worrying about rules or enemies.
              </li>
            </ul>
          </section>
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

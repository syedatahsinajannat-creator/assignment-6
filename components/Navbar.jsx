"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useWorkout } from "@/context/WorkoutContext";

export default function Navbar() {
  const pathname = usePathname();
  const { plan, saved } = useWorkout();

  return (
    <nav className="border-b border-gray-800 bg-[#111111]">
      <div className="w-[92%] max-w-7xl mx-auto py-4 flex flex-wrap items-center justify-between gap-4">

        <Link href="/" className="font-black text-xl">
          FITLOG
        </Link>

        <div className="flex items-center gap-5">
          <Link
            href="/"
            className={
              pathname === "/" ? "text-lime-400" : "text-white"
            }
          >
            Workout
          </Link>

          <Link
            href="/my-plan"
            className={
              pathname === "/my-plan"
                ? "text-lime-400"
                : "text-white"
            }
          >
            My Plan
          </Link>
        </div>

        <div className="flex gap-2">
          <Link
            href="/my-plan"
            className="bg-lime-400 text-black px-3 py-1 rounded-full text-sm font-bold"
          >
            Plan {plan.length}
          </Link>

          <Link
            href="/my-plan"
            className="border border-lime-400 text-lime-400 px-3 py-1 rounded-full text-sm font-bold"
          >
            Saved {saved.length}
          </Link>
        </div>

      </div>
    </nav>
  );
}
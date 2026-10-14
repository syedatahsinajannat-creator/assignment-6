"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="flex items-center justify-between px-6 py-4 border-b border-gray-800 bg-[#111111]">
      <Link href="/" className="font-bold text-xl">
        FITLOG
      </Link>

      <div className="flex gap-6">
        <Link
          href="/"
          className={pathname === "/" ? "text-lime-400" : "text-white"}
        >
          Workout
        </Link>

        <Link
          href="/my-plan"
          className={pathname === "/my-plan" ? "text-lime-400" : "text-white"}
        >
          My Plan
        </Link>
      </div>

      <div className="flex gap-3">
        <Link
          href="/my-plan"
          className="bg-lime-400 text-black px-3 py-1 rounded-full"
        >
          Plan 0
        </Link>

        <Link
          href="/my-plan"
          className="border border-lime-400 px-3 py-1 rounded-full"
        >
          Saved 0
        </Link>
      </div>
    </nav>
  );
}
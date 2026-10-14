import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-[70vh] flex flex-col items-center justify-center text-center px-6">
      <h1 className="text-7xl font-black mb-4">
        404
      </h1>

      <h2 className="text-2xl font-bold mb-3">
        PAGE NOT FOUND
      </h2>

      <p className="text-gray-400 mb-6">
        The page you&apos;re looking for doesn&apos;t exist.
      </p>

      <Link
        href="/"
        className="bg-lime-400 text-black font-bold px-6 py-3"
      >
        Go to workouts
      </Link>
    </main>
  );
}
export default function Footer() {
  return (
    <footer className="border-t border-gray-800 mt-auto">
      <div className="w-[92%] max-w-7xl mx-auto py-6 flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
        <div className="font-black text-xl">
          FITLOG
        </div>

        <p className="text-gray-500 text-sm">
          © 2026 FitLog — Workout Library. Train hard, log honest.
        </p>
      </div>
    </footer>
  );
}
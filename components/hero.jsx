import Image from "next/image";

export default function Hero() {
  return (
    <section className="border-b border-gray-800">
      <div className="w-[92%] max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-center py-16">

        <div>
          <p className="text-lime-400 text-sm font-semibold mb-4">
            WORKOUT LIBRARY
          </p>

          <h1 className="text-5xl lg:text-7xl font-black leading-none mb-6">
            TRAIN WITH INTENT.
            <br />
            LOG EVERY SET.
          </h1>

          <p className="text-gray-400 max-w-xl mb-8">
            FitLog is a dark, no-nonsense gym companion: pick a lift,
            lock it into today&apos;s plan, and watch the week&apos;s work add up.
          </p>

          <a
            href="#library"
            className="inline-block bg-lime-400 text-black font-bold px-6 py-3"
          >
            BROWSE WORKOUTS ↓
          </a>
        </div>

        <div className="relative w-full h-[350px] lg:h-[500px]">
          <Image
            src="/assets/banner.png"
            alt="FitLog workout"
            fill
            className="object-contain object-right"
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority
          />
        </div>

      </div>
    </section>
  );
}
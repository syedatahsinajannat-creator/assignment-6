"use client";

import { useEffect, useState } from "react";
import Hero from "@/components/hero";
import WorkoutCard from "@/components/WorkoutCard";

export default function Home() {
  const [workouts, setWorkouts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://api.abcz.workers.dev/api/fitlog")
      .then((res) => res.json())
      .then((data) => {
        setWorkouts(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, []);

  return (
    <main>
      <Hero />

      <section
        id="library"
        className="w-[92%] max-w-7xl mx-auto py-16"
      >
        <h2 className="text-4xl font-black mb-2">
          THE LIBRARY
        </h2>

        <p className="text-gray-400 mb-8">
          Twelve lifts covering every major muscle group.
        </p>

        {loading ? (
          <p className="text-gray-400">Loading workouts...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {workouts.map((workout) => (
              <WorkoutCard
                key={workout.id}
                workout={workout}
              />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
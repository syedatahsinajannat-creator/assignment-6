"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useWorkout } from "@/context/WorkoutContext";
import toast from "react-hot-toast";

export default function WorkoutDetails() {
  const params = useParams();
  const id = params.id;
  const { addToPlan, addToSaved } = useWorkout();

  const [workout, setWorkout] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://api.abcz.workers.dev/api/fitlog/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setWorkout(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <main className="w-[92%] max-w-7xl mx-auto py-16">
        <p className="text-gray-400">Loading workout...</p>
      </main>
    );
  }

  return (
    <main className="w-[92%] max-w-7xl mx-auto py-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
        <div>
          <img
            src={workout.image}
            alt={workout.name}
            className="w-full h-[500px] object-cover"
          />
        </div>

        <div>
          <div className="flex gap-2 mb-4">
            {workout.muscleGroups.map((group: string) => (
              <span
                key={group}
                className="bg-lime-400 text-black text-xs font-bold px-2 py-1"
              >
                {group.toUpperCase()}
              </span>
            ))}
          </div>

          <h1 className="text-4xl lg:text-5xl font-black uppercase mb-4">
            {workout.name}
          </h1>

          <p className="text-gray-400 leading-7">
            {workout.description}
          </p>

          <div className="mt-8 border border-gray-800">
            {[
              ["EQUIPMENT", workout.equipment],
              ["DIFFICULTY", workout.difficulty],
              ["SETS", workout.sets],
              ["REPS", workout.reps],
              ["DURATION", `${workout.duration} min`],
              ["CALORIES", `${workout.caloriesBurned} kcal`],
              ["RATING", workout.rating],
            ].map(([label, value]) => (
              <div
                key={label}
                className="flex justify-between border-b border-gray-800 last:border-b-0 px-4 py-3"
              >
                <span className="text-gray-500 text-sm font-semibold">
                  {label}
                </span>

                <span className="font-medium">
                  {value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-8">
  <h2 className="text-2xl font-black mb-4">
    INSTRUCTIONS
  </h2>

  <ol className="space-y-4">
    {workout.instructions.map((instruction: string, index: number) => (
      <li
        key={index}
        className="flex gap-4 text-gray-300"
      >
        <span className="text-lime-400 font-bold">
          {String(index + 1).padStart(2, "0")}
        </span>

        <span>{instruction}</span>
      </li>
    ))}
  </ol>

  <div className="flex gap-4 mt-8">
    <button
      onClick={() => {
        addToPlan(workout);
        toast.success("Added to today's plan");
      }}
      className="bg-lime-400 text-black font-bold px-6 py-3"
    >
      Add to today's plan
    </button>

    <button
      onClick={() => {
        addToSaved(workout);
        toast.success("Saved for later");
      }}
      className="border border-lime-400 text-lime-400 font-bold px-6 py-3"
    >
      Save for later
    </button>
  </div>
</div>
    </main>
  );
}
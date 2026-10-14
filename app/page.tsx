"use client";

import { useEffect, useState } from "react";
import Hero from "@/components/hero";
import WorkoutCard from "@/components/WorkoutCard";

export default function Home() {
    const [workouts, setWorkouts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [sortBy, setSortBy] = useState("duration");

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

    const sortedWorkouts = [...workouts].sort((a, b) => {
        if (sortBy === "duration") {
            return a.duration - b.duration;
        }

        if (sortBy === "calories") {
            return a.caloriesBurned - b.caloriesBurned;
        }

        if (sortBy === "rating") {
            return b.rating - a.rating;
        }

        return 0;
    });

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

                <div className="mb-6">
                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="bg-[#1a1a1a] border border-gray-700 px-4 py-2 text-white"
                    >
                        <option value="duration">Sort By: Duration</option>
                        <option value="calories">Sort By: Calories</option>
                        <option value="rating">Sort By: Rating</option>
                    </select>
                </div>

                {loading ? (
                    <p className="text-gray-400">Loading workouts...</p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {sortedWorkouts.map((workout) => (
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
"use client";

import { useState } from "react";
import { useWorkout } from "@/context/WorkoutContext";
import Link from "next/link";
import toast from "react-hot-toast";

export default function MyPlanPage() {
    const {
        plan,
        saved,
        loaded,
        removeFromPlan,
        markAsDone,
    } = useWorkout();

    const [activeTab, setActiveTab] = useState("plan");

    const currentItems = activeTab === "plan" ? plan : saved;

    const totalMinutes = plan.reduce(
        (total: number, item: any) => total + item.duration,
        0
    );

    const totalCalories = plan.reduce(
        (total: number, item: any) => total + item.caloriesBurned,
        0
    );

    if (!loaded) {
        return (
            <main className="w-[92%] max-w-7xl mx-auto py-16">
                <p className="text-gray-400">
                    Loading workouts...
                </p>
            </main>
        );
    }

    return (
        <main className="w-[92%] max-w-7xl mx-auto py-16">
            <h1 className="text-4xl font-black mb-2">
                MY PLAN
            </h1>

            <p className="text-gray-400 mb-8">
                Cap of five lifts for today. Finish them, then load more.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                <div className="border border-gray-800 p-5">
                    <p className="text-gray-500 text-sm">EXERCISES</p>
                    <p className="text-3xl font-bold mt-2">{plan.length}</p>
                </div>

                <div className="border border-gray-800 p-5">
                    <p className="text-gray-500 text-sm">MINUTES</p>
                    <p className="text-3xl font-bold mt-2">{totalMinutes}</p>
                </div>

                <div className="border border-gray-800 p-5">
                    <p className="text-gray-500 text-sm">CALORIES</p>
                    <p className="text-3xl font-bold mt-2">{totalCalories}</p>
                </div>
            </div>
            <div className="flex gap-6 border-b border-gray-800 mb-8">
                <button
                    onClick={() => setActiveTab("plan")}
                    className={`pb-3 font-bold ${activeTab === "plan"
                        ? "text-lime-400 border-b-2 border-lime-400"
                        : "text-gray-500"
                        }`}
                >
                    Today's Plan
                </button>

                <button
                    onClick={() => setActiveTab("saved")}
                    className={`pb-3 font-bold ${activeTab === "saved"
                        ? "text-lime-400 border-b-2 border-lime-400"
                        : "text-gray-500"
                        }`}
                >
                    Saved
                </button>
            </div>

            {currentItems.length === 0 ? (
                <div className="border border-gray-800 p-8 text-center">
                    <h2 className="text-2xl font-black mb-2">
                        NOTHING HERE YET
                    </h2>

                    <p className="text-gray-400 mb-6">
                        Browse the library and add a lift to get today moving.
                    </p>

                    <Link
                        href="/#library"
                        className="inline-block bg-lime-400 text-black font-bold px-6 py-3"
                    >
                        Go to workouts
                    </Link>
                </div>
            ) : (
                <div className="space-y-4">
                    {currentItems.map((workout: any) => (
                        <div
                            key={workout.id}
                            className="border border-gray-800 p-4 flex items-center gap-4"
                        >
                            <img
                                src={workout.image}
                                alt={workout.name}
                                className="w-24 h-24 object-cover"
                            />

                            <div>
                                <h3 className="font-bold uppercase">
                                    {workout.name}
                                </h3>

                                <p className="text-gray-400 text-sm">
                                    {workout.equipment}
                                </p>

                                <div className="flex flex-wrap gap-4 mt-2 text-sm text-gray-400">
                                    <span>⏱ {workout.duration} min</span>
                                    <span>🔥 {workout.caloriesBurned} kcal</span>
                                    <span>★ {workout.rating}</span>
                                </div>

                                <div className="flex flex-wrap gap-3 mt-4">
                                    <Link
                                        href={`/workout/${workout.id}`}
                                        className="border border-gray-700 px-4 py-2 text-sm"
                                    >
                                        View Details
                                    </Link>

                                    {activeTab === "plan" && (
                                        <>
                                            <button
                                                onClick={() => {
                                                    markAsDone(workout.id);
                                                    toast.success("Workout marked as done");
                                                }}
                                                className="bg-lime-400 text-black px-4 py-2 text-sm font-bold"
                                            >
                                                {workout.completed ? "Completed" : "Mark as Done"}
                                            </button>

                                            <button
                                                onClick={() => {
                                                    removeFromPlan(workout.id);
                                                    toast.success("Workout removed");
                                                }}
                                                className="border border-red-500 text-red-400 px-4 py-2 text-sm"
                                            >
                                                X
                                            </button>
                                        </>
                                    )}
                                </div>
                            </div>

                        </div>

                    ))
                    }
                </div >
            )}
        </main >
    );
}
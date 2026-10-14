"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const WorkoutContext = createContext();

export function WorkoutProvider({ children }) {
  const [plan, setPlan] = useState([]);
  const [saved, setSaved] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const storedPlan = localStorage.getItem("fitlog-plan");
    const storedSaved = localStorage.getItem("fitlog-saved");

    if (storedPlan) {
      setPlan(JSON.parse(storedPlan));
    }

    if (storedSaved) {
      setSaved(JSON.parse(storedSaved));
    }

    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;

    localStorage.setItem(
      "fitlog-plan",
      JSON.stringify(plan)
    );
  }, [plan, loaded]);

  useEffect(() => {
    if (!loaded) return;

    localStorage.setItem(
      "fitlog-saved",
      JSON.stringify(saved)
    );
  }, [saved, loaded]);

  const addToPlan = (workout) => {
    const alreadyAdded = plan.some(
      (item) => item.id === workout.id
    );

    if (alreadyAdded || plan.length >= 5) return;

    setPlan((prev) => [...prev, workout]);
  };

  const addToSaved = (workout) => {
    const alreadySaved = saved.some(
      (item) => item.id === workout.id
    );

    if (alreadySaved) return;

    setSaved((prev) => [...prev, workout]);
  };

  const removeFromPlan = (id) => {
    setPlan((prev) =>
      prev.filter((item) => item.id !== id)
    );
  };

  const markAsDone = (id) => {
    setPlan((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, completed: true }
          : item
      )
    );
  };

  return (
    <WorkoutContext.Provider
      value={{
        plan,
        loaded,
        saved,
        addToPlan,
        addToSaved,
        removeFromPlan,
        markAsDone,
      }}
    >
      {children}
    </WorkoutContext.Provider>
  );
}

export function useWorkout() {
  return useContext(WorkoutContext);
}
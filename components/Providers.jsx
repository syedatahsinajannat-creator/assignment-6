"use client";

import { WorkoutProvider } from "@/context/WorkoutContext";
import { Toaster } from "react-hot-toast";

export default function Providers({ children }) {
  return (
    <WorkoutProvider>
      {children}

      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: "#1a1a1a",
            color: "#ffffff",
            border: "1px solid #333333",
          },
        }}
      />
    </WorkoutProvider>
  );
}
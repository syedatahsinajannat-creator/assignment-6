import { FaClock, FaFire, FaStar } from "react-icons/fa";
import Link from "next/link";

export default function WorkoutCard({ workout }) {
    return (
        <Link href={`/workout/${workout.id}`}>

        <div className="bg-[#1a1a1a] border border-gray-800 overflow-hidden">
      <img
        src={workout.image}
        alt={workout.name}
        className="w-full h-64 object-cover"
        />

      <div className="p-4">

        <div className="flex gap-2 mb-3">
          {workout.muscleGroups.map((group) => (
              <span
              key={group}
              className="text-xs font-bold bg-lime-400 text-black px-2 py-1"
              >
              {group.toUpperCase()}
            </span>
          ))}
        </div>

        <h3 className="text-xl font-bold uppercase mb-2">
          {workout.name}
        </h3>

        <p className="text-gray-400 text-sm mb-4">
          {workout.equipment}
        </p>

        <div className="flex items-center gap-5 text-sm text-gray-300">
          <span className="flex items-center gap-1">
            <FaClock />
            {workout.duration} min
          </span>

          <span className="flex items-center gap-1">
            <FaFire />
            {workout.caloriesBurned} kcal
          </span>

          <span className="flex items-center gap-1">
            <FaStar />
            {workout.rating}
          </span>
        </div>

      </div>
    </div>
          </Link>
  );
}
import React from "react";

const badgeColors = {
  Easy: "bg-green-200 text-green-800",
  Medium: "bg-yellow-200 text-yellow-800",
  Hard: "bg-red-200 text-red-800",
};

function DifficultyBadge({ difficulty }) {
  return (
    <span
      className={`text-xs font-semibold px-2 py-1 rounded-full ${badgeColors[difficulty] || "bg-gray-200 text-gray-800"}`}
    >
      {difficulty}
    </span>
  );
}

export default DifficultyBadge;

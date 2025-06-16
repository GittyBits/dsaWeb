import React from "react";
import { FaCheckCircle } from "react-icons/fa";
import DifficultyBadge from "./DifficultyBadge";

function QuestionItem({ q, progress, toggleSolved }) {
  const solved = progress[q.link];

  return (
    <div
      key={q.link}
      className={`flex justify-between items-center p-3 rounded-lg shadow-sm ${
        solved ? "bg-green-50 dark:bg-green-900" : "bg-white dark:bg-gray-800"
      } hover:shadow-md transition`}
    >
      <div className="flex flex-col">
        <a
          href={q.link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm sm:text-base font-semibold text-indigo-600 dark:text-indigo-300 hover:underline"
        >
          {q.question}
        </a>
        <div className="mt-1">
          <DifficultyBadge difficulty={q.difficulty} />
        </div>
      </div>
      <button onClick={() => toggleSolved(q.link)}>
        {solved ? (
          <FaCheckCircle className="text-green-500 text-lg" />
        ) : (
          <div className="w-5 h-5 border border-gray-400 rounded-full" />
        )}
      </button>
    </div>
  );
}

export default QuestionItem;

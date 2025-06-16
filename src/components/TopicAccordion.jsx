// src/components/TopicAccordion.jsx
import React, { useState } from "react";
import QuestionItem from "./QuestionItem";
import { FaChevronDown, FaChevronUp, FaCheckCircle } from "react-icons/fa";

function TopicAccordion({ topic, questions, progress, toggleSolved }) {
  const [isOpen, setIsOpen] = useState(false);

  const completedCount = questions.filter(q => progress[q.link]).length;
  const allDone = completedCount === questions.length;

  const handleToggleAll = () => {
    questions.forEach(q => {
      if (progress[q.link] !== !allDone) {
        toggleSolved(q.link, !allDone);
      }
    });
  };

  return (
    <div className="bg-gray-800 rounded-xl mb-6 shadow-lg border border-gray-700">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-4 flex justify-between items-center text-left focus:outline-none"
      >
        <div>
          <h2 className="text-xl font-semibold text-white">{topic}</h2>
          <p className="text-sm text-gray-400">
            ✅ {completedCount} / {questions.length} completed
          </p>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleToggleAll();
            }}
            className={`text-xs font-medium px-3 py-1 rounded-full ${
              allDone ? "bg-green-600 hover:bg-green-700" : "bg-blue-600 hover:bg-blue-700"
            } text-white shadow`}
          >
            {allDone ? "Undo All" : "Mark All Done"}
          </button>
          {isOpen ? <FaChevronUp className="text-white" /> : <FaChevronDown className="text-white" />}
        </div>
      </button>

      {isOpen && (
        <div className="px-6 pb-4">
          {questions.map((q, index) => (
            <QuestionItem
              key={index}
              question={q}
              solved={progress[q.link]}
              toggleSolved={() => toggleSolved(q.link)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default TopicAccordion;

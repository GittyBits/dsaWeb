import React, { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import QuestionItem from "./QuestionItem";
import { motion, AnimatePresence } from "framer-motion";

function TopicAccordion({ topic, questions, progress, toggleSolved }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="mb-4 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex justify-between items-center px-4 py-3 bg-indigo-50 dark:bg-gray-800 hover:bg-indigo-100 dark:hover:bg-gray-700 transition"
      >
        <span className="font-bold text-lg text-indigo-800 dark:text-indigo-200">{topic}</span>
        {open ? <FaChevronUp /> : <FaChevronDown />}
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            className="p-4 space-y-3 bg-white dark:bg-gray-900"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {questions.map((q) => (
              <QuestionItem key={q.link} q={q} progress={progress} toggleSolved={toggleSolved} />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default TopicAccordion;

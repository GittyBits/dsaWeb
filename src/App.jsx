// App.jsx
import React, { useState, useEffect } from "react";
import shraddha from "@data/shraddha.json";
import lovebabbar from "@data/lovebabbar.json";
import { motion, AnimatePresence } from "framer-motion";
import { FaCheckCircle, FaChevronDown, FaChevronUp, FaSun, FaMoon } from "react-icons/fa";

const sources = {
  "Shradha Ma'am": shraddha,
  "Love Babbar": lovebabbar,
};

const DifficultyBadge = ({ level }) => {
  const colors = {
    Easy: "bg-green-500",
    Medium: "bg-yellow-500",
    Hard: "bg-red-600",
  };
  const color = colors[level] || "bg-gray-300";
  return (
    <span
      className={`text-xs font-bold px-2 py-1 rounded-full text-white shadow-md ${color} animate-pulse`}
    >
      {level || "Unknown"}
    </span>
  );
};

const QuestionItem = ({ question, link, difficulty, companies, remarks, solved, onToggle }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
    className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 border border-gray-200 rounded-xl bg-white/60 backdrop-blur-lg shadow-md hover:shadow-xl transition-all"
  >
    <div className="flex-1 space-y-1">
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="text-lg font-semibold text-blue-700 hover:text-blue-900 transition"
      >
        {question}
      </a>
      <div className="text-sm text-gray-600 flex flex-wrap gap-2">
        {companies?.length > 0 && <span>🏢 {companies.join(", ")}</span>}
        {remarks && <span className="italic">💡 {remarks}</span>}
      </div>
    </div>
    <div className="flex items-center gap-3">
      <DifficultyBadge level={difficulty} />
      <label className="inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          checked={solved}
          onChange={onToggle}
          className="form-checkbox h-5 w-5 text-blue-600 rounded-md shadow-sm"
        />
        <span className="ml-2 text-sm text-gray-600">Done</span>
      </label>
    </div>
  </motion.div>
);

const TopicAccordion = ({ topic, questions, progress, toggleSolved }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="bg-white/70 border border-gray-300 rounded-3xl shadow-xl overflow-hidden mb-8">
      <button
        onClick={() => setOpen(!open)}
        className="w-full px-8 py-5 flex items-center justify-between text-left text-xl font-bold text-gray-800 bg-gradient-to-r from-sky-200 via-indigo-200 to-blue-100 hover:from-sky-300 transition"
      >
        <span>📂 {topic}</span>
        {open ? <FaChevronUp /> : <FaChevronDown />}
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            className="p-5 space-y-4"
          >
            {questions.map((q, i) => (
              <QuestionItem
                key={`${q.question}-${i}`}
                {...q}
                solved={progress[q.link] || false}
                onToggle={() => toggleSolved(q.link)}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

function App() {
  const [selectedSheet, setSelectedSheet] = useState("Shradha Ma'am");
  const [progress, setProgress] = useState(() => {
    const saved = localStorage.getItem(`dsa-progress-${selectedSheet}`);
    return saved ? JSON.parse(saved) : {};
  });
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(`dsa-progress-${selectedSheet}`);
    setProgress(saved ? JSON.parse(saved) : {});
  }, [selectedSheet]);

  const toggleSolved = (link) => {
    const newProgress = { ...progress, [link]: !progress[link] };
    setProgress(newProgress);
    localStorage.setItem(`dsa-progress-${selectedSheet}`, JSON.stringify(newProgress));
  };

  const data = sources[selectedSheet];
  const total = data.reduce((acc, t) => acc + t.questions.length, 0);
  const solved = Object.values(progress).filter(Boolean).length;

  return (
    <div className={`${darkMode ? "bg-gray-900 text-white" : "bg-gradient-to-br from-sky-100 via-white to-indigo-200 text-gray-800"} min-h-screen px-6 py-10 transition-colors duration-300`}>
      <div className="max-w-7xl mx-auto">
        <header className="mb-12 text-center space-y-4">
          <h1 className="text-5xl sm:text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-indigo-800">
            🚀 DSA Tracker
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Ace DSA with popular sheets. Track, solve, and master.
          </p>
          <div className="flex justify-center gap-4 mt-4">
            <div className="inline-flex gap-3 bg-white/50 px-4 py-2 rounded-xl shadow border border-gray-300 dark:bg-gray-800">
              {Object.keys(sources).map((name) => (
                <button
                  key={name}
                  onClick={() => setSelectedSheet(name)}
                  className={`px-4 py-2 font-medium rounded-lg transition duration-200 ${
                    selectedSheet === name
                      ? "bg-indigo-600 text-white shadow"
                      : "bg-white text-gray-800 hover:bg-gray-100 dark:bg-gray-700 dark:text-white"
                  }`}
                >
                  {name}
                </button>
              ))}
            </div>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="ml-4 p-2 rounded-full bg-white dark:bg-gray-700 text-indigo-600 dark:text-white shadow hover:shadow-md"
            >
              {darkMode ? <FaSun /> : <FaMoon />}
            </button>
          </div>
        </header>

        <div className="mb-10">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              ✅ {solved} / {total} Completed
            </span>
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {(solved / total * 100).toFixed(1)}%
            </span>
          </div>
          <div className="w-full h-4 bg-gray-300 dark:bg-gray-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-green-400 to-blue-500 transition-all"
              style={{ width: `${(solved / total) * 100}%` }}
            />
          </div>
        </div>

        {data.map((section) => (
          <TopicAccordion
            key={section.topic}
            topic={section.topic}
            questions={section.questions}
            progress={progress}
            toggleSolved={toggleSolved}
          />
        ))}
      </div>
    </div>
  );
}

export default App;

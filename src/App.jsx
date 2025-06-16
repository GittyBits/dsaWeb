// src/App.jsx
import React, { useState, useEffect } from "react";
import shraddha from "./data/shraddha.json";
import lovebabbar from "./data/lovebabbar.json";
import { motion, AnimatePresence } from "framer-motion";
import { FaCheckCircle, FaChevronDown, FaChevronUp } from "react-icons/fa";
import shraddhaImg from "./assets/shraddha.png";
import lovebabbarImg from "./assets/lovebabbar.png";
import sources from "./config/sources";
import DifficultyBadge from "./components/DifficultyBadge";
import QuestionItem from "./components/QuestionItem";
import TopicAccordion from "./components/TopicAccordion";

function App() {
  const [selectedSheet, setSelectedSheet] = useState("Shradha Ma'am");
  const [progress, setProgress] = useState(() => {
    const saved = localStorage.getItem(`dsa-progress-${selectedSheet}`);
    return saved ? JSON.parse(saved) : {};
  });

  useEffect(() => {
    const saved = localStorage.getItem(`dsa-progress-${selectedSheet}`);
    setProgress(saved ? JSON.parse(saved) : {});
  }, [selectedSheet]);

  const toggleSolved = (link) => {
    const newProgress = { ...progress, [link]: !progress[link] };
    setProgress(newProgress);
    localStorage.setItem(`dsa-progress-${selectedSheet}`, JSON.stringify(newProgress));
  };

  const data = sources[selectedSheet].data;
  const image = sources[selectedSheet].img;
  const total = data.reduce((acc, t) => acc + t.questions.length, 0);
  const solved = Object.values(progress).filter(Boolean).length;

  return (
    <div className="bg-gray-900 text-white min-h-screen transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 py-10">
        <header className="mb-12 text-center space-y-4">
          <h1 className="text-5xl sm:text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-purple-500">
            🚀 DSA Tracker
          </h1>
          <p className="text-lg text-gray-300">
            Ace DSA with curated sheets. Track, solve, and master every topic.
          </p>
          <div className="flex justify-center gap-4 mt-4 items-center flex-wrap">
            <div className="inline-flex gap-3 bg-gray-800 px-4 py-2 rounded-xl shadow border border-gray-600">
              {Object.keys(sources).map((name) => (
                <button
                  key={name}
                  onClick={() => setSelectedSheet(name)}
                  className={`px-4 py-2 font-medium rounded-lg transition duration-200 ${
                    selectedSheet === name
                      ? "bg-indigo-600 text-white shadow"
                      : "bg-gray-700 text-white hover:bg-gray-600"
                  }`}
                >
                  {name}
                </button>
              ))}
            </div>
          </div>
          <div className="flex justify-center mt-6">
            <img src={image} alt={selectedSheet} className="w-40 h-40 rounded-full shadow-xl object-cover border-4 border-indigo-400" />
          </div>
        </header>

        <div className="mb-10">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-300">
              ✅ {solved} / {total} Completed
            </span>
            <span className="text-sm font-medium text-gray-300">
              {(solved / total * 100).toFixed(1)}%
            </span>
          </div>
          <div className="w-full h-4 bg-gray-700 rounded-full overflow-hidden">
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

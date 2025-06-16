// App.jsx
import React, { useState, useEffect } from "react";
import data from "./dsa-grouped.json";

const DifficultyBadge = ({ level }) => {
  const color = {
    Easy: "bg-green-500",
    Medium: "bg-yellow-500",
    Hard: "bg-red-600",
  }[level] || "bg-gray-300";

  return (
    <span
      className={`text-xs font-semibold px-2 py-1 rounded-full text-white shadow ${color}`}
    >
      {level}
    </span>
  );
};

const QuestionItem = ({ question, link, difficulty, companies, remarks, solved, onToggle }) => (
  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 border-b border-gray-200 hover:bg-muted/40 bg-white/80 backdrop-blur transition rounded-xl shadow-sm">
    <div className="flex-1 space-y-1">
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="text-base font-semibold text-blue-700 hover:underline"
      >
        {question}
      </a>
      <div className="text-sm text-muted-foreground space-x-2">
        {companies.length > 0 && <span>🏢 {companies.join(", ")}</span>}
        {remarks && <span className="italic">💡 {remarks}</span>}
      </div>
    </div>
    <div className="flex items-center gap-4">
      <DifficultyBadge level={difficulty} />
      <label className="inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          checked={solved}
          onChange={onToggle}
          className="form-checkbox h-4 w-4 text-blue-600"
        />
        <span className="ml-2 text-xs text-muted-foreground">Done</span>
      </label>
    </div>
  </div>
);

const TopicAccordion = ({ topic, questions, progress, toggleSolved }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-white/60 backdrop-blur border border-gray-300 rounded-2xl shadow-lg mb-6">
      <button
        onClick={() => setOpen(!open)}
        className="w-full px-6 py-4 flex items-center justify-between text-left font-bold text-xl tracking-tight text-gray-800 hover:bg-blue-50 rounded-t-2xl"
      >
        <span>{topic}</span>
        <span>{open ? "▲" : "▼"}</span>
      </button>
      {open && (
        <div className="divide-y divide-gray-200">
          {questions.map((q, i) => (
            <QuestionItem
              key={`${q.question}-${i}`}
              {...q}
              solved={progress[q.link] || false}
              onToggle={() => toggleSolved(q.link)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

function App() {
  const [progress, setProgress] = useState(() => {
    const saved = localStorage.getItem("dsa-progress");
    return saved ? JSON.parse(saved) : {};
  });

  const toggleSolved = (link) => {
    const newProgress = { ...progress, [link]: !progress[link] };
    setProgress(newProgress);
    localStorage.setItem("dsa-progress", JSON.stringify(newProgress));
  };

  const total = data.reduce((acc, t) => acc + t.questions.length, 0);
  const solved = Object.values(progress).filter(Boolean).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100 to-indigo-100 text-gray-800 px-4 py-10 sm:px-8">
      <div className="max-w-6xl mx-auto">
        <header className="mb-10 text-center">
          <h1 className="text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
            📘 DSA Sheet by Shradha Ma'am
          </h1>
          <p className="mt-2 text-base sm:text-lg text-muted-foreground">
            Master DSA in 2.5 Months. Track your progress across all major topics.
          </p>
        </header>

        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-muted-foreground">
              ✅ {solved} / {total} Questions Completed
            </span>
            <span className="text-sm font-medium text-muted-foreground">
              {(solved / total * 100).toFixed(1)}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
            <div
              className="bg-gradient-to-r from-blue-400 to-indigo-500 h-full transition-all"
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

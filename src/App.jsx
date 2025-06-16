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
    <span className={`text-xs font-semibold px-2 py-1 rounded-full text-white ${color}`}>{level}</span>
  );
};

const QuestionItem = ({ question, link, difficulty, companies, remarks, solved, onToggle }) => (
  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 border-b hover:bg-muted/30 transition rounded-md">
    <div className="flex-1 space-y-1">
      <a href={link} target="_blank" rel="noopener noreferrer" className="text-base font-semibold text-blue-600 hover:underline">
        {question}
      </a>
      <div className="text-sm text-muted-foreground">
        {companies.length > 0 && <span className="mr-2">🏢 {companies.join(", ")}</span>}
        {remarks && <span className="italic">💡 {remarks}</span>}
      </div>
    </div>
    <div className="flex items-center gap-3">
      <DifficultyBadge level={difficulty} />
      <label className="inline-flex items-center">
        <input
          type="checkbox"
          checked={solved}
          onChange={onToggle}
          className="form-checkbox h-4 w-4 text-blue-600"
        />
        <span className="ml-1 text-xs text-muted-foreground">Done</span>
      </label>
    </div>
  </div>
);

const TopicAccordion = ({ topic, questions, progress, toggleSolved }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-background border rounded-xl shadow mb-5">
      <button
        onClick={() => setOpen(!open)}
        className="w-full px-4 py-3 flex items-center justify-between text-left font-semibold text-lg hover:bg-secondary rounded-t-xl"
      >
        <span>{topic}</span>
        <span>{open ? "▲" : "▼"}</span>
      </button>
      {open && (
        <div className="divide-y">
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
    <div className="max-w-5xl mx-auto px-4 sm:px-8 py-10">
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-bold tracking-tight mb-2">📘 DSA Sheet by Shradha Ma'am</h1>
        <p className="text-muted-foreground text-sm sm:text-base">
          Master DSA in 2.5 Months. Track your progress across all major topics.
        </p>
      </header>

      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-muted-foreground">
            ✅ {solved} / {total} Questions Completed
          </span>
          <span className="text-sm font-medium text-muted-foreground">
            {(solved / total * 100).toFixed(1)}%
          </span>
        </div>
        <Progress value={(solved / total) * 100} className="h-4" />
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
  );
}

export default App;

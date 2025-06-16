import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaCheckCircle, FaChevronDown, FaChevronUp, FaSun, FaMoon, FaExternalLinkAlt, FaTrophy, FaFire, FaCode, FaSearch, FaFilter, FaGithub, FaLinkedin, FaBookOpen, FaStar, FaCalendarAlt } from "react-icons/fa";
import shraddha from "@data/shraddha.json";
import lovebabbar from "@data/lovebabbar.json";


const sources = {
  "Shraddha Ma'am": shraddha,
  "Love Babbar": lovebabbar,
};

const DifficultyBadge = ({ level }) => {
  const configs = {
    Easy: { 
      bg: "bg-gradient-to-r from-emerald-400 to-green-500", 
      text: "text-white",
      icon: "🟢",
      shadow: "shadow-green-200"
    },
    Medium: { 
      bg: "bg-gradient-to-r from-amber-400 to-orange-500", 
      text: "text-white",
      icon: "🟡",
      shadow: "shadow-orange-200"
    },
    Hard: { 
      bg: "bg-gradient-to-r from-red-500 to-rose-600", 
      text: "text-white",
      icon: "🔴",
      shadow: "shadow-red-200"
    },
  };
  
  const config = configs[level] || { 
    bg: "bg-gradient-to-r from-gray-400 to-gray-500", 
    text: "text-white",
    icon: "⚪",
    shadow: "shadow-gray-200"
  };
  
  return (
    <div className={`inline-flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-full ${config.bg} ${config.text} shadow-lg ${config.shadow} transform hover:scale-105 transition-all duration-200`}>
      <span>{config.icon}</span>
      <span>{level || "Unknown"}</span>
    </div>
  );
};

const CompanyTags = ({ companies }) => {
  if (!companies || companies.length === 0) return null;
  
  return (
    <div className="flex flex-wrap gap-1 mt-2">
      {companies.slice(0, 3).map((company, index) => (
        <span
          key={index}
          className="text-xs px-2 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-md font-medium border border-blue-200 dark:border-blue-800"
        >
          {company}
        </span>
      ))}
      {companies.length > 3 && (
        <span className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded-md">
          +{companies.length - 3} more
        </span>
      )}
    </div>
  );
};

const QuestionItem = ({ question, link, difficulty, companies, remarks, solved, onToggle }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.3 }}
    className={`group relative p-5 border rounded-2xl transition-all duration-300 hover:shadow-xl ${
      solved 
        ? 'bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-green-200 dark:border-green-800 shadow-green-100 dark:shadow-green-900/20' 
        : 'bg-white/80 dark:bg-gray-800/80 border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600'
    } backdrop-blur-sm`}
  >
    {solved && (
      <div className="absolute -top-2 -right-2 bg-green-500 text-white p-1 rounded-full shadow-lg">
        <FaCheckCircle className="w-4 h-4" />
      </div>
    )}
    
    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
      <div className="flex-1 space-y-2">
        <div className="flex items-start gap-3">
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="group/link flex items-center gap-2 text-lg font-semibold text-gray-800 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            <FaCode className="w-4 h-4 text-blue-500 group-hover/link:text-blue-600 transition-colors" />
            <span className="group-hover/link:underline">{question}</span>
            <FaExternalLinkAlt className="w-3 h-3 opacity-0 group-hover/link:opacity-100 transition-opacity" />
          </a>
        </div>
        
        {remarks && (
          <div className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400 bg-blue-50 dark:bg-blue-900/20 p-2 rounded-lg border-l-4 border-blue-400">
            <span className="text-blue-500">💡</span>
            <span className="italic">{remarks}</span>
          </div>
        )}
        
        <CompanyTags companies={companies} />
      </div>
      
      <div className="flex items-center gap-4">
        <DifficultyBadge level={difficulty} />
        
        <label className="flex items-center gap-2 cursor-pointer group/checkbox">
          <div className="relative">
            <input
              type="checkbox"
              checked={solved}
              onChange={onToggle}
              className="sr-only"
            />
            <div className={`w-6 h-6 rounded-lg border-2 transition-all duration-200 ${
              solved 
                ? 'bg-green-500 border-green-500 shadow-lg shadow-green-200 dark:shadow-green-900/30' 
                : 'border-gray-300 dark:border-gray-600 group-hover/checkbox:border-blue-400 dark:group-hover/checkbox:border-blue-500'
            }`}>
              {solved && (
                <FaCheckCircle className="w-4 h-4 text-white absolute top-0.5 left-0.5" />
              )}
            </div>
          </div>
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover/checkbox:text-blue-600 dark:group-hover/checkbox:text-blue-400 transition-colors">
            {solved ? 'Completed' : 'Mark Done'}
          </span>
        </label>
      </div>
    </div>
  </motion.div>
);

const TopicAccordion = ({ topic, questions, progress, toggleSolved, searchTerm, difficultyFilter }) => {
  const [open, setOpen] = useState(false);
  
  // Filter questions based on search and difficulty
  const filteredQuestions = questions.filter(q => {
    const matchesSearch = !searchTerm || 
      q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (q.companies && q.companies.some(company => company.toLowerCase().includes(searchTerm.toLowerCase()))) ||
      (q.remarks && q.remarks.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesDifficulty = !difficultyFilter || q.difficulty === difficultyFilter;
    
    return matchesSearch && matchesDifficulty;
  });
  
  const solvedCount = questions.filter(q => progress[q.link]).length;
  const totalCount = questions.length;
  const filteredSolvedCount = filteredQuestions.filter(q => progress[q.link]).length;
  const progressPercent = totalCount > 0 ? (solvedCount / totalCount) * 100 : 0;
  
  // Don't render if no filtered questions
  if (filteredQuestions.length === 0) return null;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-white/90 dark:bg-gray-800/90 border border-gray-200 dark:border-gray-700 rounded-3xl shadow-xl overflow-hidden mb-6 backdrop-blur-md"
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full px-6 py-5 flex items-center justify-between text-left bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/30 hover:from-blue-100 hover:to-indigo-100 dark:hover:from-blue-900/50 dark:hover:to-indigo-900/50 transition-all duration-300 border-b border-gray-200 dark:border-gray-700"
      >
        <div className="flex items-center gap-4">
          <div className="text-2xl">📚</div>
          <div>
            <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200">{topic}</h3>
            <div className="flex items-center gap-3 mt-1">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {solvedCount}/{totalCount} problems
              </span>
              <div className="w-24 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-green-400 to-blue-500 transition-all duration-300"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
              <span className="text-xs font-semibold text-gray-500 dark:text-gray-400">
                {progressPercent.toFixed(0)}%
              </span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          {solvedCount === totalCount && (
            <div className="bg-yellow-400 text-yellow-900 px-2 py-1 rounded-full text-xs font-bold flex items-center gap-1">
              <FaTrophy className="w-3 h-3" />
              Complete!
            </div>
          )}
          <motion.div
            animate={{ rotate: open ? 180 : 0 }}
            transition={{ duration: 0.2 }}
            className="text-gray-500 dark:text-gray-400"
          >
            <FaChevronDown className="w-5 h-5" />
          </motion.div>
        </div>
      </button>
      
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="p-6 space-y-4">
              {searchTerm || difficultyFilter ? (
                <div className="text-sm text-gray-600 dark:text-gray-400 mb-4 px-4 py-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg border-l-4 border-blue-400">
                  Showing {filteredQuestions.length} of {totalCount} problems
                  {filteredSolvedCount > 0 && ` (${filteredSolvedCount} solved)`}
                </div>
              ) : null}
              {filteredQuestions.map((q, i) => (
                <QuestionItem
                  key={`${q.question}-${i}`}
                  {...q}
                  solved={progress[q.link] || false}
                  onToggle={() => toggleSolved(q.link)}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const SearchBar = ({ searchTerm, setSearchTerm, difficultyFilter, setDifficultyFilter }) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-8">
      <div className="relative flex-1">
        <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <input
          type="text"
          placeholder="Search problems..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-3 bg-white/90 dark:bg-gray-800/90 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-md transition-all"
        />
      </div>
      <div className="relative">
        <FaFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <select
          value={difficultyFilter}
          onChange={(e) => setDifficultyFilter(e.target.value)}
          className="pl-10 pr-8 py-3 bg-white/90 dark:bg-gray-800/90 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-md appearance-none cursor-pointer min-w-[140px]"
        >
          <option value="">All Levels</option>
          <option value="Easy">Easy</option>
          <option value="Medium">Medium</option>
          <option value="Hard">Hard</option>
        </select>
      </div>
    </div>
  );
};

const ProgressStats = ({ solved, total, data, progress }) => {
  const percentage = total > 0 ? (solved / total) * 100 : 0;
  
  // Calculate difficulty distribution
  const difficultyStats = data.reduce((acc, topic) => {
    topic.questions.forEach(q => {
      const level = q.difficulty || 'Unknown';
      if (!acc[level]) acc[level] = { total: 0, solved: 0 };
      acc[level].total++;
      if (progress[q.link]) acc[level].solved++;
    });
    return acc;
  }, {});

  const streak = calculateStreak(progress);
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
      <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30 rounded-2xl p-6 shadow-lg backdrop-blur-md border border-blue-200 dark:border-blue-700">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-blue-500 rounded-xl shadow-lg">
            <FaCode className="w-6 h-6 text-white" />
          </div>
          <div>
            <p className="text-sm text-blue-700 dark:text-blue-300 font-medium">Total Problems</p>
            <p className="text-3xl font-bold text-blue-800 dark:text-blue-200">{total}</p>
          </div>
        </div>
      </div>
      
      <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-800/30 rounded-2xl p-6 shadow-lg backdrop-blur-md border border-green-200 dark:border-green-700">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-green-500 rounded-xl shadow-lg">
            <FaCheckCircle className="w-6 h-6 text-white" />
          </div>
          <div>
            <p className="text-sm text-green-700 dark:text-green-300 font-medium">Solved</p>
            <p className="text-3xl font-bold text-green-800 dark:text-green-200">{solved}</p>
          </div>
        </div>
      </div>
      
      <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/30 dark:to-purple-800/30 rounded-2xl p-6 shadow-lg backdrop-blur-md border border-purple-200 dark:border-purple-700">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-purple-500 rounded-xl shadow-lg">
            <FaFire className="w-6 h-6 text-white" />
          </div>
          <div>
            <p className="text-sm text-purple-700 dark:text-purple-300 font-medium">Progress</p>
            <p className="text-3xl font-bold text-purple-800 dark:text-purple-200">{percentage.toFixed(1)}%</p>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/30 dark:to-orange-800/30 rounded-2xl p-6 shadow-lg backdrop-blur-md border border-orange-200 dark:border-orange-700">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-orange-500 rounded-xl shadow-lg">
            <FaCalendarAlt className="w-6 h-6 text-white" />
          </div>
          <div>
            <p className="text-sm text-orange-700 dark:text-orange-300 font-medium">Streak</p>
            <p className="text-3xl font-bold text-orange-800 dark:text-orange-200">{streak} days</p>
          </div>
        </div>
      </div>

      {/* Difficulty breakdown */}
      <div className="md:col-span-2 lg:col-span-4 bg-white/90 dark:bg-gray-800/90 rounded-2xl p-6 shadow-lg backdrop-blur-md border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4 flex items-center gap-2">
          <FaBookOpen className="w-5 h-5 text-blue-500" />
          Difficulty Breakdown
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {Object.entries(difficultyStats).map(([level, stats]) => (
            <div key={level} className="text-center">
              <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold ${
                level === 'Easy' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' :
                level === 'Medium' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300' :
                level === 'Hard' ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300' :
                'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300'
              }`}>
                <span>{level}</span>
                <span className="bg-white/50 dark:bg-gray-800/50 px-2 py-0.5 rounded-full text-xs">
                  {stats.solved}/{stats.total}
                </span>
              </div>
              <div className="mt-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all duration-300 ${
                    level === 'Easy' ? 'bg-green-500' :
                    level === 'Medium' ? 'bg-yellow-500' :
                    level === 'Hard' ? 'bg-red-500' :
                    'bg-gray-500'
                  }`}
                  style={{ width: `${stats.total > 0 ? (stats.solved / stats.total) * 100 : 0}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const calculateStreak = (progress) => {
  // Simple streak calculation - in a real app, you'd track dates
  const recentlySolved = Object.values(progress).filter(Boolean).length;
  return Math.min(recentlySolved, 30); // Cap at 30 for demo
};

function App() {
  const [selectedSheet, setSelectedSheet] = useState("Shradha Ma'am");
  const [progress, setProgress] = useState({});
  const [darkMode, setDarkMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [difficultyFilter, setDifficultyFilter] = useState("");

  useEffect(() => {
    // Reset progress when sheet changes (in real app, load from localStorage)
    setProgress({});
  }, [selectedSheet]);

  const toggleSolved = (link) => {
    const newProgress = { ...progress, [link]: !progress[link] };
    setProgress(newProgress);
    // In real app: localStorage.setItem(`dsa-progress-${selectedSheet}`, JSON.stringify(newProgress));
  };

  const data = sources[selectedSheet];
  const total = data.reduce((acc, t) => acc + t.questions.length, 0);
  const solved = Object.values(progress).filter(Boolean).length;

  // Filter data based on search and difficulty
  const filteredData = data.map(section => ({
    ...section,
    questions: section.questions.filter(q => {
      const matchesSearch = !searchTerm || 
        q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (q.companies && q.companies.some(company => company.toLowerCase().includes(searchTerm.toLowerCase()))) ||
        (q.remarks && q.remarks.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesDifficulty = !difficultyFilter || q.difficulty === difficultyFilter;
      
      return matchesSearch && matchesDifficulty;
    })
  })).filter(section => section.questions.length > 0);

  return (
    <div className={`min-h-screen transition-all duration-500 ${
      darkMode 
        ? "bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white" 
        : "bg-gradient-to-br from-blue-50 via-white to-indigo-100 text-gray-800"
    }`}>
      <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.header 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="text-6xl">🚀</div>
            <h1 className="text-4xl sm:text-6xl font-extrabold">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600">
                DSA Tracker
              </span>
            </h1>
          </div>
          
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Master Data Structures & Algorithms with curated problem sets. Track your progress, stay motivated, and ace your interviews! 🎯
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <div className="flex items-center gap-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md px-4 py-2 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
              {Object.keys(sources).map((name) => (
                <button
                  key={name}
                  onClick={() => setSelectedSheet(name)}
                  className={`px-6 py-3 font-semibold rounded-xl transition-all duration-300 ${
                    selectedSheet === name
                      ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg transform scale-105"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:scale-105"
                  }`}
                >
                  {name}
                </button>
              ))}
            </div>
            
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-3 rounded-xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
            >
              {darkMode ? (
                <FaSun className="w-5 h-5 text-yellow-500" />
              ) : (
                <FaMoon className="w-5 h-5 text-indigo-600" />
              )}
            </button>
          </div>
        </motion.header>

        <ProgressStats solved={solved} total={total} data={data} progress={progress} />

        <SearchBar 
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          difficultyFilter={difficultyFilter}
          setDifficultyFilter={setDifficultyFilter}
        />

        {filteredData.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-2">No problems found</h3>
            <p className="text-gray-600 dark:text-gray-400">Try adjusting your search or filter criteria</p>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredData.map((section, index) => (
              <TopicAccordion
                key={section.topic}
                topic={section.topic}
                questions={section.questions}
                progress={progress}
                toggleSolved={toggleSolved}
                searchTerm={searchTerm}
                difficultyFilter={difficultyFilter}
              />
            ))}
          </div>
        )}
        
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-16 py-8 border-t border-gray-200 dark:border-gray-700"
        >
          <p className="text-gray-600 dark:text-gray-400">
            Keep coding, keep growing! 🌱 Every problem solved is a step closer to success.
          </p>
        </motion.footer>
      </div>
    </div>
  );
}

export default App;

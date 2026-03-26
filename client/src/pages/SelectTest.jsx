import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../services/api";

const categories = [
  { key: "aptitude", label: "Aptitude", icon: "🧮", desc: "Quantitative, logical & verbal reasoning" },
  { key: "dsa", label: "Data Structures & Algorithms", icon: "🌳", desc: "Arrays, trees, graphs, sorting & more" },
  { key: "technical", label: "Technical", icon: "⚙️", desc: "OS, DBMS, networking & core CS concepts" },
  { key: "mern", label: "MERN Stack", icon: "💻", desc: "MongoDB, Express, React & Node.js" },
  { key: "reasoning", label: "Reasoning", icon: "🧩", desc: "Logical, verbal & analytical reasoning" },
];

function SelectTest() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("papers");
  const [papers, setPapers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPapers = async () => {
      try {
        const res = await API.get("/exam-papers");
        setPapers(res.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchPapers();
  }, []);

  const handleCategorySelect = (category) => {
    navigate("/test", { state: { category } });
  };

  const handlePaperSelect = (paper) => {
    navigate("/test", { state: { paperId: paper._id, category: paper.category === "mixed" ? null : paper.category, questionCount: paper.questionCount, duration: paper.duration * 60, paperTitle: paper.title } });
  };

  const categoryColors = {
    aptitude: "bg-blue-100 text-blue-700", dsa: "bg-purple-100 text-purple-700",
    technical: "bg-green-100 text-green-700", mern: "bg-orange-100 text-orange-700",
    mixed: "bg-gray-100 text-gray-700", reasoning: "bg-pink-100 text-pink-700",
  };

  const difficultyColors = {
    easy: "bg-green-100 text-green-700", medium: "bg-yellow-100 text-yellow-700",
    hard: "bg-red-100 text-red-700", mixed: "bg-gray-100 text-gray-700",
  };

  return (
    <div className="min-h-screen bg-[#f0f4f8] flex flex-col">

      {/* Header */}
      <div className="bg-[#1a3c6e] text-white px-6 py-3 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
            <span className="text-[#1a3c6e] font-bold text-sm">P</span>
          </div>
          <span className="font-semibold tracking-wide">Placement Preparation System</span>
        </div>
        <button onClick={() => navigate("/dashboard")} className="text-sm text-blue-200 hover:text-white">
          ← Back to Dashboard
        </button>
      </div>

      <div className="flex-1 max-w-4xl mx-auto w-full px-4 py-8">

        <div className="bg-white border-l-4 border-[#1a3c6e] rounded-lg p-5 mb-6 shadow-sm">
          <h2 className="text-xl font-bold text-[#1a3c6e]">Select Test</h2>
          <p className="text-gray-500 text-sm mt-1">Choose an exam paper or category to start your test.</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          <button onClick={() => setActiveTab("papers")}
            className={`px-5 py-2 rounded-lg font-semibold text-sm ${activeTab === "papers" ? "bg-[#1a3c6e] text-white" : "bg-white text-gray-600 hover:bg-gray-50"}`}>
            📝 Exam Papers
          </button>
          <button onClick={() => setActiveTab("categories")}
            className={`px-5 py-2 rounded-lg font-semibold text-sm ${activeTab === "categories" ? "bg-[#1a3c6e] text-white" : "bg-white text-gray-600 hover:bg-gray-50"}`}>
            📋 Categories
          </button>
        </div>

        {/* Exam Papers Tab */}
        {activeTab === "papers" && (
          <div>
            {loading ? (
              <p className="text-center text-gray-400 py-10">Loading papers...</p>
            ) : papers.length === 0 ? (
              <div className="bg-white border border-gray-200 rounded-lg p-10 text-center shadow-sm">
                <p className="text-gray-400 text-lg">No exam papers available yet 📝</p>
                <p className="text-gray-400 text-sm mt-1">Ask your admin to create exam papers</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {papers.map((paper) => (
                  <div key={paper._id} onClick={() => handlePaperSelect(paper)}
                    className="bg-white border-2 border-gray-200 rounded-lg p-6 shadow-sm hover:border-[#1a3c6e] hover:shadow-md cursor-pointer transition-all group">
                    <h3 className="text-lg font-bold text-gray-800 group-hover:text-[#1a3c6e] mb-3">{paper.title}</h3>
                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${categoryColors[paper.category]}`}>{paper.category.toUpperCase()}</span>
                      <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${difficultyColors[paper.difficulty]}`}>{paper.difficulty.toUpperCase()}</span>
                      <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-blue-100 text-blue-700">{paper.questionCount} Questions</span>
                      <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-gray-100 text-gray-700">⏱ {paper.duration} min</span>
                    </div>
                    <span className="text-xs font-semibold text-[#1a3c6e] border border-[#1a3c6e] px-3 py-1 rounded-full">
                      Start Test →
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Categories Tab */}
        {activeTab === "categories" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {categories.map((cat) => (
              <div key={cat.key} onClick={() => handleCategorySelect(cat.key)}
                className="bg-white border-2 border-gray-200 rounded-lg p-6 shadow-sm hover:border-[#1a3c6e] hover:shadow-md cursor-pointer transition-all group">
                <div className="text-4xl mb-3">{cat.icon}</div>
                <h3 className="text-lg font-bold text-gray-800 group-hover:text-[#1a3c6e]">{cat.label}</h3>
                <p className="text-sm text-gray-500 mt-1">{cat.desc}</p>
                <div className="mt-4">
                  <span className="text-xs font-semibold text-[#1a3c6e] border border-[#1a3c6e] px-3 py-1 rounded-full">
                    Start Test →
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>

      <div className="text-center text-xs text-gray-400 py-4">
        © 2025 Placement Preparation System. All rights reserved.
      </div>

    </div>
  );
}

export default SelectTest;

import { useNavigate } from "react-router-dom";

const categories = [
  { key: "aptitude", label: "Aptitude", icon: "🧮", desc: "Quantitative, logical & verbal reasoning" },
  { key: "dsa", label: "Data Structures & Algorithms", icon: "🌳", desc: "Arrays, trees, graphs, sorting & more" },
  { key: "technical", label: "Technical", icon: "⚙️", desc: "OS, DBMS, networking & core CS concepts" },
  { key: "mern", label: "MERN Stack", icon: "💻", desc: "MongoDB, Express, React & Node.js" },
  { key: "reasoning", label: "Reasoning", icon: "🧩", desc: "Logical, verbal & analytical reasoning" },
];

function SelectTest() {
  const navigate = useNavigate();

  const handleSelect = (category) => {
    navigate("/test", { state: { category } });
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
          <h2 className="text-xl font-bold text-[#1a3c6e]">Select Test Category</h2>
          <p className="text-gray-500 text-sm mt-1">Choose a category to start your test. Questions will be fetched accordingly.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {categories.map((cat) => (
            <div
              key={cat.key}
              onClick={() => handleSelect(cat.key)}
              className="bg-white border-2 border-gray-200 rounded-lg p-6 shadow-sm hover:border-[#1a3c6e] hover:shadow-md cursor-pointer transition-all group"
            >
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

      </div>

      <div className="text-center text-xs text-gray-400 py-4">
        © 2025 Placement Preparation System. All rights reserved.
      </div>

    </div>
  );
}

export default SelectTest;

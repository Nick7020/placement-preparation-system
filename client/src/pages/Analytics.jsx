import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Analytics() {
  const [data, setData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        const res = await axios.get(`https://server-production-0086.up.railway.app/analytics/${user._id}`);
        setData(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchAnalytics();
  }, []);

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
          <h2 className="text-xl font-bold text-[#1a3c6e]">Performance Analytics</h2>
          <p className="text-gray-500 text-sm mt-1">Your overall test performance summary</p>
        </div>

        {!data ? (
          <p className="text-gray-400 text-center">Loading...</p>
        ) : data.message ? (
          <div className="bg-white border border-gray-200 rounded-lg p-10 text-center shadow-sm">
            <p className="text-gray-400 text-lg">No tests given yet 😄</p>
            <button
              onClick={() => navigate("/test")}
              className="mt-4 bg-[#1a3c6e] text-white px-6 py-2 rounded text-sm font-semibold hover:bg-[#15305a]"
            >
              Take a Test Now
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { label: "Total Tests", value: data.totalTests, icon: "📝" },
              { label: "Average Score", value: data.averageScore, icon: "📊" },
              { label: "Best Score", value: data.bestScore, icon: "🏆" },
              { label: "Avg Accuracy", value: data.averageAccuracy, icon: "🎯" },
            ].map((stat, i) => (
              <div key={i} className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm text-center">
                <div className="text-3xl mb-2">{stat.icon}</div>
                <p className="text-2xl font-bold text-[#1a3c6e]">{stat.value}</p>
                <p className="text-xs text-gray-500 font-semibold uppercase mt-1">{stat.label}</p>
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

export default Analytics;

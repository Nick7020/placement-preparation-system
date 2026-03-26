import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Leaderboard() {
  const [leaders, setLeaders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const res = await axios.get("https://server-production-0086.up.railway.app/leaderboard");
        console.log("Leaderboard response:", res.data);
        
        // Handle new response format
        if (res.data.data) {
          setLeaders(res.data.data);
        } else if (Array.isArray(res.data)) {
          setLeaders(res.data);
        } else {
          setLeaders([]);
        }
      } catch (error) {
        console.log("Leaderboard error:", error);
        setLeaders([]);
      }
    };
    fetchLeaderboard();
  }, []);

  const medals = ["🥇", "🥈", "🥉"];

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
          <h2 className="text-xl font-bold text-[#1a3c6e]">Leaderboard</h2>
          <p className="text-gray-500 text-sm mt-1">Top 10 performers ranked by average accuracy</p>
        </div>

        {leaders.length === 0 ? (
          <div className="bg-white border border-gray-200 rounded-lg p-10 text-center shadow-sm">
            <p className="text-gray-400 text-lg">No data available yet 🏆</p>
          </div>
        ) : (
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-[#1a3c6e] text-white">
                <tr>
                  <th className="px-5 py-3 text-left font-semibold">Rank</th>
                  <th className="px-5 py-3 text-left font-semibold">Candidate</th>
                  <th className="px-5 py-3 text-left font-semibold">Tests Given</th>
                  <th className="px-5 py-3 text-left font-semibold">Avg Accuracy</th>
                </tr>
              </thead>
              <tbody>
                {leaders.map((user, index) => (
                  <tr key={user.userId || index} className={`border-t border-gray-100 ${index % 2 === 0 ? "bg-white" : "bg-gray-50"} ${index < 3 ? "font-semibold" : ""}`}>
                    <td className="px-5 py-3 text-lg">
                      {medals[index] || `#${index + 1}`}
                    </td>
                    <td className="px-5 py-3 text-gray-700 text-xs">
                      {user.userName || user._id || 'Unknown User'}
                    </td>
                    <td className="px-5 py-3 text-gray-700">{user.testsGiven}</td>
                    <td className="px-5 py-3">
                      <span className="text-[#1a3c6e] font-bold">
                        {typeof user.averageAccuracy === 'number' 
                          ? user.averageAccuracy.toFixed(2) 
                          : user.averageAccuracy || '0.00'}%
                      </span>
                    </td>
                  </tr>
                ))}}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div className="text-center text-xs text-gray-400 py-4">
        © 2025 Placement Preparation System. All rights reserved.
      </div>

    </div>
  );
}

export default Leaderboard;

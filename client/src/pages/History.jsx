import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function History() {
  const [history, setHistory] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        const res = await axios.get(`http://localhost:5000/my-history/${user._id}`);
        setHistory(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchHistory();
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
        <button
          onClick={() => navigate("/dashboard")}
          className="text-sm text-blue-200 hover:text-white"
        >
          ← Back to Dashboard
        </button>
      </div>

      <div className="flex-1 max-w-4xl mx-auto w-full px-4 py-8">

        <div className="bg-white border-l-4 border-[#1a3c6e] rounded-lg p-5 mb-6 shadow-sm">
          <h2 className="text-xl font-bold text-[#1a3c6e]">Test History</h2>
          <p className="text-gray-500 text-sm mt-1">All your previous test attempts</p>
        </div>

        {history.length === 0 ? (
          <div className="bg-white border border-gray-200 rounded-lg p-10 text-center shadow-sm">
            <p className="text-gray-400 text-lg">No test attempts found 📭</p>
            <button
              onClick={() => navigate("/test")}
              className="mt-4 bg-[#1a3c6e] text-white px-6 py-2 rounded text-sm font-semibold hover:bg-[#15305a]"
            >
              Take Your First Test
            </button>
          </div>
        ) : (
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-[#1a3c6e] text-white">
                <tr>
                  <th className="px-5 py-3 text-left font-semibold">#</th>
                  <th className="px-5 py-3 text-left font-semibold">Date</th>
                  <th className="px-5 py-3 text-left font-semibold">Score</th>
                  <th className="px-5 py-3 text-left font-semibold">Total Qs</th>
                  <th className="px-5 py-3 text-left font-semibold">Accuracy</th>
                  <th className="px-5 py-3 text-left font-semibold">Status</th>
                </tr>
              </thead>
              <tbody>
                {history.map((item, index) => {
                  const accuracy = parseFloat(item.accuracy);
                  const pass = accuracy >= 50;
                  return (
                    <tr key={index} className={`border-t border-gray-100 ${index % 2 === 0 ? "bg-white" : "bg-gray-50"}`}>
                      <td className="px-5 py-3 text-gray-500">{history.length - index}</td>
                      <td className="px-5 py-3 text-gray-700">{new Date(item.createdAt).toLocaleDateString()}</td>
                      <td className="px-5 py-3 font-semibold text-[#1a3c6e]">{item.score}</td>
                      <td className="px-5 py-3 text-gray-700">{item.total}</td>
                      <td className="px-5 py-3 text-gray-700">{item.accuracy}</td>
                      <td className="px-5 py-3">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${pass ? "bg-green-100 text-green-700" : "bg-red-100 text-red-600"}`}>
                          {pass ? "PASS" : "FAIL"}
                        </span>
                      </td>
                    </tr>
                  );
                })}
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

export default History;

import { useLocation, useNavigate } from "react-router-dom";

function Result() {
  const location = useLocation();
  const navigate = useNavigate();
  const result = location.state;

  if (!result) return (
    <div className="min-h-screen bg-[#f0f4f8] flex items-center justify-center">
      <p className="text-red-500">No Result Found ❌</p>
    </div>
  );

  const score = parseFloat(result.score);
  const accuracy = parseFloat(result.accuracy);
  const status = accuracy >= 50 ? "PASS" : "FAIL";

  return (
    <div className="min-h-screen bg-[#f0f4f8] flex flex-col">

      {/* Header */}
      <div className="bg-[#1a3c6e] text-white px-6 py-3 flex items-center gap-3">
        <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
          <span className="text-[#1a3c6e] font-bold text-sm">P</span>
        </div>
        <span className="font-semibold tracking-wide">Placement Preparation System</span>
      </div>

      <div className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="bg-white border border-gray-200 rounded-lg shadow-md w-full max-w-lg">

          {/* Result Header */}
          <div className={`text-white text-center py-5 rounded-t-lg ${status === "PASS" ? "bg-green-600" : "bg-red-500"}`}>
            <p className="text-4xl mb-1">{status === "PASS" ? "🎉" : "😔"}</p>
            <h2 className="text-2xl font-bold tracking-widest">{status}</h2>
            <p className="text-sm mt-1 opacity-90">Test Completed Successfully</p>
          </div>

          {/* Stats */}
          <div className="p-6">
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="text-center border border-gray-200 rounded-lg p-4">
                <p className="text-2xl font-bold text-[#1a3c6e]">{result.score}</p>
                <p className="text-xs text-gray-500 mt-1 font-semibold uppercase">Score</p>
              </div>
              <div className="text-center border border-gray-200 rounded-lg p-4">
                <p className="text-2xl font-bold text-[#1a3c6e]">{result.accuracy}</p>
                <p className="text-xs text-gray-500 mt-1 font-semibold uppercase">Accuracy</p>
              </div>
              <div className="text-center border border-gray-200 rounded-lg p-4">
                <p className="text-2xl font-bold text-[#1a3c6e]">{result.timeTaken}s</p>
                <p className="text-xs text-gray-500 mt-1 font-semibold uppercase">Time Taken</p>
              </div>
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6 text-sm text-gray-600">
              <p>📌 <span className="font-semibold">Marking Scheme:</span> +1 for correct, -0.25 for wrong answer</p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => navigate("/test")}
                className="flex-1 border border-[#1a3c6e] text-[#1a3c6e] py-2 rounded font-semibold text-sm hover:bg-blue-50"
              >
                Retry Test
              </button>
              <button
                onClick={() => navigate("/dashboard")}
                className="flex-1 bg-[#1a3c6e] text-white py-2 rounded font-semibold text-sm hover:bg-[#15305a]"
              >
                Go to Dashboard
              </button>
            </div>
          </div>

        </div>
      </div>

      <div className="text-center text-xs text-gray-400 py-4">
        © 2025 Placement Preparation System. All rights reserved.
      </div>

    </div>
  );
}

export default Result;

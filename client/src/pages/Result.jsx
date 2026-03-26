import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

function Result() {
  const location = useLocation();
  const navigate = useNavigate();
  const result = location.state;
  const [showReview, setShowReview] = useState(false);

  if (!result) return (
    <div className="min-h-screen bg-[#f0f4f8] flex items-center justify-center">
      <p className="text-red-500">No Result Found ❌</p>
    </div>
  );

  const score = parseFloat(result.score);
  const accuracy = parseFloat(result.accuracy);
  const status = accuracy >= 50 ? "PASS" : "FAIL";
  const questions = result.questions || [];
  const answers = result.answers || [];

  const getSelected = (questionId) => {
    const found = answers.find(a => a.questionId === questionId);
    return found ? found.selectedAnswer : null;
  };

  return (
    <div className="min-h-screen bg-[#f0f4f8] flex flex-col">

      {/* Header */}
      <div className="bg-[#1a3c6e] text-white px-6 py-3 flex items-center gap-3">
        <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
          <span className="text-[#1a3c6e] font-bold text-sm">P</span>
        </div>
        <span className="font-semibold tracking-wide">Placement Preparation System</span>
      </div>

      <div className="flex-1 px-4 py-8 max-w-3xl mx-auto w-full">
        <div className="bg-white border border-gray-200 rounded-lg shadow-md w-full">

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

            <div className="flex gap-3 mb-6">
              <button
                onClick={() => navigate("/select-test")}
                className="flex-1 border border-[#1a3c6e] text-[#1a3c6e] py-2 rounded font-semibold text-sm hover:bg-blue-50"
              >
                Retry Test
              </button>
              <button
                onClick={() => setShowReview(!showReview)}
                className="flex-1 border border-yellow-500 text-yellow-600 py-2 rounded font-semibold text-sm hover:bg-yellow-50"
              >
                {showReview ? "Hide Review" : "Review Answers 📝"}
              </button>
              <button
                onClick={() => navigate("/dashboard")}
                className="flex-1 bg-[#1a3c6e] text-white py-2 rounded font-semibold text-sm hover:bg-[#15305a]"
              >
                Dashboard
              </button>
            </div>

            {/* Question Review Section */}
            {showReview && (
              <div className="flex flex-col gap-4">
                <h3 className="text-base font-bold text-[#1a3c6e] border-b pb-2">Question Review</h3>
                {questions.map((q, index) => {
                  const selected = getSelected(q._id);
                  const isCorrect = selected === q.correctAnswer;
                  const isSkipped = !selected;
                  return (
                    <div key={q._id} className={`border-2 rounded-lg p-4 ${
                      isSkipped ? "border-gray-300" :
                      isCorrect ? "border-green-400 bg-green-50" :
                      "border-red-400 bg-red-50"
                    }`}>
                      <div className="flex justify-between items-start mb-3">
                        <p className="text-sm font-semibold text-gray-800 flex-1">Q{index + 1}. {q.question}</p>
                        <span className={`ml-3 text-xs font-bold px-2 py-1 rounded flex-shrink-0 ${
                          isSkipped ? "bg-gray-200 text-gray-600" :
                          isCorrect ? "bg-green-500 text-white" :
                          "bg-red-500 text-white"
                        }`}>
                          {isSkipped ? "Skipped" : isCorrect ? "+1" : "-0.25"}
                        </span>
                      </div>
                      <div className="flex flex-col gap-2">
                        {q.options.map((opt, i) => {
                          const labels = ["A", "B", "C", "D"];
                          const isSelected = selected === opt;
                          const isRight = q.correctAnswer === opt;
                          return (
                            <div key={i} className={`flex items-center gap-2 px-3 py-2 rounded text-sm border ${
                              isRight ? "bg-green-100 border-green-400 font-semibold text-green-800" :
                              isSelected && !isRight ? "bg-red-100 border-red-400 text-red-800" :
                              "bg-white border-gray-200 text-gray-600"
                            }`}>
                              <span className="font-bold w-5">{labels[i]}.</span>
                              <span className="flex-1">{opt}</span>
                              {isRight && <span>✅</span>}
                              {isSelected && !isRight && <span>❌</span>}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
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

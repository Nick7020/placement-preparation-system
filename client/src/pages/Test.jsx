import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function Test() {
  const navigate = useNavigate();
  const location = useLocation();
  const category = location.state?.category || null;

  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [timeLeft, setTimeLeft] = useState(60);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [duration, setDuration] = useState(60);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) { navigate("/"); }
  }, [navigate]);

  useEffect(() => { fetchSettings(); }, []);

  const fetchSettings = async () => {
    try {
      const res = await axios.get("https://server-production-0086.up.railway.app/settings");
      setTimeLeft(res.data.testDuration);
      setDuration(res.data.testDuration);
      fetchQuestions(res.data.questionCount);
    } catch (error) {
      fetchQuestions(5);
    }
  };

  const fetchQuestions = async (count = 5) => {
    try {
      const url = category
        ? `https://server-production-0086.up.railway.app/random-questions?count=${count}&category=${category}`
        : `https://server-production-0086.up.railway.app/random-questions?count=${count}`;
      const res = await axios.get(url);
      setQuestions(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (isSubmitted) return;
    if (timeLeft === 0) { handleSubmit(); return; }
    const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft, isSubmitted]);

  const handleAnswer = (questionId, selectedAnswer) => {
    const updated = answers.filter(a => a.questionId !== questionId);
    updated.push({ questionId, selectedAnswer });
    setAnswers(updated);
  };

  const getSelected = (questionId) => {
    const found = answers.find(a => a.questionId === questionId);
    return found ? found.selectedAnswer : null;
  };

  const handleNext = () => {
    if (current < questions.length - 1) setCurrent(current + 1);
  };

  const handlePrev = () => {
    if (current > 0) setCurrent(current - 1);
  };

  const handleSubmit = async () => {
    if (isSubmitted) return;
    const confirm = window.confirm("Are you sure you want to submit the test? You cannot change answers after submission.");
    if (!confirm) return;
    setIsSubmitted(true);
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const res = await axios.post("https://server-production-0086.up.railway.app/submit-test", {
        userId: user._id,
        answers,
        startedAt: new Date()
      });
      navigate("/result", { state: { ...res.data, questions, answers } });
    } catch (error) {
      console.log(error);
    }
  };

  if (questions.length === 0) return (
    <div className="min-h-screen bg-[#f0f4f8] flex items-center justify-center">
      <p className="text-gray-500 text-lg">Loading Questions...</p>
    </div>
  );

  const q = questions[current];
  const selectedAnswer = getSelected(q._id);
  const mins = Math.floor(timeLeft / 60);
  const secs = String(timeLeft % 60).padStart(2, "0");
  const isLow = timeLeft <= 30;

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
        <div className={`flex items-center gap-2 px-4 py-1.5 rounded font-bold text-sm ${isLow ? "bg-red-500" : "bg-white text-[#1a3c6e]"}`}>
          ⏱ {mins}:{secs}
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-1 max-w-6xl mx-auto w-full px-4 py-6 gap-5">

        {/* Question Panel */}
        <div className="flex-1 flex flex-col">

          {/* Question Info Bar */}
          <div className="bg-white border border-gray-200 rounded-lg px-5 py-3 mb-4 flex justify-between items-center shadow-sm">
            <span className="text-sm font-semibold text-gray-600">Question {current + 1} of {questions.length}</span>
            <div className="flex gap-2">
              <span className="bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full uppercase">{q.category}</span>
              <span className={`text-xs font-semibold px-3 py-1 rounded-full uppercase
                ${q.difficulty === "easy" ? "bg-green-100 text-green-700" :
                  q.difficulty === "medium" ? "bg-yellow-100 text-yellow-700" :
                  "bg-red-100 text-red-700"}`}>
                {q.difficulty}
              </span>
            </div>
          </div>

          {/* Question Card */}
          <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm flex-1">
            <p className="text-gray-800 font-semibold text-base mb-6 leading-relaxed">
              Q{current + 1}. {q.question}
            </p>

            <div className="flex flex-col gap-3">
              {q.options.map((opt, index) => {
                const labels = ["A", "B", "C", "D"];
                const isSelected = selectedAnswer === opt;
                return (
                  <button
                    key={index}
                    onClick={() => handleAnswer(q._id, opt)}
                    className={`w-full text-left px-4 py-3 rounded border-2 text-sm font-medium transition-all flex items-center gap-3
                      ${isSelected
                        ? "bg-[#1a3c6e] text-white border-[#1a3c6e]"
                        : "bg-white text-gray-700 border-gray-300 hover:border-[#1a3c6e] hover:bg-blue-50"
                      }`}
                  >
                    <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0
                      ${isSelected ? "bg-white text-[#1a3c6e]" : "bg-gray-100 text-gray-600"}`}>
                      {labels[index]}
                    </span>
                    {opt}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between items-center mt-4">
            <button
              onClick={handlePrev}
              disabled={current === 0}
              className="px-6 py-2 border border-gray-300 rounded text-sm font-semibold text-gray-600 hover:bg-gray-100 disabled:opacity-40"
            >
              ← Previous
            </button>
            <button
              onClick={handleNext}
              disabled={current === questions.length - 1}
              className="px-6 py-2 border border-[#1a3c6e] rounded text-sm font-semibold text-[#1a3c6e] hover:bg-blue-50 disabled:opacity-40"
            >
              Next →
            </button>
          </div>
        </div>

        {/* Question Palette */}
        <div className="w-52 flex-shrink-0">
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-4">
            <h4 className="text-sm font-bold text-gray-700 mb-3">Question Palette</h4>
            <div className="grid grid-cols-4 gap-2">
              {questions.map((ques, i) => {
                const isAnswered = answers.find(a => a.questionId === ques._id);
                const isCurrent = i === current;
                return (
                  <button
                    key={i}
                    onClick={() => setCurrent(i)}
                    className={`w-9 h-9 rounded text-xs font-bold border-2 transition-all
                      ${isCurrent ? "border-[#1a3c6e] bg-[#1a3c6e] text-white" :
                        isAnswered ? "border-green-500 bg-green-500 text-white" :
                        "border-gray-300 bg-white text-gray-600 hover:border-[#1a3c6e]"
                      }`}
                  >
                    {i + 1}
                  </button>
                );
              })}
            </div>

            <div className="mt-4 flex flex-col gap-2 text-xs text-gray-500">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-green-500"></div> Answered
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-[#1a3c6e]"></div> Current
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded border-2 border-gray-300"></div> Not Visited
              </div>
            </div>

            <button
              onClick={handleSubmit}
              className="mt-4 w-full px-4 py-2 bg-green-600 text-white rounded text-sm font-semibold hover:bg-green-700"
            >
              Submit Test ✅
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Test;

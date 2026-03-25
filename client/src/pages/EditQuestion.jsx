import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function EditQuestion() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    question: "",
    options: ["", "", "", ""],
    correctAnswer: "",
    category: "aptitude",
    difficulty: "easy",
  });

  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/questions?page=1&limit=100`);
        const found = res.data.data.find((q) => q._id === id);
        if (found) {
          setForm({
            question: found.question,
            options: found.options,
            correctAnswer: found.correctAnswer,
            category: found.category,
            difficulty: found.difficulty,
          });
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchQuestion();
  }, [id]);

  const handleOptionChange = (index, value) => {
    const updated = [...form.options];
    updated[index] = value;
    setForm({ ...form, options: updated });
  };

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(`http://localhost:5000/update-question/${id}`, form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Question Updated ✅");
      navigate("/admin");
    } catch (error) {
      alert(error.response?.data?.message || "Update Failed ❌");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-10 px-4">
      <div className="bg-white rounded-2xl shadow-md p-8 w-full max-w-xl">

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-blue-600">Edit Question ✏️</h2>
          <button
            onClick={() => navigate("/admin")}
            className="text-sm text-gray-500 hover:text-gray-700"
          >
            ✕ Cancel
          </button>
        </div>

        <input
          type="text"
          placeholder="Question"
          value={form.question}
          onChange={(e) => setForm({ ...form, question: e.target.value })}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        {form.options.map((opt, i) => (
          <input
            key={i}
            type="text"
            placeholder={`Option ${i + 1}`}
            value={opt}
            onChange={(e) => handleOptionChange(i, e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        ))}

        <input
          type="text"
          placeholder="Correct Answer (exact match with one option)"
          value={form.correctAnswer}
          onChange={(e) => setForm({ ...form, correctAnswer: e.target.value })}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <div className="flex gap-3 mb-6">
          <select
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="aptitude">Aptitude</option>
            <option value="dsa">DSA</option>
            <option value="technical">Technical</option>
            <option value="mern">MERN</option>
          </select>

          <select
            value={form.difficulty}
            onChange={(e) => setForm({ ...form, difficulty: e.target.value })}
            className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>

        <div className="flex gap-3">
          <button
            onClick={handleSubmit}
            className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 font-semibold"
          >
            Update Question ✅
          </button>
          <button
            onClick={() => navigate("/admin")}
            className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg hover:bg-gray-300 font-semibold"
          >
            Cancel ❌
          </button>
        </div>

      </div>
    </div>
  );
}

export default EditQuestion;

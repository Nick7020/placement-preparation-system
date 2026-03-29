import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../services/api";

function EditQuestion() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({ question: "", options: ["", "", "", ""], correctAnswer: "", category: "aptitude", difficulty: "easy" });
  const [msg, setMsg] = useState("");

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await API.get(`/questions?page=1&limit=100`);
        const found = res.data.data.find((q) => q._id === id);
        if (found) setForm({ question: found.question, options: found.options, correctAnswer: found.correctAnswer, category: found.category, difficulty: found.difficulty });
      } catch (e) { console.log(e); }
    };
    fetch();
  }, [id]);

  const handleSubmit = async () => {
    try {
      await API.put(`/update-question/${id}`, form);
      setMsg("Updated ✅");
      setTimeout(() => navigate("/admin"), 1000);
    } catch (e) { setMsg(e.response?.data?.message || "Failed ❌"); }
  };

  const inputCls = "w-full bg-[#1e2a3a] border border-[#2e3f52] text-white rounded px-3 py-2 text-sm focus:outline-none focus:border-[#4a9eff]";
  const selectCls = "flex-1 bg-[#1e2a3a] border border-[#2e3f52] text-white rounded px-3 py-2 text-sm focus:outline-none focus:border-[#4a9eff]";

  return (
    <div className="min-h-screen bg-[#0f1923] flex items-center justify-center px-4">
      <div className="bg-[#141f2e] border border-[#1e2a3a] rounded-lg p-8 w-full max-w-xl">

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-white font-bold text-lg">Edit Question ✏️</h2>
          <button onClick={() => navigate("/admin")} className="text-gray-400 hover:text-white text-sm">✕ Cancel</button>
        </div>

        <div className="flex flex-col gap-3">
          <input className={inputCls} placeholder="Question text" value={form.question} onChange={(e) => setForm({ ...form, question: e.target.value })} />

          {form.options.map((opt, i) => (
            <input key={i} className={inputCls} placeholder={`Option ${i + 1}`} value={opt}
              onChange={(e) => { const o = [...form.options]; o[i] = e.target.value; setForm({ ...form, options: o }); }} />
          ))}

          <input className={inputCls} placeholder="Correct Answer (exact match)" value={form.correctAnswer} onChange={(e) => setForm({ ...form, correctAnswer: e.target.value })} />

          <div className="flex gap-3">
            <select className={selectCls} value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
              {["aptitude","dsa","technical","mern","reasoning"].map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            <select className={selectCls} value={form.difficulty} onChange={(e) => setForm({ ...form, difficulty: e.target.value })}>
              {["easy","medium","hard"].map(d => <option key={d} value={d}>{d}</option>)}
            </select>
          </div>

          <div className="flex gap-3 mt-2">
            <button onClick={handleSubmit} className="flex-1 bg-[#4a9eff] hover:bg-[#3a8eef] text-white py-2 rounded font-semibold text-sm transition-colors">
              Update ✅
            </button>
            <button onClick={() => navigate("/admin")} className="flex-1 bg-[#1e2a3a] hover:bg-[#2e3f52] text-gray-300 py-2 rounded font-semibold text-sm transition-colors">
              Cancel
            </button>
          </div>

          {msg && <p className="text-center text-sm text-green-400">{msg}</p>}
        </div>
      </div>
    </div>
  );
}

export default EditQuestion;

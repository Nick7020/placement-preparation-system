import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const API = "https://server-production-0086.up.railway.app";

function Admin() {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [settings, setSettings] = useState({ testDuration: 60, questionCount: 5 });
  const [durationMinutes, setDurationMinutes] = useState(1);
  const [activeTab, setActiveTab] = useState("questions");
  const [papers, setPapers] = useState([]);
  const [paperForm, setPaperForm] = useState({ title: "", category: "mixed", difficulty: "mixed", questionCount: 10, duration: 30, isActive: true });
  const [form, setForm] = useState({ question: "", options: ["", "", "", ""], correctAnswer: "", category: "aptitude", difficulty: "easy" });

  useEffect(() => { fetchQuestions(); fetchSettings(); fetchPapers(); }, []);

  const fetchSettings = async () => {
    try {
      const res = await axios.get(`${API}/settings`);
      setSettings(res.data);
      setDurationMinutes(Math.round(res.data.testDuration / 60));
    } catch (error) { console.log(error); }
  };

  const fetchPapers = async () => {
    try {
      const res = await axios.get(`${API}/exam-papers`);
      setPapers(res.data);
    } catch (error) { console.log(error); }
  };

  const fetchQuestions = async () => {
    try {
      const res = await axios.get(`${API}/questions?page=1&limit=100`);
      setQuestions(res.data.data);
    } catch (error) { console.log(error); }
  };

  const handleSaveSettings = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(`${API}/settings`, { ...settings, testDuration: durationMinutes * 60 }, { headers: { Authorization: `Bearer ${token}` } });
      alert("Settings Saved ✅");
    } catch (error) { alert("Failed ❌"); }
  };

  const handleOptionChange = (index, value) => {
    const updated = [...form.options];
    updated[index] = value;
    setForm({ ...form, options: updated });
  };

  const handleAddQuestion = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(`${API}/add-question`, form, { headers: { Authorization: `Bearer ${token}` } });
      alert("Question Added ✅");
      setForm({ question: "", options: ["", "", "", ""], correctAnswer: "", category: "aptitude", difficulty: "easy" });
      fetchQuestions();
    } catch (error) { alert(error.response?.data?.message || "Failed ❌"); }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this question?")) return;
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${API}/delete-question/${id}`, { headers: { Authorization: `Bearer ${token}` } });
      fetchQuestions();
    } catch (error) { alert("Delete Failed ❌"); }
  };

  const handleAddPaper = async () => {
    if (!paperForm.title.trim()) return alert("Title required ❌");
    try {
      const token = localStorage.getItem("token");
      await axios.post(`${API}/exam-papers`, paperForm, { headers: { Authorization: `Bearer ${token}` } });
      alert("Exam Paper Created ✅");
      setPaperForm({ title: "", category: "mixed", difficulty: "mixed", questionCount: 10, duration: 30, isActive: true });
      fetchPapers();
    } catch (error) { alert("Failed ❌"); }
  };

  const handleDeletePaper = async (id) => {
    if (!confirm("Delete this paper?")) return;
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${API}/exam-papers/${id}`, { headers: { Authorization: `Bearer ${token}` } });
      fetchPapers();
    } catch (error) { alert("Delete Failed ❌"); }
  };

  const handleTogglePaper = async (paper) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(`${API}/exam-papers/${paper._id}`, { ...paper, isActive: !paper.isActive }, { headers: { Authorization: `Bearer ${token}` } });
      fetchPapers();
    } catch (error) { alert("Failed ❌"); }
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
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-4xl mx-auto">

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-gray-800">Admin Panel 🛠️</h2>
          <button onClick={() => navigate("/dashboard")} className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 font-semibold">
            ⬅️ Dashboard
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          {["questions", "papers", "settings"].map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              className={`px-5 py-2 rounded-lg font-semibold text-sm capitalize ${activeTab === tab ? "bg-[#1a3c6e] text-white" : "bg-white text-gray-600 hover:bg-gray-50"}`}>
              {tab === "questions" ? "📋 Questions" : tab === "papers" ? "📝 Exam Papers" : "⚙️ Settings"}
            </button>
          ))}
        </div>

        {/* Settings Tab */}
        {activeTab === "settings" && (
          <div className="bg-white rounded-2xl shadow-md p-6">
            <h3 className="text-xl font-bold text-indigo-600 mb-4">Test Settings ⚙️</h3>
            <div className="flex gap-3 mb-4">
              <div className="flex-1">
                <label className="text-sm text-gray-500 mb-1 block">Duration (minutes)</label>
                <input type="number" min="1" max="60" value={durationMinutes}
                  onChange={(e) => setDurationMinutes(Number(e.target.value))}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400" />
              </div>
              <div className="flex-1">
                <label className="text-sm text-gray-500 mb-1 block">Questions Per Test</label>
                <input type="number" min="1" max="50" value={settings.questionCount}
                  onChange={(e) => setSettings({ ...settings, questionCount: Number(e.target.value) })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400" />
              </div>
            </div>
            <button onClick={handleSaveSettings} className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 font-semibold">
              Save Settings ⚙️
            </button>
          </div>
        )}

        {/* Exam Papers Tab */}
        {activeTab === "papers" && (
          <div>
            <div className="bg-white rounded-2xl shadow-md p-6 mb-6">
              <h3 className="text-xl font-bold text-purple-600 mb-4">Create Exam Paper 📝</h3>
              <input type="text" placeholder="Paper Title (e.g. Mock Test 1)" value={paperForm.title}
                onChange={(e) => setPaperForm({ ...paperForm, title: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-purple-400" />
              <div className="grid grid-cols-2 gap-3 mb-3">
                <div>
                  <label className="text-xs text-gray-500 mb-1 block">Category</label>
                  <select value={paperForm.category} onChange={(e) => setPaperForm({ ...paperForm, category: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400">
                    <option value="mixed">Mixed (All)</option>
                    <option value="aptitude">Aptitude</option>
                    <option value="dsa">DSA</option>
                    <option value="technical">Technical</option>
                    <option value="mern">MERN</option>
                    <option value="reasoning">Reasoning</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs text-gray-500 mb-1 block">Difficulty</label>
                  <select value={paperForm.difficulty} onChange={(e) => setPaperForm({ ...paperForm, difficulty: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400">
                    <option value="mixed">Mixed</option>
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs text-gray-500 mb-1 block">No. of Questions</label>
                  <input type="number" min="1" max="50" value={paperForm.questionCount}
                    onChange={(e) => setPaperForm({ ...paperForm, questionCount: Number(e.target.value) })}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400" />
                </div>
                <div>
                  <label className="text-xs text-gray-500 mb-1 block">Duration (minutes)</label>
                  <input type="number" min="1" max="180" value={paperForm.duration}
                    onChange={(e) => setPaperForm({ ...paperForm, duration: Number(e.target.value) })}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400" />
                </div>
              </div>
              <button onClick={handleAddPaper} className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 font-semibold">
                Create Paper ➕
              </button>
            </div>

            <h3 className="text-lg font-bold text-gray-800 mb-3">All Exam Papers ({papers.length})</h3>
            <div className="flex flex-col gap-3">
              {papers.length === 0 && <p className="text-gray-400 text-center py-6">No papers created yet</p>}
              {papers.map((paper) => (
                <div key={paper._id} className="bg-white rounded-xl shadow-sm p-4 flex justify-between items-center">
                  <div>
                    <h4 className="font-bold text-gray-800">{paper.title}</h4>
                    <div className="flex gap-2 mt-1 flex-wrap">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${categoryColors[paper.category]}`}>{paper.category.toUpperCase()}</span>
                      <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${difficultyColors[paper.difficulty]}`}>{paper.difficulty.toUpperCase()}</span>
                      <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-blue-100 text-blue-700">{paper.questionCount} Qs</span>
                      <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-gray-100 text-gray-700">⏱ {paper.duration} min</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => handleTogglePaper(paper)}
                      className={`px-3 py-1 rounded text-xs font-semibold ${paper.isActive ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}>
                      {paper.isActive ? "Active" : "Inactive"}
                    </button>
                    <button onClick={() => handleDeletePaper(paper._id)} className="px-3 py-1 rounded text-xs font-semibold bg-red-100 text-red-600 hover:bg-red-200">
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Questions Tab */}
        {activeTab === "questions" && (
          <div>
            <div className="bg-white rounded-2xl shadow-md p-6 mb-8">
              <h3 className="text-xl font-bold text-green-600 mb-4">Add New Question ➕</h3>
              <input type="text" placeholder="Question" value={form.question}
                onChange={(e) => setForm({ ...form, question: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-green-400" />
              {form.options.map((opt, i) => (
                <input key={i} type="text" placeholder={`Option ${i + 1}`} value={opt}
                  onChange={(e) => handleOptionChange(i, e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-green-400" />
              ))}
              <input type="text" placeholder="Correct Answer (exact match with one option)" value={form.correctAnswer}
                onChange={(e) => setForm({ ...form, correctAnswer: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-green-400" />
              <div className="flex gap-3 mb-4">
                <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}
                  className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400">
                  <option value="aptitude">Aptitude</option>
                  <option value="dsa">DSA</option>
                  <option value="technical">Technical</option>
                  <option value="mern">MERN</option>
                  <option value="reasoning">Reasoning</option>
                </select>
                <select value={form.difficulty} onChange={(e) => setForm({ ...form, difficulty: e.target.value })}
                  className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400">
                  <option value="easy">Easy</option>
                  <option value="medium">Medium</option>
                  <option value="hard">Hard</option>
                </select>
              </div>
              <button onClick={handleAddQuestion} className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 font-semibold">
                Add Question ➕
              </button>
            </div>

            <h3 className="text-xl font-bold text-gray-800 mb-4">All Questions 📋 ({questions.length})</h3>
            <div className="flex flex-col gap-4">
              {questions.map((q) => (
                <div key={q._id} className="bg-white rounded-2xl shadow-md p-5">
                  <h4 className="font-semibold text-gray-800 mb-2">{q.question}</h4>
                  <div className="flex gap-2 mb-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${categoryColors[q.category]}`}>{q.category.toUpperCase()}</span>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${difficultyColors[q.difficulty]}`}>{q.difficulty.toUpperCase()}</span>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => navigate(`/edit-question/${q._id}`)} className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 font-semibold">Edit ✏️</button>
                    <button onClick={() => handleDelete(q._id)} className="flex-1 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 font-semibold">Delete 🗑</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

export default Admin;

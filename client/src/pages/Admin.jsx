import API from "../services/api";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Admin() {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [settings, setSettings] = useState({ testDuration: 60, questionCount: 5 });
  const [durationMinutes, setDurationMinutes] = useState(1);
  const [activeTab, setActiveTab] = useState("questions");
  const [papers, setPapers] = useState([]);
  const [paperForm, setPaperForm] = useState({ title: "", category: "mixed", difficulty: "mixed", questionCount: 10, duration: 30, isActive: true });
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [filterCategory, setFilterCategory] = useState("");
  const [showAddQuestion, setShowAddQuestion] = useState(false);
  const [newQ, setNewQ] = useState({ question: "", options: ["", "", "", ""], correctAnswer: "", category: "aptitude", difficulty: "easy" });
  const [form, setForm] = useState({ question: "", options: ["", "", "", ""], correctAnswer: "", category: "aptitude", difficulty: "easy" });
  const [uploadResult, setUploadResult] = useState(null);

  useEffect(() => { fetchQuestions(); fetchSettings(); fetchPapers(); }, []);

  const fetchSettings = async () => {
    try {
      const res = await API.get("/settings");
      setSettings(res.data);
      setDurationMinutes(Math.round(res.data.testDuration / 60));
    } catch (error) { console.log(error); }
  };

  const fetchPapers = async () => {
    try {
      const res = await API.get("/exam-papers");
      setPapers(res.data);
    } catch (error) { console.log(error); }
  };

  const fetchQuestions = async () => {
    try {
      const res = await API.get("/questions?page=1&limit=100");
      setQuestions(res.data.data);
    } catch (error) { console.log(error); }
  };

  const handleSaveSettings = async () => {
    try {
      await API.put("/settings", { ...settings, testDuration: durationMinutes * 60 });
      alert("Settings Saved ✅");
    } catch (error) { alert("Failed ❌"); }
  };

  const handleOptionChange = (index, value) => {
    const updated = [...form.options];
    updated[index] = value;
    setForm({ ...form, options: updated });
  };

  const handleBulkUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);
    try {
      const res = await API.post("/bulk-upload", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      setUploadResult(res.data);
      fetchQuestions();
    } catch (error) { alert("Upload Failed ❌"); }
    e.target.value = "";
  };

  const downloadSample = () => {
    const csv = `question,option1,option2,option3,option4,correctAnswer,category,difficulty\nWhat is React?,A library,A framework,A language,A database,A library,technical,easy\nWhat is MongoDB?,SQL DB,NoSQL DB,Graph DB,XML DB,NoSQL DB,mern,easy`;
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "sample_questions.csv";
    a.click();
  };

  const handleAddQuestion = async () => {
    try {
      await API.post("/add-question", form);
      alert("Question Added ✅");
      setForm({ question: "", options: ["", "", "", ""], correctAnswer: "", category: "aptitude", difficulty: "easy" });
      fetchQuestions();
    } catch (error) { alert(error.response?.data?.message || "Failed ❌"); }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this question?")) return;
    try {
      await API.delete(`/delete-question/${id}`);
      fetchQuestions();
    } catch (error) { alert("Delete Failed ❌"); }
  };

  const handleAddQuickQuestion = async () => {
    if (!newQ.question.trim()) return alert("Question required ❌");
    if (newQ.options.some(o => !o.trim())) return alert("All options required ❌");
    if (!newQ.correctAnswer.trim()) return alert("Correct answer required ❌");
    try {
      const res = await API.post("/add-question", newQ);
      const addedId = res.data.question._id;
      setSelectedQuestions(prev => [...prev, addedId]);
      await fetchQuestions();
      setNewQ({ question: "", options: ["", "", "", ""], correctAnswer: "", category: "aptitude", difficulty: "easy" });
      setShowAddQuestion(false);
      alert("Question added & selected ✅");
    } catch (error) { alert(error.response?.data?.message || "Failed ❌"); }
  };

  const handleAddPaper = async () => {
    if (!paperForm.title.trim()) return alert("Title required ❌");
    if (selectedQuestions.length === 0) return alert("Select at least 1 question ❌");
    try {
      await API.post("/exam-papers", { ...paperForm, questionCount: selectedQuestions.length, selectedQuestions });
      alert("Exam Paper Created ✅");
      setPaperForm({ title: "", category: "mixed", difficulty: "mixed", questionCount: 10, duration: 30, isActive: true });
      setSelectedQuestions([]);
      fetchPapers();
    } catch (error) { alert("Failed ❌"); }
  };

  const handleDeletePaper = async (id) => {
    if (!confirm("Delete this paper?")) return;
    try {
      await API.delete(`/exam-papers/${id}`);
      fetchPapers();
    } catch (error) { alert("Delete Failed ❌"); }
  };

  const handleTogglePaper = async (paper) => {
    try {
      await API.put(`/exam-papers/${paper._id}`, { ...paper, isActive: !paper.isActive });
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
              {/* Question Selection */}
              <div className="mb-3">
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs font-bold text-gray-600">Select Questions ({selectedQuestions.length} selected)</label>
                  <div className="flex gap-2">
                    <button onClick={() => setShowAddQuestion(!showAddQuestion)}
                      className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded font-semibold hover:bg-purple-200">
                      {showAddQuestion ? "Cancel" : "+ Add New Question"}
                    </button>
                    <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)}
                      className="text-xs border border-gray-300 rounded px-2 py-1">
                      <option value="">All Categories</option>
                      <option value="aptitude">Aptitude</option>
                      <option value="dsa">DSA</option>
                      <option value="technical">Technical</option>
                      <option value="mern">MERN</option>
                      <option value="reasoning">Reasoning</option>
                    </select>
                  </div>
                </div>

                {/* Inline Add Question Form */}
                {showAddQuestion && (
                  <div className="border-2 border-purple-200 rounded-lg p-3 mb-3 bg-purple-50">
                    <p className="text-xs font-bold text-purple-700 mb-2">New Question</p>
                    <input type="text" placeholder="Question" value={newQ.question}
                      onChange={(e) => setNewQ({ ...newQ, question: e.target.value })}
                      className="w-full border border-gray-300 rounded px-3 py-1.5 text-xs mb-2 focus:outline-none focus:ring-1 focus:ring-purple-400" />
                    {newQ.options.map((opt, i) => (
                      <input key={i} type="text" placeholder={`Option ${i + 1}`} value={opt}
                        onChange={(e) => { const o = [...newQ.options]; o[i] = e.target.value; setNewQ({ ...newQ, options: o }); }}
                        className="w-full border border-gray-300 rounded px-3 py-1.5 text-xs mb-2 focus:outline-none focus:ring-1 focus:ring-purple-400" />
                    ))}
                    <input type="text" placeholder="Correct Answer (exact match)" value={newQ.correctAnswer}
                      onChange={(e) => setNewQ({ ...newQ, correctAnswer: e.target.value })}
                      className="w-full border border-gray-300 rounded px-3 py-1.5 text-xs mb-2 focus:outline-none focus:ring-1 focus:ring-purple-400" />
                    <div className="flex gap-2 mb-2">
                      <select value={newQ.category} onChange={(e) => setNewQ({ ...newQ, category: e.target.value })}
                        className="flex-1 border border-gray-300 rounded px-2 py-1.5 text-xs">
                        <option value="aptitude">Aptitude</option>
                        <option value="dsa">DSA</option>
                        <option value="technical">Technical</option>
                        <option value="mern">MERN</option>
                        <option value="reasoning">Reasoning</option>
                      </select>
                      <select value={newQ.difficulty} onChange={(e) => setNewQ({ ...newQ, difficulty: e.target.value })}
                        className="flex-1 border border-gray-300 rounded px-2 py-1.5 text-xs">
                        <option value="easy">Easy</option>
                        <option value="medium">Medium</option>
                        <option value="hard">Hard</option>
                      </select>
                    </div>
                    <button onClick={handleAddQuickQuestion}
                      className="w-full bg-purple-600 text-white py-1.5 rounded text-xs font-semibold hover:bg-purple-700">
                      Add & Select This Question ✅
                    </button>
                  </div>
                )}

                <div className="border border-gray-200 rounded-lg max-h-60 overflow-y-auto">
                  {questions
                    .filter(q => filterCategory ? q.category === filterCategory : true)
                    .map((q) => (
                      <label key={q._id} className={`flex items-start gap-3 px-3 py-2 cursor-pointer hover:bg-gray-50 border-b border-gray-100 ${
                        selectedQuestions.includes(q._id) ? "bg-purple-50" : ""
                      }`}>
                        <input type="checkbox" className="mt-1 flex-shrink-0"
                          checked={selectedQuestions.includes(q._id)}
                          onChange={(e) => {
                            if (e.target.checked) setSelectedQuestions([...selectedQuestions, q._id]);
                            else setSelectedQuestions(selectedQuestions.filter(id => id !== q._id));
                          }}
                        />
                        <div>
                          <p className="text-xs text-gray-700">{q.question}</p>
                          <div className="flex gap-1 mt-1">
                            <span className={`text-xs px-1.5 py-0.5 rounded-full ${categoryColors[q.category]}`}>{q.category}</span>
                            <span className={`text-xs px-1.5 py-0.5 rounded-full ${difficultyColors[q.difficulty]}`}>{q.difficulty}</span>
                          </div>
                        </div>
                      </label>
                    ))}
                </div>
              </div>

              <button onClick={handleAddPaper} className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 font-semibold">
                Create Paper ({selectedQuestions.length} questions) ➕
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
            {/* Bulk Upload */}
            <div className="bg-white rounded-2xl shadow-md p-6 mb-6">
              <h3 className="text-xl font-bold text-blue-600 mb-4">Bulk Upload Questions 📂</h3>
              <div className="flex gap-3 mb-3">
                <label className="flex-1 cursor-pointer">
                  <div className="border-2 border-dashed border-blue-300 rounded-lg p-4 text-center hover:border-blue-500 hover:bg-blue-50 transition-all">
                    <p className="text-blue-600 font-semibold text-sm">📁 Click to upload CSV file</p>
                    <p className="text-gray-400 text-xs mt-1">CSV format only</p>
                  </div>
                  <input type="file" accept=".csv" className="hidden" onChange={handleBulkUpload} />
                </label>
                <button onClick={downloadSample} className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-semibold hover:bg-gray-200">
                  ⬇️ Sample CSV
                </button>
              </div>
              {uploadResult && (
                <div className={`p-3 rounded-lg text-sm ${uploadResult.skipped > 0 ? "bg-yellow-50 border border-yellow-200" : "bg-green-50 border border-green-200"}`}>
                  <p className="font-semibold">{uploadResult.message}</p>
                  {uploadResult.skipped > 0 && <p className="text-yellow-600 text-xs mt-1">{uploadResult.skipped} questions skipped</p>}
                </div>
              )}
            </div>

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

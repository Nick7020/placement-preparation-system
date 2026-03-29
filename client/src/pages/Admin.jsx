import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

const TABS = ["Questions", "Add Question", "Exam Papers", "Settings"];

function Admin() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("Questions");

  // Questions state
  const [questions, setQuestions] = useState([]);
  const [qPage, setQPage] = useState(1);
  const [qTotal, setQTotal] = useState(0);
  const [qFilter, setQFilter] = useState({ category: "", difficulty: "" });
  const LIMIT = 10;

  // Add Question state
  const [form, setForm] = useState({ question: "", options: ["", "", "", ""], correctAnswer: "", category: "aptitude", difficulty: "easy" });
  const [addMsg, setAddMsg] = useState("");

  // Exam Papers state
  const [papers, setPapers] = useState([]);
  const [paperForm, setPaperForm] = useState({ title: "", category: "mixed", difficulty: "mixed", questionCount: 10, duration: 30 });
  const [paperMsg, setPaperMsg] = useState("");
  const [allQuestions, setAllQuestions] = useState([]);
  const [selectedQIds, setSelectedQIds] = useState([]);
  const [qSearch, setQSearch] = useState("");
  const [inlineForm, setInlineForm] = useState({ question: "", options: ["", "", "", ""], correctAnswer: "", category: "aptitude", difficulty: "easy" });
  const [inlineMsg, setInlineMsg] = useState("");
  const [showInline, setShowInline] = useState(false);

  // Settings state
  const [settings, setSettings] = useState({ testDuration: 60, questionCount: 5 });
  const [settingMsg, setSettingMsg] = useState("");

  // Bulk upload
  const [bulkFile, setBulkFile] = useState(null);
  const [bulkMsg, setBulkMsg] = useState("");

  useEffect(() => { fetchQuestions(); }, [qPage, qFilter]);
  useEffect(() => { fetchPapers(); fetchSettings(); fetchAllQuestions(); }, []);

  const fetchQuestions = async () => {
    try {
      const params = `page=${qPage}&limit=${LIMIT}${qFilter.category ? `&category=${qFilter.category}` : ""}${qFilter.difficulty ? `&difficulty=${qFilter.difficulty}` : ""}`;
      const res = await API.get(`/questions?${params}`);
      setQuestions(res.data.data);
      setQTotal(res.data.totalPages);
    } catch (e) { console.log(e); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this question?")) return;
    try {
      await API.delete(`/delete-question/${id}`);
      fetchQuestions();
    } catch (e) { alert("Delete Failed ❌"); }
  };

  const handleAddQuestion = async () => {
    try {
      await API.post("/add-question", form);
      setAddMsg("Question Added ✅");
      setForm({ question: "", options: ["", "", "", ""], correctAnswer: "", category: "aptitude", difficulty: "easy" });
      setTimeout(() => setAddMsg(""), 3000);
    } catch (e) { setAddMsg(e.response?.data?.message || "Failed ❌"); }
  };

  const fetchAllQuestions = async () => {
    try {
      const res = await API.get("/questions?page=1&limit=500");
      setAllQuestions(res.data.data);
    } catch (e) { console.log(e); }
  };

  const toggleSelectQ = (id) => {
    setSelectedQIds(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const handleAddInlineQuestion = async () => {
    try {
      const res = await API.post("/add-question", inlineForm);
      const newQ = res.data.question;
      setAllQuestions(prev => [...prev, newQ]);
      setSelectedQIds(prev => [...prev, newQ._id]);
      setInlineMsg("Question added & selected ✅");
      setInlineForm({ question: "", options: ["", "", "", ""], correctAnswer: "", category: "aptitude", difficulty: "easy" });
      setShowInline(false);
      setTimeout(() => setInlineMsg(""), 3000);
    } catch (e) { setInlineMsg(e.response?.data?.message || "Failed ❌"); }
  };

  const fetchPapers = async () => {
    try {
      const res = await API.get("/exam-papers");
      setPapers(res.data);
    } catch (e) { console.log(e); }
  };

  const handleAddPaper = async () => {
    try {
      await API.post("/exam-papers", { ...paperForm, selectedQuestions: selectedQIds });
      setPaperMsg("Paper Created ✅");
      setPaperForm({ title: "", category: "mixed", difficulty: "mixed", questionCount: 10, duration: 30 });
      setSelectedQIds([]);
      fetchPapers();
      setTimeout(() => setPaperMsg(""), 3000);
    } catch (e) { setPaperMsg("Failed ❌"); }
  };

  const handleDeletePaper = async (id) => {
    if (!window.confirm("Delete this paper?")) return;
    try {
      await API.delete(`/exam-papers/${id}`);
      fetchPapers();
    } catch (e) { alert("Delete Failed ❌"); }
  };

  const fetchSettings = async () => {
    try {
      const res = await API.get("/settings");
      setSettings({ testDuration: res.data.testDuration, questionCount: res.data.questionCount });
    } catch (e) { console.log(e); }
  };

  const handleSaveSettings = async () => {
    try {
      await API.put("/settings", settings);
      setSettingMsg("Settings Saved ✅");
      setTimeout(() => setSettingMsg(""), 3000);
    } catch (e) { setSettingMsg("Failed ❌"); }
  };

  const handleBulkUpload = async () => {
    if (!bulkFile) return setBulkMsg("Select a file first ❌");
    const data = new FormData();
    data.append("file", bulkFile);
    try {
      const res = await API.post("/bulk-upload", data);
      setBulkMsg(`✅ ${res.data.uploaded} uploaded, ${res.data.skipped} skipped`);
      fetchQuestions();
    } catch (e) { setBulkMsg("Upload Failed ❌"); }
  };

  const inputCls = "w-full bg-[#1e2a3a] border border-[#2e3f52] text-white rounded px-3 py-2 text-sm focus:outline-none focus:border-[#4a9eff]";
  const selectCls = "bg-[#1e2a3a] border border-[#2e3f52] text-white rounded px-3 py-2 text-sm focus:outline-none focus:border-[#4a9eff]";
  const btnPrimary = "bg-[#4a9eff] hover:bg-[#3a8eef] text-white px-4 py-2 rounded text-sm font-semibold transition-colors";
  const btnDanger = "bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded text-xs font-semibold transition-colors";
  const btnEdit = "bg-[#2e3f52] hover:bg-[#3a4f62] text-white px-3 py-1.5 rounded text-xs font-semibold transition-colors";

  return (
    <div className="min-h-screen bg-[#0f1923] flex">

      {/* Sidebar */}
      <div className="w-56 bg-[#141f2e] border-r border-[#1e2a3a] flex flex-col flex-shrink-0">
        <div className="px-5 py-5 border-b border-[#1e2a3a]">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-[#4a9eff] rounded flex items-center justify-center text-white font-bold text-xs">P</div>
            <span className="text-white font-bold text-sm">Admin Panel</span>
          </div>
        </div>

        <nav className="flex-1 py-4">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`w-full text-left px-5 py-3 text-sm font-medium transition-colors flex items-center gap-3
                ${activeTab === tab
                  ? "bg-[#4a9eff] text-white"
                  : "text-gray-400 hover:text-white hover:bg-[#1e2a3a]"
                }`}
            >
              {tab === "Questions" && "📋"}
              {tab === "Add Question" && "➕"}
              {tab === "Exam Papers" && "📝"}
              {tab === "Settings" && "⚙️"}
              {tab}
            </button>
          ))}
        </nav>

        <div className="px-5 py-4 border-t border-[#1e2a3a]">
          <button
            onClick={() => navigate("/dashboard")}
            className="w-full text-left text-gray-400 hover:text-white text-sm flex items-center gap-2 transition-colors"
          >
            ← Dashboard
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">

        {/* Top Bar */}
        <div className="bg-[#141f2e] border-b border-[#1e2a3a] px-6 py-4 flex justify-between items-center">
          <h1 className="text-white font-bold text-lg">{activeTab}</h1>
          <span className="text-gray-400 text-sm">Placement Preparation System</span>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">

          {/* ── QUESTIONS TAB ── */}
          {activeTab === "Questions" && (
            <div>
              {/* Filters */}
              <div className="flex gap-3 mb-5 flex-wrap">
                <select className={selectCls} value={qFilter.category} onChange={(e) => { setQFilter({ ...qFilter, category: e.target.value }); setQPage(1); }}>
                  <option value="">All Categories</option>
                  {["aptitude","dsa","technical","mern","reasoning"].map(c => <option key={c} value={c}>{c}</option>)}
                </select>
                <select className={selectCls} value={qFilter.difficulty} onChange={(e) => { setQFilter({ ...qFilter, difficulty: e.target.value }); setQPage(1); }}>
                  <option value="">All Difficulties</option>
                  {["easy","medium","hard"].map(d => <option key={d} value={d}>{d}</option>)}
                </select>
                <span className="text-gray-400 text-sm self-center">Page {qPage} of {qTotal}</span>
              </div>

              {/* Bulk Upload */}
              <div className="bg-[#141f2e] border border-[#1e2a3a] rounded-lg p-4 mb-5 flex items-center gap-3 flex-wrap">
                <span className="text-gray-300 text-sm font-semibold">Bulk Upload CSV:</span>
                <input type="file" accept=".csv" onChange={(e) => setBulkFile(e.target.files[0])} className="text-gray-300 text-sm" />
                <button onClick={handleBulkUpload} className={btnPrimary}>Upload</button>
                {bulkMsg && <span className="text-sm text-green-400">{bulkMsg}</span>}
              </div>

              {/* Questions Table */}
              <div className="bg-[#141f2e] border border-[#1e2a3a] rounded-lg overflow-hidden">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-[#1e2a3a]">
                      <th className="text-left px-4 py-3 text-gray-400 font-semibold">#</th>
                      <th className="text-left px-4 py-3 text-gray-400 font-semibold">Question</th>
                      <th className="text-left px-4 py-3 text-gray-400 font-semibold">Category</th>
                      <th className="text-left px-4 py-3 text-gray-400 font-semibold">Difficulty</th>
                      <th className="text-left px-4 py-3 text-gray-400 font-semibold">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {questions.map((q, i) => (
                      <tr key={q._id} className="border-b border-[#1e2a3a] hover:bg-[#1e2a3a] transition-colors">
                        <td className="px-4 py-3 text-gray-500">{(qPage - 1) * LIMIT + i + 1}</td>
                        <td className="px-4 py-3 text-gray-200 max-w-xs truncate">{q.question}</td>
                        <td className="px-4 py-3">
                          <span className="bg-[#1e2a3a] text-[#4a9eff] px-2 py-0.5 rounded text-xs font-semibold uppercase">{q.category}</span>
                        </td>
                        <td className="px-4 py-3">
                          <span className={`px-2 py-0.5 rounded text-xs font-semibold uppercase
                            ${q.difficulty === "easy" ? "bg-green-900 text-green-400" :
                              q.difficulty === "medium" ? "bg-yellow-900 text-yellow-400" :
                              "bg-red-900 text-red-400"}`}>
                            {q.difficulty}
                          </span>
                        </td>
                        <td className="px-4 py-3 flex gap-2">
                          <button onClick={() => navigate(`/edit-question/${q._id}`)} className={btnEdit}>Edit ✏️</button>
                          <button onClick={() => handleDelete(q._id)} className={btnDanger}>Delete 🗑</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <div className="flex gap-2 mt-4">
                <button disabled={qPage === 1} onClick={() => setQPage(qPage - 1)} className="px-3 py-1.5 bg-[#1e2a3a] text-gray-300 rounded text-sm disabled:opacity-40 hover:bg-[#2e3f52]">← Prev</button>
                <button disabled={qPage === qTotal} onClick={() => setQPage(qPage + 1)} className="px-3 py-1.5 bg-[#1e2a3a] text-gray-300 rounded text-sm disabled:opacity-40 hover:bg-[#2e3f52]">Next →</button>
              </div>
            </div>
          )}

          {/* ── ADD QUESTION TAB ── */}
          {activeTab === "Add Question" && (
            <div className="max-w-xl">
              <div className="bg-[#141f2e] border border-[#1e2a3a] rounded-lg p-6 flex flex-col gap-4">
                <input className={inputCls} placeholder="Question text" value={form.question} onChange={(e) => setForm({ ...form, question: e.target.value })} />
                {form.options.map((opt, i) => (
                  <input key={i} className={inputCls} placeholder={`Option ${i + 1}`} value={opt}
                    onChange={(e) => { const o = [...form.options]; o[i] = e.target.value; setForm({ ...form, options: o }); }} />
                ))}
                <input className={inputCls} placeholder="Correct Answer (exact match)" value={form.correctAnswer} onChange={(e) => setForm({ ...form, correctAnswer: e.target.value })} />
                <div className="flex gap-3">
                  <select className={`${selectCls} flex-1`} value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
                    {["aptitude","dsa","technical","mern","reasoning"].map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                  <select className={`${selectCls} flex-1`} value={form.difficulty} onChange={(e) => setForm({ ...form, difficulty: e.target.value })}>
                    {["easy","medium","hard"].map(d => <option key={d} value={d}>{d}</option>)}
                  </select>
                </div>
                <button onClick={handleAddQuestion} className={btnPrimary}>Add Question ➕</button>
                {addMsg && <p className="text-green-400 text-sm">{addMsg}</p>}
              </div>
            </div>
          )}

          {/* ── EXAM PAPERS TAB ── */}
          {activeTab === "Exam Papers" && (
            <div>
              {/* Create Paper Form */}
              <div className="bg-[#141f2e] border border-[#1e2a3a] rounded-lg p-6 mb-6">
                <h3 className="text-white font-semibold mb-4">Create New Paper</h3>
                <div className="flex flex-col gap-3">
                  <input className={inputCls} placeholder="Paper Title" value={paperForm.title} onChange={(e) => setPaperForm({ ...paperForm, title: e.target.value })} />
                  <div className="flex gap-3">
                    <select className={`${selectCls} flex-1`} value={paperForm.category} onChange={(e) => setPaperForm({ ...paperForm, category: e.target.value })}>
                      {["mixed","aptitude","dsa","technical","mern","reasoning"].map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                    <select className={`${selectCls} flex-1`} value={paperForm.difficulty} onChange={(e) => setPaperForm({ ...paperForm, difficulty: e.target.value })}>
                      {["mixed","easy","medium","hard"].map(d => <option key={d} value={d}>{d}</option>)}
                    </select>
                  </div>
                  <div className="flex gap-3">
                    <input className={`${inputCls} flex-1`} type="number" placeholder="Questions" value={paperForm.questionCount} onChange={(e) => setPaperForm({ ...paperForm, questionCount: Number(e.target.value) })} />
                    <input className={`${inputCls} flex-1`} type="number" placeholder="Duration (min)" value={paperForm.duration} onChange={(e) => setPaperForm({ ...paperForm, duration: Number(e.target.value) })} />
                  </div>

                  {/* Question Selector */}
                  <div className="border border-[#2e3f52] rounded-lg p-4">
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-gray-300 text-sm font-semibold">Select Questions ({selectedQIds.length} selected)</span>
                      <button onClick={() => setShowInline(!showInline)} className="text-[#4a9eff] text-xs hover:underline">+ Add New Question</button>
                    </div>

                    {/* Inline Add Question Form */}
                    {showInline && (
                      <div className="bg-[#0f1923] border border-[#2e3f52] rounded-lg p-4 mb-3 flex flex-col gap-2">
                        <p className="text-gray-400 text-xs font-semibold mb-1">New Question (will be auto-selected)</p>
                        <input className={inputCls} placeholder="Question text" value={inlineForm.question} onChange={(e) => setInlineForm({ ...inlineForm, question: e.target.value })} />
                        {inlineForm.options.map((opt, i) => (
                          <input key={i} className={inputCls} placeholder={`Option ${i + 1}`} value={opt}
                            onChange={(e) => { const o = [...inlineForm.options]; o[i] = e.target.value; setInlineForm({ ...inlineForm, options: o }); }} />
                        ))}
                        <input className={inputCls} placeholder="Correct Answer (exact match)" value={inlineForm.correctAnswer} onChange={(e) => setInlineForm({ ...inlineForm, correctAnswer: e.target.value })} />
                        <div className="flex gap-2">
                          <select className={`${selectCls} flex-1`} value={inlineForm.category} onChange={(e) => setInlineForm({ ...inlineForm, category: e.target.value })}>
                            {["aptitude","dsa","technical","mern","reasoning"].map(c => <option key={c} value={c}>{c}</option>)}
                          </select>
                          <select className={`${selectCls} flex-1`} value={inlineForm.difficulty} onChange={(e) => setInlineForm({ ...inlineForm, difficulty: e.target.value })}>
                            {["easy","medium","hard"].map(d => <option key={d} value={d}>{d}</option>)}
                          </select>
                        </div>
                        <div className="flex gap-2">
                          <button onClick={handleAddInlineQuestion} className={`${btnPrimary} flex-1`}>Add & Select ✅</button>
                          <button onClick={() => setShowInline(false)} className="flex-1 bg-[#1e2a3a] text-gray-300 px-4 py-2 rounded text-sm">Cancel</button>
                        </div>
                        {inlineMsg && <p className="text-green-400 text-xs">{inlineMsg}</p>}
                      </div>
                    )}

                    {/* Search */}
                    <input className={`${inputCls} mb-3`} placeholder="Search questions..." value={qSearch} onChange={(e) => setQSearch(e.target.value)} />

                    {/* Question List */}
                    <div className="max-h-60 overflow-y-auto flex flex-col gap-1">
                      {allQuestions
                        .filter(q => q.question.toLowerCase().includes(qSearch.toLowerCase()))
                        .map(q => (
                          <label key={q._id} className={`flex items-start gap-3 px-3 py-2 rounded cursor-pointer transition-colors
                            ${selectedQIds.includes(q._id) ? "bg-[#1a3a5c] border border-[#4a9eff]" : "hover:bg-[#1e2a3a] border border-transparent"}`}>
                            <input type="checkbox" checked={selectedQIds.includes(q._id)} onChange={() => toggleSelectQ(q._id)} className="mt-0.5 accent-[#4a9eff]" />
                            <div>
                              <p className="text-gray-200 text-xs">{q.question}</p>
                              <p className="text-gray-500 text-xs mt-0.5">{q.category} • {q.difficulty}</p>
                            </div>
                          </label>
                        ))}
                    </div>
                  </div>

                  <button onClick={handleAddPaper} className={btnPrimary}>Create Paper 📝</button>
                  {paperMsg && <p className="text-green-400 text-sm">{paperMsg}</p>}
                </div>
              </div>

              {/* Papers List */}
              <div className="bg-[#141f2e] border border-[#1e2a3a] rounded-lg overflow-hidden">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-[#1e2a3a]">
                      <th className="text-left px-4 py-3 text-gray-400 font-semibold">Title</th>
                      <th className="text-left px-4 py-3 text-gray-400 font-semibold">Category</th>
                      <th className="text-left px-4 py-3 text-gray-400 font-semibold">Difficulty</th>
                      <th className="text-left px-4 py-3 text-gray-400 font-semibold">Qs</th>
                      <th className="text-left px-4 py-3 text-gray-400 font-semibold">Duration</th>
                      <th className="text-left px-4 py-3 text-gray-400 font-semibold">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {papers.map((p) => (
                      <tr key={p._id} className="border-b border-[#1e2a3a] hover:bg-[#1e2a3a] transition-colors">
                        <td className="px-4 py-3 text-gray-200 font-medium">{p.title}</td>
                        <td className="px-4 py-3"><span className="bg-[#1e2a3a] text-[#4a9eff] px-2 py-0.5 rounded text-xs uppercase">{p.category}</span></td>
                        <td className="px-4 py-3"><span className="text-gray-300 text-xs uppercase">{p.difficulty}</span></td>
                        <td className="px-4 py-3 text-gray-300">{p.questionCount}</td>
                        <td className="px-4 py-3 text-gray-300">{p.duration} min</td>
                        <td className="px-4 py-3">
                          <button onClick={() => handleDeletePaper(p._id)} className={btnDanger}>Delete 🗑</button>
                        </td>
                      </tr>
                    ))}
                    {papers.length === 0 && (
                      <tr><td colSpan={6} className="px-4 py-8 text-center text-gray-500">No papers yet</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ── SETTINGS TAB ── */}
          {activeTab === "Settings" && (
            <div className="max-w-sm">
              <div className="bg-[#141f2e] border border-[#1e2a3a] rounded-lg p-6 flex flex-col gap-4">
                <div>
                  <label className="text-gray-400 text-sm mb-1 block">Test Duration (seconds)</label>
                  <input className={inputCls} type="number" value={settings.testDuration} onChange={(e) => setSettings({ ...settings, testDuration: Number(e.target.value) })} />
                </div>
                <div>
                  <label className="text-gray-400 text-sm mb-1 block">Default Question Count</label>
                  <input className={inputCls} type="number" value={settings.questionCount} onChange={(e) => setSettings({ ...settings, questionCount: Number(e.target.value) })} />
                </div>
                <button onClick={handleSaveSettings} className={btnPrimary}>Save Settings ⚙️</button>
                {settingMsg && <p className="text-green-400 text-sm">{settingMsg}</p>}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

export default Admin;

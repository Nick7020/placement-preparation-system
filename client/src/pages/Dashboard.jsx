import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-[#f0f4f8] flex flex-col">

      {/* Header */}
      <div className="bg-[#1a3c6e] text-white px-6 py-3 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
            <span className="text-[#1a3c6e] font-bold text-sm">P</span>
          </div>
          <span className="font-semibold text-lg tracking-wide">Placement Preparation System</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-blue-200">Welcome, <span className="text-white font-semibold">{user.name}</span></span>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white text-sm px-4 py-1.5 rounded transition-colors"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Main */}
      <div className="flex-1 px-6 py-8 max-w-5xl mx-auto w-full">

        {/* Welcome Banner */}
        <div className="bg-white border-l-4 border-[#1a3c6e] rounded-lg p-5 mb-8 shadow-sm">
          <h2 className="text-xl font-bold text-[#1a3c6e]">Welcome, {user.name}!</h2>
          <p className="text-gray-500 text-sm mt-1">Select an option below to continue your placement preparation.</p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

          <div
            onClick={() => navigate("/select-test")}
            className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md hover:border-[#1a3c6e] cursor-pointer transition-all"
          >
            <div className="text-3xl mb-3">🧠</div>
            <h3 className="text-lg font-bold text-gray-800">Start Test</h3>
            <p className="text-sm text-gray-500 mt-1">Attempt a new placement mock test with timer.</p>
          </div>

          <div
            onClick={() => navigate("/history")}
            className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md hover:border-[#1a3c6e] cursor-pointer transition-all"
          >
            <div className="text-3xl mb-3">📋</div>
            <h3 className="text-lg font-bold text-gray-800">Test History</h3>
            <p className="text-sm text-gray-500 mt-1">View all your previous test attempts and scores.</p>
          </div>

          <div
            onClick={() => navigate("/analytics")}
            className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md hover:border-[#1a3c6e] cursor-pointer transition-all"
          >
            <div className="text-3xl mb-3">📊</div>
            <h3 className="text-lg font-bold text-gray-800">Analytics</h3>
            <p className="text-sm text-gray-500 mt-1">Track your performance, accuracy and improvement.</p>
          </div>

          <div
            onClick={() => navigate("/leaderboard")}
            className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md hover:border-[#1a3c6e] cursor-pointer transition-all"
          >
            <div className="text-3xl mb-3">🏆</div>
            <h3 className="text-lg font-bold text-gray-800">Leaderboard</h3>
            <p className="text-sm text-gray-500 mt-1">See top performers and compare your ranking.</p>
          </div>

          {user.role === "admin" && (
            <div
              onClick={() => navigate("/admin")}
              className="bg-[#1a3c6e] text-white border border-[#1a3c6e] rounded-lg p-6 shadow-sm hover:bg-[#15305a] cursor-pointer transition-all sm:col-span-2"
            >
              <div className="text-3xl mb-3">🛠️</div>
              <h3 className="text-lg font-bold">Admin Panel</h3>
              <p className="text-sm text-blue-200 mt-1">Manage questions, settings and test configuration.</p>
            </div>
          )}

        </div>
      </div>

      <div className="text-center text-xs text-gray-400 py-4">
        © 2025 Placement Preparation System. All rights reserved.
      </div>

    </div>
  );
}

export default Dashboard;

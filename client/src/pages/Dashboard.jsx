import { useNavigate } from "react-router-dom";

function Dashboard() {

  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div>
      <h2>Dashboard 🚀</h2>

      <h3>Welcome, {user.name}</h3>

      <button onClick={() => navigate("/test")}>
        Start Test 🧠
      </button>

      <button onClick={() => navigate("/history")}>
        History 📊
      </button>

      <button onClick={() => navigate("/analytics")}>
        Analytics 📈
      </button>

      <button onClick={() => navigate("/leaderboard")}>
        Leaderboard 🏆
      </button>

      {/* 🔥 ADMIN ONLY BUTTON */}
      {user.role === "admin" && (
        <button onClick={() => navigate("/admin")}>
          Admin Panel 🛠️
        </button>
      )}

      <br /><br />

      <button onClick={handleLogout}>
        Logout 🚪
      </button>
    </div>
  );
}

export default Dashboard;
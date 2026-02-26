import axios from "axios";
import { useEffect, useState } from "react";

function Dashboard() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get("http://localhost:5000/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUser(res.data);

      } catch (error) {
        console.log(error);
      }
    };

    fetchProfile();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  if (!user) return <h2>Loading...</h2>;

  return (
  <div>
    <h2>Dashboard 🚀</h2>

    <h3>Welcome, {user.name} 👋</h3>

    <button onClick={() => window.location.href="/test"}>
      Start Test 🧠🔥
    </button>

    <br /><br />

    <button onClick={handleLogout}>
      Logout
    </button>
  </div>
);
}

export default Dashboard;

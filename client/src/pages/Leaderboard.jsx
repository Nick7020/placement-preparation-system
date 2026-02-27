import { useEffect, useState } from "react";
import axios from "axios";

function Leaderboard() {

  const [leaders, setLeaders] = useState([]);

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const fetchLeaderboard = async () => {
    try {
      const res = await axios.get("http://localhost:5000/leaderboard");
      setLeaders(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  if (leaders.length === 0) return <h2>No Data Yet 🏆</h2>;

  return (
    <div>
      <h2>Leaderboard 🏆</h2>

      {leaders.map((user, index) => (
        <div 
          key={index} 
          style={{
            border: "1px solid gray",
            padding: "10px",
            margin: "10px"
          }}
        >
          <h3>Rank #{index + 1}</h3>
          <p>User ID: {user._id}</p>
          <p>Tests Given: {user.testsGiven}</p>
          <p>Average Accuracy: {user.averageAccuracy.toFixed(2)}%</p>
        </div>
      ))}

    </div>
  );
}

export default Leaderboard;
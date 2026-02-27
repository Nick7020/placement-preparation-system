import { useEffect, useState } from "react";
import axios from "axios";

function Analytics() {

  const [data, setData] = useState(null);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {

      const user = JSON.parse(localStorage.getItem("user"));

      const res = await axios.get(
        `http://localhost:5000/analytics/${user._id}`
      );

      setData(res.data);

    } catch (error) {
      console.log(error);
    }
  };

  if (!data) return <h2>Loading Analytics...</h2>;

  return (
    <div>
      <h2>Performance Analytics 📊</h2>

      <p>Total Tests: {data.totalTests}</p>
      <p>Average Score: {data.averageScore}</p>
      <p>Best Score: {data.bestScore}</p>
      <p>Average Accuracy: {data.averageAccuracy}</p>

    </div>
  );
}

export default Analytics;
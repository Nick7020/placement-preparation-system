import { useEffect, useState } from "react";
import axios from "axios";

function History() {

  const [history, setHistory] = useState([]);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {

      const user = JSON.parse(localStorage.getItem("user"));

      const res = await axios.get(
        `http://localhost:5000/my-history/${user._id}`
      );

      setHistory(res.data);

    } catch (error) {
      console.log(error);
    }
  };

  if (history.length === 0) {
    return <h2>No Test History Found 📭</h2>;
  }

  return (
    <div>
      <h2>My Test History 📊</h2>

      {history.map((item, index) => (
        <div key={index} style={{border:"1px solid gray", padding:"10px", margin:"10px"}}>

          <p>Score: {item.score}</p>
          <p>Total: {item.total}</p>
          <p>Accuracy: {item.accuracy}</p>
          <p>Date: {new Date(item.createdAt).toLocaleDateString()}</p>

        </div>
      ))}

    </div>
  );
}

export default History;
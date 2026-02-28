import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Admin() {

  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      const res = await axios.get("http://localhost:5000/questions?page=1&limit=5");
      setQuestions(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  const handleDelete = async (id) => {
  try {

    const token = localStorage.getItem("token");

    await axios.delete(`http://localhost:5000/delete-question/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    alert("Question Deleted ✅");

    // Refresh list
    fetchQuestions();

  } catch (error) {
    console.log(error);
    alert("Delete Failed ❌");
  }
};

  return (
  <div>
    <h2>Admin Panel 🛠️</h2>

    {questions.map((q) => (
      <div
        key={q._id}
        style={{ border: "1px solid gray", margin: "10px", padding: "10px" }}
      >
        <h4>{q.question}</h4>
        <p>Category: {q.category}</p>
        <p>Difficulty: {q.difficulty}</p>

        <button
          style={{ backgroundColor: "red", color: "white" }}
          onClick={() => handleDelete(q._id)}
        >
          Delete 🗑
        </button>
      </div>
    ))}

  </div>
);
}

export default Admin;
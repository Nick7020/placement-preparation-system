import { useLocation, useNavigate } from "react-router-dom";

function Result() {

  const location = useLocation();
  const navigate = useNavigate();

  const result = location.state;

  if (!result) {
    return <h2>No Result Found ❌</h2>;
  }

  return (
    <div>
      <h2>Test Result 🎉</h2>

      <h3>Score: {result.score}</h3>
      <h3>Accuracy: {result.accuracy}</h3>
      <h3>Time Taken: {result.timeTaken} sec</h3>

      <br />

      <button onClick={() => navigate("/dashboard")}>
        Back to Dashboard 🏠
      </button>
    </div>
  );
}

export default Result;
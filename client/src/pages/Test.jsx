import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Test() {

  const navigate = useNavigate();

  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [timeLeft, setTimeLeft] = useState(60);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // ✅ Check Login Once
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      alert("Please login first ❌");
      navigate("/");
    }
  }, [navigate]);

  // 🔹 Fetch Questions
  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      const res = await axios.get("http://localhost:5000/random-questions?count=5");
      setQuestions(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  // 🔹 TIMER
  useEffect(() => {

    if (isSubmitted) return;

    if (timeLeft === 0) {
      handleSubmit();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);

  }, [timeLeft, isSubmitted]);

  // 🔹 Answer Select
  const handleAnswer = (questionId, selectedAnswer) => {
    const updated = answers.filter(a => a.questionId !== questionId);
    updated.push({ questionId, selectedAnswer });
    setAnswers(updated);
  };

  // 🔹 Next Question
  const handleNext = () => {
    if (current < questions.length - 1) {
      setCurrent(current + 1);
    }
  };

  // 🔹 Submit Test
  const handleSubmit = async () => {

    if (isSubmitted) return;
    setIsSubmitted(true);

    try {

      const user = JSON.parse(localStorage.getItem("user"));

      const res = await axios.post("http://localhost:5000/submit-test", {
        userId: user._id,
        answers,
        startedAt: new Date()
      });

      navigate("/result", { state: res.data });

    } catch (error) {
      console.log(error);
    }
  };

  if (questions.length === 0) return <h2>Loading Questions...</h2>;

  const q = questions[current];

  return (
    <div>
      <h2>Test Screen 🧠🔥</h2>
      <h3>⏳ Time Left: {timeLeft} sec</h3>

      <h3>{q.question}</h3>

      {q.options.map((opt, index) => (
        <div key={index}>
          <button onClick={() => handleAnswer(q._id, opt)}>
            {opt}
          </button>
        </div>
      ))}

      <br />

      <button onClick={handleNext}>Next ➡️</button>
      <button onClick={handleSubmit}>Submit ✅</button>
    </div>
  );
}

export default Test;
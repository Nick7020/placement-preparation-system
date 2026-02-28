import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    try {

      await axios.post("http://localhost:5000/create-user", {
        name,
        email,
        password
      });

      alert("Registration Successful ✅");

      navigate("/");

    } catch (error) {
      console.log(error);
      alert("Registration Failed ❌");
    }
  };

  return (
    <div>
      <h2>Register</h2>

      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <br /><br />

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <br /><br />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <br /><br />

      <button onClick={handleRegister}>
        Register
      </button>
      <button onClick={() => window.location.href = "/"}>
        Login
      </button>
    </div>
  );
}

export default Register;
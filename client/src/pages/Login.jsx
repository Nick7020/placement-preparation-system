import { useState } from "react";
import axios from "axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const res = await axios.post("http://localhost:5000/login", {
        email,
        password,
      });

      console.log(res.data);

      alert("Login Successful ✅");

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user",JSON.stringify(res.data.user));
      window.location.href = "/dashboard";

    } catch (error) {
      alert(error.response?.data?.message || "Login Failed ❌");
    }
  };

  return (
    <div>
      <h2>Login</h2>

      <input
        type="email"
        placeholder="Enter Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <br /><br />

      <input
        type="password"
        placeholder="Enter Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <br /><br />

      <button onClick={handleLogin}>
        Login
      </button>
      <button onClick={() => window.location.href = "/register"}>
        Register
      </button>
    </div>
  );
}

export default Login;

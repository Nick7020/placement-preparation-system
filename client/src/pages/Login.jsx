import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post("https://server-production.up.railway.app/login", { email, password });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      navigate("/dashboard");
    } catch (error) {
      alert(error.response?.data?.message || "Login Failed ❌");
    }
  };

  return (
    <div className="min-h-screen bg-[#f0f4f8] flex flex-col">

      {/* Top Header Bar */}
      <div className="bg-[#1a3c6e] text-white py-3 px-6 flex items-center gap-3">
        <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
          <span className="text-[#1a3c6e] font-bold text-sm">P</span>
        </div>
        <span className="font-semibold text-lg tracking-wide">Placement Preparation System</span>
      </div>

      {/* Main Content */}
      <div className="flex flex-1 items-center justify-center px-4">
        <div className="bg-white border border-gray-200 rounded-lg shadow-md w-full max-w-md">

          {/* Card Header */}
          <div className="bg-[#1a3c6e] text-white text-center py-4 rounded-t-lg">
            <h2 className="text-xl font-bold tracking-wide">CANDIDATE LOGIN</h2>
            <p className="text-blue-200 text-sm mt-1">Enter your credentials to continue</p>
          </div>

          {/* Form */}
          <div className="p-8">
            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-600 mb-1">Email ID</label>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-[#1a3c6e] focus:ring-1 focus:ring-[#1a3c6e]"
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-600 mb-1">Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-[#1a3c6e] focus:ring-1 focus:ring-[#1a3c6e]"
              />
            </div>

            <button
              onClick={handleLogin}
              className="w-full bg-[#1a3c6e] text-white py-2 rounded font-semibold text-sm hover:bg-[#15305a] transition-colors"
            >
              LOGIN
            </button>

            <div className="text-center mt-4">
              <span className="text-sm text-gray-500">New candidate? </span>
              <button
                onClick={() => navigate("/register")}
                className="text-sm text-[#1a3c6e] font-semibold hover:underline"
              >
                Register Here
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* Footer */}
      <div className="text-center text-xs text-gray-400 py-4">
        © 2025 Placement Preparation System. All rights reserved.
      </div>

    </div>
  );
}

export default Login;

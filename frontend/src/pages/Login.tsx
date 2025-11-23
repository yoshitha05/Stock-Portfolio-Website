import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axiosClient";

const Login: React.FC = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    setError("");

    try {
      const res = await api.post("/auth/login", { email, password });

      // Save token to localStorage
      localStorage.setItem("token", res.data.token);

      // Navigate to dashboard
      navigate("/dashboard");
    } catch (err: any) {
      setError(err.response?.data?.msg || "Something went wrong");
    }
  };

  return (
    <div className="w-screen h-screen bg-[#E6FFF7] flex items-center justify-center">
      <div className="bg-white p-10 rounded-2xl shadow-xl w-full max-w-md border border-[#00D09C]/40">
        <h1 className="text-3xl font-bold text-[#00D09C] mb-2">Login</h1>
        <p className="text-gray-600 mb-6">Welcome back! Please login.</p>

        {error && (
          <p className="text-red-500 text-center mb-4 font-medium">{error}</p>
        )}

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#00D09C] outline-none"
            placeholder="Enter your email"
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-1">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#00D09C] outline-none"
            placeholder="Enter your password"
          />
        </div>

        <button
          onClick={handleLogin}
          className="w-full bg-[#00D09C] text-white py-2 rounded-lg font-semibold hover:bg-[#02C08E] transition"
        >
          Login
        </button>

        <p className="text-center text-gray-600 mt-4">
          Don't have an account?{" "}
          <Link to="/register" className="text-[#00D09C] font-semibold hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
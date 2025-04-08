import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { handleError, handleSuccess } from "../utils";
import { Eye, EyeOff } from "lucide-react";

function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      return handleError("All fields are required!");
    }

    try {
      const url = "https://algorithm-visualizer-amx3.onrender.com/api/v1/login";
      // const url = "http://localhost:4000/api/v1/login";
      const response = await fetch(url, {
        method: "POST",
        credentials: 'include',//required
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      const result = await response.json();
      console.log(result);
      if (response.ok  || result.success === true) {
        handleSuccess(result.message);
        //Store token after successful login
        localStorage.setItem("token", result.token);
        // localStorage.setItem("user", JSON.stringify(result.user));
        setTimeout(() => {
          navigate("/home");
        }, 1000);
      } else {
        return handleError(result.message || "Login failed");
      }
    } catch (error) {
      return handleError("Network error or server is down");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white p-6">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-6">Login</h1>

        <form onSubmit={handleLogin} className="space-y-4">
          {/* Email */}
          <div>
            <label className="block text-gray-300">Email</label>
            <input
              onChange={handleChange}
              type="email"
              name="email"
              placeholder="Enter your email..."
              value={formData.email}
              className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600 focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Password */}
          <div className="relative">
            <label className="block text-gray-300">Password</label>
            <input
              onChange={handleChange}
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Enter your password..."
              value={formData.password}
              className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600 focus:ring-2 focus:ring-blue-500 pr-10"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-9 text-gray-400"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 transition duration-300 text-white font-bold py-2 rounded"
          >
            Login
          </button>

          <span className="block text-center text-gray-400">
            Forget {" "}
            <Link to="/forgot-password" className="text-blue-400 hover:underline">
              Password?
            </Link>
          </span>
          {/* Signup Link */}
          <span className="block text-center text-gray-400">
            Don't have an account?{" "}
            <Link to="/signup" className="text-blue-400 hover:underline">
              Sign Up
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
}

export default Login;

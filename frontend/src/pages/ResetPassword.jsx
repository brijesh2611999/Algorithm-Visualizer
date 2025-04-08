import React, { useState,useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { handleError, handleSuccess } from "../utils";
import { Eye, EyeOff } from "lucide-react";

function ResetPassword() {
  const navigate = useNavigate();
  const location = useLocation();

  //previous state data
  const email = location.state?.email || "";
  useEffect(() => {
      if (!email) {
        handleError("Invalid access. Please start again.");
        navigate("/forgot-password");
      }
    }, []);


  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleReset = async (e) => {
    e.preventDefault();

    if (!formData.password || !formData.confirmPassword) {
      return handleError("All fields are required");
    }

    if (formData.password !== formData.confirmPassword) {
      return handleError("Passwords do not match");
    }

    try {
      const url = "https://algorithm-visualizer-amx3.onrender.com/api/v1/reset-password";
    //   const url = "http://localhost:4000/api/v1/reset-password";
      const res = await fetch(url, {
        method: "POST",
        credentials:"include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email:email,
          newPassword: formData.password,
        }),
      });

      const result = await res.json();
      console.log(result);
      if (res.ok && result.success) {
        handleSuccess("Password updated successfully!");
        setTimeout(() => navigate("/login"), 1500);
      } else {
        handleError(result.message || "Something went wrong");
      }
    } catch (error) {
      handleError("Network error or server is down");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white p-6">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-6">Reset Password</h1>

        <form onSubmit={handleReset} className="space-y-4">
          <div className="relative">
            <label className="block text-gray-300">New Password</label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Enter new password..."
              value={formData.password}
              onChange={handleChange}
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

          <div>
            <label className="block text-gray-300">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm your new password..."
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600 focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 transition duration-300 text-white font-bold py-2 rounded"
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
}

export default ResetPassword;

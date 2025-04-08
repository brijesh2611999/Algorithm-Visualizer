import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { handleError, handleSuccess } from "../utils";
import { Eye, EyeOff } from "lucide-react";

function Signup() {
  const navigate = useNavigate();
  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    lastname: "",
    email: "",
    password: "",
    confirmpassword: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.lastname || !formData.email || !formData.password || !formData.confirmpassword) {
      return handleError("All fields are required");
    } else if (formData.password !== formData.confirmpassword) {
      return handleError("Passwords do not match!");
    }

    try {
        const url = "https://algorithm-visualizer-amx3.onrender.com/api/v1/sendotp";
        // const url = "http://localhost:4000/api/v1/sendotp";
        const response = await fetch(url, {
            method: "POST",
            //when you deploy the project then uncomment this line
            credentials: 'include',//required
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: formData.email }),
        });
      const result = await response.json();
      console.log(result.message);
      console.log(response);
      if (response.ok) {
        handleSuccess('otp is sent to your email id successfully');
        setTimeout(() => navigate("/otpverification", { state: { formData } }), 1000);
      } else {
        handleError(result.message || "Signup failed");
      }
    } catch (error) {
      handleError("Network error or server is down");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white p-6">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-6">Sign Up</h1>

        <form onSubmit={handleSignup} className="space-y-4">
          {/* first name */}
          <div>
            <label className="block text-gray-300">First Name</label>
            <input
              onChange={handleChange}
              type="text"
              name="name"
              placeholder="Enter your first name..."
              value={formData.name}
              className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600 focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* last name */}
          <div>
            <label className="block text-gray-300">Last Name</label>
            <input
              onChange={handleChange}
              type="text"
              name="lastname"
              placeholder="Enter your last name..."
              value={formData.lastname}
              className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600 focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* email */}
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

          {/* password */}
          <div className="relative">
            <label className="block text-gray-300">Password</label>
            <input
              onChange={handleChange}
              type={showPassword1 ? "text" : "password"}
              name="password"
              placeholder="Enter your password..."
              value={formData.password}
              className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600 focus:ring-2 focus:ring-blue-500 pr-10"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword1(!showPassword1)}
              className="absolute right-3 top-9 text-gray-400"
            >
              {showPassword1 ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          {/*confirm password  */}
          <div className="relative">
            <label className="block text-gray-300">Confirm Password</label>
            <input
              onChange={handleChange}
              type={showPassword2 ? "text" : "password"}
              name="confirmpassword"
              placeholder="Enter your password again..."
              value={formData.confirmpassword}
              className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600 focus:ring-2 focus:ring-blue-500 pr-10"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword2(!showPassword2)}
              className="absolute right-3 top-9 text-gray-400"
            >
              {showPassword2 ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          {/* signup */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 transition duration-300 text-white font-bold py-2 rounded"
          >
            Sign Up
          </button>

          {/* login */}
          <span className="block text-center text-gray-400">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-400 hover:underline">
              Login
            </Link>
          </span>
        </form>
      </div>

    </div>
  );
}

export default Signup;

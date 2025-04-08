import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { handleError, handleSuccess } from "../utils";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) return handleError("Please enter your email");

    try {
      const url = "https://algorithm-visualizer-amx3.onrender.com/api/v1/verify-email";
      // const url = "http://localhost:4000/api/v1/verify-email";
      const res = await fetch(url, {
        method: "POST",
        //when you deploy project then credentials include compulsory to call api
        credentials: 'include',//required
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const result = await res.json();
      console.log(result);
      if (res.ok || result.success === true) {
        handleSuccess("Email found. Redirecting to otp verification page...");
        setTimeout(() => navigate("/otp-verify-forget-password", { state: { email } }), 1000);
      } else {
        handleError("Email not found. Redirecting to sign up...");
        setTimeout(() => navigate("/signup"), 1500);
      }
    } catch (error) {
      handleError("Something went wrong. Try again later.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white p-6">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-6">Forgot Password</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-300">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your registered email..."
              className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600 focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 transition duration-300 text-white font-bold py-2 rounded"
          >
            Continue
          </button>
        </form>
      </div>
    </div>
  );
}

export default ForgotPassword;

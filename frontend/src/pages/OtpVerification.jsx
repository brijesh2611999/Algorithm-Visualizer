import React, { useState ,useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { handleError, handleSuccess } from "../utils";

function OtpVerification() {
  const navigate = useNavigate();
  const location = useLocation();
  const [otp, setOtp] = useState("");

  // Get user data from Signup page
  const formData = location.state?.formData || {};

  const handleChange = (e) => {
    setOtp(e.target.value);
  };

  useEffect(() => {
    console.log("Updated OTP:", otp);
}, [otp]);

  const handleSignup = async () => {
    console.log(otp);
    if (otp===""){
        handleError('Please Enter OTP');
        return;  
    } 

    try {
      // const url = "http://localhost:4000/api/v1/signup";
      const url = "https://algorithm-visualizer-amx3.onrender.com/api/v1/signup";
      const response = await fetch(url, {
        method: "POST",
        credentials: 'include',//required
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: formData.name,
          lastName: formData.lastname,
          email: formData.email,
          password: formData.password,
          confirmPassword: formData.confirmpassword,
          otp: otp,
        }),
      });
      //before access any variable of response you have to convert it json formate
      const result = await response.json();
      console.log(result.message);
      console.log(response);
      if (!response.ok  || result.success === false) {
        return handleError('invalid otp');
      }
      else{
          handleSuccess("Signup successful!");
          navigate("/login");
      }
    } catch (error) {
      handleError("Error completing signup. Try again!");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white p-6">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-4">OTP Verification</h1>
        <p className="text-gray-400 text-center mb-6">
          An OTP has been sent to your email. Enter it below:
        </p>

        <div className="flex justify-center">
          <input
            type="text"
            value={otp}
            onChange={handleChange}
            placeholder="Enter OTP"
            className="w-3/4 p-2 text-center text-lg rounded bg-gray-700 text-white border border-gray-600 focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="button"
          onClick={handleSignup}
          className="w-full bg-blue-600 hover:bg-blue-700 transition duration-300 text-white font-bold py-2 rounded mt-4"
        >
          Submit OTP & Signup
        </button>
      </div>
    </div>
  );
}

export default OtpVerification;

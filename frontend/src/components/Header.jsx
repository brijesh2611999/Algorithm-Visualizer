import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const [isAuthorized, setIsAuthorized] = useState(null);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const name = localStorage.getItem("username");

  useEffect(() => {
    const verifyToken = async () => {
      if (!token) {
        setIsAuthorized(false);
        return;
      }

      try {
        // const url = "http://localhost:4000/api/v1/protected";
        const url = "https://algorithm-visualizer-amx3.onrender.com/api/v1/protected";
        const res = await fetch(url, {
          method: "GET",
          // when you deploy then credentials include other wise api not call
          credentials: "include",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setIsAuthorized(res.ok);
      } catch (error) {
        console.error("Verification failed:", error);
        setIsAuthorized(false);
      }
    };

    verifyToken();
  }, [token]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthorized(false);
    navigate("/login");
  };
  
  return (
    <header className="bg-gradient-to-r from-gray-900 via-purple-800 to-black bg-[length:200%_200%] animate-gradient text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold font-handwritten">
          <Link to="/home">Algorithm Visualizer</Link>
        </h1>

        <nav>
          <ul className="flex space-x-6">
            <li><Link to="/home" className="hover:underline font-handwritten">Home</Link></li>
            <li><Link to="/about" className="hover:underline font-handwritten">About</Link></li>
            <li><Link to="/contact" className="hover:underline font-handwritten">Contact</Link></li>
          </ul>
        </nav>

        <div className="space-x-4">
          {!isAuthorized ? (
            <>
              <Link to="/login">
                <button className="px-4 py-2 bg-white text-blue-600 rounded hover:bg-gray-100 font-handwritten">
                  Login
                </button>
              </Link>
              <Link to="/signup">
                <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 font-handwritten">
                  Sign Up
                </button>
              </Link>
            </>
          ) : (
            <div className="flex items-center space-x-4">
              <span className="font-handwritten text-lg">🧑‍💻 {name}</span>
              <button
                onClick={handleLogout}
                className="px-3 py-1 bg-red-500 rounded hover:bg-red-600 font-handwritten"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;

import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-gradient-to-r from-gray-900 via-purple-800 to-black bg-[length:200%_200%] animate-gradient text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold font-handwritten">
          <Link to="/home">Algorithm Visualizer</Link>
          </h1>
        <nav>
          <ul className="flex space-x-6">
            <li>< Link to="/home" className="hover:underline font-handwritten">Home</Link></li>
            <li>< Link to="/about" className="hover:underline font-handwritten">About</Link></li>
            <li>< Link to="/contact" className="hover:underline font-handwritten">Contact</Link></li>
          </ul>
        </nav>
        <div className="space-x-4">
          
          <button className="px-4 py-2 bg-white text-blue-600 rounded hover:bg-gray-100 font-handwritten">
            <Link to="/login">Login</Link>
          </button>
          
          <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 font-handwritten">
            <Link to="/Signup">Sign Up</Link>
          </button>
        
        </div>
      </div>
    </header>
  );
};

export default Header;

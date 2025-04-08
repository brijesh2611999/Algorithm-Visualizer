import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-gray-900 via-purple-800 to-black bg-[length:200%_200%] animate-gradient text-white p-6 mt-10 shadow-md">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        
        {/* Left Section - Brand */}
        <div className="text-center md:text-left">
          <h2 className="text-xl font-bold font-handwritten">Algorithm Visualizer</h2>
          <p className="text-sm mt-1">© {new Date().getFullYear()} All Rights Reserved</p>
        </div>

        {/* Middle Section - Navigation Links */}
        <nav className="my-4 md:my-0">
          <ul className="flex space-x-6 text-sm">
            <li><a href="#" className="hover:underline font-handwritten">Privacy Policy</a></li>
            <li><a href="#" className="hover:underline font-handwritten">Terms of Service</a></li>
            <li><a href="#" className="hover:underline font-handwritten">Support</a></li>
          </ul>
        </nav>

        {/* Right Section - Social Media */}
        <div className="flex space-x-4">
          <a href="#" className="hover:text-gray-300 transition"><FaFacebook size={24} /></a>
          <a href="#" className="hover:text-gray-300 transition"><FaTwitter size={24} /></a>
          <a href="#" className="hover:text-gray-300 transition"><FaInstagram size={24} /></a>
          <a href="https://www.linkedin.com/in/brijeshverma086/" className="hover:text-gray-300 transition"><FaLinkedin size={24} /></a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

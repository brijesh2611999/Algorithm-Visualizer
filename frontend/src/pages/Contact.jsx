import React from 'react';
import Footer from '../components/Footer';

const Contact = () => {
  
  return (
    <div className="min-h-screen flex flex-col justify-between">
      <div className="container mx-auto p-6">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">Contact Us</h2>
        
        <form className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md">
          {/* Name */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium">Name</label>
            <input 
              type="text" 
              placeholder="Enter your name" 
              className="w-full p-2 border border-gray-300 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Email */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium">Email</label>
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="w-full p-2 border border-gray-300 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Message */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium">Message</label>
            <textarea 
              rows="4" 
              placeholder="Write your message here..." 
              className="w-full p-2 border border-gray-300 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>

          {/* Submit Button */}
          <button 
            type="submit" 
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition duration-300"
          >
            Send Message
          </button>
        </form>
      </div>
      
      <Footer />
    </div>
  );
};

export default Contact;

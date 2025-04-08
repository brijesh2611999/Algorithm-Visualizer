import React from 'react';
import Footer from '../components/Footer';

function About(){
  return (
    <div className="min-h-screen flex flex-col justify-between bg-gray-100">
      <div className="container mx-auto p-6">
        <h2 className="text-4xl font-bold text-center text-blue-700 mb-6">About Algorithm Visualizer</h2>

        <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md">
          {/* Introduction */}
          <p className="text-gray-700 text-lg mb-4">
            Algorithm Visualizer is an **interactive educational platform** designed to help students and professionals 
            understand how algorithms work through **real-time visual demonstrations**.
          </p>

          {/* Why Use Algorithm Visualizer? */}
          <h3 className="text-2xl font-semibold text-blue-600 mt-4">Why Use Algorithm Visualizer?</h3>
          <ul className="list-disc list-inside text-gray-700 mt-2 space-y-2">
            <li><strong>Step-by-Step Execution:</strong> See how algorithms progress at each step.</li>
            <li><strong>Interactive Learning:</strong> Adjust inputs and observe real-time changes.</li>
            <li><strong>Supports Various Algorithms:</strong> Covers sorting, searching, graph algorithms, and more.</li>
            <li><strong>Ideal for Students & Developers:</strong> Enhance understanding and prepare for coding interviews.</li>
          </ul>

          {/* Features */}
          <h3 className="text-2xl font-semibold text-blue-600 mt-6">Key Features</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
            <div className="bg-gray-200 p-4 rounded-lg shadow-sm">
              <h4 className="text-lg font-semibold text-gray-800">Sorting Algorithms</h4>
              <p className="text-gray-600 text-sm">Visualize Bubble Sort, Merge Sort, Quick Sort, and more.</p>
            </div>
            <div className="bg-gray-200 p-4 rounded-lg shadow-sm">
              <h4 className="text-lg font-semibold text-gray-800">Graph Algorithms</h4>
              <p className="text-gray-600 text-sm">Explore BFS, DFS, Dijkstra's Algorithm, and A* Search.</p>
            </div>
            <div className="bg-gray-200 p-4 rounded-lg shadow-sm">
              <h4 className="text-lg font-semibold text-gray-800">Pathfinding</h4>
              <p className="text-gray-600 text-sm">Understand how shortest path algorithms work.</p>
            </div>
            <div className="bg-gray-200 p-4 rounded-lg shadow-sm">
              <h4 className="text-lg font-semibold text-gray-800">Code Execution</h4>
              <p className="text-gray-600 text-sm">View algorithm logic alongside the visualization.</p>
            </div>
          </div>

          {/* Conclusion */}
          <h3 className="text-2xl font-semibold text-blue-600 mt-6">Join the Learning Journey!</h3>
          <p className="text-gray-700 mt-2">
            Whether you are a **beginner learning data structures** or a **developer preparing for coding interviews**, 
            Algorithm Visualizer provides a **powerful and engaging way** to master algorithms.
          </p>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default About;

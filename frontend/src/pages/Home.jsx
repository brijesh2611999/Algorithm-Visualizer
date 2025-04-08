import React from "react";
import Footer from '../components/Footer';
import { Link } from "react-router-dom";
import { SortAsc } from 'lucide-react';
import AnimatedHeading from "../components/AnimatedHeading";

function Home(){
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100">
      
      <AnimatedHeading/>
       
      <div className="min-h-screen p-10">

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

        {/* Bubble sort */}
          <Link to="/bubble-sort">
            <div className="bg-gray-100 h-52 p-4 rounded-2xl shadow-md flex items-center justify-center">
            <SortAsc className="w-10 h-10 text-blue-500" />
            <p className="text-lg font-semibold">Bubble Sort</p>
            </div>
          </Link>

        {/* insertion sort */}
          <Link to="/insertion-sort">
            <div className="bg-gray-100 h-52 p-4 rounded-2xl shadow-md flex flex-col items-center justify-center gap-3 hover:scale-105 transition">
              <SortAsc className="w-10 h-10 text-blue-500" />
              <p className="text-lg font-semibold">Insertion Sort</p>
            </div>
          </Link>
        
        {/* selection sort */}
          <Link to="/selection-sort">
            <div className="bg-gray-100 h-52 p-4 rounded-2xl shadow-md flex flex-col items-center justify-center gap-3 hover:scale-105 transition">
              <SortAsc className="w-10 h-10 text-blue-500" />
              <p className="text-lg font-semibold">Selection Sort</p>
            </div>
          </Link>

        {/*Heap sort  */}
          <Link to="/heap-sort">
            <div className="bg-gray-100 h-52 p-4 rounded-2xl shadow-md flex flex-col items-center justify-center gap-3 hover:scale-105 transition">
              <SortAsc className="w-10 h-10 text-blue-500" />
              <p className="text-lg font-semibold">Heap Sort</p>
            </div>
          </Link>
        
        {/* Merge sort */}
          <Link to="/merge-sort">
            <div className="bg-gray-100 h-52 p-4 rounded-2xl shadow-md flex flex-col items-center justify-center gap-3 hover:scale-105 transition">
              <SortAsc className="w-10 h-10 text-blue-500" />
              <p className="text-lg font-semibold">Merge Sort</p>
            </div>
          </Link>

        {/* quick sort */}
          <Link to="/quick-sort">
            <div className="bg-gray-100 h-52 p-4 rounded-2xl shadow-md flex flex-col items-center justify-center gap-3 hover:scale-105 transition">
              <SortAsc className="w-10 h-10 text-blue-500" />
              <p className="text-lg font-semibold">Quick Sort</p>
            </div>
          </Link>

        {/* dijkstra */}
          <Link to="/dijkstra">
            <div className="bg-gray-100 h-52 p-4 rounded-2xl shadow-md flex flex-col items-center justify-center gap-3 hover:scale-105 transition">
              <SortAsc className="w-10 h-10 text-blue-500" />
              <p className="text-lg font-semibold">Dijkstra(Shortest Path)</p>
            </div>
          </Link>

        {/* bfs */}
          <Link to="/bfs">
            <div className="bg-gray-100 h-52 p-4 rounded-2xl shadow-md flex flex-col items-center justify-center gap-3 hover:scale-105 transition">
              <SortAsc className="w-10 h-10 text-blue-500" />
              <p className="text-lg font-semibold">BFS</p>
            </div>
          </Link>
          

        {/* dfs */}
          <Link to="/dfs">
            <div className="bg-gray-100 h-52 p-4 rounded-2xl shadow-md flex flex-col items-center justify-center gap-3 hover:scale-105 transition">
              <SortAsc className="w-10 h-10 text-blue-500" />
              <p className="text-lg font-semibold">DFS</p>
            </div>
          </Link>
          
        </div>

      </div>
      <Footer />
    </div>
  );
};

export default Home;

import React, { useState, useEffect } from "react";

const BubbleSort = () => {
  const [array, setArray] = useState([]);
  const [originalArray, setOriginalArray] = useState([]);
  const [sorting, setSorting] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(null);
  const [compareIndex, setCompareIndex] = useState(null);
  const [sortedIndex, setSortedIndex] = useState(new Set());
  const [sorted, setSorted] = useState(false);
  const [swapCount, setSwapCount] = useState(0);

  // Generate a new random array
  const generateArray = () => {
    if (sorting) return;
    setSorted(false);
    setSwapCount(0);
    const newArr = Array.from({ length: 10 }, () => Math.floor(Math.random() * 100));
    setOriginalArray([...newArr]);
    setArray([...newArr]);
    setSortedIndex(new Set());
    setCurrentIndex(null);
    setCompareIndex(null);
  };

  useEffect(() => {
    if (!sorted) generateArray();
  }, [sorted]);

  // Bubble Sort with Visual Effect
  const bubbleSort = async () => {
    setSorting(true);
    setSorted(false);
    setSwapCount(0);
    let arr = [...array];
    let sortedSet = new Set();
    for (let i = 0; i < arr.length - 1; i++) {
        for (let j = 0; j < arr.length - 1 - i; j++) {
            setCurrentIndex(j);
            setCompareIndex(j + 1);
            await new Promise((resolve) => setTimeout(resolve, 300));
            
            if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                setSwapCount((prev) => prev + 1);
            }
            setArray([...arr]);
            await new Promise((resolve) => setTimeout(resolve, 300));
        }
        sortedSet.add(arr.length - 1 - i);
        setSortedIndex(new Set(sortedSet));
    }
    //last element for coloring
    sortedSet.add(0);
    setSortedIndex(sortedSet);

    setCurrentIndex(null);
    setCompareIndex(null);
    setSorting(false);
    setSorted(true);
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">Bubble Sort Visualizer</h1>

      <div className="flex gap-4 mb-6">
        <button
          onClick={generateArray}
          disabled={sorting}
          className={`px-5 py-2 rounded-lg font-semibold text-white transition 
          ${sorting ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"}`}
        >
          Generate New Array
        </button>
        <button
          onClick={bubbleSort}
          disabled={sorting}
          className={`px-5 py-2 rounded-lg font-semibold text-white transition 
          ${sorting ? "bg-gray-400 cursor-not-allowed" : "bg-green-500 hover:bg-green-600"}`}
        >
          Start Sorting
        </button>
      </div>

      {/* Original Array */}
      <h2 className="text-xl font-semibold text-gray-700 mb-2">Original Array</h2>
      <div className="flex gap-2 mb-4">
        {originalArray.map((value, index) => (
          <div key={index} className="p-3 text-lg font-semibold bg-gray-200 rounded-md">
            {value}
          </div>
        ))}
      </div>

      {/* Sorting Process */}
      <h2 className="text-xl font-semibold text-gray-700 mb-2">Sorting Process</h2>
      <div className="flex gap-2 mb-6">
        {array.map((value, index) => (
          <div
            key={index}
            className={`p-3 text-lg font-semibold rounded-md transition-all duration-300
            ${index === currentIndex ? "bg-blue-400 text-white" : ""}
            ${sortedIndex.has(index) ? "bg-green-400 text-white" : ""}
            ${index === compareIndex ? "bg-red-400 text-white" : "bg-gray-300"}`}
          >
            {value}
          </div>
        ))}
      </div>

      {/* Swap Counter */}
      <h2 className="text-lg font-semibold text-gray-800">
        Swap Count: <span className="text-blue-500">{swapCount}</span>
      </h2>

      {/* Time Complexity */}
      <div className="mt-8 p-4 bg-white shadow-md rounded-lg">
        <h1 className="text-xl font-bold text-gray-700 mb-2">Time Complexity</h1>
        <p><strong>Best Case:</strong> O(n) (Already sorted)</p>
        <p><strong>Average Case:</strong> O(n²)</p>
        <p><strong>Worst Case:</strong> O(n²) (Reverse sorted)</p>
      </div>
    </div>
  );
};

export default BubbleSort;

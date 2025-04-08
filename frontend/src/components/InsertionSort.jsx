import React, { useState, useEffect } from "react";

const InsertionSort = () => {
  const [array, setArray] = useState([]);
  const [originalArray, setOriginalArray] = useState([]);
  const [sorting, setSorting] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(null);
  const [sortedIndex, setSortedIndex] = useState(new Set());
  const [compareIndex, setCompareIndex] = useState(null);
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

  // Insertion Sort with Visual Effect
  const insertionSort = async () => {
    setSorting(true);
    setSorted(false);
    setSwapCount(0);
    let arr = [...array];
    let sortedSet = new Set();
    sortedSet.add(0);

    for (let i = 1; i < arr.length; i++) {
      let key = arr[i];
      let j = i - 1;
      setCurrentIndex(i);

      while (j >= 0 && arr[j] > key) {
        setCompareIndex(j);
        await new Promise((resolve) => setTimeout(resolve, 500));

        arr[j + 1] = arr[j];
        j--;

        setArray([...arr]);
        setSwapCount((prev) => prev + 1);
        await new Promise((resolve) => setTimeout(resolve, 500));
      }

      arr[j + 1] = key;
      setArray([...arr]);
      sortedSet.add(i);
      setSortedIndex(new Set(sortedSet));
      setCompareIndex(null);
      await new Promise((resolve) => setTimeout(resolve, 500));
    }

    setCurrentIndex(null);
    setSorting(false);
    setSorted(true);
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">Insertion Sort Visualizer</h1>

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
          onClick={insertionSort}
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

export default InsertionSort;

import React, { useState, useEffect } from "react";

const HeapSort = () => {
  const [array, setArray] = useState([]);
  const [originalArray, setOriginalArray] = useState([]);
  const [sorting, setSorting] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(null);
  const [compareIndex, setCompareIndex] = useState(null);
  const [sortedIndex, setSortedIndex] = useState(new Set());
  const [swapCount, setSwapCount] = useState(0);
  const [sorted, setSorted] = useState(false);

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

  // Heapify helper function
  const heapify = async (arr, n, i) => {
    let largest = i;
    let left = 2 * i + 1;
    let right = 2 * i + 2;

    setCurrentIndex(i);

    if (left < n) {
      setCompareIndex(left);
      await new Promise((r) => setTimeout(r, 400));
      if (arr[left] > arr[largest]) largest = left;
    }

    if (right < n) {
      setCompareIndex(right);
      await new Promise((r) => setTimeout(r, 400));
      if (arr[right] > arr[largest]) largest = right;
    }

    if (largest !== i) {
      [arr[i], arr[largest]] = [arr[largest], arr[i]];
      setArray([...arr]);
      setSwapCount((prev) => prev + 1);
      await new Promise((r) => setTimeout(r, 400));
      await heapify(arr, n, largest);
    }
  };

  // Heap Sort main function
  const heapSort = async () => {
    setSorting(true);
    const arr = [...array];
    let n = arr.length;

    // Build max heap
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
      await heapify(arr, n, i);
    }

    // Extract elements one by one
    for (let i = n - 1; i > 0; i--) {
      [arr[0], arr[i]] = [arr[i], arr[0]];
      setArray([...arr]);
      setSwapCount((prev) => prev + 1);
      setSortedIndex((prev) => new Set(prev.add(i)));
      await new Promise((r) => setTimeout(r, 500));
      await heapify(arr, i, 0);
    }

    setSortedIndex((prev) => new Set(prev.add(0))); // mark last element
    setSorting(false);
    setSorted(true);
    setCurrentIndex(null);
    setCompareIndex(null);
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">Heap Sort Visualizer</h1>

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
          onClick={heapSort}
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
      <div className="flex gap-2 mb-6 flex-wrap justify-center">
        {array.map((value, index) => (
          <div
            key={index}
            className={`p-3 text-lg font-semibold rounded-md w-12 text-center transition-all duration-300
              ${index === currentIndex ? "bg-blue-400 text-white" : ""}
              ${index === compareIndex ? "bg-red-400 text-white" : ""}
              ${sortedIndex.has(index) ? "bg-green-400 text-white" : ""}
              ${!sortedIndex.has(index) &&
              index !== currentIndex &&
              index !== compareIndex
                ? "bg-gray-300"
                : ""}`}
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
        <p><strong>Best Case:</strong> O(n log n)</p>
        <p><strong>Average Case:</strong> O(n log n)</p>
        <p><strong>Worst Case:</strong> O(n log n)</p>
      </div>
    </div>
  );
};

export default HeapSort;

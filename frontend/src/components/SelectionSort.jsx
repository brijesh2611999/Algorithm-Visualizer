import React, { useState, useEffect } from "react";

const SelectionSort = () => {
  const [array, setArray] = useState([]);
  const [originalArray, setOriginalArray] = useState([]);
  const [sorting, setSorting] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(null);
  const [compareIndex, setCompareIndex] = useState(null);
  const [minIndex, setMinIndex] = useState(null);
  const [sortedIndex, setSortedIndex] = useState(new Set());
  const [sorted, setSorted] = useState(false);
  const [swapCount, setSwapCount] = useState(0);

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
    setMinIndex(null);
  };

  useEffect(() => {
    if (!sorted) generateArray();
  }, [sorted]);

  const selectionSort = async () => {
    setSorting(true);
    let arr = [...array];
    let swaps = 0;
    let sortedSet = new Set();

    for (let i = 0; i < arr.length; i++) {
      let minIdx = i;
      setCurrentIndex(i);
      setMinIndex(i);

      for (let j = i + 1; j < arr.length; j++) {
        setCompareIndex(j);
        await new Promise((res) => setTimeout(res, 400));
        if (arr[j] < arr[minIdx]) {
          minIdx = j;
          setMinIndex(minIdx);
        }
      }

      if (minIdx !== i) {
        [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
        swaps++;
        setSwapCount(swaps);
      }

      sortedSet.add(i);
      setArray([...arr]);
      setSortedIndex(new Set(sortedSet));
      setCompareIndex(null);
      setMinIndex(null);
      await new Promise((res) => setTimeout(res, 400));
    }

    setCurrentIndex(null);
    setSorting(false);
    setSorted(true);
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">Selection Sort Visualizer</h1>

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
          onClick={selectionSort}
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
              ${sortedIndex.has(index) ? "bg-green-400 text-white" : ""}
              ${index === compareIndex ? "bg-red-400 text-white" : ""}
              ${index === minIndex ? "bg-yellow-400 text-white" : ""}
              ${!sortedIndex.has(index) &&
              index !== currentIndex &&
              index !== compareIndex &&
              index !== minIndex
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
        <p><strong>Best Case:</strong> O(n²)</p>
        <p><strong>Average Case:</strong> O(n²)</p>
        <p><strong>Worst Case:</strong> O(n²)</p>
      </div>
    </div>
  );
};

export default SelectionSort;

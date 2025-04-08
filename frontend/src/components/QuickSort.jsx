import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const QuickSort = () => {
  const [array, setArray] = useState([]);
  const [tree, setTree] = useState(null);
  const [history, setHistory] = useState([]);
  const [stepIndex, setStepIndex] = useState(0);
  const [isSorting, setIsSorting] = useState(false);
  const [selectedNode, setSelectedNode] = useState(null);
  const [swapMode, setSwapMode] = useState(false);
  const [pivotHighlight, setPivotHighlight] = useState(null);

  // Generate initial array and tree
  useEffect(() => {
    resetArray();
  }, []);

  const resetArray = () => {
    const newArray = Array.from({ length: 8 }, () => Math.floor(Math.random() * 100) + 1);
    setArray(newArray);
    const initialTree = createNode(newArray);
    setTree(initialTree);
    setHistory([{ 
      tree: JSON.parse(JSON.stringify(initialTree)),
      description: "Initial array",
      array: [...newArray],
      pivot: null
    }]);
    setStepIndex(0);
    setSelectedNode(null);
    setIsSorting(false);
    setPivotHighlight(null);
  };

  // Tree node structure
  const createNode = (value, left = null, right = null, pivot = null) => {
    return {
      value: Array.isArray(value) ? [...value] : value,
      left,
      right,
      pivot,
      id: Math.random().toString(36).substr(2, 9) // Unique ID
    };
  };

  const startQuickSort = async () => {
    setIsSorting(true);
    let currentTree = JSON.parse(JSON.stringify(tree));
    let currentArray = [...array];
    const newHistory = [];

    const quickSort = async (node, depth = 0, side = "") => {
      if (node.value.length <= 1) return node;

      // Choose pivot (last element)
      const pivot = node.value[node.value.length - 1];
      node.pivot = pivot;
      
      // Record pivot selection
      newHistory.push({
        tree: JSON.parse(JSON.stringify(currentTree)),
        description: `Selected pivot: ${pivot}`,
        array: [...currentArray],
        pivot: pivot,
        depth,
        side
      });

      const left = [];
      const right = [];
      const equal = [];
      
      // Partition the array
      for (const num of node.value) {
        if (num < pivot) {
          left.push(num);
        } else if (num > pivot) {
          right.push(num);
        } else {
          equal.push(num);
        }
      }

      // Record partition
      newHistory.push({
        tree: JSON.parse(JSON.stringify(currentTree)),
        description: `Partitioned: [${left}] < ${pivot} < [${right}]`,
        array: [...currentArray],
        pivot: pivot,
        depth,
        side
      });

      // Create child nodes
      node.left = createNode(left);
      node.right = createNode(right);

      // Recursively sort left and right
      await quickSort(node.left, depth + 1, "left");
      await quickSort(node.right, depth + 1, "right");

      // Combine results
      node.value = [...left, ...equal, ...right];
      node.pivot = null; // Reset pivot after sorting

      // Record combination
      newHistory.push({
        tree: JSON.parse(JSON.stringify(currentTree)),
        description: `Combined: [${node.value}]`,
        array: [...currentArray],
        depth,
        side
      });

      return node;
    };

    await quickSort(currentTree);
    newHistory.push({
      tree: JSON.parse(JSON.stringify(currentTree)),
      description: "Sorting complete!",
      array: [...currentTree.value],
      sorted: true
    });

    setHistory([...history, ...newHistory]);
    setTree(currentTree);
    setArray([...currentTree.value]);
    setStepIndex(0);
    setIsSorting(false);
    setPivotHighlight(null);
  };

  const handleNodeClick = (node) => {
    if (!swapMode || isSorting) return;
    
    if (selectedNode && selectedNode.id === node.id) {
      setSelectedNode(null);
    } else if (selectedNode && node.value.length === selectedNode.value.length) {
      swapNodeValues(selectedNode, node);
      setSelectedNode(null);
      setSwapMode(false);
    } else {
      setSelectedNode(node);
    }
  };

  const swapNodeValues = (node1, node2) => {
    const newTree = JSON.parse(JSON.stringify(tree));
    
    const traverseAndSwap = (current) => {
      if (!current) return;
      
      if (current.id === node1.id) {
        current.value = [...node2.value];
      } else if (current.id === node2.id) {
        current.value = [...node1.value];
      }
      
      traverseAndSwap(current.left);
      traverseAndSwap(current.right);
    };
    
    traverseAndSwap(newTree);
    
    // Update array based on root node
    const updatedArray = [...newTree.value];
    
    setTree(newTree);
    setArray(updatedArray);
    
    setHistory(prev => [
      ...prev,
      {
        tree: JSON.parse(JSON.stringify(newTree)),
        description: `Manually swapped [${node1.value}] and [${node2.value}]`,
        array: [...updatedArray],
        manualSwap: true
      }
    ]);
  };

  const nextStep = () => {
    if (stepIndex < history.length - 1) {
      const nextStep = history[stepIndex + 1];
      setStepIndex(stepIndex + 1);
      setTree(JSON.parse(JSON.stringify(nextStep.tree)));
      setArray([...nextStep.array]);
      setPivotHighlight(nextStep.pivot || null);
    }
  };

  const prevStep = () => {
    if (stepIndex > 0) {
      const prevStep = history[stepIndex - 1];
      setStepIndex(stepIndex - 1);
      setTree(JSON.parse(JSON.stringify(prevStep.tree)));
      setArray([...prevStep.array]);
      setPivotHighlight(prevStep.pivot || null);
    }
  };

  // Render tree recursively with pivot highlighting
  const renderTree = (node, depth = 0) => {
    if (!node) return null;

    const isSelected = selectedNode && selectedNode.id === node.id;
    const isLeaf = !node.left && !node.right;
    const isPivot = pivotHighlight && node.value.includes(pivotHighlight);

    return (
      <div className={`flex flex-col items-center ${depth > 0 ? 'mt-4' : ''}`}>
        <motion.div
          className={`p-2 rounded-md cursor-pointer transition-all ${
            isSelected 
              ? "bg-purple-500 text-white scale-110 shadow-lg" 
              : isPivot
                ? "bg-yellow-500 text-white"
                : isLeaf
                  ? "bg-green-500 text-white" 
                  : "bg-blue-500 text-white"
          }`}
          onClick={() => handleNodeClick(node)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          [{node.value.join(", ")}]
          {node.pivot && <div className="text-xs mt-1">Pivot: {node.pivot}</div>}
        </motion.div>
        
        {(node.left || node.right) && (
          <div className="flex gap-8 mt-4">
            {node.left && (
              <div className="relative">
                <div className="h-6 w-px bg-gray-400 mx-auto"></div>
                {renderTree(node.left, depth + 1)}
              </div>
            )}
            {node.right && (
              <div className="relative">
                <div className="h-6 w-px bg-gray-400 mx-auto"></div>
                {renderTree(node.right, depth + 1)}
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 py-8 px-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Quick Sort Visualizer</h1>
      
      <div className="flex gap-4 mb-8 flex-wrap justify-center">
        <button
          onClick={resetArray}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
          disabled={isSorting}
        >
          New Array
        </button>
        <button
          onClick={startQuickSort}
          className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
          disabled={isSorting || array.length === 0}
        >
          {isSorting ? "Sorting..." : "Start Quick Sort"}
        </button>
       
      </div>

      <div className="mb-8 w-full max-w-3xl">
        <h2 className="text-xl font-semibold mb-4">Current Array:</h2>
        <div className="flex justify-center gap-2 flex-wrap">
          {array.map((num, index) => (
            <motion.div
              key={index}
              className={`w-12 h-12 flex items-center justify-center rounded-md text-lg font-semibold ${
                pivotHighlight === num ? "bg-yellow-500" : "bg-blue-500"
              } text-white`}
            >
              {num}
            </motion.div>
          ))}
        </div>
      </div>

      {tree && (
        <div className="w-full overflow-auto mb-8">
          <h2 className="text-xl font-semibold mb-4">Quick Sort Tree:</h2>
          <div className="bg-white p-6 rounded-lg shadow-md">
            {renderTree(tree)}
          </div>
        </div>
      )}

      {history.length > 0 && (
        <div className="w-full max-w-3xl bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">Current Step:</h2>
          <p className="mb-4">{history[stepIndex]?.description}</p>
          
          <div className="flex justify-between items-center">
            <span className="text-gray-600">
              Step {stepIndex + 1} of {history.length}
            </span>
            <div className="flex gap-2">
              <button
                onClick={prevStep}
                className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
                disabled={stepIndex === 0}
              >
                Previous
              </button>
              <button
                onClick={nextStep}
                className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
                disabled={stepIndex >= history.length - 1}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="mt-4 flex gap-4 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-blue-500 rounded"></div>
          <span>Partition</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-yellow-500 rounded"></div>
          <span>Pivot</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-green-500 rounded"></div>
          <span>Leaf Node</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-purple-500 rounded"></div>
          <span>Selected</span>
        </div>
      </div>
    </div>
  );
};

export default QuickSort;
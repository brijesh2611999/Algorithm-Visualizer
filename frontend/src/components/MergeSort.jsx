import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const MergeSort = () => {
  const [array, setArray] = useState([]);
  const [tree, setTree] = useState(null);
  const [history, setHistory] = useState([]);
  const [stepIndex, setStepIndex] = useState(0);
  const [isSorting, setIsSorting] = useState(false);
  const [selectedNode, setSelectedNode] = useState(null);
  const [swapMode, setSwapMode] = useState(false);

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
      array: [...newArray]
    }]);
    setStepIndex(0);
    setSelectedNode(null);
    setIsSorting(false);
  };

  // Tree node structure
  const createNode = (value, left = null, right = null) => {
    return {
      value: Array.isArray(value) ? [...value] : value,
      left,
      right,
      id: Math.random().toString(36).substr(2, 9) // Unique ID for each node
    };
  };

  const startMergeSort = async () => {
    setIsSorting(true);
    let currentTree = JSON.parse(JSON.stringify(tree));
    let currentArray = [...array];
    const newHistory = [];

    const mergeSort = async (node, depth = 0, side = "") => {
      if (node.value.length <= 1) return node;

      const mid = Math.floor(node.value.length / 2);
      const leftArr = node.value.slice(0, mid);
      const rightArr = node.value.slice(mid);

      // Create child nodes
      node.left = createNode(leftArr);
      node.right = createNode(rightArr);

      // Record split
      newHistory.push({
        tree: JSON.parse(JSON.stringify(currentTree)),
        description: `Split node [${node.value}] into left: [${leftArr}] and right: [${rightArr}]`,
        array: [...currentArray],
        depth,
        side
      });
      setHistory([...history, ...newHistory]);
      
      // Recursively sort left and right
      await mergeSort(node.left, depth + 1, "left");
      await mergeSort(node.right, depth + 1, "right");

      // Merge the sorted halves
      let merged = [];
      let i = 0, j = 0;
      const leftValues = node.left.value;
      const rightValues = node.right.value;

      while (i < leftValues.length && j < rightValues.length) {
        // Show comparison
        newHistory.push({
          tree: JSON.parse(JSON.stringify(currentTree)),
          description: `Comparing ${leftValues[i]} and ${rightValues[j]}`,
          comparing: [leftValues[i], rightValues[j]],
          array: [...currentArray],
          depth,
          side
        });

        if (leftValues[i] < rightValues[j]) {
          merged.push(leftValues[i++]);
        } else {
          merged.push(rightValues[j++]);
        }
      }

      merged = [...merged, ...leftValues.slice(i), ...rightValues.slice(j)];
      node.value = merged;

      // Record merge
      newHistory.push({
        tree: JSON.parse(JSON.stringify(currentTree)),
        description: `Merged [${leftValues}] and [${rightValues}] → [${merged}]`,
        array: [...currentArray],
        depth,
        side
      });

      return node;
    };

    await mergeSort(currentTree);
    newHistory.push({
      tree: JSON.parse(JSON.stringify(currentTree)),
      description: "Sorting complete!",
      array: [...currentArray],
      sorted: true
    });

    setHistory([...history, ...newHistory]);
    setTree(currentTree);
    setStepIndex(0);
    setIsSorting(false);
  };

  const handleNodeClick = (node) => {
    if (!swapMode || isSorting) return;
    
    if (selectedNode && selectedNode.id === node.id) {
      setSelectedNode(null); // Deselect if same node clicked
    } else if (selectedNode && node.value.length === selectedNode.value.length) {
      // Perform swap
      swapNodeValues(selectedNode, node);
      setSelectedNode(null);
      setSwapMode(false);
    } else {
      setSelectedNode(node); // Select new node
    }
  };

  const swapNodeValues = (node1, node2) => {
    const newTree = JSON.parse(JSON.stringify(tree));
    
    // Find nodes in the tree by ID and swap their values
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
    
    // Record the manual swap in history
    setHistory(prev => [
      ...prev,
      {
        tree: JSON.parse(JSON.stringify(newTree)),
        description: `Manually swapped node values [${node1.value}] and [${node2.value}]`,
        array: [...updatedArray],
        manualSwap: true
      }
    ]);
  };

  const nextStep = () => {
    if (stepIndex < history.length - 1) {
      setStepIndex(stepIndex + 1);
      setTree(JSON.parse(JSON.stringify(history[stepIndex + 1].tree)));
      setArray([...history[stepIndex + 1].array]);
    }
  };

  const prevStep = () => {
    if (stepIndex > 0) {
      setStepIndex(stepIndex - 1);
      setTree(JSON.parse(JSON.stringify(history[stepIndex - 1].tree)));
      setArray([...history[stepIndex - 1].array]);
    }
  };

  // Render tree recursively
  const renderTree = (node, depth = 0) => {
    if (!node) return null;

    const isSelected = selectedNode && selectedNode.id === node.id;
    const isLeaf = !node.left && !node.right;

    return (
      <div className={`flex flex-col items-center ${depth > 0 ? 'mt-4' : ''}`}>
        <motion.div
          className={`p-2 rounded-md cursor-pointer transition-all ${
            isSelected 
              ? "bg-purple-500 text-white scale-110 shadow-lg" 
              : isLeaf 
                ? "bg-green-500 text-white" 
                : "bg-blue-500 text-white"
          }`}
          onClick={() => handleNodeClick(node)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          [{node.value.join(", ")}]
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
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Tree Merge Sort Visualizer</h1>
      
      <div className="flex gap-4 mb-8 flex-wrap justify-center">
        <button
          onClick={resetArray}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
          disabled={isSorting}
        >
          New Array
        </button>
        <button
          onClick={startMergeSort}
          className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
          disabled={isSorting || array.length === 0}
        >
          {isSorting ? "Sorting..." : "Start Merge Sort"}
        </button>
      </div>

      <div className="mb-8 w-full max-w-3xl">
        <h2 className="text-xl font-semibold mb-4">Current Array:</h2>
        <div className="flex justify-center gap-2 flex-wrap">
          {array.map((num, index) => (
            <motion.div
              key={index}
              className="w-12 h-12 flex items-center justify-center bg-blue-500 text-white rounded-md text-lg font-semibold"
            >
              {num}
            </motion.div>
          ))}
        </div>
      </div>

      {tree && (
        <div className="w-full overflow-auto mb-8">
          <h2 className="text-xl font-semibold mb-4">Merge Sort Tree:</h2>
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
    </div>
  );
};

export default MergeSort;
import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';

const BFS = () => {
  const [grid, setGrid] = useState([]);
  const [start, setStart] = useState({ row: 5, col: 5 });
  const [end, setEnd] = useState({ row: 10, col: 15 });
  const [visited, setVisited] = useState([]);
  const [path, setPath] = useState([]);
  const [isRunning, setIsRunning] = useState(false);
  const [isMovingStart, setIsMovingStart] = useState(false);
  const [isMovingEnd, setIsMovingEnd] = useState(false);
  const [speed, setSpeed] = useState(50);

  // Grid dimensions
  const rows = 15;
  const cols = 25;

  // Initialize grid
  const initializeGrid = useCallback(() => {
    const newGrid = [];
    for (let row = 0; row < rows; row++) {
      const currentRow = [];
      for (let col = 0; col < cols; col++) {
        currentRow.push({
          row,
          col,
          isWall: false,
          isVisited: false,
          isPath: false,
          distance: Infinity,
          previousNode: null,
        });
      }
      newGrid.push(currentRow);
    }
    setGrid(newGrid);
    setVisited([]);
    setPath([]);
  }, [rows, cols]);

  useEffect(() => {
    initializeGrid();
  }, [initializeGrid]);

  // BFS algorithm
  const bfs = useCallback(async () => {
    setIsRunning(true);
    setVisited([]);
    setPath([]);

    // Reset grid
    const newGrid = grid.map(row =>
      row.map(node => ({
        ...node,
        isVisited: false,
        isPath: false,
        distance: Infinity,
        previousNode: null,
      }))
    );

    // Initialize queue with start node
    const queue = [];
    const startNode = newGrid[start.row][start.col];
    startNode.distance = 0;
    queue.push(startNode);

    const visitedNodes = [];
    let found = false;

    // Directions: up, right, down, left
    const directions = [
      [-1, 0], [0, 1], [1, 0], [0, -1]
    ];

    while (queue.length > 0 && !found) {
      const currentNode = queue.shift();
      
      // Skip if already visited or wall
      if (currentNode.isVisited || currentNode.isWall) continue;

      // Mark as visited
      currentNode.isVisited = true;
      visitedNodes.push(currentNode);

      // Visualize visited node
      setVisited(prev => [...prev, currentNode]);
      await new Promise(resolve => setTimeout(resolve, speed));

      // Check if we reached the end
      if (currentNode.row === end.row && currentNode.col === end.col) {
        found = true;
        break;
      }

      // Explore neighbors
      for (const [dr, dc] of directions) {
        const newRow = currentNode.row + dr;
        const newCol = currentNode.col + dc;

        if (newRow >= 0 && newRow < rows && newCol >= 0 && newCol < cols) {
          const neighbor = newGrid[newRow][newCol];
          
          if (!neighbor.isVisited && !neighbor.isWall) {
            neighbor.distance = currentNode.distance + 1;
            neighbor.previousNode = currentNode;
            queue.push(neighbor);
          }
        }
      }
    }

    // Reconstruct path if found
    if (found) {
      const endNode = newGrid[end.row][end.col];
      const shortestPath = [];
      let currentNode = endNode;

      while (currentNode !== null) {
        shortestPath.unshift(currentNode);
        currentNode = currentNode.previousNode;
      }

      // Animate path
      for (let i = 0; i < shortestPath.length; i++) {
        setPath(prev => [...prev, shortestPath[i]]);
        await new Promise(resolve => setTimeout(resolve, speed));
      }
    }

    setIsRunning(false);
    return found;
  }, [grid, start, end, speed, rows, cols]);

  // Handle cell clicks
  const handleCellClick = (row, col) => {
    if (isRunning) return;

    // Check if clicking start node
    if (row === start.row && col === start.col) {
      setIsMovingStart(true);
      return;
    }

    // Check if clicking end node
    if (row === end.row && col === end.col) {
      setIsMovingEnd(true);
      return;
    }

    // Toggle wall
    const newGrid = [...grid];
    newGrid[row][col].isWall = !newGrid[row][col].isWall;
    setGrid(newGrid);
  };

  // Handle mouse enter for wall drawing
  const handleMouseEnter = (row, col) => {
    if (!isRunning && (isMovingStart || isMovingEnd)) {
      if (isMovingStart) {
        setStart({ row, col });
      } else if (isMovingEnd) {
        setEnd({ row, col });
      }
    } else if (!isRunning && !grid[row][col].isStart && !grid[row][col].isEnd) {
      const newGrid = [...grid];
      newGrid[row][col].isWall = true;
      setGrid(newGrid);
    }
  };

  // Handle mouse up to stop moving start/end
  const handleMouseUp = () => {
    setIsMovingStart(false);
    setIsMovingEnd(false);
  };

  // Clear board
  const clearBoard = () => {
    if (isRunning) return;
    initializeGrid();
  };

  // Clear path only
  const clearPath = () => {
    if (isRunning) return;
    setVisited([]);
    setPath([]);
    const newGrid = grid.map(row =>
      row.map(node => ({
        ...node,
        isVisited: false,
        isPath: false,
        distance: Infinity,
        previousNode: null,
      }))
    );
    setGrid(newGrid);
  };

  // Get cell class based on state
  const getCellClass = (row, col) => {
    const node = grid[row][col];
    let classes = 'w-6 h-6 border border-gray-200 ';

    if (node.isWall) return classes + 'bg-gray-900';
    if (row === start.row && col === start.col) return classes + 'bg-green-500';
    if (row === end.row && col === end.col) return classes + 'bg-red-500';
    if (path.some(n => n.row === row && n.col === col)) return classes + 'bg-yellow-400';
    if (visited.some(n => n.row === row && n.col === col)) return classes + 'bg-blue-400';
    return classes + 'bg-white hover:bg-gray-100';
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 py-8 px-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">BFS Pathfinding Visualizer</h1>
      
      <div className="flex gap-4 mb-8 flex-wrap justify-center">
        <button
          onClick={bfs}
          className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
          disabled={isRunning}
        >
          {isRunning ? 'Running...' : 'Visualize BFS'}
        </button>
        <button
          onClick={clearPath}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
          disabled={isRunning}
        >
          Clear Path
        </button>
        <button
          onClick={clearBoard}
          className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
          disabled={isRunning}
        >
          Clear Board
        </button>
        <div className="flex items-center gap-2">
          <span>Speed:</span>
          <select
            value={speed}
            onChange={(e) => setSpeed(Number(e.target.value))}
            className="px-2 py-1 border rounded"
            disabled={isRunning}
          >
            <option value={10}>Fast</option>
            <option value={50}>Medium</option>
            <option value={100}>Slow</option>
          </select>
        </div>
      </div>

      <div 
        className="grid gap-0 border-2 border-gray-800 bg-white"
        style={{
          gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
          width: 'fit-content'
        }}
        onMouseLeave={handleMouseUp}
        onMouseUp={handleMouseUp}
      >
        {grid.map((row, rowIdx) =>
          row.map((node, colIdx) => (
            <motion.div
              key={`${rowIdx}-${colIdx}`}
              className={getCellClass(rowIdx, colIdx)}
              onClick={() => handleCellClick(rowIdx, colIdx)}
              onMouseEnter={() => handleMouseEnter(rowIdx, colIdx)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            />
          ))
        )}
      </div>

      <div className="mt-8 flex gap-6 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-green-500 rounded"></div>
          <span>Start Node</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-red-500 rounded"></div>
          <span>End Node</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-gray-900 rounded"></div>
          <span>Wall</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-blue-400 rounded"></div>
          <span>Visited</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-yellow-400 rounded"></div>
          <span>Path</span>
        </div>
      </div>

      <div className="mt-8 text-gray-600 max-w-2xl text-center">
        <h2 className="text-xl font-semibold mb-2">How BFS Works:</h2>
        <p className="mb-2">
          Breadth-First Search explores all nodes at the present depth level before moving on to nodes at the next depth level.
        </p>
        <p>
          Click and drag to place walls, move the start/end nodes, and visualize the algorithm step-by-step.
        </p>
      </div>
    </div>
  );
};

export default BFS;
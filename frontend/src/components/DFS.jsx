import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';

const DFS = () => {
  // Grid dimensions
  const rows = 15;
  const cols = 25;

  // State
  const [grid, setGrid] = useState([]);
  const [start, setStart] = useState({ row: 5, col: 5 });
  const [end, setEnd] = useState({ row: 10, col: 15 });
  const [visited, setVisited] = useState([]);
  const [path, setPath] = useState([]);
  const [isRunning, setIsRunning] = useState(false);
  const [isMovingStart, setIsMovingStart] = useState(false);
  const [isMovingEnd, setIsMovingEnd] = useState(false);
  const [speed, setSpeed] = useState(0); // 0 = fastest
  const [isRecursive, setIsRecursive] = useState(true);

  // Initialize grid
  const initializeGrid = useCallback(() => {
    const newGrid = Array(rows).fill().map((_, row) => 
      Array(cols).fill().map((_, col) => ({
        row,
        col,
        isWall: false,
        isVisited: false,
        isPath: false,
        previousNode: null
      }))
    );
    setGrid(newGrid);
    setVisited([]);
    setPath([]);
  }, [rows, cols]);

  useEffect(() => initializeGrid(), [initializeGrid]);

  // Optimized DFS Recursive
  const dfsRecursive = useCallback(async () => {
    setIsRunning(true);
    setVisited([]);
    setPath([]);
    
    const gridCopy = JSON.parse(JSON.stringify(grid));
    let found = false;
    const visitedNodes = [];
    const pathNodes = [];

    const dfs = async (node) => {
      if (found || node.isVisited || node.isWall) return false;

      node.isVisited = true;
      visitedNodes.push(node);
      
      // Batch update for performance
      if (visitedNodes.length % 20 === 0 || node.row === end.row && node.col === end.col) {
        setVisited(prev => [...prev, ...visitedNodes.slice(prev.length)]);
        if (speed > 0) await new Promise(resolve => setTimeout(resolve, speed));
      }

      if (node.row === end.row && node.col === end.col) {
        found = true;
        pathNodes.push(node);
        return true;
      }

      const directions = [[-1,0],[0,1],[1,0],[0,-1]];
      for (const [dr, dc] of directions) {
        const newRow = node.row + dr;
        const newCol = node.col + dc;
        
        if (newRow >= 0 && newRow < rows && newCol >= 0 && newCol < cols) {
          const neighbor = gridCopy[newRow][newCol];
          neighbor.previousNode = node;
          if (await dfs(neighbor)) {
            pathNodes.push(node);
            return true;
          }
        }
      }
      return false;
    };

    await dfs(gridCopy[start.row][start.col]);
    setVisited(prev => [...prev, ...visitedNodes.slice(prev.length)]);

    // Visualize path
    if (found) {
      const finalPath = pathNodes.reverse();
      for (let i = 0; i < finalPath.length; i += 5) {
        setPath(prev => [...prev, ...finalPath.slice(i, i+5)]);
        if (speed > 0) await new Promise(resolve => setTimeout(resolve, speed));
      }
    }

    setIsRunning(false);
  }, [grid, start, end, speed, rows, cols]);

 
  // Grid interaction handlers
  const handleCellClick = (row, col) => {
    if (isRunning) return;
    if (row === start.row && col === start.col) {
      setIsMovingStart(true);
      return;
    }
    if (row === end.row && col === end.col) {
      setIsMovingEnd(true);
      return;
    }
    const newGrid = [...grid];
    newGrid[row][col].isWall = !newGrid[row][col].isWall;
    setGrid(newGrid);
  };

  const handleMouseEnter = (row, col) => {
    if (!isRunning && (isMovingStart || isMovingEnd)) {
      if (isMovingStart) setStart({ row, col });
      else if (isMovingEnd) setEnd({ row, col });
    } else if (!isRunning) {
      const newGrid = [...grid];
      newGrid[row][col].isWall = true;
      setGrid(newGrid);
    }
  };

  const handleMouseUp = () => {
    setIsMovingStart(false);
    setIsMovingEnd(false);
  };

  const clearBoard = () => {
    if (isRunning) return;
    initializeGrid();
  };

  const clearPath = () => {
    if (isRunning) return;
    setVisited([]);
    setPath([]);
    const newGrid = grid.map(row => 
      row.map(node => ({ 
        ...node, 
        isVisited: false, 
        isPath: false,
        previousNode: null 
      }))
    );
    setGrid(newGrid);
  };

  // Cell styling
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
      <h1 className="text-3xl font-bold text-gray-800 mb-6">DFS Pathfinding Visualizer</h1>
      
      <div className="flex gap-4 mb-8 flex-wrap justify-center">
        <button
          onClick={dfsRecursive}
          className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
          disabled={isRunning}
        >
          {isRunning ? 'Running...' : 'Visualize DFS'}
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
            <option value={0}>Ultra Fast</option>
            <option value={5}>Fast</option>
            <option value={25}>Medium</option>
            <option value={75}>Slow</option>
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
          <div className="w-4 h-4 bg-green-500 rounded" />
          <span>Start Node</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-red-500 rounded" />
          <span>End Node</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-gray-900 rounded" />
          <span>Wall</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-blue-400 rounded" />
          <span>Visited</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-yellow-400 rounded" />
          <span>Path</span>
        </div>
      </div>

      <div className="mt-8 text-gray-600 max-w-2xl text-center">
        <h2 className="text-xl font-semibold mb-2">How DFS Works:</h2>
        <p className="mb-2">
            Depth-First Search (DFS) explores a path as deep as possible before backtracking, making it ideal for maze-like pathfinding.
        </p>
        <p>
        Click and drag to place walls, move the start/end nodes, and visualize the algorithm step-by-step.
        </p>

      </div>
    </div>
  );
};

export default DFS;
import { useState, useCallback } from "react";

const numRows = 15;
const numCols = 25;

const createGrid = () => {
  return Array.from({ length: numRows }, (_, row) =>
    Array.from({ length: numCols }, (_, col) => ({
      row,
      col,
      isVisited: false,
      distance: Infinity,
      previousNode: null,
      isPath: false,
      isWall: false,
    }))
  );
};

class MinHeap {
  constructor() {
    this.heap = [];
  }

  insert(node) {
    this.heap.push(node);
    this.bubbleUp(this.heap.length - 1);
  }

  extractMin() {
    if (this.heap.length === 0) return null;
    const min = this.heap[0];
    const end = this.heap.pop();
    if (this.heap.length > 0) {
      this.heap[0] = end;
      this.sinkDown(0);
    }
    return min;
  }

  bubbleUp(index) {
    const node = this.heap[index];
    while (index > 0) {
      const parentIndex = Math.floor((index - 1) / 2);
      const parent = this.heap[parentIndex];
      if (node.distance >= parent.distance) break;
      this.heap[parentIndex] = node;
      this.heap[index] = parent;
      index = parentIndex;
    }
  }

  sinkDown(index) {
    const length = this.heap.length;
    const node = this.heap[index];
    while (true) {
      let leftIdx = 2 * index + 1;
      let rightIdx = 2 * index + 2;
      let smallest = index;

      if (
        leftIdx < length &&
        this.heap[leftIdx].distance < this.heap[smallest].distance
      ) {
        smallest = leftIdx;
      }

      if (
        rightIdx < length &&
        this.heap[rightIdx].distance < this.heap[smallest].distance
      ) {
        smallest = rightIdx;
      }

      if (smallest === index) break;

      [this.heap[index], this.heap[smallest]] = [
        this.heap[smallest],
        this.heap[index],
      ];
      index = smallest;
    }
  }

  isEmpty() {
    return this.heap.length === 0;
  }
}

const Dijkstra = () => {
  const [grid, setGrid] = useState(createGrid());
  const [start] = useState({ row: 7, col: 5 });
  const [end] = useState({ row: 7, col: 19 });
  const [isAnimating, setIsAnimating] = useState(false);
  const [mouseIsPressed, setMouseIsPressed] = useState(false);

  const getUnvisitedNeighbors = useCallback((node, grid) => {
    const { row, col } = node;
    const neighbors = [];

    if (row > 0) neighbors.push(grid[row - 1][col]);
    if (row < numRows - 1) neighbors.push(grid[row + 1][col]);
    if (col > 0) neighbors.push(grid[row][col - 1]);
    if (col < numCols - 1) neighbors.push(grid[row][col + 1]);

    return neighbors.filter((n) => !n.isVisited && !n.isWall);
  }, []);

  const dijkstra = useCallback((grid, start, end) => {
    const visitedNodes = [];
    const startNode = grid[start.row][start.col];
    startNode.distance = 0;

    const heap = new MinHeap();
    heap.insert(startNode);

    while (!heap.isEmpty()) {
      const current = heap.extractMin();
      if (current.isVisited || current.isWall) continue;

      current.isVisited = true;
      visitedNodes.push(current);

      if (current.row === end.row && current.col === end.col) {
        break;
      }

      const neighbors = getUnvisitedNeighbors(current, grid);
      for (let neighbor of neighbors) {
        const newDist = current.distance + 1;
        if (newDist < neighbor.distance) {
          neighbor.distance = newDist;
          neighbor.previousNode = current;
          heap.insert(neighbor);
        }
      }
    }

    return visitedNodes;
  }, [getUnvisitedNeighbors]);

  const getShortestPath = useCallback((endNode) => {
    const path = [];
    let current = endNode;
    while (current !== null) {
      path.unshift(current);
      current = current.previousNode;
    }
    return path;
  }, []);

  const handleMouseDown = (row, col) => {
    if (isAnimating) return;
    if ((row === start.row && col === start.col) || (row === end.row && col === end.col)) return;
    
    const newGrid = [...grid];
    newGrid[row][col].isWall = !newGrid[row][col].isWall;
    setGrid(newGrid);
    setMouseIsPressed(true);
  };

  const handleMouseEnter = (row, col) => {
    if (!mouseIsPressed || isAnimating) return;
    if ((row === start.row && col === start.col) || (row === end.row && col === end.col)) return;
    
    const newGrid = [...grid];
    newGrid[row][col].isWall = !newGrid[row][col].isWall;
    setGrid(newGrid);
  };

  const handleMouseUp = () => {
    setMouseIsPressed(false);
  };

  const visualizeDijkstra = useCallback(() => {
    const freshGrid = createGrid();

    // Copy wall states
    for (let row = 0; row < numRows; row++) {
      for (let col = 0; col < numCols; col++) {
        freshGrid[row][col].isWall = grid[row][col].isWall;
      }
    }

    const visitedNodes = dijkstra(freshGrid, start, end);
    const endNode = freshGrid[end.row][end.col];
    const shortestPath = endNode.isVisited ? getShortestPath(endNode) : [];

    setIsAnimating(true);
    setGrid(freshGrid);

    for (let i = 0; i <= visitedNodes.length; i++) {
      if (i === visitedNodes.length) {
        setTimeout(() => {
          const pathGrid = JSON.parse(JSON.stringify(freshGrid));
          for (let node of visitedNodes) {
            pathGrid[node.row][node.col].isVisited = true;
          }

          for (let j = 0; j <= shortestPath.length; j++) {
            setTimeout(() => {
              if (j < shortestPath.length) {
                const node = shortestPath[j];
                pathGrid[node.row][node.col].isPath = true;
                setGrid([...pathGrid]);
              }

              if (j === shortestPath.length) {
                setIsAnimating(false);
              }
            }, 50 * j);
          }
        }, 40 * i);
        continue;
      }

      setTimeout(() => {
        const node = visitedNodes[i];
        const newGrid = [...freshGrid];
        newGrid[node.row][node.col].isVisited = true;
        setGrid(newGrid);
      }, 40 * i);
    }
  }, [dijkstra, end, getShortestPath, grid, start]);

  const clearBoard = () => {
    if (isAnimating) return;
    setGrid(createGrid());
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-6 text-blue-800">Dijkstra's Pathfinding Visualizer</h1>
      
      <div className="flex gap-4 mb-6">
        <button
          onClick={visualizeDijkstra}
          className="px-6 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition disabled:opacity-50"
          disabled={isAnimating}
        >
          Visualize Dijkstra's
        </button>
        <button
          onClick={clearBoard}
          className="px-6 py-2 bg-red-600 text-white rounded-lg shadow hover:bg-red-700 transition disabled:opacity-50"
          disabled={isAnimating}
        >
          Clear Board
        </button>
      </div>

      <div className="bg-white p-2 rounded-lg shadow-xl">
        <div 
          className="grid gap-0 border-2 border-gray-800"
          style={{
            gridTemplateColumns: `repeat(${numCols}, minmax(0, 1fr))`,
            width: `${numCols * 25}px`
          }}
        >
          {grid.map((row, rowIdx) =>
            row.map((node, nodeIdx) => {
              let cellClass = "w-6 h-6 border border-gray-200 ";
              
              if (node.isWall) cellClass += "bg-gray-900";
              else if (node.row === start.row && node.col === start.col) cellClass += "bg-green-500";
              else if (node.row === end.row && node.col === end.col) cellClass += "bg-red-500";
              else if (node.isPath) cellClass += "bg-yellow-400";
              else if (node.isVisited) cellClass += "bg-blue-400 transition duration-900 ease-in";
              else cellClass += "bg-white hover:bg-gray-100";

              return (
                <div
                  key={`${rowIdx}-${nodeIdx}`}
                  className={cellClass}
                  onMouseDown={() => handleMouseDown(node.row, node.col)}
                  onMouseEnter={() => handleMouseEnter(node.row, node.col)}
                  onMouseUp={handleMouseUp}
                />
              );
            })
          )}
        </div>
      </div>

      <div className="mt-6 flex gap-8 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-green-500"></div>
          <span>Start Node</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-red-500"></div>
          <span>End Node</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-gray-900"></div>
          <span>Wall Node</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-blue-400"></div>
          <span>Visited Nodes</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-yellow-400"></div>
          <span>Shortest Path</span>
        </div>
      </div>
    </div>
  );
};

export default Dijkstra;
















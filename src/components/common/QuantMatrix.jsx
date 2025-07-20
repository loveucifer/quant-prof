import React, { useState, useEffect, useMemo } from 'react';

const characters = ['α', 'β', 'Σ', 'Δ', 'π', 'Ω', 'μ', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

const QuantMatrix = () => {
  const [grid, setGrid] = useState([]);

  const generateGrid = () => {
    const newGrid = [];
    for (let i = 0; i < 400; i++) { // Generate 400 items for the grid
      newGrid.push({
        char: characters[Math.floor(Math.random() * characters.length)],
        key: i,
        opacity: Math.random() * 0.7,
        isAccent: Math.random() > 0.98 // Only a small percentage will be green
      });
    }
    setGrid(newGrid);
  };

  useEffect(() => {
    generateGrid();
    const interval = setInterval(generateGrid, 3000); // Regenerate grid every 3 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      <div className="grid grid-cols-20 grid-rows-20 gap-x-2 gap-y-1">
        {grid.map(item => (
          <span
            key={item.key}
            className={`font-mono text-lg transition-opacity duration-1000 ease-in-out ${item.isAccent ? 'text-accent' : 'text-gray-700'}`}
            style={{ opacity: item.opacity }}
          >
            {item.char}
          </span>
        ))}
      </div>
    </div>
  );
};

// Add a grid-cols-20 utility to your Tailwind config if it doesn't exist
// Or use inline styles for grid-template-columns. For simplicity here, we assume a utility or setup.

export default QuantMatrix;
'use client';

import { Ellipsis } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function ColorPalettePage() {
  const [name, setName] = useState('Random name');
  const [types, setTypes] = useState<string[]>(['randomPallet']);
  const [colors, setColors] = useState<
    { red: number; green: number; blue: number; index: number }[]
  >([]);

  useEffect(() => {
    const handleRandomizeColors = () => {
      setColors(
        Array.from({ length: 5 }, (_, index) => ({
          red: Math.floor(Math.random() * 256),
          green: Math.floor(Math.random() * 256),
          blue: Math.floor(Math.random() * 256),
          index
        }))
      );
    };
    handleRandomizeColors();
  }, []);

  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const handleColorChange = (index: number) => {
    setColors(prevColors => 
      prevColors.map(color => 
        color.index > index 
          ? { ...color, index: Math.abs(color.index) === color.index ? -color.index : color.index }
          : color
      )
    );
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-6">Create Color Palette</h1>
      <div className="flex flex-col gap-4 max-w-md w-full">
        <div className="flex items-center justify-between px-6">
          <div className="text-lg font-medium">{name}</div>
          <Ellipsis className="cursor-pointer hover:text-gray-600" />
        </div>
        <div className="relative h-40 w-full">
          {colors.map((color, idx) => {
            const containerWidth = 100; // percentage
            const cardWidth = (containerWidth / colors.length);
            const overlapAmount = Math.min(cardWidth * 0.3, 15); // 30% overlap or max 15%
            
            let leftOffset = idx * (cardWidth - overlapAmount);
            let zIndex = colors.length - idx; //decides overlap direction
            let transform = 'scale(1)';
            let width = cardWidth;
            
            if (hoveredIndex !== null) {
              if (idx === hoveredIndex) {
                // Hovered card: pop forward and up
                zIndex = 50;
                transform = 'scale(1.1) translateY(-8px)';
              } else if (idx < hoveredIndex) {
                // Cards to the left: spread leftward and stack properly
                const extraSpread = (hoveredIndex - idx) * 1.5; // Extra spreading
                leftOffset = idx * (cardWidth - overlapAmount) ;
                zIndex = idx + 1; // Left cards stack with increasing z-index
              } else {
                // Cards to the right: maintain normal position
                zIndex = colors.length - idx;
              }
            }
            
            return (
              <div
                key={color.index}
                style={{
                  backgroundColor: `rgb(${color.red}, ${color.green}, ${color.blue})`,
                  left: `${leftOffset}%`,
                  width: `${width}%`,
                  zIndex: zIndex,
                  transform: transform,
                }}
                className="absolute h-full rounded-3xl cursor-pointer transition-all duration-300 shadow-lg"
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
                onClick={() => handleColorChange(color.index)}
              >
                <div className="absolute inset-0 flex items-end justify-center pb-4">
                  {/* <span 
                    className="text-white text-xs bg-black bg-opacity-50 px-2 py-1 rounded transition-opacity"
                    style={{ opacity: hoveredIndex === idx ? 1 : 0 }}
                  >
                    rgb({color.red}, {color.green}, {color.blue})
                  </span> */}
                </div>
              </div>
            );
          })}
        </div>
        <div className="flex gap-2">
          <button 
            onClick={() => {
              const newLength = Math.max(2, colors.length - 1);
              setColors(
                Array.from({ length: newLength }, (_, index) => ({
                  red: Math.floor(Math.random() * 256),
                  green: Math.floor(Math.random() * 256),
                  blue: Math.floor(Math.random() * 256),
                  index
                }))
              );
            }}
            className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-lg transition-colors text-sm"
          >
            Remove Color
          </button>
          <button 
            onClick={() => {
              setColors(
                Array.from({ length: 5 }, (_, index) => ({
                  red: Math.floor(Math.random() * 256),
                  green: Math.floor(Math.random() * 256),
                  blue: Math.floor(Math.random() * 256),
                  index
                }))
              );
            }}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
          >
            Generate New Palette
          </button>
          <button 
            onClick={() => {
              const newLength = Math.min(10, colors.length + 1);
              setColors(
                Array.from({ length: newLength }, (_, index) => ({
                  red: Math.floor(Math.random() * 256),
                  green: Math.floor(Math.random() * 256),
                  blue: Math.floor(Math.random() * 256),
                  index
                }))
              );
            }}
            className="bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded-lg transition-colors text-sm"
          >
            Add Color
          </button>
        </div>
      </div>
    </div>
  );
}
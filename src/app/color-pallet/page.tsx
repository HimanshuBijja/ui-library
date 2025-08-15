'use client';

import { Ellipsis } from 'lucide-react';
import { div } from 'motion/react-client';
import { use, useEffect, useState } from 'react';

export default function ColorPalletPage() {
  const [name, setName] = useState('Random name');
  const [types, setTypes] = useState<string[]>(['randomPallet']);
  const [colors, setColors] = useState<
    { red: number; green: number; blue: number; index: number }[]
  >([{ red: 0, green: 0, blue: 0, index: 0 }]);

  useEffect(() => {
    const handleRandomizeColors = () => {
      setColors(
        Array.from({ length: 5 }, (_, index) => ({
          red: Math.floor(Math.random() * 256),
          green: Math.floor(Math.random() * 256),
          blue: Math.floor(Math.random() * 256),
          index
        })), 
        );
    };
    handleRandomizeColors();
  }, []);

  const [selectedColor, setSelectedColor] = useState<number | null>(null);
  // useEffect(() => {
  function handleColorChange(index: number) {
    // setSelectedColor(index);
    for(let i=0; i< colors.length; i++) {
      if (i > index) {
        // Do something with the selected color
        colors[i].index = -(colors[i].index);
      }
    }
  }
// }, [colors]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Create Color Palette</h1>
      <div className="flex flex-col gap-2 max-w-sm w-full ">
        <div className="flex items-center  justify-between px-6">
          <div className="text-lg ">{name}</div>
          <Ellipsis />
        </div>
        <div className="flex flex-row -space-x-18 h-50">
          {colors.map((color) => (
            <div
              // onClick={() => handleColorChange(color.index)} 
              key={color.index}
              style={{
                backgroundColor: `rgb(${color.red}, ${color.green}, ${color.blue})`,
                // zIndex: color.index
              }}
              className={`rounded-4xl mb-2 w-full h-full hover:scale-105 hover: transition-transform duration-200 hover:${handleColorChange(color.index)}`}
            >
                <div>
                    
                </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

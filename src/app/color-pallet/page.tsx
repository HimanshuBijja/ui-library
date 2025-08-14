'use client';

import { Ellipsis } from 'lucide-react';
import { div } from 'motion/react-client';
import { useEffect, useState } from 'react';

export default function ColorPalletPage() {
  const [name, setName] = useState('Random name');
  const [types, setTypes] = useState<string[]>(['randomPallet']);
  const [colors, setColors] = useState<
    { red: number; green: number; blue: number }[]
  >([{ red: 0, green: 0, blue: 0 }]);

  useEffect(() => {
    const handleRandomizeColors = () => {
      setColors(
        Array.from({ length: 5 }, () => ({
          red: Math.floor(Math.random() * 256),
          green: Math.floor(Math.random() * 256),
          blue: Math.floor(Math.random() * 256),
        })),
      );
    };
    handleRandomizeColors();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Create Color Palette</h1>
      <div className="flex flex-col  max-w-sm w-full ">
        <div className="flex items-center gap-2 justify-between px-6">
          <div className="text-lg ">{name}</div>
          <Ellipsis />
        </div>
        <div className="flex flex-row -space-x-18 h-50">
          {colors.map((color, index) => (
            <div
              key={index}
              style={{
                backgroundColor: `rgb(${color.red}, ${color.green}, ${color.blue})`,
              }}
              className="rounded-4xl mb-2 w-full h-full"
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

"use client";

import { useEffect, useState } from "react";
import namer from "color-namer";

export default function Test1() {
    const [colors, setColors] = useState<string[]>([]);

    const [Clicked, setClicked] = useState(false);
    useEffect(() => {
        function randomRgb(): string {
            const red = Math.floor(Math.random() * 255);
            const green = Math.floor(Math.random() * 255);
            const blue = Math.floor(Math.random() * 255);
            return `rgb(${red},${green},${blue})`;
        }
        const generatedColors: string[] = [];
        for (let i = 0; i < 5; i++) {
            generatedColors.push(randomRgb());
        }
        setColors(generatedColors);
        return () => {
            setColors(generatedColors);
        };
    }, [Clicked]);

    function isDarkColor(str: string) {
        function isDark(r: number, g: number, b: number): boolean {
            const yiq = (r * 299 + g * 587 + b * 114) / 1000;
            return yiq < 128;
        }
        const [r, g, b] = str
            .slice(4, -1)
            .split(",")
            .map((s) => Number(s.trim()));
        return isDark(r, g, b);
    }

    function rgbToHex(str: string) {
        const [r, g, b] = str
            .slice(4, -1)
            .split(",")
            .map((s) => Number(s.trim()));
        return (
            "#" +
            [r, g, b]
                .map((x) => x.toString(16).padStart(2, "0"))
                .join("")
                .toUpperCase()
        );
    }

    function colorName(str: string) {
        const result = namer(rgbToHex(str));
        return result;
    }

    function generateNewColors() {
        setClicked((prev) => !prev);
    }

    useEffect(() => {
        window.focus();
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.code === "Space" || e.key === " ") {
                e.preventDefault();
                generateNewColors();
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);

    return (
        <div className="h-screen w-full grid grid-cols-5 relative">
            <div className="absolute top-10 "></div>
            {colors.map((color, index) => (
                <div
                    key={index}
                    style={{ backgroundColor: color }}
                    className={`h-full w-full flex items-baseline-last justify-center py-10`}
                >
                    <div
                        className={`${
                            isDarkColor(color) ? "text-white" : "text-black"
                        } flex flex-col items-center justify-center`}
                    >
                        <div>{rgbToHex(color)}</div>
                        <div className="text-xs w-fit mt-2  ">
                            {colorName(color).ntc[0].name.toUpperCase()}
                        </div>
                    </div>
                </div>
            ))}

            <div className="absolute top-10 right-1/2 translate-x-1/2 text-center">
                <div className="p-4 bg-white/12 backdrop-blur-[12px] rounded-2xl outline-2 outline-white/32 ">
                    Press Spacebar or this button to generate new colors
                </div>
                <button
                    className=" outline-4 px-8 py-1 outline-white/32 rounded-2xl bg-white/80 backdrop-blur-[100px] mt-4"
                    onClick={() => setClicked(!Clicked)}
                >
                    Generate
                </button>
            </div>
        </div>
    );
}

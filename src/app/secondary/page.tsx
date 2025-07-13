"use client";
import { rgbToHsl } from "@/utils/rgbTohsl";
import { extractRgb } from "@/utils/extractRgb";
import { useEffect, useState } from "react";
import { isDarkText } from "@/utils/isDarkText";
import { findSecondaryColors } from "@/utils/secondaryColors";

export default function Test1() {
    const [r, setR] = useState<number>(255);
    const [g, setG] = useState<number>(0);
    const [b, setB] = useState<number>(0);
    const [rgb, setRgb] = useState<string>(``);
    useEffect(() => {
        setRgb(`rgb(${r},${g},${b})`);
    }, [r, g, b]);

    const rgbValues = extractRgb(rgb);

    const secondaryColors = findSecondaryColors(rgbValues);
    const analogousColors = secondaryColors.analogous;
    const complementaryColors = secondaryColors.complementary;
    const triadicColors = secondaryColors.tetradic;
    const [Clicked, setClicked] = useState(false);
    useEffect(() => {
        function randomRgb(): string {
            const red = Math.floor(Math.random() * 100 +20 );
            const green = Math.floor(Math.random()*255 );
            const blue = Math.floor(Math.random() *75 + 180);
            return `rgb(${red},${green},${blue})`; 
        }
        const val = randomRgb();
        
        setRgb(val);
        setR(extractRgb(val).r);
        setG(extractRgb(val).g);
        setB(extractRgb(val).b);
        return () => {
            setRgb(val);
            setR(extractRgb(val).r);
            setG(extractRgb(val).g);
            setB(extractRgb(val).b);
        };
    }, [Clicked]);

    return (
        <div className="relative h-screen w-full flex justify-center items-center ">
            <div className="flex flex-row gap-4">
                <div
                    className={`h-80 w-60 rounded-2xl flex justify-center items-baseline-last p-2 ${
                        isDarkText(rgb) ? "text-white" : "text-black"
                    }`}
                    style={{
                        backgroundColor: `rgb(${rgbValues.r},${rgbValues.g},${rgbValues.b})`,
                    }}
                >
                    RGB ( {rgbValues.r}, {rgbValues.g}, {rgbValues.b})
                </div>
                <div
                    className={`h-80 w-60 rounded-2xl flex justify-center items-baseline-last p-2 ${
                        isDarkText(rgb) ? "text-white" : "text-black"
                    }`}
                    style={{
                        backgroundColor: `rgb(${triadicColors[0].r},${triadicColors[0].g},${triadicColors[0].b})`,
                    }}
                >
                    RGB {triadicColors[0].r} {triadicColors[0].g}{" "}
                    {triadicColors[0].b}
                </div>
                <div
                    className={`h-80 w-60 rounded-2xl flex justify-center items-baseline-last p-2 ${
                        isDarkText(rgb) ? "text-white" : "text-black"
                    }`}
                    style={{
                        backgroundColor: `rgb(${triadicColors[1].r},${triadicColors[1].g},${triadicColors[1].b})`,
                    }}
                >
                    RGB {triadicColors[1].r} {triadicColors[1].g}{" "}
                    {triadicColors[1].b}
                </div>
                <div
                    className={`h-80 w-60 rounded-2xl flex justify-center items-baseline-last p-2 ${
                        isDarkText(rgb) ? "text-white" : "text-black"
                    }`}
                    style={{
                        backgroundColor: `rgb(${triadicColors[2].r},${triadicColors[2].g},${triadicColors[2].b})`,
                    }}
                >
                    RGB {triadicColors[2].r} {triadicColors[2].g}{" "}
                    {triadicColors[2].b}
                </div>
            </div>
            <div className=" absolute top-10 right-10">
                <input
                    type="text"
                    value={rgb}
                    onChange={(e) => {
                        setRgb(e.target.value);
                        const rgbValues = extractRgb(e.target.value);
                        setR(rgbValues.r);
                        setG(rgbValues.g);
                        setB(rgbValues.b);
                    }}
                />
                <div>hello</div>
                <div className=" border-2 border-black/40 rounded-[12px] py-1 px-2 flex justify-center w-fit items-center">
                <span className="mx-1">R</span>
                <input
                    className="border-2 border-black/40 rounded-[8px] pl-1  w-10"
                    type="number"
                    placeholder={`${r}`}
                    onChange={(e) => setR(Number(e.target.value))}
                />
                <span className="mx-1">G</span>
                <input
                    className="border-2 border-black/40 rounded-[8px] pl-1  w-10"
                    type="number"
                    placeholder={`${g}`}
                    onChange={(e) => setG(Number(e.target.value))}
                />

                <span className="mx-1">B</span>
                <input
                    className="border-2 border-black/40 rounded-[8px] pl-1  w-10"
                    type="number"
                    placeholder={`${b}`}
                    onChange={(e) => setB(Number(e.target.value))}
                    />
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

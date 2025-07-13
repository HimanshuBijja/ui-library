"use client";
import { rgbToHsl } from "@/utils/rgbTohsl";
import { extractRgb } from "@/utils/extractRgb";
import { useState } from "react";
import { isDarkText } from "@/utils/isDarkText";
import { findSecondaryColors } from "@/utils/secondaryColors";

export default function Test1() {
    const [rgb, setRgb] = useState<string>("rgb(255,0,0)");

    const rgbValues = extractRgb(rgb);
    const hslValues = rgbToHsl(rgbValues.r, rgbValues.g, rgbValues.b);

    const secondaryColors = findSecondaryColors(rgbValues);
    const analogousColors = secondaryColors.analogous;
    const complementaryColors = secondaryColors.complementary;
    const triadicColors = secondaryColors.tetradic;

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
                    RGB {triadicColors[0].r} {triadicColors[0].g} {triadicColors[0].b}
                </div>
                <div
                    className={`h-80 w-60 rounded-2xl flex justify-center items-baseline-last p-2 ${
                        isDarkText(rgb) ? "text-white" : "text-black"
                    }`}
                    style={{
                        backgroundColor: `rgb(${triadicColors[1].r},${triadicColors[1].g},${triadicColors[1].b})`,
                    }}
                >
                    RGB {triadicColors[1].r} {triadicColors[1].g} {triadicColors[1].b}
                </div>
                <div
                    className={`h-80 w-60 rounded-2xl flex justify-center items-baseline-last p-2 ${
                        isDarkText(rgb) ? "text-white" : "text-black"
                    }`}
                    style={{
                        backgroundColor: `rgb(${triadicColors[2].r},${triadicColors[2].g},${triadicColors[2].b})`,
                    }}
                >
                    RGB {triadicColors[2].r} {triadicColors[2].g} {triadicColors[2].b}
                </div>
            </div>

            <input
                className="border-2 border-black absolute top-10 right-10"
                type="text"
                value={rgb}
                onChange={(e) => setRgb(e.target.value)}
            />
        </div>
    );
}

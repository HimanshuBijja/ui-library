"use client";

import { motion } from "motion/react";

export default function Test1() {
    return (
        <div className="flex h-screen w-full items-center justify-center bg-black overflow-hidden">
            {/* <div className="h-100 w-100"> */}
                
            <motion.div
                animate={{
                    x: [0, 0, -200, -200, 0],
                    y: [0, 200, 200, 0, 0],
                    rotate: [0, 30, 60, 45, 90, 60, 30, 0],
                    // scale: [1, 1.1, 0.95, 1],
                    
                    width: ["150px", "240px", "180px", "240px", "150px"],
                    height: ["240px", "150px", "180px", "150px", "240px"],
                }}
                transition={{
                    duration: 8,
                    repeat: Infinity,
                    
                    // repeatType: "reverse",
                }}
                className="animate-three absolute flex blur-[50px] rounded-[50%] items-end justify-end bg-gradient-to-r from-pink-700 via-red-500 to bg-red-500 "
            ></motion.div>
                    {/* </div> */}
        </div>
    );
}

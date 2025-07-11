"use client";

import { motion } from "motion/react";

export default function Test1() {
    return (
        <div className="relative flex h-screen w-full items-center justify-center bg-black overflow-hidden">
            <div className="absolute inset-0 z-110 backdrop-blur-[100px]"/>

            <div className="absolute top-20 right-30  w-fit h-fit">
                <motion.div
                    animate={{
                        x: [0, 0, -200, -200, 0],
                        y: [0, 200, 200, 0, 0],
                        rotate: [0, 30, 60, 45, 90, 60, 30, 0],
                        // scale: [1, 1.1, 0.95, 1],

                        width: ["150px", "280px", "180px", "280px", "150px"],
                        height: ["240px", "150px", "180px", "150px", "240px"],
                    }}
                    transition={{
                        duration: 16,
                        repeat: Infinity,

                        // repeatType: "reverse",
                    }}
                    className=" flex  rounded-[50%] items-end justify-end bg-gradient-to-r from-pink-700 via-red-500 to bg-red-500 "
                ></motion.div>
            </div>
            <div className="absolute bottom-20 left-30  w-fit h-fit">
                <motion.div
                    animate={{
                        x: [0, 0, 200, 200, 400, 0],
                        y: [0, -200, -200, 0, 0],
                        rotate: [0, 30, 60, 45, 90, 60, 30, 0],
                        // scale: [1, 1.1, 0.95, 1],

                        height: ["150px", "280px", "180px", "280px", "150px"],
                        width: ["240px", "150px", "180px", "150px", "240px"],
                    }}
                    transition={{
                        duration: 16,
                        repeat: Infinity,

                        // repeatType: "reverse",
                    }}
                    className=" flex  rounded-[50%] items-end justify-end bg-gradient-to-r from-pink-700 via-red-500 to bg-red-500 "
                ></motion.div>
            </div>
            <div className="absolute bottom-20 right-30 border-2  w-fit h-fit">
                <motion.div
                    animate={{
                        x: [0, 0, -200, -200, 0],
                        y: [0, -200, -200, 0, 0],
                        rotate: [0, 30, 60, 45, 90, 60, 30, 0],
                        // scale: [1, 1.1, 0.95, 1],

                        width: ["150px", "280px", "180px", "280px", "150px"],
                        height: ["240px", "150px", "180px", "150px", "240px"],
                    }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,

                        // repeatType: "reverse",
                    }}
                    className=" flex  rounded-[50%] items-end justify-end bg-gradient-to-r from-pink-700 via-red-500 to bg-red-500 "
                ></motion.div>
            </div>
            <div className="absolute top-20 left-30 border-2  w-fit h-fit ">
                <motion.div
                    animate={{
                        x: [0, 0, 200, 200,600,  0],
                        y: [0, 200, 200, 0, 0],
                        rotate: [0, 30, 60, 45, 90, 60, 30, 0],
                        // scale: [1, 1.1, 0.95, 1],

                        width: ["250px", "400px", "300px", "400px", "250px"],
                        height: ["400px", "250px", "300px", "250px", "400px"],
                    }}
                    transition={{
                        duration: 32,
                        repeat: Infinity,

                        // repeatType: "reverse",
                    }}
                    className=" flex  rounded-[50%] items-end justify-end bg-gradient-to-r from-pink-700 via-red-500 to bg-red-500 "
                ></motion.div>
            </div>
        </div>
    );
}

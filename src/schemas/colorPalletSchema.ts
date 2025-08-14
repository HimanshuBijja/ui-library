import z from "zod";


const colors = z.object({
    red : z.number().min(0).max(255).default(0),
    green : z.number().min(0).max(255).default(0),
    blue : z.number().min(0).max(255).default(0)
})

export const colorPallet = z.object({
    name: z.string().max(100),
    types: z.array(z.string()).max(5).default(["randomPallet"]),
    colors: z.array(colors).max(10)
})
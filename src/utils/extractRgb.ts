export function extractRgb(str:string){
    const [r, g, b] = str
        .slice(4, -1)
        .split(",")
        .map((s) => Number(s.trim()))
    
    return {r,g,b}
}
interface InputNumber {
    r: number;
    g: number;
    b: number;
}

type rgbInput = InputNumber | string;

export function rgbToHex(input: rgbInput): string {
    let r: number, g: number, b: number;
    
    if (typeof input === "string") {
        // Handle string input like "rgb(255, 0, 128)"
        const [rStr, gStr, bStr] = input
            .slice(4, -1)
            .split(",")
            .map((s) => s.trim());
        
        r = Number(rStr);
        g = Number(gStr);
        b = Number(bStr);
    } else {
        // Handle object input with r, g, b properties
        r = input.r;
        g = input.g;
        b = input.b;
    }
    
    return (
        "#" +
        [r, g, b]
            .map((x) => x.toString(16).padStart(2, "0"))
            .join("")
            .toUpperCase()
    );
}
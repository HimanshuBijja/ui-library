export function isDarkText(str: string) {
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





function isDark(r: number, g: number, b: number): boolean {
    const yiq = (r * 299 + g * 587 + b * 114) / 1000;
    return yiq < 128;
}
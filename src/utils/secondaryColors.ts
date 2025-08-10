interface RGB {
    r: number;
    g: number;
    b: number;
}

interface HSL {
    h: number;
    s: number;
    l: number;
}

// Convert RGB to HSL
function rgbToHsl(rgb: RGB): HSL {
    const { r, g, b } = rgb;
    const rNorm = r / 255;
    const gNorm = g / 255;
    const bNorm = b / 255;
    
    const max = Math.max(rNorm, gNorm, bNorm);
    const min = Math.min(rNorm, gNorm, bNorm);
    const diff = max - min;
    
    let h = 0;
    const l = (max + min) / 2;
    const s = diff === 0 ? 0 : diff / (1 - Math.abs(2 * l - 1));
    
    if (diff !== 0) {
        if (max === rNorm) {
            h = ((gNorm - bNorm) / diff) % 6;
        } else if (max === gNorm) {
            h = (bNorm - rNorm) / diff + 2;
        } else {
            h = (rNorm - gNorm) / diff + 4;
        }
    }
    
    h = Math.round(h * 60);
    if (h < 0) h += 360;
    
    return {
        h: h,
        s: Math.round(s * 100),
        l: Math.round(l * 100)
    };
}

// Convert HSL to RGB
function hslToRgb(hsl: HSL): RGB {
    const { h, s, l } = hsl;
    const sNorm = s / 100;
    const lNorm = l / 100;
    
    const c = (1 - Math.abs(2 * lNorm - 1)) * sNorm;
    const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
    const m = lNorm - c / 2;
    
    let r = 0, g = 0, b = 0;
    
    if (h >= 0 && h < 60) {
        r = c; g = x; b = 0;
    } else if (h >= 60 && h < 120) {
        r = x; g = c; b = 0;
    } else if (h >= 120 && h < 180) {
        r = 0; g = c; b = x;
    } else if (h >= 180 && h < 240) {
        r = 0; g = x; b = c;
    } else if (h >= 240 && h < 300) {
        r = x; g = 0; b = c;
    } else if (h >= 300 && h < 360) {
        r = c; g = 0; b = x;
    }
    
    return {
        r: Math.round((r + m) * 255),
        g: Math.round((g + m) * 255),
        b: Math.round((b + m) * 255)
    };
}

// Find secondary colors based on color theory
export function findSecondaryColors(primaryColor: RGB) {
    const hsl = rgbToHsl(primaryColor);
    
    return {
        // Complementary color (opposite on color wheel)
        complementary: hslToRgb({
            h: (hsl.h + 180) % 360,
            s: hsl.s,
            l: hsl.l
        }),
        
        // Analogous colors (adjacent on color wheel)
        analogous: [
            hslToRgb({
                h: (hsl.h + 30) % 360,
                s: hsl.s,
                l: hsl.l
            }),
            hslToRgb({
                h: (hsl.h - 30 + 360) % 360,
                s: hsl.s,
                l: hsl.l
            })
        ],
        
        // Triadic colors (120 degrees apart)
        triadic: [
            hslToRgb({
                h: (hsl.h + 120) % 360,
                s: hsl.s,
                l: hsl.l
            }),
            hslToRgb({
                h: (hsl.h + 240) % 360,
                s: hsl.s,
                l: hsl.l
            })
        ],
        
        // Split complementary (complementary + adjacent)
        splitComplementary: [
            hslToRgb({
                h: (hsl.h + 150) % 360,
                s: hsl.s,
                l: hsl.l
            }),
            hslToRgb({
                h: (hsl.h + 210) % 360,
                s: hsl.s,
                l: hsl.l
            })
        ],
        
        // Tetradic/Square colors (90 degrees apart)
        tetradic: [
            hslToRgb({
                h: (hsl.h + 90) % 360,
                s: hsl.s,
                l: hsl.l
            }),
            hslToRgb({
                h: (hsl.h + 180) % 360,
                s: hsl.s,
                l: hsl.l
            }),
            hslToRgb({
                h: (hsl.h + 270) % 360,
                s: hsl.s,
                l: hsl.l
            })
        ]
    };
}

// Example usage:
const primaryRed: RGB = { r: 255, g: 0, b: 0 };
const secondaryColors = findSecondaryColors(primaryRed);

// console.log("Primary color:", primaryRed);
// console.log("Complementary:", secondaryColors.complementary);
// console.log("Analogous:", secondaryColors.analogous);
// console.log("Triadic:", secondaryColors.triadic);
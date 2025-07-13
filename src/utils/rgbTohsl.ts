interface HSL {
    h: number; // Hue: 0-360 degrees
    s: number; // Saturation: 0-100%
    l: number; // Lightness: 0-100%
}

export function rgbToHsl(r: number, g: number, b: number): HSL {
    // Normalize RGB values to 0-1 range
    r /= 255;
    g /= 255;
    b /= 255;
    
    // Find the minimum and maximum values
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const delta = max - min;
    
    let h: number = 0, s: number = 0, l: number;
    
    // Calculate Lightness
    l = (max + min) / 2;
    
    if (delta === 0) {
        // Achromatic (gray) - no color
        h = 0;
        s = 0;
    } else {
        // Calculate Saturation
        s = l > 0.5 ? delta / (2 - max - min) : delta / (max + min);
        
        // Calculate Hue
        switch (max) {
            case r:
                h = (g - b) / delta + (g < b ? 6 : 0);
                break;
            case g:
                h = (b - r) / delta + 2;
                break;
            case b:
                h = (r - g) / delta + 4;
                break;
        }
        h /= 6;
    }
    
    // Convert to degrees and percentages
    h = Math.round(h * 360);
    s = Math.round(s * 100);
    l = Math.round(l * 100);
    
    return { h, s, l };
}

// Alternative with RGB object input
interface RGB {
    r: number; // Red: 0-255
    g: number; // Green: 0-255
    b: number; // Blue: 0-255
}

function rgbToHslFromObject(rgb: RGB): HSL {
    return rgbToHsl(rgb.r, rgb.g, rgb.b);
}


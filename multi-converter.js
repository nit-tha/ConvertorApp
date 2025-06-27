// SQL Converter functions
function convertToCommaSeparated() {
    const ids = document.getElementById('ids').value.trim().split(/\s+/).join(',');
    document.getElementById('commaSeparated').value = ids;
}

 // Updated single quotes function - outputs to shared field
 function convertToSingleQuotes() {
    const idsArray = document.getElementById('ids').value.trim().split(/\s+/);
    const singleQuotedIds = idsArray.map(id => `'${id}'`).join(',');
    document.getElementById('quotesOutput').value = singleQuotedIds;
}

// Updated double quotes function - outputs to shared field
function convertToDoubleQuotes() {
    const idsArray = document.getElementById('ids').value.trim().split(/\s+/);
    const doubleQuotedIds = idsArray.map(id => `"${id}"`).join(',');
    document.getElementById('quotesOutput').value = doubleQuotedIds;
}

function copyToClipboard(elementId) {
    const element = document.getElementById(elementId);
    element.select();
    element.setSelectionRange(0, 9999999); // For mobile devices
    document.execCommand('copy');
}

function clearData() {
    const elementsToClear = [
        'ids', 'commaSeparated', 'quotesOutput','countInput',
        'commaRemoved', 'epochTime', 'result'
    ];
    // Clear the value of each input element except the dropdowns
    elementsToClear.forEach(id => {
        let element = document.getElementById(id);
        if (element) {
            if (element.tagName.toLowerCase() !== 'select') {
                element.value = '';  // Clear the value for text/number inputs
            }
            element.innerHTML = ''; // Clear the inner HTML for divs like 'result'
        }
    });
    // Reset the hours and minutes dropdowns to '0' by setting selectedIndex
    const hoursDropdown = document.getElementById('hours');
    const minutesDropdown = document.getElementById('minutes');    
    if (hoursDropdown) {
        hoursDropdown.selectedIndex = 0;  // Reset to first option (0)
    }    
    if (minutesDropdown) {
        minutesDropdown.selectedIndex = 0;  // Reset to first option (0)
    }
    // Clear the inner text of specific display elements
    document.getElementById('countDisplay').innerText = '';
    document.getElementById('withoutSpaceCountDisplay').innerText = '';
    document.getElementById('wordCountDisplay').innerText = '';   
    // Hide the comma removed container
    document.getElementById('commaRemovedContainer').style.display = 'none';    
    // Reset the select element to its default option
    document.getElementById('timezoneSelect').selectedIndex = 0; 
    // Clear the 'results' section
    document.getElementById('minutesToSubtract').value = '';
    document.getElementById('oldEpochTime').innerText = '';
    document.getElementById('newEpochTime').innerText = '';
    document.getElementById('timeDiff').innerText = '';
    document.getElementById('results').style.display = 'none'; // Optionally hide the section
    document.getElementById('hf-result').innerText = ''; // Clear the Human Date result
    document.getElementById('result2').innerText = '';
    // Clear all input type number fields
    const numberInputs = document.querySelectorAll('input[type="number"]');
    numberInputs.forEach(input => input.value = ''); // Clear all number inputs
}


function countData() {
    const input = document.getElementById('countInput').value;
    const count = input.length; // Counts all characters including whitespaces
    document.getElementById('countDisplay').innerText = `Count: ${count}`;
}

function countExcludingSpace() {
    const input = document.getElementById('countInput').value;
    const withoutSpaceCount = input.replace(/\s/g, '').length; // Removes all whitespace and counts remaining characters
    document.getElementById('withoutSpaceCountDisplay').innerText = `Ex-space Count: ${withoutSpaceCount}`;
}

//Count as words
function countWords() {
    const input = document.getElementById('countInput').value;
    const wordsArray = input.trim().split(/[\s,]+/); // Splits by space or comma, and ignores multiple spaces/commas
    const wordCount = wordsArray.filter(word => word.length > 0).length; // Filters out empty elements
    document.getElementById('wordCountDisplay').innerText = `Word Count: ${wordCount}`;
}

function resizeInput(input) {
    input.style.width = 'auto';
    input.style.width = (input.scrollWidth + 10) + 'px';
}

function removeCommaData() {
    const inputData = document.getElementById('ids').value;
    const dataWithoutComma = inputData.replace(/,/g, ' ');
    document.getElementById('commaRemoved').value = dataWithoutComma;
    document.getElementById('commaRemovedContainer').style.display = 'flex';
}

function removeDuplicates() {
    const inputData = document.getElementById('ids').value.trim().split(/\s+/);
    const uniqueData = [...new Set(inputData)].join(' ');
    document.getElementById('commaRemoved').value = uniqueData;
    document.getElementById('commaRemovedContainer').style.display = 'flex';
}

function refreshPage() {
    location.reload();
}

// Updated Hex/Text Converter
function convertHexText() {
    const input = document.getElementById('textInput').value.trim();
    const output = document.getElementById('output');
    
    if (!input) {
        output.value = '';
        return;
    }
    
    // Check if input is hex (only contains 0-9, A-F, a-f and has even length)
    if (/^[0-9A-Fa-f]+$/.test(input) && input.length % 2 === 0) {
        // Convert from hex to text
        try {
            const text = input.match(/.{1,2}/g)
                .map(byte => String.fromCharCode(parseInt(byte, 16)))
                .join('');
            output.value = text;
        } catch (e) {
            output.value = 'Invalid hex format';
        }
    } else {
        // Convert from text to hex
        const hex = Array.from(input)
            .map(c => c.charCodeAt(0).toString(16).padStart(2, '0'))
            .join('')
            .toUpperCase();
        output.value = hex;
    }
}

// Updated Binary Converter
function convertToBinary() {
    const input = document.getElementById('textInput').value.trim();
    const output = document.getElementById('output');
    
    if (!input) {
        output.value = '';
        return;
    }
    
    // Check if input is binary (only contains 0s and 1s)
    if (/^[01]+$/.test(input)) {
        // Convert from binary to decimal
        const decimal = parseInt(input, 2);
        output.value = decimal.toString();
    } else if (!isNaN(input) && input !== '') {
        // Convert decimal number to binary
        output.value = Number(input).toString(2);
    } else if (/^[0-9a-fA-F]+$/.test(input)) {
        // Convert hexadecimal to binary
        output.value = parseInt(input, 16).toString(2);
    } else {
        output.value = 'Invalid input';
    }
}

// Updated Base64 Converter
function encodeToBase64() {
    const input = document.getElementById('textInput').value;
    const output = document.getElementById('output');
    
    if (!input) {
        output.value = '';
        return;
    }
    
    // Check if input appears to be base64 encoded
    if (input.startsWith('Basic ')) {
        // Decode from base64
        try {
            const base64Part = input.substring(6); // Remove "Basic " prefix
            const decoded = atob(base64Part);
            output.value = decoded;
        } catch (e) {
            output.value = "Invalid Base64 format";
        }
    } else if (isBase64(input)) {
        // Decode if it looks like base64 without "Basic " prefix
        try {
            const decoded = atob(input);
            output.value = decoded;
        } catch (e) {
            output.value = "Invalid Base64 format";
        }
    } else {
        // Encode to base64
        const encoded = btoa(input);
        output.value = "Basic " + encoded;
    }
}

// Helper function for Base64 validation
function isBase64(str) {
    const base64Pattern = /^[A-Za-z0-9+/]*={0,2}$/;
    return base64Pattern.test(str) && str.length % 4 === 0 && str.length > 0;
}

// JWT Decoder
function decodeJWT() {
    const input = document.getElementById('textInput').value.trim();
    const output = document.getElementById('output');
    
    if (!input) {
        output.value = '';
        return;
    }
    
    try {
        // JWT has 3 parts separated by dots
        const parts = input.split('.');
        if (parts.length !== 3) {
            output.value = 'Invalid JWT format';
            return;
        }
        
        // Decode the payload (second part)
        const payload = parts[1];
        // Add padding if needed
        const paddedPayload = payload + '='.repeat((4 - payload.length % 4) % 4);
        const decoded = atob(paddedPayload.replace(/-/g, '+').replace(/_/g, '/'));
        
        // Format JSON
        const jsonObj = JSON.parse(decoded);
        output.value = JSON.stringify(jsonObj, null, 2);
    } catch (e) {
        output.value = 'Invalid JWT token';
    }
}

// Case Converter - cycles through different cases
let caseIndex = 0;
function convertCase() {
    const input = document.getElementById('textInput').value;
    const output = document.getElementById('output');
    
    if (!input) {
        output.value = '';
        return;
    }
    
    const cases = [
        input.toUpperCase(),                    // UPPERCASE
        input.toLowerCase(),                    // lowercase
        input.split(' ').map(word =>           // Title Case
            word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
        ).join(' '),
        input.replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => // camelCase
            index === 0 ? word.toLowerCase() : word.toUpperCase()
        ).replace(/\s+/g, ''),
        input.toLowerCase().replace(/\s+/g, '_') // snake_case
    ];
    
    output.value = cases[caseIndex % cases.length];
    caseIndex++;
}

// Reverse Text
function reverseText() {
    const input = document.getElementById('textInput').value;
    const output = document.getElementById('output');
    
    if (!input) {
        output.value = '';
        return;
    }
    
    output.value = input.split('').reverse().join('');
}

// Regex Escape
function escapeRegex() {
    const input = document.getElementById('textInput').value;
    const output = document.getElementById('output');
    
    if (!input) {
        output.value = '';
        return;
    }
    
    // Check if input is already escaped (contains many backslashes)
    if (input.includes('\\') && input.match(/\\/g).length > input.length * 0.2) {
        // Unescape - remove backslashes before special characters
        output.value = input.replace(/\\(.)/g, '$1');
    } else {
        // Escape special regex characters
        output.value = input.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }
}

// Color Converter with Visual Preview
        function convertColor() {
            const input = document.getElementById('textInput').value.trim();
            const output = document.getElementById('output');
            const preview = document.getElementById('colorPreview');
            const swatch = document.getElementById('colorSwatch');
            const info = document.getElementById('colorInfo');
            
            if (!input) {
                output.value = '';
                preview.style.display = 'none';
                return;
            }
            
            try {
                let color = null;
                let convertedValue = '';
                
                // HEX to RGB
                if (/^#?([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(input)) {
                    const hex = input.replace('#', '');
                    const r = parseInt(hex.length === 3 ? hex[0] + hex[0] : hex.substr(0, 2), 16);
                    const g = parseInt(hex.length === 3 ? hex[1] + hex[1] : hex.substr(2, 2), 16);
                    const b = parseInt(hex.length === 3 ? hex[2] + hex[2] : hex.substr(4, 2), 16);
                    color = { r, g, b };
                    convertedValue = `rgb(${r}, ${g}, ${b})`;
                }
                
                // RGB to HEX
                const rgbMatch = input.match(/rgb\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)/);
                if (rgbMatch) {
                    const r = parseInt(rgbMatch[1]);
                    const g = parseInt(rgbMatch[2]);
                    const b = parseInt(rgbMatch[3]);
                    color = { r, g, b };
                    const hex = ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase();
                    convertedValue = `#${hex}`;
                }
                
                // HSL to RGB
                const hslMatch = input.match(/hsl\(\s*(\d+)\s*,\s*(\d+)%\s*,\s*(\d+)%\s*\)/);
                if (hslMatch) {
                    const h = parseInt(hslMatch[1]) / 360;
                    const s = parseInt(hslMatch[2]) / 100;
                    const l = parseInt(hslMatch[3]) / 100;
                    
                    const [r, g, b] = hslToRgb(h, s, l);
                    color = { r, g, b };
                    convertedValue = `rgb(${r}, ${g}, ${b})`;
                }
                
                // Update convertColor function - support color names:
                if (color) {
                    const colorName = findClosestColorName(color.r, color.g, color.b);
                    output.value = `${convertedValue} (${colorName})`;
                    showColorPreview(color);
                } else {
                    output.value = 'Invalid color format';
                    preview.style.display = 'none';
                }
            } catch (e) {
                output.value = 'Invalid color format';
                preview.style.display = 'none';
            }
        }

        //Comprehensive color name database
        const colorNames = {
        // Standard Web Colors
        '#F0F8FF': 'AliceBlue', '#FAEBD7': 'AntiqueWhite', '#00FFFF': 'Aqua', '#7FFFD4': 'Aquamarine',
        '#F0FFFF': 'Azure', '#F5F5DC': 'Beige', '#FFE4C4': 'Bisque', '#000000': 'Black',
        '#FFEBCD': 'BlanchedAlmond', '#0000FF': 'Blue', '#8A2BE2': 'BlueViolet', '#A52A2A': 'Brown',
        '#DEB887': 'BurlyWood', '#5F9EA0': 'CadetBlue', '#7FFF00': 'Chartreuse', '#D2691E': 'Chocolate',
        '#FF7F50': 'Coral', '#6495ED': 'CornflowerBlue', '#FFF8DC': 'Cornsilk', '#DC143C': 'Crimson',
        '#00FFFF': 'Cyan', '#00008B': 'DarkBlue', '#008B8B': 'DarkCyan', '#B8860B': 'DarkGoldenrod',
        '#A9A9A9': 'DarkGray', '#006400': 'DarkGreen', '#BDB76B': 'DarkKhaki', '#8B008B': 'DarkMagenta',
        '#556B2F': 'DarkOliveGreen', '#FF8C00': 'DarkOrange', '#9932CC': 'DarkOrchid', '#8B0000': 'DarkRed',
        '#E9967A': 'DarkSalmon', '#8FBC8F': 'DarkSeaGreen', '#483D8B': 'DarkSlateBlue', '#2F4F4F': 'DarkSlateGray',
        '#00CED1': 'DarkTurquoise', '#9400D3': 'DarkViolet', '#FF1493': 'DeepPink', '#00BFFF': 'DeepSkyBlue',
        '#696969': 'DimGray', '#1E90FF': 'DodgerBlue', '#B22222': 'FireBrick', '#FFFAF0': 'FloralWhite',
        '#228B22': 'ForestGreen', '#FF00FF': 'Fuchsia', '#DCDCDC': 'Gainsboro', '#F8F8FF': 'GhostWhite',
        '#FFD700': 'Gold', '#DAA520': 'Goldenrod', '#808080': 'Gray', '#008000': 'Green',
        '#ADFF2F': 'GreenYellow', '#F0FFF0': 'Honeydew', '#FF69B4': 'HotPink', '#CD5C5C': 'IndianRed',
        '#4B0082': 'Indigo', '#FFFFF0': 'Ivory', '#F0E68C': 'Khaki', '#E6E6FA': 'Lavender',
        '#FFF0F5': 'LavenderBlush', '#7CFC00': 'LawnGreen', '#FFFACD': 'LemonChiffon', '#ADD8E6': 'LightBlue',
        '#F08080': 'LightCoral', '#E0FFFF': 'LightCyan', '#FAFAD2': 'LightGoldenrodYellow', '#D3D3D3': 'LightGray',
        '#90EE90': 'LightGreen', '#FFB6C1': 'LightPink', '#FFA07A': 'LightSalmon', '#20B2AA': 'LightSeaGreen',
        '#87CEFA': 'LightSkyBlue', '#778899': 'LightSlateGray', '#B0C4DE': 'LightSteelBlue', '#FFFFE0': 'LightYellow',
        '#00FF00': 'Lime', '#32CD32': 'LimeGreen', '#FAF0E6': 'Linen', '#FF00FF': 'Magenta',
        '#800000': 'Maroon', '#66CDAA': 'MediumAquamarine', '#0000CD': 'MediumBlue', '#BA55D3': 'MediumOrchid',
        '#9370DB': 'MediumPurple', '#3CB371': 'MediumSeaGreen', '#7B68EE': 'MediumSlateBlue', '#00FA9A': 'MediumSpringGreen',
        '#48D1CC': 'MediumTurquoise', '#C71585': 'MediumVioletRed', '#191970': 'MidnightBlue', '#F5FFFA': 'MintCream',
        '#FFE4E1': 'MistyRose', '#FFE4B5': 'Moccasin', '#FFDEAD': 'NavajoWhite', '#000080': 'Navy',
        '#FDF5E6': 'OldLace', '#808000': 'Olive', '#6B8E23': 'OliveDrab', '#FFA500': 'Orange',
        '#FF4500': 'OrangeRed', '#DA70D6': 'Orchid', '#EEE8AA': 'PaleGoldenrod', '#98FB98': 'PaleGreen',
        '#AFEEEE': 'PaleTurquoise', '#DB7093': 'PaleVioletRed', '#FFEFD5': 'PapayaWhip', '#FFDAB9': 'PeachPuff',
        '#CD853F': 'Peru', '#FFC0CB': 'Pink', '#DDA0DD': 'Plum', '#B0E0E6': 'PowderBlue',
        '#800080': 'Purple', '#FF0000': 'Red', '#BC8F8F': 'RosyBrown', '#4169E1': 'RoyalBlue',
        '#8B4513': 'SaddleBrown', '#FA8072': 'Salmon', '#F4A460': 'SandyBrown', '#2E8B57': 'SeaGreen',
        '#FFF5EE': 'SeaShell', '#A0522D': 'Sienna', '#C0C0C0': 'Silver', '#87CEEB': 'SkyBlue',
        '#6A5ACD': 'SlateBlue', '#708090': 'SlateGray', '#FFFAFA': 'Snow', '#00FF7F': 'SpringGreen',
        '#4682B4': 'SteelBlue', '#D2B48C': 'Tan', '#008080': 'Teal', '#D8BFD8': 'Thistle',
        '#FF6347': 'Tomato', '#40E0D0': 'Turquoise', '#EE82EE': 'Violet', '#F5DEB3': 'Wheat',
        '#FFFFFF': 'White', '#F5F5F5': 'WhiteSmoke', '#FFFF00': 'Yellow', '#9ACD32': 'YellowGreen',

        // Extended Color Palette
        '#FF6B6B': 'Coral Red', '#4ECDC4': 'Tiffany Blue', '#45B7D1': 'Sky Blue', '#96CEB4': 'Mint Green',
        '#FFEAA7': 'Peach', '#DDA0DD': 'Plum Purple', '#98D8C8': 'Seafoam', '#F7DC6F': 'Banana Yellow',
        '#BB8FCE': 'Light Purple', '#85C1E9': 'Baby Blue', '#F8C471': 'Peach Orange', '#82E0AA': 'Light Mint',
        '#F1948A': 'Rose Pink', '#85929E': 'Blue Gray', '#F4D03F': 'Golden Yellow', '#A569BD': 'Medium Purple',
        '#5DADE2': 'Cornflower', '#58D68D': 'Emerald Green', '#EC7063': 'Salmon Pink', '#AEB6BF': 'Silver Gray',
        '#F39C12': 'Orange Peel', '#8E44AD': 'Royal Purple', '#3498DB': 'Dodger Blue', '#2ECC71': 'Jade Green',
        '#E74C3C': 'Red Orange', '#95A5A6': 'Concrete Gray', '#F1C40F': 'Sunflower', '#9B59B6': 'Amethyst',
        '#1ABC9C': 'Turquoise Green', '#34495E': 'Wet Asphalt', '#E67E22': 'Carrot Orange', '#2C3E50': 'Midnight Blue',

        // Pastel Colors
        '#FFB3BA': 'Pastel Pink', '#FFDFBA': 'Pastel Peach', '#FFFFBA': 'Pastel Yellow', '#BAFFC9': 'Pastel Green',
        '#BAE1FF': 'Pastel Blue', '#E6E6FA': 'Pastel Lavender', '#F0E68C': 'Pastel Khaki', '#DDA0DD': 'Pastel Plum',
        '#FFDAB9': 'Pastel Orange', '#B19CD9': 'Pastel Purple', '#C6E2FF': 'Pastel Sky', '#FFCCCB': 'Pastel Coral',
        '#E0BBE4': 'Pastel Violet', '#FFDFD3': 'Pastel Apricot', '#DFFF00': 'Pastel Lime', '#FFCBA4': 'Pastel Tan',

        // Neon/Bright Colors
        '#FF073A': 'Neon Red', '#39FF14': 'Neon Green', '#04D9FF': 'Neon Blue', '#FFFF33': 'Neon Yellow',
        '#FF10F0': 'Neon Pink', '#08F7FE': 'Neon Cyan', '#FE4164': 'Neon Rose', '#CCFF00': 'Electric Lime',
        '#FF006E': 'Bright Magenta', '#FB4570': 'Bright Rose', '#3F00FF': 'Electric Blue', '#FFAA1D': 'Bright Orange',

        // Earth Tones
        '#8B4513': 'Saddle Brown', '#A0522D': 'Sienna', '#CD853F': 'Peru', '#DEB887': 'Burlywood',
        '#F4A460': 'Sandy Brown', '#D2691E': 'Chocolate', '#BC8F8F': 'Rosy Brown', '#F5DEB3': 'Wheat',
        '#D2B48C': 'Tan', '#DAA520': 'Goldenrod', '#B8860B': 'Dark Goldenrod', '#CD5C5C': 'Indian Red',
        '#556B2F': 'Dark Olive Green', '#6B8E23': 'Olive Drab', '#9ACD32': 'Yellow Green', '#32CD32': 'Lime Green',

        // Jewel Tones
        '#DC143C': 'Crimson', '#B22222': 'Fire Brick', '#8B0000': 'Dark Red', '#800000': 'Maroon',
        '#4B0082': 'Indigo', '#483D8B': 'Dark Slate Blue', '#6A5ACD': 'Slate Blue', '#7B68EE': 'Medium Slate Blue',
        '#9370DB': 'Medium Purple', '#8A2BE2': 'Blue Violet', '#9932CC': 'Dark Orchid', '#BA55D3': 'Medium Orchid',
        '#DA70D6': 'Orchid', '#EE82EE': 'Violet', '#DDA0DD': 'Plum', '#C71585': 'Medium Violet Red',
        '#FF1493': 'Deep Pink', '#FF69B4': 'Hot Pink', '#FF6347': 'Tomato', '#FF4500': 'Orange Red',

        // Metallic Colors
        '#C0C0C0': 'Silver', '#FFD700': 'Gold', '#B87333': 'Bronze', '#CD7F32': 'Copper',
        '#E5E4E2': 'Platinum', '#71797E': 'Steel', '#36454F': 'Charcoal', '#708090': 'Slate Gray',
        '#2F4F4F': 'Dark Slate Gray', '#696969': 'Dim Gray', '#A9A9A9': 'Dark Gray', '#D3D3D3': 'Light Gray',
        '#778899': 'Light Slate Gray', '#B0C4DE': 'Light Steel Blue', '#4682B4': 'Steel Blue', '#1E90FF': 'Dodger Blue',

        // Nature Colors
        '#228B22': 'Forest Green', '#006400': 'Dark Green', '#008000': 'Green', '#00FF00': 'Lime',
        '#32CD32': 'Lime Green', '#90EE90': 'Light Green', '#98FB98': 'Pale Green', '#00FF7F': 'Spring Green',
        '#00FA9A': 'Medium Spring Green', '#ADFF2F': 'Green Yellow', '#7FFF00': 'Chartreuse', '#7CFC00': 'Lawn Green',
        '#66CDAA': 'Medium Aquamarine', '#7FFFD4': 'Aquamarine', '#40E0D0': 'Turquoise', '#48D1CC': 'Medium Turquoise',
        '#00CED1': 'Dark Turquoise', '#20B2AA': 'Light Sea Green', '#2E8B57': 'Sea Green', '#3CB371': 'Medium Sea Green',
        '#8FBC8F': 'Dark Sea Green', '#87CEEB': 'Sky Blue', '#87CEFA': 'Light Sky Blue', '#00BFFF': 'Deep Sky Blue',
        '#1E90FF': 'Dodger Blue', '#6495ED': 'Cornflower Blue', '#4169E1': 'Royal Blue', '#0000CD': 'Medium Blue',
        '#0000FF': 'Blue', '#00008B': 'Dark Blue', '#000080': 'Navy', '#191970': 'Midnight Blue'
    };

        // Fetch colorname
        function findClosestColorName(r, g, b) {
            let minDistance = Infinity;
            let closestName = 'Unknown';
            
            for (const [hex, name] of Object.entries(colorNames)) {
                const targetR = parseInt(hex.substr(1, 2), 16);
                const targetG = parseInt(hex.substr(3, 2), 16);
                const targetB = parseInt(hex.substr(5, 2), 16);
                
                const distance = Math.sqrt(
                    Math.pow(r - targetR, 2) + 
                    Math.pow(g - targetG, 2) + 
                    Math.pow(b - targetB, 2)
                );
                
                if (distance < minDistance) {
                    minDistance = distance;
                    closestName = name;
                }
            }
            
            return closestName;
        }

        function showColorPreview(color) {
            const preview = document.getElementById('colorPreview');
            const swatch = document.getElementById('colorSwatch');
            const info = document.getElementById('colorInfo');
            
            const { r, g, b } = color;
            const rgbColor = `rgb(${r}, ${g}, ${b})`;
            const hexColor = `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase()}`;
            const hsl = rgbToHsl(r, g, b);
            const hslColor = `hsl(${Math.round(hsl.h)}, ${Math.round(hsl.s)}%, ${Math.round(hsl.l)}%)`;
            
            // Set swatch color
            swatch.style.backgroundColor = rgbColor;
            
            // Create color info
            info.innerHTML = `
                <div class="color-value">
                    <strong>HEX</strong>
                    ${hexColor}
                    <button class="copy-button" onclick="copyColorValue('${hexColor}')">
                        <i class="fas fa-copy"></i> Copy
                    </button>
                </div>
                <div class="color-value">
                    <strong>RGB</strong>
                    ${rgbColor}
                    <button class="copy-button" onclick="copyColorValue('${rgbColor}')">
                        <i class="fas fa-copy"></i> Copy
                    </button>
                </div>
                <div class="color-value">
                    <strong>HSL</strong>
                    ${hslColor}
                    <button class="copy-button" onclick="copyColorValue('${hslColor}')">
                        <i class="fas fa-copy"></i> Copy
                    </button>
                </div>
                <div class="color-value">
                    <strong>RGB Values</strong>
                    R:${r} G:${g} B:${b}
                    <button class="copy-button" onclick="copyColorValue('${r}, ${g}, ${b}')">
                        <i class="fas fa-copy"></i> Copy
                    </button>
                </div>
            `;
            
            preview.style.display = 'block';
        }


        function copyColorValue(value) {
            navigator.clipboard.writeText(value).then(() => {
                // Visual feedback
                const button = event.target.closest('.copy-button');
                const originalText = button.innerHTML;
                button.innerHTML = '<i class="fas fa-check"></i> Copied!';
                setTimeout(() => {
                    button.innerHTML = originalText;
                }, 1000);
            });
        }

        // function handleColorInput() {
        //     const input = document.getElementById('textInput').value.trim();
        //     // Auto-detect if input looks like a color and show preview
        //     if (isColorFormat(input)) {
        //         convertColor();
        //     } else {
        //         document.getElementById('colorPreview').style.display = 'none';
        //     }
        // }

        // function isColorFormat(input) {
        //     return /^#?([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(input) ||
        //            /rgb\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*\)/.test(input) ||
        //            /hsl\(\s*\d+\s*,\s*\d+%\s*,\s*\d+%\s*\)/.test(input);
        // }

        function hslToRgb(h, s, l) {
            let r, g, b;
            if (s === 0) {
                r = g = b = l;
            } else {
                const hue2rgb = (p, q, t) => {
                    if (t < 0) t += 1;
                    if (t > 1) t -= 1;
                    if (t < 1/6) return p + (q - p) * 6 * t;
                    if (t < 1/2) return q;
                    if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
                    return p;
                };
                const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
                const p = 2 * l - q;
                r = hue2rgb(p, q, h + 1/3);
                g = hue2rgb(p, q, h);
                b = hue2rgb(p, q, h - 1/3);
            }
            return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
        }

        function rgbToHsl(r, g, b) {
            r /= 255;
            g /= 255;
            b /= 255;
            const max = Math.max(r, g, b);
            const min = Math.min(r, g, b);
            let h, s, l = (max + min) / 2;

            if (max === min) {
                h = s = 0;
            } else {
                const d = max - min;
                s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
                switch (max) {
                    case r: h = (g - b) / d + (g < b ? 6 : 0); break;
                    case g: h = (b - r) / d + 2; break;
                    case b: h = (r - g) / d + 4; break;
                }
                h /= 6;
            }

            return {
                h: h * 360,
                s: s * 100,
                l: l * 100
            };
        }

        function copyToClipboard(elementId) {
            const element = document.getElementById(elementId);
            element.select();
            document.execCommand('copy');
        }
 let isMarkdownToHtml = true;

        function convertMarkdown() {
          const markdownConverter = document.getElementById('markdownConverter');
          const colorPreview = document.getElementById('colorPreview');
          
          // Hide color preview and show markdown converter
          colorPreview.style.display = 'none';
          markdownConverter.style.display = markdownConverter.style.display === 'none' ? 'block' : 'none';
          
          // Clear output field
          document.getElementById('output').value = '';
          
          // Convert current input if any
          convertMarkdownLive();
        }

        function toggleConversionMode() {
          isMarkdownToHtml = !isMarkdownToHtml;
          const btn = document.getElementById('conversionModeBtn');
          btn.textContent = isMarkdownToHtml ? 'Mode: MD → HTML' : 'Mode: HTML → MD';
          
          // Swap input and output
          const input = document.getElementById('markdownInput');
          const output = document.getElementById('markdownOutput');
          const temp = input.value;
          input.value = output.value;
          output.value = temp;
          
          convertMarkdownLive();
        }

        function convertMarkdownLive() {
          const input = document.getElementById('markdownInput').value;
          const output = document.getElementById('markdownOutput');
          
          if (!input.trim()) {
            output.value = '';
            return;
          }
          
          try {
            if (isMarkdownToHtml) {
              output.value = markdownToHtml(input);
            } else {
              output.value = htmlToMarkdown(input);
            }
          } catch (error) {
            output.value = 'Error: Invalid input format';
          }
        }

        function markdownToHtml(markdown) {
          let html = markdown
            // Headers
            .replace(/^### (.*$)/gm, '<h3>$1</h3>')
            .replace(/^## (.*$)/gm, '<h2>$1</h2>')
            .replace(/^# (.*$)/gm, '<h1>$1</h1>')
            
            // Bold and Italic
            .replace(/\*\*\*(.*?)\*\*\*/g, '<strong><em>$1</em></strong>')
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            
            // Code
            .replace(/`(.*?)`/g, '<code>$1</code>')
            
            // Links
            .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')
            
            // Lists
            .replace(/^\* (.*$)/gm, '<li>$1</li>')
            .replace(/^- (.*$)/gm, '<li>$1</li>')
            
            // Line breaks
            .replace(/\n\n/g, '</p><p>')
            .replace(/\n/g, '<br>');
            
          // Wrap in paragraphs
          if (html && !html.includes('<h') && !html.includes('<li>')) {
            html = '<p>' + html + '</p>';
          }
          
          // Wrap lists in ul tags
          html = html.replace(/(<li>.*?<\/li>)/gs, '<ul>$1</ul>');
          
          return html;
        }

        function htmlToMarkdown(html) {
          let markdown = html
            // Headers
            .replace(/<h1>(.*?)<\/h1>/g, '# $1')
            .replace(/<h2>(.*?)<\/h2>/g, '## $1')
            .replace(/<h3>(.*?)<\/h3>/g, '### $1')
            
            // Bold and Italic
            .replace(/<strong><em>(.*?)<\/em><\/strong>/g, '***$1***')
            .replace(/<em><strong>(.*?)<\/strong><\/em>/g, '***$1***')
            .replace(/<strong>(.*?)<\/strong>/g, '**$1**')
            .replace(/<b>(.*?)<\/b>/g, '**$1**')
            .replace(/<em>(.*?)<\/em>/g, '*$1*')
            .replace(/<i>(.*?)<\/i>/g, '*$1*')
            
            // Code
            .replace(/<code>(.*?)<\/code>/g, '`$1`')
            
            // Links
            .replace(/<a href="([^"]+)">(.*?)<\/a>/g, '[$2]($1)')
            
            // Lists
            .replace(/<li>(.*?)<\/li>/g, '* $1')
            .replace(/<ul>/g, '').replace(/<\/ul>/g, '')
            .replace(/<ol>/g, '').replace(/<\/ol>/g, '')
            
            // Paragraphs and line breaks
            .replace(/<p>/g, '').replace(/<\/p>/g, '\n\n')
            .replace(/<br>/g, '\n')
            .replace(/<br\/>/g, '\n')
            
            // Clean up extra whitespace
            .replace(/\n\n\n+/g, '\n\n')
            .trim();
            
          return markdown;
        }

        // Clear fields for Conversion Suite
        function clearFields() {
            const elementsToClear = [
                'textInput', 'output', 'apiKeyOutput', 'markdownInput', 'markdownOutput'
            ];
            elementsToClear.forEach(id => {
                const element = document.getElementById(id);
                if (element) element.value = '';
            });
            
            // Hide color preview and markdown converter
            const colorPreview = document.getElementById('colorPreview');
            if (colorPreview) colorPreview.style.display = 'none';
            
            const markdownConverter = document.getElementById('markdownConverter');
            if (markdownConverter) markdownConverter.style.display = 'none';
        }

 // Improved Navigation JavaScript
        function showSection(targetSection) {
            // Hide all sections
            const sections = ['sqlConverter', 'hexConverter', 'xmlToBlockSection', 'queryToJsonSection', 'diffcomparerSection', 'codeFormatterSection','testCaseBuilderSection'];
            sections.forEach(section => {
                const element = document.getElementById(section);
                if (element) {
                    element.style.display = 'none';
                }
            });
            
            // Show target section
            const target = document.getElementById(targetSection);
            if (target) {
                target.style.display = 'block';
            }
            
            // Update active nav link
            document.querySelectorAll('nav a').forEach(link => link.classList.remove('active'));
            document.querySelector(`[data-section="${targetSection}"]`).classList.add('active');
        }

        // Add event listeners to all navigation links
        document.addEventListener('DOMContentLoaded', function() {
            const navLinks = document.querySelectorAll('nav a[data-section]');
            navLinks.forEach(link => {
                link.addEventListener('click', function(e) {
                    e.preventDefault();
                    const targetSection = this.getAttribute('data-section');
                    showSection(targetSection);
                });
            });
            
            // Show first section by default
            showSection('sqlConverter');
        });



// Function to update the current epoch time
function updateCurrentEpoch() {
    const currentEpochTime = Math.floor(Date.now() / 1000);
    document.getElementById('ecclock').textContent = currentEpochTime;
}
// Update the current epoch time every second
setInterval(updateCurrentEpoch, 1000);
// Initialize the current epoch time
updateCurrentEpoch();

// Function to copy the epoch timestamp to clipboard
function copyEpoch() {
    const epochText = document.getElementById('ecclock').textContent;
    navigator.clipboard.writeText(epochText).catch(err => {
        console.error('Failed to copy epoch time: ', err);
    });
}

// Visit Counter
function updateVisitCounter() {
  const currentYear = new Date().getFullYear();
  let visitCount = localStorage.getItem('visitCount');
  let storedYear = localStorage.getItem('visitYear');

  if (!visitCount || storedYear == null || currentYear !== parseInt(storedYear)) {
    visitCount = 0;
    storedYear = currentYear;
  } else {
    visitCount = parseInt(visitCount);
  }
  visitCount++;
  localStorage.setItem('visitCount', visitCount);
  localStorage.setItem('visitYear', currentYear);

  document.getElementById('visit-counter').innerText = `Visit count: ${visitCount}`;
}
// Call the function to update and display the visit counter
updateVisitCounter();



// Function to convert the entered epoch time to GMT, local time, and calculate relative time
function convertEpochTime() {
    const epochInput = document.getElementById('epochTime').value;
    const timeFormat = document.getElementById('timeFormat').value;
    const epochTime = parseInt(epochInput, 10);
    const timezoneSelect = document.getElementById('timezoneSelect').value;
    const dstOption = document.getElementById('dstSelect')?.value; // Optional DST dropdown

    if (!isNaN(epochTime)) {
        const baseDate = new Date(timeFormat === 'milliseconds' ? epochTime : epochTime * 1000);
        const gmtFormattedDate = baseDate.toISOString().replace('T', ' ').slice(0, 19) + ' UTC';
        const relativeTime = calculateRelativeTime(baseDate);

        // Adjust time for DST
        let dstMs = 0;
        if (dstOption === 'spring') {
            dstMs = -3600000; // Subtract 1 hour
        } else if (dstOption === 'fall') {
            dstMs = 3600000; // Add 1 hour
        }

        // IST, EST, SAST with DST adjustment
        const istDate = new Date(baseDate.getTime() + dstMs);
        const estDate = new Date(baseDate.getTime() + dstMs);
        const sastDate = new Date(baseDate.getTime() + dstMs);

        const istTime = new Date(istDate.toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }))
            .toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true });

        const estTime = new Date(estDate.toLocaleString('en-US', { timeZone: 'America/New_York' }))
            .toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true });

        const utcTime = new Date(baseDate.toLocaleString('en-US', { timeZone: 'UTC' }))
            .toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true });

        const sastTime = new Date(sastDate.toLocaleString('en-US', { timeZone: 'Africa/Johannesburg' }))
            .toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true });

        let resultText = `GMT: ${gmtFormattedDate}<br>Relative: ${relativeTime}<br>`;
        resultText += `IST: ${istTime} | EST/EDT: ${estTime} | UTC: ${utcTime} | SAST: ${sastTime}`;

        if (timezoneSelect) {
            const timezoneOffset = parseTimezoneOffset(timezoneSelect);
            const localDate = new Date(baseDate.getTime() + timezoneOffset * 60000 + dstMs);
            const localFormattedDate = localDate.toISOString().replace('T', ' ').slice(0, 19);
            resultText += `<br>Local Time: ${localFormattedDate} ${timezoneSelect}`;
        } else {
            resultText += `<br>Local Time: Please select a timezone.`;
        }

        document.getElementById('result').innerHTML = resultText;
    } else {
        document.getElementById('result').innerText = 'Invalid epoch time. Please enter a valid number.';
    }
}


function calculateRelativeTime(date) {
    const now = new Date();
    const diffMs = now - date;
    const diffSec = Math.floor(diffMs / 1000);
    const diffMin = Math.floor(diffSec / 60);
    const diffHr = Math.floor(diffMin / 60);
    const diffDays = Math.floor(diffHr / 24);

    if (diffMs > 0) {
        return diffDays > 0 ? `${diffDays} day(s) ago` :
               diffHr > 0 ? `${diffHr} hour(s) ago` :
               diffMin > 0 ? `${diffMin} minute(s) ago` :
               `${diffSec} second(s) ago`;
    } else {
        return 'In the future';
    }
}

function parseTimezoneOffset(timezone) {
    const match = timezone.match(/([+-])(\d{2}):(\d{2})/);
    if (match) {
        const sign = match[1] === '+' ? 1 : -1;
        const hours = parseInt(match[2], 10);
        const minutes = parseInt(match[3], 10);
        return sign * (hours * 60 + minutes);
    }
    return 0;
}

// Updated Function to Calculate Relative Time with Days Converted to Years
function calculateRelativeTime(date) {
    const now = new Date();
    const diffInSeconds = Math.floor((date - now) / 1000);
    const absDiffInSeconds = Math.abs(diffInSeconds);
    const absDiffInDays = Math.floor(absDiffInSeconds / 86400);

    // Helper function to format days into years if needed
    function formatDaysToYears(days) {
        if (days > 365) {
            const years = Math.floor(days / 365);
            const remainingDays = days % 365;
            return `${days} days | ${years} year${years > 1 ? 's' : ''}${remainingDays > 0 ? ' and ' + remainingDays + ' day' + (remainingDays > 1 ? 's' : '') : ''}`;
        }
        return `${days} day${days > 1 ? 's' : ''}`;
    }

    if (diffInSeconds < 0) { // Past dates
        if (absDiffInSeconds < 60) {
            return 'A few seconds ago';
        } else if (absDiffInSeconds < 3600) {
            const minutes = Math.floor(absDiffInSeconds / 60);
            return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
        } else if (absDiffInSeconds < 86400 && absDiffInSeconds >= 82800) { // Close to a day
            return 'A day ago';
        } else if (absDiffInSeconds < 86400) {
            const hours = Math.floor(absDiffInSeconds / 3600);
            return `${hours} hour${hours > 1 ? 's' : ''} ago`;
        } else {
            // Return days and years if applicable
            return `${formatDaysToYears(absDiffInDays)} ago`;
        }
    } else { // Future dates
        if (absDiffInSeconds < 60) {
            return 'In a few seconds';
        } else if (absDiffInSeconds < 3600) {
            const minutes = Math.floor(absDiffInSeconds / 60);
            return `In ${minutes} minute${minutes > 1 ? 's' : ''}`;
        } else if (absDiffInSeconds < 86400 && absDiffInSeconds >= 82800) {
            return 'In a day';
        } else if (absDiffInSeconds < 86400) {
            const hours = Math.floor(absDiffInSeconds / 3600);
            return `In ${hours} hour${hours > 1 ? 's' : ''}`;
        } else {
            // Return days and years if applicable
            return `In ${formatDaysToYears(absDiffInDays)}`;
        }
    }
}

// Example helper function to parse timezone offsets (update according to your needs)
function parseTimezoneOffset(offset) {
    // Simple parsing of timezone offset string like "+05:30" or "-03:00"
    const sign = offset.startsWith('-') ? -1 : 1;
    const [hours, minutes] = offset.replace(/[+-]/, '').split(':').map(Number);
    return sign * (hours * 60 + minutes);
}

// Initialize the conversion when the page loads
window.onload = function() {
    document.getElementById('timezoneSelect').addEventListener('change', convertEpochTime);
};

// Function for Block Conversion
function convertToBlock() {
    const fullXmlTextarea = document.getElementById('fullXml');
    const blockXmlTextarea = document.getElementById('blockXml');
    const errorMsg = document.getElementById('errorMsg');
    
    try {
        // Input validation
        if (!fullXmlTextarea.value.trim()) {
            throw new Error("Please enter XML content.");
        }
        
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(fullXmlTextarea.value, "text/xml");
        
        // Check for XML parsing errors
        const parserErrors = xmlDoc.getElementsByTagName("parsererror");
        if (parserErrors.length > 0) {
            const errorText = parserErrors[0].textContent;
            
            // Clean up the error message by removing browser-specific text
            let cleanErrorText = errorText
                .replace(/This page contains the following errors:/gi, 'This page errors:')
                .replace(/Below is a rendering of the page up to the first error\./gi, '')
                .trim();
            
            // Try to extract line and column information from parser error
            const lineMatch = cleanErrorText.match(/line (\d+)/i);
            const columnMatch = cleanErrorText.match(/column (\d+)/i);
            
            let errorMsg = "Invalid XML format";
            if (lineMatch && columnMatch) {
                errorMsg += ` at line ${lineMatch[1]}, column ${columnMatch[1]}`;
            }
            errorMsg += ": " + cleanErrorText;
            
            throw new Error(errorMsg);
        }
        
        // Extract the BlockNumber value separately
        const blockNumberElement = xmlDoc.querySelector('BlockNumber');
        const blockNumber = blockNumberElement ? blockNumberElement.textContent.trim() : '';
        
        // Improved recursive function to extract all text content except <BlockNumber>
        function extractTextContent(node) {
            let textParts = [];
            
            if (node.nodeType === Node.ELEMENT_NODE && node.nodeName !== 'BlockNumber') {
                // Process all child nodes
                for (let i = 0; i < node.childNodes.length; i++) {
                    const childText = extractTextContent(node.childNodes[i]);
                    if (childText) {
                        textParts.push(childText);
                    }
                }
            } else if (node.nodeType === Node.TEXT_NODE) {
                const trimmedValue = node.nodeValue.trim();
                if (trimmedValue) {
                    return trimmedValue;
                }
            }
            
            return textParts.length > 0 ? textParts.join(',') : '';
        }
        
        // Extract text content
        let blockXml = extractTextContent(xmlDoc.documentElement);
        
        // Handle case where no text content is found
        if (!blockXml) {
            blockXml = '';
        }
        
        // Output BlockNumber and BlockData separately
        const result = `<BlockNumber>${blockNumber}</BlockNumber>\n<BlockData>${blockXml}</BlockData>`;
        blockXmlTextarea.value = result;
        
        // Clear any previous error messages and styling
        errorMsg.innerHTML = '';
        errorMsg.style.color = "";
        errorMsg.style.fontWeight = "";
        fullXmlTextarea.classList.remove('error-highlight');
        
    } catch (error) {
        // Enhanced error handling - preserve detailed error messages
        let errorMessage = error.message;
        
        // Only provide generic messages for cases where we don't have specific details
        if (error.message === 'Please enter XML content.') {
            // Keep the input validation message as is
            errorMessage = error.message;
        } else if (error.message.includes('line') && error.message.includes('column')) {
            // Keep detailed line/column error messages as they are
            errorMessage = error.message;
        } else if (error.message.includes('parsererror') && !error.message.includes('line')) {
            // Only use generic message if we don't have line/column info
            errorMessage = "Invalid XML format. Please check for unclosed tags, missing quotes, or special characters.";
        } else if (error.message.includes('unexpected end of input')) {
            errorMessage = "Incomplete XML structure. Please check if all tags are properly closed.";
        } else if (error.message.includes('Invalid XML format:') && !error.message.includes('line')) {
            // Generic fallback only if no specific location info
            errorMessage = "Invalid XML format. Please check your XML structure.";
        }
        
        // Display the error message in red and bold
        errorMsg.innerHTML = errorMessage;
        errorMsg.style.color = "red";
        errorMsg.style.fontWeight = "bold";
        
        // Add error styling to textarea
        fullXmlTextarea.classList.add('error-highlight');
        
        // Clear the output textarea on error
        blockXmlTextarea.value = '';
        
        // Highlight error position in textarea
        highlightErrorLine(fullXmlTextarea, errorMessage);
    }
}

// Helper function for error highlighting with line/character position
function highlightErrorLine(textarea, errorMessage) {
    try {
        const xmlContent = textarea.value;
        let errorPosition = findXMLErrorPosition(xmlContent);
        
        if (errorPosition) {
            // Set cursor to error position
            textarea.focus();
            textarea.setSelectionRange(errorPosition.start, errorPosition.end);
            
            // Scroll to the error position
            const lines = xmlContent.substring(0, errorPosition.start).split('\n');
            const lineNumber = lines.length;
            const charPosition = lines[lines.length - 1].length + 1;
            
            console.log(`Error at line ${lineNumber}, character ${charPosition}`);
            
            // You could also display this in the UI
            const errorMsg = document.getElementById('errorMsg');
            errorMsg.innerHTML += `<br><small>Error location: Line ${lineNumber}, Character ${charPosition}</small>`;
        } else {
            // Fallback: select all text
            textarea.focus();
            textarea.select();
        }
        
    } catch (e) {
        console.warn('Could not highlight error line:', e.message);
        textarea.focus();
        textarea.select();
    }
}

// Function to find XML error position
function findXMLErrorPosition(xmlString) {
    // Try to parse character by character to find exact error location
    let position = 0;
    let inTag = false;
    let inQuotes = false;
    let quoteChar = '';
    let tagStack = [];
    
    try {
        for (let i = 0; i < xmlString.length; i++) {
            const char = xmlString[i];
            const nextChar = xmlString[i + 1];
            
            if (char === '<' && !inQuotes) {
                inTag = true;
                
                // Check for closing tag
                if (nextChar === '/') {
                    // Find tag name
                    let tagEnd = xmlString.indexOf('>', i);
                    if (tagEnd === -1) {
                        return { start: i, end: i + 1, type: 'unclosed_tag' };
                    }
                    
                    let tagName = xmlString.substring(i + 2, tagEnd).trim();
                    let expectedTag = tagStack.pop();
                    
                    if (tagName !== expectedTag) {
                        return { 
                            start: i, 
                            end: tagEnd + 1, 
                            type: 'mismatched_tag',
                            expected: expectedTag,
                            found: tagName
                        };
                    }
                } else if (nextChar !== '!' && nextChar !== '?') {
                    // Opening tag
                    let tagEnd = xmlString.indexOf('>', i);
                    if (tagEnd === -1) {
                        return { start: i, end: i + 1, type: 'unclosed_tag' };
                    }
                    
                    let tagContent = xmlString.substring(i + 1, tagEnd);
                    let tagName = tagContent.split(/\s/)[0];
                    
                    // Check if self-closing
                    if (!tagContent.endsWith('/')) {
                        tagStack.push(tagName);
                    }
                }
            } else if (char === '>' && inTag && !inQuotes) {
                inTag = false;
            } else if ((char === '"' || char === "'") && inTag) {
                if (!inQuotes) {
                    inQuotes = true;
                    quoteChar = char;
                } else if (char === quoteChar) {
                    inQuotes = false;
                    quoteChar = '';
                }
            }
            
            // Check for invalid characters
            if (!inTag && !inQuotes && char === '<' && xmlString.substring(i).match(/^<[^a-zA-Z!/?]/)) {
                return { start: i, end: i + 1, type: 'invalid_character' };
            }
        }
        
        // Check for unclosed tags
        if (tagStack.length > 0) {
            return { 
                start: xmlString.length - 1, 
                end: xmlString.length, 
                type: 'unclosed_tags',
                unclosedTags: tagStack
            };
        }
        
    } catch (e) {
        // Fallback parsing method using DOMParser error
        return parseErrorFromDOMParser(xmlString);
    }
    
    return null;
}

// Alternative method using DOMParser error messages
function parseErrorFromDOMParser(xmlString) {
    try {
        const parser = new DOMParser();
        const doc = parser.parseFromString(xmlString, "text/xml");
        const errorElement = doc.querySelector('parsererror');
        
        if (errorElement) {
            const errorText = errorElement.textContent;
            
            // Try to extract line and column from error message
            const lineMatch = errorText.match(/line (\d+)/i);
            const columnMatch = errorText.match(/column (\d+)/i);
            
            if (lineMatch && columnMatch) {
                const lineNumber = parseInt(lineMatch[1]);
                const columnNumber = parseInt(columnMatch[1]);
                
                // Convert line/column to character position
                const lines = xmlString.split('\n');
                let position = 0;
                
                for (let i = 0; i < lineNumber - 1 && i < lines.length; i++) {
                    position += lines[i].length + 1; // +1 for newline character
                }
                position += columnNumber - 1;
                
                return {
                    start: Math.max(0, position - 1),
                    end: Math.min(xmlString.length, position + 10),
                    line: lineNumber,
                    column: columnNumber,
                    type: 'parser_error'
                };
            }
        }
    } catch (e) {
        // If all else fails, return null
    }
    
    return null;
}

//Function for Json conversion
function convertToJson() {
    const queryStringTextarea = document.getElementById('queryString');
    const jsonOutputTextarea = document.getElementById('jsonOutput');
    const errorMsg = document.getElementById('jsonErrorMsg');
    const queryString = queryStringTextarea.value.trim();

    try {
        const params = new URLSearchParams(queryString);
        const jsonObject = {};
        for (const [key, value] of params.entries()) {
            jsonObject[key] = value;
        }

        jsonOutputTextarea.value = JSON.stringify(jsonObject, null, 2);
        errorMsg.textContent = '';
    } catch (error) {
        errorMsg.textContent = "Error converting query string to JSON. Please check your input.";
    }
}

// Function for URL Encode/Decode
function urlEncodeDecode() {
    const queryStringTextarea = document.getElementById('queryString');
    const jsonOutputTextarea = document.getElementById('jsonOutput');
    const errorMsg = document.getElementById('jsonErrorMsg');
    const inputText = queryStringTextarea.value.trim();
    
    if (!inputText) {
        errorMsg.textContent = "Please enter text to encode/decode.";
        return;
    }
    
    try {
        // Try to decode first - if it's already encoded
        const decoded = decodeURIComponent(inputText);
        
        // If decoding changed the string, it was encoded
        if (decoded !== inputText) {
            jsonOutputTextarea.value = decoded;
            errorMsg.textContent = "Text has been URL decoded.";
        } else {
            // If no change, encode it
            const encoded = encodeURIComponent(inputText);
            jsonOutputTextarea.value = encoded;
            errorMsg.textContent = "Text has been URL encoded.";
        }
    } catch (error) {
        // If decoding fails, try encoding
        try {
            const encoded = encodeURIComponent(inputText);
            jsonOutputTextarea.value = encoded;
            errorMsg.textContent = "Text has been URL encoded.";
        } catch (encodeError) {
            errorMsg.textContent = "Error processing text for URL encoding/decoding.";
        }
    }
}

// Function for JSON validation
function validateJson() {
    const queryStringTextarea = document.getElementById('queryString');
    const jsonOutputTextarea = document.getElementById('jsonOutput');
    const errorMsg = document.getElementById('jsonErrorMsg');
    const inputText = queryStringTextarea.value.trim();
    
    if (!inputText) {
        errorMsg.textContent = "Please enter JSON text to validate.";
        return;
    }
    
    try {
        // Parse the JSON to validate it
        const parsedJson = JSON.parse(inputText);
        
        // If parsing succeeds, format and display the JSON
        const formattedJson = JSON.stringify(parsedJson, null, 2);
        jsonOutputTextarea.value = formattedJson;
        errorMsg.textContent = "✓ Valid JSON! Formatted output displayed below.";
        errorMsg.style.color = "green";
        
        // Reset error color after a few seconds
        setTimeout(() => {
            errorMsg.style.color = "";
        }, 3000);
        
    } catch (error) {
        errorMsg.textContent = `✗ Invalid JSON: ${error.message}`;
        errorMsg.style.color = "red";
        jsonOutputTextarea.value = "";
        
        // Reset error color after a few seconds
        setTimeout(() => {
            errorMsg.style.color = "";
        }, 5000);
    }
}

function clearText(inputId, outputId, errorId) {
    document.getElementById(inputId).value = '';
    document.getElementById(outputId).value = '';
    document.getElementById(errorId).textContent = '';
}

function highlightErrorLine(textarea, errorMessage) {
    textarea.classList.add('error-highlight');
    // You can add more logic to find the exact line with the error if needed
}

// Add event listener to all elements with the class 'pasteable'
document.querySelectorAll('.pasteable').forEach(function(textbox) {
    textbox.addEventListener('contextmenu', function(event) {
        event.preventDefault(); // Prevent the default context menu from appearing
        navigator.clipboard.readText().then(function(text) {
            // Insert the copied text into the clicked textbox
            event.target.value = text;
        }).catch(function(err) {
            console.error('Failed to read clipboard contents: ', err);
        });
    });
});

function calculateNewEpochTime() {
    const epochTimeInput = document.getElementById('epochTime');
    const minutesToSubtractInput = document.getElementById('minutesToSubtract');
    const epochTime = parseInt(epochTimeInput.value);
    const minutesToSubtract = parseInt(minutesToSubtractInput.value);

    if (isNaN(epochTime) || isNaN(minutesToSubtract)) {
        alert("Please enter valid data for both textboxes.");
        return;
    }
    // Convert epoch time to JavaScript date
    const date = new Date(epochTime * 1000);
    // Subtract the minutes
    date.setMinutes(date.getMinutes() - minutesToSubtract);
    // Convert back to epoch time
    const newEpochTime = Math.floor(date.getTime() / 1000);

    // Display results
    document.getElementById('oldEpochTime').innerText = epochTime;
    document.getElementById('newEpochTime').innerText = newEpochTime;
    document.getElementById('timeDiff').innerText = minutesToSubtract;
    document.getElementById('results').style.display = 'block';
}

// Function to clear results on page load
function clearResultsOnPageLoad() {
    document.getElementById('results').style.display = 'none'; // Hide the results section
    document.getElementById('oldEpochTime').innerText = '';
    document.getElementById('newEpochTime').innerText = '';
    document.getElementById('timeDiff').innerText = '';
}
// Call this function when the page loads
window.onload = clearResultsOnPageLoad;

// Function to fill form with current date and time
        function fillCurrentDateTime() {
            const now = new Date();
            
            // Fill the form fields with current date and time
            document.getElementById('yyyy').value = now.getFullYear();
            document.getElementById('mm').value = String(now.getMonth() + 1).padStart(2, '0');
            document.getElementById('dd').value = String(now.getDate()).padStart(2, '0');
            document.getElementById('hh').value = String(now.getHours()).padStart(2, '0');
            document.getElementById('mn').value = String(now.getMinutes()).padStart(2, '0');
            document.getElementById('ss').value = String(now.getSeconds()).padStart(2, '0');
        }

    // Function to convert Human date to Epoch time
    function HumanToEpochTZ() {
        // Prevent the form from clearing inputs by stopping default behavior
        if (event) event.preventDefault();

        const form = document.getElementById('hf');
        const year = parseInt(form.yyyy.value, 10);
        const month = parseInt(form.mm.value, 10) - 1; // JavaScript months are 0-based
        const day = parseInt(form.dd.value, 10);
        const hour = parseInt(form.hh.value, 10);
        const minute = parseInt(form.mn.value, 10);
        const second = parseInt(form.ss.value, 10);
        const timezone = parseInt(form.tz.value, 10);  // This now can be 0 (GMT) or 330 (IST)

        // Check if any input is invalid (NaN or out of valid ranges)
        if (isNaN(year) || isNaN(month) || isNaN(day) || isNaN(hour) || isNaN(minute) || isNaN(second) || isNaN(timezone)) {
            document.getElementById('hf-result').textContent = 'Enter valid data to the textboxes.';
            return;
        }

        // Create a date object using the provided values
        const date = new Date(Date.UTC(year, month, day, hour, minute, second));

        // Adjust for the selected timezone offset (in minutes)
        const epochTime = Math.floor(date.getTime() / 1000) - (timezone * 60);

        // Display the calculated epoch time
        document.getElementById('hf-result').textContent = `Epoch Time: ${epochTime}`;
    }

    // Fill the form with current date and time when the page loads
    window.addEventListener('load', fillCurrentDateTime);


 // Function to convert Epoch time to Human-readable date
function EpochToHumanTZ() {
    const epochInput = parseInt(document.getElementById('epochInput').value, 10);
    const timezoneSelect = parseInt(document.getElementById('timezoneSelect').value, 10); // Can be 0 (GMT) or 330 (IST)

    // Check if the input is valid
    if (isNaN(epochInput)) {
        document.getElementById('et-result').textContent = 'Invalid epoch time';
        return;
    }

    // Create date from epoch time
    const date = new Date(epochInput * 1000);

    // Adjust for the selected timezone offset (in minutes)
    date.setMinutes(date.getMinutes() + timezoneSelect);

    // Format the result as a human-readable date
    const formattedDate = date.toUTCString();

    // Display the formatted date
    document.getElementById('et-result').textContent = `Human Date: ${formattedDate}`;
}

        // Function to clear results on page load
        function clearResultsOnPageLoad() {
         document.getElementById('results').style.display = 'none'; // Hide the results section
         document.getElementById('oldEpochTime').innerText = '';
         document.getElementById('newEpochTime').innerText = '';
         document.getElementById('timeDiff').innerText = '';
}
        // Call this function when the page loads
        window.onload = clearResultsOnPageLoad;

    //Different timezones 
document.addEventListener('DOMContentLoaded', function () {
    // Function to update time for all timezones
    function updateTime() {
        try {
            // Fetching current time for each timezone
            const istTime = new Date().toLocaleTimeString('en-US', {
                timeZone: 'Asia/Kolkata',
                hour: 'numeric',
                minute: 'numeric',
                second: 'numeric',
                hour12: true
            });

            const estTime = new Date().toLocaleTimeString('en-US', {
                timeZone: 'America/New_York',
                hour: 'numeric',
                minute: 'numeric',
                second: 'numeric',
                hour12: true
            });

            const utcTime = new Date().toLocaleTimeString('en-US', {
                timeZone: 'UTC',
                hour: 'numeric',
                minute: 'numeric',
                second: 'numeric',
                hour12: true
            });

            const sastTime = new Date().toLocaleTimeString('en-US', {
                timeZone: 'Africa/Johannesburg',
                hour: 'numeric',
                minute: 'numeric',
                second: 'numeric',
                hour12: true
            });

            // Displaying the time for each timezone
            document.getElementById('istTime').textContent = istTime;
            document.getElementById('estTime').textContent = estTime;
            document.getElementById('utcTime').textContent = utcTime;
            document.getElementById('sastTime').textContent = sastTime;
        } catch (error) {
            console.error("Error updating time zones:", error);
        }
    }

    // Updating the time every second
    setInterval(updateTime, 1000);
    updateTime(); // Initial call to display time immediately
});

// Function to generate a cryptographically secure random API key
function generateApiKey() {
    const length = 32; // Length of the API key
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_-+=<>?';    
    // Create a secure random array of bytes
    const randomValues = new Uint8Array(length);
    window.crypto.getRandomValues(randomValues);
    // Generate the API key by mapping the random byte values to the character set
    let apiKey = '';
    for (let i = 0; i < length; i++) {
        apiKey += characters.charAt(randomValues[i] % characters.length); // Map to valid character
    }
    // Display the generated API key in the designated input field
    document.getElementById('apiKeyOutput').value = apiKey;
}

// Select all anchor tags within the <nav> element
const navLinks = document.querySelectorAll("nav a");
// Add a click event listener to each link
navLinks.forEach(function (link) {
    link.addEventListener("click", function () {
        // Remove 'active' class from all links
        navLinks.forEach(nav => nav.classList.remove("active"));
        // Add 'active' class to the clicked link
        this.classList.add("active");
    });
});

// Minutes to Seconds 
function calculateSeconds() {
    const hours = parseInt(document.getElementById('hours').value);
    const minutes = parseInt(document.getElementById('minutes').value);
    // Convert time to total seconds
    const totalSeconds = (hours * 3600) + (minutes * 60);
    // Display the result
    document.getElementById('result2').innerText = `Total time: ${totalSeconds} seconds`;
  }

//Generating values for Hours and Minutes
const hoursSelect = document.getElementById('hours');
// Generate options for hours (0 to 12)
for (let i = 0; i <= 23; i++) {
    const option = document.createElement('option');
    option.value = i;
    option.textContent = i;
    hoursSelect.appendChild(option);
}

const minutesSelect = document.getElementById('minutes');
// Generate options for minutes (0 to 59)
for (let i = 0; i <= 59; i++) {
    const option = document.createElement('option');
    option.value = i;
    option.textContent = i;
    minutesSelect.appendChild(option);
}

// Timezone data: [Offset value, GMT representation, Offset in seconds]
const timezones = [
    ["-12:00", "GMT-12:00", -43200],
    ["-11:00", "GMT-11:00", -39600],
    ["-10:00", "GMT-10:00", -36000],
    ["-09:30", "GMT-09:30", -34200],
    ["-09:00", "GMT-09:00", -32400],
    ["-08:00", "GMT-08:00", -28800],
    ["-07:00", "GMT-07:00", -25200],
    ["-06:00", "GMT-06:00", -21600],
    ["-05:00", "GMT-05:00", -18000],
    ["-04:00", "GMT-04:00", -14400],
    ["-03:30", "GMT-03:30", -12600],
    ["-03:00", "GMT-03:00", -10800],
    ["-02:00", "GMT-02:00", -7200],
    ["-01:00", "GMT-01:00", -3600],
    ["+00:00", "GMT+00:00", 0],
    ["+01:00", "GMT+01:00", 3600],
    ["+02:00", "GMT+02:00", 7200],
    ["+03:00", "GMT+03:00", 10800],
    ["+03:30", "GMT+03:30", 12600],
    ["+04:00", "GMT+04:00", 14400],
    ["+04:30", "GMT+04:30", 16200],
    ["+05:00", "GMT+05:00", 18000],
    ["+05:30", "GMT+05:30", 19800],
    ["+06:00", "GMT+06:00", 21600],
    ["+06:30", "GMT+06:30", 23400],
    ["+07:00", "GMT+07:00", 25200],
    ["+08:00", "GMT+08:00", 28800],
    ["+08:30", "GMT+08:30", 30600],
    ["+09:00", "GMT+09:00", 32400],
    ["+09:30", "GMT+09:30", 34200],
    ["+10:00", "GMT+10:00", 36000],
    ["+10:30", "GMT+10:30", 37800],
    ["+11:00", "GMT+11:00", 39600],
    ["+12:00", "GMT+12:00", 43200]
];
const timezoneSelect = document.getElementById('timezoneSelect');
// Iterate through the timezone array and create <option> elements
timezones.forEach(([value, label, offset]) => {
    const option = document.createElement('option');
    option.value = value;
    option.textContent = `${label} (${offset})`;
    timezoneSelect.appendChild(option);
});

//Enhanced Data Comparer functions with word-level highlighting
function compareTexts() {
    const originalText = document.getElementById('originalText').value;
    const modifiedText = document.getElementById('modifiedText').value;
    
    if (!originalText && !modifiedText) {
        alert('Please enter text in both fields to compare.');
        return;
    }
    
    // Split texts into lines for comparison
    const originalLines = originalText.split('\n');
    const modifiedLines = modifiedText.split('\n');
    
    // Perform diff comparison
    const diff = performDiff(originalLines, modifiedLines);
    
    // Display results with word-level highlighting
    displayComparisonResult(diff, originalText, modifiedText);
    
    // Calculate and display statistics
    calculateStats(diff);
    
    // Show result sections
    document.getElementById('comparisonResult').style.display = 'block';
    document.getElementById('comparisonStats').style.display = 'flex';
}

function performDiff(original, modified) {
    const diff = [];
    let i = 0, j = 0;
    
    while (i < original.length || j < modified.length) {
        if (i >= original.length) {
            // All remaining lines in modified are additions
            diff.push({
                type: 'added',
                originalLine: null,
                modifiedLine: modified[j],
                originalIndex: -1,
                modifiedIndex: j
            });
            j++;
        } else if (j >= modified.length) {
            // All remaining lines in original are deletions
            diff.push({
                type: 'removed',
                originalLine: original[i],
                modifiedLine: null,
                originalIndex: i,
                modifiedIndex: -1
            });
            i++;
        } else if (original[i] === modified[j]) {
            // Lines are identical
            diff.push({
                type: 'unchanged',
                originalLine: original[i],
                modifiedLine: modified[j],
                originalIndex: i,
                modifiedIndex: j
            });
            i++;
            j++;
        } else {
            // Lines are different - try to find the best match
            let foundMatch = false;
            
            // Look ahead to see if we can find a match
            for (let k = 1; k <= Math.min(5, Math.max(original.length - i, modified.length - j)); k++) {
                if (i + k < original.length && original[i + k] === modified[j]) {
                    // Found match in original, current lines in original are deletions
                    for (let l = 0; l < k; l++) {
                        diff.push({
                            type: 'removed',
                            originalLine: original[i + l],
                            modifiedLine: null,
                            originalIndex: i + l,
                            modifiedIndex: -1
                        });
                    }
                    i += k;
                    foundMatch = true;
                    break;
                } else if (j + k < modified.length && original[i] === modified[j + k]) {
                    // Found match in modified, current lines in modified are additions
                    for (let l = 0; l < k; l++) {
                        diff.push({
                            type: 'added',
                            originalLine: null,
                            modifiedLine: modified[j + l],
                            originalIndex: -1,
                            modifiedIndex: j + l
                        });
                    }
                    j += k;
                    foundMatch = true;
                    break;
                }
            }
            
            if (!foundMatch) {
                // No match found, treat as modification
                diff.push({
                    type: 'modified',
                    originalLine: original[i],
                    modifiedLine: modified[j],
                    originalIndex: i,
                    modifiedIndex: j
                });
                i++;
                j++;
            }
        }
    }
    
    return diff;
}

// New function to perform word-level diff on two strings
function getWordLevelDiff(str1, str2) {
    if (!str1 && !str2) return { original: '', modified: '', changes: [] };
    if (!str1) return { 
        original: '', 
        modified: `<span class="diff-word-added" title="ADD: '${escapeHtml(str2)}'">${escapeHtml(str2)}</span>`,
        changes: [{ type: 'add', text: str2, position: 0 }]
    };
    if (!str2) return { 
        original: `<span class="diff-word-highlight" title="REMOVE: '${escapeHtml(str1)}'">${escapeHtml(str1)}</span>`, 
        modified: '',
        changes: [{ type: 'remove', text: str1, position: 0 }]
    };
    
    // Split into tokens (words, spaces, punctuation)
    const tokens1 = tokenize(str1);
    const tokens2 = tokenize(str2);
    
    // Perform word-level LCS (Longest Common Subsequence) diff
    const diffResult = computeWordDiff(tokens1, tokens2);
    
    return diffResult;
}

// Tokenize text into words, spaces, and punctuation
function tokenize(text) {
    // Split by word boundaries but keep delimiters
    return text.split(/(\s+|[^\w\s])/g).filter(token => token.length > 0);
}

// Compute word-level diff using dynamic programming approach
function computeWordDiff(tokens1, tokens2) {
    const m = tokens1.length;
    const n = tokens2.length;
    
    // Create LCS table
    const lcs = Array(m + 1).fill(null).map(() => Array(n + 1).fill(0));
    
    // Fill LCS table
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (tokens1[i - 1] === tokens2[j - 1]) {
                lcs[i][j] = lcs[i - 1][j - 1] + 1;
            } else {
                lcs[i][j] = Math.max(lcs[i - 1][j], lcs[i][j - 1]);
            }
        }
    }
    
    // Backtrack to find the diff
    let i = m, j = n;
    const originalResult = [];
    const modifiedResult = [];
    const changes = [];
    let position = 0;
    
    while (i > 0 || j > 0) {
        if (i > 0 && j > 0 && tokens1[i - 1] === tokens2[j - 1]) {
            // Common token
            originalResult.unshift(escapeHtml(tokens1[i - 1]));
            modifiedResult.unshift(escapeHtml(tokens2[j - 1]));
            i--;
            j--;
        } else if (i > 0 && (j === 0 || lcs[i - 1][j] >= lcs[i][j - 1])) {
            // Token to be removed from original (highlight in original, show instruction)
            const token = tokens1[i - 1];
            originalResult.unshift(`<span class="diff-word-highlight" title="REMOVE: '${escapeHtml(token)}'">${escapeHtml(token)}</span>`);
            changes.unshift({ type: 'remove', text: token, position: position });
            i--;
        } else {
            // Token to be added in modified (show in modified, show instruction)
            const token = tokens2[j - 1];
            modifiedResult.unshift(`<span class="diff-word-added" title="ADD: '${escapeHtml(token)}'">${escapeHtml(token)}</span>`);
            changes.unshift({ type: 'add', text: token, position: position });
            j--;
        }
        position++;
    }
    
    return {
        original: originalResult.join(''),
        modified: modifiedResult.join(''),
        changes: changes
    };
}

function displayComparisonResult(diff, originalText, modifiedText) {
    const originalResult = document.getElementById('originalResult');
    const modifiedResult = document.getElementById('modifiedResult');
    const unifiedDiff = document.getElementById('unifiedDiff');
    
    let originalHtml = '';
    let modifiedHtml = '';
    let unifiedHtml = '';
    let changeInstructions = [];
    let lineNumber = 1;
    
    diff.forEach((item, index) => {
        switch (item.type) {
            case 'unchanged':
                originalHtml += escapeHtml(item.originalLine) + '\n';
                modifiedHtml += escapeHtml(item.modifiedLine) + '\n';
                unifiedHtml += ` ${escapeHtml(item.originalLine)}\n`;
                lineNumber++;
                break;
            case 'removed':
                originalHtml += `<span class="diff-removed">${escapeHtml(item.originalLine)}</span>\n`;
                unifiedHtml += `<span class="diff-line-removed">-${escapeHtml(item.originalLine)}</span>\n`;
                changeInstructions.push(`Line ${lineNumber}: DELETE entire line "${item.originalLine}"`);
                break;
            case 'added':
                modifiedHtml += `<span class="diff-added">${escapeHtml(item.modifiedLine)}</span>\n`;
                unifiedHtml += `<span class="diff-line-added">+${escapeHtml(item.modifiedLine)}</span>\n`;
                changeInstructions.push(`Line ${lineNumber}: ADD new line "${item.modifiedLine}"`);
                lineNumber++;
                break;
            case 'modified':
                // Apply word-level highlighting for modified lines
                const wordDiff = getWordLevelDiff(item.originalLine, item.modifiedLine);
                
                // Use line-level highlighting as base, then add word-level highlighting
                originalHtml += `<span class="diff-removed">${wordDiff.original}</span>\n`;
                modifiedHtml += `<span class="diff-added">${wordDiff.modified}</span>\n`;
                
                unifiedHtml += `<span class="diff-line-removed">-${wordDiff.original}</span>\n`;
                unifiedHtml += `<span class="diff-line-added">+${wordDiff.modified}</span>\n`;
                
                // Generate change instructions for this line
                if (wordDiff.changes && wordDiff.changes.length > 0) {
                    wordDiff.changes.forEach(change => {
                        if (change.type === 'remove') {
                            changeInstructions.push(`Line ${lineNumber}: REMOVE "${change.text}"`);
                        } else if (change.type === 'add') {
                            changeInstructions.push(`Line ${lineNumber}: ADD "${change.text}"`);
                        }
                    });
                }
                lineNumber++;
                break;
        }
    });
    
    originalResult.innerHTML = originalHtml;
    modifiedResult.innerHTML = modifiedHtml;
    unifiedDiff.innerHTML = unifiedHtml;
    
    // Display change instructions
    displayChangeInstructions(changeInstructions);
}

function displayChangeInstructions(instructions) {
    // Create or update the change instructions section
    let instructionsDiv = document.getElementById('changeInstructions');
    if (!instructionsDiv) {
        instructionsDiv = document.createElement('div');
        instructionsDiv.id = 'changeInstructions';
        instructionsDiv.className = 'change-instructions';
        
        const instructionsTitle = document.createElement('h4');
        instructionsTitle.textContent = 'Change Instructions';
        instructionsDiv.appendChild(instructionsTitle);
        
        const instructionsList = document.createElement('ol');
        instructionsList.id = 'instructionsList';
        instructionsDiv.appendChild(instructionsList);
        
        // Insert after the unified diff
        const unifiedDiffDiv = document.querySelector('.unified-diff');
        unifiedDiffDiv.parentNode.insertBefore(instructionsDiv, unifiedDiffDiv.nextSibling);
    }
    
    const instructionsList = document.getElementById('instructionsList');
    instructionsList.innerHTML = '';
    
    if (instructions.length === 0) {
        instructionsList.innerHTML = '<li class="no-changes">No changes required - texts are identical</li>';
    } else {
        instructions.forEach(instruction => {
            const li = document.createElement('li');
            li.className = 'instruction-item';
            li.innerHTML = instruction;
            instructionsList.appendChild(li);
        });
    }
    
    instructionsDiv.style.display = 'block';
}

function calculateStats(diff) {
    let additions = 0;
    let deletions = 0;
    let modifications = 0;
    
    diff.forEach(item => {
        switch (item.type) {
            case 'added':
                additions++;
                break;
            case 'removed':
                deletions++;
                break;
            case 'modified':
                modifications++;
                break;
        }
    });
    
    document.getElementById('additionsCount').textContent = additions;
    document.getElementById('deletionsCount').textContent = deletions;
    document.getElementById('modificationsCount').textContent = modifications;
}

function clearComparison() {
    document.getElementById('originalText').value = '';
    document.getElementById('modifiedText').value = '';
    document.getElementById('originalResult').innerHTML = '';
    document.getElementById('modifiedResult').innerHTML = '';
    document.getElementById('unifiedDiff').innerHTML = '';
    document.getElementById('comparisonResult').style.display = 'none';
    document.getElementById('comparisonStats').style.display = 'none';
    
    // Clear change instructions
    const instructionsDiv = document.getElementById('changeInstructions');
    if (instructionsDiv) {
        instructionsDiv.style.display = 'none';
    }
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Auto-detect language based on code content
// Universal indentation helper
function applyUniversalIndentation(code, language) {
    const lines = code.split('\n');
    let indentLevel = 0;
    const indentSize = 4; // 4 spaces for all languages
    const result = [];
    
    for (let i = 0; i < lines.length; i++) {
        let line = lines[i].trim();
        if (!line) {
            result.push(''); // Preserve empty lines
            continue;
        }
        
        // Language-specific indent decrease logic
        const shouldDecreaseIndent = shouldDecreaseIndentBefore(line, language);
        if (shouldDecreaseIndent) {
            indentLevel = Math.max(0, indentLevel - 1);
        }
        
        // Apply indentation
        const indent = ' '.repeat(indentLevel * indentSize);
        result.push(indent + line);
        
        // Language-specific indent increase logic
        const shouldIncreaseIndent = shouldIncreaseIndentAfter(line, language);
        if (shouldIncreaseIndent) {
            indentLevel++;
        }
    }
    
    return result.join('\n');
}

// Check if indent should decrease before this line
function shouldDecreaseIndentBefore(line, language) {
    switch (language) {
        case 'sql':
            return /^\s*(END|ELSE|ELSIF|WHEN)\b/i.test(line);
        case 'javascript':
        case 'css':
        case 'java':
        case 'c':
        case 'php':
            return line.startsWith('}') || line.includes('} else') || line.includes('} catch') || line.includes('} finally');
        case 'python':
            // Python uses consistent indentation, handled differently
            return false;
        case 'xml':
        case 'html':
            return /^\s*<\//.test(line);
        default:
            return line.startsWith('}') || line.startsWith('END') || line.startsWith('</');
    }
}

// Check if indent should increase after this line
function shouldIncreaseIndentAfter(line, language) {
    switch (language) {
        case 'sql':
            return /\b(BEGIN|IF|WHILE|FOR|CASE|WHEN|ELSE|ELSIF|CREATE|ALTER|WITH)\b/i.test(line) ||
                   line.includes('(') && !line.includes(')');
        case 'javascript':
        case 'java':
        case 'c':
        case 'php':
            return (line.includes('{') && !line.includes('}')) ||
                   /\b(if|else|for|while|do|try|catch|finally|function|class)\b.*(?!.*{)$/.test(line);
        case 'css':
            return line.includes('{') && !line.includes('}');
        case 'python':
            return line.endsWith(':');
        case 'xml':
        case 'html':
            return /^\s*<[^\/][^>]*[^\/]>/.test(line) && !/^\s*<[^>]*\/>/.test(line);
        default:
            return line.includes('{') || line.endsWith(':') || /\bBEGIN\b/i.test(line);
    }
}

// Auto-detect language based on code content
function detectLanguage(code) {
    const trimmedCode = code.trim();
    
    // JSON detection
    if ((trimmedCode.startsWith('{') && trimmedCode.endsWith('}')) || 
        (trimmedCode.startsWith('[') && trimmedCode.endsWith(']'))) {
        try {
            JSON.parse(trimmedCode);
            return 'json';
        } catch (e) {
            // Not valid JSON, continue checking
        }
    }
    
    // XML/HTML detection
    if (trimmedCode.startsWith('<') && trimmedCode.includes('>')) {
        if (trimmedCode.toLowerCase().includes('<!doctype html') || 
            trimmedCode.toLowerCase().includes('<html')) {
            return 'html';
        }
        return 'xml';
    }
    
    // SQL detection
    const sqlKeywords = /^\s*(select|insert|update|delete|create|drop|alter|with|begin|declare)\s+/i;
    if (sqlKeywords.test(trimmedCode)) {
        return 'sql';
    }
    
    // CSS detection
    if (trimmedCode.includes('{') && trimmedCode.includes('}') && 
        (trimmedCode.includes(':') || trimmedCode.includes(';'))) {
        const cssPattern = /[a-zA-Z-]+\s*:\s*[^;]+;/;
        if (cssPattern.test(trimmedCode)) {
            return 'css';
        }
    }
    
    // JavaScript detection
    const jsKeywords = /\b(function|var|let|const|if|else|for|while|return|class|import|export)\b/;
    if (jsKeywords.test(trimmedCode)) {
        return 'javascript';
    }
    
    // Python detection
    const pythonKeywords = /\b(def|import|from|class|if|elif|else|for|while|try|except|with)\b/;
    if (pythonKeywords.test(trimmedCode)) {
        return 'python';
    }
    
    return 'text';
}

// Format SQL queries with universal indentation
function formatSQL(sql) {
    let formatted = sql
        .replace(/\s+/g, ' ')
        .trim()
        // Add newlines before major keywords
        .replace(/\b(SELECT|FROM|WHERE|JOIN|INNER JOIN|LEFT JOIN|RIGHT JOIN|FULL JOIN|ON|GROUP BY|ORDER BY|HAVING|UNION|INSERT INTO|VALUES|UPDATE|SET|DELETE FROM|CREATE TABLE|ALTER TABLE|DROP TABLE|BEGIN|END|IF|ELSE|WHILE|FOR|CASE|WHEN|THEN)\b/gi, '\n$1')
        // Add newlines after certain keywords
        .replace(/\b(AND|OR)\b/gi, '\n$1')
        // Handle commas in SELECT statements
        .replace(/,(?=\s*\w)/g, ',\n')
        // Clean up multiple newlines
        .replace(/\n\s*\n/g, '\n')
        .split('\n')
        .map(line => line.trim())
        .filter(line => line.length > 0)
        .join('\n');
    
    return applyUniversalIndentation(formatted, 'sql');
}

// Format JSON with universal indentation
function formatJSON(json) {
    try {
        const parsed = JSON.parse(json);
        return JSON.stringify(parsed, null, 4); // Use 4 spaces consistently
    } catch (e) {
        throw new Error('Invalid JSON format');
    }
}

// Format XML/HTML with universal indentation
function formatXML(xml) {
    const reg = /(>)(<)(\/*)/g;
    let formatted = xml.replace(reg, '$1\n$2$3');
    
    // Clean up and prepare for universal indentation
    const lines = formatted.split('\n').map(line => line.trim()).filter(line => line);
    const cleanedXml = lines.join('\n');
    
    return applyUniversalIndentation(cleanedXml, 'xml');
}

// Format CSS with universal indentation
function formatCSS(css) {
    let formatted = css
        // Add newlines around braces
        .replace(/\s*{\s*/g, ' {\n')
        .replace(/;\s*/g, ';\n')
        .replace(/\s*}\s*/g, '\n}\n')
        // Handle selectors
        .replace(/,\s*/g, ',\n')
        // Clean up
        .replace(/\n\s*\n/g, '\n')
        .split('\n')
        .map(line => line.trim())
        .filter(line => line.length > 0)
        .join('\n');
    
    return applyUniversalIndentation(formatted, 'css');
}

// Format JavaScript with universal indentation
function formatJavaScript(js) {
    let formatted = js
        // Handle braces
        .replace(/\s*{\s*/g, ' {\n')
        .replace(/\s*}\s*/g, '\n}\n')
        // Handle semicolons
        .replace(/;\s*(?!$)/g, ';\n')
        // Handle else statements
        .replace(/}\s*else\s*{/g, '} else {')
        .replace(/}\s*else\s+/g, '} else ')
        // Clean up
        .replace(/\n\s*\n/g, '\n')
        .split('\n')
        .map(line => line.trim())
        .filter(line => line.length > 0)
        .join('\n');
    
    return applyUniversalIndentation(formatted, 'javascript');
}

// Format Python with universal indentation
function formatPython(python) {
    const lines = python.split('\n').map(line => line.trim()).filter(line => line);
    return applyUniversalIndentation(lines.join('\n'), 'python');
}

// Format other languages with basic universal indentation
function formatGeneric(code, language) {
    const lines = code.split('\n').map(line => line.trim()).filter(line => line);
    return applyUniversalIndentation(lines.join('\n'), language);
}

// Main format function 
function formatCode() {
    const codeInput = document.getElementById('codeInput');
    const formattedOutput = document.getElementById('formattedOutput');
    const languageSelector = document.getElementById('languageSelector');
    const messageDiv = document.getElementById('formatterMessage');
    
    const code = codeInput.value.trim();
    if (!code) {
        showMessage('Please enter some code to format.', 'error');
        return;
    }

    let selectedLanguage = languageSelector.value;
    if (selectedLanguage === 'auto') {
        selectedLanguage = detectLanguage(code);
    }

    try {
        let formatted = '';
        
        switch (selectedLanguage) {
            case 'sql':
                formatted = formatSQL(code);
                break;
            case 'json':
                formatted = formatJSON(code);
                break;
            case 'xml':
            case 'html':
                formatted = formatXML(code);
                break;
            case 'css':
                formatted = formatCSS(code);
                break;
            case 'javascript':
                formatted = formatJavaScript(code);
                break;
            case 'python':
                formatted = formatPython(code);
                break;
            case 'java':
            case 'c':
            case 'php':
                formatted = formatGeneric(code, selectedLanguage);
                break;
            default:
                // For other languages, apply basic universal formatting
                formatted = formatGeneric(code, selectedLanguage);
        }
        
        formattedOutput.value = formatted;
        showMessage(`Code formatted successfully as ${selectedLanguage.toUpperCase()}!`, 'success');
        
    } catch (error) {
        showMessage(`Error formatting code: ${error.message}`, 'error');
    }
}

// Enhanced minify function
function minifyCode() {
    const codeInput = document.getElementById('codeInput');
    const formattedOutput = document.getElementById('formattedOutput');
    const languageSelector = document.getElementById('languageSelector');
    
    const code = codeInput.value.trim();
    if (!code) {
        showMessage('Please enter some code to minify.', 'error');
        return;
    }

    let selectedLanguage = languageSelector.value;
    if (selectedLanguage === 'auto') {
        selectedLanguage = detectLanguage(code);
    }

    try {
        let minified = '';
        
        switch (selectedLanguage) {
            case 'json':
                const parsed = JSON.parse(code);
                minified = JSON.stringify(parsed);
                break;
            case 'css':
                minified = code
                    .replace(/\/\*[\s\S]*?\*\//g, '')
                    .replace(/\s+/g, ' ')
                    .replace(/;\s*}/g, '}')
                    .replace(/\s*{\s*/g, '{')
                    .replace(/;\s*/g, ';')
                    .trim();
                break;
            case 'javascript':
                minified = code
                    .replace(/\/\*[\s\S]*?\*\//g, '')
                    .replace(/\/\/.*$/gm, '')
                    .replace(/\s+/g, ' ')
                    .replace(/\s*([{}();,])\s*/g, '$1')
                    .trim();
                break;
            case 'sql':
                minified = code
                    .replace(/--.*$/gm, '')
                    .replace(/\/\*[\s\S]*?\*\//g, '')
                    .replace(/\s+/g, ' ')
                    .trim();
                break;
            default:
                minified = code.replace(/\s+/g, ' ').trim();
        }
        
        formattedOutput.value = minified;
        showMessage('Code minified successfully!', 'success');
        
    } catch (error) {
        showMessage(`Error minifying code: ${error.message}`, 'error');
    }
}

// Copy formatted code to clipboard
function copyFormattedCode() {
    const formattedOutput = document.getElementById('formattedOutput');
    if (!formattedOutput.value.trim()) {
        showMessage('No formatted code to copy.', 'error');
        return;
    }
    
    formattedOutput.select();
    document.execCommand('copy');
    showMessage('Formatted code copied to clipboard!', 'success');
}

// Clear all content
function clearFormatter() {
    document.getElementById('codeInput').value = '';
    document.getElementById('formattedOutput').value = '';
    document.getElementById('languageSelector').value = 'auto';
    hideMessage();
}

// Show message function
function showMessage(message, type) {
    const messageDiv = document.getElementById('formatterMessage');
    messageDiv.textContent = message;
    messageDiv.className = type === 'error' ? 'error-message' : 'success-message';
    messageDiv.style.display = 'block';
    
    // Auto-hide message
    setTimeout(() => { hideMessage();}, 7500);
}

// Hide message function
function hideMessage() {
    const messageDiv = document.getElementById('formatterMessage');
    messageDiv.style.display = 'none';
}

// Auto-resize textareas
function autoResize(textarea) {
    textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight + 'px';
}

// Add event listeners for auto-resize
document.addEventListener('DOMContentLoaded', function() {
    const textareas = document.querySelectorAll('.formatter-textarea');
    textareas.forEach(textarea => {
        textarea.addEventListener('input', function() {
            autoResize(this);
        });
    });
});

// Case Master secion
// Global variables
        let currentTableData = [];        
        // Show status message
        function showStatus(message, type = 'info', elementId = 'statusMessage') {
            const statusDiv = document.getElementById(elementId);
            statusDiv.innerHTML = `<div class="status-${type}">${message}</div>`;
            setTimeout(() => {
                statusDiv.innerHTML = '';
            }, 5000);
        }
        
        // Clear all data 
        function clearData() {
            document.getElementById('tcInput').value = '';
            document.getElementById('tcPreview').innerHTML = '<p style="color:#666;text-align:center;margin:20px;">Table preview will appear here...</p>';
            currentTableData = [];
            showStatus('All data cleared successfully!', 'success');
        }
        
        // Clear converter data
        function clearConverter() {
            document.getElementById('formatInput').value = '';
            document.getElementById('convertedOutput').value = '';
            showStatus('Converter cleared successfully!', 'success', 'converterStatusMessage');
        }
        
        // Load sample data for converter
        function loadConverterSampleData() {
            const sampleData = document.getElementById('converterSampleDataTemplate').textContent.trim();
            document.getElementById('formatInput').value = sampleData;
            showStatus('Sample descriptive format loaded! Click "Convert to Pipe Format" to convert.', 'info', 'converterStatusMessage');
        }
        
        // Show/hide converter instructions
        function showConverterInstructions() {
            const instructions = document.getElementById('converterInstructions');
            if (instructions.style.display === 'none') {
                instructions.style.display = 'block';
            } else {
                instructions.style.display = 'none';
            }
        }

        /*
        function showConverterInstructions() {
        // Selects all elements with mutltple IDs
        const instructions = document.querySelectorAll('#converterInstructions, #formatterInstructions');

        instructions.forEach(instruction => {
            if (instruction.style.display === 'none') {
                instruction.style.display = 'block';
            } else {
                instruction.style.display = 'none';
            }
        });
        */

        // Convert descriptive format to pipe-separated format
        function convertFormat() {
            const inputText = document.getElementById('formatInput').value.trim();
            if (!inputText) {
                showStatus('Please enter some test case data to convert.', 'error', 'converterStatusMessage');
                return;
            }
            
            const defaultCategory = document.getElementById('defaultCategory').value || 'Functional';
            const defaultPriority = document.getElementById('defaultPriority').value || 'High';
            const defaultEndpoint = document.getElementById('defaultEndpoint').value || 'Both endpoints';
            
            // Split by double newlines to separate test cases
            const testCaseBlocks = inputText.split(/\n\s*\n/).filter(block => block.trim());
            const convertedLines = [];
            
            testCaseBlocks.forEach(block => {
                const lines = block.split('\n').map(line => line.trim()).filter(line => line);
                
                let testId = '';
                let testName = '';
                let objective = '';
                let method = '';
                let headers = '';
                let expectedResult = '';
                let statusCode = '';
                
                lines.forEach(line => {
                    if (line.match(/^TC-[A-Z0-9-]+:/)) {
                        const match = line.match(/^(TC-[A-Z0-9-]+):\s*(.+)/);
                        if (match) {
                            testId = match[1];
                            testName = match[2];
                        }
                    } else if (line.toLowerCase().startsWith('objective:')) {
                        objective = line.replace(/^objective:\s*/i, '');
                    } else if (line.toLowerCase().startsWith('method:')) {
                        method = line.replace(/^method:\s*/i, '');
                    } else if (line.toLowerCase().startsWith('headers:')) {
                        headers = line.replace(/^headers:\s*/i, '');
                    } else if (line.toLowerCase().startsWith('expected result:')) {
                        expectedResult = line.replace(/^expected result:\s*/i, '');
                    } else if (line.toLowerCase().startsWith('status code:')) {
                        statusCode = line.replace(/^status code:\s*/i, '').replace(/\s*\(.*\)/, ''); // Remove parenthetical content
                    }
                });
                
                // Extract method type (POST, GET, etc.)
                let methodType = 'POST';
                if (method.toLowerCase().includes('get')) methodType = 'GET';
                else if (method.toLowerCase().includes('put')) methodType = 'PUT';
                else if (method.toLowerCase().includes('delete')) methodType = 'DELETE';
                
                // Create pipe-separated line
                const pipeData = [
                    testId,                    // Test ID
                    testName,                  // Test Name
                    defaultCategory,           // Category
                    defaultPriority,           // Priority
                    objective,                 // Objective
                    defaultEndpoint,           // Endpoint
                    methodType,                // Method
                    headers,                   // Prerequisites (using headers)
                    headers,                   // Test Data (using headers)
                    expectedResult,            // Expected Result
                    statusCode                 // Expected Status
                ];
                
                convertedLines.push(pipeData.join('|'));
            });
            
            const convertedOutput = convertedLines.join('\n');
            document.getElementById('convertedOutput').value = convertedOutput;
            
            showStatus(`Successfully converted ${testCaseBlocks.length} test cases to pipe format!`, 'success', 'converterStatusMessage');
        }
        
        // Copy converted data to clipboard
        function copyConvertedData() {
            const convertedData = document.getElementById('convertedOutput').value;
            if (!convertedData.trim()) {
                showStatus('No converted data to copy. Please convert some data first.', 'error', 'converterStatusMessage');
                return;
            }
            
            navigator.clipboard.writeText(convertedData).then(() => {
                showStatus('Converted data copied to clipboard!', 'success', 'converterStatusMessage');
            }).catch(() => {
                // Fallback for older browsers
                const textarea = document.createElement('textarea');
                textarea.value = convertedData;
                document.body.appendChild(textarea);
                textarea.select();
                document.execCommand('copy');
                document.body.removeChild(textarea);
                showStatus('Converted data copied to clipboard!', 'success', 'converterStatusMessage');
            });
        }
        
        // Load sample data
        function loadSampleData() {
            const sampleData = document.getElementById('sampleDataTemplate').textContent.trim();
            document.getElementById('tcInput').value = sampleData;
            showStatus('Sample data loaded! Click "Preview Table" to see the result.', 'info');
        }
        
        // Show/hide instructions
        function showInstructions() {
            const instructions = document.getElementById('instructions');
            if (instructions.style.display === 'none') {
                instructions.style.display = 'block';
            } else {
                instructions.style.display = 'none';
            }
        }
        
        // Parse input text to table data
        function parseTestCaseData(text) {
            if (!text.trim()) {
                showStatus('Please enter some test case data first.', 'error');
                return [];
            }
            
            const lines = text.trim().split('\n');
            const data = [];
            
            for (let i = 0; i < lines.length; i++) {
                const line = lines[i].trim();
                if (line) {
                    // Support both pipe-separated and tab-separated data
                    let columns;
                    if (line.includes('\t')) {
                        columns = line.split('\t');
                    } else {
                        columns = line.split('|');
                    }
                    
                    // Ensure we have at least the minimum required columns
                    while (columns.length < 16) {
                        columns.push('');
                    }
                    
                    data.push(columns);
                }
            }
            
            return data;
        }
        
        // Get priority class for styling
        function getPriorityClass(priority) {
            switch (priority.toLowerCase()) {
                case 'high': return 'priority-high';
                case 'medium': return 'priority-medium';
                case 'low': return 'priority-low';
                default: return '';
            }
        }
        
        // Preview test cases as HTML table
        function previewTestCases() {
            const inputText = document.getElementById('tcInput').value;
            const data = parseTestCaseData(inputText);
            
            if (data.length === 0) {
                return;
            }
            
            currentTableData = data;
            
            const headers = [
                'Test ID', 'Test Case Name', 'Category', 'Priority', 'Test Objective',
                'Endpoint', 'Method', 'Prerequisites', 'Test Data/Input', 'Expected Result',
                'Expected Status', 'Status', 'Actual Result', 'Tested By', 'Test Date', 'Comments'
            ];
            
            let html = '<table>';
            
            // Add headers
            html += '<thead><tr>';
            headers.forEach(header => {
                html += `<th>${header}</th>`;
            });
            html += '</tr></thead>';
            
            // Add data rows
            html += '<tbody>';
            data.forEach((row, index) => {
                html += '<tr>';
                row.forEach((cell, cellIndex) => {
                    let cellClass = '';
                    if (cellIndex === 0) cellClass = 'test-id'; // Test ID column
                    if (cellIndex === 3) cellClass = getPriorityClass(cell); // Priority column
                    
                    html += `<td class="${cellClass}">${cell || ''}</td>`;
                });
                html += '</tr>';
            });
            html += '</tbody></table>';
            
            document.getElementById('tcPreview').innerHTML = html;
            showStatus(`Table generated successfully with ${data.length} test cases!`, 'success');
        }
        
        // Copy table to clipboard
        function copyTableToClipboard() {
            const table = document.querySelector('#tcPreview table');
            if (!table) {
                showStatus('Please generate a table preview first.', 'error');
                return;
            }
            
            // Create a temporary textarea with the table HTML
            const textarea = document.createElement('textarea');
            textarea.value = table.outerHTML;
            document.body.appendChild(textarea);
            textarea.select();
            
            try {
                document.execCommand('copy');
                showStatus('Table HTML copied to clipboard!', 'success');
            } catch (err) {
                showStatus('Failed to copy table. Please try again.', 'error');
            }
            
            document.body.removeChild(textarea);
        }
        
        // Export test cases as Excel
        function exportTestCases() {
            if (currentTableData.length === 0) {
                showStatus('Please preview the table first before exporting.', 'error');
                return;
            }
            
            try {
                // Create CSV content
                const headers = [
                    'Test ID', 'Test Case Name', 'Category', 'Priority', 'Test Objective',
                    'Endpoint', 'Method', 'Prerequisites', 'Test Data/Input', 'Expected Result',
                    'Expected Status', 'Status', 'Actual Result', 'Tested By', 'Test Date', 'Comments'
                ];
                
                let csvContent = headers.join(',') + '\n';
                
                currentTableData.forEach(row => {
                    const escapedRow = row.map(cell => {
                        // Escape quotes and wrap in quotes if contains comma, quote, or newline
                        const cellStr = String(cell || '');
                        if (cellStr.includes(',') || cellStr.includes('"') || cellStr.includes('\n')) {
                            return '"' + cellStr.replace(/"/g, '""') + '"';
                        }
                        return cellStr;
                    });
                    csvContent += escapedRow.join(',') + '\n';
                });
                
                // Create and download file
                const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
                const link = document.createElement('a');
                const url = URL.createObjectURL(blob);
                
                link.setAttribute('href', url);
                link.setAttribute('download', `test-cases-${new Date().toISOString().split('T')[0]}.csv`);
                link.style.visibility = 'hidden';
                
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                
                showStatus('Excel file downloaded successfully!', 'success');
                
            } catch (error) {
                console.error('Export error:', error);
                showStatus('Failed to export file. Please try again.', 'error');
            }
        }
        
        // Add keyboard shortcuts
        document.addEventListener('keydown', function(e) {
            // Ctrl+Enter to preview
            if (e.ctrlKey && e.key === 'Enter') {
                e.preventDefault();
                previewTestCases();
            }
            
            // Ctrl+Shift+C to clear
            if (e.ctrlKey && e.shiftKey && e.key === 'C') {
                e.preventDefault();
                clearData();
            }
            
            // Ctrl+E to export
            if (e.ctrlKey && e.key === 'e') {
                e.preventDefault();
                exportTestCases();
            }
            
            // Ctrl+R to convert format
            if (e.ctrlKey && e.key === 'r') {
                e.preventDefault();
                convertFormat();
            }
        });
        
        // Initialize
        document.addEventListener('DOMContentLoaded', function() {
            showStatus('Test Case Builder loaded! New: Format Converter added. Keyboard shortcuts: Ctrl+R (Convert), Ctrl+Enter (Preview), Ctrl+E (Export), Ctrl+Shift+C (Clear)', 'info');
        });

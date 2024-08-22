// SQL Converter functions
function convertToCommaSeparated() {
    const ids = document.getElementById('ids').value.trim().split(/\s+/).join(',');
    document.getElementById('commaSeparated').value = ids;
}

function convertToSingleQuotes() {
    const idsArray = document.getElementById('ids').value.trim().split(/\s+/);
    const singleQuotedIds = idsArray.map(id => `'${id}'`).join(',');
    document.getElementById('singleQuotes').value = singleQuotedIds;
}

function copyToClipboard(elementId) {
    const element = document.getElementById(elementId);
    element.select();
    element.setSelectionRange(0, 99999); // For mobile devices
    document.execCommand('copy');
}

function clearData() {
    const elementsToClear = [
        'ids', 'commaSeparated', 'singleQuotes', 'countInput', 
        'commaRemoved', 'epochTime', 'result'
    ];    
    // Clear the value of each input element
    elementsToClear.forEach(id => {
        let element = document.getElementById(id);
        if (element) {
            element.value = '';
            element.innerHTML = ''; // Clear the inner HTML for divs like 'result'
        }
    });    
    // Clear the inner text of specific display elements
    document.getElementById('countDisplay').innerText = '';
    document.getElementById('withoutSpaceCountDisplay').innerText = '';
    // Hide the comma removed container
    document.getElementById('commaRemovedContainer').style.display = 'none';    
    // Reset the select element to its default option
    document.getElementById('timezoneSelect').selectedIndex = 0;
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

// Hex/Text Converter functions
function convertToHex() {
    const text = document.getElementById('textInput').value;
    const hex = Array.from(text).map(c => c.charCodeAt(0).toString(16).padStart(2, '0')).join('').toUpperCase();
    document.getElementById('hexOutput').value = hex;
}

function convertToText() {
    const hex = document.getElementById('hexOutput').value;
    const text = hex.match(/.{1,2}/g).map(byte => String.fromCharCode(parseInt(byte, 16))).join('');
    document.getElementById('textOutput').value = text;
}

function clearFields() {
    const elementsToClear = [
        'textInput', 'hexOutput', 'numberInput', 
        'binaryOutput', 'textOutput', 'base64Output'
    ];
    elementsToClear.forEach(id => document.getElementById(id).value = '');
}

// Navigation
document.getElementById('sqlConverterLink').addEventListener('click', function() {
    document.getElementById('sqlConverter').style.display = 'block';
    document.getElementById('hexConverter').style.display = 'none';
    document.getElementById('xmlToBlockSection').style.display = 'none';
    document.getElementById('queryToJsonSection').style.display = 'none';
});

document.getElementById('hexConverterLink').addEventListener('click', function() {
    document.getElementById('sqlConverter').style.display = 'none';
    document.getElementById('hexConverter').style.display = 'block';
    document.getElementById('xmlToBlockSection').style.display = 'none';
    document.getElementById('queryToJsonSection').style.display = 'none';
});

// New Tools
document.getElementById('xmlToBlockLink').addEventListener('click', function() {
    document.getElementById('sqlConverter').style.display = 'none';
    document.getElementById('hexConverter').style.display = 'none';
    document.getElementById('xmlToBlockSection').style.display = 'block';
    document.getElementById('queryToJsonSection').style.display = 'none';
});

document.getElementById('queryToJsonLink').addEventListener('click', function() {
    document.getElementById('sqlConverter').style.display = 'none';
    document.getElementById('hexConverter').style.display = 'none';
    document.getElementById('xmlToBlockSection').style.display = 'none';
    document.getElementById('queryToJsonSection').style.display = 'block';
});

// Function to convert number to binary
function convertToBinary() {
    const numberInput = document.getElementById('numberInput').value.trim();
    const binaryOutput = document.getElementById('binaryOutput');    
    if (!isNaN(numberInput) && numberInput !== '') {
        binaryOutput.value = Number(numberInput).toString(2);
    } else if (/^[0-9a-fA-F]+$/.test(numberInput)) {
        binaryOutput.value = parseInt(numberInput, 16).toString(2);
    } else {
        binaryOutput.value = 'Invalid input';
    }
}
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
    const currentMonth = new Date().getMonth();
    let visitCount = localStorage.getItem('visitCount');
    let storedMonth = localStorage.getItem('visitMonth');
    if (!visitCount || storedMonth == null || currentMonth !== parseInt(storedMonth)) {
        visitCount = 0;
        storedMonth = currentMonth;
    } else {
        visitCount = parseInt(visitCount);
    }
    visitCount++;
    localStorage.setItem('visitCount', visitCount);
    localStorage.setItem('visitMonth', currentMonth);
    document.getElementById('visit-counter').innerText = `Visit count: ${visitCount}`;
}
// Call the function to update and display the visit counter
updateVisitCounter();

// Base64 Converter functions
function encodeToBase64() {
    const data = document.getElementById('numberInput').value;
    const encoded = btoa(data);
    document.getElementById('base64Output').value = encoded;
}

// Function to convert the entered epoch time to GMT and local time
function convertEpochTime() {
    const epochInput = document.getElementById('epochTime').value;
    const epochTime = parseInt(epochInput, 10);
    const timezoneSelect = document.getElementById('timezoneSelect').value;
    if (!isNaN(epochTime)) {
        const date = new Date(epochTime * 1000);
        const gmtFormattedDate = date.toLocaleString('en-US', {
            weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
            hour: 'numeric', minute: 'numeric', second: 'numeric',
            timeZone: 'UTC', timeZoneName: 'short'
        });
        let resultText = `GMT: ${gmtFormattedDate}`;
        if (timezoneSelect) {
            const timezoneOffset = parseTimezoneOffset(timezoneSelect);
            const localDate = new Date(date.getTime() + timezoneOffset * 60000);
            const localFormattedDate = localDate.toLocaleString('en-US', {
                weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
                hour: 'numeric', minute: 'numeric', second: 'numeric',
                timeZone: 'UTC', timeZoneName: 'short'
            });
            resultText += `<br>Local Time: ${localFormattedDate} ${timezoneSelect}`;
        } else {
            resultText += `<br>Local Time: Please select a timezone.`;
        }
        document.getElementById('result').innerHTML = resultText;
    } else {
        document.getElementById('result').innerText = 'Invalid epoch time. Please enter a valid number.';
    }
}

// Function to parse the timezone offset string and convert it to minutes
function parseTimezoneOffset(offset) {
    const sign = offset[0] === '+' ? 1 : -1;
    const [hours, minutes] = offset.slice(1).split(':').map(Number);
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
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(fullXmlTextarea.value, "text/xml");

        if (xmlDoc.getElementsByTagName("parsererror").length > 0) {
            throw new Error("Error parsing XML. Please check your XML structure.");
        }
        // Extract the BlockNumber value separately
        const blockNumberElement = xmlDoc.querySelector('BlockNumber');
        const blockNumber = blockNumberElement ? blockNumberElement.textContent.trim() : '';

        // Recursive function to extract all text content except <BlockNumber>
        function extractTextContent(node) {
            let textContent = '';
            if (node.nodeType === Node.ELEMENT_NODE && node.nodeName !== 'BlockNumber') {
                for (let i = 0; i < node.childNodes.length; i++) {
                    textContent += extractTextContent(node.childNodes[i]);
                }
            } else if (node.nodeType === Node.TEXT_NODE) {
                const trimmedValue = node.nodeValue.trim();
                if (trimmedValue) {
                    textContent += trimmedValue + ',';
                }
            }
            return textContent;
        }

        // Extract text content and remove the trailing comma
        let blockXml = extractTextContent(xmlDoc.documentElement).slice(0, -1);
        // Output BlockNumber and BlockData separately
        blockXmlTextarea.value = `<BlockNumber>${blockNumber}</BlockNumber>\n<BlockData>${blockXml}</BlockData>`;
        errorMsg.textContent = '';
    } catch (error) {
        errorMsg.textContent = error.message;
        highlightErrorLine(fullXmlTextarea, error.message);
    }
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

function clearText(inputId, outputId, errorId) {
    document.getElementById(inputId).value = '';
    document.getElementById(outputId).value = '';
    document.getElementById(errorId).textContent = '';
}

function highlightErrorLine(textarea, errorMessage) {
    textarea.classList.add('error-highlight');
    // Can add more logic to find the exact line with the error if needed
}

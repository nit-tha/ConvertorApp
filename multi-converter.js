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
    // Clear the 'results' section
    document.getElementById('minutesToSubtract').value = '';
    document.getElementById('oldEpochTime').innerText = '';
    document.getElementById('newEpochTime').innerText = '';
    document.getElementById('timeDiff').innerText = '';
    document.getElementById('results').style.display = 'none'; // Optionally hide the section
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

/*
// Function to convert the entered epoch time to GMT and local time
function convertEpochTime() {
    const epochInput = document.getElementById('epochTime').value;
    const epochTime = parseInt(epochInput, 10);
    const timezoneSelect = document.getElementById('timezoneSelect').value;
    if (!isNaN(epochTime)) {
        const date = new Date(epochTime * 1000);
        // Format date in GMT
        const gmtFormattedDate = date.toLocaleString('en-US', {
            weekday: 'short',
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
            timeZone: 'UTC',
            timeZoneName: 'short'
        });
        // Calculate relative time (works independently of timezone selection)
        const relativeTime = calculateRelativeTime(date);

        // Time for different time zones in a single line
        const istTime = new Date(date.toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }))
            .toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true });
        const estTime = new Date(date.toLocaleString('en-US', { timeZone: 'America/New_York' }))
            .toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true });
        const utcTime = new Date(date.toLocaleString('en-US', { timeZone: 'UTC' }))
            .toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true });
        const sastTime = new Date(date.toLocaleString('en-US', { timeZone: 'Africa/Johannesburg' }))
            .toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true });
        let resultText = `GMT: ${gmtFormattedDate}<br>Relative: ${relativeTime}<br>`;
        resultText += `IST: ${istTime} | EST/EDT: ${estTime} | UTC: ${utcTime} | SAST: ${sastTime}`;

        // Display local time if timezone is selected
        if (timezoneSelect) {
            const timezoneOffset = parseTimezoneOffset(timezoneSelect);
            const localDate = new Date(date.getTime() + timezoneOffset * 60000); // Adjusting for timezone offset
            // Format local date
            const localFormattedDate = localDate.toLocaleString('en-US', {
                weekday: 'short',
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
                second: 'numeric',
                timeZone: 'UTC'  // Keeping UTC to get the correct time after adding offset
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

*/
// Function to convert the entered epoch time added IST, EST, SAST & UTC, removed GMT time
function convertEpochTime() {
    const epochInput = document.getElementById('epochTime').value;
    const epochTime = parseInt(epochInput, 10);
    const timezoneSelect = document.getElementById('timezoneSelect').value;
    if (!isNaN(epochTime)) {
        const date = new Date(epochTime * 1000);

        // Calculate relative time (works independently of timezone selection)
        const relativeTime = calculateRelativeTime(date);

        // Time for different time zones in a single line
        const istTime = new Date(date.toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }))
            .toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true });
        const estTime = new Date(date.toLocaleString('en-US', { timeZone: 'America/New_York' }))
            .toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true });
        const utcTime = new Date(date.toLocaleString('en-US', { timeZone: 'UTC' }))
            .toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true });
        const sastTime = new Date(date.toLocaleString('en-US', { timeZone: 'Africa/Johannesburg' }))
            .toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true });

        let resultText = `Relative: ${relativeTime}<br>`;
        resultText += `IST: ${istTime} | EST/EDT: ${estTime} | UTC: ${utcTime} | SAST: ${sastTime}`;

        // Display local time if timezone is selected
        if (timezoneSelect) {
            const timezoneOffset = parseTimezoneOffset(timezoneSelect);
            const localDate = new Date(date.getTime() + timezoneOffset * 60000); // Adjusting for timezone offset
            // Format local date
            const localFormattedDate = localDate.toLocaleString('en-US', {
                weekday: 'short',
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
                second: 'numeric',
                timeZone: 'UTC'  // Keeping UTC to get the correct time after adding offset
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

// Function to calculate relative time, including future dates
function calculateRelativeTime(date) {
    const now = new Date();
    const diffInSeconds = Math.floor((date - now) / 1000);
    const absDiffInSeconds = Math.abs(diffInSeconds);

    if (diffInSeconds < 0) { // Past dates
        if (absDiffInSeconds < 60) {
            return 'A few seconds ago';
        } else if (absDiffInSeconds < 3600) {
            const minutes = Math.floor(absDiffInSeconds / 60);
            return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
        } else if (absDiffInSeconds < 86400) {
            const hours = Math.floor(absDiffInSeconds / 3600);
            return `${hours} hour${hours > 1 ? 's' : ''} ago`;
        } else {
            const days = Math.floor(absDiffInSeconds / 86400);
            return `${days} day${days > 1 ? 's' : ''} ago`;
        }
    } else { // Future dates
        if (absDiffInSeconds < 60) {
            return 'In a few seconds';
        } else if (absDiffInSeconds < 3600) {
            const minutes = Math.floor(absDiffInSeconds / 60);
            return `In ${minutes} minute${minutes > 1 ? 's' : ''}`;
        } else if (absDiffInSeconds < 86400) {
            const hours = Math.floor(absDiffInSeconds / 3600);
            return `In ${hours} hour${hours > 1 ? 's' : ''}`;
        } else {
            const days = Math.floor(absDiffInSeconds / 86400);
            return `In ${days} day${days > 1 ? 's' : ''}`;
        }
    }
}

// Function to parse the timezone offset string and convert it to minutes
function parseTimezoneOffset(offset) {
    const sign = offset[0] === '+' ? 1 : -1;
    const [hours, minutes] = offset.slice(1).split(':').map(Number);
    return sign * (hours * 60 + (minutes || 0));
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
        alert("Please enter valid numbers for both fields.");
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

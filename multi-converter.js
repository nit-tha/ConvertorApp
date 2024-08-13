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
    document.getElementById('ids').value = '';
    document.getElementById('commaSeparated').value = '';
    document.getElementById('singleQuotes').value = '';
    document.getElementById('countInput').value = '';
    document.getElementById('countDisplay').innerText = '';
    document.getElementById('withoutSpaceCountDisplay').innerText = '';
    document.getElementById('commaRemoved').value = '';
    document.getElementById('commaRemovedContainer').style.display = 'none';
    document.getElementById('epochTime').value = '';           // Clear the epoch time input field
    document.getElementById('timezoneSelect').value = '';      // Reset the timezone dropdown to default
    document.getElementById('result').innerHTML = '';          // Clear the result display
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
    // Reset input size to auto to calculate width based on content length
    input.style.width = 'auto';
    // Set the width of the input based on the content length
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
    let hex = '';
    for (let i = 0; i < text.length; i++) {
        hex += text.charCodeAt(i).toString(16).padStart(2, '0');
    }
    document.getElementById('hexOutput').value = hex.toUpperCase();
}

function convertToText() {
    const hex = document.getElementById('hexOutput').value;
    let text = '';
    for (let i = 0; i < hex.length; i += 2) {
        text += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
    }
    document.getElementById('textOutput').value = text;
}

function clearFields() {
    document.getElementById('textInput').value = '';
    document.getElementById('hexOutput').value = '';
    document.getElementById('numberInput').value = '';
    document.getElementById('binaryOutput').value = '';
    document.getElementById('textOutput').value = '';
    document.getElementById('base64Output').value = '';
}

// Navigation
document.getElementById('sqlConverterLink').addEventListener('click', function() {
    document.getElementById('sqlConverter').style.display = 'block';
    document.getElementById('hexConverter').style.display = 'none';
});

document.getElementById('hexConverterLink').addEventListener('click', function() {
    document.getElementById('sqlConverter').style.display = 'none';
    document.getElementById('hexConverter').style.display = 'block';
});

// Function to convert number to binary
function convertToBinary() {
    var numberInput = document.getElementById('numberInput').value.trim();
    var binaryOutput = document.getElementById('binaryOutput');
    
    // Check if the input is a valid decimal number
    if (!isNaN(numberInput) && numberInput !== '') {
        var binary = Number(numberInput).toString(2); // Convert decimal to binary string
        binaryOutput.value = binary; // Display binary output
    } 
    // Check if the input is a valid hexadecimal number
    else if (/^[0-9a-fA-F]+$/.test(numberInput)) {
        var binary = parseInt(numberInput, 16).toString(2); // Convert hexadecimal to binary
        binaryOutput.value = binary; // Display binary output
    } 
    // Handle invalid input
    else {
        binaryOutput.value = 'Invalid input';
    }
}

//Function to update epoch time
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
    const currentMonth = new Date().getMonth(); // Get the current month (0-11)

    // Get the stored count and month from localStorage
    let visitCount = localStorage.getItem('visitCount');
    let storedMonth = localStorage.getItem('visitMonth');
    // Initialize count and month if they don't exist or if the month has changed
    if (!visitCount || storedMonth == null || currentMonth !== parseInt(storedMonth)) {
        visitCount = 0;
        storedMonth = currentMonth;
    } else {
        visitCount = parseInt(visitCount);
    }
    // Increment the count
    visitCount++;
    // Save the updated count and month back to localStorage
    localStorage.setItem('visitCount', visitCount);
    localStorage.setItem('visitMonth', currentMonth);
    // Display the visit count in the footer
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
    // Check if the entered epoch time is a valid number
    if (!isNaN(epochTime)) {
        const date = new Date(epochTime * 1000);
        // Formatting options for GMT
        const gmtOptions = {
            weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
            hour: 'numeric', minute: 'numeric', second: 'numeric',
            timeZone: 'UTC', timeZoneName: 'short'
        };
        const gmtFormattedDate = date.toLocaleString('en-US', gmtOptions);
        let resultText = `GMT: ${gmtFormattedDate}`;
        // If a timezone is selected, calculate and display the local time
        if (timezoneSelect) {
            const timezoneOffset = parseTimezoneOffset(timezoneSelect);
            // Convert the offset from minutes to milliseconds
            const localOffsetMilliseconds = timezoneOffset * 60 * 1000;
            // Adjust the local time by adding the timezone offset to the GMT time
            const localDate = new Date(date.getTime() + localOffsetMilliseconds);
            // Formatting options for local time
            const localOptions = {
                weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
                hour: 'numeric', minute: 'numeric', second: 'numeric',
                timeZone: 'UTC', timeZoneName: 'short'
            };
            const localFormattedDate = localDate.toLocaleString('en-US', localOptions);
            // Append the selected timezone offset to the local time display
            resultText += `<br>Local Time: ${localFormattedDate} ${timezoneSelect}`;
        } else {
            resultText += `<br>Local Time: Please select a timezone.`;
        }
        // Display the result text
        document.getElementById('result').innerHTML = resultText;
    } else {
        document.getElementById('result').innerText = 'Invalid epoch time. Please enter a valid number.';
    }
}
// Function to parse the timezone offset string (e.g., "+05:30") and convert it to minutes
function parseTimezoneOffset(offset) {
    const sign = offset[0] === '+' ? 1 : -1;
    const [hours, minutes] = offset.slice(1).split(':').map(Number);
    return sign * (hours * 60 + minutes); // Convert hours and minutes to total minutes and apply sign
}
// Initialize the conversion when the page loads
window.onload = function() {
    document.getElementById('timezoneSelect').addEventListener('change', convertEpochTime);
};
